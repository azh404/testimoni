/* =========================================
   FEED INSTAGRAM BERANDA ("Ikuti Kami di Instagram")
   Data dari behold.so (JSON) — alamatnya di COMPANY.instagramFeedUrl.
   Dimuat saat bagian hampir terlihat (hemat untuk PageSpeed),
   disimpan sementara di sessionStorage. renderInstagram() juga
   dipanggil gantiBahasa() (i18n.js).
   ========================================= */

const IG_MAKS = 12;
/* Angka pengikut/mengikuti disembunyikan (9 Okt: angka masih kecil, kurang meyakinkan untuk B2B). Ubah ke true untuk menampilkan. */
const IG_TAMPIL_ANGKA = false;
let igData = null;

const IG_IKON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor"/></svg>';
const IG_PUTAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>';
const IG_ALBUM = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="3" width="14" height="14" rx="2.5" fill="currentColor"/><path d="M4 7v12a2 2 0 0 0 2 2h12" fill="none" stroke="currentColor" stroke-width="2"/></svg>';

function igEsc(teks) {
  return String(teks == null ? '' : teks).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* Hanya alamat https (data dari luar) */
function igUrl(url) {
  return /^https:\/\//i.test(url || '') ? url : '';
}

function igWaktu(iso) {
  const detik = (new Date(iso).getTime() - Date.now()) / 1000;
  if (!isFinite(detik)) return '';
  const lokal = { id: 'id', en: 'en', zh: 'zh-CN' }[BAHASA] || 'id';
  const rtf = new Intl.RelativeTimeFormat(lokal, { numeric: 'auto' });
  const satuan = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
  for (const [nama, s] of satuan) {
    if (Math.abs(detik) >= s) return rtf.format(Math.round(detik / s), nama);
  }
  return rtf.format(0, 'minute');
}

function igAngka(n) {
  if (typeof n !== 'number') return '';
  const lokal = { id: 'id-ID', en: 'en-US', zh: 'zh-CN' }[BAHASA] || 'id-ID';
  return new Intl.NumberFormat(lokal, { notation: 'compact', maximumFractionDigits: 1 }).format(n);
}

/* Behold: format baru { username, posts: [...] } atau format lama [ ... ] */
function igRapikan(json) {
  const posts = Array.isArray(json) ? json : (json && json.posts) || [];
  const profil = Array.isArray(json) ? {} : json || {};
  return {
    username: profil.username || (COMPANY.sosmed.instagram || '').split('/').filter(Boolean).pop() || '',
    foto: igUrl(profil.profilePictureUrl),
    pengikut: profil.followersCount,
    mengikuti: profil.followsCount,
    postingan: profil.mediaCount,
    posts: posts.map(p => {
      const s = p.sizes || {};
      const video = p.mediaType === 'VIDEO';
      return {
        link: igUrl(p.permalink),
        gambar: igUrl((s.medium && s.medium.mediaUrl) || (s.large && s.large.mediaUrl) ||
                      p.thumbnailUrl || (!video && p.mediaUrl)),
        video,
        album: p.mediaType === 'CAROUSEL_ALBUM',
        waktu: p.timestamp,
        teks: p.prunedCaption || p.caption || ''
      };
    }).filter(p => p.link && p.gambar).slice(0, IG_MAKS)
  };
}

function renderInstagram() {
  const bagian = document.getElementById('berandaInstagram');
  if (!bagian || !igData || !igData.posts.length) return;

  const avatar = igData.foto || 'assets/images/logo/logo.png';
  const urlProfil = COMPANY.sosmed.instagram;
  const nama = '@' + igEsc(igData.username);

  const statistik = !IG_TAMPIL_ANGKA ? '' : [['postingan', igData.postingan], ['pengikut', igData.pengikut], ['mengikuti', igData.mengikuti]]
    .filter(([, n]) => typeof n === 'number')
    .map(([k, n]) => `<li><b>${igAngka(n)}</b><span>${t('ig.' + k)}</span></li>`).join('');

  document.getElementById('igProfil').innerHTML = `
    <a class="ig-avatar" href="${igEsc(urlProfil)}" target="_blank" rel="noopener" aria-label="${nama}">
      <img src="${igEsc(avatar)}" alt="" loading="lazy" width="72" height="72">
    </a>
    <div class="ig-profil__nama">
      <b>${igEsc(igData.username)}</b>
      <span>PT Diesel Agri Sukses Sejahtera</span>
    </div>
    ${statistik ? `<ul class="ig-profil__angka">${statistik}</ul>` : ''}
    <a class="ig-ikuti" href="${igEsc(urlProfil)}" target="_blank" rel="noopener">${IG_IKON}<span>${t('ig.ikuti')}</span></a>`;

  document.getElementById('igTrack').innerHTML = igData.posts.map(p => `
    <a class="ig-kartu" href="${igEsc(p.link)}" target="_blank" rel="noopener" title="${t('ig.lihat')}">
      <span class="ig-kartu__media">
        <img src="${igEsc(p.gambar)}" alt="${igEsc(p.teks.slice(0, 120))}" loading="lazy" width="400" height="500">
        ${p.video ? `<span class="ig-kartu__jenis">${IG_PUTAR}</span>` : p.album ? `<span class="ig-kartu__jenis">${IG_ALBUM}</span>` : ''}
      </span>
      <span class="ig-kartu__isi">
        <span class="ig-kartu__teks">${igEsc(p.teks)}</span>
        <span class="ig-kartu__kaki"><small>${igEsc(igWaktu(p.waktu))}</small><span class="ig-kartu__ikon">${IG_IKON}</span></span>
      </span>
    </a>`).join('');

  bagian.querySelectorAll('[data-ig-geser]').forEach(btn => {
    btn.setAttribute('aria-label', t(btn.dataset.igGeser === '1' ? 'ig.berikut' : 'ig.sebelum'));
  });
  bagian.hidden = false;
  igAturTombol();
}

function igAturTombol() {
  const track = document.getElementById('igTrack');
  if (!track) return;
  const maks = track.scrollWidth - track.clientWidth - 2;
  document.querySelector('[data-ig-geser="-1"]').disabled = track.scrollLeft <= 2;
  document.querySelector('[data-ig-geser="1"]').disabled = track.scrollLeft >= maks;
}

async function igMuat() {
  const kunci = 'dass-ig-feed';
  try {
    const simpan = JSON.parse(sessionStorage.getItem(kunci) || 'null');
    if (simpan && Date.now() - simpan.waktu < 3600e3) igData = igRapikan(simpan.json);
  } catch (e) {}
  if (!igData) {
    try {
      const res = await fetch(COMPANY.instagramFeedUrl);
      if (!res.ok) return;
      const json = await res.json();
      igData = igRapikan(json);
      try { sessionStorage.setItem(kunci, JSON.stringify({ waktu: Date.now(), json })); } catch (e) {}
    } catch (e) { return; }   /* gagal → bagian tetap tersembunyi */
  }
  renderInstagram();
}

function initInstagram() {
  const bagian = document.getElementById('berandaInstagram');
  if (!bagian || !COMPANY.instagramFeedUrl) return;

  const track = document.getElementById('igTrack');
  bagian.querySelectorAll('[data-ig-geser]').forEach(btn => btn.addEventListener('click', () => {
    const kartu = track.querySelector('.ig-kartu');
    const langkah = kartu ? kartu.offsetWidth + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth;
    track.scrollBy({ left: langkah * Number(btn.dataset.igGeser), behavior: 'smooth' });
  }));
  track.addEventListener('scroll', igAturTombol, { passive: true });
  window.addEventListener('resize', igAturTombol);

  /* Muat saat bagian hampir terlihat (bagian tersembunyi → amati elemen sebelumnya) */
  const pengamat = bagian.previousElementSibling || bagian;
  if (!('IntersectionObserver' in window)) { igMuat(); return; }
  const io = new IntersectionObserver(entri => {
    if (entri.some(e => e.isIntersecting)) { io.disconnect(); igMuat(); }
  }, { rootMargin: '600px 0px' });
  io.observe(pengamat);
}

document.addEventListener('DOMContentLoaded', initInstagram);
