/* =========================================
   PEMBUAT HALAMAN KATA KUNCI (SEO)
   Membuat halaman seperti jual-traktor-jakarta.html untuk
   pencarian Google "jual traktor jakarta", dsb. Daftar produk
   diambil dari data produk, jadi selalu sesuai katalog.

   Jalankan dari folder utama website:
     node tools/buat-halaman-landing.js
   ========================================= */

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT   = path.join(__dirname, '..');
const DOMAIN = 'https://dass.co.id';
const BAHASA = ['id', 'en', 'zh'];

/* --- Baca data --- */
const ctx = { PRODUK: [], window: {} };
vm.createContext(ctx);
for (const f of ['config.js', 'data/brands.js', 'data/produk-zoomlion.js', 'data/produk-eavision.js',
                 'data/produk-vectoragr.js', 'data/lang.js', 'data/artikel.js', 'data/artikel-terjemahan.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/js', f), 'utf8').replace(/^(const|let) /mg, 'var '), ctx);
}
const { COMPANY, BRANDS, PRODUK, KATEGORI_TEKS, ALT_KATEGORI, ARTIKEL, ARTIKEL_TERJEMAHAN } = ctx;
const TELEPON = COMPANY.telepon;

/* =========================================
   TEKS ANTARMUKA
   ========================================= */
const UI = {
  id: { faq: 'Pertanyaan yang Sering Diajukan', artikel: 'Baca Juga', semua: 'Lihat semua produk', terkait: 'Lihat Juga', kalk: 'Kalkulator Semprot Drone & Pilih Traktor' },
  en: { faq: 'Frequently Asked Questions',       artikel: 'Read Also', semua: 'View all products', terkait: 'See Also', kalk: 'Drone Spraying & Tractor Selection Calculator' },
  zh: { faq: '常见问题',                          artikel: '延伸阅读',  semua: '查看全部产品',        terkait: '另请参阅', kalk: '无人机喷洒与拖拉机选型计算器' }
};

/* Keunggulan yang sama untuk semua halaman */
const KEUNGGULAN = {
  id: [
    ['Distributor Resmi', 'Unit resmi dari prinsipal, disertai dokumen pembelian lengkap.'],
    ['Spesifikasi Lengkap', 'Data teknis, brosur PDF, dan fitur bandingkan unit tersedia langsung di website.'],
    ['Tanya Cepat via WhatsApp', 'Tanya harga, minta brosur, atau konsultasi langsung dengan tim kami.'],
    ['Konsultasi Teknis', 'Kami bantu menentukan unit yang sesuai luas lahan dan jenis pekerjaan.']
  ],
  en: [
    ['Authorised Distributor', 'Genuine units from the principal, with complete purchase documents.'],
    ['Full Specifications', 'Technical data, PDF brochures, and a unit comparison tool right on our website.'],
    ['Quick Answers on WhatsApp', 'Ask for prices, request a brochure, or talk directly with our team.'],
    ['Technical Consultation', 'We help you choose the unit that fits your land and type of work.']
  ],
  zh: [
    ['授权经销商', '原厂正品，附完整购买文件。'],
    ['参数齐全', '网站直接提供技术参数、PDF 宣传册和机型对比功能。'],
    ['WhatsApp 快速咨询', '询价、索取宣传册或直接与我们的团队沟通。'],
    ['技术咨询', '帮助您根据土地面积和作业类型选择合适的机型。']
  ]
};

/* =========================================
   HALAMAN
   ========================================= */
const HALAMAN = [
  {
    file: 'jual-traktor-jakarta.html',
    kategori: ['tractor', 'hybrid', 'implement'],
    brand: 'pages/produk/zoomlion.html',
    gambar: 'assets/images/hero/hero-tractor-og.jpg',
    artikel: ['cara-pilih-ban-traktor', 'cara-ganti-oli-traktor-yang-benar-dan-hemat-biaya', 'traktor-sering-selip-ini-cara-pakai-differential-lock', 'keunggulan-hydraulic-power-steering-traktor'],
    waPesan: 'Halo, saya ingin menanyakan harga traktor Zoomlion.',
    keyword: 'jual traktor jakarta, traktor jakarta, harga traktor, traktor zoomlion, dealer traktor jakarta, traktor sawah, traktor hybrid',
    id: {
      judulTab: 'Jual Traktor Jakarta | Traktor Zoomlion Resmi | DASS',
      desk: 'Jual traktor di Jakarta: traktor roda empat dan traktor hybrid Zoomlion berbagai kelas tenaga, lengkap dengan implement dan konsultasi pemilihan unit.',
      h1: 'Jual Traktor di Jakarta',
      sub: 'Traktor roda empat dan traktor hybrid Zoomlion, langsung dari distributor resmi di Jakarta Timur.',
      intro: [
        'Mencari traktor di Jakarta? PT Diesel Agri Sukses Sejahtera (DASS) adalah distributor resmi traktor Zoomlion yang berlokasi di Cakung, Jakarta Timur. Kami menyediakan traktor untuk sawah, perkebunan, dan lahan kering, dari kelas kecil hingga traktor hybrid bertenaga besar.',
        'Tim kami memberikan konsultasi teknis dan brosur lengkap untuk membantu Anda memilih traktor yang sesuai luas lahan dan jenis pekerjaan.'
      ],
      kenapa: 'Kenapa Membeli Traktor di DASS?',
      produk: 'Pilihan Traktor Zoomlion',
      faq: [
        ['Di mana tempat membeli traktor di Jakarta?', `Anda bisa membeli traktor Zoomlion di PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, Jakarta Timur. Hubungi kami lewat WhatsApp ${TELEPON} untuk konsultasi dan penawaran harga.`],
        ['Berapa harga traktor Zoomlion?', 'Harga traktor tergantung model, kelas tenaga, dan implement yang dipilih. Hubungi tim kami untuk mendapatkan penawaran harga terbaru.'],
        ['Traktor apa yang cocok untuk sawah?', 'Pilih traktor dengan tenaga dan ukuran yang sesuai luas sawah, serta ban yang cocok untuk lahan berlumpur. Tim kami siap membantu memilih unit yang tepat.'],
      ],
      cta: 'Tanya Harga Traktor via WhatsApp'
    },
    en: {
      h1: 'Tractors for Sale in Jakarta',
      sub: 'Zoomlion four-wheel and hybrid tractors, direct from the authorised distributor in East Jakarta.',
      intro: [
        'Looking for a tractor in Jakarta? PT Diesel Agri Sukses Sejahtera (DASS) is the authorised Zoomlion tractor distributor based in Cakung, East Jakarta. We supply tractors for rice fields, plantations, and dryland farming, from compact models to high-powered hybrid tractors.',
        'Our team provides technical advice and full brochures to help you choose the right tractor for your land and type of work.'
      ],
      kenapa: 'Why Buy a Tractor from DASS?',
      produk: 'Zoomlion Tractor Range',
      faq: [
        ['Where can I buy a tractor in Jakarta?', `You can buy Zoomlion tractors from PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, East Jakarta. Contact us on WhatsApp ${TELEPON} for advice and a quotation.`],
        ['How much does a Zoomlion tractor cost?', 'The price depends on the model, power class, and implements you choose. Contact our team for the latest quotation.'],
        ['Which tractor is best for rice fields?', 'Choose a tractor whose power and size match your field area, with tyres suited to muddy ground. Our team can help you choose the right unit.'],
      ],
      cta: 'Ask for Tractor Prices on WhatsApp'
    },
    zh: {
      h1: '雅加达拖拉机销售',
      sub: '中联重科四轮拖拉机和混合动力拖拉机，由东雅加达授权经销商直接供应。',
      intro: [
        '在雅加达寻找拖拉机？PT Diesel Agri Sukses Sejahtera（DASS）是中联重科拖拉机的授权经销商，位于东雅加达Cakung。我们提供适用于水田、种植园和旱地的拖拉机，从小型机型到大马力混合动力拖拉机一应俱全。',
        '我们的团队提供技术咨询和完整宣传册，帮助您根据土地面积和作业类型选择合适的机型。'
      ],
      kenapa: '为什么选择在DASS购买拖拉机？',
      produk: '中联重科拖拉机系列',
      faq: [
        ['在雅加达哪里可以买到拖拉机？', `您可以在PT Diesel Agri Sukses Sejahtera购买中联重科拖拉机，地址：东雅加达Cakung Timur，Jalan River Garden Boulevard No. 19B。如需咨询和报价，请通过WhatsApp ${TELEPON}联系我们。`],
        ['中联重科拖拉机多少钱？', '价格取决于型号、功率等级和所选农具。请联系我们的团队获取最新报价。'],
        ['哪种拖拉机适合水田？', '请选择功率和尺寸与田块面积相匹配、并配备适合泥地轮胎的拖拉机。我们的团队可以帮助您选择合适的机型。'],
      ],
      cta: '通过WhatsApp咨询拖拉机价格'
    }
  },
  {
    file: 'jual-drone-pertanian-jakarta.html',
    kategori: ['sprayer-drone', 'va-drone'],
    brand: 'pages/produk/eavision.html',
    gambar: 'assets/images/hero/hero-eavision-og.jpg',
    artikel: [],
    waPesan: 'Halo, saya ingin menanyakan harga drone pertanian.',
    keyword: 'jual drone pertanian jakarta, drone pertanian jakarta, drone sprayer, harga drone pertanian, drone penyemprot, drone eavision, drone vectoragr',
    id: {
      judulTab: 'Jual Drone Pertanian Jakarta | EAVision & VectorAgr Resmi | DASS',
      desk: 'Jual drone pertanian di Jakarta: drone sprayer EAVision dan VectorAgr untuk semprot, tebar pupuk, dan benih. Langsung dari distributor resmi.',
      h1: 'Jual Drone Pertanian di Jakarta',
      sub: 'Drone sprayer EAVision dan VectorAgr untuk penyemprotan, penebaran pupuk, dan tabur benih.',
      intro: [
        'Mencari drone pertanian di Jakarta? PT Diesel Agri Sukses Sejahtera (DASS) adalah distributor resmi drone EAVision dan VectorAgr di Cakung, Jakarta Timur. Kami menyediakan drone sprayer untuk sawah, perkebunan sawit dan tebu, hingga kebun di lahan berbukit.',
        'Banyak drone kami juga bisa dipakai untuk menebar pupuk granul dan benih, sehingga satu unit bisa bekerja sepanjang musim tanam.'
      ],
      kenapa: 'Kenapa Membeli Drone Pertanian di DASS?',
      produk: 'Pilihan Drone Pertanian',
      faq: [
        ['Di mana membeli drone pertanian di Jakarta?', `Anda bisa membeli drone EAVision dan VectorAgr di PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, Jakarta Timur. Hubungi kami lewat WhatsApp ${TELEPON}.`],
        ['Berapa harga drone pertanian?', 'Harga drone tergantung model dan kapasitasnya. Hubungi tim kami untuk mendapatkan penawaran harga terbaru.'],
        ['Apakah drone bisa dipakai untuk menebar pupuk dan benih?', 'Bisa. Drone seperti EAVision J150, J100, dan J70 dilengkapi sistem tebar untuk pupuk granul dan benih.'],
      ],
      cta: 'Tanya Harga Drone via WhatsApp'
    },
    en: {
      h1: 'Agricultural Drones for Sale in Jakarta',
      sub: 'EAVision and VectorAgr spray drones for spraying, fertiliser spreading, and seeding.',
      intro: [
        'Looking for an agricultural drone in Jakarta? PT Diesel Agri Sukses Sejahtera (DASS) is the authorised EAVision and VectorAgr drone distributor in Cakung, East Jakarta. We supply spray drones for rice fields, oil palm and sugarcane plantations, and hillside orchards.',
        'Many of our drones can also spread granular fertiliser and seed, so one unit can work throughout the growing season.'
      ],
      kenapa: 'Why Buy an Agricultural Drone from DASS?',
      produk: 'Agricultural Drone Range',
      faq: [
        ['Where can I buy an agricultural drone in Jakarta?', `You can buy EAVision and VectorAgr drones from PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, East Jakarta. Contact us on WhatsApp ${TELEPON}.`],
        ['How much does an agricultural drone cost?', 'The price depends on the model and capacity. Contact our team for the latest quotation.'],
        ['Can drones spread fertiliser and seed?', 'Yes. Drones such as the EAVision J150, J100, and J70 have spreading systems for granular fertiliser and seed.'],
      ],
      cta: 'Ask for Drone Prices on WhatsApp'
    },
    zh: {
      h1: '雅加达农业无人机销售',
      sub: 'EAVision与VectorAgr植保无人机，可用于喷洒、撒肥和播种。',
      intro: [
        '在雅加达寻找农业无人机？PT Diesel Agri Sukses Sejahtera（DASS）是EAVision和VectorAgr无人机的授权经销商，位于东雅加达Cakung。我们提供适用于稻田、油棕和甘蔗种植园以及山地果园的植保无人机。',
        '我们的许多无人机还可以撒播颗粒肥和种子，一台机器即可在整个种植季发挥作用。'
      ],
      kenapa: '为什么选择在DASS购买农业无人机？',
      produk: '农业无人机系列',
      faq: [
        ['在雅加达哪里可以买到农业无人机？', `您可以在PT Diesel Agri Sukses Sejahtera购买EAVision和VectorAgr无人机，地址：东雅加达Cakung Timur，Jalan River Garden Boulevard No. 19B。请通过WhatsApp ${TELEPON}联系我们。`],
        ['农业无人机多少钱？', '价格取决于型号和容量。请联系我们的团队获取最新报价。'],
        ['无人机可以撒肥和播种吗？', '可以。EAVision J150、J100和J70等无人机配备撒播系统，可撒播颗粒肥和种子。'],
      ],
      cta: '通过WhatsApp咨询无人机价格'
    }
  },
  {
    file: 'jual-mesin-pertanian-jakarta.html',
    kategori: ['harvester', 'planter', 'sugarcane', 'dryer', 'baler'],
    brand: 'pages/produk/zoomlion.html',
    gambar: 'assets/images/hero/hero-combine-hasverter-og.jpg',
    artikel: ['waspada-oksidasi-oli-pada-mesin-pertanian', 'cara-ganti-oli-traktor-yang-benar-dan-hemat-biaya'],
    waPesan: 'Halo, saya ingin menanyakan harga mesin pertanian Zoomlion.',
    keyword: 'jual mesin pertanian jakarta, alat mesin pertanian, combine harvester, rice transplanter, mesin pengering gabah, mesin panen tebu, alsintan',
    id: {
      judulTab: 'Jual Mesin Pertanian Jakarta | Combine Harvester, Dryer & Lainnya | DASS',
      desk: 'Jual mesin pertanian di Jakarta: combine harvester, rice transplanter, mesin panen tebu, mesin pengering gabah, dan baler Zoomlion. Distributor resmi.',
      h1: 'Jual Mesin Pertanian di Jakarta',
      sub: 'Combine harvester, rice transplanter, mesin panen tebu, mesin pengering gabah, dan baler Zoomlion.',
      intro: [
        'PT Diesel Agri Sukses Sejahtera (DASS) menyediakan mesin pertanian Zoomlion untuk setiap tahap budidaya, dari tanam, panen, hingga pascapanen. Kantor kami berada di Cakung, Jakarta Timur.',
        'Mulai dari rice transplanter untuk tanam padi, combine harvester untuk panen, mesin panen tebu untuk perkebunan, hingga mesin pengering gabah dan baler jerami, semuanya langsung dari distributor resmi.'
      ],
      kenapa: 'Kenapa Membeli Mesin Pertanian di DASS?',
      produk: 'Pilihan Mesin Pertanian Zoomlion',
      faq: [
        ['Di mana membeli mesin pertanian di Jakarta?', `Anda bisa membeli mesin pertanian Zoomlion di PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, Jakarta Timur. Hubungi kami lewat WhatsApp ${TELEPON}.`],
        ['Berapa harga combine harvester dan mesin pertanian lainnya?', 'Harga tergantung jenis mesin, model, dan kapasitasnya. Hubungi tim kami untuk mendapatkan penawaran harga terbaru.'],
        ['Mesin apa yang cocok untuk lahan saya?', 'Pilihan mesin tergantung luas lahan, jenis tanaman, dan kebutuhan di setiap tahap. Tim kami siap membantu menghitung kebutuhan Anda.'],
      ],
      cta: 'Tanya Harga Mesin Pertanian via WhatsApp'
    },
    en: {
      h1: 'Agricultural Machinery for Sale in Jakarta',
      sub: 'Zoomlion combine harvesters, rice transplanters, sugarcane harvesters, grain dryers, and balers.',
      intro: [
        'PT Diesel Agri Sukses Sejahtera (DASS) supplies Zoomlion agricultural machinery for every stage of cultivation, from planting and harvesting to post-harvest. Our office is in Cakung, East Jakarta.',
        'From rice transplanters for planting, combine harvesters for harvesting, and sugarcane harvesters for plantations to grain dryers and straw balers, all direct from the authorised distributor.'
      ],
      kenapa: 'Why Buy Agricultural Machinery from DASS?',
      produk: 'Zoomlion Agricultural Machinery Range',
      faq: [
        ['Where can I buy agricultural machinery in Jakarta?', `You can buy Zoomlion agricultural machinery from PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, East Jakarta. Contact us on WhatsApp ${TELEPON}.`],
        ['How much do combine harvesters and other machines cost?', 'The price depends on the type of machine, model, and capacity. Contact our team for the latest quotation.'],
        ['Which machine suits my land?', 'The right machine depends on your land area, crop type, and needs at each stage. Our team can help calculate what you need.'],
      ],
      cta: 'Ask for Machinery Prices on WhatsApp'
    },
    zh: {
      h1: '雅加达农业机械销售',
      sub: '中联重科联合收割机、插秧机、甘蔗收获机、谷物烘干机和打捆机。',
      intro: [
        'PT Diesel Agri Sukses Sejahtera（DASS）提供覆盖种植、收获到产后各环节的中联重科农业机械。我们的办公室位于东雅加达Cakung。',
        '从用于水稻栽插的插秧机、用于收获的联合收割机、用于种植园的甘蔗收获机，到谷物烘干机和秸秆打捆机，全部由授权经销商直接供应。'
      ],
      kenapa: '为什么选择在DASS购买农业机械？',
      produk: '中联重科农业机械系列',
      faq: [
        ['在雅加达哪里可以买到农业机械？', `您可以在PT Diesel Agri Sukses Sejahtera购买中联重科农业机械，地址：东雅加达Cakung Timur，Jalan River Garden Boulevard No. 19B。请通过WhatsApp ${TELEPON}联系我们。`],
        ['联合收割机等农机多少钱？', '价格取决于机器类型、型号和产能。请联系我们的团队获取最新报价。'],
        ['哪种机器适合我的土地？', '合适的机器取决于土地面积、作物种类以及各环节的需求。我们的团队可以帮助您测算。'],
      ],
      cta: '通过WhatsApp咨询农机价格'
    }
  },

  /* ------------------------------------------------------------ */
  {
    file: 'traktor-kebun-sawit.html',
    kategori: ['tractor', 'implement', 'va-steering'],
    brand: 'pages/produk/zoomlion.html',
    gambar: 'assets/images/hero/hero-tractor-og.jpg',
    artikel: ['traktor-sering-selip-ini-cara-pakai-differential-lock', 'keunggulan-hydraulic-power-steering-traktor', 'cara-pilih-ban-traktor', 'teknik-mengendalikan-traktor'],
    waPesan: 'Halo, saya ingin konsultasi traktor untuk kebun sawit.',
    keyword: 'traktor kebun sawit, traktor sawit, traktor perkebunan, traktor 4wd, auto steering traktor, traktor zoomlion',
    id: {
      judulTab: 'Traktor untuk Kebun Sawit | Traktor Zoomlion & Auto Steering | DASS',
      desk: 'Panduan memilih traktor untuk kebun sawit: tenaga, penggerak 4WD, ban, dan auto steering. Tersedia traktor Zoomlion dan auto steering VectorAgr di DASS Jakarta.',
      h1: 'Traktor untuk Kebun Sawit',
      sub: 'Traktor Zoomlion dan sistem auto steering VectorAgr untuk pekerjaan di perkebunan kelapa sawit.',
      intro: [
        'Traktor adalah tulang punggung mekanisasi kebun sawit. Traktor dipakai untuk menyiapkan lahan saat peremajaan (replanting), menarik trailer pengangkut tandan buah segar (TBS), merawat jalan kebun, hingga menarik alat penyemprot dan penabur pupuk.',
        'Kebun sawit umumnya luas, sering berlumpur, dan berkontur, sehingga traktornya perlu dipilih dengan cermat. PT Diesel Agri Sukses Sejahtera (DASS) siap membantu memilih traktor Zoomlion yang sesuai kebutuhan kebun Anda.'
      ],
      panduan: 'Yang Perlu Diperhatikan Saat Memilih Traktor untuk Sawit',
      poin: [
        ['Penggerak 4WD', 'Penggerak empat roda memberi traksi lebih baik di jalan kebun yang licin dan berlumpur, terutama saat musim hujan.'],
        ['Kelas tenaga yang sesuai', 'Menarik trailer TBS bermuatan penuh atau mengolah lahan replanting membutuhkan tenaga lebih besar dibanding pekerjaan perawatan ringan.'],
        ['Ban dan jarak ke tanah', 'Pilih ban yang sesuai kondisi tanah dan jarak bebas ke tanah yang cukup agar traktor tidak mudah tersangkut di lahan berlumpur.'],
        ['Auto steering', 'Sistem kemudi otomatis membantu traktor bekerja lurus dan presisi, mengurangi tumpang tindih saat pengolahan lahan dan pemupukan.']
      ],
      kenapa: 'Kenapa Membeli Traktor di DASS?',
      produk: 'Traktor & Auto Steering untuk Perkebunan',
      faq: [
        ['Berapa HP traktor yang cocok untuk kebun sawit?', 'Tergantung pekerjaan utamanya. Perawatan jalan dan penyemprotan bisa memakai traktor kelas menengah, sedangkan menarik trailer TBS bermuatan berat dan mengolah lahan replanting membutuhkan traktor bertenaga lebih besar. Tim kami siap membantu menghitungnya.'],
        ['Apakah traktor bisa dipasangi auto steering?', 'Bisa. Sistem auto steering VectorAgr seperti HD812 kompatibel dengan traktor, combine harvester, dan sprayer dari berbagai merek.'],
        ['Di mana membeli traktor untuk kebun sawit?', `Di PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, Jakarta Timur. Hubungi kami lewat WhatsApp ${TELEPON} untuk konsultasi.`],
      ],
      cta: 'Konsultasi Traktor Sawit via WhatsApp'
    },
    en: {
      h1: 'Tractors for Oil Palm Plantations',
      sub: 'Zoomlion tractors and VectorAgr auto steering systems for oil palm plantation work.',
      intro: [
        'Tractors are the backbone of oil palm mechanisation. They are used to prepare land during replanting, pull trailers carrying fresh fruit bunches (FFB), maintain estate roads, and tow sprayers and fertiliser spreaders.',
        'Oil palm estates are usually large, often muddy, and hilly, so tractors must be chosen carefully. PT Diesel Agri Sukses Sejahtera (DASS) can help you choose the right Zoomlion tractor for your estate.'
      ],
      panduan: 'What to Consider When Choosing a Tractor for Oil Palm',
      poin: [
        ['Four-Wheel Drive', 'Four-wheel drive gives better traction on slippery, muddy estate roads, especially in the rainy season.'],
        ['The Right Power Class', 'Pulling fully loaded FFB trailers or preparing replanting land needs more power than light maintenance work.'],
        ['Tyres and Ground Clearance', 'Choose tyres suited to the soil and enough ground clearance so the tractor does not get stuck in muddy ground.'],
        ['Auto Steering', 'Automatic steering keeps the tractor working straight and precisely, reducing overlaps during land preparation and fertilising.']
      ],
      kenapa: 'Why Buy a Tractor from DASS?',
      produk: 'Tractors & Auto Steering for Plantations',
      faq: [
        ['What horsepower tractor suits an oil palm estate?', 'It depends on the main job. Road maintenance and spraying can use a mid-range tractor, while pulling heavy FFB trailers and preparing replanting land need a more powerful tractor. Our team can help you work it out.'],
        ['Can tractors be fitted with auto steering?', 'Yes. VectorAgr auto steering systems such as the HD812 are compatible with tractors, combine harvesters, and sprayers from many brands.'],
        ['Where can I buy a tractor for an oil palm estate?', `From PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, East Jakarta. Contact us on WhatsApp ${TELEPON} for advice.`],
      ],
      cta: 'Ask About Oil Palm Tractors on WhatsApp'
    },
    zh: {
      h1: '油棕种植园拖拉机',
      sub: '适用于油棕种植园作业的中联重科拖拉机和VectorAgr自动驾驶系统。',
      intro: [
        '拖拉机是油棕种植园机械化的核心装备，可用于翻种（重新种植）时的整地、牵引运输鲜果串（FFB）的拖车、维护园区道路，以及牵引喷雾机和撒肥机。',
        '油棕种植园通常面积大、道路泥泞且地形起伏，因此需要谨慎选择拖拉机。PT Diesel Agri Sukses Sejahtera（DASS）可帮助您选择适合种植园的中联重科拖拉机。'
      ],
      panduan: '为油棕园选择拖拉机的注意事项',
      poin: [
        ['四轮驱动', '四轮驱动在湿滑泥泞的园区道路上牵引力更好，雨季尤为明显。'],
        ['合适的功率等级', '牵引满载鲜果串拖车或翻种整地，比轻度管护作业需要更大的功率。'],
        ['轮胎与离地间隙', '选择适合土壤条件的轮胎和足够的离地间隙，避免拖拉机陷入泥地。'],
        ['自动驾驶', '自动驾驶系统让拖拉机作业笔直精准，减少整地和施肥时的重叠。']
      ],
      kenapa: '为什么选择在DASS购买拖拉机？',
      produk: '适用于种植园的拖拉机与自动驾驶',
      faq: [
        ['油棕园适合多大马力的拖拉机？', '取决于主要作业。道路维护和喷洒可使用中等功率拖拉机，而牵引重载鲜果串拖车和翻种整地则需要更大功率的拖拉机。我们的团队可以帮助您测算。'],
        ['拖拉机可以加装自动驾驶吗？', '可以。VectorAgr HD812等自动驾驶系统兼容多个品牌的拖拉机、联合收割机和喷雾机。'],
        ['在哪里可以买到油棕园拖拉机？', `PT Diesel Agri Sukses Sejahtera，地址：东雅加达Cakung Timur，Jalan River Garden Boulevard No. 19B。请通过WhatsApp ${TELEPON}咨询。`],
      ],
      cta: '通过WhatsApp咨询油棕园拖拉机'
    }
  },

  /* ------------------------------------------------------------ */
  {
    file: 'combine-harvester-padi.html',
    produkId: ['zl-zl88', 'zl-zl105', 'zl-zl125', 'zl-zl145'],
    brand: 'pages/produk/zoomlion.html',
    gambar: 'assets/images/hero/hero-combine-hasverter-og.jpg',
    artikel: ['waspada-oksidasi-oli-pada-mesin-pertanian'],
    waPesan: 'Halo, saya ingin menanyakan harga combine harvester padi Zoomlion.',
    keyword: 'combine harvester padi, mesin panen padi, harga combine harvester, combine harvester zoomlion, zoomlion zl88, zoomlion zl105',
    id: {
      judulTab: 'Combine Harvester Padi | Mesin Panen Padi Zoomlion ZL Series | DASS',
      desk: 'Jual combine harvester padi Zoomlion ZL88, ZL105, ZL125, dan ZL145 di Jakarta. Panduan memilih mesin panen padi sesuai luas sawah dari distributor resmi.',
      h1: 'Combine Harvester Padi',
      sub: 'Mesin panen padi crawler Zoomlion ZL Series untuk sawah kecil hingga luas.',
      intro: [
        'Combine harvester memotong, merontokkan, dan membersihkan gabah dalam satu kali jalan. Menurut Kementerian Pertanian, penggunaan combine harvester dapat menekan susut panen menjadi sekitar 3–5 persen, lebih rendah dibanding panen manual.',
        'Zoomlion ZL Series adalah combine harvester tipe crawler (roda rantai) untuk sawah berlumpur, dengan pilihan tenaga 88 hingga 140 HP.'
      ],
      panduan: 'Cara Memilih Combine Harvester Padi',
      poin: [
        ['Sesuaikan dengan Luas Sawah', 'ZL88 cocok untuk lahan kecil hingga menengah dengan kapasitas lapangan hingga 0,66 ha/jam, sedangkan ZL105 untuk lahan menengah hingga besar hingga 0,86 ha/jam. ZL125 dan ZL145 dirancang untuk lahan berskala luas.'],
        ['Perhatikan Kondisi Lahan', 'Sawah berlumpur membutuhkan tekanan tanah rendah. Seri ZL memakai track karet berlug tinggi untuk mobilitas di lahan berlumpur.'],
        ['Lebar Potong', 'Header yang lebih lebar menyelesaikan lahan lebih cepat, tetapi butuh tenaga lebih besar. ZL88 memiliki lebar potong 2,0 m, sedangkan ZL105 hingga 2,4 m.'],
        ['Kehilangan Gabah', 'Sistem perontokan dan pembersihan yang baik menekan gabah terbuang. Seri ZL diklaim mampu menekan kehilangan gabah hingga serendah 1,5%.']
      ],
      kenapa: 'Kenapa Membeli Combine Harvester di DASS?',
      produk: 'Pilihan Combine Harvester Padi Zoomlion',
      faq: [
        ['Combine harvester mana yang cocok untuk sawah kecil?', 'Untuk sawah kecil hingga menengah, ZL88 dengan tenaga 88 HP dan lebar potong 2,0 m bisa menjadi pilihan. Tim kami siap membantu menyesuaikan dengan kondisi sawah Anda.'],
        ['Berapa harga combine harvester padi?', 'Harga tergantung model dan konfigurasinya. Hubungi tim kami untuk mendapatkan penawaran harga terbaru.'],
        ['Di mana membeli combine harvester padi di Jakarta?', `Di PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, Jakarta Timur. Hubungi kami lewat WhatsApp ${TELEPON}.`],
      ],
      cta: 'Tanya Harga Combine Harvester via WhatsApp'
    },
    en: {
      h1: 'Rice Combine Harvesters',
      sub: 'Zoomlion ZL Series crawler rice harvesters for small to large paddy fields.',
      intro: [
        'A combine harvester cuts, threshes, and cleans grain in a single pass. According to Indonesia\'s Ministry of Agriculture, combine harvesters can cut harvest losses to around 3–5 percent, lower than manual harvesting.',
        'The Zoomlion ZL Series are crawler (tracked) combine harvesters for muddy paddy fields, with power options from 88 to 140 HP.'
      ],
      panduan: 'How to Choose a Rice Combine Harvester',
      poin: [
        ['Match the Field Size', 'The ZL88 suits small to medium fields with a field capacity of up to 0.66 ha/hour, while the ZL105 handles medium to large fields at up to 0.86 ha/hour. The ZL125 and ZL145 are designed for large-scale fields.'],
        ['Consider Field Conditions', 'Muddy paddies need low ground pressure. The ZL Series uses high-lug rubber tracks for mobility in muddy fields.'],
        ['Cutting Width', 'A wider header finishes fields faster but needs more power. The ZL88 has a 2.0 m cutting width, while the ZL105 reaches up to 2.4 m.'],
        ['Grain Loss', 'Good threshing and cleaning systems reduce wasted grain. The ZL Series is claimed to keep grain loss as low as 1.5%.']
      ],
      kenapa: 'Why Buy a Combine Harvester from DASS?',
      produk: 'Zoomlion Rice Combine Harvester Range',
      faq: [
        ['Which combine harvester suits small paddy fields?', 'For small to medium fields, the ZL88 with 88 HP and a 2.0 m cutting width is a good option. Our team can help match it to your field conditions.'],
        ['How much does a rice combine harvester cost?', 'The price depends on the model and configuration. Contact our team for the latest quotation.'],
        ['Where can I buy a rice combine harvester in Jakarta?', `From PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, East Jakarta. Contact us on WhatsApp ${TELEPON}.`],
      ],
      cta: 'Ask for Combine Harvester Prices on WhatsApp'
    },
    zh: {
      h1: '水稻联合收割机',
      sub: '中联重科ZL系列履带式水稻收割机，适用于小型到大型稻田。',
      intro: [
        '联合收割机一次作业即可完成收割、脱粒和清选。据印尼农业部介绍，使用联合收割机可将收获损失降至约3–5%，低于人工收获。',
        '中联重科ZL系列是适用于泥泞稻田的履带式联合收割机，功率从88马力到140马力可选。'
      ],
      panduan: '如何选择水稻联合收割机',
      poin: [
        ['与田块面积相匹配', 'ZL88适合中小型地块，作业效率最高0.66公顷/小时；ZL105适合中大型地块，最高0.86公顷/小时；ZL125和ZL145专为大面积地块设计。'],
        ['考虑田间条件', '泥泞稻田需要较低的接地压力。ZL系列采用高花纹橡胶履带，在泥地中通过性好。'],
        ['割幅', '割台越宽作业越快，但需要更大功率。ZL88割幅2.0米，ZL105最宽可达2.4米。'],
        ['籽粒损失', '良好的脱粒和清选系统可减少籽粒浪费。据称ZL系列的籽粒损失率可低至1.5%。']
      ],
      kenapa: '为什么选择在DASS购买联合收割机？',
      produk: '中联重科水稻联合收割机系列',
      faq: [
        ['哪款联合收割机适合小块稻田？', '对于中小型稻田，88马力、割幅2.0米的ZL88是不错的选择。我们的团队可根据您的田间条件帮助选型。'],
        ['水稻联合收割机多少钱？', '价格取决于型号和配置。请联系我们的团队获取最新报价。'],
        ['在雅加达哪里可以买到水稻联合收割机？', `PT Diesel Agri Sukses Sejahtera，地址：东雅加达Cakung Timur，Jalan River Garden Boulevard No. 19B。请通过WhatsApp ${TELEPON}联系我们。`],
      ],
      cta: '通过WhatsApp咨询联合收割机价格'
    }
  },

  /* ------------------------------------------------------------ */
  {
    file: 'drone-pertanian-sawah.html',
    kategori: ['sprayer-drone', 'va-drone'],
    brand: 'pages/produk/eavision.html',
    gambar: 'assets/images/hero/hero-eavision-og.jpg',
    artikel: [],
    waPesan: 'Halo, saya ingin konsultasi drone pertanian untuk sawah.',
    keyword: 'drone pertanian sawah, drone semprot padi, drone tabur benih padi, drone pupuk, drone sprayer padi, drone pertanian',
    id: {
      judulTab: 'Drone Pertanian untuk Sawah | Semprot & Tabur Benih Padi | DASS',
      desk: 'Drone pertanian untuk sawah: semprot pestisida, tebar pupuk, dan tabur benih padi. Panduan memilih drone serta pilihan EAVision dan VectorAgr di DASS Jakarta.',
      h1: 'Drone Pertanian untuk Sawah',
      sub: 'Drone sprayer untuk menyemprot, menebar pupuk, dan menabur benih padi.',
      intro: [
        'Menyemprot dan memupuk sawah secara manual membutuhkan banyak tenaga dan waktu, dan operator harus berjalan di lumpur sambil terpapar bahan kimia. Drone pertanian membuat pekerjaan ini jauh lebih cepat dan aman.',
        'Selain menyemprot, banyak drone kini bisa menebar pupuk granul dan benih padi. Balai Besar Pengembangan Mekanisasi Pertanian Kementan bahkan telah mengembangkan drone tabur benih dengan kapasitas kerja 0,8–1 hektare per jam.'
      ],
      panduan: 'Cara Memilih Drone untuk Sawah',
      poin: [
        ['Kapasitas Muatan', 'Muatan yang lebih besar berarti lebih jarang bolak-balik mengisi ulang. Untuk hamparan sawah yang luas, pilih drone berkapasitas besar seperti EAVision J150.'],
        ['Bisa Semprot dan Tebar', 'Pilih drone yang bisa berganti fungsi dari semprot ke tebar pupuk dan benih, supaya terpakai sepanjang musim tanam.'],
        ['Waktu Pengisian Baterai', 'Pengisian cepat membuat drone bisa terus bekerja. EAVision J100, misalnya, didukung pengisian daya sekitar 9 menit.'],
        ['Operator Terlatih', 'Hasil penyemprotan sangat bergantung pada keterampilan operator. Siapkan operator yang paham cara terbang, pengaturan dosis, dan perawatan harian drone sesuai buku manual.']
      ],
      kenapa: 'Kenapa Membeli Drone di DASS?',
      produk: 'Pilihan Drone untuk Sawah',
      faq: [
        ['Kapan waktu terbaik menyemprot sawah dengan drone?', 'Pagi hari sekitar pukul 06.00–09.00 atau sore hari, saat suhu lebih sejuk dan angin lebih tenang. Hindari menyemprot saat hujan atau angin kencang.'],
        ['Apakah drone bisa menabur benih padi?', 'Bisa. Drone seperti EAVision J150, J100, dan J70 dilengkapi sistem tebar untuk benih dan pupuk granul.'],
        ['Berapa harga drone pertanian untuk sawah?', 'Harga tergantung model dan kapasitasnya. Hubungi tim kami untuk mendapatkan penawaran harga terbaru.'],
        ['Di mana membeli drone pertanian di Jakarta?', `Di PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, Jakarta Timur. Hubungi kami lewat WhatsApp ${TELEPON}.`]
      ],
      cta: 'Konsultasi Drone Sawah via WhatsApp'
    },
    en: {
      h1: 'Agricultural Drones for Rice Fields',
      sub: 'Spray drones for spraying, fertiliser spreading, and sowing rice seed.',
      intro: [
        'Spraying and fertilising paddies by hand takes a lot of labour and time, and workers must walk through mud while exposed to chemicals. Agricultural drones make this work much faster and safer.',
        'Besides spraying, many drones can now spread granular fertiliser and rice seed. The Ministry of Agriculture\'s Center for Agricultural Mechanization Development has even developed a seeding drone that covers 0.8–1 hectare per hour.'
      ],
      panduan: 'How to Choose a Drone for Rice Fields',
      poin: [
        ['Payload Capacity', 'A larger payload means fewer refilling trips. For large stretches of paddy, choose a high-capacity drone such as the EAVision J150.'],
        ['Spraying and Spreading', 'Choose a drone that can switch from spraying to spreading fertiliser and seed, so it is used throughout the season.'],
        ['Battery Charging Time', 'Fast charging keeps the drone working. The EAVision J100, for example, supports charging in about 9 minutes.'],
        ['Trained Operators', 'Spraying results depend heavily on the operator\'s skill. Make sure your operator understands flight handling, dosage settings, and daily drone care as described in the manual.']
      ],
      kenapa: 'Why Buy a Drone from DASS?',
      produk: 'Drones for Rice Fields',
      faq: [
        ['When is the best time to spray rice fields by drone?', 'Early morning, around 06:00–09:00, or late afternoon, when it is cooler and the wind is calmer. Avoid spraying in rain or strong wind.'],
        ['Can drones sow rice seed?', 'Yes. Drones such as the EAVision J150, J100, and J70 have spreading systems for seed and granular fertiliser.'],
        ['How much does a drone for rice fields cost?', 'The price depends on the model and capacity. Contact our team for the latest quotation.'],
        ['Where can I buy an agricultural drone in Jakarta?', `From PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, East Jakarta. Contact us on WhatsApp ${TELEPON}.`]
      ],
      cta: 'Ask About Rice Field Drones on WhatsApp'
    },
    zh: {
      h1: '稻田农业无人机',
      sub: '可用于喷洒、撒肥和播撒稻种的植保无人机。',
      intro: [
        '人工喷药和施肥需要大量人力和时间，操作人员还要在泥地中行走并接触农药。农业无人机让这些工作更快、更安全。',
        '除喷洒外，许多无人机如今还可以撒播颗粒肥和稻种。印尼农业部农业机械化发展中心甚至研制出作业效率达每小时0.8–1公顷的播种无人机。'
      ],
      panduan: '如何为稻田选择无人机',
      poin: [
        ['载重能力', '载重越大，往返加料次数越少。大面积稻田可选择EAVision J150等大载重机型。'],
        ['喷洒与撒播兼备', '选择可在喷洒与撒肥、播种之间切换的无人机，整个种植季都能派上用场。'],
        ['电池充电时间', '快速充电让无人机持续作业。例如EAVision J100支持约9分钟快充。'],
        ['熟练的飞手', '喷洒效果在很大程度上取决于操作员的技能。请确保飞手熟悉飞行操作、用量设置以及使用手册中的日常保养。']
      ],
      kenapa: '为什么选择在DASS购买无人机？',
      produk: '适用于稻田的无人机',
      faq: [
        ['用无人机喷洒稻田的最佳时间是什么时候？', '早上6:00–9:00左右或傍晚，此时气温较低、风力较小。避免在下雨或大风时喷洒。'],
        ['无人机可以播撒稻种吗？', '可以。EAVision J150、J100和J70等无人机配备撒播系统，可撒播种子和颗粒肥。'],
        ['稻田用无人机多少钱？', '价格取决于型号和容量。请联系我们的团队获取最新报价。'],
        ['在雅加达哪里可以买到农业无人机？', `PT Diesel Agri Sukses Sejahtera，地址：东雅加达Cakung Timur，Jalan River Garden Boulevard No. 19B。请通过WhatsApp ${TELEPON}联系我们。`]
      ],
      cta: '通过WhatsApp咨询稻田无人机'
    }
  }
];

/* Artikel terkait per kategori produk, untuk bagian "Lihat Juga" di halaman produk */
const ARTIKEL_KATEGORI = {
  'tractor':       ['cara-pilih-ban-traktor', 'cara-ganti-oli-traktor-yang-benar-dan-hemat-biaya', 'traktor-sering-selip-ini-cara-pakai-differential-lock'],
  'hybrid':        ['cara-ganti-oli-traktor-yang-benar-dan-hemat-biaya', 'keunggulan-hydraulic-power-steering-traktor', 'cara-pilih-ban-traktor'],
  'implement':     ['teknik-mengendalikan-traktor', 'traktor-sering-selip-ini-cara-pakai-differential-lock'],
  'harvester':     ['waspada-oksidasi-oli-pada-mesin-pertanian'],
  'planter':       ['waspada-oksidasi-oli-pada-mesin-pertanian'],
  'sugarcane':     ['waspada-oksidasi-oli-pada-mesin-pertanian'],
  'dryer':         ['waspada-oksidasi-oli-pada-mesin-pertanian'],
  'baler':         ['waspada-oksidasi-oli-pada-mesin-pertanian'],
  'sprayer-drone': [],
  'va-drone':      [],
  'va-steering':   ['teknik-mengendalikan-traktor', 'keunggulan-hydraulic-power-steering-traktor'],
  'va-rover':      [],
  'va-digital':    []
};

/* =========================================
   PEMBANTU
   ========================================= */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const KATEGORI_URL = {
  'hybrid': 'traktor-hybrid', 'tractor': 'traktor', 'planter': 'rice-transplanter',
  'harvester': 'combine-harvester', 'sugarcane': 'mesin-panen-tebu', 'dryer': 'mesin-pengering-gabah',
  'baler': 'mesin-baler', 'implement': 'implement-traktor', 'sprayer-drone': 'drone-sprayer',
  'va-drone': 'drone-pertanian', 'va-steering': 'auto-steering', 'va-rover': 'robot-pertanian',
  'va-digital': 'pertanian-digital'
};
const slug = t => String(t).toLowerCase().replace(/[–—]/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const urlProduk = p => `produk/${KATEGORI_URL[p.kategori] || slug(p.kategori)}-${slug(p.brand)}-${slug(p.nama)}.html`;

/* Kartu produk sama persis dengan kartuProduk() di filter-produk.js */
function kartu(p) {
  const brand = BRANDS.find(b => b.id === p.brand);
  const kat = (KATEGORI_TEKS[p.kategori] || {}).id || '';
  return `
          <a href="${urlProduk(p)}" class="produk-card" data-produk="${p.id}">
            <div class="produk-card__brand"><img src="${brand.logo}" alt="${esc(brand.nama)}" loading="lazy"></div>
            <div class="produk-card__media"><img src="${p.gambar.replace(/\.png$/, '-kecil.webp')}" alt="${esc([ALT_KATEGORI[p.kategori], brand.nama, p.nama].filter(Boolean).join(' '))}" loading="lazy" decoding="async"></div>
            <div class="produk-card__body">
              <p class="produk-card__seri mb-0">${esc(p.seri || '')}</p>
              <h3 class="produk-card__nama">${esc(p.nama)}</h3>
              <p class="produk-card__kategori mb-0">${esc(kat)}</p>
            </div>
          </a>`;
}

function judulArtikel(id, b) {
  const a = ARTIKEL.find(x => x.id === id);
  if (!a) throw new Error('Artikel tidak ditemukan: ' + id);
  const tr = ARTIKEL_TERJEMAHAN[id];
  return (b !== 'id' && tr && tr[b] && tr[b].judul) || a.judul;
}

/* Produk di sebuah halaman: daftar id tertentu, atau semua produk per kategori */
const produkHalaman = h => h.produkId
  ? h.produkId.map(id => { const p = PRODUK.find(x => x.id === id); if (!p) throw new Error('Produk tidak ada: ' + id); return p; })
  : h.kategori.flatMap(k => PRODUK.filter(p => p.kategori === k));

/* Blok per bahasa: versi Indonesia tampil bawaan, lainnya disembunyikan */
const blok = (b, isi) => `<div data-bahasa="${b}"${b === 'id' ? '' : ' hidden'}>${isi}</div>`;

function halaman(h) {
  const url = `${DOMAIN}/${h.file}`;
  const produk = produkHalaman(h);
  if (!produk.length) throw new Error('Tidak ada produk untuk ' + h.file);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: h.id.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: h.id.h1, item: url }
        ]
      },
      {
        '@type': 'ItemList',
        name: h.id.produk,
        itemListElement: produk.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${DOMAIN}/${urlProduk(p)}`, name: p.nama }))
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Dibuat otomatis oleh tools/buat-halaman-landing.js — jangan diedit langsung. -->

  <title>${esc(h.id.judulTab)}</title>
  <meta name="description" content="${esc(h.id.desk)}">
  <meta name="keywords" content="${esc(h.keyword)}">
  <link rel="canonical" href="${url}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(h.id.judulTab)}">
  <meta property="og:description" content="${esc(h.id.desk)}">
  <meta property="og:image" content="${DOMAIN}/${h.gambar}">
  <meta property="og:locale" content="id_ID">

  <link rel="icon" href="assets/images/logo/logo.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" media="print" onload="this.media='all'">

  <link rel="stylesheet" href="assets/css/style.css">

  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body data-base="" data-page="produk">

  <div id="site-header"></div>

  <main>

    <section class="brand-hero">
      <div class="container brand-hero__grid brand-hero__grid--satu">
        <div class="brand-hero__left">
          <span class="brand-hero__eyebrow">PT Diesel Agri Sukses Sejahtera</span>
${BAHASA.map(b => `          ${blok(b, `
            <h1>${h[b].h1}</h1>
            <p>${h[b].sub}</p>
            <a href="#" class="btn btn--accent btn--lg" data-wa-link data-wa-pesan="${esc(h.waPesan)}">${h[b].cta}</a>
          `)}`).join('\n')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container landing">
${BAHASA.map(b => `        ${blok(b, `
          <div class="landing__intro">
            ${h[b].intro.map(p => `<p>${p}</p>`).join('\n            ')}
          </div>
${h[b].panduan ? `          <h2 class="landing__judul">${h[b].panduan}</h2>
          <div class="grid grid--2 landing__unggul">
            ${h[b].poin.map(([j, t]) => `<div class="feature"><h3 class="feature__title">${j}</h3><p class="feature__text">${t}</p></div>`).join('\n            ')}
          </div>
` : ''}          <h2 class="landing__judul">${h[b].kenapa}</h2>
          <div class="grid grid--2 landing__unggul">
            ${KEUNGGULAN[b].map(([j, t]) => `<div class="feature"><h3 class="feature__title">${j}</h3><p class="feature__text">${t}</p></div>`).join('\n            ')}
          </div>
        `)}`).join('\n')}
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
${BAHASA.map(b => `        ${blok(b, `
          <div class="section-header section-header--center">
            <h2 class="section-header__title">${h[b].produk}</h2>
            <p class="section-header__desc"><a href="${h.brand}">${UI[b].semua} &rarr;</a></p>
          </div>`)}`).join('\n')}
        <div class="produk-grid" ${h.produkId ? `data-landing-produk="${h.produkId.join(',')}"` : `data-landing-kategori="${h.kategori.join(',')}"`}>${produk.map(kartu).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container landing">
${BAHASA.map(b => `        ${blok(b, `
          <h2 class="landing__judul">${UI[b].faq}</h2>
          ${h[b].faq.map(([q, a]) => `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join('\n          ')}

${h.artikel.length ? `
          <h2 class="landing__judul">${UI[b].artikel}</h2>
          <ul class="landing__artikel">
            ${h.artikel.map(id => `<li><a href="artikel/${id}.html">${judulArtikel(id, b)}</a></li>`).join('\n            ')}
          </ul>
` : ''}
          <h2 class="landing__judul">${UI[b].terkait}</h2>
          <ul class="landing__artikel">
            ${HALAMAN.filter(x => x !== h).map(x => `<li><a href="${x.file}">${x[b].h1}</a></li>`).join('\n            ')}
            <li><a href="kalkulator.html">${esc(UI[b].kalk)}</a></li>
          </ul>

          <p class="landing__cta">
            <a href="#" class="btn btn--wa btn--lg" data-wa-link data-wa-pesan="${esc(h.waPesan)}">${h[b].cta}</a>
          </p>
        `)}`).join('\n')}
      </div>
    </section>

  </main>

  <div id="site-footer"></div>

  <script src="assets/js/config.js"></script>
  <script src="assets/js/data/brands.js"></script>
  <script src="assets/js/data/produk-zoomlion.js"></script>
  <script src="assets/js/data/produk-eavision.js"></script>
  <script src="assets/js/data/produk-vectoragr.js"></script>
  <script src="assets/js/data/lang.js"></script>
  <script src="assets/js/i18n.js"></script>
  <script src="assets/js/navbar.js"></script>
  <script src="assets/js/filter-produk.js"></script>
  <script src="assets/js/artikel-halaman.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
`;
}

/* --- Tulis halaman --- */
for (const h of HALAMAN) {
  fs.writeFileSync(path.join(ROOT, h.file), halaman(h));
  console.log(`Dibuat  : ${h.file}`);
}

/* --- Perbarui sitemap.xml --- */
const sitemapPath = path.join(ROOT, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
for (const h of HALAMAN) {
  sitemap = sitemap.replace(new RegExp(`\\s*<url>\\s*<loc>${DOMAIN}/${h.file}</loc>[\\s\\S]*?</url>`, 'g'), '');
}
const hariIni = new Date().toISOString().slice(0, 10);
const entri = HALAMAN.map(h => `
  <url>
    <loc>${DOMAIN}/${h.file}</loc>
    <lastmod>${hariIni}</lastmod>
    <priority>0.9</priority>
  </url>`).join('');
sitemap = sitemap.replace('</urlset>', `${entri.slice(1)}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);
console.log(`sitemap.xml diperbarui (${HALAMAN.length} halaman kata kunci)`);

/* =========================================
   "LIHAT JUGA" DI HALAMAN PRODUK (produk/*.html)
   Tautan ke halaman kata kunci yang memuat produk tsb
   dan artikel terkait kategorinya. Aman dijalankan ulang.
   ========================================= */
const MULAI = '<!-- LIHAT-JUGA: dibuat otomatis oleh tools/buat-halaman-landing.js -->';
const SELESAI = '<!-- /LIHAT-JUGA -->';
let jumlahProduk = 0;
for (const f of fs.readdirSync(path.join(ROOT, 'produk')).filter(x => x.endsWith('.html'))) {
  const file = path.join(ROOT, 'produk', f);
  let html = fs.readFileSync(file, 'utf8');
  const id = (html.match(/data-produk-id="([^"]+)"/) || [])[1];
  const p = PRODUK.find(x => x.id === id);
  if (!p) { console.warn(`Lewati  : produk/${f} (produk tidak dikenal)`); continue; }

  const landing = HALAMAN.filter(h => produkHalaman(h).includes(p));
  const artikel = ARTIKEL_KATEGORI[p.kategori] || [];
  const blokHtml = `${MULAI}
    <section class="section">
      <div class="container landing">
${BAHASA.map(b => `        ${blok(b, `
          <h2 class="landing__judul">${UI[b].terkait}</h2>
          <ul class="landing__artikel">
            ${landing.map(h => `<li><a href="../${h.file}">${h[b].h1}</a></li>`).join('\n            ')}
            ${artikel.map(a => `<li><a href="../artikel/${a}.html">${judulArtikel(a, b)}</a></li>`).join('\n            ')}
          </ul>
        `)}`).join('\n')}
      </div>
    </section>
    ${SELESAI}`;

  html = html.includes(MULAI)
    ? html.replace(new RegExp(`${MULAI}[\\s\\S]*?${SELESAI}`), blokHtml)
    : html.replace('\n  </main>', `\n    ${blokHtml}\n\n  </main>`);
  if (!html.includes('artikel-halaman.js')) {
    html = html.replace('  <script src="../assets/js/main.js"></script>',
      '  <script src="../assets/js/artikel-halaman.js"></script>\n  <script src="../assets/js/main.js"></script>');
  }
  fs.writeFileSync(file, html);
  jumlahProduk++;
}
console.log(`"Lihat Juga" diperbarui di ${jumlahProduk} halaman produk`);
