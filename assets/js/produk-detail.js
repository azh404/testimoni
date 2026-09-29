/* =========================================
   HALAMAN DETAIL PRODUK
   Teks bawaan halaman sudah ditulis dalam bahasa
   Indonesia (supaya terbaca Google). File ini hanya
   menggantinya saat pengunjung memilih English / 中文.
   ========================================= */

const LABEL_KATEGORI_ID = {
  'hybrid':        'Traktor Hybrid',
  'tractor':       'Traktor',
  'planter':       'Rice Transplanter',
  'harvester':     'Combine Harvester',
  'sugarcane':     'Mesin Panen Tebu',
  'dryer':         'Mesin Pengering Gabah',
  'baler':         'Mesin Baler',
  'implement':     'Implement Traktor',
  'sprayer-drone': 'Drone Sprayer Pertanian',
  'va-drone':      'Drone Pertanian',
  'va-steering':   'Auto Steering Traktor',
  'va-rover':      'Robot Pertanian',
  'va-digital':    'Solusi Pertanian Digital'
};

function labelKategoriDetail(p) {
  if (BAHASA === 'id') return LABEL_KATEGORI_ID[p.kategori] || p.kategori;
  const teks = (typeof tKategori === 'function') ? tKategori(p.kategori) : '';
  if (teks) return teks;
  const k = (KATEGORI[p.brand] || []).find(x => x.id === p.kategori);
  return k ? k.nama : p.kategori;
}

function initHalamanDetail() {
  const id = document.body.dataset.produkId;
  if (!id || typeof PRODUK === 'undefined') return;

  const p = PRODUK.find(x => x.id === id);
  if (!p) return;

  /* Judul tab browser: nama produk untuk EN & ZH */
  const h1 = document.querySelector('.detail-info h1');
  if (JUDUL_ASLI === null) JUDUL_ASLI = document.title;
  document.title = (BAHASA === 'id' || !h1) ? JUDUL_ASLI : `${h1.textContent.trim()} | DASS`;

  /* Kategori (bisa muncul di beberapa tempat) */
  const kat = labelKategoriDetail(p);
  document.querySelectorAll('[data-detail="kategori"]').forEach(el => { el.textContent = kat; });

  /* Kategori di kartu "Produk Lainnya" ditulis dalam bahasa Indonesia */
  document.querySelectorAll('.produk-card__kategori').forEach(el => {
    if (!el.dataset.kategori) {
      const label = el.textContent.trim();
      el.dataset.kategori = Object.keys(LABEL_KATEGORI_ID).find(k => LABEL_KATEGORI_ID[k] === label) || '';
    }
    const id = el.dataset.kategori;
    if (id) el.textContent = labelKategoriDetail({ kategori: id, brand: p.brand });
  });

  renderBagikan();

  /* Ringkasan */
  const ringkas = document.querySelector('[data-detail="ringkas"]');
  if (ringkas) {
    const teks = tField(p.ringkas);
    if (teks) ringkas.textContent = teks;
  }

  /* Keunggulan */
  const ul = document.querySelector('[data-detail="kegunaan"]');
  const daftar = tList(p.kegunaan);
  if (ul && daftar.length) {
    ul.textContent = '';
    daftar.forEach(k => {
      const li = document.createElement('li');
      li.textContent = k;
      ul.appendChild(li);
    });
  }

  /* Spesifikasi */
  const tbody = document.querySelector('[data-detail="spesifikasi"]');
  if (tbody && p.spesifikasi && p.spesifikasi.length) {
    tbody.textContent = '';
    p.spesifikasi.forEach(s => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      const td = document.createElement('td');
      th.scope = 'row';
      th.textContent = tSpec(s.label);
      td.textContent = tNilai(tField(s.nilai));
      tr.append(th, td);
      tbody.appendChild(tr);
    });
  }
}

/* =========================================
   TOMBOL BAGIKAN (WhatsApp, Facebook, salin link)
   Di HP yang mendukung, tombol "Bagikan" membuka menu
   berbagi bawaan (bisa ke aplikasi apa pun).
   ========================================= */
const IKON_BAGIKAN = {
  asli: '<path d="M18 16.1c-.8 0-1.4.3-2 .8l-7.1-4.2c.1-.2.1-.5.1-.7s0-.5-.1-.7L16 7.2c.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3c0 .2 0 .5.1.7L8 9.8C7.5 9.3 6.8 9 6 9c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2-.8l7.1 4.2c-.1.2-.1.4-.1.6 0 1.6 1.3 2.9 2.9 2.9s2.9-1.3 2.9-2.9-1.2-2.9-2.8-2.9z"/>',
  wa:   '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 004.79 1.22c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z"/>',
  fb:   '<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V8.9c0-.6.4-.9 1-.9z"/>',
  salin:'<path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1zm3 4H8a2 2 0 00-2 2v14c0 1.1.9 2 2 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h11v14z"/>'
};
const ikon = k => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${IKON_BAGIKAN[k]}</svg>`;

function renderBagikan() {
  const aksi = document.querySelector('.detail-actions');
  if (!aksi) return;
  let wrap = document.querySelector('.detail-bagikan');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'detail-bagikan';
    (document.querySelector('.detail-banding') || aksi).after(wrap);

    wrap.addEventListener('click', async e => {
      const btn = e.target.closest('button[data-bagikan]');
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
  }

  const { url, judul } = dataBagikan();
  const teks = encodeURIComponent(`${judul}\n${url}`);
  wrap.innerHTML = `
    <span class="detail-bagikan__label">${t('bagikan.label')}</span>
    ${navigator.share ? `<button type="button" data-bagikan="asli">${ikon('asli')}<span>${t('bagikan.bagikan')}</span></button>` : ''}
    <a href="https://wa.me/?text=${teks}" target="_blank" rel="noopener" data-bagikan="whatsapp" class="is-wa">${ikon('wa')}<span>WhatsApp</span></a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener" data-bagikan="facebook" class="is-fb">${ikon('fb')}<span>Facebook</span></a>
    <button type="button" data-bagikan="salin">${ikon('salin')}<span>${t('bagikan.salin')}</span></button>`;
}

function dataBagikan() {
  const url = document.querySelector('link[rel="canonical"]')?.href || location.href.split('#')[0];
  const h1 = document.querySelector('.detail-info h1');
  return { url, judul: `${h1 ? h1.textContent.trim() : document.title} | PT Diesel Agri Sukses Sejahtera` };
}
