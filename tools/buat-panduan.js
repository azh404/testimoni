/* Sisipkan bagian "Untuk Siapa …" (halaman produk) & "Tentang …" (halaman merek)
   dari tools/data-panduan.js, dalam 3 bahasa (blok [data-bahasa], ID tampil bawaan).
   Jalankan ulang setelah mengubah data-panduan.js:  node tools/buat-panduan.js */
const fs = require('fs');
const path = require('path');
const DATA = require('./data-panduan.js');

const ROOT = path.join(__dirname, '..');
const MULAI = '<!-- PANDUAN: dibuat otomatis oleh tools/buat-panduan.js -->';
const SELESAI = '<!-- /PANDUAN -->';
const BAHASA = ['id', 'en', 'zh'];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const JUDUL = {
  produk: {
    id: n => `Untuk Siapa ${n}?`, en: n => `Who Is the ${n} For?`, zh: n => `${n}适合谁？`
  },
  produkKotak: { id: 'Pertimbangan Sebelum Memilih', en: 'Things to Consider', zh: '选购要点' },
  merek: { id: n => `Tentang ${n}`, en: n => `About ${n}`, zh: n => `关于${n}` },
  merekKotak: { id: n => `Lini Produk ${n}`, en: n => `${n} Product Range`, zh: n => `${n}产品线` },
  eyebrow: { id: 'Panduan Memilih', en: 'Buying Guide', zh: '选购指南' },
  eyebrowMerek: { id: 'Profil Merek', en: 'Brand Profile', zh: '品牌简介' }
};

function blokHtml(isi, b, judul, judulKotak, eyebrow) {
  return `<div data-bahasa="${b}"${b === 'id' ? '' : ' hidden'}>
<div class="panduan__grid">
<div class="panduan__teks">
<span class="panduan__eyebrow">${esc(eyebrow)}</span>
<h2>${esc(judul)}</h2>
${isi.p.map(p => `<p>${esc(p)}</p>`).join('\n')}
</div>
<div class="panduan__kotak">
<h3>${esc(judulKotak)}</h3>
<ul class="check-list">
${isi.poin.map(x => `<li>${esc(x)}</li>`).join('\n')}
</ul>
</div>
</div>
</div>`;
}

function sisipkan(file, html, sebelum) {
  let s = fs.readFileSync(file, 'utf8');
  const bagian = `${MULAI}\n${html}\n${SELESAI}`;
  if (s.includes(MULAI)) {
    s = s.replace(new RegExp(`${MULAI}[\\s\\S]*?${SELESAI}`), bagian);
  } else {
    const titik = sebelum.map(t => s.indexOf(t)).find(i => i >= 0);
    if (titik === undefined) throw new Error('Titik sisip tidak ditemukan: ' + file);
    s = s.slice(0, titik) + bagian + '\n\n' + s.slice(titik);
  }
  fs.writeFileSync(file, s);
}

/* Halaman produk: cari file lewat id brosur (unduhBrosur('<id>') */
const fileProduk = {};
for (const f of fs.readdirSync(path.join(ROOT, 'produk'))) {
  const s = fs.readFileSync(path.join(ROOT, 'produk', f), 'utf8');
  const m = s.match(/unduhBrosur\('([^']+)'/);
  if (m) fileProduk[m[1]] = path.join(ROOT, 'produk', f);
}

let n = 0;
for (const [id, isi] of Object.entries(DATA.produk)) {
  const file = fileProduk[id];
  if (!file) { console.warn('Lewati (file tidak ada):', id); continue; }
  const nama = fs.readFileSync(file, 'utf8').match(/<h1>(.*?)<\/h1>/)[1];
  const html = `<section class="section section--flush-top panduan">
<div class="container">
${BAHASA.map(b => blokHtml(isi[b], b, JUDUL.produk[b](nama), JUDUL.produkKotak[b], JUDUL.eyebrow[b])).join('\n')}
</div>
</section>`;
  sisipkan(file, html, ['<!-- ===== KALKULATOR MINI', '<!-- ===== AJAKAN KONTAK']);
  n++;
}

/* Halaman merek */
const NAMA_MEREK = { zoomlion: 'Zoomlion', eavision: 'EAVision', vectoragr: 'VectorAgr' };
for (const [id, isi] of Object.entries(DATA.merek)) {
  const file = path.join(ROOT, 'pages', 'produk', `${id}.html`);
  const nama = NAMA_MEREK[id];
  const html = `<section class="section section--soft panduan panduan--merek">
<div class="container">
${BAHASA.map(b => blokHtml(isi[b], b, JUDUL.merek[b](nama), JUDUL.merekKotak[b](nama), JUDUL.eyebrowMerek[b])).join('\n')}
</div>
</section>`;
  sisipkan(file, html, ['  </main>']);
  n++;
}
console.log(`Selesai: ${n} halaman diperbarui.`);
