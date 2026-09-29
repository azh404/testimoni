/* =========================================
   BANDINGKAN PRODUK (bandingkan.html)
   Pilih 2–3 produk (2 di HP) dalam satu kategori, spesifikasinya
   tampil berdampingan. Pilihan tersimpan di alamat
   halaman (?p=zl-rk504,zl-rk704) sehingga bisa dibagikan.
   ========================================= */

const URUTAN_KATEGORI_BANDING = ['tractor', 'hybrid', 'harvester', 'sprayer-drone', 'va-drone',
  'planter', 'sugarcane', 'dryer', 'baler', 'implement', 'va-steering'];

const bandingState = { kategori: null, pilih: [] };

/* Di HP cukup 2 kolom supaya tabel muat tanpa digeser ke samping */
const layarKecil = window.matchMedia('(max-width: 640px)');
const maksUnit = () => (layarKecil.matches ? 2 : 3);

function produkKategori(kat) {
  return PRODUK.filter(p => p.kategori === kat);
}

function kategoriBanding() {
  const ada = new Set(PRODUK.map(p => p.kategori));
  return URUTAN_KATEGORI_BANDING.filter(k => ada.has(k) && produkKategori(k).length >= 2);
}

function labelKategoriBanding(k) {
  const p = PRODUK.find(x => x.kategori === k);
  return BAHASA === 'id' ? (ALT_KATEGORI[k] || k) : namaKategori(k, p.brand);
}

/* --- Baca & simpan pilihan di alamat halaman --- */
function bacaPilihanUrl() {
  const ids = (new URLSearchParams(location.search).get('p') || '')
    .split(',').map(s => s.trim()).filter(id => PRODUK.some(p => p.id === id));
  if (ids.length) {
    bandingState.kategori = PRODUK.find(p => p.id === ids[0]).kategori;
    bandingState.pilih = ids.filter(id => PRODUK.find(p => p.id === id).kategori === bandingState.kategori).slice(0, maksUnit());
  }
  if (!bandingState.kategori) bandingState.kategori = kategoriBanding()[0];
  isiPilihanKosong();
}

function isiPilihanKosong() {
  const daftar = produkKategori(bandingState.kategori).map(p => p.id);
  bandingState.pilih = bandingState.pilih.filter(id => daftar.includes(id));
  /* Isi otomatis dengan model terdekat (sesudah unit pertama di daftar) */
  const mulai = Math.max(daftar.indexOf(bandingState.pilih[0]), 0);
  const urut = [...daftar.slice(mulai), ...daftar.slice(0, mulai)];
  for (const id of urut) {
    if (bandingState.pilih.length >= 2) break;
    if (!bandingState.pilih.includes(id)) bandingState.pilih.push(id);
  }
}

function simpanPilihanUrl() {
  const url = `${location.pathname}?p=${bandingState.pilih.filter(Boolean).join(',')}`;
  try { history.replaceState(null, '', url); } catch (e) {}
}

/* --- Tampilan --- */
function renderPilihan() {
  /* Tombol kategori, dikelompokkan per merek */
  const kategori = kategoriBanding();
  document.getElementById('bdKategori').innerHTML = BRANDS.map(b => {
    const milik = kategori.filter(k => PRODUK.find(p => p.kategori === k).brand === b.id);
    if (!milik.length) return '';
    return `
      <div class="banding__merek">
        <img src="${document.body.dataset.base || ''}${b.logo}" alt="${b.nama}" class="banding__logo">
        <div class="banding__chips">
          ${milik.map(k => `<button type="button" class="filter-btn${k === bandingState.kategori ? ' is-active' : ''}"
            data-kategori="${k}" aria-pressed="${k === bandingState.kategori}">${labelKategoriBanding(k)} <span>${produkKategori(k).length}</span></button>`).join('')}
        </div>
      </div>`;
  }).join('');

  /* Kartu foto unit dalam kategori terpilih */
  const base = document.body.dataset.base || '';
  const penuh = bandingState.pilih.length >= maksUnit();
  document.getElementById('bdPetunjuk').textContent = t('banding.petunjuk').replace('{n}', maksUnit());
  document.getElementById('bdUnit').innerHTML = produkKategori(bandingState.kategori).map(p => {
    const urutan = bandingState.pilih.indexOf(p.id);
    const dipilih = urutan > -1;
    return `
      <button type="button" class="banding__kartu${dipilih ? ' is-dipilih' : ''}" data-unit="${p.id}"
              aria-pressed="${dipilih}"${!dipilih && penuh ? ' disabled' : ''}>
        ${dipilih ? `<span class="banding__nomor">${urutan + 1}</span>` : ''}
        <img src="${base}${gambarKecil(p.gambar)}" alt="" loading="lazy" decoding="async" onerror="this.style.visibility='hidden'">
        <span>${p.nama}</span>
      </button>`;
  }).join('');
}

function renderTabel() {
  const wrap = document.getElementById('bdHasil');
  const produk = bandingState.pilih.filter(Boolean).map(id => PRODUK.find(p => p.id === id));
  if (produk.length < 2) {
    wrap.innerHTML = `<p class="banding__kosong">${t('banding.minimal')}</p>`;
    return;
  }
  const hanyaBeda = document.getElementById('bdBeda').checked;
  const base = document.body.dataset.base || '';

  /* Gabungan semua label spesifikasi, urut sesuai kemunculan */
  const label = [];
  produk.forEach(p => (p.spesifikasi || []).forEach(s => { if (!label.includes(s.label)) label.push(s.label); }));
  const nilai = (p, l) => {
    const s = (p.spesifikasi || []).find(x => x.label === l);
    return s ? tNilai(tField(s.nilai)) : '–';
  };

  const baris = label.map(l => {
    const isi = produk.map(p => nilai(p, l));
    const beda = new Set(isi).size > 1;
    if (hanyaBeda && !beda) return '';
    return `<tr class="${beda ? 'is-beda' : ''}"><th scope="row">${tSpec(l)}</th>${isi.map(v => `<td>${v}</td>`).join('')}</tr>`;
  }).join('');

  wrap.innerHTML = `
    <div class="banding__bingkai">
      <table class="banding__tabel banding__tabel--${produk.length}">
        <thead>
          <tr class="banding__foto">
            <td></td>
            ${produk.map(p => `
              <td>
                <a href="${base}${urlProduk(p)}"><img src="${base}${gambarKecil(p.gambar)}" alt="${altProduk(p)}" loading="lazy" decoding="async" onerror="this.style.visibility='hidden'"></a>
              </td>`).join('')}
          </tr>
          <tr class="banding__nama">
            <th scope="col"><span class="sr-only">${t('banding.spek')}</span></th>
            ${produk.map(p => `
              <th scope="col">
                <a href="${base}${urlProduk(p)}">${p.nama}</a>
                <button type="button" class="banding__hapus" data-hapus="${p.id}" aria-label="${t('banding.hapus')}: ${p.nama}" title="${t('banding.hapus')}">&times;</button>
              </th>`).join('')}
          </tr>
        </thead>
        <tbody>${baris || `<tr><td colspan="${produk.length + 1}">${t('banding.samaSemua')}</td></tr>`}</tbody>
        <tfoot>
          <tr>
            <th scope="row"></th>
            ${produk.map(p => `<td><a href="#" class="btn btn--accent btn--block" data-wa-link
              data-wa-pesan="Halo, saya sedang membandingkan ${produk.map(x => x.nama).join(' vs ').replace(/"/g, '&quot;')} di website. Mohon info harga ${p.nama.replace(/"/g, '&quot;')}.">${t('banding.tanya')}</a></td>`).join('')}
          </tr>
        </tfoot>
      </table>
    </div>`;
  if (typeof isiDataPerusahaan === 'function') isiDataPerusahaan();
}

function renderBanding() {
  renderPilihan();
  renderTabel();
  simpanPilihanUrl();
}

/* --- Inisialisasi (dipanggil ulang saat bahasa diganti) --- */
function initBandingkan() {
  const katSel = document.getElementById('bdKategori');
  if (!katSel) return;

  if (!katSel.dataset.siap) {
    katSel.dataset.siap = '1';
    bacaPilihanUrl();

    katSel.addEventListener('click', e => {
      const btn = e.target.closest('[data-kategori]');
      if (!btn || btn.dataset.kategori === bandingState.kategori) return;
      bandingState.kategori = btn.dataset.kategori;
      bandingState.pilih = [];
      isiPilihanKosong();
      renderBanding();
    });
    document.getElementById('bdUnit').addEventListener('click', e => {
      const kartu = e.target.closest('[data-unit]');
      if (!kartu || kartu.disabled) return;
      const id = kartu.dataset.unit;
      bandingState.pilih = bandingState.pilih.includes(id)
        ? bandingState.pilih.filter(x => x !== id)
        : [...bandingState.pilih, id].slice(0, maksUnit());
      renderBanding();
    });
    document.getElementById('bdHasil').addEventListener('click', e => {
      const x = e.target.closest('[data-hapus]');
      if (!x) return;
      bandingState.pilih = bandingState.pilih.filter(id => id !== x.dataset.hapus);
      renderBanding();
    });
    /* Layar diputar/diperkecil: sesuaikan jumlah kolom */
    layarKecil.addEventListener('change', () => {
      bandingState.pilih = bandingState.pilih.slice(0, maksUnit());
      renderBanding();
    });
    document.getElementById('bdBeda').addEventListener('change', renderTabel);
  }
  renderBanding();
}
