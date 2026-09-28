/* =========================================
   KONFIGURASI PERUSAHAAN
   Ubah data di sini saja — otomatis berlaku
   di seluruh halaman website.
   ========================================= */

const COMPANY = {
  nama:       "PT Diesel Agri Sukses Sejahtera",
  namaPendek: "Agri Diesel",
  tagline:    "Distributor Alat Berat & Mesin Pertanian",

  // ⚠️ SEMENTARA — ganti bila nomor resmi sudah ada
  // Format: 62 + nomor tanpa angka 0 di depan
  whatsapp:   "628176602023",
  telepon:    "0817-6602-023",
  email:      "info@dieselagriss.com",

  alamat: {
    jalan:    "Jalan River Garden Boulevard No. 19B Blok B2, RW. 7",
    kelurahan:"Cakung Timur, Kec. Cakung",
    kota:     "Jakarta Timur",
    provinsi: "DKI Jakarta 13910",
    negara:   "Indonesia"
  },

  jamOperasional: "Senin – Jumat, 08.00 – 17.00 WIB",

  sosmed: {
    instagram: "https://www.instagram.com",
    facebook:  "#",
    linkedin:  "#",
    youtube:   "#"
  }
};

/* Pesan default saat tombol WhatsApp diklik */
const WA_PESAN_DEFAULT =
  "Halo PT Diesel Agri Sukses Sejahtera, saya ingin bertanya mengenai produk Anda";

/* Helper: menghasilkan link WhatsApp lengkap */
function waLink(pesan = WA_PESAN_DEFAULT) {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(pesan)}`;
}

/* Helper: alamat dalam satu baris */
function alamatLengkap() {
  const a = COMPANY.alamat;
  return `${a.jalan}, ${a.kelurahan}, ${a.kota}, ${a.provinsi}, ${a.negara}`;
}