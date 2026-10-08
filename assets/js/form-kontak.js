/* =========================================
   FORM KONTAK — kirim ke WhatsApp
   ========================================= */

function initFormKontak() {
  const btn = document.getElementById('btnKirimWA');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const nama       = document.getElementById('fNama')?.value.trim() || '';
    const perusahaan = document.getElementById('fPerusahaan')?.value.trim() || '';
    const minat      = document.getElementById('fMinat')?.value || '';
    const pesan      = document.getElementById('fPesan')?.value.trim() || '';

    /* Nama wajib diisi */
    if (!nama) {
      const el = document.getElementById('fNama');
      el.classList.add('is-error');
      el.focus();
      setTimeout(() => el.classList.remove('is-error'), 2000);
      return;
    }

    let teks = 'Halo PT Diesel Agri Sukses Sejahtera,\n\n';
    teks += `Nama: ${nama}\n`;
    if (perusahaan) teks += `Perusahaan: ${perusahaan}\n`;
    if (minat)      teks += `Produk diminati: ${minat}\n`;
    if (pesan)      teks += `\nPesan:\n${pesan}`;

    window.open(waLink(teks), '_blank', 'noopener');
  });
}