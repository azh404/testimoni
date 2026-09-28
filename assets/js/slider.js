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
  const DURASI = 6000;

  const tampilkan = (i) => {
    const n = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === n));
    dots.forEach((d, k) => d.classList.toggle('is-active', k === n));
    index = n;
  };

  /* henti dideklarasikan lebih dulu karena dipakai di dalam mulai */
  const henti = () => clearInterval(timer);
  const mulai = () => { henti(); timer = setInterval(() => tampilkan(index + 1), DURASI); };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { henti(); tampilkan(i); mulai(); });
  });

  /* Hentikan saat tab tidak aktif — hemat resource */
  document.addEventListener('visibilitychange', () => {
    document.hidden ? henti() : mulai();
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