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
  fs.readFileSync(path.join(ROOT, 'assets/js/data/artikel.js'), 'utf8') + '\n' +
  fs.readFileSync(path.join(ROOT, 'assets/js/data/artikel-terjemahan.js'), 'utf8') +
  '\nthis.ARTIKEL = ARTIKEL; this.KATEGORI_ARTIKEL = KATEGORI_ARTIKEL;' +
  '\nthis.ARTIKEL_TERJEMAHAN = ARTIKEL_TERJEMAHAN;',
  sandbox
);
const { ARTIKEL, KATEGORI_ARTIKEL, ARTIKEL_TERJEMAHAN } = sandbox;

/* --- Teks antarmuka per bahasa --- */
const BAHASA_HALAMAN = ['id', 'en', 'zh'];
const LABEL = {
  id: { sumber: 'Sumber:',   kembali: 'Kembali ke Berita &amp; Artikel', bulan: BULAN },
  en: { sumber: 'Sources:',  kembali: 'Back to News &amp; Articles',
        bulan: ['January','February','March','April','May','June','July',
                'August','September','October','November','December'] },
  zh: { sumber: '资料来源：', kembali: '返回新闻与文章', bulan: null }
};
const PENULIS = {
  'Redaksi DASS':    { en: 'DASS Editorial',      zh: 'DASS编辑部' },
  'Tim Teknis DASS': { en: 'DASS Technical Team', zh: 'DASS技术团队' }
};

/* --- Pembantu --- */
const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
                              .replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tanpaTag = s => String(s).replace(/<[^>]+>/g, '');

function formatTanggal(iso, bahasa = 'id') {
  const d = new Date(iso);
  if (bahasa === 'zh') return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  const bulan = LABEL[bahasa].bulan[d.getMonth()];
  return bahasa === 'en' ? `${bulan} ${d.getDate()}, ${d.getFullYear()}`
                         : `${d.getDate()} ${bulan} ${d.getFullYear()}`;
}

/* Isi artikel dalam satu bahasa. Terjemahan bernilai null memakai
   teks Indonesia; label "Sumber:" ikut diterjemahkan. */
function versi(a, bahasa) {
  const tr = bahasa !== 'id' && ARTIKEL_TERJEMAHAN[a.id] && ARTIKEL_TERJEMAHAN[a.id][bahasa];
  if (!tr) return { judul: a.judul, ringkas: a.ringkas, isi: a.isi };
  const isi = a.isi.map((asli, i) => {
    const teks = tr.isi[i];
    if (teks !== null && teks !== undefined) return teks;
    return asli.startsWith('Sumber: ') ? `${LABEL[bahasa].sumber} ${asli.slice(8)}` : asli;
  });
  return { judul: tr.judul, ringkas: tr.ringkas, isi };
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
  const kat       = KATEGORI_ARTIKEL.find(k => k.id === a.kategori) || {};
  const adaGambar = a.gambar && fs.existsSync(path.join(ROOT, a.gambar));
  const gambarUrl = `${DOMAIN}/${adaGambar ? a.gambar : 'assets/images/hero/hero-tractor-og.jpg'}`;

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
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" media="print" onload="this.media='all'">

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

${BAHASA_HALAMAN.map(b => { const v = versi(a, b); return `
          <div data-bahasa="${b}"${b === 'id' ? '' : ' hidden'}>
            <nav class="detail-crumb" aria-label="Breadcrumb">
              <a href="../index.html" data-i18n="nav.beranda">Beranda</a> ›
              <a href="../artikel.html" data-i18n="nav.artikel">Berita &amp; Artikel</a> ›
              <span aria-current="page">${v.judul}</span>
            </nav>

            <span class="artikel-card__badge">${(b !== 'id' && kat[b]) || kat.nama || ''}</span>
            ${b === 'id' ? `<h1 class="artikel-detail__judul">${v.judul}</h1>` : `<div class="artikel-detail__judul h1" role="heading" aria-level="1">${v.judul}</div>`}
            <p class="artikel-halaman__subjudul">${v.ringkas}</p>
            <p class="artikel-detail__meta">${formatTanggal(a.tanggal, b)} &middot; ${(b !== 'id' && PENULIS[a.penulis] && PENULIS[a.penulis][b]) || a.penulis || ''}</p>
          </div>`; }).join('\n')}
${adaGambar ? `
          <div class="artikel-detail__media">
            <img src="../${a.gambar}" alt="${escAttr(a.judul)}">
          </div>
` : ''}${BAHASA_HALAMAN.map(b => `
          <div data-bahasa="${b}"${b === 'id' ? '' : ' hidden'}>
            <div class="artikel-detail__body">
              ${versi(a, b).isi.map(bagianIsi).join('\n              ')}
            </div>

            <a href="../artikel.html" class="artikel-kembali">&larr; ${LABEL[b].kembali}</a>
          </div>`).join('\n')}

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
  <script src="../assets/js/artikel-halaman.js"></script>
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
