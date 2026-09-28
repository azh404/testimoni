/* =========================================
   HALAMAN ARTIKEL
   ========================================= */

function formatTanggal(iso) {
  const bulan = {
    id: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    zh: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
  };
  const lang = (typeof BAHASA !== 'undefined') ? BAHASA : 'id';
  const d = new Date(iso);
  const list = bulan[lang] || bulan.id;

  if (lang === 'zh') return `${d.getFullYear()}年${list[d.getMonth()]}${d.getDate()}日`;
  if (lang === 'en') return `${list[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  return `${d.getDate()} ${list[d.getMonth()]} ${d.getFullYear()}`;
}

function namaKategoriArtikel(id) {
  return KATEGORI_ARTIKEL.find(k => k.id === id)?.nama || '';
}

/* '## ' = sub-judul, '### ' = sub-sub-judul, '---' = garis pemisah */
function bagianIsi(teks) {
  if (teks === '---')          return '<hr>';
  if (teks.startsWith('### ')) return `<h4>${teks.slice(4)}</h4>`;
  if (teks.startsWith('## '))  return `<h3>${teks.slice(3)}</h3>`;
  return `<p>${teks}</p>`;
}

function kartuArtikel(a, base, i = 0) {
  return `
    <article class="artikel-card" data-artikel="${a.id}" style="animation-delay:${i * 60}ms">
      <div class="artikel-card__media">
        <img src="${base}${a.gambar}" alt="${a.judul}" loading="lazy" onerror="this.style.visibility='hidden'">
      </div>
      <div class="artikel-card__body">
        <span class="artikel-card__badge">${namaKategoriArtikel(a.kategori)}</span>
        <h3 class="artikel-card__judul">${a.judul}</h3>
        <p class="artikel-card__ringkas">${a.ringkas}</p>
        <span class="artikel-card__tanggal">${formatTanggal(a.tanggal)}</span>
      </div>
    </article>`;
}

function initHalamanArtikel() {
  const wrapFilter = document.getElementById('filterArtikel');
  const wrapGrid   = document.getElementById('artikelGrid');
  if (!wrapGrid) return;

  const base = document.body.dataset.base || '';

  /* Urutkan dari yang terbaru */
  const semua = [...ARTIKEL].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  const kategoriAktif = KATEGORI_ARTIKEL.filter(
    k => semua.some(a => a.kategori === k.id)
  );

  if (wrapFilter) {
    wrapFilter.innerHTML = `
      <button class="filter-btn is-active" data-kategori="all">
        Semua <span>${semua.length}</span>
      </button>
      ${kategoriAktif.map(k => {
        const n = semua.filter(a => a.kategori === k.id).length;
        return `<button class="filter-btn" data-kategori="${k.id}">${k.nama} <span>${n}</span></button>`;
      }).join('')}
    `;

    wrapFilter.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      wrapFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      render(btn.dataset.kategori);
    });
  }

  function render(kategori) {
    const items = kategori === 'all'
      ? semua
      : semua.filter(a => a.kategori === kategori);

    wrapGrid.innerHTML = items.length
      ? items.map((a, i) => kartuArtikel(a, base, i)).join('')
      : `<p class="produk-empty">Belum ada artikel.</p>`;

    if (typeof initImageFallback === 'function') initImageFallback();
  }

  render('all');
}

/* =========================================
   MODAL ARTIKEL
   ========================================= */
function initModalArtikel() {
  const modal = document.getElementById('modalArtikel');
  if (!modal) return;

  const base = document.body.dataset.base || '';
  const box  = modal.querySelector('.modal__box');

  function buka(id) {
    const a = ARTIKEL.find(x => x.id === id);
    if (!a) return;

    box.innerHTML = `
      <button class="modal__close" data-tutup aria-label="Tutup">&times;</button>
      <div class="artikel-detail">
        <div class="artikel-detail__media">
          <img src="${base}${a.gambar}" alt="${a.judul}" onerror="this.style.visibility='hidden'">
        </div>
        <div class="artikel-detail__body">
          <span class="artikel-card__badge">${namaKategoriArtikel(a.kategori)}</span>
          <h2 class="artikel-detail__judul">${a.judul}</h2>
          <p class="artikel-detail__meta">${formatTanggal(a.tanggal)} &middot; ${a.penulis || ''}</p>
          ${a.isi.map(bagianIsi).join('')}
        </div>
      </div>`;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (typeof initImageFallback === 'function') initImageFallback();
  }

  function tutup() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const kartu = e.target.closest('[data-artikel]');
    if (kartu) { buka(kartu.dataset.artikel); return; }
    if (e.target.closest('[data-tutup]') || e.target === modal) tutup();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') tutup();
  });
}