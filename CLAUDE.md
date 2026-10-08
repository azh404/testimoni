# Website PT Diesel Agri Sukses Sejahtera (DASS)

Catatan untuk Claude: konteks proyek, cara kerja, dan keputusan yang sudah diambil.
Baca ini dulu sebelum mengerjakan apa pun. Perbarui file ini bila ada keputusan baru.

## Tentang proyek & pemilik
- Website statis distributor resmi **Zoomlion** (traktor, combine, dryer, baler, dll.),
  **EAVision** (drone sprayer), dan **VectorAgr** (drone, auto steering, rover) di
  Cakung, Jakarta Timur. Live: https://dass.co.id (hosting **Hostinger**).
- Pemilik repo adalah IT developer DASS, masih pemula. **Jawab dalam bahasa Indonesia
  yang sederhana**, beri langkah konkret (perintah cmd satu per satu), jangan bertele-tele.
  Ia sering mengeluh kalau lambat — kerjakan efisien, laporkan hasil singkat.
- Salinan lokal pengguna: `C:\Users\User\Downloads\DASS-WEB` (Windows cmd, VS Code +
  Live Server). Setelah merge, pengguna menjalankan `git pull` lalu upload ke Hostinger
  (paling aman: ZIP semua isi folder kecuali `.git`, hapus isi `public_html`, extract).
  `.htaccess` adalah file tersembunyi — ingatkan "Show hidden files" di File Manager.
  **9 Okt**: pengguna sempat meng-upload ZIP 1,6 GB (ikut `.git` 1,2 GB) dan di `public_html` ada folder `.git`, `.git.92`,
  `.git.328`, dst. sisa upload lama → minta hapus. Situs tanpa `.git`/`foto-baru` ±320 MB (video 227 MB; hanya
  hero-zoomlion-1 ±20 MB yang dipakai, video slide 2–5 boleh tidak di-upload). `.htaccess` kini memblokir `.git*`, `foto-baru`, `.vscode`.
- Kontak: WA/telepon `0811-1660-2926` (`nomorWA()` di config.js mengubah ke 62…),
  Instagram `dass.agriculture`, Google Business Profile (terverifikasi, Okt 2026):
  `https://g.page/r/CX_ykRcjTf7sEBM` (+ `/review` untuk ulasan) di `COMPANY.sosmed.googleMaps/ulasan`,
  dipakai ikon peta di footer, tombol di kontak.html, dan schema `sameAs`/`hasMap`; alamat Jl. River Garden Boulevard No. 19B Blok B2,
  Cakung Timur. Google Analytics 4: `G-1XWSJJDZMF`.

## Alur git (wajib)
1. `git fetch origin main && git checkout -B <branch-sesi-ini> origin/main`
   (pakai nama branch yang diberikan sistem di sesi itu; branch lama selalu sudah di-merge).
2. Kerjakan, uji, commit (pesan bahasa Indonesia), `git push -u origin <branch>`.
3. Buat PR ke `main` lalu **merge sendiri** (pengguna selalu minta merge). Pakai SHA
   lengkap 40 karakter untuk `expectedHeadSha`.
4. Di akhir, beri tahu pengguna: `git pull` + file/cara upload ke Hostinger (+ Ctrl+F5).

## Struktur
- HTML statis di root (`index`, `tentang`, `kontak`, `artikel`, `kalkulator`,
  `bandingkan`, `kamus-pertanian`, `faq`, `404`, `perbaikan` (mode perbaikan), 6 halaman kata kunci `jual-*`,
  `traktor-kebun-sawit`, `combine-harvester-padi`, `drone-pertanian-sawah`),
  `produk/*.html` (62 halaman detail), `artikel/*.html`, `pages/produk/<brand>.html`.
- Footer 4 kolom (desain baru 6 Okt 2026, garis aksen hijau→biru di atas): logo `logo-dass-putih.png` + nama +
  tagline + alamat/WA/jam berikon hijau | Hubungi Kami (ikon + label: Email, WhatsApp, Google Maps, Instagram) | Jelajahi (9 link: 3 jual-*, combine padi, kebun sawit, drone sawah, panen tebu & pengering gabah (zoomlion ?kategori=), auto steering VectorAgr; label ringkas profesional 8 Okt) |
  Panduan (kalkulator, bandingkan, kamus, FAQ); bar bawah hanya "© tahun PT DASS" di tengah.
- `partials/navbar.txt` & `footer.txt` (isi HTML) dimuat oleh `main.js` (`{{base}}` = `data-base`).
  Sengaja `.txt`: Live Server VS Code menyisipkan script ke file `.html` dan memotong akhirnya.
- `assets/js/config.js` — data perusahaan (satu sumber: nomor, email, jam kerja, GA).
- `assets/js/data/` — `brands.js` (BRANDS, KATEGORI, ALT_KATEGORI, `PRODUK = []`),
  `produk-{zoomlion,eavision,vectoragr}.js`, `lang.js` (semua teks ID/EN/ZH),
  `artikel.js` + `artikel-terjemahan.js`.
- JS fitur: `filter-produk.js` (kartu, urlProduk, gambarKecil, altProduk),
  `produk-detail.js`, `kalkulator.js` (kalkulator drone + pilih traktor + versi mini di
  halaman produk), `bandingkan.js`, `fitur.js` (pencarian & tombol bagikan — **dimuat otomatis
  oleh main.js**; fitur "Terakhir Anda Lihat" DIHAPUS 7 Okt atas permintaan, riwayat lama dibersihkan), `brosur-pdf.js` (jsPDF dari cdnjs).
  `beranda.js` (angka, Showcase Produk), `slider.js` (hero video/foto + reveal + counter).
- `tools/` (jalankan ulang setelah mengubah data terkait):
  - `node tools/buat-halaman-artikel.js` — halaman artikel + sitemap.
  - `node tools/buat-halaman-landing.js` — halaman kata kunci + blok "Lihat Juga" di
    produk/*.html (di antara penanda `<!-- LIHAT-JUGA -->`) + sitemap.
  - `python tools/optimasi-gambar.py` — `-kecil.webp` (kartu), `-og.jpg` (pratinjau link).
  - `node tools/seo-gambar.js` — teks alt foto produk + `sitemap-gambar.xml`.
  - `node tools/buat-panduan.js` — bagian "Untuk Siapa …" (12 produk tipis) & "Tentang <Merek>" (3 halaman merek) dari
    `tools/data-panduan.js` (ID/EN/ZH, di antara penanda `<!-- PANDUAN -->`, CSS `.panduan`; 9 Okt, untuk isi halaman ≥300 kata).
  - `python tools/ubah-video.py foto-baru/<nama>.mp4` — video hero → WebM+MP4 (HD & `-hp`) + sampul webp.

## Konvensi penting
- **3 bahasa (ID/EN/ZH)** untuk semua teks baru: kunci di `lang.js` + `data-i18n`, atau
  blok `[data-bahasa="id|en|zh"]` (ID tampil bawaan agar terbaca Google). Fungsi yang
  merender ulang saat ganti bahasa didaftarkan di `gantiBahasa()` (i18n.js).
- **SATU `<h1>` per halaman (9 Okt, SEO)**: di blok `[data-bahasa]`, hanya versi ID yang `<h1>`; versi EN/ZH =
  `<div class="h1" role="heading" aria-level="1">` (CSS: semua selektor h1 ditulis `:is(h1, .h1)`). Generator artikel &
  landing sudah mengikuti aturan ini — terapkan juga di halaman baru.
- Pesan WhatsApp ke tim selalu bahasa Indonesia.
- **Bahasa bawaan = ENGLISH di SEMUA halaman (8 Okt 2026, permintaan tegas pengguna setelah risiko SEO dijelaskan 2×)**:
  i18n.js `BAHASA = localStorage 'bahasa-v2' || 'en'` (kunci lama 'bahasa' dihapus agar pengunjung lama juga EN). Teks HTML tetap ID (Google bisa membaca JS → kemungkinan mengindeks
  versi EN; risiko turun peringkat kueri Indonesia sudah disampaikan). Aturan lama "beranda selalu ID" DIHAPUS. Pilihan
  bendera pengunjung tetap disimpan. Di HP bendera ada di DALAM menu ☰, paling atas di atas Home
  (pengguna menolak bendera di navbar HP). Bila peringkat Search Console turun, ingatkan pengguna soal ini.
- Foto produk: PNG 1200×900 transparan (asli, untuk PDF) + `.webp` + `-kecil.webp` +
  `-og.jpg`. Foto baru dari pengguna dikirim lewat folder `foto-baru/` (git push).
  Foto HD 1448×1086 (11 foto Zoomlion, Sep 2026): PNG disimpan HD, .webp 1200×900 q80.
  Bila latar foto berupa pola kotak-kotak palsu, hapus dengan `pip install "rembg[cpu]"` model
  isnet-general-use (cara berbasis warna merusak velg/logo putih). PL2304: pola samar tersisa di kaca kabin.
- Logo DASS di navbar: `logo-dass.png` (transparan, tanpa kotak putih; dibuat dari `logo.png`).
  `logo.png` (gaya ikon kotak) tetap untuk favicon & schema; brosur PDF pakai `logo-dass.png`.
- Logo `assets/images/logo/z.png` (Zoomlion, tulisan hijau #8DC63F, transparan) dan
  `eavision.png` (transparan).
- Jangan mencantumkan email di HTML (anti-spam); email hanya dari config.js.
- Cache: `.htaccess` memberi `no-cache` (cek ulang ke server) untuk css/js/html/gambar/video/txt.
  Logo merek diberi `?v=2`; naikkan versinya bila file logo diganti.
- `.htaccess`: HTTPS, gzip, header keamanan, 404 → `/404.html`, blokir `tools/`, `.git`,
  `*.md`, `*.py`, `PETUNJUK.txt`. Tidak bisa diuji di sandbox — minta pengguna cek setelah upload.

## Pengujian sebelum merge
- Server lokal: `python3 -m http.server 8765` (background).
- Playwright: `executablePath: '/opt/pw-browsers/chromium'`, `NODE_PATH=$(npm root -g)`.
  Cek tiap halaman: tanpa error JS, tanpa gambar rusak, tanpa scroll horizontal di 390px,
  dan tampilan ID/EN/ZH. Ambil screenshot untuk perubahan tampilan.
- cdnjs, Google Fonts, dan googletagmanager diblokir di sandbox (error itu normal).

## Keputusan yang sudah diambil
- Menu **Kalkulator** tidak ada di navbar (halaman `kalkulator.html` tetap ada, link di
  footer). Kalkulator Pilih Traktor tampil di **semua 48 halaman produk Zoomlion**;
  kalkulator semprot di halaman drone; kotak "Cocok untuk Lahan" di halaman traktor.
- Kalkulator drone **tanpa harga/biaya** (perusahaan tidak punya tarif resmi).
- Asumsi kalkulator (drone 5 m/s, efisiensi 50%, 8 jam/hari; manual 300 L/ha, 1 ha/orang/hari;
  HP traktor ditebak dari nama model, mis. RK504 ≈ 50 HP) adalah perkiraan Claude —
  belum dicek tim teknis.
- Halaman Bandingkan: pilih kategori per merek, pilih unit lewat kartu foto, maks. 3
  unit (2 di HP), baris nama menempel saat scroll.
- Menu WA pintar: harga / konsultasi / brosur / lain + status jam kerja
  (`COMPANY.jamKerja`). **Tidak ada pilihan servis/sparepart.**
- **UPDATE 8 Okt 2026: DASS AKAN menjual sparepart & servis.** Menu navbar baru "Sparepart & Servis" (`nav.layanan`,
  EN "Parts & Service") → `sparepart-servis.html` = halaman "Segera Hadir/Coming Soon" (noindex, tidak di sitemap, CSS
  `.segera`, kunci `segera.*`). Saat layanan resmi dibuka: isi halaman, hapus noindex, tambah ke sitemap, dan baru boleh
  menulis klaim servis/sparepart di halaman lain. Sampai itu, aturan lama di bawah tetap berlaku.
- **Perusahaan TIDAK menyediakan servis/sparepart** (dikonfirmasi pengguna). Semua klaim
  servis/sparepart/purna jual sudah dihapus (beranda, landing, kontak, footer, artikel, meta).
  Penggantinya: "Distributor Resmi", "Spesifikasi Lengkap", "Tanya Cepat via WhatsApp".
  Jangan menulis klaim servis/sparepart lagi. Tips umum di artikel ("pastikan suku cadang
  mudah didapat") boleh tetap.
- Hero beranda: slide memudar TANPA zoom (pengguna tidak mau zoom), teks muncul naik, indikator bawah
  = progress bar. Slide foto 5 dtk (DURASI), slide video sepanjang videonya (`data-durasi`). Slider
  produk di halaman merek (filter-produk.js): 3 dtk, masuk dari kanan, zoom pelan. Efek sinematik
  (partikel, cahaya, vignette, buram) SUDAH DIHAPUS atas permintaan — jangan ditambah lagi. Animasi
  mati bila "reduce motion"; video tidak dimuat saat hemat data. Chromium sandbox tidak bisa H.264
  tapi BISA WebM (VP9) — uji pakai WebM.
- **Hero beranda sejak 6 Okt 2026 = 5 video promosi asli dari pengguna** (1080p, bukan AI): urutan
  hero-zoomlion-1 (animasi smart farm), hero-zoomlion-2 (cuplikan tebu/traktor), hero-eavision,
  hero-vectoragr-1, hero-vectoragr-2. Dibuat dengan `python tools/ubah-video.py foto-baru/<nama>.mp4`:
  DURASI PENUH (permintaan pengguna; MAKS_DETIK=0), fps asli, tanpa suara; WebM VP9 1920 (crf24, ±6 Mbps,
  8–22 MB) + 1280 `-hp` (crf30, ±2,2 Mbps, 3,4–8,7 MB) + MP4 cadangan (versi 1,8 & 4,5 Mbps dinilai "kurang HD";
  sumber 1080p, 4K tidak dibuat karena tidak menambah detail). Tiap slide tampil sepanjang videonya
  (`data-durasi` detik di slide, slider.js; video diputar dari awal tiap slide muncul, loop=false); sampul `hero/<nama>.webp` & `-hp.webp` (detik ke-1, karena
  awal video sering hitam). Sampul slide 1 di-preload (`<link rel=preload media=...>` + `<style>` di
  head) agar LCP cepat; slide lain `data-bg` + `data-bg-hp` (slider.js memilih versi HP ≤768px).
  Video lama (pengering, traktor, tebu, combine, VectorAgr Kling) dihapus dari assets (ada di riwayat git).
  Google Fonts dimuat tanpa menahan tampilan (`media="print" onload`) di semua halaman + generator tools.
- **Hero slide 2–5 SEMENTARA DISEMBUNYIKAN (6 Okt 2026, permintaan pengguna)**: dibungkus komentar HTML di
  index.html (slide + indikator). Hanya hero-zoomlion-1 yang tampil; slider.js mode satu slide = video `loop`,
  indikator disembunyikan. Untuk menampilkan lagi: hapus 2 pasang penanda komentar itu. File video tetap ada.
- **Hero beranda 8 Okt 2026 = 2 slide**: video hero-zoomlion-1 lalu foto `hero-zoomlion-paddy` (5 dtk, `data-bawah`;
  kalimat hero "Authorised distributor…" TETAP tampil (permintaan 8 Okt), cover + `background-position: center bottom` agar tulisan PADDY FIELD
  utuh di layar lebar). slider.js men-toggle `.hero--teks-foto`. Rice Transplanter & Baler 9YY-2200 sempat dipasang lalu
  DIHAPUS atas permintaan (versi contain = pinggir hitam di layar lebar, ditolak). Sumber foto di `foto-baru/`.
- **Gaya navbar (9 Okt, dipilih dari 20 pratinjau = gabungan no. 5+9+12+19)**: logo PUTIH (filter invert) dalam blok navy miring
  (`.header .brand::before`, clip-path) di semua halaman; menu huruf kapital renggang (.74rem, HP .9rem); menu aktif = kapsul hijau
  #25A244 teks putih; beranda (ada `.hero`) → navbar.js menambah `.header--transparan` + `body.nav-transparan` (padding-top 0):
  transparan gradasi gelap di atas video, berubah putih kaca saat di-scroll. CSS di akhir components.css.
  10 Okt: pengguna lapor "saat scroll tetap transparan" (tak bisa direproduksi di sandbox) → navbar.js membaca scroll dari
  window/html/body + event scroll di body & load; kaca saat scroll diperkuat (putih .86 + blur 18px).
- **Bing Site Scan (10 Okt)**: 119 halaman, 0 error, 0 warning.
- **Navbar (8 Okt)**: tinggi 62px (HP 58px, sebelumnya 76/68), logo 40px (HP 32px), `.header .header__inner` padding
  clamp(1.25rem, 6vw, 5rem) agar logo tidak mepet pojok. Indikator slide hero (`.hero__dots`) DISEMBUNYIKAN (permintaan).
- **Kartu produk desain baru (8 Okt)**: lencana logo merek kecil di pojok foto, foto besar di latar abu lembut, seri hanya
  tampil bila beda dari nama, kategori = chip, panah di kanan atas (CSS `a.produk-card ...` di akhir pages.css). EN kategori
  hybrid = "Hybrid Machinery".
- `--container-pad` = clamp(1.25rem, 5vw, 4.5rem) (8 Okt; layar pengguna ±1170px CSS karena skala Windows): logo navbar & isi tidak mepet kiri di laptop 1280 (keluhan pengguna).
- **Canva tersambung (8 Okt)**: akun Canva pengguna (desain "Hero Rice Transplanter/Baler - bisa diedit", id DAHXZWV8XYE &
  DAHXZQSk624). Upload ke Canva lewat `upload-asset-from-url` (raw.githubusercontent repo publik). Domain canva.com &
  export-download.canva.com DIBLOKIR jaringan sandbox → hasil export tidak bisa diunduh; pengguna download sendiri ke
  `foto-baru/` lalu push (atau izinkan domain di pengaturan Network access environment).
- Judul hero beranda (H1 "Distributor Traktor & Drone Pertanian di Jakarta") DISEMBUNYIKAN
  dari tampilan dengan `.sr-only`; kalimat "Distributor resmi Zoomlion…" TAMPIL di kiri bawah video
  (HP: juga di atas video, kiri bawah) atas permintaan pengguna (tetap di HTML untuk
  SEO/aksesibilitas; risiko kecil "teks tersembunyi" sudah dijelaskan). Jangan dihapus dari HTML.
- Hero beranda di layar ≤768px: kotak 16:9 (video utuh), kalimat + indikator di kiri bawah video.
- Navbar: putih di atas, kaca buram transparan saat di-scroll (`.header::before` + backdrop-filter).
  Jangan pasang backdrop-filter/transform di `.header` langsung — merusak menu HP (position: fixed).
- Watermark logo DASS super transparan (opacity 0,045, abu-abu) di latar seluruh halaman:
  `body::before` fixed di base.css. `.section--soft` dibuat semi-transparan agar watermark tembus.
- Brosur PDF (`brosur-pdf.js`) mengikuti bahasa aktif (BAHASA): teks tetap di `BROSUR_TEKS`,
  isi pakai tList/tSpec/tNilai/tKategori, nama file diberi akhiran `-en`/`-zh`. Huruf Mandarin
  digambar lewat canvas (fungsi `tulis`/`pecah`) karena Helvetica jsPDF tak punya huruf CJK.
  Watermark logo-dass.png opacity 0,035 di tengah halaman PDF (GState).
  Semua gambar PDF lewat `latarPutih()`: warna di area transparan diganti putih (alpha 0 → 1) supaya
  viewer PDF yang abaikan transparansi tidak menampilkan latar hitam/hijau.
  Uji: jsPDF dari npm (cdnjs diblokir) lewat page.route, PDF dibaca dengan `pip install pymupdf`.
- Foto utama di halaman detail produk tanpa kotak/latar (`.detail-media` transparan + drop-shadow);
  semua foto utama produk sudah transparan.
- Menu HP: `.nav-toggle` z-index 2 agar tombol ✕ tampil di atas panel menu.
- Beranda dibuat "lebih ramai" (6 Okt 2026, permintaan pengguna): urutan Hero → strip angka
  (merek/model/kategori dihitung dari data, + "Jakarta Kantor Pusat") → "Produk Kami" 3 panel merek (desain dari slide pengguna:
  kiri putih→hijau + judul "Agricultural Equipment" + badge Zoomlion + foto traktor dalam lingkaran, tengah EAVision
  ala banner resmi: judul HTML "EAVISION EA-J150 [2025] Agricultural Drone" (#3D4A7A) di atas langit + foto
  `hero/eavision-j150-panel.webp` (dari gambar pengguna, "Learn More" dihapus, tinggi 440px), kanan putih→kuning lembut (7 Okt, menggantikan kuning penuh #F9B812 yang "tidak menyatu"; ditolak: navy, putih→biru muda, jingga emas) logo berwarna `logo-vector.png` + auto
  steering HD818; statis di index.html, CSS `.ourproduk`) → Showcase Produk
  (menggantikan bagian Kategori & Unit Unggulan atas permintaan pengguna: tab 6 kategori, unit besar +
  4 spesifikasi + tombol Detail/WA, thumbnail unit lain; daftar di `BERANDA_SHOWCASE` beranda.js;
  halaman merek tetap mendukung `?kategori=<id>`) → Keunggulan → banner ajakan konsultasi (WA/kalkulator/
  bandingkan) → Sektor → Mitra. (Bagian "Cara Pembelian" 4 langkah DIHAPUS 7 Okt atas permintaan pengguna;
  CSS `.beli` & kunci `beli.*` masih ada tapi tidak dipakai. Artikel juga tidak tampil di beranda.)
  Latar Showcase (7 Okt) ikut merek unit yang tampil: `.showcase[data-brand]` hijau/biru muda/kuning lembut
  (diset di beranda.js); ditolak: hijau tetap, navy, hijau→biru. Tab drone: "Drone EAVision" & "Drone VectorAgr"
  (nama tab opsional = elemen ke-3 di BERANDA_SHOWCASE; drone VectorAgr ditambahkan 7 Okt).
  Mengapa Kami (beranda, `.unggul-beranda`): latar putih, ikon 4 warna (hijau/biru/kuning/teal). Sektor Layanan
  (`.sektor-beranda`, 7 Okt): latar hijau lembut, 3 kartu besar bertautan (kebun → traktor-kebun-sawit, pangan →
  combine-harvester-padi, hortikultura → jual-drone) + kalimat `sektor.N.teks`. Saran: jangan beri warna di semua
  bagian — selang-seling berwarna/putih. Kode: `assets/js/beranda.js` (`initBeranda`, juga di gantiBahasa).
- Halaman Tentang Kami didesain ulang (6 Okt 2026): TANPA hero, strip angka, dan kartu merek (dihapus atas
  permintaan pengguna). Isi: profil SATU KOLOM di tengah (`tt-profil--satu`; foto tim DIHAPUS 9 Okt atas permintaan, file foto & CSS `.tt-foto` masih ada; og:image kembali hero-tractor-og.jpg). Riwayat: sempat profil dua kolom teks kiri + FOTO TIM ASLI kanan (8 Okt, `assets/images/tentang/tim-dass-persegi.webp`; HP: label+judul dulu, lalu foto, lalu paragraf; bingkai gradasi hijau→biru, TANPA keterangan foto; sumber foto-baru/About-Us-dass-1.jpeg; og:image tim-dass-og.jpg; pengguna menolak kolase, foto+logo, foto lebar)
  → Visi (kotak kutipan gradasi) + Misi 6 kartu bernomor → Mengapa Kami (kunci `unggul.*`)
  → Kemitraan. CSS awalan `.tt-`.
- Halaman Kontak didesain ulang (6 Okt 2026): judul di tengah tanpa banner (H1 + garis hijau) → 3 kartu
  form Kirim Pesan desain A (8 Okt: kepala gradasi hijau + ikon WA, ikon di kolom, Nama|Perusahaan berdampingan, catatan jam kerja `form.catatan`, CSS `.kf`); kontak cepat 2 baris saja (label + isi; 8 Okt: status online WA & keterangan IG dihapus atas permintaan) (WhatsApp hijau,
  Instagram @dass.agriculture (menggantikan kartu Telepon atas permintaan), Email; kartu ringkas mendatar
  ikon-kiri + H1 kecil, versi besar dinilai "terlalu besar") → form "Kirim Pesan" (kiri)
  + peta & alamat/jam & tombol Google Maps/Ulasan (kanan). CSS awalan `.kt-`.
- Mode perbaikan: `perbaikan.html` (noindex) + blok "MODE PERBAIKAN" di awal `.htaccess`
  (3 baris Rewrite diberi #; hapus # untuk menutup website dengan 503). Pengguna mengaktifkannya
  langsung di File Manager Hostinger.
- **Form leads → Google Sheets (6 Okt 2026)**: `assets/js/leads.js` (dimuat main.js HANYA bila `COMPANY.leadsUrl`
  diisi): pop-up "Dapatkan Brosur & Penawaran Harga Terbaru" sekali setelah 10 dtk (8 Okt; desain A: panel kiri foto
  `assets/images/leads/lead-pq-series.webp` (potongan poster Marketing PQ Series) + logo + 3 manfaat `lead.untung1-3`, form kanan,
  eyebrow "Gratis & tanpa komitmen", tombol hijau "Kirim ke WhatsApp Saya"; persetujuan = "Saya bersedia dihubungi tim DASS
  melalui WhatsApp…" (TANPA kata data/disimpan); kalimat "tanpa spam" DIHAPUS atas permintaan) (tidak di kontak/404/perbaikan; ditutup →
  7 hari tidak muncul; sudah isi → tidak muncul lagi, localStorage `dass-lead-terkirim`) + `gerbangLead()` wajib isi
  sekali sebelum unduh brosur (brosur-pdf.js). Kolom: nama, WA, perusahaan, minat, lokasi, centang persetujuan
  (UU PDP), kolom jebakan bot `situs`. Kirim `fetch` no-cors text/plain ke Apps Script (`tools/leads-apps-script.gs`,
  dipasang di Sheet "Leads Website DASS" (URL /exec sudah di config.js, AKTIF sejak 6 Okt) id `1R1BZvf173lVX2NPnQrlQJ4CGMQOjrg7aRnNnMZslXnE` milik pengguna, tab
  "Leads"). Website TIDAK mewajibkan login (sudah dijelaskan: buruk untuk SEO). Kebijakan Privasi belum dibuat.
  **Tampilan Sheet leads (8 Okt)**: tab "Leads" diberi header hijau, baris belang, freeze, filter, kolom tambahan K "Status
  Tindak Lanjut" (dropdown berwarna: Baru/Sudah dihubungi/Kirim penawaran/Negosiasi/Deal/Tidak jadi) & L "Catatan Sales"
  (Apps Script tetap hanya menulis A–J). Tab baru "Ringkasan" (paling kiri): angka utama, minat produk, status, sumber + 2 grafik.
  Locale Sheet = Indonesia → pemisah argumen rumus `;` (bukan `,`).
  Pesan setelah kirim form (7 Okt, dipilih pengguna): "Terima kasih atas minat Anda — Permintaan Anda telah berhasil
  dikirim. Untuk respons lebih cepat, silakan hubungi kami langsung melalui WhatsApp." Jangan menyebut data/database/
  kerahasiaan (pengguna tidak mau kesan "database") maupun "data Anda sudah kami terima".
- **[DIBATALKAN 8 Okt: pop-up & halaman detail kembali normal (foto biasa, hero terang) atas permintaan pengguna]** Pop-up produk Zoomlion: foto bisa digeser kiri-kanan (7 Okt): `jalankanPutar()` di filter-produk.js, CSS `.putar*`
  (pages.css), kunci `putar.petunjuk`. Efek miring 3D ±35° (perspektif, bayangan & cahaya ikut), goyang contoh saat dibuka,
  panah keyboard, klik ganda = lurus. BUKAN 360° asli (1 foto tidak punya sisi belakang; sudah dijelaskan). EAVision/VectorAgr
  tetap foto biasa. DITOLAK: efek "kamera drone", penampil 3D .glb dengan model uji, gambar 17 sudut dari ChatGPT
  (DL2004: hasil tidak konsisten, kena limit).
- **[DIBATALKAN 8 Okt]** Gaya "studio gelap" Zoomlion (7 Okt, dipilih pengguna dari 8 contoh)**: pop-up & foto utama halaman detail produk
  Zoomlion memakai `htmlPutar()` (filter-produk.js; detail via `initPutarDetail()` di main.js): latar HIJAU GELAP (#16301a, dipilih 7 Okt; hitam & navy & terang tidak dipilih) + sorot lampu +
  podium + pantulan lantai (`.putar--gelap`, pages.css). Ditolak/tidak dipilih: podium terang, zoom kaca pembesar, chip
  spesifikasi, latar lahan CSS, lantai cermin, cincin hijau, meja putar.
- **Desain halaman detail produk (7 Okt)**: Zoomlion hero gelap DIBATALKAN 8 Okt (kembali terang seperti awal);
  semua 62 halaman: menu lompat menempel (`.detail-tab`, dibuat `buatMenuDetail()` di produk-detail.js, kunci
  `detail.tabKalk/tabLabel`), judul bagian bergaris aksen, Keunggulan = kartu bernomor 01–06. Strip "4 spesifikasi utama"
  di bawah hero DITOLAK (kepanjangan).
- **Copywriting beranda (8 Okt, versi pengguna dipasang)**: hero.desc, unggul.judul/1.teks/4.teks, cta.judul/desc,
  sektor.eyebrow/judul/1–3.teks, mitra.eyebrow/judul/desc diganti teks dari pengguna (+EN/ZH buatan Claude) di lang.js
  & HTML. Klausa "layanan purnajual berkelanjutan" di unggul.judul SENGAJA dibuang (DASS tidak menyediakan purnajual).
  Teks tampil diambil dari lang.js, bukan HTML — ingatkan pengguna bila ia mengedit HTML langsung.
- **Copywriting halaman merek (9 Okt)**: eyebrow zl "Mesin Pertanian Zoomlion", ea "Drone Sprayer Pertanian", va "Pertanian Presisi";
  hero.desc baru (zl/ea/va.hero), katalog "Temukan Unit yang Tepat" (brand.pilihKat/klikKartu); VectorAgr 9 unit. Level: layak B2B,
  BELUM ada social proof/testimoni/CTA hero (pengguna memilih pasang apa adanya; tawarkan lagi bila ada data bukti dari Marketing).
- **IndexNow (8 Okt)**: kunci `b963901221a0c688647d3d6f3d058083` (file `<kunci>.txt` di root, wajib ter-upload). Pengguna
  menjalankan `powershell -ExecutionPolicy Bypass -File tools\indexnow.ps1` (atau `node tools/indexnow.js`) dari laptop
  setelah upload: kirim semua URL sitemap.xml ke Bing/Yandex. Sandbox TIDAK bisa (api.indexnow.org diblokir). Google tidak
  mendukung IndexNow; Request Indexing Google tetap manual di Search Console (tidak ada API untuk halaman biasa).
- CAPTCHA tidak dipasang (tidak ada form yang mengirim ke server; form kontak membuka WA).

## Cara kerja dengan pengguna (pelajaran dari sesi sebelumnya)
- Untuk perubahan TAMPILAN, pengguna suka melihat **pratinjau dulu**: buat di branch, kirim screenshot
  laptop (1366) + HP (390) lewat SendUserFile, JANGAN merge sampai pengguna bilang "merge"/"gas".
  Untuk perbaikan kecil yang jelas, langsung kerjakan + merge.
- Pengguna sering menolak desain lalu minta ganti; tawarkan 3–4 pilihan (AskUserQuestion dengan
  preview) bila permintaannya kabur ("ganti yang lebih bagus").
- Desain yang SUDAH DITOLAK pengguna (jangan diusulkan lagi): hero/banner bergambar di Tentang Kami,
  strip angka & kartu merek di Tentang Kami, kolase foto / foto+3 logo / foto lebar di Tentang Kami,
  bagian Kategori kotak & Unit Unggulan kartu di beranda, artikel grid & artikel gaya majalah di beranda,
  kartu kontak besar di Kontak, foto hero dari cuplikan video HP (buram).
- Alat di sandbox (pasang bila perlu): `pip install pillow imageio-ffmpeg "rembg[cpu]" opencv-python-headless`.
  Hapus watermark video TANPA crop: inpaint OpenCV per frame hanya pada huruf (mask = persentil-10 luma
  >150 di kotak watermark + closing 11×11 + dilate 3×, `INPAINT_NS`, + butiran halus). Hasilnya rapi di
  latar acak (padi/rumput); di benda polos masih terlihat samar.
- Proses encode video panjang bisa lewat batas 10 menit: jalankan di background (parallel per video).
- Prompt gambar/video AI (ChatGPT, Gemini/Veo, Dola AI) untuk hero: 16:9, objek di tengah-kanan 50–60%
  lebar & utuh, kiri bawah kosong untuk teks, operator realistis di kabin, siang hari (BUKAN golden
  hour), kamera diam tanpa zoom, logo/tulisan unit (mis. "Z" & "RK704") wajib dipertahankan.
  Gambar hasil ChatGPT yang dipakai: `hero/hero-tractor.webp` (RK704), `hero-combine-hasverter.webp`
  (ZL145), `hero-sugarcane-hasverter.webp` (C610).

## Belum selesai / menunggu pengguna (status 6 Okt 2026)
- **ARTIKEL dari Marketing (6 Okt 2026):** artikel & berita ditulis divisi **Marketing Komunikasi**
  (iko.tbg@gmail.com) di Google Docs **"Artikel Website"** (id `1779NV9vUfaoSUkeoraAIMKRDNzk0fElBbXdISEjZaFo`,
  satu dokumen, artikel per tanggal). Konektor Google Drive tersambung. Buka HANYA dokumen yang disebut
  pengguna. Alur: review (ejaan, fakta, nama perusahaan, tanpa klaim servis/sparepart/purna jual, topik
  alat berat konstruksi tidak cocok, foto iStock tidak boleh tanpa lisensi) → rapikan → masukkan ke
  `artikel.js` + terjemahan EN/ZH → `node tools/buat-halaman-artikel.js`. Review 6 Okt: 10/10 Oksidasi Oli
  memuat nama "PT Bumi Citra Traktor Nusantara (BCTN)" + teks dobel (jangan tayang); 09/10 salah nama
  "Nusantara"; 07/10 & 22/09 klaim purna jual/suku cadang; pesan rangkuman sudah diberikan ke pengguna.
  Dokumen punya **7 tab** (nama = tanggal: 22/09, 05/10–10/10). SEMUA sudah dimasukkan (6 Okt, atas
  permintaan pengguna) setelah diperbaiki: topik "alat berat" diubah fokus ke traktor/mesin pertanian
  (panel kontrol, power steering, teknik mengendalikan traktor), BCTN & teks dobel dibuang, klaim purna
  jual dihapus, slug mengikuti Marketing bila topiknya sama. Tanpa foto. Tanggal: panel 5 Okt, sisanya
  6 Okt (jadwal Marketing 07–10 Okt tidak dipakai karena tanggal masa depan). Bila Marketing menambah
  tab baru, bandingkan dengan daftar ini.
  **Website kini HANYA berisi 7 artikel dari Marketing** (permintaan pengguna, 6 Okt). 12 artikel buatan Claude
  dihapus; alamat lamanya dialihkan 301 ke `/artikel.html` lewat `.htaccess`; foto lamanya masih ada di
  `assets/images/artikel/` (tidak dipakai). Jangan menulis artikel sendiri tanpa diminta. Daftar "Baca Juga"
  di halaman kata kunci & produk (tools/buat-halaman-landing.js) disesuaikan; halaman drone belum punya
  artikel. Tombol filter kategori disembunyikan bila hanya ada satu kategori.
- Halaman `artikel.html` (6 Okt 2026): artikel terbaru = kartu sorotan mendatar (`#artikelUtama`), sisanya
  grid 6 kolom (3 per baris; baris terakhir tak penuh dilebarkan lewat CSS nth-child), "Baca selengkapnya" +
  waktu baca (200 kata/menit). **Foto artikel opsional**: `gambar: ''` → sampul gradasi hijau→biru + logo
  putih + kategori (`.artikel-sampul`, 4 variasi warna dari id artikel; juga dipakai bila foto gagal dimuat); og:image cadangan `hero-tractor-og.jpg`. Belum dibuat: template Marketing & `tools/tambah-artikel.js`.
- **Website sudah menyala lagi (7 Okt)**: mode perbaikan dimatikan, upload terbaru sudah tayang (sitemap live berisi
  data 7 Okt). Pengingat 9 Okt sudah dihapus.
- **Search Console (7 Okt)**: sitemap.xml & sitemap-gambar.xml dikirim ulang; status masih "Tidak dapat mengambil"
  (sisa periode 503), tapi Uji URL Aktif sitemap = "URL tersedia untuk Google" → tinggal menunggu 1–2 hari.
- **On-page SEO (7 Okt)**: semua `<title>` ≤65 karakter (beranda "Distributor Traktor & Mesin Pertanian Jakarta | DASS",
  produk tanpa awalan "Jual"/akhiran "Jakarta" bila kepanjangan); beranda punya schema WebSite (+ LocalBusiness lama).
  Schema **Product SENGAJA TIDAK dipasang**: tanpa harga/ulasan Google menandainya error merah di Search Console.
  Pasang hanya bila perusahaan mau menampilkan harga.
- **Judul halaman produk (7 Okt)** = "<Merek Model>: Spesifikasi <Kategori> | DASS Jakarta" (nama model di depan, karena
  Search Console menunjukkan orang mencari "zl88", "dl2004", "rk504"); bila >65 karakter dipersingkat. DH7-6000 &
  TE100-DH = "Combine Harvester Hybrid". Nama "PT DASS" ditambahkan (alternateName schema index/kontak + paragraf
  pertama Tentang ID/EN/ZH) karena ada kueri "pt dass". Kueri teratas 28 hari: "pt diesel agri sukses sejahtera"
  77 klik/118 tayang; kueri model 0 klik (posisi masih rendah).
- **Bing Webmaster Tools (9 Okt)**: SUDAH terdaftar (impor dari GSC); 86 URL dikirim manual via URL Submission (kuota ±100/hari).
  IndexNow dari laptop sempat 403 (kunci baru di-upload) → skrip kini menampilkan pesan server; minta ulang setelah 30–60 menit.
  Rekomendasi Bing: backlink sedikit (saran: bio IG/LinkedIn/direktori), "insufficient content" (belum dicek halaman mana).
- **PageSpeed Insights (9 Okt): pengguna melapor HIJAU SEMUA.** Sebelumnya: pengguna ingin "hijau semua". Sudah dilakukan: sampul
  hero di-preload, video dimuat setelah `load`, versi HP, font tidak menahan tampilan, data artikel tidak
  lagi dimuat di beranda. Video hero kini besar (8–22 MB laptop) atas permintaan kualitas — bila
  PageSpeed buruk, jelaskan kompromi kualitas vs. kecepatan.
- Laporan lama "website crash" (2 Okt): sudah diperbaiki di PR #59 (no-cache, `?v=2`, `latarPutih()`);
  bila muncul lagi minta screenshot + apakah di tab penyamaran juga. Cache: naikkan `?v=` saat
  mengganti file gambar/video yang namanya sama.
- Pengguna pernah tidak bisa `git pull` karena ada perubahan lokal di `pages/produk/vectoragr.html`
  (Live Server/VS Code) — solusi: `git stash` lalu `git pull`.
- FAQ: jawaban pengiriman ke luar Jakarta masih netral — menunggu kebijakan perusahaan.
- Google AI Overview menampilkan alamat salah (Epiwalk, Rasuna Said) & merek salah (Shaktiman, John
  Deere) dari LinkedIn direktur (Anjar Sana Kusuma Wiwaha) — pengguna disarankan cek apakah Epiwalk
  alamat legal, perbarui LinkedIn, buat LinkedIn Company Page, laporkan ke Google. Belum ada kabar.
- **Poster Marketing (8 Okt)**: folder Drive "IMAGE" (id `1fPkvJf0AUWDzFOt5EdhbjN0RG1vdP0mI`, milik dass.marcomm) berisi ±30
  poster resmi Zoomlion 3426×1928 (logo ZOOMLION kiri atas + tulisan "<MODEL> VISION CREATES FUTURE" di bawah). File ≤6 MB bisa
  diunduh lewat konektor Drive (hasil tersimpan ke tool-results, decode base64); file ±9–11 MB gagal → minta pengguna taruh di foto-baru/.
- Ide yang ditawarkan tapi belum dikerjakan: Kebijakan Privasi (UU PDP, perlu cek legal),
  galeri pengiriman unit/testimoni (perlu foto sales), Google Merchant Center (perlu
  keputusan harga), Bing Webmaster Tools, konten artikel rutin.
- **Nama kategori versi ID sudah bahasa Indonesia (7 Okt)**: KATEGORI_TEKS.id & KATEGORI.nama → Mesin Hybrid
  (bukan "Traktor Hybrid": kategori hybrid juga berisi combine DH7-6000/TE100-DH), Traktor, Mesin Tanam Padi,
  Combine Harvester (istilah umum, dibiarkan), Mesin Panen Tebu, Mesin Pengering Gabah, Mesin Baler, Implement
  Traktor, Drone Sprayer, Drone Pertanian, Auto Steering, Robot Pertanian, Pertanian Digital. EN/ZH tetap.
- Deskripsi meta semua halaman ≤160 karakter (7 Okt; produk/*.html diedit langsung, tidak ada generatornya).
- **Klaim garansi DIHAPUS (7 Okt, permintaan pengguna)**: "Produk Bergaransi" → "Dokumen Resmi Lengkap: Unit resmi dari
  prinsipal, disertai dokumen pembelian lengkap" (beranda, Tentang, halaman kata kunci, judul jual-traktor). Jangan
  menulis klaim garansi DASS lagi (spek pabrik seperti "garansi baterai 1 tahun" EAVision boleh).
- **Halaman kata kunci (jual-*, kebun sawit, combine padi, drone sawah) dibuat tidak polos (7 Okt)**: body
  `.halaman-landing tema-hijau|tema-biru` (biru bila kategori drone; diset generator), garis tema di tiap judul,
  kartu tips bernomor bulat, kartu "Kenapa DASS" garis kiri 4 warna, katalog `.landing-katalog` latar lembut warna
  tema + sudut atas melengkung + eyebrow "Katalog Unit", ajakan WA akhir = kotak gradasi biru (`UI.ctaJudul/ctaDesc`).
- **Menu "Produk" di navbar = tombol** (7 Okt), bukan link ke Zoomlion (dulu terasa dobel dengan "Zoomlion" di
  dropdown). Laptop: hover/klik membuka daftar; HP: daftar selalu terbuka, "Produk" hanya judul. navbar.js `aturDrop`.
- Tugas pengguna: upload terbaru ke Hostinger, Search Console (kirim ulang `sitemap.xml`,
  tambah `sitemap-gambar.xml`, minta indeks `bandingkan.html`, `kamus-pertanian.html`,
  `faq.html`), aktifkan 2FA (Hostinger/GitHub/Google), UptimeRobot. Google Business Profile sudah
  terverifikasi — saran: kategori utama "Pemasok mesin pertanian", ganti foto sampul (masih foto mobil),
  tambah foto kantor/unit, balas ulasan dengan template formal singkat (tanpa menyebut panen/alat).
