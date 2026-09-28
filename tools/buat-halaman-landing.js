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
const { COMPANY, BRANDS, PRODUK, KATEGORI_TEKS, ARTIKEL, ARTIKEL_TERJEMAHAN } = ctx;
const TELEPON = COMPANY.telepon;

/* =========================================
   TEKS ANTARMUKA
   ========================================= */
const UI = {
  id: { faq: 'Pertanyaan yang Sering Diajukan', artikel: 'Baca Juga', semua: 'Lihat semua produk' },
  en: { faq: 'Frequently Asked Questions',       artikel: 'Read Also', semua: 'View all products' },
  zh: { faq: '常见问题',                          artikel: '延伸阅读',  semua: '查看全部产品' }
};

/* Keunggulan yang sama untuk semua halaman */
const KEUNGGULAN = {
  id: [
    ['Distributor Resmi', 'Unit resmi dari prinsipal, disertai garansi dan dokumen lengkap.'],
    ['Sparepart Tersedia', 'Stok suku cadang asli untuk meminimalkan waktu unit berhenti operasi.'],
    ['Layanan Servis', 'Teknisi siap menangani perawatan berkala hingga perbaikan di lokasi.'],
    ['Konsultasi Teknis', 'Kami bantu menentukan unit yang sesuai luas lahan dan jenis pekerjaan.']
  ],
  en: [
    ['Authorised Distributor', 'Genuine units from the principal, with warranty and complete documents.'],
    ['Spare Parts Available', 'Genuine spare parts in stock to minimise downtime.'],
    ['Service Support', 'Technicians ready for scheduled maintenance and on-site repairs.'],
    ['Technical Consultation', 'We help you choose the unit that fits your land and type of work.']
  ],
  zh: [
    ['授权经销商', '原厂正品，提供保修及完整文件。'],
    ['配件充足', '原厂配件库存充足，最大限度减少停机时间。'],
    ['维修服务', '技术人员可提供定期保养和现场维修。'],
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
    gambar: 'assets/images/hero/hero-tractor.png',
    artikel: ['cara-pilih-ban-traktor', 'perawatan-traktor-jelang-musim-hujan',
              'traktor-hybrid-zoomlion-hemat-solar', 'auto-steering-traktor-perkebunan'],
    waPesan: 'Halo, saya ingin menanyakan harga traktor Zoomlion.',
    keyword: 'jual traktor jakarta, traktor jakarta, harga traktor, traktor zoomlion, dealer traktor jakarta, traktor sawah, traktor hybrid',
    id: {
      judulTab: 'Jual Traktor Jakarta | Traktor Zoomlion Resmi & Bergaransi | DASS',
      desk: 'Jual traktor di Jakarta: traktor roda empat dan traktor hybrid Zoomlion berbagai kelas tenaga, lengkap dengan implement, sparepart asli, dan layanan servis.',
      h1: 'Jual Traktor di Jakarta',
      sub: 'Traktor roda empat dan traktor hybrid Zoomlion, langsung dari distributor resmi di Jakarta Timur.',
      intro: [
        'Mencari traktor di Jakarta? PT Diesel Agri Sukses Sejahtera (DASS) adalah distributor resmi traktor Zoomlion yang berlokasi di Cakung, Jakarta Timur. Kami menyediakan traktor untuk sawah, perkebunan, dan lahan kering, dari kelas kecil hingga traktor hybrid bertenaga besar.',
        'Setiap unit didukung sparepart asli, layanan servis, dan konsultasi teknis untuk membantu Anda memilih traktor yang sesuai luas lahan dan jenis pekerjaan.'
      ],
      kenapa: 'Kenapa Membeli Traktor di DASS?',
      produk: 'Pilihan Traktor Zoomlion',
      faq: [
        ['Di mana tempat membeli traktor di Jakarta?', `Anda bisa membeli traktor Zoomlion di PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, Jakarta Timur. Hubungi kami lewat WhatsApp ${TELEPON} untuk konsultasi dan penawaran harga.`],
        ['Berapa harga traktor Zoomlion?', 'Harga traktor tergantung model, kelas tenaga, dan implement yang dipilih. Hubungi tim kami untuk mendapatkan penawaran harga terbaru.'],
        ['Traktor apa yang cocok untuk sawah?', 'Pilih traktor dengan tenaga dan ukuran yang sesuai luas sawah, serta ban yang cocok untuk lahan berlumpur. Tim kami siap membantu memilih unit yang tepat.'],
        ['Apakah tersedia sparepart dan servis traktor?', 'Ya. Kami menyediakan sparepart asli dan layanan servis untuk traktor Zoomlion, mulai dari perawatan berkala hingga perbaikan.']
      ],
      cta: 'Tanya Harga Traktor via WhatsApp'
    },
    en: {
      h1: 'Tractors for Sale in Jakarta',
      sub: 'Zoomlion four-wheel and hybrid tractors, direct from the authorised distributor in East Jakarta.',
      intro: [
        'Looking for a tractor in Jakarta? PT Diesel Agri Sukses Sejahtera (DASS) is the authorised Zoomlion tractor distributor based in Cakung, East Jakarta. We supply tractors for rice fields, plantations, and dryland farming, from compact models to high-powered hybrid tractors.',
        'Every unit is backed by genuine spare parts, service support, and technical advice to help you choose the right tractor for your land and type of work.'
      ],
      kenapa: 'Why Buy a Tractor from DASS?',
      produk: 'Zoomlion Tractor Range',
      faq: [
        ['Where can I buy a tractor in Jakarta?', `You can buy Zoomlion tractors from PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, East Jakarta. Contact us on WhatsApp ${TELEPON} for advice and a quotation.`],
        ['How much does a Zoomlion tractor cost?', 'The price depends on the model, power class, and implements you choose. Contact our team for the latest quotation.'],
        ['Which tractor is best for rice fields?', 'Choose a tractor whose power and size match your field area, with tyres suited to muddy ground. Our team can help you choose the right unit.'],
        ['Are spare parts and servicing available?', 'Yes. We provide genuine spare parts and service for Zoomlion tractors, from scheduled maintenance to repairs.']
      ],
      cta: 'Ask for Tractor Prices on WhatsApp'
    },
    zh: {
      h1: '雅加达拖拉机销售',
      sub: '中联重科四轮拖拉机和混合动力拖拉机，由东雅加达授权经销商直接供应。',
      intro: [
        '在雅加达寻找拖拉机？PT Diesel Agri Sukses Sejahtera（DASS）是中联重科拖拉机的授权经销商，位于东雅加达Cakung。我们提供适用于水田、种植园和旱地的拖拉机，从小型机型到大马力混合动力拖拉机一应俱全。',
        '每台拖拉机均有原厂配件、维修服务和技术咨询支持，帮助您根据土地面积和作业类型选择合适的机型。'
      ],
      kenapa: '为什么选择在DASS购买拖拉机？',
      produk: '中联重科拖拉机系列',
      faq: [
        ['在雅加达哪里可以买到拖拉机？', `您可以在PT Diesel Agri Sukses Sejahtera购买中联重科拖拉机，地址：东雅加达Cakung Timur，Jalan River Garden Boulevard No. 19B。如需咨询和报价，请通过WhatsApp ${TELEPON}联系我们。`],
        ['中联重科拖拉机多少钱？', '价格取决于型号、功率等级和所选农具。请联系我们的团队获取最新报价。'],
        ['哪种拖拉机适合水田？', '请选择功率和尺寸与田块面积相匹配、并配备适合泥地轮胎的拖拉机。我们的团队可以帮助您选择合适的机型。'],
        ['是否提供配件和维修服务？', '是的。我们为中联重科拖拉机提供原厂配件和维修服务，从定期保养到故障维修。']
      ],
      cta: '通过WhatsApp咨询拖拉机价格'
    }
  },
  {
    file: 'jual-drone-pertanian-jakarta.html',
    kategori: ['sprayer-drone', 'va-drone'],
    brand: 'pages/produk/eavision.html',
    gambar: 'assets/images/hero/hero-eavision.png',
    artikel: ['drone-tabur-benih-pupuk', 'perawatan-drone-sprayer-musim-kemarau',
              'eavision-j150-agrishow-2026', 'sni-drone-pertanian-kemenperin'],
    waPesan: 'Halo, saya ingin menanyakan harga drone pertanian.',
    keyword: 'jual drone pertanian jakarta, drone pertanian jakarta, drone sprayer, harga drone pertanian, drone penyemprot, drone eavision, drone vectoragr',
    id: {
      judulTab: 'Jual Drone Pertanian Jakarta | EAVision & VectorAgr Resmi | DASS',
      desk: 'Jual drone pertanian di Jakarta: drone sprayer EAVision dan VectorAgr untuk semprot, tebar pupuk, dan benih. Distributor resmi dengan sparepart dan servis.',
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
        ['Apakah tersedia sparepart dan servis drone?', 'Ya. Kami menyediakan sparepart dan layanan servis untuk drone EAVision dan VectorAgr.']
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
        ['Are spare parts and drone servicing available?', 'Yes. We provide spare parts and service for EAVision and VectorAgr drones.']
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
        ['是否提供无人机配件和维修服务？', '是的。我们为EAVision和VectorAgr无人机提供配件和维修服务。']
      ],
      cta: '通过WhatsApp咨询无人机价格'
    }
  },
  {
    file: 'jual-mesin-pertanian-jakarta.html',
    kategori: ['harvester', 'planter', 'sugarcane', 'dryer', 'baler'],
    brand: 'pages/produk/zoomlion.html',
    gambar: 'assets/images/hero/hero-combine-hasverter.png',
    artikel: ['alsintan-2026-pilih-mesin-sesuai-lahan', 'perawatan-combine-harvester-setelah-panen',
              'mesin-pengering-gabah-musim-hujan', 'swasembada-gula-mekanisasi-panen-tebu'],
    waPesan: 'Halo, saya ingin menanyakan harga mesin pertanian Zoomlion.',
    keyword: 'jual mesin pertanian jakarta, alat mesin pertanian, combine harvester, rice transplanter, mesin pengering gabah, mesin panen tebu, alsintan',
    id: {
      judulTab: 'Jual Mesin Pertanian Jakarta | Combine Harvester, Dryer & Lainnya | DASS',
      desk: 'Jual mesin pertanian di Jakarta: combine harvester, rice transplanter, mesin panen tebu, mesin pengering gabah, dan baler Zoomlion. Distributor resmi.',
      h1: 'Jual Mesin Pertanian di Jakarta',
      sub: 'Combine harvester, rice transplanter, mesin panen tebu, mesin pengering gabah, dan baler Zoomlion.',
      intro: [
        'PT Diesel Agri Sukses Sejahtera (DASS) menyediakan mesin pertanian Zoomlion untuk setiap tahap budidaya, dari tanam, panen, hingga pascapanen. Kantor kami berada di Cakung, Jakarta Timur.',
        'Mulai dari rice transplanter untuk tanam padi, combine harvester untuk panen, mesin panen tebu untuk perkebunan, hingga mesin pengering gabah dan baler jerami, semuanya didukung sparepart asli dan layanan servis.'
      ],
      kenapa: 'Kenapa Membeli Mesin Pertanian di DASS?',
      produk: 'Pilihan Mesin Pertanian Zoomlion',
      faq: [
        ['Di mana membeli mesin pertanian di Jakarta?', `Anda bisa membeli mesin pertanian Zoomlion di PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, Jakarta Timur. Hubungi kami lewat WhatsApp ${TELEPON}.`],
        ['Berapa harga combine harvester dan mesin pertanian lainnya?', 'Harga tergantung jenis mesin, model, dan kapasitasnya. Hubungi tim kami untuk mendapatkan penawaran harga terbaru.'],
        ['Mesin apa yang cocok untuk lahan saya?', 'Pilihan mesin tergantung luas lahan, jenis tanaman, dan kebutuhan di setiap tahap. Tim kami siap membantu menghitung kebutuhan Anda.'],
        ['Apakah tersedia sparepart dan servis?', 'Ya. Kami menyediakan sparepart asli dan layanan servis untuk mesin pertanian Zoomlion.']
      ],
      cta: 'Tanya Harga Mesin Pertanian via WhatsApp'
    },
    en: {
      h1: 'Agricultural Machinery for Sale in Jakarta',
      sub: 'Zoomlion combine harvesters, rice transplanters, sugarcane harvesters, grain dryers, and balers.',
      intro: [
        'PT Diesel Agri Sukses Sejahtera (DASS) supplies Zoomlion agricultural machinery for every stage of cultivation, from planting and harvesting to post-harvest. Our office is in Cakung, East Jakarta.',
        'From rice transplanters for planting, combine harvesters for harvesting, and sugarcane harvesters for plantations to grain dryers and straw balers, every machine is backed by genuine spare parts and service support.'
      ],
      kenapa: 'Why Buy Agricultural Machinery from DASS?',
      produk: 'Zoomlion Agricultural Machinery Range',
      faq: [
        ['Where can I buy agricultural machinery in Jakarta?', `You can buy Zoomlion agricultural machinery from PT Diesel Agri Sukses Sejahtera, Jalan River Garden Boulevard No. 19B, Cakung Timur, East Jakarta. Contact us on WhatsApp ${TELEPON}.`],
        ['How much do combine harvesters and other machines cost?', 'The price depends on the type of machine, model, and capacity. Contact our team for the latest quotation.'],
        ['Which machine suits my land?', 'The right machine depends on your land area, crop type, and needs at each stage. Our team can help calculate what you need.'],
        ['Are spare parts and servicing available?', 'Yes. We provide genuine spare parts and service for Zoomlion agricultural machinery.']
      ],
      cta: 'Ask for Machinery Prices on WhatsApp'
    },
    zh: {
      h1: '雅加达农业机械销售',
      sub: '中联重科联合收割机、插秧机、甘蔗收获机、谷物烘干机和打捆机。',
      intro: [
        'PT Diesel Agri Sukses Sejahtera（DASS）提供覆盖种植、收获到产后各环节的中联重科农业机械。我们的办公室位于东雅加达Cakung。',
        '从用于水稻栽插的插秧机、用于收获的联合收割机、用于种植园的甘蔗收获机，到谷物烘干机和秸秆打捆机，每台机器都有原厂配件和维修服务支持。'
      ],
      kenapa: '为什么选择在DASS购买农业机械？',
      produk: '中联重科农业机械系列',
      faq: [
        ['在雅加达哪里可以买到农业机械？', `您可以在PT Diesel Agri Sukses Sejahtera购买中联重科农业机械，地址：东雅加达Cakung Timur，Jalan River Garden Boulevard No. 19B。请通过WhatsApp ${TELEPON}联系我们。`],
        ['联合收割机等农机多少钱？', '价格取决于机器类型、型号和产能。请联系我们的团队获取最新报价。'],
        ['哪种机器适合我的土地？', '合适的机器取决于土地面积、作物种类以及各环节的需求。我们的团队可以帮助您测算。'],
        ['是否提供配件和维修服务？', '是的。我们为中联重科农业机械提供原厂配件和维修服务。']
      ],
      cta: '通过WhatsApp咨询农机价格'
    }
  }
];

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
            <div class="produk-card__media"><img src="${p.gambar.replace(/\.png$/, '.webp')}" alt="${esc(p.nama)}" loading="lazy"></div>
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

/* Blok per bahasa: versi Indonesia tampil bawaan, lainnya disembunyikan */
const blok = (b, isi) => `<div data-bahasa="${b}"${b === 'id' ? '' : ' hidden'}>${isi}</div>`;

function halaman(h) {
  const url = `${DOMAIN}/${h.file}`;
  const produk = h.kategori.flatMap(k => PRODUK.filter(p => p.kategori === k));
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
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

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
          <h2 class="landing__judul">${h[b].kenapa}</h2>
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
        <div class="produk-grid" data-landing-kategori="${h.kategori.join(',')}">${produk.map(kartu).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container landing">
${BAHASA.map(b => `        ${blok(b, `
          <h2 class="landing__judul">${UI[b].faq}</h2>
          ${h[b].faq.map(([q, a]) => `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join('\n          ')}

          <h2 class="landing__judul">${UI[b].artikel}</h2>
          <ul class="landing__artikel">
            ${h.artikel.map(id => `<li><a href="artikel/${id}.html">${judulArtikel(id, b)}</a></li>`).join('\n            ')}
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
sitemap = sitemap.replace(/\s*<url>\s*<loc>[^<]*\/jual-[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
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
