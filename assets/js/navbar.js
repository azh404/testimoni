/* =========================================
   NAVBAR — sticky & menu mobile
   ========================================= */

function initNavbar() {
  const header  = document.getElementById('header');
  const toggle  = document.getElementById('navToggle');
  const nav     = document.getElementById('mainNav');
  const overlay = document.getElementById('navOverlay');

  if (!header) return;

  /* Bayangan saat di-scroll */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
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