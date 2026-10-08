/* =========================================
   NAVBAR — sticky & menu mobile
   ========================================= */

function initNavbar() {
  const header  = document.getElementById('header');
  const toggle  = document.getElementById('navToggle');
  const nav     = document.getElementById('mainNav');
  const overlay = document.getElementById('navOverlay');

  if (!header) return;

  /* Navbar transparan di semua halaman. Beranda (ada .hero video): video tampil di belakang navbar. */
  header.classList.add('header--transparan');
  if (document.querySelector('.hero')) document.body.classList.add('nav-transparan');

  /* Posisi scroll dibaca dari beberapa sumber: di sebagian browser/ekstensi yang men-scroll
     adalah <body>, bukan window, sehingga window.scrollY tetap 0 */
  const posisi = () => Math.max(window.scrollY || 0, document.documentElement.scrollTop || 0, document.body.scrollTop || 0);

  /* Apakah latar tepat di bawah navbar gelap? (warna/gradasi gelap, foto, atau video) */
  const terang = rgb => {
    const [r, g, b, a = 1] = rgb.split(',').map(Number);
    return { gelap: (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.55, padat: a > 0.5 };
  };
  const latarGelap = el => {
    for (; el && el !== document.documentElement; el = el.parentElement) {
      if (el.tagName === 'VIDEO' || el.tagName === 'IMG') return el.closest('.hero, .brand-hero') ? true : null;
      const cs = getComputedStyle(el);
      const gbr = cs.backgroundImage;
      if (gbr && gbr !== 'none') {
        if (gbr.includes('url(')) return true;
        const m = gbr.match(/rgba?\(([^)]+)\)/);
        if (m) return terang(m[1]).gelap;
      }
      const w = cs.backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (w) { const t = terang(w[1]); if (t.padat) return t.gelap; }
    }
    return false;
  };
  /* Ambil 5 titik di sepanjang menu; tulisan putih bila sebagian besar latarnya gelap */
  const cekLatar = () => {
    const y = Math.round(header.offsetHeight / 2);
    const hasil = [0.3, 0.45, 0.6, 0.75, 0.9].map(f => {
      const el = document.elementsFromPoint(Math.round(innerWidth * f), y).find(e => !header.contains(e) && e !== header);
      return latarGelap(el) === true;
    });
    header.classList.toggle('di-atas-gelap', hasil.filter(Boolean).length >= 3);
  };

  /* Halaman yang bagian pertamanya gelap (mis. hero halaman merek): bagian itu ikut naik ke belakang navbar,
     jadi tidak ada strip putih di atasnya */
  const pertama = document.querySelector('main > section, main > div');
  if (pertama && !document.body.classList.contains('nav-transparan') && latarGelap(pertama) === true) {
    document.body.classList.add('nav-transparan');
    pertama.style.paddingTop = `calc(${getComputedStyle(pertama).paddingTop} + var(--header-height))`;
  }

  let antre = false;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', posisi() > 10);
    if (antre) return;
    antre = true;
    requestAnimationFrame(() => { antre = false; cekLatar(); });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  document.body.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
  window.addEventListener('resize', onScroll);
  onScroll();

  if (!toggle || !nav) return;

  const tutupMenu = () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    overlay?.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const terbuka = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', terbuka);
    overlay?.classList.toggle('is-open', terbuka);
    toggle.setAttribute('aria-expanded', String(terbuka));
    document.body.style.overflow = terbuka ? 'hidden' : '';
  });

  overlay?.addEventListener('click', tutupMenu);

  nav.querySelectorAll('.nav__link:not(.nav__link--drop), .dropdown__link')
     .forEach(link => link.addEventListener('click', () => {
       if (window.innerWidth <= 992) tutupMenu();
     }));

  /* Tombol "Produk": klik membuka/menutup daftar merek (untuk layar sentuh;
     di laptop daftar juga terbuka saat kursor diarahkan) */
  const itemDrop = nav.querySelector('.nav__item--has-drop');
  const tombolDrop = itemDrop?.querySelector('.nav__link--drop');
  const aturDrop = (buka) => {
    if (!itemDrop) return;
    itemDrop.classList.toggle('is-open', buka);
    tombolDrop.setAttribute('aria-expanded', String(buka));
  };
  tombolDrop?.addEventListener('click', e => {
    e.stopPropagation();
    if (window.innerWidth > 992) aturDrop(!itemDrop.classList.contains('is-open'));
  });
  document.addEventListener('click', e => {
    if (itemDrop && !itemDrop.contains(e.target)) aturDrop(false);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') aturDrop(false);
    if (e.key === 'Escape' && nav.classList.contains('is-open')) tutupMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) tutupMenu();
  });
}