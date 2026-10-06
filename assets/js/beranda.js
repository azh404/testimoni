/* =========================================
   BERANDA — bagian tambahan
   (angka, kategori, unit pilihan, artikel terbaru)
   Didaftarkan juga di gantiBahasa() (i18n.js).
   ========================================= */

/* Kategori yang ditampilkan + produk yang fotonya dipakai */
const BERANDA_KATEGORI = [
  ['tractor',       'zl-rk704'],
  ['hybrid',        'zl-dh7-6000'],
  ['harvester',     'zl-zl145'],
  ['sugarcane',     'zl-c610'],
  ['planter',       'zl-g630-g825-g830'],
  ['dryer',         'zl-5hxg-30e'],
  ['sprayer-drone', 'ea-j150'],
  ['va-steering',   null]
];

/* Unit pilihan (urut tampil) */
const BERANDA_PILIHAN = [
  'zl-rk704', 'zl-zl145', 'zl-c610', 'ea-j150',
  'zl-h7-4500', 'zl-g630-g825-g830', 'va-hd540', 'zl-5hxg-30e'
];

function initBeranda() {
  const wrapKat = document.getElementById('berandaKategori');
  if (!wrapKat) return;

  const base = document.body.dataset.base || '';
  const brandDari = id => BRANDS.find(b => b.id === id);

  /* --- Angka --- */
  const isiAngka = (id, nilai) => {
    const el = document.getElementById(id);
    if (el) { el.dataset.count = nilai; el.textContent = nilai + (el.dataset.suffix || ''); }
  };
  const jumlahKategori = Object.values(KATEGORI).flat()
    .filter(k => PRODUK.some(p => p.kategori === k.id)).length;
  isiAngka('statMerek', BRANDS.length);
  isiAngka('statModel', Math.floor(PRODUK.length / 10) * 10);
  isiAngka('statKategori', jumlahKategori);

  /* --- Kategori --- */
  wrapKat.innerHTML = BERANDA_KATEGORI.map(([kat, idFoto], i) => {
    const items = PRODUK.filter(p => p.kategori === kat);
    if (!items.length) return '';
    const p = items.find(x => x.id === idFoto) || items[0];
    const brand = brandDari(p.brand);
    return `
      <a href="${base}${brand.halaman}?kategori=${kat}" class="kat-tile" data-reveal="${i % 4}">
        <div class="kat-tile__media">
          <img src="${base}${gambarKecil(p.gambar)}" alt="${altProduk(p)}" loading="lazy" decoding="async">
        </div>
        <h3 class="kat-tile__nama">${namaKategori(kat, p.brand)}</h3>
        <span class="kat-tile__jumlah">${items.length} <span data-i18n="kat.unit">unit</span> · ${brand.nama}</span>
      </a>`;
  }).join('');

  /* --- Unit pilihan --- */
  const wrapPilih = document.getElementById('berandaPilihan');
  if (wrapPilih) {
    wrapPilih.innerHTML = BERANDA_PILIHAN
      .map(id => PRODUK.find(p => p.id === id))
      .filter(Boolean)
      .map((p, i) => kartuProduk(p, brandDari(p.brand), base, i))
      .join('');
  }

  renderArtikelBeranda();

  if (typeof initImageFallback === 'function') initImageFallback();
  if (typeof terapkanBahasa    === 'function') terapkanBahasa();
  if (typeof initReveal        === 'function') initReveal();
  if (typeof initCounter       === 'function') initCounter();
}

/* --- Artikel terbaru: data artikel (±140 KB) baru dimuat saat bagiannya hampir terlihat --- */
let artikelBerandaDimuat = false;

function renderArtikelBeranda() {
  const wrap = document.getElementById('berandaArtikel');
  if (!wrap) return;

  if (typeof ARTIKEL !== 'undefined' && typeof kartuArtikel === 'function') {
    const base = document.body.dataset.base || '';
    wrap.innerHTML = [...ARTIKEL]
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
      .slice(0, 3)
      .map((a, i) => kartuArtikel(a, base, i))
      .join('');
    return;
  }
  if (artikelBerandaDimuat) return;

  const muat = () => {
    if (artikelBerandaDimuat) return;
    artikelBerandaDimuat = true;
    const base = document.body.dataset.base || '';
    const file = ['data/artikel.js', 'data/artikel-terjemahan.js', 'artikel.js'];
    const berikut = (n) => {
      if (n >= file.length) return renderArtikelBeranda();
      const s = document.createElement('script');
      s.src = `${base}assets/js/${file[n]}`;
      s.onload = () => berikut(n + 1);
      document.body.appendChild(s);
    };
    berikut(0);
  };

  if (!('IntersectionObserver' in window)) return muat();
  const obs = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { obs.disconnect(); muat(); }
  }, { rootMargin: '400px 0px' });
  obs.observe(wrap);
}
