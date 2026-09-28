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

  nav.querySelectorAll('.nav__link, .dropdown__link')
     .forEach(link => link.addEventListener('click', () => {
       if (window.innerWidth <= 992) tutupMenu();
     }));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) tutupMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) tutupMenu();
  });
}