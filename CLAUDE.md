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
  tagline + alamat/WA/jam berikon hijau | Hubungi Kami (ikon + label: Email, WhatsApp, Google Maps, Instagram) | Jelajahi (jual-*) |
  Panduan (kalkulator, bandingkan, kamus, FAQ); bar bawah hanya "© tahun PT DASS" di tengah.
- `partials/navbar.txt` & `footer.txt` (isi HTML) dimuat oleh `main.js` (`{{base}}` = `data-base`).
  Sengaja `.txt`: Live Server VS Code menyisipkan script ke file `.html` dan memotong akhirnya.
- `assets/js/config.js` — data perusahaan (satu sumber: nomor, email, jam kerja, GA).
- `assets/js/data/` — `brands.js` (BRANDS, KATEGORI, ALT_KATEGORI, `PRODUK = []`),
  `produk-{zoomlion,eavision,vectoragr}.js`, `lang.js` (semua teks ID/EN/ZH),
  `artikel.js` + `artikel-terjemahan.js`.
- JS fitur: `filter-produk.js` (kartu, urlProduk, gambarKecil, altProduk),
  `produk-detail.js`, `kalkulator.js` (kalkulator drone + pilih traktor + versi mini di
  halaman produk), `bandingkan.js`, `fitur.js` (pencarian, "terakhir dilihat", tombol
  bagikan — **dimuat otomatis oleh main.js**), `brosur-pdf.js` (jsPDF dari cdnjs).
  `beranda.js` (angka, Showcase Produk), `slider.js` (hero video/foto + reveal + counter).
- `tools/` (jalankan ulang setelah mengubah data terkait):
  - `node tools/buat-halaman-artikel.js` — halaman artikel + sitemap.
  - `node tools/buat-halaman-landing.js` — halaman kata kunci + blok "Lihat Juga" di
    produk/*.html (di antara penanda `<!-- LIHAT-JUGA -->`) + sitemap.
  - `python tools/optimasi-gambar.py` — `-kecil.webp` (kartu), `-og.jpg` (pratinjau link).
  - `node tools/seo-gambar.js` — teks alt foto produk + `sitemap-gambar.xml`.
  - `python tools/ubah-video.py foto-baru/<nama>.mp4` — video hero → WebM+MP4 (HD & `-hp`) + sampul webp.

## Konvensi penting
- **3 bahasa (ID/EN/ZH)** untuk semua teks baru: kunci di `lang.js` + `data-i18n`, atau
  blok `[data-bahasa="id|en|zh"]` (ID tampil bawaan agar terbaca Google). Fungsi yang
  merender ulang saat ganti bahasa didaftarkan di `gantiBahasa()` (i18n.js).
- Pesan WhatsApp ke tim selalu bahasa Indonesia.
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
  `hero/eavision-j150-panel.webp` (dari gambar pengguna, "Learn More" dihapus, tinggi 440px), kanan kuning #F9B812 logo `logo-vector-putih.png` + auto
  steering HD818; statis di index.html, CSS `.ourproduk`) → Showcase Produk
  (menggantikan bagian Kategori & Unit Unggulan atas permintaan pengguna: tab 6 kategori, unit besar +
  4 spesifikasi + tombol Detail/WA, thumbnail unit lain; daftar di `BERANDA_SHOWCASE` beranda.js;
  halaman merek tetap mendukung `?kategori=<id>`) → Keunggulan → banner ajakan konsultasi (WA/kalkulator/
  bandingkan) → Sektor → Cara Pembelian 4 langkah (Pilih Unit → Konsultasi WA → Terima Penawaran → Proses Pembelian,
  nomor bulat hijau + garis putus-putus, tombol WA; `.beli`, kunci `beli.*`; menggantikan bagian artikel —
  artikel tidak lagi tampil di beranda atas permintaan pengguna)
  → Mitra. Kode: `assets/js/beranda.js` (`initBeranda`, juga di gantiBahasa).
- Halaman Tentang Kami didesain ulang (6 Okt 2026): TANPA hero, strip angka, dan kartu merek (dihapus atas
  permintaan pengguna). Isi: profil satu kolom di tengah TANPA foto (H1 = tt.judul + garis hijau; pengguna menolak kolase, foto+logo, dan foto lebar)
  → Visi (kotak kutipan gradasi) + Misi 6 kartu bernomor → Mengapa Kami (kunci `unggul.*`)
  → Kemitraan. CSS awalan `.tt-`.
- Halaman Kontak didesain ulang (6 Okt 2026): judul di tengah tanpa banner (H1 + garis hijau) → 3 kartu
  kontak cepat (WhatsApp hijau + status online otomatis `[data-wa-status]` dari `sedangJamKerja()`,
  Instagram @dass.agriculture (menggantikan kartu Telepon atas permintaan), Email; kartu ringkas mendatar
  ikon-kiri + H1 kecil, versi besar dinilai "terlalu besar") → form "Kirim Pesan" (kiri)
  + peta & alamat/jam & tombol Google Maps/Ulasan (kanan). CSS awalan `.kt-`.
- Mode perbaikan: `perbaikan.html` (noindex) + blok "MODE PERBAIKAN" di awal `.htaccess`
  (3 baris Rewrite diberi #; hapus # untuk menutup website dengan 503). Pengguna mengaktifkannya
  langsung di File Manager Hostinger.
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
- **Mode perbaikan mungkin masih aktif di Hostinger**: pengguna menempel 5 baris "MODE PERBAIKAN" di
  `.htaccess` server pada 6 Okt 2026 (website ditutup 503). Ada pengingat (send_later, trig_01Hj1x6NpEpd9BQGcbXMVgE7)
  9 Okt 2026 09.00 WIB untuk menyalakan lagi. Cara menyalakan: hapus 5 baris itu, atau upload ulang
  `.htaccess` dari repo. Tanyakan statusnya bila relevan.
- **PageSpeed Insights**: pengguna ingin "hijau semua"; belum mengirim hasil. Sudah dilakukan: sampul
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
- Ide yang ditawarkan tapi belum dikerjakan: Kebijakan Privasi (UU PDP, perlu cek legal),
  galeri pengiriman unit/testimoni (perlu foto sales), Google Merchant Center (perlu
  keputusan harga), Bing Webmaster Tools, konten artikel rutin, nama kategori bahasa Indonesia
  ("Tractor" → "Traktor") di tab/kartu.
- Tugas pengguna: upload terbaru ke Hostinger, Search Console (kirim ulang `sitemap.xml`,
  tambah `sitemap-gambar.xml`, minta indeks `bandingkan.html`, `kamus-pertanian.html`,
  `faq.html`), aktifkan 2FA (Hostinger/GitHub/Google), UptimeRobot. Google Business Profile sudah
  terverifikasi — saran: kategori utama "Pemasok mesin pertanian", ganti foto sampul (masih foto mobil),
  tambah foto kantor/unit, balas ulasan dengan template formal singkat (tanpa menyebut panen/alat).
