/* =========================================
   SEO GAMBAR
   1. Menyeragamkan teks alt foto produk di semua halaman HTML,
      mis. alt="Traktor Zoomlion RK504" (terbaca Google Gambar).
   2. Membuat sitemap-gambar.xml: daftar foto per halaman,
      termasuk foto yang dimuat lewat JavaScript.

   Jalankan setelah menambah/mengganti foto atau halaman:
     node tools/seo-gambar.js
   ========================================= */
const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT   = path.join(__dirname, '..');
const DOMAIN = 'https://dass.co.id';

/* --- Baca data --- */
const ctx = { PRODUK: [], window: {} };
vm.createContext(ctx);
for (const f of ['data/brands.js', 'data/produk-zoomlion.js', 'data/produk-eavision.js',
                 'data/produk-vectoragr.js', 'data/artikel.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/js', f), 'utf8').replace(/^(const|let) /mg, 'var '), ctx);
}
const { BRANDS, PRODUK, ALT_KATEGORI, ARTIKEL } = ctx;

const altProduk = p => [ALT_KATEGORI[p.kategori], (BRANDS.find(b => b.id === p.brand) || {}).nama, p.nama]
  .filter(Boolean).join(' ').replace(/"/g, '&quot;');

/* Foto produk berdasarkan nama file (tanpa ekstensi) */
const produkPerFoto = new Map(PRODUK.map(p => [p.gambar.replace(/\.(png|webp)$/, ''), p]));

/* --- Kumpulkan semua halaman HTML --- */
const LEWATI = new Set(['DASS-WEB', 'partials', 'node_modules', '.git', 'assets', 'tools']);
function cariHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    if (e.isDirectory()) return LEWATI.has(e.name) ? [] : cariHtml(path.join(dir, e.name));
    return e.name.endsWith('.html') && !/^google[0-9a-f]+\.html$/.test(e.name) ? [path.join(dir, e.name)] : [];
  });
}
const halaman = cariHtml(ROOT);

/* =========================================
   1. TEKS ALT
   ========================================= */
let diubah = 0;
for (const file of halaman) {
  const html = fs.readFileSync(file, 'utf8');
  const baru = html.replace(/<img\b[^>]*>/g, tag => {
    const src = (tag.match(/\ssrc="([^"]+)"/) || [])[1];
    if (!src) return tag;
    const kunci = src.replace(/^(\.\.\/)+/, '').replace(/\.(png|webp)$/, '');
    const p = produkPerFoto.get(kunci);
    if (!p || !/\salt="/.test(tag)) return tag;
    return tag.replace(/\salt="[^"]*"/, ` alt="${altProduk(p)}"`);
  });
  if (baru !== html) { fs.writeFileSync(file, baru); diubah++; }
}
console.log(`Teks alt diperbarui di ${diubah} file`);

/* =========================================
   2. SITEMAP GAMBAR
   ========================================= */
const urlHalaman = file => {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  return `${DOMAIN}/${rel === 'index.html' ? '' : rel}`;
};
const urlAset = (src, file) => {
  if (/^https?:/.test(src)) return src;
  return new URL(src, urlHalaman(file).replace(/[^/]*$/, '')).href;
};
const bolehMasuk = url => url.startsWith(DOMAIN) && /\/assets\/images\//.test(url) && !/\/logo\//.test(url);

/* Foto yang dirender JavaScript (tidak tertulis di HTML) */
function gambarTambahan(rel) {
  const brand = (rel.match(/^pages\/produk\/([a-z]+)\.html$/) || [])[1];
  if (brand) return PRODUK.filter(p => p.brand === brand).map(p => p.gambar.replace(/\.png$/, '.webp'));
  if (rel === 'artikel.html') return ARTIKEL.map(a => a.gambar);
  if (rel === 'index.html') {
    return fs.readdirSync(path.join(ROOT, 'assets/images/hero'))
      .filter(f => f.endsWith('.webp')).map(f => `assets/images/hero/${f}`);
  }
  return [];
}

const escXml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let total = 0;
const entri = halaman.sort().map(file => {
  const html = fs.readFileSync(file, 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) return '';
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const src = [
    ...[...html.matchAll(/<img\b[^>]*\ssrc="([^"]+)"/g)].map(m => urlAset(m[1], file)),
    ...[...html.matchAll(/<meta property="og:image" content="([^"]+)"/g)].map(m => m[1]),
    ...gambarTambahan(rel).map(g => `${DOMAIN}/${g}`)
  ];
  const unik = [...new Set(src)].filter(bolehMasuk)
    .filter(u => fs.existsSync(path.join(ROOT, decodeURI(u.slice(DOMAIN.length + 1)))));
  if (!unik.length) return '';
  total += unik.length;
  return `  <url>
    <loc>${escXml(urlHalaman(file))}</loc>
${unik.map(u => `    <image:image><image:loc>${escXml(u)}</image:loc></image:image>`).join('\n')}
  </url>`;
}).filter(Boolean);

fs.writeFileSync(path.join(ROOT, 'sitemap-gambar.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<!-- Dibuat otomatis oleh tools/seo-gambar.js — jangan diedit langsung. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entri.join('\n')}
</urlset>
`);
console.log(`sitemap-gambar.xml: ${total} gambar di ${entri.length} halaman`);
