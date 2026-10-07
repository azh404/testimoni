/* =========================================
   BERANDA — kartu logo brand
   ========================================= */
function initProdukTabs() {
  const wrap = document.getElementById('brandCards');
  if (!wrap) return;

  const base = document.body.dataset.base || '';

  wrap.innerHTML = BRANDS.map((b, i) => `
    <a href="${base}${b.halaman}" class="brand-card-link" data-reveal="${i}">
      <div class="brand-card-link__logo">
        <img src="${base}${b.logo}" alt="${b.nama}" loading="lazy">
      </div>
      <p class="brand-card-link__desc">${teksField(b.deskripsi)}</p>
      <span class="brand-card-link__cta" data-i18n="produk.lihat">Lihat Produk</span>
    </a>
  `).join('');

  if (typeof initImageFallback === 'function') initImageFallback();
  if (typeof terapkanBahasa    === 'function') terapkanBahasa();
  if (typeof initReveal        === 'function') initReveal();
}

/* =========================================
   PEMBANTU TERJEMAHAN
   Menerima teks biasa maupun objek {id, en, zh}
   ========================================= */
function teksField(nilai) {
  if (!nilai) return '';
  if (typeof nilai === 'string') return nilai;
  if (typeof tField === 'function') return tField(nilai);
  return nilai.id || '';
}

function teksList(nilai) {
  if (!nilai) return [];
  if (Array.isArray(nilai)) return nilai;
  if (typeof tList === 'function') return tList(nilai);
  return nilai.id || [];
}

function labelSpec(label) {
  return (typeof tSpec === 'function') ? tSpec(label) : label;
}

function nilaiSpec(nilai) {
  const teks = teksField(nilai);
  return (typeof tNilai === 'function') ? tNilai(teks) : teks;
}

/* =========================================
   ALAMAT HALAMAN DETAIL PRODUK
   Harus sama persis dengan nama file di folder produk/.
   Kalau menambah produk baru, halaman detailnya perlu
   dibuat ulang (generate) supaya tautannya tidak 404.
   ========================================= */
const KATEGORI_URL = {
  'hybrid':        'traktor-hybrid',
  'tractor':       'traktor',
  'planter':       'rice-transplanter',
  'harvester':     'combine-harvester',
  'sugarcane':     'mesin-panen-tebu',
  'dryer':         'mesin-pengering-gabah',
  'baler':         'mesin-baler',
  'implement':     'implement-traktor',
  'sprayer-drone': 'drone-sprayer',
  'va-drone':      'drone-pertanian',
  'va-steering':   'auto-steering',
  'va-rover':      'robot-pertanian',
  'va-digital':    'pertanian-digital'
};

/* Gambar produk ditampilkan dalam WebP (lebih ringan). Data tetap
   menunjuk ke PNG karena dipakai brosur PDF dan pratinjau link. */
function gambarWeb(src) {
  return String(src).replace(/\.png$/, '.webp');
}

/* Teks alt gambar produk, mis. "Traktor Zoomlion RK504" */
function altProduk(p) {
  const brand = (BRANDS.find(b => b.id === p.brand) || {}).nama || '';
  const jenis = (typeof BAHASA === 'undefined' || BAHASA === 'id')
    ? ALT_KATEGORI[p.kategori]
    : namaKategori(p.kategori, p.brand);
  return [jenis, brand, p.nama].filter(Boolean).join(' ').replace(/"/g, '&quot;');
}

/* Versi kecil 600x450 untuk kartu produk (dibuat tools/optimasi-gambar.py) */
function gambarKecil(src) {
  return String(src).replace(/\.png$/, '-kecil.webp');
}

function slugTeks(teks) {
  return String(teks)
    .toLowerCase()
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function urlProduk(p) {
  const kat = KATEGORI_URL[p.kategori] || slugTeks(p.kategori);
  return `produk/${kat}-${slugTeks(p.brand)}-${slugTeks(p.nama)}.html`;
}

/* =========================================
   TEMPLATE KARTU PRODUK
   ========================================= */
function kartuProduk(p, brand, base, i = 0) {
  return `
    <a href="${base}${urlProduk(p)}" class="produk-card" data-produk="${p.id}" style="animation-delay:${i * 55}ms">
      <div class="produk-card__brand">
        <img src="${base}${brand.logo}" alt="${brand.nama}" loading="lazy">
      </div>
      <div class="produk-card__media">
        <img src="${base}${gambarKecil(p.gambar)}" alt="${altProduk(p)}" onerror="this.style.visibility='hidden'" loading="lazy" decoding="async">
      </div>
      <div class="produk-card__body">
        <p class="produk-card__seri mb-0">${p.seri || ''}</p>
        <h3 class="produk-card__nama">${p.nama}</h3>
        <p class="produk-card__kategori mb-0">${namaKategori(p.kategori, p.brand)}</p>
      </div>
    </a>`;
}

function namaKategori(id, brandId) {
  if (typeof tKategori === 'function') {
    const teks = tKategori(id);
    if (teks) return teks;
  }
  if (brandId && KATEGORI[brandId]) {
    return KATEGORI[brandId].find(k => k.id === id)?.nama || '';
  }
  for (const list of Object.values(KATEGORI)) {
    const found = list.find(k => k.id === id);
    if (found) return found.nama;
  }
  return '';
}

/* =========================================
   HALAMAN KATA KUNCI (jual-*-jakarta.html)
   Kartu sudah ditulis di HTML (bahasa Indonesia, terbaca Google);
   di sini dirender ulang supaya ikut bahasa yang dipilih.
   ========================================= */
function initHalamanLanding() {
  const base = document.body.dataset.base || '';
  document.querySelectorAll('[data-landing-kategori], [data-landing-produk]').forEach(wrap => {
    const items = wrap.dataset.landingProduk
      ? wrap.dataset.landingProduk.split(',').map(id => PRODUK.find(p => p.id === id)).filter(Boolean)
      : wrap.dataset.landingKategori.split(',').flatMap(k => PRODUK.filter(p => p.kategori === k));
    wrap.innerHTML = items
      .map((p, i) => kartuProduk(p, BRANDS.find(b => b.id === p.brand), base, i))
      .join('');
  });
}

/* =========================================
   HALAMAN BRAND — filter kategori
   ========================================= */
function initHalamanBrand() {
  const wrapFilter = document.getElementById('filterBar');
  const wrapGrid   = document.getElementById('brandProdukGrid');
  if (!wrapFilter || !wrapGrid) return;

  const base    = document.body.dataset.base || '';
  const brandId = document.body.dataset.brand;
  const brand   = BRANDS.find(b => b.id === brandId);
  if (!brand) return;

  const semua = PRODUK.filter(p => p.brand === brandId);

  const labelSemua = (typeof t === 'function' && t('brand.semuaProduk'))
    ? t('brand.semuaProduk') : 'Semua Produk';
  const labelKosong = (typeof t === 'function' && t('brand.kosong'))
    ? t('brand.kosong') : 'Belum ada produk';

  /* Hanya tampilkan kategori yang benar-benar punya produk */
  const kategoriAktif = (KATEGORI[brandId] || []).filter(
    k => semua.some(p => p.kategori === k.id)
  );

  wrapFilter.innerHTML = `
    <button class="filter-btn is-active" data-kategori="all">
      ${labelSemua} <span>${semua.length}</span>
    </button>
    ${kategoriAktif.map(k => {
      const n = semua.filter(p => p.kategori === k.id).length;
      const nama = namaKategori(k.id, brandId) || k.nama;
      return `<button class="filter-btn" data-kategori="${k.id}">${nama} <span>${n}</span></button>`;
    }).join('')}
  `;

  function render(kategori) {
    let html = '';

    if (kategori === 'all') {
      kategoriAktif.forEach(k => {
        const items = semua.filter(p => p.kategori === k.id);
        const nama  = namaKategori(k.id, brandId) || k.nama;
        html += `<div class="kategori-heading"><h2>${nama}</h2></div>`;
        html += items.map((p, i) => kartuProduk(p, brand, base, i)).join('');
      });
    } else {
      const items = semua.filter(p => p.kategori === kategori);
      html = items.map((p, i) => kartuProduk(p, brand, base, i)).join('');
    }

    wrapGrid.innerHTML = html || `<p class="produk-empty">${labelKosong}</p>`;
    if (typeof initImageFallback === 'function') initImageFallback();
  }

  wrapFilter.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    wrapFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    render(btn.dataset.kategori);
  });

  /* ?kategori=tractor (dari kotak kategori di beranda) langsung menyaring */
  const awal = new URLSearchParams(location.search).get('kategori');
  const tombolAwal = awal && wrapFilter.querySelector(`[data-kategori="${awal}"]`);
  if (tombolAwal) {
    wrapFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
    tombolAwal.classList.add('is-active');
    render(awal);
  } else {
    render('all');
  }
}

/* =========================================
   SLIDER HERO BRAND
   ========================================= */
function initBrandGallery() {
  const wrap = document.getElementById('brandGallery');
  if (!wrap) return;

  const base    = document.body.dataset.base || '';
  const brandId = document.body.dataset.brand;

  const items = PRODUK.filter(p => p.brand === brandId);
  if (!items.length) {
    wrap.innerHTML = '';
    return;
  }

  /* Ambil satu wakil per kategori */
  const pilih = [];
  const kat   = new Set();

  items.forEach(p => {
    if (kat.has(p.kategori)) return;
    kat.add(p.kategori);
    pilih.push(p);
  });

  /* Kalau kategori sedikit, tambah produk lain sampai minimal 5 */
  items.forEach(p => {
    if (pilih.length >= 5 || pilih.includes(p)) return;
    pilih.push(p);
  });

  wrap.innerHTML = `
    <div class="brand-slider">
      <div class="brand-slider__stage">
        ${pilih.map((p, i) => `
          <div class="brand-slider__item${i === 0 ? ' is-active' : ''}">
            <img src="${base}${gambarWeb(p.gambar)}" alt="${altProduk(p)}" onerror="this.style.visibility='hidden'" loading="lazy">
            <span class="brand-slider__label">${p.nama}</span>
          </div>
        `).join('')}
      </div>
      <div class="brand-slider__dots">
        ${pilih.map((p, i) => `
          <button class="brand-slider__dot${i === 0 ? ' is-active' : ''}"
                  data-slide="${i}" aria-label="${p.nama}"></button>
        `).join('')}
      </div>
    </div>`;

  jalankanSlider(wrap);

  if (typeof initImageFallback === 'function') initImageFallback();
}

function jalankanSlider(wrap) {
  const stage  = wrap.querySelector('.brand-slider__stage');
  const slides = wrap.querySelectorAll('.brand-slider__item');
  const dots   = wrap.querySelectorAll('.brand-slider__dot');
  if (!stage || slides.length < 2) return;

  const slider = wrap.querySelector('.brand-slider');
  let index = 0;
  let timer = null;
  const DURASI = 3000; /* samakan dengan animasi .brand-slider__dot (pages.css) */

  /* Garis progres di indikator aktif diulang dari nol */
  const ulangProgres = () => {
    dots.forEach(d => d.classList.remove('is-jalan'));
    const aktif = dots[index];
    if (!aktif) return;
    void aktif.offsetWidth; /* paksa browser mengulang animasi */
    aktif.classList.add('is-jalan');
  };

  const tampilkan = (i) => {
    const n = (i + slides.length) % slides.length;
    if (n !== index) {
      /* Produk lama keluar ke kiri, lalu dikembalikan diam-diam ke kanan */
      const lama = slides[index];
      lama.classList.add('is-keluar');
      setTimeout(() => lama.classList.remove('is-keluar'), 650);
    }
    slides.forEach((s, k) => s.classList.toggle('is-active', k === n));
    dots.forEach((d, k) => d.classList.toggle('is-active', k === n));
    index = n;
    ulangProgres();
  };

  const henti = () => {
    clearInterval(timer);
    if (slider) slider.classList.add('is-jeda');
  };
  const mulai = () => {
    henti();
    if (slider) slider.classList.remove('is-jeda');
    ulangProgres();
    timer = setInterval(() => tampilkan(index + 1), DURASI);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { henti(); tampilkan(i); mulai(); });
  });

  wrap.addEventListener('mouseenter', henti);
  wrap.addEventListener('mouseleave', mulai);

  document.addEventListener('visibilitychange', () => {
    document.hidden ? henti() : mulai();
  });

  /* --- Geser dengan jari atau mouse --- */
  let awalX = 0;
  let awalY = 0;
  let sedangGeser = false;

  stage.addEventListener('touchstart', e => {
    awalX = e.touches[0].clientX;
    awalY = e.touches[0].clientY;
    sedangGeser = true;
    henti();
  }, { passive: true });

  stage.addEventListener('touchend', e => {
    if (!sedangGeser) return;
    sedangGeser = false;
    const jarakX = e.changedTouches[0].clientX - awalX;
    const jarakY = e.changedTouches[0].clientY - awalY;
    if (Math.abs(jarakX) > 50 && Math.abs(jarakX) > Math.abs(jarakY)) {
      tampilkan(jarakX < 0 ? index + 1 : index - 1);
    }
    mulai();
  }, { passive: true });

  stage.addEventListener('mousedown', e => {
    awalX = e.clientX;
    sedangGeser = true;
    henti();
  });

  stage.addEventListener('mouseup', e => {
    if (!sedangGeser) return;
    sedangGeser = false;
    const jarak = e.clientX - awalX;
    if (Math.abs(jarak) > 50) tampilkan(jarak < 0 ? index + 1 : index - 1);
    mulai();
  });

  stage.addEventListener('mouseleave', () => { sedangGeser = false; });

  tampilkan(0);
  mulai();
  if (slider) requestAnimationFrame(() => requestAnimationFrame(() => slider.classList.add('is-siap')));
}

/* =========================================
   PUTAR FOTO (pop-up & halaman detail produk Zoomlion)
   Foto digeser kiri-kanan -> miring 3D (perspektif), bentuk foto tidak diubah.
   ========================================= */
/* Markup penampil putar gaya "studio gelap" (pop-up & halaman detail produk Zoomlion) */
function htmlPutar(src, alt, kelas = '') {
  const petunjuk = (typeof t === 'function' && t('putar.petunjuk')) || 'Geser untuk memutar';
  return `
        <div class="${kelas} putar putar--gelap" data-putar tabindex="0" aria-label="${petunjuk}">
          <div class="putar__sorot" aria-hidden="true"></div>
          <div class="putar__podium" aria-hidden="true"></div>
          <img class="putar__pantul" src="${src}" alt="" aria-hidden="true" draggable="false">
          <div class="putar__bayangan"></div>
          <img class="putar__unit" src="${src}" alt="${alt}" draggable="false" onerror="this.style.visibility='hidden'">
          <span class="putar__petunjuk">&#8592; <span data-i18n="putar.petunjuk">${petunjuk}</span> &#8594;</span>
        </div>`;
}

/* Halaman detail produk Zoomlion: foto utama memakai penampil putar yang sama */
function initPutarDetail() {
  if (document.body.dataset.brand !== 'zoomlion') return;
  const media = document.querySelector('.detail-media');
  const img = media && media.querySelector('img');
  if (!img || media.querySelector('[data-putar]')) return;
  media.classList.add('detail-media--putar');
  media.innerHTML = htmlPutar(img.getAttribute('src'), img.getAttribute('alt') || '', 'detail-putar');
  jalankanPutar(media.querySelector('[data-putar]'));
}

function jalankanPutar(el) {
  if (!el) return;
  const unit = el.querySelector('.putar__unit');
  const bayangan = el.querySelector('.putar__bayangan');
  const pantul = el.querySelector('.putar__pantul');
  // Batas bawah unit di foto (PNG transparan punya ruang kosong di bawah) -> pantulan menempel di roda
  let batasBawah = 1;
  function ukurBatasBawah() {
    try {
      const c = document.createElement('canvas'), w = 80, h = Math.round(80 * unit.naturalHeight / unit.naturalWidth) || 60;
      c.width = w; c.height = h;
      const g = c.getContext('2d'); g.drawImage(unit, 0, 0, w, h);
      const d = g.getImageData(0, 0, w, h).data;
      for (let y = h - 1; y >= 0; y--) {
        for (let x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 40) { batasBawah = (y + 1) / h; ke(target); return; }
      }
    } catch (e) {}
  }
  if (pantul) { if (unit.complete) ukurBatasBawah(); else unit.addEventListener('load', ukurBatasBawah); }
  const MAKS = 35;                 // sudut miring maksimal (derajat)
  let target = 0, sudut = 0, awalX = 0, awalSudut = 0, geser = false, jalan = false;

  const batasi = v => Math.max(-MAKS, Math.min(MAKS, v));
  function gambar() {
    sudut += (target - sudut) * 0.14;
    if (Math.abs(target - sudut) < 0.05) sudut = target;
    const r = sudut / MAKS;
    unit.style.transform = `rotateY(${sudut.toFixed(2)}deg) rotateX(${(Math.abs(r) * 4).toFixed(2)}deg) scale(${(1 - Math.abs(r) * 0.04).toFixed(3)})`;
    unit.style.filter = `drop-shadow(${(-r * 18).toFixed(1)}px 16px 18px rgba(0,0,0,.18)) brightness(${(1 + r * 0.06).toFixed(3)})`;
    if (pantul) {
      pantul.style.width = unit.offsetWidth + 'px';
      pantul.style.top = (unit.offsetTop + unit.offsetHeight * (2 * batasBawah - 1) - 2) + 'px';
      pantul.style.transform = `translateX(-50%) rotateY(${sudut.toFixed(2)}deg) scaleY(-1)`;
    }
    bayangan.style.transform = `translateX(${(-r * 14).toFixed(1)}%) scaleX(${(1 - Math.abs(r) * 0.18).toFixed(3)})`;
    if (sudut !== target || geser) requestAnimationFrame(gambar); else jalan = false;
  }
  function ke(v) { target = batasi(v); if (!jalan) { jalan = true; requestAnimationFrame(gambar); } }
  function sudahDipakai() { el.classList.add('is-dipakai'); }

  el.addEventListener('pointerdown', e => {
    geser = true; awalX = e.clientX; awalSudut = target;
    el.setPointerCapture(e.pointerId); el.classList.add('is-geser'); sudahDipakai(); ke(target);
  });
  el.addEventListener('pointermove', e => {
    if (!geser) return;
    ke(awalSudut + (e.clientX - awalX) * (MAKS * 2 / Math.max(el.clientWidth, 1)));
  });
  const lepas = () => { geser = false; el.classList.remove('is-geser'); };
  el.addEventListener('pointerup', lepas);
  el.addEventListener('pointercancel', lepas);
  el.addEventListener('dblclick', () => ke(0));
  el.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); sudahDipakai(); ke(target - 7); }
    if (e.key === 'ArrowRight') { e.preventDefault(); sudahDipakai(); ke(target + 7); }
  });

  ke(0);
  // Gerak contoh singkat saat pop-up dibuka (tidak untuk "reduce motion")
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    [[350, -22], [1050, 22], [1750, 0]].forEach(([ms, v]) =>
      setTimeout(() => { if (!el.classList.contains('is-dipakai')) ke(v); }, ms));
  }
}

/* =========================================
   MODAL DETAIL PRODUK
   ========================================= */
function initModalProduk() {
  const modal = document.getElementById('modalProduk');
  if (!modal) return;

  const base = document.body.dataset.base || '';
  const box  = modal.querySelector('.modal__box');

  const teks = (kunci, fallback) =>
    (typeof t === 'function' && t(kunci)) ? t(kunci) : fallback;

  function buka(id) {
    const p = PRODUK.find(x => x.id === id);
    if (!p) return;
    const brand = BRANDS.find(b => b.id === p.brand);
    if (!brand) return;

    const pesanWA = `Halo, saya tertarik dengan ${brand.nama} ${p.nama}. Mohon informasi harga dan ketersediaannya.`;
    const daftarKegunaan = teksList(p.kegunaan);

    box.innerHTML = `
      <button class="modal__close" data-tutup aria-label="Tutup">&times;</button>
      <div class="modal__grid">

        ${p.brand === 'zoomlion' ? `
${htmlPutar(base + gambarWeb(p.gambar), altProduk(p), 'modal__media')}` : `
        <div class="modal__media">
          <img src="${base}${gambarWeb(p.gambar)}" alt="${altProduk(p)}" onerror="this.style.visibility='hidden'">
        </div>`}

        <div class="modal__body">
          <img src="${base}${brand.logo}" alt="${brand.nama}" class="modal__brand">
          ${p.seri ? `<span class="modal__seri">${p.seri}</span>` : ''}
          <h2 class="modal__title">${p.nama}</h2>
          <p class="modal__ringkas">${teksField(p.ringkas)}</p>

          <div class="modal__split">

            <div class="modal__col">
              <h3 class="modal__subtitle">${teks('modal.kegunaan', 'Keterangan')}</h3>
              ${daftarKegunaan.length ? `
                <ul class="check-list">
                  ${daftarKegunaan.map(k => `<li>${k}</li>`).join('')}
                </ul>` : '<p class="modal__ringkas">&mdash;</p>'}
            </div>

            <div class="modal__col">
              <h3 class="modal__subtitle">${teks('modal.spesifikasi', 'Spesifikasi')}</h3>
              ${p.spesifikasi?.length ? `
                <table class="spec-table">
                  ${p.spesifikasi.map(s => `<tr><td>${labelSpec(s.label)}</td><td>${nilaiSpec(s.nilai)}</td></tr>`).join('')}
                </table>` : '<p class="modal__ringkas">&mdash;</p>'}
            </div>

          </div>

          <div class="modal__actions">
            <a href="${waLink(pesanWA)}" target="_blank" rel="noopener" class="btn btn--wa">
              ${teks('modal.tanyaWA', 'Tanya via WhatsApp')}
            </a>
            ${typeof unduhBrosur === 'function' ? `
            <button class="btn btn--outline" onclick="unduhBrosur('${p.id}', this)">
              ${teks('modal.brosur', 'Download PDF')}
            </button>` : ''}
            <a href="${base}${urlProduk(p)}" class="btn btn--outline">
              ${teks('modal.detail', 'Lihat Halaman Lengkap')}
            </a>
            <button class="btn btn--outline" data-tutup>${teks('modal.tutup', 'Tutup')}</button>
          </div>
        </div>

      </div>`;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (typeof initImageFallback === 'function') initImageFallback();
    jalankanPutar(box.querySelector('[data-putar]'));
  }

  function tutup() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const kartu = e.target.closest('[data-produk]');
    if (kartu) {
      /* Ctrl/Cmd/Shift + klik tetap membuka halaman detail */
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      buka(kartu.dataset.produk);
      return;
    }
    if (e.target.closest('[data-tutup]') || e.target === modal) tutup();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') tutup();
  });
}