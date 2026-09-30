/* =========================================
   HERO SLIDER — pergantian latar otomatis
   ========================================= */

function initHeroSlider() {
  const hero   = document.querySelector('.hero');
  const slides = document.querySelectorAll('.hero__slide');
  const dots   = document.querySelectorAll('.hero__dot');
  if (slides.length < 2) return;

  let index = 0;
  let timer = null;
  const DURASI = 3000;        /* slide foto */
  const DURASI_VIDEO = 6000;  /* slide video (video 10 detik, lanjut dari posisi terakhir) */

  /* --- Video latar ---
     Tidak dimuat bila pengunjung memilih "kurangi gerakan" atau mode hemat data */
  const bolehVideo = !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
                     !(navigator.connection && navigator.connection.saveData);
  let halamanSiap = document.readyState === 'complete';

  const pasangVideo = (s) => {
    if (!bolehVideo || !halamanSiap || !s.dataset.video || s.querySelector('video')) return;
    const v = document.createElement('video');
    v.className = 'hero__video';
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('aria-hidden', 'true');
    v.preload = 'auto';
    v.src = s.dataset.video;
    /* Video baru terlihat setelah benar-benar berjalan; sampai itu foto yang tampil */
    v.addEventListener('playing', () => s.classList.add('ada-video'));
    v.addEventListener('error', () => v.remove());
    s.appendChild(v);
  };

  const aturVideo = () => {
    slides.forEach((s, k) => {
      const v = s.querySelector('video');
      if (!v) return;
      if (k === index && !document.hidden) v.play().catch(() => {});
      else v.pause();
    });
  };

  const durasiSlide = (n) =>
    (bolehVideo && slides[n] && slides[n].dataset.video) ? DURASI_VIDEO : DURASI;

  /* Gambar slide selain yang pertama dimuat belakangan (data-bg),
     supaya halaman awal lebih cepat terbuka */
  const muat = (s) => {
    if (!s) return;
    pasangVideo(s);
    if (!s.dataset.bg) return;
    s.style.backgroundImage = `url('${s.dataset.bg}')`;
    delete s.dataset.bg;
  };
  const muatBerikut = (n) => muat(slides[(n + 1) % slides.length]);
  const setelahLoad = () => {
    halamanSiap = true;
    muat(slides[index]);
    muatBerikut(index);
    aturVideo();
  };
  if (halamanSiap) setelahLoad();
  else window.addEventListener('load', setelahLoad, { once: true });

  /* Garis progres di indikator aktif diulang dari nol tiap timer mulai,
     supaya selalu sama dengan waktu pergantian slide */
  const ulangProgres = () => {
    dots.forEach(d => d.classList.remove('is-jalan'));
    const aktif = dots[index];
    if (!aktif) return;
    aktif.style.setProperty('--durasi', durasiSlide(index) + 'ms');
    void aktif.offsetWidth; /* paksa browser mengulang animasi */
    aktif.classList.add('is-jalan');
  };

  const tampilkan = (i) => {
    const n = (i + slides.length) % slides.length;
    muat(slides[n]);
    muatBerikut(n);
    slides.forEach((s, k) => s.classList.toggle('is-active', k === n));
    dots.forEach((d, k) => d.classList.toggle('is-active', k === n));
    index = n;
    ulangProgres();
    aturVideo();
  };

  /* henti dideklarasikan lebih dulu karena dipakai di dalam mulai */
  const henti = () => {
    clearTimeout(timer);
    if (hero) hero.classList.add('hero--jeda');
  };
  /* Pakai setTimeout berantai karena lama tiap slide bisa berbeda (foto/video) */
  const jadwal = () => {
    clearTimeout(timer);
    timer = setTimeout(() => { tampilkan(index + 1); jadwal(); }, durasiSlide(index));
  };
  const mulai = () => {
    henti();
    if (hero) hero.classList.remove('hero--jeda');
    ulangProgres();
    jadwal();
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { henti(); tampilkan(i); mulai(); });
  });

  /* Hentikan saat tab tidak aktif — hemat resource */
  document.addEventListener('visibilitychange', () => {
    document.hidden ? henti() : mulai();
    aturVideo();
  });

  /* --- Geser dengan jari atau mouse --- */
  if (hero) {
    const JARAK_MINIMAL = 50;

    let awalX = 0;
    let awalY = 0;
    let sedangGeser = false;

    hero.addEventListener('touchstart', e => {
      awalX = e.touches[0].clientX;
      awalY = e.touches[0].clientY;
      sedangGeser = true;
      henti();
    }, { passive: true });

    hero.addEventListener('touchmove', e => {
      if (!sedangGeser) return;

      /* Kalau jelas menggeser ke samping, batalkan sisa
         gerakan supaya halaman tidak ikut ter-scroll */
      const jarakX = e.touches[0].clientX - awalX;
      const jarakY = e.touches[0].clientY - awalY;

      if (Math.abs(jarakX) > 10 && Math.abs(jarakX) > Math.abs(jarakY)) {
        hero.style.touchAction = 'none';
      }
    }, { passive: true });

    hero.addEventListener('touchend', e => {
      hero.style.touchAction = '';
      if (!sedangGeser) return;
      sedangGeser = false;

      const jarakX = e.changedTouches[0].clientX - awalX;
      const jarakY = e.changedTouches[0].clientY - awalY;

      /* Abaikan kalau gerakannya lebih ke atas-bawah (scroll) */
      if (Math.abs(jarakX) > JARAK_MINIMAL && Math.abs(jarakX) > Math.abs(jarakY)) {
        tampilkan(jarakX < 0 ? index + 1 : index - 1);
      }
      mulai();
    }, { passive: true });

    /* Batal kalau sentuhan terputus, misalnya ada notifikasi masuk */
    hero.addEventListener('touchcancel', () => {
      hero.style.touchAction = '';
      sedangGeser = false;
      mulai();
    }, { passive: true });

    hero.addEventListener('mousedown', e => {
      awalX = e.clientX;
      sedangGeser = true;
      henti();
    });

    hero.addEventListener('mouseup', e => {
      if (!sedangGeser) return;
      sedangGeser = false;
      const jarak = e.clientX - awalX;
      if (Math.abs(jarak) > JARAK_MINIMAL) tampilkan(jarak < 0 ? index + 1 : index - 1);
      mulai();
    });

    hero.addEventListener('mouseleave', () => {
      if (!sedangGeser) return;
      sedangGeser = false;
      mulai();
    });

    /* Cegah gambar latar ikut terseret saat di-drag */
    hero.addEventListener('dragstart', e => e.preventDefault());
  }

  tampilkan(0);
  mulai();

  /* Mulai gerakan foto latar setelah halaman tampil */
  if (hero) requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('hero--siap')));
}

/* =========================================
   REVEAL ON SCROLL
   ========================================= */
function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = entry.target.dataset.reveal || 0;
      setTimeout(() => entry.target.classList.add('is-visible'), delay * 100);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
}

/* =========================================
   ANGKA BERJALAN (COUNTER)
   ========================================= */
function initCounter() {
  const angka = document.querySelectorAll('[data-count]');
  if (!angka.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const durasi = 1600;
      let mulai    = null;

      const langkah = (waktu) => {
        if (!mulai) mulai = waktu;
        const progres = Math.min((waktu - mulai) / durasi, 1);
        const eased   = 1 - Math.pow(1 - progres, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progres < 1) requestAnimationFrame(langkah);
      };

      requestAnimationFrame(langkah);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  angka.forEach(el => observer.observe(el));
}