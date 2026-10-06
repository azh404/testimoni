/* =========================================================
   PENERIMA LEADS WEBSITE DASS → GOOGLE SHEETS
   Kode ini dipasang di Google Sheet "Leads Website DASS":
     Ekstensi → Apps Script → hapus isi Code.gs → tempel semua kode ini → Simpan.
   Lalu: Terapkan (Deploy) → Deployment baru → jenis "Aplikasi web"
     - Jalankan sebagai : Saya (akun pemilik sheet)
     - Yang memiliki akses : Siapa saja
   Salin URL Aplikasi web (berakhiran /exec) ke assets/js/config.js → leadsUrl.
   Setiap kali kode ini diubah: Terapkan → Kelola deployment → edit → Versi baru.
   ========================================================= */

const NAMA_SHEET = 'Leads';

/* Opsional: email yang menerima pemberitahuan setiap ada lead baru.
   Contoh: 'sales@contoh.com'. Kosongkan ('') bila tidak perlu. */
const EMAIL_NOTIFIKASI = '';

function doPost(e) {
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    /* Kolom jebakan bot: manusia tidak melihat kolom ini, bot biasanya mengisinya */
    if (d.situs) return jawab(true);

    const nama = bersih(d.nama, 80);
    const wa   = String(d.wa || '').replace(/[^0-9+]/g, '').slice(0, 16);
    if (!nama || wa.replace(/\D/g, '').length < 9 || d.setuju !== true) return jawab(false);

    const baris = [
      new Date(),
      nama,
      "'" + wa,                       /* tanda ' agar angka 0 di depan tidak hilang */
      bersih(d.perusahaan, 100),
      bersih(d.minat, 40),
      bersih(d.lokasi, 80),
      bersih(d.sumber, 60),
      bersih(d.halaman, 200),
      bersih(d.bahasa, 5),
      'Ya'
    ];

    const kunci = LockService.getScriptLock();
    kunci.waitLock(10000);
    try {
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NAMA_SHEET).appendRow(baris);
    } finally {
      kunci.releaseLock();
    }

    if (EMAIL_NOTIFIKASI) {
      MailApp.sendEmail(EMAIL_NOTIFIKASI, 'Lead baru website DASS: ' + nama,
        'Nama: ' + nama + '\nWhatsApp: ' + wa + '\nPerusahaan: ' + baris[3] +
        '\nMinat: ' + baris[4] + '\nLokasi: ' + baris[5] + '\nSumber: ' + baris[6] +
        '\nHalaman: ' + baris[7]);
    }
    return jawab(true);
  } catch (err) {
    return jawab(false);
  }
}

/* Batasi panjang teks & cegah teks dibaca sebagai rumus spreadsheet (=, +, -, @) */
function bersih(nilai, maks) {
  let s = String(nilai || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, maks);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function jawab(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok }))
    .setMimeType(ContentService.MimeType.JSON);
}
