/* =========================================
   CHATBOT AI "MAS DASS"
   Tombol bulat di atas tombol WhatsApp → panel chat. Pertanyaan dikirim ke
   COMPANY.chatbotUrl (api/chat.php di Hostinger), yang meneruskannya ke Claude.
   Riwayat percakapan disimpan di sessionStorage (hilang saat tab ditutup).
   ========================================= */

(function () {
  if (typeof COMPANY === 'undefined' || !COMPANY.chatbotUrl || document.getElementById('chatbot')) return;

  const KUNCI = 'dass-chat';
  const tx = (k, f) => (typeof t === 'function' && t(k)) || f;
  let riwayat = [];
  try { riwayat = JSON.parse(sessionStorage.getItem(KUNCI) || '[]'); } catch (e) { riwayat = []; }
  const simpan = () => { try { sessionStorage.setItem(KUNCI, JSON.stringify(riwayat.slice(-30))); } catch (e) {} };
  const lacak = (nama) => { if (typeof gtag === 'function') gtag('event', nama); };

  const IKON_KIRIM = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.4 20.4l17.4-7.5c.8-.4.8-1.5 0-1.8L3.4 3.6c-.7-.3-1.4.3-1.3 1l.9 5.6c.1.5.5.8 1 .9L14 12l-10 .9c-.5.1-.9.4-1 .9l-.9 5.6c-.1.7.6 1.3 1.3 1z"/></svg>';

  const base = document.body.dataset.base || '';
  /* Maskot Mas DASS (gambar dari pengguna, 10 Okt 2026) */
  const MASKOT = `${base}assets/images/chatbot/maskot-avatar.webp`;
  const akar = document.createElement('div');
  akar.id = 'chatbot';
  akar.className = 'chatbot';
  akar.innerHTML = `
    <button type="button" class="chatbot__buka" aria-expanded="false" aria-controls="chatbotPanel">
      <img class="chatbot__wajah" src="${MASKOT}" alt="" width="56" height="56"><span class="chatbot__ai">AI</span>
      <span class="chatbot__label"></span>
    </button>
    <section class="chatbot__panel" id="chatbotPanel" role="dialog" aria-modal="false" hidden>
      <header class="chatbot__kepala">
        <div class="chatbot__avatar"><img src="${MASKOT}" alt=""></div>
        <div class="chatbot__info"><strong class="chatbot__judul"></strong><span class="chatbot__sub"></span></div>
        <button type="button" class="chatbot__ulang" title="">↺</button>
        <button type="button" class="chatbot__tutup" aria-label="">&times;</button>
      </header>
      <div class="chatbot__isi" aria-live="polite"></div>
      <div class="chatbot__saran"></div>
      <form class="chatbot__form">
        <textarea rows="1" maxlength="1000" required></textarea>
        <button type="submit" class="chatbot__kirim" aria-label="">${IKON_KIRIM}</button>
      </form>
    </section>`;
  document.body.appendChild(akar);

  const $ = s => akar.querySelector(s);
  const tombol = $('.chatbot__buka'), panel = $('.chatbot__panel'), isi = $('.chatbot__isi');
  const form = $('.chatbot__form'), input = $('textarea'), saran = $('.chatbot__saran');

  /* Teks jawaban → HTML aman: escape dulu, lalu **tebal**, tautan, daftar, baris baru */
  const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function sebaris(h) {
    h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    h = h.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
    return h.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,;:!?])/g, (m, a, url) => {
      const label = url.replace(/^https?:\/\/(www\.)?dass\.co\.id\//, '').replace(/\.html$/, '').replace(/^(produk|pages\/produk)\//, '') || 'dass.co.id';
      return `${a}<a href="${url}">${label}</a>`;
    });
  }
  /* Paragraf dipisah baris kosong; baris berawalan "- " / "• " / "1. " menjadi daftar */
  function format(teks) {
    const baris = esc(teks.trim()).split('\n');
    let h = '', daftar = null, para = [];
    const tutupPara = () => { if (para.length) { h += `<p>${para.map(sebaris).join('<br>')}</p>`; para = []; } };
    const tutupDaftar = () => { if (daftar) { h += `<${daftar.tag}>${daftar.isi.map(x => `<li>${sebaris(x)}</li>`).join('')}</${daftar.tag}>`; daftar = null; } };
    for (const b of baris) {
      const butir = b.match(/^\s*(?:[-•*]|(\d+)[.)])\s+(.*)$/);
      if (butir) {
        tutupPara();
        const tag = butir[1] ? 'ol' : 'ul';
        if (!daftar || daftar.tag !== tag) { tutupDaftar(); daftar = { tag, isi: [] }; }
        daftar.isi.push(butir[2]);
      } else if (!b.trim()) { tutupPara(); tutupDaftar(); }
      else { tutupDaftar(); para.push(b); }
    }
    tutupPara(); tutupDaftar();
    return h;
  }

  function tambahGelembung(peran, teks) {
    const div = document.createElement('div');
    div.className = `chatbot__msg chatbot__msg--${peran === 'user' ? 'saya' : 'bot'}`;
    div.innerHTML = peran === 'user' ? esc(teks).replace(/\n/g, '<br>') : format(teks);
    div.querySelectorAll('a').forEach(a => {
      if (!/^https?:\/\/(www\.)?dass\.co\.id/.test(a.href)) { a.target = '_blank'; a.rel = 'noopener'; }
    });
    if (peran === 'user') { isi.appendChild(div); }
    else {
      /* Jawaban bot ditemani wajah kecil maskot */
      const baris = document.createElement('div');
      baris.className = 'chatbot__baris';
      baris.innerHTML = `<img class="chatbot__mini" src="${MASKOT}" alt="">`;
      baris.appendChild(div);
      isi.appendChild(baris);
    }
    isi.scrollTop = isi.scrollHeight;
  }

  function tampilkanSemua() {
    isi.innerHTML = `<div class="chatbot__sambut"><img src="${MASKOT}" alt=""><strong>${esc(tx('chat.judul', 'Mas DASS'))}</strong><span>${esc(tx('chat.sub', ''))}</span></div>`;
    tambahGelembung('assistant', tx('chat.sapa', 'Halo, saya Mas DASS.'));
    riwayat.forEach(p => tambahGelembung(p.peran, p.isi));
    saran.hidden = riwayat.length > 0;
  }

  function pasangTeks() {
    $('.chatbot__label').textContent = tx('chat.buka', 'Tanya Mas DASS');
    tombol.setAttribute('aria-label', tx('chat.buka', 'Tanya Mas DASS'));
    $('.chatbot__judul').textContent = tx('chat.judul', 'Mas DASS');
    $('.chatbot__sub').textContent = tx('chat.sub', 'Asisten virtual DASS');
    $('.chatbot__tutup').setAttribute('aria-label', tx('chat.tutup', 'Tutup'));
    $('.chatbot__ulang').title = tx('chat.ulang', 'Mulai ulang');
    $('.chatbot__ulang').setAttribute('aria-label', tx('chat.ulang', 'Mulai ulang'));
    input.placeholder = tx('chat.ketik', 'Tulis pertanyaan…');
    $('.chatbot__kirim').setAttribute('aria-label', tx('chat.kirim', 'Kirim'));
    saran.innerHTML = [1, 2, 3, 4].map(i => `<button type="button">${esc(tx('chat.saran' + i, ''))}</button>`).join('');
    tampilkanSemua();
  }
  window.gantiBahasaChatbot = pasangTeks;

  function buka(terbuka) {
    panel.hidden = !terbuka;
    tombol.setAttribute('aria-expanded', String(terbuka));
    akar.classList.toggle('is-open', terbuka);
    document.documentElement.classList.toggle('chatbot-terbuka', terbuka);
    if (terbuka) {
      lacak('chatbot_buka');
      isi.scrollTop = riwayat.length ? isi.scrollHeight : 0;   /* percakapan baru: tampilkan sambutan dari atas */
      if (window.matchMedia('(min-width: 769px)').matches) input.focus();
    }
  }

  let menunggu = false;
  async function kirim(teks) {
    teks = teks.trim().slice(0, 1000);
    if (!teks || menunggu) return;
    menunggu = true;
    saran.hidden = true;
    riwayat.push({ peran: 'user', isi: teks });
    simpan();
    tambahGelembung('user', teks);
    lacak('chatbot_tanya');

    const ketik = document.createElement('div');
    ketik.className = 'chatbot__baris';
    ketik.innerHTML = `<img class="chatbot__mini" src="${MASKOT}" alt=""><div class="chatbot__msg chatbot__msg--bot chatbot__mengetik"><span></span><span></span><span></span></div>`;
    isi.appendChild(ketik);
    isi.scrollTop = isi.scrollHeight;

    let jawaban = '';
    try {
      const res = await fetch(COMPANY.chatbotUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pesan: riwayat.slice(-12),
          bahasa: typeof BAHASA !== 'undefined' ? BAHASA : 'id',
          halaman: location.pathname
        })
      });
      const data = await res.json().catch(() => ({}));
      jawaban = data.jawaban || '';
    } catch (e) { jawaban = ''; }
    ketik.remove();
    if (!jawaban) {
      tambahGelembung('assistant', tx('chat.gagal', 'Mohon maaf, Mas DASS sedang tidak dapat merespons.'));
    } else {
      riwayat.push({ peran: 'assistant', isi: jawaban });
      simpan();
      tambahGelembung('assistant', jawaban);
    }
    menunggu = false;
  }

  tombol.addEventListener('click', () => buka(panel.hidden));
  $('.chatbot__tutup').addEventListener('click', () => buka(false));
  $('.chatbot__ulang').addEventListener('click', () => { riwayat = []; simpan(); tampilkanSemua(); });
  saran.addEventListener('click', e => { if (e.target.matches('button')) kirim(e.target.textContent); });
  form.addEventListener('submit', e => { e.preventDefault(); const v = input.value; input.value = ''; input.style.height = ''; kirim(v); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } });
  input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 110) + 'px'; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) buka(false); });

  pasangTeks();

  /* Label "Tanya Mas DASS" muncul sebentar di samping tombol (sekali per sesi) */
  try {
    if (!sessionStorage.getItem('dass-chat-label')) {
      setTimeout(() => akar.classList.add('chatbot--label'), 2500);
      setTimeout(() => akar.classList.remove('chatbot--label'), 9000);
      sessionStorage.setItem('dass-chat-label', '1');
    }
  } catch (e) {}
})();
