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
    'jam':     (BAHASA !== 'id' && t('kontak.jamIsi')) || COMPANY.jamOperasional
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

/* =========================================
   GOOGLE ANALYTICS — mencatat kunjungan dan klik penting
   (WhatsApp, telepon, email, unduh brosur) supaya terlihat
   halaman mana yang paling banyak mendatangkan calon pembeli.
   Aktif hanya bila COMPANY.googleAnalytics diisi.
   ========================================= */
function initAnalitik() {
  const id = COMPANY.googleAnalytics;
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', id);

  document.addEventListener('click', e => {
    const el = e.target.closest('a, button');
    if (!el) return;
    const href = el.getAttribute('href') || '';
    const onclick = el.getAttribute('onclick') || '';
    const jenis =
      /wa\.me|whatsapp/i.test(href) ? 'klik_whatsapp' :
      href.startsWith('tel:')        ? 'klik_telepon'  :
      href.startsWith('mailto:')     ? 'klik_email'    :
      onclick.includes('unduhBrosur') ? 'unduh_brosur' : '';
    if (!jenis) return;
    gtag('event', jenis, {
      halaman: location.pathname,
      tombol: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 80),
      produk: document.body.dataset.produkId || ''
    });
  });
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
  if (typeof initArtikelHalaman === 'function') initArtikelHalaman();
  if (typeof initHalamanLanding === 'function') initHalamanLanding();
  await loadPartial('#site-header', 'navbar.html');
  await loadPartial('#site-footer', 'footer.html');

  isiDataPerusahaan();
  tandaiMenuAktif();
  initAnalitik();
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
  if (typeof initKalkulator    === 'function') initKalkulator();
  if (typeof initBandingkan    === 'function') initBandingkan();
});