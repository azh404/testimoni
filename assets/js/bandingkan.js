/* =========================================
   BANDINGKAN PRODUK (bandingkan.html)
   Pilih 2–3 produk dalam satu kategori, spesifikasinya
   tampil berdampingan. Pilihan tersimpan di alamat
   halaman (?p=zl-rk504,zl-rk704) sehingga bisa dibagikan.
   ========================================= */

const URUTAN_KATEGORI_BANDING = ['tractor', 'hybrid', 'harvester', 'sprayer-drone', 'va-drone',
  'planter', 'sugarcane', 'dryer', 'baler', 'implement', 'va-steering'];

const bandingState = { kategori: null, pilih: [] };

function produkKategori(kat) {
  return PRODUK.filter(p => p.kategori === kat);
}

function kategoriBanding() {
  const ada = new Set(PRODUK.map(p => p.kategori));
  return URUTAN_KATEGORI_BANDING.filter(k => ada.has(k) && produkKategori(k).length >= 2);
}

function labelKategoriBanding(k) {
  const p = PRODUK.find(x => x.kategori === k);
  const brand = (BRANDS.find(b => b.id === p.brand) || {}).nama || '';
  const nama = BAHASA === 'id' ? (ALT_KATEGORI[k] || k) : namaKategori(k, p.brand);
  return `${nama} (${brand})`;
}

/* --- Baca & simpan pilihan di alamat halaman --- */
function bacaPilihanUrl() {
  const ids = (new URLSearchParams(location.search).get('p') || '')
    .split(',').map(s => s.trim()).filter(id => PRODUK.some(p => p.id === id));
  if (ids.length) {
    bandingState.kategori = PRODUK.find(p => p.id === ids[0]).kategori;
    bandingState.pilih = ids.filter(id => PRODUK.find(p => p.id === id).kategori === bandingState.kategori).slice(0, 3);
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
  const katSel = document.getElementById('bdKategori');
  katSel.innerHTML = kategoriBanding()
    .map(k => `<option value="${k}">${labelKategoriBanding(k)}</option>`).join('');
  katSel.value = bandingState.kategori;

  const daftar = produkKategori(bandingState.kategori);
  document.querySelectorAll('[data-bd-slot]').forEach(sel => {
    const i = Number(sel.dataset.bdSlot);
    const kosong = i === 2 ? `<option value="">${t('banding.tambah')}</option>` : '';
    sel.innerHTML = kosong + daftar.map(p => `<option value="${p.id}">${p.nama}</option>`).join('');
    sel.value = bandingState.pilih[i] || '';
  });
}

function renderTabel() {
  const wrap = document.getElementById('bdHasil');
  const produk = bandingState.pilih.filter(Boolean).map(id => PRODUK.find(p => p.id === id));
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
    <div class="banding__scroll">
      <table class="banding__tabel">
        <thead>
          <tr>
            <th scope="col"><span class="sr-only">${t('banding.spek')}</span></th>
            ${produk.map(p => `
              <th scope="col">
                <a href="${base}${urlProduk(p)}" class="banding__produk">
                  <img src="${base}${gambarKecil(p.gambar)}" alt="${altProduk(p)}" loading="lazy" decoding="async" onerror="this.style.visibility='hidden'">
                  <span>${p.nama}</span>
                </a>
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

    katSel.addEventListener('change', () => {
      bandingState.kategori = katSel.value;
      bandingState.pilih = [];
      isiPilihanKosong();
      renderBanding();
    });
    document.querySelectorAll('[data-bd-slot]').forEach(sel => {
      sel.addEventListener('change', () => {
        bandingState.pilih[Number(sel.dataset.bdSlot)] = sel.value;
        bandingState.pilih = [...new Set(bandingState.pilih.filter(Boolean))];
        isiPilihanKosong();
        renderBanding();
      });
    });
    document.getElementById('bdBeda').addEventListener('change', renderTabel);
  }
  renderBanding();
}
