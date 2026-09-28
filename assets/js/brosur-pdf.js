/* =========================================================
   DOWNLOAD BROSUR PDF
   Digambar langsung dengan jsPDF, bukan memotret layar.
   ========================================================= */

const JSPDF_CDN =
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

const BROSUR_LOGO = 'assets/images/logo/logo.png';

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
  if (tombol) { tombol.disabled = true; tombol.textContent = 'Menyiapkan...'; }

  try {
    await muatJsPDF();

    const [logoPT, logoBrand, fotoProduk] = await Promise.all([
      muatGambar(base + BROSUR_LOGO),
      brand ? muatGambar(base + brand.logo) : Promise.resolve(null),
      muatGambar(base + p.gambar)
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
    doc.setFont('helvetica', 'normal').setFontSize(7).setTextColor(...ABU);
    doc.text(bersih(COMPANY.tagline), xTeks, y + 9);

    if (logoBrand) {
      const g = pasKotak(logoBrand, 210 - M - 24, y + 1, 24, 9);
      doc.addImage(logoBrand, 'PNG', g.x, g.y, g.w, g.h);
    }

    y += 14;
    doc.setDrawColor(...NAVY).setLineWidth(0.8).line(M, y, 210 - M, y);

    /* ---------- LABEL KATEGORI ---------- */
    y += 7;
    const labelKat = bersih(BROSUR_LABEL[p.kategori] || p.kategori).toUpperCase();
    doc.setFont('helvetica', 'bold').setFontSize(6.5);
    const lebarTag = doc.getTextWidth(labelKat) + 5;
    doc.setFillColor(...HIJAU).rect(M, y - 3.2, lebarTag, 4.8, 'F');
    doc.setTextColor(255, 255, 255).text(labelKat, M + 2.5, y);

    /* ---------- JUDUL ---------- */
      y += 11;
    doc.setFont('helvetica', 'bold').setFontSize(25).setTextColor(...NAVY);
    doc.text(bersih(p.nama), M, y);

    y += 6;
    doc.setFont('helvetica', 'normal').setFontSize(9.5).setTextColor(...ABU);
    doc.text('Seri ' + bersih(p.seri) + (brand ? '  |  ' + brand.nama : ''), M, y);

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

    doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor(...NAVY);
    doc.text('KEGUNAAN', xGuna, yGuna);
    doc.setDrawColor(221, 227, 234).setLineWidth(0.2);
    doc.line(xGuna, yGuna + 1.5, 210 - M, yGuna + 1.5);
    yGuna += 6;

    const guna = (typeof teksList === 'function')
      ? teksList(p.kegunaan) : (p.kegunaan?.id || []);

    doc.setFont('helvetica', 'normal').setFontSize(8.2).setTextColor(40, 40, 40);
    guna.forEach(g => {
      const baris = doc.splitTextToSize(bersih(g), lebarGuna - 4);
      if (yGuna + baris.length * 3.6 > atasY + tinggiFoto) return;
      doc.setTextColor(...HIJAU).text('•', xGuna, yGuna);
      doc.setTextColor(40, 40, 40).text(baris, xGuna + 3.5, yGuna);
      yGuna += baris.length * 3.6 + 1.6;
    });

    /* ---------- SPESIFIKASI ---------- */
    y = atasY + tinggiFoto + 9;

    doc.setFont('helvetica', 'bold').setFontSize(9.5).setTextColor(...NAVY);
    doc.text('SPESIFIKASI TEKNIS', M, y);
    doc.setDrawColor(221, 227, 234).line(M, y + 1.5, 210 - M, y + 1.5);
    y += 6;

    const spek   = p.spesifikasi || [];
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
      Math.max(5.4, doc.splitTextToSize(bersih(s.nilai), lebarNilai).length * 3.4 + 2)
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
        const barisNilai = doc.splitTextToSize(bersih(s.nilai), lebarNilai);
        const tinggi = tinggiDasar[k][i] + tambahan;
        const yTeks = yk + tinggi / 2 - (barisNilai.length - 1) * 1.7 + 1;

        if (i % 2 === 0) {
          doc.setFillColor(248, 250, 252).rect(x, yk, lebarKolom, tinggi, 'F');
        }

        doc.setFont('helvetica', 'normal').setFontSize(7.6).setTextColor(90, 98, 110);
        doc.text(doc.splitTextToSize(bersih(s.label), lebarLabel - 2), x + 2, yTeks);

        doc.setFont('helvetica', 'bold').setTextColor(30, 30, 30);
        doc.text(barisNilai, x + lebarLabel + 1, yTeks);

        doc.setDrawColor(230, 234, 239).setLineWidth(0.1);
        doc.line(x, yk + tinggi, x + lebarKolom, yk + tinggi);

        yk += tinggi;
      });
    });

    /* ---------- KOTAK KONTAK ---------- */
    const a = COMPANY.alamat;
    doc.setFillColor(...NAVY).rect(M, yKontak, LEBAR, 23, 'F');

    doc.setFont('helvetica', 'bold').setFontSize(11).setTextColor(255, 255, 255);
    doc.text('Tanya harga & ketersediaan unit', M + 5, yKontak + 7);

    doc.setFont('helvetica', 'normal').setFontSize(7.6);
    doc.text('WhatsApp ' + COMPANY.telepon + '   |   ' + COMPANY.email, M + 5, yKontak + 12.5);
    doc.text(bersih(`${a.jalan}, ${a.kelurahan}, ${a.kota}, ${a.provinsi}`), M + 5, yKontak + 16.8);
    doc.text(bersih(COMPANY.jamOperasional), M + 5, yKontak + 21);

    /* ---------- CATATAN ---------- */
    doc.setFontSize(6).setTextColor(150, 155, 162);
    doc.text(doc.splitTextToSize(
      'Spesifikasi dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu. ' +
      'Diterbitkan oleh ' + bersih(COMPANY.nama) + '.', LEBAR), M, yKontak + 28);

    /* ---------- SIMPAN ---------- */
    doc.save('brosur-' +
      (BROSUR_SLUG[p.kategori] || slugBrosur(p.kategori)) + '-' +
      slugBrosur(p.brand) + '-' + slugBrosur(p.seri) + '.pdf');

  } catch (err) {
    console.error('Gagal membuat brosur:', err);
    alert('Maaf, brosur gagal dibuat. Periksa koneksi internet lalu coba lagi.');

  } finally {
    if (tombol) { tombol.disabled = false; tombol.textContent = teksAsli; }
  }
}