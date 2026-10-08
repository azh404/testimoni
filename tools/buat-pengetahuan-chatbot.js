/* Membuat api/data/pengetahuan.txt: basis pengetahuan chatbot AI (Asisten DASS).
   Isinya diambil dari data website: profil perusahaan, kontak, semua produk (ringkasan,
   keunggulan, spesifikasi, alamat halaman), FAQ, dan daftar artikel.
   Jalankan ulang setiap kali data produk/FAQ/artikel berubah:
     node tools/buat-pengetahuan-chatbot.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SITUS = 'https://dass.co.id/';
const baca = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

/* Muat data JS website (const → var agar terbaca di konteks vm) */
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of ['config', 'data/brands', 'data/produk-zoomlion', 'data/produk-eavision', 'data/produk-vectoragr', 'data/artikel']) {
  const file = path.join(ROOT, 'assets/js', `${f}.js`);
  if (fs.existsSync(file)) vm.runInContext(fs.readFileSync(file, 'utf8').replace(/\b(const|let)\b/g, 'var'), ctx);
}
const { COMPANY, BRANDS, KATEGORI, PRODUK } = ctx;
const ARTIKEL = ctx.ARTIKEL || [];

const teks = html => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

/* Alamat halaman produk: dicari lewat id brosur di produk/*.html */
const urlProduk = {};
for (const f of fs.readdirSync(path.join(ROOT, 'produk'))) {
  const m = baca(`produk/${f}`).match(/unduhBrosur\('([^']+)'/);
  if (m) urlProduk[m[1]] = `${SITUS}produk/${f}`;
}
const namaKategori = {};
for (const daftar of Object.values(KATEGORI)) for (const k of daftar) namaKategori[k.id] = k.nama;
const namaBrand = id => (Array.isArray(BRANDS) ? BRANDS.find(b => b.id === id) : BRANDS[id])?.nama || id;

const bagian = [];

bagian.push(`# PROFIL PERUSAHAAN
- Nama: ${COMPANY.nama} (PT DASS), distributor resmi Zoomlion, EAVision, dan VectorAgr.
- Alamat kantor: ${Object.values(COMPANY.alamat).join(', ')}.
- Jam kerja: ${COMPANY.jamOperasional}. Di luar jam kerja, pesan WhatsApp dibalas pada jam kerja berikutnya.
- WhatsApp/telepon: ${COMPANY.whatsapp} (link: https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '').replace(/^0/, '62')}).
- Instagram: ${COMPANY.sosmed.instagram}
- Google Maps: ${COMPANY.sosmed.googleMaps}
- Halaman penting: Beranda ${SITUS} | Tentang ${SITUS}tentang.html | Kontak ${SITUS}kontak.html | Bandingkan produk ${SITUS}bandingkan.html | Kalkulator pertanian ${SITUS}kalkulator.html | FAQ ${SITUS}faq.html | Artikel ${SITUS}artikel.html | Katalog Zoomlion ${SITUS}pages/produk/zoomlion.html | Katalog EAVision ${SITUS}pages/produk/eavision.html | Katalog VectorAgr ${SITUS}pages/produk/vectoragr.html
- Setiap halaman produk punya tombol "Download PDF" (brosur) dan tombol "Tanya via WhatsApp".
- Layanan sparepart & servis: SEGERA HADIR (belum tersedia). Jangan menjanjikan servis, sparepart, garansi, atau purna jual.
- Harga, stok, diskon, cicilan, dan ongkos kirim TIDAK dicantumkan di website; semuanya ditanyakan ke tim lewat WhatsApp.`);

/* Produk */
const perBrand = {};
for (const p of PRODUK) (perBrand[p.brand] = perBrand[p.brand] || []).push(p);
for (const [brand, daftar] of Object.entries(perBrand)) {
  const isi = daftar.map(p => {
    const spek = (p.spesifikasi || []).slice(0, 10).map(s => `${s.label}: ${s.nilai}`).join('; ');
    const unggul = ((p.kegunaan && p.kegunaan.id) || []).slice(0, 5).join('; ');
    return `## ${namaBrand(brand)} ${p.nama}${p.seri && p.seri !== p.nama ? ` (${p.seri})` : ''}
- Kategori: ${namaKategori[p.kategori] || p.kategori}
- Ringkasan: ${(p.ringkas && p.ringkas.id) || ''}
- Keunggulan: ${unggul}
- Spesifikasi utama: ${spek}
- Halaman: ${urlProduk[p.id] || SITUS}`;
  }).join('\n\n');
  bagian.push(`# PRODUK ${namaBrand(brand).toUpperCase()} (${daftar.length} unit)\n\n${isi}`);
}

/* FAQ (versi Indonesia) */
const faqHtml = baca('faq.html');
/* Halaman FAQ memuat 3 bahasa berurutan (ID, EN, ZH) dengan jumlah tanya-jawab sama: ambil sepertiga pertama */
const semuaFaq = [...faqHtml.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>/g)]
  .map(m => `- T: ${teks(m[1])}\n  J: ${teks(m[2])}`);
const faq = semuaFaq.slice(0, Math.round(semuaFaq.length / 3));
if (faq.length) bagian.push(`# FAQ\n${faq.join('\n')}`);

/* Artikel */
if (ARTIKEL.length) {
  bagian.push(`# ARTIKEL DI WEBSITE\n${ARTIKEL.map(a => `- ${a.judul}: ${SITUS}artikel/${a.slug || a.id}.html`).join('\n')}`);
}

const hasil = bagian.join('\n\n') + '\n';
const tujuan = path.join(ROOT, 'api', 'data', 'pengetahuan.txt');
fs.mkdirSync(path.dirname(tujuan), { recursive: true });
fs.writeFileSync(tujuan, hasil);
console.log(`Selesai: ${PRODUK.length} produk, ${faq.length} FAQ, ${ARTIKEL.length} artikel → api/data/pengetahuan.txt (${Math.round(hasil.length / 1024)} KB)`);
