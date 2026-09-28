/* =========================================
   DATA ARTIKEL & BERITA
   Tambah artikel = tambah objek di array.
   ========================================= */

const KATEGORI_ARTIKEL = [
  { id: 'tips',    nama: 'Tips & Perawatan' },
  { id: 'berita',  nama: 'Berita Perusahaan' },
  { id: 'produk',  nama: 'Info Produk' }
];

const ARTIKEL = [
  {
    id: 'perawatan-traktor',
    kategori: 'tips',
    judul: 'Lima Perawatan Rutin Traktor yang Sering Terlewat',
    tanggal: '2026-09-01',
    penulis: 'Tim Teknis DASS',
    gambar: 'assets/images/artikel/perawatan-traktor.jpg',
    ringkas: 'Perawatan sederhana yang bisa memperpanjang usia mesin dan menekan biaya perbaikan',
    isi: [
      'Traktor yang dirawat teratur bisa bertahan jauh lebih lama daripada yang hanya diperbaiki saat rusak. Sayangnya, beberapa perawatan dasar sering terlewat karena dianggap sepele',
      'Pertama, pemeriksaan filter udara. Di lahan berdebu, filter bisa tersumbat dalam hitungan minggu. Filter kotor membuat mesin bekerja lebih berat dan konsumsi solar naik',
      'Kedua, tekanan ban. Ban yang kurang angin mempercepat keausan dan mengurangi daya tarik di lahan basah',
      'Ketiga, pelumasan titik engsel. Bagian yang bergerak perlu gemuk secara berkala agar tidak aus lebih cepat',
      'Keempat, kondisi oli hidrolik. Warna oli yang keruh menandakan sudah waktunya diganti',
      'Kelima, kebersihan radiator. Sisa jerami dan debu yang menumpuk membuat mesin cepat panas'
    ]
  },
  {
    id: 'drone-sprayer-efisiensi',
    kategori: 'produk',
    judul: 'Kapan Drone Sprayer Lebih Efisien dari Penyemprotan Manual?',
    tanggal: '2026-08-20',
    penulis: 'Tim Teknis DASS',
    gambar: 'assets/images/artikel/drone-sprayer.jpg',
    ringkas: 'Perbandingan waktu, biaya, dan cakupan antara drone dan tenaga penyemprot manual',
    isi: [
      'Drone sprayer semakin banyak dipakai di perkebunan dan lahan pangan. Tapi tidak semua kondisi cocok untuk teknologi ini',
      'Drone unggul pada lahan luas dan seragam. Semakin besar hamparannya, semakin terasa penghematan waktu dan tenaga kerjanya',
      'Pada lahan sempit yang terpisah-pisah, waktu pindah lokasi dan persiapan bisa menghabiskan keuntungan waktu terbangnya',
      'Faktor lain adalah keselamatan kerja. Penyemprotan dengan drone menjauhkan operator dari paparan langsung bahan kimia',
      'Untuk mengetahui apakah drone cocok dengan kondisi lahan Anda, tim kami siap membantu menghitungnya'
    ]
  },
  {
    id: 'distributor-resmi',
    kategori: 'berita',
    judul: 'DASS Resmi Menjadi Distributor Zoomlion, EAVision, dan VectorAgr',
    tanggal: '2026-08-05',
    penulis: 'Redaksi DASS',
    gambar: 'assets/images/artikel/distributor-resmi.jpg',
    ringkas: 'Tiga brand global kini tersedia melalui jaringan distribusi kami di Indonesia',
    isi: [
      'PT Diesel Agri Sukses Sejahtera resmi ditunjuk sebagai distributor untuk tiga brand mesin pertanian: Zoomlion, EAVision, dan VectorAgr',
      'Penunjukan ini memungkinkan kami menyediakan lini produk yang lebih lengkap, mulai dari traktor dan combine harvester hingga drone penyemprot',
      'Selain penjualan unit, kami juga menyiapkan ketersediaan sparepart asli dan layanan servis oleh teknisi terlatih',
      'Kami berkomitmen mendukung produktivitas agribisnis Indonesia melalui teknologi yang tepat guna'
    ]
  }
];