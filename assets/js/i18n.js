/* =========================================
   PENGALIH BAHASA — ID / EN / ZH
   Menu dibangun oleh JavaScript
   ========================================= */

/* Bawaan bahasa Indonesia: pengunjung dan Google (yang tidak
   punya pilihan tersimpan) melihat teks Indonesia, sesuai
   kata kunci yang dicari orang di Indonesia. */
let BAHASA = 'id';
let JUDUL_ASLI = null;   /* <title> bawaan halaman (bahasa Indonesia) */
try { BAHASA = localStorage.getItem('bahasa') || 'id'; } catch (e) { BAHASA = 'id'; }

/* --- Definisi bahasa + bendera --- */
const DAFTAR_BAHASA = [
  {
    kode: 'id',
    nama: 'Indonesia',
    flag: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">' +
          '<rect width="30" height="10" fill="#CE1126"/>' +
          '<rect y="10" width="30" height="10" fill="#F5F5F5"/></svg>'
  },
  {
    kode: 'en',
    nama: 'English',
    flag: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">' +
          '<rect width="30" height="20" fill="#012169"/>' +
          '<path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" stroke-width="4"/>' +
          '<path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" stroke-width="2"/>' +
          '<path d="M15,0 V20 M0,10 H30" stroke="#FFFFFF" stroke-width="6"/>' +
          '<path d="M15,0 V20 M0,10 H30" stroke="#C8102E" stroke-width="3.5"/></svg>'
  },
  {
    kode: 'zh',
    nama: '\u4E2D\u6587',
    flag: '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">' +
          '<rect width="30" height="20" fill="#DE2910"/>' +
          '<polygon fill="#FFDE00" points="5.5,2.2 6.62,5.64 3.69,3.52 7.31,3.52 4.38,5.64"/>' +
          '<polygon fill="#FFDE00" points="11,1.5 11.37,2.65 10.39,1.94 11.61,1.94 10.63,2.65"/>' +
          '<polygon fill="#FFDE00" points="13,3.8 13.37,4.95 12.39,4.24 13.61,4.24 12.63,4.95"/>' +
          '<polygon fill="#FFDE00" points="13,6.9 13.37,8.05 12.39,7.34 13.61,7.34 12.63,8.05"/>' +
          '<polygon fill="#FFDE00" points="11,9.2 11.37,10.35 10.39,9.64 11.61,9.64 10.63,10.35"/></svg>'
  }
];

/* =========================================
   FUNGSI PENGAMBIL TEKS
   ========================================= */

/* Teks umum dari kamus TEKS */
function t(kunci) {
  const item = TEKS[kunci];
  if (!item) return '';
  return item[BAHASA] || item.id || '';
}

/* Angka di data spesifikasi ditulis gaya Indonesia (2.100 / 4,6).
   Untuk EN & ZH diubah ke gaya internasional (2,100 / 4.6). */
function formatAngka(teks) {
  return teks
    .replace(/(\d)\.(?=\d{3}(?!\d))/g, '$1\u0000')
    .replace(/(\d),(?=\d)/g, '$1.')
    .replace(/\u0000/g, ',');
}

/* Nama kategori produk */
function tKategori(id) {
  const item = KATEGORI_TEKS[id];
  if (!item) return '';
  return item[BAHASA] || item.id || '';
}

/* Label spesifikasi */
function tSpec(label) {
  if (typeof SPEC_TEKS === 'undefined') return label;
  const item = SPEC_TEKS[label];
  if (!item) return label;
  return item[BAHASA] || label;
}
/* Nilai spesifikasi — ganti kata Indonesia sesuai bahasa aktif */
function tNilai(nilai) {
  if (typeof nilai !== 'string') return nilai;
  if (BAHASA === 'id') return nilai;
  if (typeof NILAI_KATA === 'undefined') return nilai;

  let hasil = nilai;
  NILAI_KATA.forEach(k => {
    hasil = hasil.replace(k.cari, BAHASA === 'zh' ? k.zh : k.en);
  });
  return formatAngka(hasil.replace(/\s{2,}/g, ' ').trim());
}

/* Teks yang bisa berupa string biasa atau objek {id, en, zh} */
function tField(nilai) {
  if (!nilai) return '';
  if (typeof nilai === 'string') return nilai;
  return nilai[BAHASA] || nilai.id || '';
}

/* Sama seperti tField, tapi untuk array (daftar kegunaan) */
function tList(nilai) {
  if (!nilai) return [];
  if (Array.isArray(nilai)) return nilai;
  return nilai[BAHASA] || nilai.id || [];
}

/* =========================================
   MENU BAHASA
   ========================================= */
function bangunMenuBahasa() {
  const slot = document.getElementById('langSlot');
  if (!slot) return;

  const aktif = DAFTAR_BAHASA.find(b => b.kode === BAHASA) || DAFTAR_BAHASA[0];

  slot.innerHTML =
    '<div class="lang-drop" id="langDrop">' +
      '<button class="lang-trigger" id="langTrigger" aria-expanded="false" aria-label="Pilih bahasa">' +
        '<span class="lang-flag">' + aktif.flag + '</span>' +
        '<span class="lang-caret">&#9660;</span>' +
      '</button>' +
      '<ul class="lang-menu">' +
        DAFTAR_BAHASA.map(b =>
          '<li>' +
            '<button class="lang-btn' + (b.kode === BAHASA ? ' is-active' : '') + '" ' +
                    'data-lang="' + b.kode + '" title="' + b.nama + '">' +
              '<span class="lang-flag">' + b.flag + '</span>' +
              '<span class="lang-name">' + b.nama + '</span>' +
            '</button>' +
          '</li>'
        ).join('') +
      '</ul>' +
    '</div>';

  pasangEventDropdown();
}

/* Terapkan terjemahan ke seluruh elemen ber-atribut data-i18n */
function terapkanBahasa() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const teks = t(el.dataset.i18n);
    if (teks) el.textContent = teks;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const teks = t(el.dataset.i18nPlaceholder);
    if (teks) el.placeholder = teks;
  });

  document.documentElement.lang = BAHASA === 'zh' ? 'zh-CN' : BAHASA;

  /* Judul tab browser. Halaman produk dan artikel mengatur judulnya sendiri. */
  if (JUDUL_ASLI === null) JUDUL_ASLI = document.title;
  const d = document.body.dataset;
  if (!d.produkId && !document.querySelector('[data-bahasa]')) {
    document.title = (BAHASA !== 'id' && t('judul.' + (d.brand || d.page))) || JUDUL_ASLI;
  }
}

/* Ganti bahasa */
function gantiBahasa(kode) {
  if (!DAFTAR_BAHASA.some(b => b.kode === kode)) return;

  BAHASA = kode;
  try { localStorage.setItem('bahasa', kode); } catch (e) {}

  bangunMenuBahasa();
  terapkanBahasa();

  /* Bangun ulang bagian yang dirender lewat JavaScript */
  if (typeof initProdukTabs    === 'function') initProdukTabs();
  if (typeof initHalamanBrand  === 'function') initHalamanBrand();
  if (typeof initBrandGallery  === 'function') initBrandGallery();
  if (typeof initHalamanArtikel === 'function') initHalamanArtikel();
  if (typeof initHalamanDetail  === 'function') initHalamanDetail();
  if (typeof initArtikelHalaman === 'function') initArtikelHalaman();
  if (typeof isiDataPerusahaan  === 'function') isiDataPerusahaan();
}

/* Event buka/tutup dropdown */
function pasangEventDropdown() {
  const drop    = document.getElementById('langDrop');
  const trigger = document.getElementById('langTrigger');
  if (!drop || !trigger) return;

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const terbuka = drop.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(terbuka));
  });
}

/* =========================================
   INISIALISASI
   ========================================= */
function initBahasa() {
  bangunMenuBahasa();
  terapkanBahasa();

  document.addEventListener('click', e => {
    const btn = e.target.closest('.lang-btn');
    if (btn) { gantiBahasa(btn.dataset.lang); return; }

    /* Klik di luar → tutup */
    const drop = document.getElementById('langDrop');
    if (drop && !drop.contains(e.target)) {
      drop.classList.remove('is-open');
      document.getElementById('langTrigger')?.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.getElementById('langDrop')?.classList.remove('is-open');
    document.getElementById('langTrigger')?.setAttribute('aria-expanded', 'false');
  });
}