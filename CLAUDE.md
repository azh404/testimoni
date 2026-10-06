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
  `bandingkan`, `kamus-pertanian`, `faq`, `404`, 6 halaman kata kunci `jual-*`,
  `traktor-kebun-sawit`, `combine-harvester-padi`, `drone-pertanian-sawah`),
  `produk/*.html` (62 halaman detail), `artikel/*.html`, `pages/produk/<brand>.html`.
- Footer 4 kolom: Perusahaan+alamat | Hubungi Kami (ikon saja) | Jelajahi (jual-*) |
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
- `tools/` (jalankan ulang setelah mengubah data terkait):
  - `node tools/buat-halaman-artikel.js` — halaman artikel + sitemap.
  - `node tools/buat-halaman-landing.js` — halaman kata kunci + blok "Lihat Juga" di
    produk/*.html (di antara penanda `<!-- LIHAT-JUGA -->`) + sitemap.
  - `python tools/optimasi-gambar.py` — `-kecil.webp` (kartu), `-og.jpg` (pratinjau link).
  - `node tools/seo-gambar.js` — teks alt foto produk + `sitemap-gambar.xml`.

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
- Hero beranda beranimasi: foto memudar TANPA zoom (pengguna tidak mau zoom), judul/teks muncul naik saat
  dibuka, indikator bawah terisi seperti progress bar (5 detik = DURASI di slider.js).
  Slider produk di halaman merek (filter-produk.js) sama: 3 detik, masuk dari kanan, zoom pelan,
  indikator progres. Efek sinematik (partikel, cahaya, vignette, buram) SUDAH DIHAPUS atas
  permintaan pengguna — jangan ditambah lagi. Animasi mati bila perangkat "reduce motion".
  Video hero: `assets/videos/hero-*.mp4` (dari Gemini/Veo, 10 dtk, 720p, tanpa suara, dikompres
  ffmpeg crf 17 kualitas maksimal 7–13 MB: Kling 1984px asli, Gemini 720p diperbesar ke 1920×1080
  (lanczos + unsharp ringan; 720p tak bisa jadi Ultra HD sungguhan); file asli ada di riwayat git
  (commit f0b0826, 55b80a4, 83b7eda); ffmpeg dari `pip install imageio-ffmpeg`). Tiap video punya versi HP `*-hp.mp4` (1280px crf 21, 1,9–3,4 MB) yang
  dipakai otomatis di layar ≤768px (slider.js). Pasang lewat atribut
  `data-video` di `.hero__slide`; slide video juga 5 dtk (DURASI_VIDEO), foto tetap cadangan
  (hemat data / reduce motion / gagal muat). Semua 6 slide sudah video: mesin pengering (Gemini, versi ke-2
  kamera diam + truk datang), traktor (Gemini), EAVision (Gemini); pemanen tebu, combine,
  VectorAgr dari Kling 5 dtk dengan watermark "KlingAI 3.0" — dipasang apa adanya atas
  permintaan pengguna; jangan dipotong/ditutup, ganti bila ada versi bersih. Chromium sandbox tak bisa H.264 — uji
  pakai salinan .webm lewat page.route.
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
  bandingkan) → Sektor → Artikel gaya majalah "Wawasan & Berita / Kabar Terbaru dari Lapangan" (latar biru tua→hijau, 1 artikel
  besar + 3 ringkas, `.majalah`; data artikel dimuat malas saat bagian hampir terlihat)
  → Mitra. Kode: `assets/js/beranda.js` (`initBeranda`, juga di gantiBahasa).
- Halaman Tentang Kami didesain ulang (6 Okt 2026, "terlalu polos"): hero foto (`hero-zoomlion-2.webp`)
  + 2 tombol → profil + kolase 3 foto & lencana "3 Merek Global" → strip angka (`.stats`) → kartu merek
  (`#brandCards`, initProdukTabs) → Visi (kotak kutipan gradasi) + Misi 6 kartu bernomor → Mengapa Kami
  (kunci `unggul.*`) → Kemitraan. CSS awalan `.tt-`.
- Mode perbaikan: `perbaikan.html` (noindex) + blok "MODE PERBAIKAN" di awal `.htaccess`
  (3 baris Rewrite diberi #; hapus # untuk menutup website dengan 503). Pengguna mengaktifkannya
  langsung di File Manager Hostinger.
- CAPTCHA tidak dipasang (tidak ada form yang mengirim ke server; form kontak membuka WA).

## Belum selesai / menunggu pengguna
- **Status terakhir (2 Okt 2026):**
  - Pengguna melapor website "crash" setelah upload (logo Zoomlion/EAVision versi lama berlatar,
    PDF berlatar hitam/hijau). Sudah diperbaiki (PR #59: `.htaccess` no-cache, logo `?v=2`,
    `latarPutih()` di PDF). Pengguna bilang masih ada yang crash — MINTA screenshot + halaman +
    apakah di tab penyamaran juga. Bila ternyata foto produk lama dari cache, beri `?v=` pada
    semua path foto produk (data `p.gambar`, html produk, gambarKecil).
  - Pengguna akan membuat ulang 6 video hero di Gemini (prompt "Ultra HD 4K", 16:9, image-to-video
    dari `assets/images/hero/*-og.jpg`, tanpa zoom, objek di tengah/kanan, kiri bawah kosong;
    boleh ada orang kecil/jauh: operator di kabin / pilot drone jauh). Dikirim sebagai
    `foto-baru/video-1..6.mp4` (1 pengering, 2 traktor, 3 tebu, 4 combine, 5 VectorAgr, 6 EAVision).
    SUDAH SIAP: `python tools/ubah-video.py [nomor]` membuat .webm+.mp4 (HD & -hp) dan memasang
    `data-webm` + menaikkan `?v=` di index.html; slider.js memakai `<source>` webm lalu mp4.
    Tinggal jalankan saat video masuk, uji (Chromium sandbox bisa putar WebM), hapus `foto-baru/`.
    Video 1 (pengering) SUDAH diganti (5 Okt 2026): dari **Dola AI** 720p HEVC, watermark "Dola AI"
    di kanan bawah dibuang dengan crop 1152×648 dari kiri atas lalu diperbesar ke 1920×1080
    (+unsharp). Video 2–6 masih versi lama (3 Kling bertanda air). Pengguna sudah diingatkan
    agar memastikan aturan Dola mengizinkan pemakaian komersial tanpa watermark.
  - 9 foto Zoomlion HD baru (combine F6/H7/H8/ZL88/ZL105/ZL125/ZL145, G630, C600) dipasang
    5 Okt 2026; latar kotak-kotak dihapus rembg isnet-general-use.
  - PageSpeed Insights: pengguna akan kirim screenshot hasil Mobile/Desktop untuk dioptimasi
    (perkiraan: video besar, navbar/footer via JS, Google Fonts, GA).
- FAQ: jawaban pengiriman ke luar Jakarta masih netral — menunggu kebijakan perusahaan.
- Ide yang ditawarkan tapi belum dikerjakan: Kebijakan Privasi (UU PDP, perlu cek legal),
  galeri pengiriman unit/testimoni (perlu foto sales), Google Merchant Center (perlu
  keputusan harga), Bing Webmaster Tools, konten artikel rutin.
- Tugas pengguna: upload terbaru ke Hostinger, Search Console (kirim ulang `sitemap.xml`,
  tambah `sitemap-gambar.xml`, minta indeks `bandingkan.html`, `kamus-pertanian.html`,
  `faq.html`), aktifkan 2FA (Hostinger/GitHub/Google), UptimeRobot. GBP sudah dibuat — saran: kategori
  utama "Pemasok mesin pertanian", ganti foto sampul (masih foto mobil), tambah foto kantor/unit.
