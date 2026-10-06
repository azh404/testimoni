/* =========================================
   FITUR TAMBAHAN (dimuat otomatis oleh main.js di semua halaman)
   1. Pencarian produk (tombol kaca pembesar di navbar)
   2. "Terakhir Anda lihat" (halaman produk & beranda)
   3. Tombol Bagikan (halaman produk & artikel)
   ========================================= */

/* --- Memuat data produk yang belum ada di halaman ini --- */
function muatSkrip(src) {
  return new Promise((ok, gagal) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = ok;
    s.onerror = gagal;
    document.body.appendChild(s);
  });
}

let janjiDataProduk = null;
function pastikanDataProduk() {
  if (janjiDataProduk) return janjiDataProduk;
  const base = document.body.dataset.base || '';
  janjiDataProduk = (async () => {
    if (typeof BRANDS === 'undefined') await muatSkrip(`${base}assets/js/data/brands.js`);
    for (const b of BRANDS) {
      if (!PRODUK.some(p => p.brand === b.id)) await muatSkrip(`${base}assets/js/data/produk-${b.id}.js`);
    }
    if (typeof urlProduk === 'undefined') await muatSkrip(`${base}assets/js/filter-produk.js`);
  })();
  return janjiDataProduk;
}

/* =========================================
   1. PENCARIAN PRODUK
   ========================================= */
const CONTOH_CARI = ['Traktor', 'Drone', 'Combine', 'RK504', 'J100', 'Dryer'];
const KATA_SATUAN = new Set(['l', 'liter', 'litre', 'ha', 'hektar', 'hp', 'kg', 'kw', 'unit', 'mm', 'm']);

const rapat = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9一-鿿]+/g, '');

function indeksProduk(p) {
  const brand = (BRANDS.find(b => b.id === p.brand) || {}).nama || '';
  const kat = (typeof KATEGORI_TEKS !== 'undefined' && KATEGORI_TEKS[p.kategori]) || {};
  const ringkas = p.ringkas && typeof p.ringkas === 'object' ? Object.values(p.ringkas).join(' ') : (p.ringkas || '');
  return {
    nama: rapat(`${p.nama} ${p.seri || ''}`),
    kelompok: rapat(`${brand} ${ALT_KATEGORI[p.kategori] || ''} ${kat.id || ''} ${kat.en || ''} ${kat.zh || ''} ${p.kategori}`),
    lain: rapat(`${ringkas} ${(p.spesifikasi || []).map(s => `${s.label} ${typeof s.nilai === 'string' ? s.nilai : ''}`).join(' ')}`)
  };
}

function cariProduk(kueri) {
  const kata = String(kueri).toLowerCase().split(/\s+/).map(rapat).filter(k => k && !KATA_SATUAN.has(k));
  if (!kata.length) return [];
  const nilai = PRODUK.map(p => {
    const ix = indeksProduk(p);
    let skor = 0, cocok = 0;
    kata.forEach(k => {
      const s = ix.nama.includes(k) ? 6 : ix.kelompok.includes(k) ? 3 : ix.lain.includes(k) ? 1 : 0;
      if (s) { skor += s + (ix.nama.startsWith(k) ? 2 : 0); cocok++; }
    });
    return { p, skor, semua: cocok === kata.length };
  }).filter(x => x.skor > 0);
  const lengkap = nilai.filter(x => x.semua);
  return (lengkap.length ? lengkap : nilai).sort((a, b) => b.skor - a.skor).slice(0, 8).map(x => x.p);
}

function renderHasilCari() {
  const panel = document.getElementById('cariPanel');
  if (!panel || typeof PRODUK === 'undefined' || typeof urlProduk === 'undefined') return;
  const kueri = panel.querySelector('input').value.trim();
  const wadah = panel.querySelector('.cari__hasil');
  const base = document.body.dataset.base || '';

  if (!kueri) {
    wadah.innerHTML = `
      <p class="cari__info">${t('cari.contoh')}</p>
      <div class="cari__contoh">${CONTOH_CARI.map(c => `<button type="button" data-contoh="${c}">${c}</button>`).join('')}</div>`;
    return;
  }
  const hasil = cariProduk(kueri);
  wadah.innerHTML = hasil.length
    ? `<ul class="cari__daftar">${hasil.map(p => {
        const brand = (BRANDS.find(b => b.id === p.brand) || {}).nama || '';
        return `<li><a href="${base}${urlProduk(p)}" data-hasil-cari>
          <img src="${base}${gambarKecil(p.gambar)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
          <span><strong>${p.nama}</strong><small>${brand} · ${BAHASA === 'id' ? (ALT_KATEGORI[p.kategori] || '') : namaKategori(p.kategori, p.brand)}</small></span>
        </a></li>`;
      }).join('')}</ul>`
    : `<p class="cari__info">${t('cari.kosong').replace('{q}', kueri.replace(/</g, '&lt;'))}</p>
       <a href="#" class="btn btn--accent btn--block" data-wa-link data-wa-pesan="Halo, saya mencari produk: ${kueri.replace(/"/g, '&quot;')}">${t('cari.tanyaWA')}</a>`;
  if (typeof isiDataPerusahaan === 'function') isiDataPerusahaan();
}

function bukaCari() {
  let panel = document.getElementById('cariPanel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'cariPanel';
    panel.className = 'cari';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.innerHTML = `
      <div class="cari__kotak">
        <div class="cari__baris">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 109.5 16a6.5 6.5 0 004.2-1.6l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"/></svg>
          <input type="search" autocomplete="off" enterkeyhint="search">
          <button type="button" class="cari__tutup" data-tutup-cari>&times;</button>
        </div>
        <div class="cari__hasil" aria-live="polite"></div>
      </div>`;
    document.body.appendChild(panel);

    const input = panel.querySelector('input');
    input.addEventListener('input', renderHasilCari);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { const a = panel.querySelector('[data-hasil-cari]'); if (a) a.click(); }
    });
    panel.addEventListener('click', e => {
      if (e.target === panel || e.target.closest('[data-tutup-cari]')) { tutupCari(); return; }
      const contoh = e.target.closest('[data-contoh]');
      if (contoh) { input.value = contoh.dataset.contoh; renderHasilCari(); input.focus(); return; }
      if (e.target.closest('[data-hasil-cari]') && typeof gtag === 'function') {
        gtag('event', 'search', { search_term: input.value.trim() });
      }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) tutupCari(); });
  }
  labelCari();
  panel.hidden = false;
  document.body.classList.add('cari-terbuka');
  panel.querySelector('input').focus();
  panel.querySelector('.cari__hasil').innerHTML = `<p class="cari__info">${t('cari.memuat')}</p>`;
  pastikanDataProduk().then(renderHasilCari).catch(() => {
    panel.querySelector('.cari__hasil').innerHTML = `<p class="cari__info">${t('cari.gagal')}</p>`;
  });
}

function tutupCari() {
  const panel = document.getElementById('cariPanel');
  if (!panel) return;
  panel.hidden = true;
  document.body.classList.remove('cari-terbuka');
  document.getElementById('tombolCari')?.focus();
}

function labelCari() {
  const tombol = document.getElementById('tombolCari');
  if (tombol) tombol.setAttribute('aria-label', t('cari.tombol'));
  const panel = document.getElementById('cariPanel');
  if (!panel) return;
  panel.setAttribute('aria-label', t('cari.tombol'));
  panel.querySelector('input').placeholder = t('cari.placeholder');
  panel.querySelector('.cari__tutup').setAttribute('aria-label', t('wa.tutup'));
  if (!panel.hidden) renderHasilCari();
}

/* =========================================
   2. TERAKHIR ANDA LIHAT
   Disimpan di browser pengunjung (localStorage), maks. 8 produk.
   ========================================= */
const KUNCI_DILIHAT = 'dass_dilihat';

function bacaDilihat() {
  try { return JSON.parse(localStorage.getItem(KUNCI_DILIHAT)) || []; } catch (e) { return []; }
}

function catatDilihat() {
  const id = document.body.dataset.produkId;
  const p = id && typeof PRODUK !== 'undefined' && PRODUK.find(x => x.id === id);
  if (!p) return;
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  const url = canonical.replace(/^https?:\/\/[^/]+\//, '');
  if (!url) return;
  const brand = (BRANDS.find(b => b.id === p.brand) || {}).nama || '';
  const daftar = bacaDilihat().filter(x => x.id !== id);
  daftar.unshift({ id, nama: p.nama, brand, url, gambar: p.gambar.replace(/\.png$/, '-kecil.webp') });
  try { localStorage.setItem(KUNCI_DILIHAT, JSON.stringify(daftar.slice(0, 8))); } catch (e) {}
}

function renderDilihat() {
  const base = document.body.dataset.base || '';
  const daftar = bacaDilihat().filter(x => x.id !== document.body.dataset.produkId);
  let wadah = document.getElementById('terakhirDilihat');

  if (!wadah) {
    /* Halaman produk: sebelum "Produk Lainnya"; beranda: setelah kartu brand */
    const acuan = document.querySelector('.detail-lainnya-head')?.closest('section')
      || document.getElementById('produk')?.nextElementSibling;
    if (!acuan) return;
    wadah = document.createElement('section');
    wadah.id = 'terakhirDilihat';
    wadah.className = 'section section--flush-top dilihat';
    acuan.before(wadah);
    wadah.addEventListener('click', e => {
      if (!e.target.closest('[data-hapus-dilihat]')) return;
      try { localStorage.removeItem(KUNCI_DILIHAT); } catch (err) {}
      wadah.hidden = true;
    });
  }
  wadah.hidden = !daftar.length;
  if (!daftar.length) return;
  wadah.innerHTML = `
    <div class="container">
      <div class="dilihat__kepala">
        <h2>${t('dilihat.judul')}</h2>
        <button type="button" data-hapus-dilihat>${t('dilihat.hapus')}</button>
      </div>
      <div class="dilihat__daftar">
        ${daftar.map(x => `
          <a href="${base}${x.url}" class="dilihat__item">
            <img src="${base}${x.gambar}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
            <span><small>${x.brand}</small>${x.nama}</span>
          </a>`).join('')}
      </div>
    </div>`;
}

/* =========================================
   3. TOMBOL BAGIKAN (WhatsApp, Facebook, salin link)
   Di HP yang mendukung, tombol "Bagikan" membuka menu berbagi bawaan.
   ========================================= */
const IKON_BAGIKAN = {
  asli:  '<path d="M18 16.1c-.8 0-1.4.3-2 .8l-7.1-4.2c.1-.2.1-.5.1-.7s0-.5-.1-.7L16 7.2c.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3c0 .2 0 .5.1.7L8 9.8C7.5 9.3 6.8 9 6 9c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2-.8l7.1 4.2c-.1.2-.1.4-.1.6 0 1.6 1.3 2.9 2.9 2.9s2.9-1.3 2.9-2.9-1.2-2.9-2.8-2.9z"/>',
  wa:    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>',
  fb:    '<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V8.9c0-.6.4-.9 1-.9z"/>',
  salin: '<path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1zm3 4H8a2 2 0 00-2 2v14c0 1.1.9 2 2 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h11v14z"/>'
};
const ikonBagikan = k => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${IKON_BAGIKAN[k]}</svg>`;

function dataBagikan() {
  const url = document.querySelector('link[rel="canonical"]')?.href || location.href.split('#')[0];
  const h1 = [...document.querySelectorAll('h1')].find(h => h.offsetParent !== null) || document.querySelector('h1');
  return { url, judul: `${h1 ? h1.textContent.trim() : document.title} | PT Diesel Agri Sukses Sejahtera` };
}

function htmlBagikan() {
  const { url, judul } = dataBagikan();
  const teks = encodeURIComponent(`${judul}\n${url}`);
  return `
    <span class="detail-bagikan__label">${t('bagikan.label')}</span>
    ${navigator.share ? `<button type="button" data-bagikan="asli">${ikonBagikan('asli')}<span>${t('bagikan.bagikan')}</span></button>` : ''}
    <a href="https://wa.me/?text=${teks}" target="_blank" rel="noopener" data-bagikan="whatsapp" class="is-wa">${ikonBagikan('wa')}<span>WhatsApp</span></a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener" data-bagikan="facebook" class="is-fb">${ikonBagikan('fb')}<span>Facebook</span></a>
    <button type="button" data-bagikan="salin">${ikonBagikan('salin')}<span>${t('bagikan.salin')}</span></button>`;
}

function renderBagikan() {
  /* Halaman produk: satu baris; halaman artikel: satu per blok bahasa */
  const acuan = document.querySelector('.detail-actions')
    ? [document.querySelector('.detail-banding') || document.querySelector('.detail-actions')]
    : [...document.querySelectorAll('.artikel-halaman .artikel-detail__meta')];
  acuan.forEach(el => {
    let wrap = el.nextElementSibling;
    if (!wrap || !wrap.classList.contains('detail-bagikan')) {
      wrap = document.createElement('div');
      wrap.className = 'detail-bagikan';
      el.after(wrap);
    }
    wrap.innerHTML = htmlBagikan();
  });
}

document.addEventListener('click', async e => {
  const btn = e.target.closest('.detail-bagikan button[data-bagikan]');
  if (!btn) return;
  const { url, judul } = dataBagikan();
  if (btn.dataset.bagikan === 'asli') {
    try { await navigator.share({ title: judul, text: judul, url }); } catch (err) {}
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
  } catch (err) {
    const tmp = Object.assign(document.createElement('textarea'), { value: url });
    document.body.appendChild(tmp); tmp.select(); document.execCommand('copy'); tmp.remove();
  }
  const label = btn.querySelector('span');
  label.textContent = t('bagikan.tersalin');
  setTimeout(() => { label.textContent = t('bagikan.salin'); }, 2000);
});

/* =========================================
   INISIALISASI (dipanggil ulang saat bahasa diganti)
   ========================================= */
function initFitur() {
  const tombol = document.getElementById('tombolCari');
  if (tombol && !tombol.dataset.siap) {
    tombol.dataset.siap = '1';
    tombol.addEventListener('click', bukaCari);
  }
  if (!initFitur.sudah) { initFitur.sudah = true; catatDilihat(); }
  labelCari();
  renderDilihat();
  renderBagikan();
}
initFitur();
