/* =========================================
   MAIN — pemuat komponen & data global
   ========================================= */

/* Base path: "" untuk halaman root, "../../" untuk halaman di subfolder.
   Diambil dari atribut data-base pada <body>. */
const BASE = document.body.dataset.base || '';

/* --- Memuat partial HTML --- */
async function loadPartial(selector, file) {
  const target = document.querySelector(selector);
  if (!target) return;

  try {
    const res = await fetch(`${BASE}partials/${file}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Gagal memuat ${file} (${res.status})`);
    const html = await res.text();
    target.innerHTML = html.replaceAll('{{base}}', BASE);
  } catch (err) {
    console.error('[Partial]', err);
  }
}

/* --- Mengisi data perusahaan ke elemen [data-company] --- */
function isiDataPerusahaan() {
  const map = {
    'nama':    COMPANY.nama,
    'telepon': COMPANY.telepon,
    'email':   COMPANY.email,
    'alamat':  alamatLengkap(),
    'jam':     COMPANY.jamOperasional
  };

  document.querySelectorAll('[data-company]').forEach(el => {
    const key = el.dataset.company;
    if (map[key]) { el.textContent = map[key]; return; }
    if (key === 'telepon-link') el.href = `tel:${COMPANY.telepon.replace(/[^\d+]/g, '')}`;
    if (key === 'email-link')   el.href = `mailto:${COMPANY.email}`;
  });

  document.querySelectorAll('[data-wa-link]').forEach(el => {
    el.href = waLink(el.dataset.waPesan || WA_PESAN_DEFAULT);
    el.target = '_blank';
    el.rel = 'noopener';
  });

  document.querySelectorAll('[data-sosmed]').forEach(el => {
    const url = COMPANY.sosmed[el.dataset.sosmed];
    if (url && url !== '#') {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener';
    } else {
      el.style.display = 'none';
    }
  });

  const tahun = document.getElementById('tahunSekarang');
  if (tahun) tahun.textContent = new Date().getFullYear();
}

/* --- Menandai menu aktif --- */
function tandaiMenuAktif() {
  const halaman = document.body.dataset.page;
  if (!halaman) return;
  document.querySelectorAll(`.nav__link[data-page="${halaman}"]`)
          .forEach(el => el.classList.add('is-active'));
}

/* --- Jalankan --- */
document.addEventListener('DOMContentLoaded', async () => {
    if (typeof initHalamanArtikel === 'function') initHalamanArtikel();
  if (typeof initModalArtikel   === 'function') initModalArtikel();
  await loadPartial('#site-header', 'navbar.html');
  await loadPartial('#site-footer', 'footer.html');

  isiDataPerusahaan();
  tandaiMenuAktif();
  initNavbar();

  if (typeof initBahasa === 'function') initBahasa();

  if (typeof initHeroSlider    === 'function') initHeroSlider();
  if (typeof initReveal        === 'function') initReveal();
  if (typeof initCounter       === 'function') initCounter();
  if (typeof initProdukTabs    === 'function') initProdukTabs();
  if (typeof initHalamanBrand  === 'function') initHalamanBrand();
  if (typeof initBrandGallery  === 'function') initBrandGallery();
  if (typeof initModalProduk   === 'function') initModalProduk();
  if (typeof initHalamanDetail === 'function') initHalamanDetail();
  if (typeof initImageFallback === 'function') initImageFallback();
    if (typeof initFormKontak === 'function') initFormKontak();
});