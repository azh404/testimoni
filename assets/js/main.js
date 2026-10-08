/* =========================================
   MAIN — pemuat komponen & data global
   ========================================= */

/* Base path: "" untuk halaman root, "../../" untuk halaman di subfolder.
   Diambil dari atribut data-base pada <body>. */
const BASE = document.body.dataset.base || '';

/* --- Memuat partial HTML ---
   Berkas partial sengaja berakhiran .txt, bukan .html: Live Server (VS Code)
   menyisipkan script ke setiap file .html sehingga isinya terpotong di akhir
   (bagian bawah footer hilang saat diuji lokal). */
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

  /* Status jam kerja di kartu WhatsApp halaman kontak */
  const online = sedangJamKerja();
  document.querySelectorAll('[data-wa-status]').forEach(el => {
    if (online === null) return;
    el.textContent = t(online ? 'wa.online' : 'wa.offline');
    el.classList.toggle('is-online', online);
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
    /* Tombol hijau hanya membuka menu; yang dihitung adalah pilihan di menu */
    if (el.classList.contains('wa-float') && document.getElementById('waMenu')) return;
    const href = el.getAttribute('href') || '';
    const onclick = el.getAttribute('onclick') || '';
    const jenis =
      el.dataset.bagikan             ? 'bagikan'       :
      /wa\.me|whatsapp/i.test(href) ? 'klik_whatsapp' :
      href.startsWith('tel:')        ? 'klik_telepon'  :
      href.startsWith('mailto:')     ? 'klik_email'    :
      onclick.includes('unduhBrosur') ? 'unduh_brosur' : '';
    if (!jenis) return;
    gtag('event', jenis, {
      halaman: location.pathname,
      tombol: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 80),
      produk: document.body.dataset.produkId || '',
      topik: el.dataset.waTopik || el.dataset.bagikan || ''
    });
  });
}

/* =========================================
   TOMBOL WHATSAPP PINTAR
   Tombol hijau melayang membuka menu pilihan tujuan chat,
   supaya pesan yang masuk langsung jelas maksudnya.
   (Tanpa JavaScript tetap berfungsi sebagai link WA biasa.)
   ========================================= */
function produkSaatIni() {
  const id = document.body.dataset.produkId;
  const p = id && typeof PRODUK !== 'undefined' && PRODUK.find(x => x.id === id);
  if (!p) return '';
  const brand = (typeof BRANDS !== 'undefined' && BRANDS.find(b => b.id === p.brand)) || {};
  return `${brand.nama || ''} ${p.nama}`.trim();
}

function pilihanWA() {
  const produk = produkSaatIni();
  const tentang = produk ? ` ${produk}` : '';
  return [
    { topik: 'harga',      label: t('wa.harga'),      pesan: `Halo, saya ingin menanyakan harga dan ketersediaan${tentang || ' unit'}.` },
    { topik: 'konsultasi', label: t('wa.konsultasi'), pesan: `Halo, saya ingin konsultasi memilih unit yang sesuai untuk lahan saya.${produk ? ` Saya tertarik dengan ${produk}.` : ''}` },
    { topik: 'brosur',     label: t('wa.brosur'),     pesan: `Halo, saya ingin meminta brosur/katalog${tentang}.` },
    { topik: 'lain',       label: t('wa.lain'),       pesan: WA_PESAN_DEFAULT }
  ];
}

/* Apakah sekarang jam kerja (waktu Jakarta)? */
function sedangJamKerja() {
  const j = COMPANY.jamKerja;
  if (!j) return null;
  const bagian = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
    .formatToParts(new Date()).reduce((o, x) => (o[x.type] = x.value, o), {});
  const hari = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(bagian.weekday) + 1;
  const jam = Number(bagian.hour) + Number(bagian.minute) / 60;
  return j.hari.includes(hari) && jam >= j.buka && jam < j.tutup;
}

function initWaMenu() {
  const tombol = document.querySelector('.wa-float');
  if (!tombol) return;

  let menu = document.getElementById('waMenu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'waMenu';
    menu.className = 'wa-menu';
    menu.hidden = true;
    document.body.appendChild(menu);

    tombol.setAttribute('aria-haspopup', 'true');
    tombol.setAttribute('aria-expanded', 'false');
    tombol.setAttribute('aria-controls', 'waMenu');

    const tutup = () => { menu.hidden = true; tombol.setAttribute('aria-expanded', 'false'); };
    tombol.addEventListener('click', e => {
      e.preventDefault();
      if (menu.hidden) initWaMenu();   /* perbarui status online */
      menu.hidden = !menu.hidden;
      tombol.setAttribute('aria-expanded', String(!menu.hidden));
      if (!menu.hidden) menu.querySelector('a')?.focus();
    });
    menu.addEventListener('click', e => { if (e.target.closest('a, [data-wa-tutup]')) tutup(); });
    document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target) && !tombol.contains(e.target)) tutup(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { tutup(); tombol.focus(); } });
  }

  const online = sedangJamKerja();
  menu.innerHTML = `
    <div class="wa-menu__kepala">
      <div>
        <strong>${t('wa.judul')}</strong>
        ${online === null ? '' : `<span class="wa-menu__status${online ? ' is-online' : ''}">${t(online ? 'wa.online' : 'wa.offline')}</span>`}
      </div>
      <button type="button" class="wa-menu__tutup" data-wa-tutup aria-label="${t('wa.tutup')}">&times;</button>
    </div>
    ${pilihanWA().map(o => `<a href="${waLink(o.pesan)}" target="_blank" rel="noopener" data-wa-topik="${o.topik}">${o.label}</a>`).join('')}`;
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
  await loadPartial('#site-header', 'navbar.txt');
  await loadPartial('#site-footer', 'footer.txt');

  isiDataPerusahaan();
  tandaiMenuAktif();
  initWaMenu();
  initAnalitik();
  initNavbar();

  if (typeof initBahasa === 'function') initBahasa();

  if (typeof initHeroSlider    === 'function') initHeroSlider();
  if (typeof initReveal        === 'function') initReveal();
  if (typeof initCounter       === 'function') initCounter();
  if (typeof initProdukTabs    === 'function') initProdukTabs();
  if (typeof initBeranda       === 'function') initBeranda();
  if (typeof initHalamanBrand  === 'function') initHalamanBrand();
  if (typeof initBrandGallery  === 'function') initBrandGallery();
  if (typeof initModalProduk   === 'function') initModalProduk();
  if (typeof initHalamanDetail === 'function') initHalamanDetail();
  if (typeof initImageFallback === 'function') initImageFallback();
    if (typeof initFormKontak === 'function') initFormKontak();

  /* Pencarian & tombol bagikan */
  const fitur = document.createElement('script');
  fitur.src = `${BASE}assets/js/fitur.js`;
  document.body.appendChild(fitur);

  /* Form leads (pop-up & form sebelum unduh brosur) — hanya bila COMPANY.leadsUrl diisi */
  if (COMPANY.leadsUrl) {
    const leads = document.createElement('script');
    leads.src = `${BASE}assets/js/leads.js`;
    document.body.appendChild(leads);
  }
  /* Chatbot AI "Asisten DASS" — hanya bila COMPANY.chatbotUrl diisi */
  if (COMPANY.chatbotUrl) {
    const chat = document.createElement('script');
    chat.src = `${BASE}assets/js/chatbot.js`;
    document.body.appendChild(chat);
  }
  if (typeof initKalkulator    === 'function') initKalkulator();
  if (typeof initBandingkan    === 'function') initBandingkan();
});