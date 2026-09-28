/* =========================================
   DATA ARTIKEL & BERITA
   Tambah artikel = tambah objek di array.
   Isi: '## Judul' = sub-judul, '### Judul' = sub-sub-judul,
   '---' = garis pemisah, selain itu paragraf biasa.
   ========================================= */

const KATEGORI_ARTIKEL = [
  { id: 'tips',    nama: 'Tips & Perawatan' },
  { id: 'berita',  nama: 'Berita Perusahaan' },
  { id: 'produk',  nama: 'Info Produk' }
];

const ARTIKEL = [
  {
    id: 'cara-pilih-ban-traktor',
    kategori: 'tips',
    judul: 'Kenali Jenis-Jenis dan Cara Pilih Ban Traktor yang Tepat',
    tanggal: '2026-09-28',
    penulis: 'Tim Teknis DASS',
    gambar: 'assets/images/artikel/ban-traktor.jpg',
    ringkas: 'Pemilihan ban yang tepat dapat membantu meningkatkan daya cengkeram, dan penggunaan yang efektif.',
    metaDeskripsi: 'Temukan cara memilih ban traktor yang tepat sesuai kebutuhan lahan dan beban kerja. Ketahui jenis-jenis ban traktor dan tips memilih ban traktor.',
    keyword: ['traktor', 'traktor pertanian', 'dass agriculture', 'distributor traktor pertanian'],
    isi: [
      'Sedang membutuhkan ban traktor? Jangan salah pilih.',
      'Sebagai kendaraan berat untuk pengerjaan tanah, traktor memiliki ban besar dengan material berkualitas tinggi untuk menopang performa dan stabilitas kerja di lapangan.',
      'Pemilihan ban yang tepat dapat membantu meningkatkan daya cengkeram, dan penggunaan yang efektif. Karena itu, memahami cara pilih ban traktor adalah hal yang wajib dipahami pengguna dan pemilik traktor.',
      '## Pahami Jenis-Jenis Ban Traktor',
      'Sebelum memilih ban, penting untuk tahu apa saja jenis-jenis ban traktor dengan karakteristik dan fungsi yang berbeda.',
      '### Ban R1',
      'Tipe R1 merupakan tipe untuk ban ladang atau pertanian yang memiliki pola tapak dalam. Dilengkapi dengan lug yang kuat mencengkeram tanah, sehingga cocok di lahan kering.',
      '### Ban R2',
      'Ban R2 hadir dengan pola tapak lebih dalam karena didesain untuk area berair atau berlumpur, seperti sawah. Memiliki kelebihan yakni traksi kuat di area tanah sangat basah.',
      '### Ban R3',
      'Jenis yang satu ini disebut juga sebagai ban rumput yang cocok untuk lahan kering, seperti taman, lapangan golf, atau area dengan rumput. Traksi dengan ban ini lebih baik dan mudah saat bersentuhan pada material lepas, seperti kerikil.',
      '### Ban R4',
      'Ban R4 biasa digunakan untuk pekerjaan konstruksi ringan maupun pertanian campuran. Terdiri dari tapak lebih lebar dan kuat, cocok di berbagai permukaan keras dan lunak.',
      '## Beberapa Cara Pilih Ban Traktor',
      '### Sesuaikan dengan Jenis Area',
      'Sesuaikan pemilihan ban dengan kondisi lahan tempat traktor akan digunakan. Tiap tipe ban memiliki kegunaan dan karakteristik yang berbeda-beda. Jadi gunakan sesuai tipenya.',
      '### Perhatikan Ukuran Ban',
      'Ukuran ban traktor umumnya dalam format seperti 14.9-24, yang menunjukkan lebar ban dan diameter pelek. Anda harus tahu ukuran ban yang dibutuhkan agar memiliki keseimbangan dan traksi tetap optimal.',
      'Jika salah memilih ukuran, kekuatan daya cengkeram akan berkurang, suspensi rusak, dan konsumsi bahan bakar meningkat.',
      '### Cek Pola Tapak',
      'Pola tapak berfungsi untuk melihat bagaimana ban mampu mencengkeram medan. Tapak dalam dan tajam bisa digunakan di tanah berlumpur. Sementara tapak lebar dan rapat sesuai untuk permukaan keras.',
      '### Pilih Material Berkualitas',
      'Material ban tentu memengaruhi ketahanan penggunaan. Anda bisa memilih antara ban radial yang dikenal lebih fleksibel dan tahan panas, atau ban bias yang lebih kuat untuk area terjal, sehingga cocok untuk pekerjaan berat dengan traksi tinggi.',
      '### Bandingkan Harga dan Garansi',
      'Pilih ban dari merek terpercaya dengan garansi resmi. Bandingkan juga harga dengan fitur dan ketahanan yang ditawarkan untuk memperoleh nilai terbaik.',
      '## Kesimpulan',
      'Memilih ban traktor yang tepat bukan hanya soal harga, tapi juga kesesuaian dengan jenis lahan dan kebutuhan operasional. Dengan pemilihan ban yang tepat, traktor akan bekerja lebih efisien, tahan lama, dan aman digunakan di segala kondisi.',
      '---',
      '<strong>Butuh alat berat dengan suku cadang berkualitas?</strong> Di Diesel Agri Sukses Sejahtera semua ada.',
      'Kami merupakan distributor resmi alat berat pertanian Zoomlion yang menyediakan berbagai produk alat berat, mulai dari perawatan, suku cadang, hingga inspeksi mesin lengkap.',
      'Butuh saran? <a href="kontak.html">Hubungi kami</a>.'
    ]
  },
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