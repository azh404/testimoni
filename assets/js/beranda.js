/* =========================================
   BERANDA — bagian tambahan
   (angka, kategori, unit pilihan, artikel terbaru)
   Didaftarkan juga di gantiBahasa() (i18n.js).
   ========================================= */

/* Showcase produk: tab kategori → daftar unit (unit pertama tampil besar) */
const BERANDA_SHOWCASE = [
  ['tractor',       ['zl-rk704', 'zl-rk504', 'zl-rk754', 'zl-rc904']],
  ['harvester',     ['zl-zl145', 'zl-zl125', 'zl-h7-4500', 'zl-f6-3000']],
  ['sugarcane',     ['zl-c610', 'zl-c620', 'zl-c600']],
  ['dryer',         ['zl-5hxg-30e', 'zl-5hxg-30c1', 'zl-5hxh-30']],
  ['sprayer-drone', ['ea-j150', 'ea-j100', 'ea-30x']],
  ['va-steering',   ['va-hd818', 'va-hd812', 'va-hd408']]
];
let showcaseTab = 0;
let showcaseUnit = 0;

function initBeranda() {
  const wrapShow = document.getElementById('berandaShowcase');
  if (!wrapShow) return;

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

  renderShowcase();
  renderArtikelBeranda();

  if (typeof terapkanBahasa === 'function') terapkanBahasa();
  if (typeof initReveal     === 'function') initReveal();
  if (typeof initCounter    === 'function') initCounter();
}

function renderShowcase() {
  const wrap = document.getElementById('berandaShowcase');
  if (!wrap) return;
  const base = document.body.dataset.base || '';
  const tabs = BERANDA_SHOWCASE
    .map(([kat, ids]) => [kat, ids.map(id => PRODUK.find(p => p.id === id)).filter(Boolean)])
    .filter(([, items]) => items.length);
  if (!tabs.length) return;
  showcaseTab = Math.min(showcaseTab, tabs.length - 1);
  const [kat, items] = tabs[showcaseTab];
  showcaseUnit = Math.min(showcaseUnit, items.length - 1);
  const p = items[showcaseUnit];
  const brand = BRANDS.find(b => b.id === p.brand);

  /* 4 spesifikasi pertama selain "Model" */
  const spek = (p.spesifikasi || []).filter(x => !/^model$/i.test(x.label)).slice(0, 4);
  const label = (x) => typeof tSpec === 'function' ? tSpec(x) : x;
  const nilai = (x) => typeof tNilai === 'function' ? tNilai(x) : x;
  const pesan = `Halo, saya ingin menanyakan unit ${brand.nama} ${p.nama}. Mohon info harga dan ketersediaannya.`;

  wrap.innerHTML = `
    <div class="showcase__tabs" role="tablist">
      ${tabs.map(([k, it], i) => `
        <button class="showcase__tab${i === showcaseTab ? ' is-active' : ''}" role="tab"
                aria-selected="${i === showcaseTab}" data-tab="${i}">
          ${namaKategori(k, it[0].brand)}
        </button>`).join('')}
    </div>

    <div class="showcase__panggung" data-brand="${p.brand}">
      <div class="showcase__media">
        <span class="showcase__bayang" aria-hidden="true">${p.nama}</span>
        <img src="${base}${gambarWeb(p.gambar)}" alt="${altProduk(p)}" loading="lazy" decoding="async">
      </div>
      <div class="showcase__info">
        <img class="showcase__logo" src="${base}${brand.logo}" alt="${brand.nama}" loading="lazy">
        <span class="showcase__kategori">${namaKategori(kat, p.brand)}</span>
        <h3 class="showcase__nama">${p.nama}</h3>
        <p class="showcase__ringkas">${teksField(p.ringkas) || ''}</p>
        <dl class="showcase__spek">
          ${spek.map(x => `<div><dt>${label(x.label)}</dt><dd>${nilai(x.nilai)}</dd></div>`).join('')}
        </dl>
        <div class="showcase__aksi">
          <a href="${base}${urlProduk(p)}" class="btn btn--primary" data-i18n="show.detail">Lihat Detail</a>
          <a href="${waLink(pesan)}" target="_blank" rel="noopener" class="btn btn--wa" data-i18n="show.wa">Tanya via WhatsApp</a>
        </div>
      </div>
    </div>

    <div class="showcase__daftar">
      ${items.map((x, i) => `
        <button class="showcase__thumb${i === showcaseUnit ? ' is-active' : ''}" data-unit="${i}" aria-label="${x.nama}">
          <img src="${base}${gambarKecil(x.gambar)}" alt="" loading="lazy" decoding="async">
          <span>${x.nama}</span>
        </button>`).join('')}
    </div>`;

  wrap.onclick = (e) => {
    const tab = e.target.closest('[data-tab]');
    const unit = e.target.closest('[data-unit]');
    if (tab) { showcaseTab = +tab.dataset.tab; showcaseUnit = 0; }
    else if (unit) { showcaseUnit = +unit.dataset.unit; }
    else return;
    renderShowcase();
    if (typeof terapkanBahasa === 'function') terapkanBahasa();
  };
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
