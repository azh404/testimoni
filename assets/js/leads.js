/* =========================================
   FORM LEADS → GOOGLE SHEETS
   Dimuat otomatis oleh main.js bila COMPANY.leadsUrl diisi.
   1. Pop-up tawaran brosur & harga, muncul sekali setelah 25 detik
      (tidak muncul lagi 7 hari bila ditutup, selamanya bila sudah mengisi).
   2. gerbangLead(): form wajib diisi sekali sebelum unduh brosur PDF.
   Data dikirim ke Google Apps Script (tools/leads-apps-script.gs).
   ========================================= */

const LEAD_KUNCI_ISI   = 'dass-lead-terkirim';
const LEAD_KUNCI_TUTUP = 'dass-lead-ditutup';
const LEAD_JEDA_POPUP  = 25000;                    /* 25 detik */
const LEAD_JEDA_ULANG  = 7 * 24 * 60 * 60 * 1000;  /* 7 hari */

const simpanLead = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
const bacaLead   = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const sudahIsiLead = () => bacaLead(LEAD_KUNCI_ISI) === '1';

let leadBuka = null;   /* fungsi selesai(hasil) untuk form yang sedang terbuka */

function bukaFormLead(mode) {
  if (leadBuka) return Promise.resolve(false);
  const brosur = mode !== 'popup';
  const id = 'leadJudul';

  const wadah = document.createElement('div');
  wadah.className = 'lead';
  wadah.innerHTML = `
    <div class="lead__latar" data-lead-tutup></div>
    <div class="lead__kotak" role="dialog" aria-modal="true" aria-labelledby="${id}">
      <button type="button" class="lead__x" data-lead-tutup aria-label="${t('lead.tutup')}">&times;</button>
      <form class="lead__form" novalidate>
        <h2 class="lead__judul" id="${id}">${t(brosur ? 'lead.judulBrosur' : 'lead.judul')}</h2>
        <p class="lead__desc">${t(brosur ? 'lead.descBrosur' : 'lead.desc')}</p>

        <label class="lead__label">${t('lead.nama')} *
          <input class="lead__input" name="nama" type="text" maxlength="80" autocomplete="name" required>
        </label>
        <label class="lead__label">${t('lead.wa')} *
          <input class="lead__input" name="wa" type="tel" maxlength="20" autocomplete="tel" inputmode="tel" placeholder="08xx-xxxx-xxxx" required>
        </label>
        <label class="lead__label">${t('lead.perusahaan')}
          <input class="lead__input" name="perusahaan" type="text" maxlength="100" autocomplete="organization">
        </label>
        <div class="lead__baris">
          <label class="lead__label">${t('lead.minat')}
            <select class="lead__input" name="minat">
              <option value="">${t('lead.pilih')}</option>
              ${['traktor', 'combine', 'drone', 'steering', 'lain'].map(k =>
                `<option value="${TEKS['lead.m.' + k].id}">${t('lead.m.' + k)}</option>`).join('')}
            </select>
          </label>
          <label class="lead__label">${t('lead.lokasi')}
            <input class="lead__input" name="lokasi" type="text" maxlength="80" autocomplete="address-level2">
          </label>
        </div>
        <!-- Kolom jebakan bot: disembunyikan dari manusia -->
        <input class="lead__jebakan" name="situs" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">

        <label class="lead__setuju">
          <input name="setuju" type="checkbox" required>
          <span>${t('lead.setuju')}</span>
        </label>

        <p class="lead__pesan" role="alert" hidden></p>
        <button type="submit" class="btn btn--primary btn--lg lead__kirim">${t(brosur ? 'lead.kirimBrosur' : 'lead.kirim')}</button>
      </form>
    </div>`;
  document.body.appendChild(wadah);
  document.body.classList.add('lead-terbuka');

  const form  = wadah.querySelector('form');
  const pesan = wadah.querySelector('.lead__pesan');
  const tombol = wadah.querySelector('.lead__kirim');
  const sebelumnya = document.activeElement;
  requestAnimationFrame(() => {
    wadah.classList.add('is-tampil');
    form.nama.focus();
  });

  return new Promise(resolve => {
    const tutup = (hasil) => {
      document.removeEventListener('keydown', tombolEsc);
      wadah.classList.remove('is-tampil');
      document.body.classList.remove('lead-terbuka');
      setTimeout(() => wadah.remove(), 250);
      if (sebelumnya && sebelumnya.focus) sebelumnya.focus();
      leadBuka = null;
      resolve(hasil);
    };
    leadBuka = tutup;
    const tombolEsc = (e) => { if (e.key === 'Escape') batal(); };
    const batal = () => {
      if (mode === 'popup') simpanLead(LEAD_KUNCI_TUTUP, String(Date.now()));
      tutup(false);
    };
    document.addEventListener('keydown', tombolEsc);
    wadah.querySelectorAll('[data-lead-tutup]').forEach(el => el.addEventListener('click', () => {
      wadah.classList.contains('is-selesai') ? tutup(true) : batal();
    }));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      pesan.hidden = true;
      const nama = form.nama.value.trim();
      const angkaWa = form.wa.value.replace(/\D/g, '');
      const salah = (teks, el) => { pesan.textContent = teks; pesan.hidden = false; if (el) el.focus(); };
      if (!nama) return salah(t('lead.isiNama'), form.nama);
      if (angkaWa.length < 9 || angkaWa.length > 15) return salah(t('lead.salahWa'), form.wa);
      if (!form.setuju.checked) return salah(t('lead.wajibSetuju'), form.setuju);

      tombol.disabled = true;
      tombol.textContent = t('lead.mengirim');
      const data = {
        nama,
        wa: form.wa.value.trim(),
        perusahaan: form.perusahaan.value.trim(),
        minat: form.minat.value,
        lokasi: form.lokasi.value.trim(),
        sumber: mode,
        halaman: location.pathname,
        bahasa: (typeof BAHASA !== 'undefined') ? BAHASA : 'id',
        setuju: true,
        situs: form.situs.value
      };
      try {
        /* text/plain + no-cors: Apps Script tidak mengirim izin CORS,
           jadi jawabannya tidak bisa dibaca; yang penting data terkirim */
        await fetch(COMPANY.leadsUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(data)
        });
      } catch (err) {
        tombol.disabled = false;
        tombol.textContent = t(brosur ? 'lead.kirimBrosur' : 'lead.kirim');
        return salah(t('lead.gagal'));
      }

      simpanLead(LEAD_KUNCI_ISI, '1');
      if (typeof gtag === 'function') gtag('event', 'generate_lead', { lead_sumber: mode });

      if (brosur) return tutup(true);   /* brosur langsung diunduh */

      wadah.classList.add('is-selesai');
      form.innerHTML = `
        <div class="lead__selesai">
          <div class="lead__centang" aria-hidden="true">&#10003;</div>
          <h2 class="lead__judul" id="${id}">${t('lead.terima')}</h2>
          <p class="lead__desc">${t('lead.terimaDesc')}</p>
          <a class="btn btn--wa btn--lg" target="_blank" rel="noopener"
             href="${waLink('Halo, saya ' + nama + '. Saya baru mengisi form di website dan ingin informasi produk.')}">${t('lead.chatSekarang')}</a>
        </div>`;
    });
  });
}

/* Dipanggil sebelum unduh brosur. true = boleh lanjut. */
function gerbangLead(sumber) {
  if (!COMPANY.leadsUrl || sudahIsiLead()) return Promise.resolve(true);
  return bukaFormLead(sumber || 'brosur');
}

/* Pop-up sekali setelah 25 detik di halaman */
(function jadwalPopupLead() {
  if (!COMPANY.leadsUrl || sudahIsiLead()) return;
  const halaman = document.body.dataset.page || '';
  if (['kontak', '404', 'perbaikan'].includes(halaman)) return;
  if (/(^|\/)(404|perbaikan)\.html$/.test(location.pathname)) return;
  const ditutup = Number(bacaLead(LEAD_KUNCI_TUTUP) || 0);
  if (Date.now() - ditutup < LEAD_JEDA_ULANG) return;

  setTimeout(() => {
    /* Jangan menimpa jendela lain yang sedang terbuka (menu HP, modal produk) */
    if (document.hidden || leadBuka || document.querySelector('.modal.is-open, .nav.is-open')) return;
    bukaFormLead('popup');
  }, LEAD_JEDA_POPUP);
})();
