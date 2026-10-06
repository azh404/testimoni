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
  const k = KATEGORI_ARTIKEL.find(x => x.id === id);
  if (!k) return '';
  return (BAHASA !== 'id' && k[BAHASA]) || k.nama;
}

/* Judul/ringkasan artikel sesuai bahasa aktif (lihat artikel-terjemahan.js) */
function teksArtikel(a, kolom) {
  const tr = (typeof ARTIKEL_TERJEMAHAN !== 'undefined') && ARTIKEL_TERJEMAHAN[a.id];
  return (BAHASA !== 'id' && tr && tr[BAHASA] && tr[BAHASA][kolom]) || a[kolom];
}

/* Perkiraan waktu baca (200 kata/menit, dari teks Indonesia) */
function menitBaca(a) {
  const kata = (a.isi || []).join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(kata / 200));
}

/* Foto artikel opsional: tanpa foto (atau foto gagal dimuat) tampil sampul warna DASS */
function mediaArtikel(a, base) {
  /* Warna sampul bervariasi (tetap sama untuk artikel yang sama) */
  const varian = [...a.id].reduce((n, c) => n + c.charCodeAt(0), 0) % 4;
  const sampul = `
        <div class="artikel-sampul artikel-sampul--${varian}">
          <img src="${base}assets/images/logo/logo-dass-putih.png" alt="" loading="lazy">
          <span>${namaKategoriArtikel(a.kategori)}</span>
        </div>`;
  if (!a.gambar) return sampul;
  return `
        <img src="${base}${a.gambar}" alt="${teksArtikel(a, 'judul')}" loading="lazy"
             onerror="this.hidden=true;this.nextElementSibling.hidden=false">
        ${sampul.replace('class="artikel-sampul"', 'class="artikel-sampul" hidden')}`;
}

function kartuArtikel(a, base, i = 0, utama = false) {
  return `
    <a href="${base}artikel/${a.id}.html" class="artikel-card${utama ? ' artikel-card--utama' : ''}" style="animation-delay:${i * 60}ms">
      <div class="artikel-card__media">${mediaArtikel(a, base)}
      </div>
      <div class="artikel-card__body">
        <div class="artikel-card__label">
          ${utama ? `<span class="artikel-card__badge artikel-card__badge--baru">${t('artikel.terbaru')}</span>` : ''}
          <span class="artikel-card__badge">${namaKategoriArtikel(a.kategori)}</span>
        </div>
        <h3 class="artikel-card__judul">${teksArtikel(a, 'judul')}</h3>
        <p class="artikel-card__ringkas">${teksArtikel(a, 'ringkas')}</p>
        <div class="artikel-card__kaki">
          <span class="artikel-card__tanggal">${formatTanggal(a.tanggal)} &middot; ${menitBaca(a)} ${t('artikel.menit')}</span>
          <span class="artikel-card__baca">${t('artikel.baca')} &rarr;</span>
        </div>
      </div>
    </a>`;
}

function initHalamanArtikel() {
  const wrapFilter = document.getElementById('filterArtikel');
  const wrapUtama  = document.getElementById('artikelUtama');
  const wrapGrid   = document.getElementById('artikelGrid');
  if (!wrapGrid) return;

  const base = document.body.dataset.base || '';

  /* Urutkan dari yang terbaru */
  const semua = [...ARTIKEL].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  const kategoriAktif = KATEGORI_ARTIKEL.filter(
    k => semua.some(a => a.kategori === k.id)
  );

  /* Tombol filter hanya berguna bila ada lebih dari satu kategori */
  if (wrapFilter) wrapFilter.style.display = kategoriAktif.length < 2 ? 'none' : '';

  if (wrapFilter) {
    wrapFilter.innerHTML = `
      <button class="filter-btn is-active" data-kategori="all">
        ${t('artikel.semua')} <span>${semua.length}</span>
      </button>
      ${kategoriAktif.map(k => {
        const n = semua.filter(a => a.kategori === k.id).length;
        return `<button class="filter-btn" data-kategori="${k.id}">${namaKategoriArtikel(k.id)} <span>${n}</span></button>`;
      }).join('')}
    `;

    /* Dipanggil ulang saat ganti bahasa: pasang pendengar klik sekali saja */
    if (!wrapFilter.dataset.siap) wrapFilter.dataset.siap = '1';
    else return render('all');

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

    /* Artikel terbaru tampil besar di atas, sisanya di grid */
    const [pertama, ...sisa] = items;
    if (wrapUtama) wrapUtama.innerHTML = pertama ? kartuArtikel(pertama, base, 0, true) : '';
    const daftar = wrapUtama ? sisa : items;

    wrapGrid.innerHTML = daftar.length
      ? daftar.map((a, i) => kartuArtikel(a, base, i + 1)).join('')
      : (items.length ? '' : `<p class="produk-empty">${t('artikel.kosong')}</p>`);

    if (typeof initImageFallback === 'function') initImageFallback();
  }

  render('all');
}
