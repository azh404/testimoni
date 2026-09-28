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
