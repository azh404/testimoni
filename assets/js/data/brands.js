/* =========================================
   DATA BRAND & KATEGORI
   ========================================= */
const BRANDS = [
  {
    id: 'zoomlion',
    nama: 'Zoomlion',
    logo: 'assets/images/logo/z.png',
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
    logo: 'assets/images/logo/eavision.png',
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
    logo: 'assets/images/logo/logo-vector.png',
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
    { id: 'hybrid',     nama: 'Hybrid Product' },
    { id: 'tractor',    nama: 'Tractor' },
    { id: 'planter',    nama: 'Rice Transplanter' },
    { id: 'harvester',  nama: 'Combine Harvester' },
    { id: 'sugarcane',  nama: 'Sugarcane Harvester' },
    { id: 'dryer',      nama: 'Dryer' },
    { id: 'baler',      nama: 'Baler' },
    { id: 'implement',  nama: 'Implement' }
  ],
  eavision: [
    { id: 'sprayer-drone', nama: 'Agricultural Sprayer Drone' }
  ],
  vectoragr: [
    { id: 'va-drone',    nama: 'Agricultural Drone' },
    { id: 'va-steering', nama: 'Auto Steering System' },
    { id: 'va-rover',    nama: 'Agricultural Rover' },
    { id: 'va-digital',  nama: 'Digital Ag Solution' }
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