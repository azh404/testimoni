/* =========================================
   HALAMAN ARTIKEL (artikel/*.html)
   Setiap halaman memuat versi ID, EN, dan ZH
   dalam blok [data-bahasa]. Versi Indonesia tampil
   bawaan (terbaca Google); file ini menampilkan
   versi sesuai bahasa yang dipilih pengunjung.
   ========================================= */

let JUDUL_ASLI_ARTIKEL = null;

function initArtikelHalaman() {
  const blok = document.querySelectorAll('[data-bahasa]');
  if (!blok.length) return;

  const aktif = [...blok].some(el => el.dataset.bahasa === BAHASA) ? BAHASA : 'id';
  blok.forEach(el => { el.hidden = el.dataset.bahasa !== aktif; });

  /* Judul tab browser ikut bahasa aktif */
  const h1 = document.querySelector(`[data-bahasa="${aktif}"] h1, [data-bahasa="${aktif}"] .h1`);
  if (!h1) return;   /* mis. halaman produk: judul diatur produk-detail.js */
  if (JUDUL_ASLI_ARTIKEL === null) JUDUL_ASLI_ARTIKEL = document.title;
  document.title = aktif === 'id' ? JUDUL_ASLI_ARTIKEL : `${h1.textContent} | DASS`;
}
