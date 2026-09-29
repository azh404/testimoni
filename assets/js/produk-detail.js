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
    /* Dua kolom di layar lebar (lihat .is-dua-kolom di produk-detail.css) */
    tbody.closest('table').classList.toggle('is-dua-kolom', p.spesifikasi.length >= 6);
    tbody.style.setProperty('--baris', Math.ceil(p.spesifikasi.length / 2));
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
  wa:   '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>',
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
