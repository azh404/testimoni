/* =========================================
   DATA BRAND & KATEGORI
   ========================================= */
const BRANDS = [
  {
    id: 'zoomlion',
    nama: 'Zoomlion',
    logo: 'assets/images/logo/z.png?v=2',
    deskripsi: {
      id: 'Alat berat dan mesin pertanian berskala global',
      en: 'Global-scale heavy and agricultural machinery',
      zh: '全球规模的重型农业机械'
    },
    halaman: 'pages/produk/zoomlion.html'
  },
  {
    id: 'eavision',
    nama: 'EAVision',
    logo: 'assets/images/logo/eavision.png?v=2',
    deskripsi: {
      id: 'Teknologi drone penyemprot pertanian presisi',
      en: 'Precision agricultural sprayer drone technology',
      zh: '精准农业植保无人机技术'
    },
    halaman: 'pages/produk/eavision.html'
  },
  {
    id: 'vectoragr',
    nama: 'VectorAgr',
    logo: 'assets/images/logo/logo-vector.png?v=2',
    deskripsi: {
      id: 'Drone pertanian untuk penyemprotan presisi',
      en: 'Agricultural drones for precision spraying',
      zh: '用于精准喷洒的农业无人机'
    },
    halaman: 'pages/produk/vectoragr.html'
  }
];

/* =========================================
   KATEGORI PER BRAND
   ========================================= */
const KATEGORI = {
  zoomlion: [
    { id: 'hybrid',     nama: 'Mesin Hybrid' },
    { id: 'tractor',    nama: 'Traktor' },
    { id: 'planter',    nama: 'Mesin Tanam Padi' },
    { id: 'harvester',  nama: 'Combine Harvester' },
    { id: 'sugarcane',  nama: 'Mesin Panen Tebu' },
    { id: 'dryer',      nama: 'Mesin Pengering Gabah' },
    { id: 'baler',      nama: 'Mesin Baler' },
    { id: 'implement',  nama: 'Implement Traktor' }
  ],
  eavision: [
    { id: 'sprayer-drone', nama: 'Drone Sprayer' }
  ],
  vectoragr: [
    { id: 'va-drone',    nama: 'Drone Pertanian' },
    { id: 'va-steering', nama: 'Auto Steering' },
    { id: 'va-rover',    nama: 'Robot Pertanian' },
    { id: 'va-digital',  nama: 'Pertanian Digital' }
  ]
};

const KATEGORI_ZOOMLION = KATEGORI.zoomlion;

/* Jenis unit dalam bahasa Indonesia untuk teks alt gambar
   (mis. "Traktor Zoomlion RK504"), supaya foto mudah ditemukan di Google Gambar */
const ALT_KATEGORI = {
  'hybrid':        'Traktor Hybrid',
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

/* =========================================
   WADAH PRODUK
   Diisi oleh file produk-*.js
   ========================================= */
const PRODUK = [];