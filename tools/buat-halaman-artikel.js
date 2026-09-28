/* =========================================
   PEMBUAT HALAMAN ARTIKEL
   Membuat artikel/<id>.html untuk setiap artikel di
   assets/js/data/artikel.js, lalu memperbarui sitemap.xml.

   Jalankan dari folder utama website:
     node tools/buat-halaman-artikel.js
   ========================================= */

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT   = path.join(__dirname, '..');
const DOMAIN = 'https://dass.co.id';
const BULAN  = ['Januari','Februari','Maret','April','Mei','Juni','Juli',
                'Agustus','September','Oktober','November','Desember'];

/* --- Baca data artikel --- */
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(
  fs.readFileSync(path.join(ROOT, 'assets/js/data/artikel.js'), 'utf8') +
  '\nthis.ARTIKEL = ARTIKEL; this.KATEGORI_ARTIKEL = KATEGORI_ARTIKEL;',
  sandbox
);
const { ARTIKEL, KATEGORI_ARTIKEL } = sandbox;

/* --- Pembantu --- */
const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
                              .replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tanpaTag = s => String(s).replace(/<[^>]+>/g, '');

function formatTanggal(iso) {
  const d = new Date(iso);
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

/* Link relatif di isi artikel ditulis dari folder utama (mis. "kontak.html");
   halaman artikel ada di subfolder, jadi perlu "../" di depannya. */
const perbaikiLink = html =>
  html.replace(/href="(?!https?:|#|\/|\.\.\/|mailto:|tel:)/g, 'href="../');

/* '## ' = sub-judul, '### ' = sub-sub-judul, '---' = garis pemisah */
function bagianIsi(teks) {
  if (teks === '---')          return '<hr>';
  if (teks.startsWith('### ')) return `<h3>${teks.slice(4)}</h3>`;
  if (teks.startsWith('## '))  return `<h2>${teks.slice(3)}</h2>`;
  return `<p>${perbaikiLink(teks)}</p>`;
}

function halaman(a) {
  const url       = `${DOMAIN}/artikel/${a.id}.html`;
  const judulSeo  = `${a.seoJudul || a.judul} | DASS`;
  const deskripsi = a.metaDeskripsi || tanpaTag(a.ringkas);
  const kategori  = KATEGORI_ARTIKEL.find(k => k.id === a.kategori)?.nama || '';
  const adaGambar = a.gambar && fs.existsSync(path.join(ROOT, a.gambar));
  const gambarUrl = `${DOMAIN}/${adaGambar ? a.gambar : 'assets/images/logo/logo.png'}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: a.judul,
        description: deskripsi,
        image: gambarUrl,
        datePublished: a.tanggal,
        author: { '@type': 'Organization', name: a.penulis || 'DASS' },
        publisher: { '@type': 'Organization', name: 'PT Diesel Agri Sukses Sejahtera' },
        mainEntityOfPage: url,
        ...(a.keyword ? { keywords: a.keyword.join(', ') } : {})
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Berita & Artikel', item: `${DOMAIN}/artikel.html` },
          { '@type': 'ListItem', position: 3, name: a.judul, item: url }
        ]
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Dibuat otomatis oleh tools/buat-halaman-artikel.js — jangan diedit langsung.
       Ubah assets/js/data/artikel.js lalu jalankan ulang skripnya. -->

  <title>${escAttr(judulSeo)}</title>
  <meta name="description" content="${escAttr(deskripsi)}">
${a.keyword ? `  <meta name="keywords" content="${escAttr(a.keyword.join(', '))}">\n` : ''}  <link rel="canonical" href="${url}">

  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${escAttr(judulSeo)}">
  <meta property="og:description" content="${escAttr(deskripsi)}">
  <meta property="og:image" content="${gambarUrl}">
  <meta property="og:locale" content="id_ID">
  <meta property="article:published_time" content="${a.tanggal}">

  <link rel="icon" href="../assets/images/logo/logo.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../assets/css/style.css">

  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body data-base="../" data-page="artikel">

  <div id="site-header"></div>

  <main>
    <section class="section">
      <div class="container">
        <article class="artikel-halaman">

          <nav class="detail-crumb" aria-label="Breadcrumb">
            <a href="../index.html" data-i18n="nav.beranda">Beranda</a> ›
            <a href="../artikel.html" data-i18n="nav.artikel">Berita &amp; Artikel</a> ›
            <span aria-current="page">${a.judul}</span>
          </nav>

          <span class="artikel-card__badge">${kategori}</span>
          <h1 class="artikel-detail__judul">${a.judul}</h1>
          <p class="artikel-detail__meta">${formatTanggal(a.tanggal)} &middot; ${a.penulis || ''}</p>
${adaGambar ? `
          <div class="artikel-detail__media">
            <img src="../${a.gambar}" alt="${escAttr(a.judul)}">
          </div>
` : ''}
          <div class="artikel-detail__body">
            ${a.isi.map(bagianIsi).join('\n            ')}
          </div>

          <a href="../artikel.html" class="artikel-kembali">&larr; Kembali ke Berita &amp; Artikel</a>

        </article>
      </div>
    </section>
  </main>

  <div id="site-footer"></div>

  <script src="../assets/js/config.js"></script>
  <script src="../assets/js/data/brands.js"></script>
  <script src="../assets/js/data/lang.js"></script>
  <script src="../assets/js/i18n.js"></script>
  <script src="../assets/js/navbar.js"></script>
  <script src="../assets/js/main.js"></script>
</body>
</html>
`;
}

/* --- Tulis halaman --- */
const folder = path.join(ROOT, 'artikel');
fs.mkdirSync(folder, { recursive: true });

const idAktif = new Set(ARTIKEL.map(a => a.id));
for (const f of fs.readdirSync(folder)) {
  if (f.endsWith('.html') && !idAktif.has(f.slice(0, -5))) {
    fs.unlinkSync(path.join(folder, f));
    console.log(`Dihapus : artikel/${f}`);
  }
}

for (const a of ARTIKEL) {
  fs.writeFileSync(path.join(folder, `${a.id}.html`), halaman(a));
  console.log(`Dibuat  : artikel/${a.id}.html`);
}

/* --- Perbarui sitemap.xml --- */
const sitemapPath = path.join(ROOT, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
sitemap = sitemap.replace(/\s*<url>\s*<loc>[^<]*\/artikel\/[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
const entri = ARTIKEL.map(a => `
  <url>
    <loc>${DOMAIN}/artikel/${a.id}.html</loc>
    <lastmod>${a.tanggal}</lastmod>
    <priority>0.6</priority>
  </url>`).join('');
sitemap = sitemap.replace('</urlset>', `${entri.slice(1)}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);
console.log(`sitemap.xml diperbarui (${ARTIKEL.length} artikel)`);
