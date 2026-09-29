/* =========================================
   KALKULATOR PERTANIAN (kalkulator.html)
   1. Drone semprot  : waktu kerja, isi ulang tangki, air & tenaga kerja
   2. Pilih traktor  : kelas tenaga (HP) sesuai luas & jenis lahan
   Semua angka adalah estimasi umum, bukan penawaran resmi.
   ========================================= */

/* --- Asumsi perhitungan (ubah di sini bila perlu) --- */
const ASUMSI_DRONE = {
  kecepatan: 5,        // m/detik saat menyemprot
  efisiensi: 0.5,      // porsi waktu efektif (belok, isi ulang, ganti baterai)
  airManual: 300,      // liter/ha dengan knapsack sprayer
  haManualPerHari: 1,  // ha yang bisa disemprot 1 orang per hari
  jamPerHari: 8        // jam kerja drone per hari
};

/* Rekomendasi kelas tenaga [luas maksimum (ha), HP min, HP max] per jenis lahan */
const ATURAN_TRAKTOR = {
  sawah:  [[2, 50, 75], [10, 50, 90], [50, 75, 110], [Infinity, 90, 130]],
  kering: [[5, 50, 80], [20, 70, 110], [100, 110, 160], [Infinity, 160, 230]],
  kebun:  [[20, 75, 110], [100, 90, 160], [500, 130, 200], [Infinity, 180, 275]],
  tebu:   [[50, 110, 160], [300, 160, 230], [Infinity, 200, 320]]
};

/* --- Data dari katalog produk --- */
function angkaSpek(p, pola) {
  const s = (p.spesifikasi || []).find(x => pola.test(x.label));
  if (!s) return null;
  const angka = String(s.nilai).replace(',', '.').match(/\d+(\.\d+)?/g);
  if (!angka) return null;
  const n = angka.slice(0, 2).map(Number);
  return n.reduce((a, b) => a + b, 0) / n.length;   /* "7–8 m" → 7,5 */
}

function daftarDrone() {
  return PRODUK
    .filter(p => p.kategori === 'sprayer-drone' || p.kategori === 'va-drone')
    .map(p => ({ p, tangki: angkaSpek(p, /tangki semprot/i), lebar: angkaSpek(p, /lebar semprot/i) }))
    .filter(d => d.tangki && d.lebar);
}

/* Tenaga dari nama model Zoomlion: RK504 → 50 HP, RS1304 / RS1604 → 130–160 HP */
function tenagaTraktor(p) {
  const hp = [...`${p.seri || ''} ${p.nama}`.matchAll(/[A-Z]{2}(\d{2,3})4\b/g)].map(m => Number(m[1]));
  return hp.length ? [Math.min(...hp), Math.max(...hp)] : null;
}

/* --- Format angka --- */
function fmtAngka(n, desimal = 0) {
  const lokal = BAHASA === 'id' ? 'id-ID' : 'en-US';
  return n.toLocaleString(lokal, { maximumFractionDigits: desimal, minimumFractionDigits: 0 });
}
function fmtJam(jam) {
  const j = Math.floor(jam), m = Math.round((jam - j) * 60);
  return j ? `${j} ${t('kalk.jam')} ${m} ${t('kalk.menit')}` : `${Math.max(m, 1)} ${t('kalk.menit')}`;
}
function nilaiInput(id) {
  const n = parseFloat(String(document.getElementById(id).value).replace(',', '.'));
  return isFinite(n) && n > 0 ? n : 0;
}
function baris(label, nilai, kuat = false) {
  return `<div class="kalk-hasil__baris${kuat ? ' is-kuat' : ''}"><span>${label}</span><strong>${nilai}</strong></div>`;
}

/* =========================================
   1. DRONE SEMPROT
   ========================================= */
function hitungDrone() {
  const hasil = document.getElementById('hasilDrone');
  const d = daftarDrone().find(x => x.p.id === document.getElementById('kdDrone').value);
  const luas = nilaiInput('kdLuas'), dosis = nilaiInput('kdDosis');
  if (!d || !luas || !dosis) { hasil.innerHTML = `<p class="kalk-hasil__kosong">${t('kalk.isiDulu')}</p>`; return; }

  const haPerJam   = d.lebar * ASUMSI_DRONE.kecepatan * 3600 / 10000 * ASUMSI_DRONE.efisiensi;
  const jamDrone   = luas / haPerJam;
  const airDrone   = luas * dosis;
  const isiUlang   = Math.ceil(airDrone / d.tangki);
  const airManual  = luas * ASUMSI_DRONE.airManual;
  const hariOrang  = luas / ASUMSI_DRONE.haManualPerHari;
  const haPerHari  = haPerJam * ASUMSI_DRONE.jamPerHari;
  const setaraOrang = haPerHari / ASUMSI_DRONE.haManualPerHari;

  hasil.innerHTML = `
    <h3 class="kalk-hasil__judul">${t('kalk.hasil')} — ${d.p.nama}</h3>
    ${baris(t('kalk.kapasitas'), `± ${fmtAngka(haPerJam, 1)} ha/${t('kalk.jam')}`)}
    ${baris(t('kalk.waktuDrone'), fmtJam(jamDrone), true)}
    ${baris(t('kalk.isiUlang'), `${fmtAngka(isiUlang)}× (${fmtAngka(d.tangki)} L)`)}
    ${baris(t('kalk.airDrone'), `${fmtAngka(airDrone)} L`)}
    <hr>
    ${baris(t('kalk.waktuManual'), `± ${fmtAngka(hariOrang, 1)} ${t('kalk.hariOrang')}`)}
    ${baris(t('kalk.airManual'), `${fmtAngka(airManual)} L`)}
    ${baris(t('kalk.airHemat'), `${fmtAngka(Math.max(airManual - airDrone, 0))} L`, true)}
    <hr>
    ${baris(t('kalk.haPerHari'), `± ${fmtAngka(haPerHari)} ha`)}
    ${baris(t('kalk.setara'), `± ${fmtAngka(setaraOrang)} ${t('kalk.pekerja')}`, true)}
    <a href="#" class="btn btn--accent btn--block kalk-hasil__cta" data-wa-link
       data-wa-pesan="${pesanWA('drone', `${d.p.nama}, ${fmtAngka(luas, 1)} ha`)}">${t('kalk.ctaDrone')}</a>`;
  if (typeof isiDataPerusahaan === 'function') isiDataPerusahaan();
}

/* =========================================
   2. PILIH TRAKTOR
   ========================================= */
function hitungTraktor() {
  const hasil = document.getElementById('hasilTraktor');
  const lahan = document.getElementById('ktLahan').value;
  const luas  = nilaiInput('ktLuas');
  if (!luas || !ATURAN_TRAKTOR[lahan]) { hasil.innerHTML = `<p class="kalk-hasil__kosong">${t('kalk.isiDulu')}</p>`; return; }

  const [, min, max] = ATURAN_TRAKTOR[lahan].find(([batas]) => luas <= batas);
  const traktor = PRODUK
    .filter(p => p.kategori === 'tractor')
    .map(p => ({ p, hp: tenagaTraktor(p) }))
    .filter(x => x.hp && x.hp[1] >= min && x.hp[0] <= max)
    .sort((a, b) => a.hp[0] - b.hp[0]);

  const base = document.body.dataset.base || '';
  hasil.innerHTML = `
    <h3 class="kalk-hasil__judul">${t('kalk.hasil')}</h3>
    ${baris(t('kalk.kelasHP'), `${min}–${max} HP`, true)}
    <p class="kalk-hasil__catatan">${t('kalk.catatanTraktor')}</p>
    <div class="produk-grid kalk-hasil__grid">
      ${traktor.map((x, i) => kartuProduk(x.p, BRANDS.find(b => b.id === x.p.brand), base, i)).join('')}
    </div>
    <a href="#" class="btn btn--accent btn--block kalk-hasil__cta" data-wa-link
       data-wa-pesan="${pesanWA('traktor', `${t('kalk.lahan.' + lahan)}, ${fmtAngka(luas, 1)} ha`)}">${t('kalk.ctaTraktor')}</a>`;
  if (typeof isiDataPerusahaan === 'function') isiDataPerusahaan();
}

/* Pesan WhatsApp selalu dalam bahasa Indonesia untuk tim sales */
function pesanWA(jenis, detail) {
  const teks = jenis === 'drone'
    ? `Halo, saya sudah mencoba kalkulator drone di website (${detail}). Saya ingin konsultasi drone pertanian.`
    : `Halo, saya sudah mencoba kalkulator traktor di website (${detail}). Saya ingin konsultasi traktor yang cocok.`;
  return teks.replace(/"/g, '&quot;');
}

/* =========================================
   INISIALISASI (dipanggil ulang saat bahasa diganti)
   ========================================= */
function initKalkulator() {
  initKalkMini();
  const pilihDrone = document.getElementById('kdDrone');
  if (!pilihDrone) return;

  /* ?drone=ea-j150 dari tautan "kalkulator lengkap" di halaman produk */
  const dariUrl = new URLSearchParams(location.search).get('drone');
  const dipilih = pilihDrone.value || (daftarDrone().some(d => d.p.id === dariUrl) ? dariUrl : 'ea-j100');
  pilihDrone.innerHTML = daftarDrone().map(d => {
    const brand = (BRANDS.find(b => b.id === d.p.brand) || {}).nama || '';
    return `<option value="${d.p.id}">${brand} ${d.p.nama} — ${fmtAngka(d.tangki)} L, ${fmtAngka(d.lebar, 1)} m</option>`;
  }).join('');
  pilihDrone.value = dipilih;

  const pilihLahan = document.getElementById('ktLahan');
  const lahan = pilihLahan.value || 'sawah';
  pilihLahan.innerHTML = Object.keys(ATURAN_TRAKTOR)
    .map(k => `<option value="${k}">${t('kalk.lahan.' + k)}</option>`).join('');
  pilihLahan.value = lahan;

  if (!pilihDrone.dataset.siap) {
    pilihDrone.dataset.siap = '1';
    document.getElementById('formDrone').addEventListener('input', hitungDrone);
    document.getElementById('formTraktor').addEventListener('input', hitungTraktor);
    document.querySelectorAll('.kalk form').forEach(f => f.addEventListener('submit', e => e.preventDefault()));
  }
  hitungDrone();
  hitungTraktor();
}

/* =========================================
   KALKULATOR MINI DI HALAMAN PRODUK (produk/*.html)
   - Drone  : hitung kebutuhan semprot untuk drone ini
   - Traktor: "Cocok untuk lahan" berdasarkan kelas tenaga
   Wadah: <div data-kalk-mini></div>
   ========================================= */

/* Tenaga (HP) untuk halaman traktor: dari "Daya Motor" (kW) bila ada,
   selain itu dari nama model (RK504 → 50 HP) */
function tenagaProduk(p) {
  const s = (p.spesifikasi || []).find(x => /daya motor/i.test(x.label) && /kW/.test(x.nilai));
  if (s) {
    const kw = String(s.nilai).replace(/(\d)\.(\d{3})/g, '$1$2').replace(/(\d),(\d)/g, '$1.$2')
      .match(/\d+(\.\d+)?(?=\s*kW)/g).map(Number);
    return [Math.round(Math.min(...kw) * 1.341), Math.round(Math.max(...kw) * 1.341)];
  }
  return tenagaTraktor(p);
}

/* Rentang luas per jenis lahan yang sesuai dengan tenaga traktor */
function cocokUntuk(hp) {
  return Object.entries(ATURAN_TRAKTOR).map(([lahan, aturan]) => {
    let dari = null, sampai = null, bawah = 0;
    aturan.forEach(([batas, min, max]) => {
      if (hp[1] >= min && hp[0] <= max) {
        if (dari === null) dari = bawah;
        sampai = batas;
      }
      bawah = batas;
    });
    return dari === null ? null : { lahan, dari, sampai };
  }).filter(Boolean);
}

function teksRentang({ dari, sampai }) {
  if (!dari && sampai === Infinity) return t('kalk.semuaLuas');
  if (!dari) return t('kalk.hingga').replace('{b}', fmtAngka(sampai));
  if (sampai === Infinity) return t('kalk.diAtas').replace('{a}', fmtAngka(dari));
  return `${fmtAngka(dari)}–${fmtAngka(sampai)} ha`;
}

function hitungDroneMini(wrap, d) {
  const luas = parseFloat(String(wrap.querySelector('[name="luas"]').value).replace(',', '.')) || 0;
  const dosis = parseFloat(String(wrap.querySelector('[name="dosis"]').value).replace(',', '.')) || 0;
  const hasil = wrap.querySelector('.kalk-mini__hasil');
  if (!luas || !dosis) { hasil.innerHTML = `<p class="kalk-hasil__kosong">${t('kalk.isiDulu')}</p>`; return; }

  const haPerJam  = d.lebar * ASUMSI_DRONE.kecepatan * 3600 / 10000 * ASUMSI_DRONE.efisiensi;
  const haPerHari = haPerJam * ASUMSI_DRONE.jamPerHari;
  const airDrone  = luas * dosis;
  hasil.innerHTML = `
    ${baris(t('kalk.waktuDrone'), fmtJam(luas / haPerJam), true)}
    ${baris(t('kalk.isiUlang'), `${fmtAngka(Math.ceil(airDrone / d.tangki))}× (${fmtAngka(d.tangki)} L)`)}
    ${baris(t('kalk.haPerHari'), `± ${fmtAngka(haPerHari)} ha`)}
    ${baris(t('kalk.setara'), `± ${fmtAngka(haPerHari / ASUMSI_DRONE.haManualPerHari)} ${t('kalk.pekerja')}`, true)}
    ${baris(t('kalk.airHemat'), `${fmtAngka(Math.max(luas * ASUMSI_DRONE.airManual - airDrone, 0))} L`)}
    <a href="#" class="btn btn--accent btn--block kalk-hasil__cta" data-wa-link
       data-wa-pesan="${pesanWA('drone', `${d.p.nama}, ${fmtAngka(luas, 1)} ha`)}">${t('kalk.ctaDrone')}</a>`;
  if (typeof isiDataPerusahaan === 'function') isiDataPerusahaan();
}

function initKalkMini() {
  const wrap = document.querySelector('[data-kalk-mini]');
  const id = document.body.dataset.produkId;
  const p = wrap && PRODUK.find(x => x.id === id);
  if (!p) return;
  const base = document.body.dataset.base || '';

  /* --- Drone --- */
  const d = daftarDrone().find(x => x.p.id === id);
  if (d) {
    const luas  = wrap.querySelector('[name="luas"]')?.value  || '10';
    const dosis = wrap.querySelector('[name="dosis"]')?.value || '15';
    wrap.innerHTML = `
      <div class="kalk-mini">
        <div class="kalk-mini__kepala">
          <h2>${t('kalk.miniJudul')} ${p.nama}</h2>
          <p>${t('kalk.miniDesk')}</p>
        </div>
        <div class="kalk__isi">
          <form class="kalk__form" onsubmit="return false">
            <label class="kalk__field">
              <span>${t('kalk.luas')}</span>
              <input type="number" name="luas" min="0" step="0.1" value="${luas}" inputmode="decimal">
            </label>
            <label class="kalk__field">
              <span>${t('kalk.dosis')}</span>
              <input type="number" name="dosis" min="0" step="1" value="${dosis}" inputmode="decimal">
              <small>${t('kalk.dosisInfo')}</small>
            </label>
            <a class="kalk-mini__lengkap" href="${base}kalkulator.html?drone=${p.id}#drone">${t('kalk.lengkap')} &rarr;</a>
          </form>
          <div class="kalk-hasil kalk-mini__hasil" aria-live="polite"></div>
        </div>
        <p class="kalk__asumsi">${t('kalk.asumsi')}</p>
      </div>`;
    wrap.querySelector('form').addEventListener('input', () => hitungDroneMini(wrap, d));
    hitungDroneMini(wrap, d);
    return;
  }

  /* --- Traktor --- */
  const hp = (p.kategori === 'tractor' || p.kategori === 'hybrid') && tenagaProduk(p);
  const cocok = hp ? cocokUntuk(hp) : [];
  if (!cocok.length) { (wrap.closest('section') || wrap).hidden = true; return; }
  const kelas = hp[0] === hp[1] ? `± ${hp[0]} HP` : `± ${hp[0]}–${hp[1]} HP`;
  wrap.innerHTML = `
    <div class="kalk-mini kalk-mini--traktor">
      <div class="kalk-mini__kepala">
        <h2>${t('kalk.cocokJudul')}</h2>
        <p>${t('kalk.cocokDesk').replace('{nama}', p.nama).replace('{hp}', kelas)}</p>
      </div>
      <ul class="kalk-mini__cocok">
        ${cocok.map(c => `<li><span>${t('kalk.lahan.' + c.lahan)}</span><strong>${teksRentang(c)}</strong></li>`).join('')}
      </ul>
      <p class="kalk__asumsi">${t('kalk.asumsiTraktor')}
        <a class="kalk-mini__lengkap" href="${base}kalkulator.html#traktor">${t('kalk.lengkapTraktor')} &rarr;</a></p>
    </div>`;
}
