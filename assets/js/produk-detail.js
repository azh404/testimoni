/* =========================================
   HALAMAN DETAIL PRODUK
   Teks bawaan halaman sudah ditulis dalam bahasa
   Indonesia (supaya terbaca Google). File ini hanya
   menggantinya saat pengunjung memilih English / 中文.
   ========================================= */

const LABEL_KATEGORI_ID = {
  'hybrid':        'Mesin Hybrid',
  'tractor':       'Traktor',
  'planter':       'Mesin Tanam Padi',
  'harvester':     'Combine Harvester',
  'sugarcane':     'Mesin Panen Tebu',
  'dryer':         'Mesin Pengering Gabah',
  'baler':         'Mesin Baler',
  'implement':     'Implement Traktor',
  'sprayer-drone': 'Drone Sprayer Pertanian',
  'va-drone':      'Drone Pertanian',
  'va-steering':   'Auto Steering Traktor',
  'va-rover':      'Robot Pertanian',
  'va-digital':    'Solusi Pertanian Digital'
};

function labelKategoriDetail(p) {
  if (BAHASA === 'id') return LABEL_KATEGORI_ID[p.kategori] || p.kategori;
  const teks = (typeof tKategori === 'function') ? tKategori(p.kategori) : '';
  if (teks) return teks;
  const k = (KATEGORI[p.brand] || []).find(x => x.id === p.kategori);
  return k ? k.nama : p.kategori;
}

function initHalamanDetail() {
  const id = document.body.dataset.produkId;
  if (!id || typeof PRODUK === 'undefined') return;

  const p = PRODUK.find(x => x.id === id);
  if (!p) return;

  /* Judul tab browser: nama produk untuk EN & ZH */
  const h1 = document.querySelector('.detail-info h1');
  if (JUDUL_ASLI === null) JUDUL_ASLI = document.title;
  document.title = (BAHASA === 'id' || !h1) ? JUDUL_ASLI : `${h1.textContent.trim()} | DASS`;

  /* Kategori (bisa muncul di beberapa tempat) */
  const kat = labelKategoriDetail(p);
  document.querySelectorAll('[data-detail="kategori"]').forEach(el => { el.textContent = kat; });

  /* Kategori di kartu "Produk Lainnya" ditulis dalam bahasa Indonesia */
  document.querySelectorAll('.produk-card__kategori').forEach(el => {
    if (!el.dataset.kategori) {
      const label = el.textContent.trim();
      el.dataset.kategori = Object.keys(LABEL_KATEGORI_ID).find(k => LABEL_KATEGORI_ID[k] === label) || '';
    }
    const id = el.dataset.kategori;
    if (id) el.textContent = labelKategoriDetail({ kategori: id, brand: p.brand });
  });

  /* Ringkasan */
  const ringkas = document.querySelector('[data-detail="ringkas"]');
  if (ringkas) {
    const teks = tField(p.ringkas);
    if (teks) ringkas.textContent = teks;
  }

  /* Keunggulan */
  const ul = document.querySelector('[data-detail="kegunaan"]');
  const daftar = tList(p.kegunaan);
  if (ul && daftar.length) {
    ul.textContent = '';
    daftar.forEach(k => {
      const li = document.createElement('li');
      li.textContent = k;
      ul.appendChild(li);
    });
  }

  /* Spesifikasi */
  const tbody = document.querySelector('[data-detail="spesifikasi"]');
  if (tbody && p.spesifikasi && p.spesifikasi.length) {
    tbody.textContent = '';
    /* Dua kolom di layar lebar (lihat .is-dua-kolom di produk-detail.css) */
    tbody.closest('table').classList.toggle('is-dua-kolom', p.spesifikasi.length >= 6);
    tbody.style.setProperty('--baris', Math.ceil(p.spesifikasi.length / 2));
    p.spesifikasi.forEach(s => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      const td = document.createElement('td');
      th.scope = 'row';
      th.textContent = tSpec(s.label);
      td.textContent = tNilai(tField(s.nilai));
      tr.append(th, td);
      tbody.appendChild(tr);
    });
  }

  rapikanHalamanDetail(p);
}

/* =========================================
   TAMPILAN HALAMAN DETAIL (dibuat ulang tiap ganti bahasa)
   - strip 4 spesifikasi utama di bawah hero
   - menu lompat (Keunggulan / Spesifikasi / Kalkulator / Produk Lainnya), menempel saat scroll
   ========================================= */
function spekUtama(p, jumlah) {
  const pola = [/daya|tenaga|power|hp\b/i, /transmisi/i, /kapasitas/i, /kecepatan/i, /lebar kerja|baris|jarak tanam/i, /berat/i, /mesin/i];
  const spek = p.spesifikasi || [], pilih = [];
  pola.forEach(re => {
    if (pilih.length >= jumlah) return;
    const s = spek.find(x => re.test(x.label) && !/model/i.test(x.label) && tField(x.nilai).length <= 22 && !pilih.includes(x));
    if (s) pilih.push(s);
  });
  spek.forEach(x => { if (pilih.length < jumlah && !/model/i.test(x.label) && tField(x.nilai).length <= 22 && !pilih.includes(x)) pilih.push(x); });
  return pilih;
}

function rapikanHalamanDetail(p) {
  const tx = (k, f) => (typeof t === 'function' && t(k)) || f;

  /* Strip spesifikasi utama */
  const heroBox = document.querySelector('.detail-hero .container');
  if (heroBox) {
    heroBox.querySelector('.detail-sorotan')?.remove();
    const spek = spekUtama(p, 4);
    if (spek.length >= 2) {
      const div = document.createElement('div');
      div.className = 'detail-sorotan';
      spek.forEach(s => {
        const c = document.createElement('div');
        c.className = 'detail-sorotan__item';
        const b = document.createElement('strong'); b.textContent = tNilai(tField(s.nilai));
        const l = document.createElement('span'); l.textContent = tSpec(s.label);
        c.append(b, l); div.appendChild(c);
      });
      heroBox.appendChild(div);
    }
  }

  /* Menu lompat antar-bagian (ditunda: kalkulator baru diisi setelah fungsi ini) */
  setTimeout(() => buatMenuDetail(tx), 0);
}

function buatMenuDetail(tx) {
  const tujuan = [
    ['keunggulan', document.querySelector('[data-detail="kegunaan"]')?.parentElement, tx('modal.kegunaan', 'Keunggulan')],
    ['spesifikasi', document.querySelector('[data-detail="spesifikasi"]')?.closest('table')?.parentElement, tx('modal.spesifikasi', 'Spesifikasi')],
    ['kalkulator', document.querySelector('[data-kalk-mini], [data-kalk-traktor]')?.closest('section'), tx('detail.tabKalk', 'Kalkulator')],
    ['lainnya', document.querySelector('.detail-lainnya-head')?.closest('section'), tx('detail.lainnya', 'Produk Lainnya')]
  ].filter(x => x[1] && (x[0] !== 'kalkulator' || x[1].querySelector('[data-kalk-mini]:not(:empty), [data-kalk-traktor]:not(:empty)')));
  const hero = document.querySelector('.detail-hero');
  if (!hero || tujuan.length < 2) return;
  document.querySelector('.detail-tab')?.remove();
  const nav = document.createElement('nav');
  nav.className = 'detail-tab';
  nav.setAttribute('aria-label', tx('detail.tabLabel', 'Bagian halaman'));
  const isi = document.createElement('div');
  isi.className = 'container detail-tab__isi';
  tujuan.forEach(([id, el, label]) => {
    el.id = 'bagian-' + id;
    const a = document.createElement('a');
    a.href = '#bagian-' + id; a.textContent = label;
    isi.appendChild(a);
  });
  nav.appendChild(isi);
  hero.after(nav);

  /* Tandai bagian yang sedang dilihat */
  if ('IntersectionObserver' in window) {
    const link = id => nav.querySelector(`a[href="#${id}"]`);
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        nav.querySelectorAll('a').forEach(a => a.classList.remove('is-aktif'));
        link(e.target.id)?.classList.add('is-aktif');
      }
    }), { rootMargin: '-45% 0px -50% 0px' });
    tujuan.forEach(([, el]) => io.observe(el));
  }
}
