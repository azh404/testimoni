/* =========================================
   KONFIGURASI PERUSAHAAN
   Ubah data di sini saja — otomatis berlaku
   di seluruh halaman website.
   ========================================= */

const COMPANY = {
  nama:       "PT Diesel Agri Sukses Sejahtera",
  namaPendek: "Agri Diesel",
  tagline:    "Distributor Alat Berat & Mesin Pertanian",

  // Nomor boleh ditulis bebas (0811-..., +62 811..., 62811...);
  // untuk link WhatsApp otomatis diubah ke format 62811...
  whatsapp:   "0811-1660-2926",
  telepon:    "0811-1660-2926",
  /* Ditulis terpisah (nama, domain) supaya tidak mudah diambil bot
     pengumpul email untuk spam. Tampil normal bagi pengunjung. */
  email:      ["info", "dieselagriss.com"].join("@"),

  alamat: {
    jalan:    "Jalan River Garden Boulevard No. 19B Blok B2, RW. 7",
    kelurahan:"Cakung Timur, Kec. Cakung",
    kota:     "Jakarta Timur",
    provinsi: "DKI Jakarta 13910",
    negara:   "Indonesia"
  },

  jamOperasional: "Senin – Jumat, 08.00 – 17.00 WIB",  /* versi EN/ZH: kontak.jamIsi di lang.js */

  /* Untuk status "online" di menu WhatsApp (waktu Jakarta).
     hari: 1 = Senin ... 7 = Minggu; jam dalam format 24 jam. */
  jamKerja: { hari: [1, 2, 3, 4, 5], buka: 8, tutup: 17 },

  /* ID Google Analytics 4 (format "G-XXXXXXXXXX").
     Kosongkan ("") untuk mematikan pelacakan. */
  googleAnalytics: "G-1XWSJJDZMF",

  /* URL Aplikasi web Google Apps Script (berakhiran /exec) untuk menyimpan
     leads ke Google Sheet "Leads Website DASS" — cara pasang: tools/leads-apps-script.gs.
     Kosongkan ("") untuk mematikan form leads (pop-up & form sebelum unduh brosur). */
  leadsUrl: "https://script.google.com/macros/s/AKfycbyutgP3pKLyD8leqSIp2yVEG-p09bLrZspXwFPUTC8evY0rsB-Z4BWxdd5sPmlmmcs3/exec",

  sosmed: {
    instagram: "https://www.instagram.com/dass.agriculture",
    /* Google Business Profile: halaman di Google Maps & link minta ulasan */
    googleMaps: "https://g.page/r/CX_ykRcjTf7sEBM",
    ulasan:     "https://g.page/r/CX_ykRcjTf7sEBM/review",
    facebook:  "#",
    linkedin:  "#",
    youtube:   "#"
  }
};

/* Pesan default saat tombol WhatsApp diklik */
const WA_PESAN_DEFAULT =
  "Halo PT Diesel Agri Sukses Sejahtera, saya ingin bertanya mengenai produk Anda";

/* Helper: nomor WhatsApp dalam format internasional (628xxx).
   wa.me hanya menerima angka, tanpa 0 di depan, strip, atau spasi. */
function nomorWA() {
  const angka = COMPANY.whatsapp.replace(/\D/g, '');
  return angka.startsWith('0') ? '62' + angka.slice(1) : angka;
}

/* Helper: menghasilkan link WhatsApp lengkap */
function waLink(pesan = WA_PESAN_DEFAULT) {
  return `https://wa.me/${nomorWA()}?text=${encodeURIComponent(pesan)}`;
}

/* Helper: alamat dalam satu baris */
function alamatLengkap() {
  const a = COMPANY.alamat;
  return `${a.jalan}, ${a.kelurahan}, ${a.kota}, ${a.provinsi}, ${a.negara}`;
}