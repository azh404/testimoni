/* =========================================================
   DOWNLOAD BROSUR PDF
   Digambar langsung dengan jsPDF, bukan memotret layar.
   ========================================================= */

const JSPDF_CDN =
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

const BROSUR_LOGO = 'assets/images/logo/logo.png';
/* Watermark super transparan di tengah halaman brosur */
const BROSUR_WATERMARK = 'assets/images/logo/logo-dass.png';

const BROSUR_LABEL = {
  'hybrid':'Traktor Hybrid', 'tractor':'Traktor Pertanian',
  'planter':'Rice Transplanter', 'harvester':'Combine Harvester',
  'sugarcane':'Mesin Panen Tebu', 'dryer':'Mesin Pengering Gabah',
  'baler':'Mesin Baler', 'implement':'Implement Traktor',
  'sprayer-drone':'Drone Sprayer Pertanian', 'va-drone':'Drone Pertanian',
  'va-steering':'Auto Steering Traktor', 'va-rover':'Robot Pertanian',
  'va-digital':'Solusi Pertanian Digital'
};

const BROSUR_SLUG = {
  'hybrid':'traktor-hybrid', 'tractor':'traktor',
  'planter':'rice-transplanter', 'harvester':'combine-harvester',
  'sugarcane':'mesin-panen-tebu', 'dryer':'mesin-pengering-gabah',
  'baler':'mesin-baler', 'implement':'implement-traktor',
  'sprayer-drone':'drone-sprayer', 'va-drone':'drone-pertanian',
  'va-steering':'auto-steering', 'va-rover':'robot-pertanian',
  'va-digital':'pertanian-digital'
};

/* Teks tetap di brosur, mengikuti bendera (bahasa) yang dipilih pengunjung */
const BROSUR_TEKS = {
  tagline:  { id: 'Distributor Alat Berat & Mesin Pertanian', en: 'Heavy & Agricultural Machinery Distributor', zh: '重型及农业机械经销商' },
  seri:     { id: 'Seri', en: 'Series', zh: '系列' },
  guna:     { id: 'KEGUNAAN', en: 'KEY FEATURES', zh: '产品优势' },
  spek:     { id: 'SPESIFIKASI TEKNIS', en: 'TECHNICAL SPECIFICATIONS', zh: '技术参数' },
  tanya:    { id: 'Tanya harga & ketersediaan unit', en: 'Ask for price & unit availability', zh: '咨询价格与现货情况' },
  catatan:  { id: 'Spesifikasi dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Diterbitkan oleh ',
              en: 'Specifications are subject to change without prior notice. Published by ',
              zh: '规格如有变更，恕不另行通知。发布方：' },
  siapkan:  { id: 'Menyiapkan...', en: 'Preparing...', zh: '正在生成...' },
  gagal:    { id: 'Maaf, brosur gagal dibuat. Periksa koneksi internet lalu coba lagi.',
              en: 'Sorry, the brochure could not be created. Please check your internet connection and try again.',
              zh: '抱歉，宣传册生成失败。请检查网络连接后重试。' }
};

function bahasaBrosur() {
  return (typeof BAHASA !== 'undefined' && BROSUR_TEKS.seri[BAHASA]) ? BAHASA : 'id';
}
function tb(kunci) {
  const item = BROSUR_TEKS[kunci];
  return item[bahasaBrosur()] || item.id;
}

/* ---------- HURUF MANDARIN ----------
   Font bawaan jsPDF (Helvetica) tidak punya huruf Mandarin. Teks yang mengandung
   huruf Mandarin digambar ke canvas memakai font Mandarin milik perangkat
   pengunjung, lalu ditempel ke PDF sebagai gambar beresolusi tinggi. */
const FONT_CJK = '"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans CJK SC","Noto Sans SC","Source Han Sans SC","WenQuanYi Micro Hei","WenQuanYi Zen Hei",sans-serif';
const PX_PER_MM = 11;          // ketajaman gambar teks (±280 dpi)
const PT_KE_MM = 0.3528;
const JARAK_BARIS = 1.15;      // sama dengan jarak baris bawaan jsPDF
const kanvasUkur = document.createElement('canvas').getContext('2d');

function adaCJK(teks) { return /[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF\u3000-\u303F]/.test(teks); }

function fontCJK(pt, tebal, skala) {
  return (tebal ? '700 ' : '400 ') + (pt * PT_KE_MM * skala) + 'px ' + FONT_CJK;
}

/* Pecah teks menjadi beberapa baris sesuai lebar (mm) */
function pecah(doc, teks, lebar, pt, tebal) {
  teks = String(teks);
  if (!adaCJK(teks)) return doc.splitTextToSize(teks, lebar);
  kanvasUkur.font = fontCJK(pt, tebal, 1);
  const potong = teks.match(/[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF\u3000-\u303F]|[^\s\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF\u3000-\u303F]+|\s+/g) || [];
  const baris = [];
  let kini = '';
  potong.forEach(k => {
    const coba = kini + k;
    if (kini && kanvasUkur.measureText(coba).width > lebar) {
      baris.push(kini.trim());
      kini = k.trim() ? k : '';
    } else {
      kini = coba;
    }
  });
  if (kini.trim()) baris.push(kini.trim());
  return baris;
}

/* Tulis teks (string atau array baris). y = garis dasar baris pertama,
   sama seperti doc.text. warna = [r,g,b]. */
function tulis(doc, teks, x, y, pt, tebal, warna) {
  const baris = Array.isArray(teks) ? teks : [String(teks)];
  if (!baris.some(adaCJK)) {
    doc.setFont('helvetica', tebal ? 'bold' : 'normal').setFontSize(pt).setTextColor(...warna);
    doc.text(baris.length === 1 ? baris[0] : baris, x, y);
    return;
  }
  const tinggiHuruf = pt * PT_KE_MM;
  baris.forEach((b, i) => {
    if (!b) return;
    const yDasar = y + i * tinggiHuruf * JARAK_BARIS;
    kanvasUkur.font = fontCJK(pt, tebal, 1);
    const lebar = kanvasUkur.measureText(b).width;
    const kanvas = document.createElement('canvas');
    kanvas.width  = Math.ceil((lebar + 1) * PX_PER_MM);
    kanvas.height = Math.ceil(tinggiHuruf * 1.4 * PX_PER_MM);
    const ctx = kanvas.getContext('2d');
    ctx.font = fontCJK(pt, tebal, PX_PER_MM);
    ctx.fillStyle = 'rgb(' + warna.join(',') + ')';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(b, 0, tinggiHuruf * 1.08 * PX_PER_MM);
    doc.addImage(kanvas, 'PNG', x, yDasar - tinggiHuruf * 1.08,
                 kanvas.width / PX_PER_MM, kanvas.height / PX_PER_MM, undefined, 'FAST');
  });
}

const NAVY  = [18, 58, 107];
const HIJAU = [46, 125, 50];
const ABU   = [110, 118, 129];

/* Font bawaan PDF tidak punya simbol ≥ dan ≤,
   jadi diganti kata supaya tidak jadi kotak hitam */
function bersih(teks) {
  return String(teks)
    .replace(/≥/g, 'min. ').replace(/≤/g, 'maks. ')
    .replace(/μ/g, 'u').replace(/±/g, '+/-')
    .replace(/[–—]/g, '-').replace(/×/g, 'x');
}

function slugBrosur(teks) {
  return String(teks).toLowerCase()
    .replace(/[\/\\]/g, '-').replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function muatJsPDF() {
  if (window.jspdf) return Promise.resolve();
  return new Promise((ok, gagal) => {
    const s = document.createElement('script');
    s.src = JSPDF_CDN;
    s.onload = ok;
    s.onerror = () => gagal(new Error('Gagal memuat library PDF'));
    document.head.appendChild(s);
  });
}

/* Muat gambar. Kalau gagal, kembalikan null — brosur tetap jadi */
function muatGambar(src) {
  return new Promise(ok => {
    const img = new Image();
    img.onload  = () => ok(img);
    img.onerror = () => ok(null);
    img.src = src;
  });
}

/* Gambar dipaskan ke dalam kotak tanpa gepeng */
function pasKotak(img, kx, ky, kw, kh) {
  const rasio = img.naturalWidth / img.naturalHeight;
  let w = kw, h = kw / rasio;
  if (h > kh) { h = kh; w = kh * rasio; }
  return { x: kx + (kw - w) / 2, y: ky + (kh - h) / 2, w, h };
}

async function unduhBrosur(idProduk, tombol) {
  const p = PRODUK.find(x => x.id === idProduk);
  if (!p) return;

  const brand = BRANDS.find(b => b.id === p.brand);
  const base  = document.body.dataset.base || '';

  const teksAsli = tombol ? tombol.textContent : '';
  if (tombol) { tombol.disabled = true; tombol.textContent = tb('siapkan'); }

  try {
    await muatJsPDF();

    const [logoPT, logoBrand, fotoProduk, watermark] = await Promise.all([
      muatGambar(base + BROSUR_LOGO),
      brand ? muatGambar(base + brand.logo) : Promise.resolve(null),
      muatGambar(base + p.gambar),
      muatGambar(base + BROSUR_WATERMARK)
    ]);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    const M = 14;            // margin kiri-kanan
    const LEBAR = 210 - M*2; // lebar area isi
    let y = M;

    /* ---------- KEPALA ---------- */
    let xTeks = M;
    if (logoPT) {
      const g = pasKotak(logoPT, M, y, 22, 11);
      doc.addImage(logoPT, 'PNG', g.x, g.y, g.w, g.h);
      xTeks = M + 25;
    }

    doc.setFont('helvetica', 'bold').setFontSize(8).setTextColor(...NAVY);
    doc.text(bersih(COMPANY.nama), xTeks, y + 5);
    tulis(doc, bersih(tb('tagline')), xTeks, y + 9, 7, false, ABU);

    if (logoBrand) {
      const g = pasKotak(logoBrand, 210 - M - 24, y + 1, 24, 9);
      doc.addImage(logoBrand, 'PNG', g.x, g.y, g.w, g.h);
    }

    y += 14;
    doc.setDrawColor(...NAVY).setLineWidth(0.8).line(M, y, 210 - M, y);

    /* ---------- LABEL KATEGORI ---------- */
    y += 7;
    const bhs = bahasaBrosur();
    const namaKat = (bhs !== 'id' && typeof tKategori === 'function' && tKategori(p.kategori))
      || BROSUR_LABEL[p.kategori] || p.kategori;
    const labelKat = bersih(namaKat).toUpperCase();
    doc.setFont('helvetica', 'bold').setFontSize(6.5);
    if (adaCJK(labelKat)) kanvasUkur.font = fontCJK(6.5, true, 1);
    const lebarTag = (adaCJK(labelKat) ? kanvasUkur.measureText(labelKat).width : doc.getTextWidth(labelKat)) + 5;
    doc.setFillColor(...HIJAU).rect(M, y - 3.2, lebarTag, 4.8, 'F');
    tulis(doc, labelKat, M + 2.5, y, 6.5, true, [255, 255, 255]);

    /* ---------- JUDUL ---------- */
      y += 11;
    doc.setFont('helvetica', 'bold').setFontSize(25).setTextColor(...NAVY);
    doc.text(bersih(p.nama), M, y);

    y += 6;
    tulis(doc, tb('seri') + ' ' + bersih(p.seri) + (brand ? '  |  ' + brand.nama : ''), M, y, 9.5, false, ABU);

    /* ---------- FOTO + KEGUNAAN ---------- */
    y += 6;
    const atasY = y, tinggiFoto = 76, lebarFoto = 92;

    doc.setFillColor(244, 246, 249).setDrawColor(224, 229, 236).setLineWidth(0.2);
    doc.rect(M, atasY, lebarFoto, tinggiFoto, 'FD');

    if (fotoProduk) {
      const g = pasKotak(fotoProduk, M + 3, atasY + 3, lebarFoto - 6, tinggiFoto - 6);
      const jenis = /\.jpe?g$/i.test(p.gambar) ? 'JPEG' : 'PNG';
      doc.addImage(fotoProduk, jenis, g.x, g.y, g.w, g.h);
    }

    const xGuna = M + lebarFoto + 6;
    const lebarGuna = 210 - M - xGuna;
    let yGuna = atasY + 4;

    tulis(doc, tb('guna'), xGuna, yGuna, 9, true, NAVY);
    doc.setDrawColor(221, 227, 234).setLineWidth(0.2);
    doc.line(xGuna, yGuna + 1.5, 210 - M, yGuna + 1.5);
    yGuna += 6;

    /* tList (i18n.js) selalu ada di semua halaman; teksList hanya di halaman
       yang memuat filter-produk.js */
    const guna = (typeof tList === 'function') ? tList(p.kegunaan)
      : (typeof teksList === 'function') ? teksList(p.kegunaan)
      : (p.kegunaan?.id || []);

    doc.setFont('helvetica', 'normal').setFontSize(8.2).setTextColor(40, 40, 40);
    let gunaPenuh = false;
    guna.forEach(g => {
      if (gunaPenuh) return;
      const baris = pecah(doc, bersih(g), lebarGuna - 4, 8.2, false);
      if (yGuna + baris.length * 3.6 > atasY + tinggiFoto) { gunaPenuh = true; return; }
      doc.setFont('helvetica', 'normal').setFontSize(8.2);
      doc.setTextColor(...HIJAU).text('•', xGuna, yGuna);
      tulis(doc, baris, xGuna + 3.5, yGuna, 8.2, false, [40, 40, 40]);
      yGuna += baris.length * 3.6 + 1.6;
    });

    /* ---------- SPESIFIKASI ---------- */
    y = atasY + tinggiFoto + 9;

    tulis(doc, tb('spek'), M, y, 9.5, true, NAVY);
    doc.setDrawColor(221, 227, 234).line(M, y + 1.5, 210 - M, y + 1.5);
    y += 6;

    /* Label & nilai spesifikasi diterjemahkan sama seperti di halaman produk */
    const spek = (p.spesifikasi || []).map(sp => ({
      label: (typeof tSpec === 'function') ? tSpec(sp.label) : sp.label,
      nilai: (typeof tNilai === 'function' && typeof tField === 'function')
        ? tNilai(tField(sp.nilai)) : (sp.nilai?.id || sp.nilai)
    }));
    const tengah = Math.ceil(spek.length / 2);
    const kolom  = [spek.slice(0, tengah), spek.slice(tengah)];

    const lebarKolom = (LEBAR - 6) / 2;
    const lebarLabel = lebarKolom * 0.46;
    const lebarNilai = lebarKolom - lebarLabel - 2;

    /* Kotak kontak dipatok di bawah halaman */
    const yKontak = 253;

    /* Hitung tinggi minimum tiap baris dulu */
    doc.setFontSize(7.6);
    const tinggiDasar = kolom.map(isi => isi.map(s =>
      Math.max(5.4, Math.max(
        pecah(doc, bersih(s.nilai), lebarNilai, 7.6, true).length,
        pecah(doc, bersih(s.label), lebarLabel - 2, 7.6, false).length) * 3.4 + 2)
    ));

    /* Sisa ruang dibagi rata ke semua baris supaya tabel
       memanjang sampai mepet kotak kontak */
    const tertinggi = Math.max(...tinggiDasar.map(t => t.reduce((a, b) => a + b, 0)));
    const barisTerbanyak = Math.max(...kolom.map(k => k.length), 1);
    const sisaRuang = (yKontak - 8) - y - tertinggi;
    const tambahan = Math.min(3.5, Math.max(0, sisaRuang / barisTerbanyak));

    kolom.forEach((isi, k) => {
      const x = M + k * (lebarKolom + 6);
      let yk = y;

      isi.forEach((s, i) => {
        const barisNilai = pecah(doc, bersih(s.nilai), lebarNilai, 7.6, true);
        const tinggi = tinggiDasar[k][i] + tambahan;
        const yTeks = yk + tinggi / 2 - (barisNilai.length - 1) * 1.7 + 1;

        if (i % 2 === 0) {
          doc.setFillColor(248, 250, 252).rect(x, yk, lebarKolom, tinggi, 'F');
        }

        tulis(doc, pecah(doc, bersih(s.label), lebarLabel - 2, 7.6, false), x + 2, yTeks, 7.6, false, [90, 98, 110]);
        tulis(doc, barisNilai, x + lebarLabel + 1, yTeks, 7.6, true, [30, 30, 30]);

        doc.setDrawColor(230, 234, 239).setLineWidth(0.1);
        doc.line(x, yk + tinggi, x + lebarKolom, yk + tinggi);

        yk += tinggi;
      });
    });

    /* ---------- KOTAK KONTAK ---------- */
    const a = COMPANY.alamat;
    doc.setFillColor(...NAVY).rect(M, yKontak, LEBAR, 23, 'F');

    tulis(doc, tb('tanya'), M + 5, yKontak + 7, 11, true, [255, 255, 255]);

    doc.setFont('helvetica', 'normal').setFontSize(7.6).setTextColor(255, 255, 255);
    doc.text('WhatsApp ' + COMPANY.telepon + '   |   ' + COMPANY.email, M + 5, yKontak + 12.5);
    doc.text(bersih(`${a.jalan}, ${a.kelurahan}, ${a.kota}, ${a.provinsi}`), M + 5, yKontak + 16.8);
    const jam = (bhs !== 'id' && typeof t === 'function' && t('kontak.jamIsi')) || COMPANY.jamOperasional;
    tulis(doc, bersih(jam), M + 5, yKontak + 21, 7.6, false, [255, 255, 255]);

    /* ---------- CATATAN ---------- */
    doc.setFont('helvetica', 'normal').setFontSize(6);
    tulis(doc, pecah(doc, tb('catatan') + bersih(COMPANY.nama) + '.', LEBAR, 6, false),
          M, yKontak + 28, 6, false, [150, 155, 162]);

    /* ---------- WATERMARK LOGO DASS ----------
       Digambar paling akhir, super transparan, di tengah halaman */
    if (watermark && doc.GState) {
      doc.saveGraphicsState();
      doc.setGState(new doc.GState({ opacity: 0.035 }));
      const g = pasKotak(watermark, 35, 90, 140, 120);
      doc.addImage(watermark, 'PNG', g.x, g.y, g.w, g.h);
      doc.restoreGraphicsState();
    }

    /* ---------- SIMPAN ---------- */
    doc.save('brosur-' +
      (BROSUR_SLUG[p.kategori] || slugBrosur(p.kategori)) + '-' +
      slugBrosur(p.brand) + '-' + slugBrosur(p.seri) +
      (bhs !== 'id' ? '-' + bhs : '') + '.pdf');

  } catch (err) {
    console.error('Gagal membuat brosur:', err);
    alert(tb('gagal'));

  } finally {
    if (tombol) { tombol.disabled = false; tombol.textContent = teksAsli; }
  }
}