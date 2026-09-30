/* =====================================================================
   LANG.JS — KAMUS TERJEMAHAN WEBSITE DASS
   ID = Indonesia, EN = English, ZH = 中文

   Isi file (JANGAN tertukar tempat naruh entri baru):
   1. TEKS          → semua teks halaman (navbar, hero, kontak, dll)
   2. KATEGORI_TEKS → nama kategori produk (tab filter)
   3. SPEC_TEKS     → LABEL spesifikasi (kolom kiri tabel spek)
   4. NILAI_KATA    → NILAI spesifikasi (kolom kanan tabel spek)
   ===================================================================== */


/* =====================================================================
   1. TEKS HALAMAN
   ===================================================================== */
const TEKS = {

  /* ===== JUDUL TAB BROWSER (bahasa Indonesia = <title> asli halaman) ===== */
  'judul.beranda':   { en: 'Tractor & Agricultural Machinery Distributor in Jakarta | PT Diesel Agri Sukses Sejahtera', zh: '雅加达拖拉机与农业机械经销商 | PT Diesel Agri Sukses Sejahtera' },
  'judul.tentang':   { en: 'About Us | PT Diesel Agri Sukses Sejahtera',                  zh: '关于我们 | PT Diesel Agri Sukses Sejahtera' },
  'judul.kontak':    { en: 'Contact & Address | PT Diesel Agri Sukses Sejahtera Jakarta', zh: '联系方式与地址 | PT Diesel Agri Sukses Sejahtera 雅加达' },
  'judul.artikel':   { en: 'Agricultural Machinery News & Articles | PT Diesel Agri Sukses Sejahtera', zh: '农业机械新闻与文章 | PT Diesel Agri Sukses Sejahtera' },
  'judul.zoomlion':  { en: 'Zoomlion Tractors & Agricultural Machinery | Authorised Distributor in Indonesia', zh: '中联重科拖拉机与农业机械 | 印尼授权经销商' },
  'judul.eavision':  { en: 'EAVision Agricultural Spray Drones | Authorised Distributor in Indonesia', zh: 'EAVision农业植保无人机 | 印尼授权经销商' },
  'judul.vectoragr': { en: 'VectorAgr Agricultural Drones | Authorised Distributor in Indonesia',  zh: 'VectorAgr农业无人机 | 印尼授权经销商' },
  'judul.kalkulator': { en: 'Agricultural Calculator: Drone Spraying & Tractor Selection | DASS', zh: '农业计算器：无人机喷洒与拖拉机选型 | DASS' },

  /* ===== NAVBAR ===== */
  'nav.beranda': { id: 'Beranda',          en: 'Home',            zh: '首页' },
  'nav.tentang': { id: 'Tentang Kami',     en: 'About Us',        zh: '关于我们' },
  'nav.produk':  { id: 'Produk',           en: 'Products',        zh: '产品' },
  'nav.layanan': { id: 'Layanan',          en: 'Services',        zh: '服务' },
  'nav.artikel': { id: 'Berita & Artikel', en: 'News & Articles', zh: '新闻与文章' },
  'nav.kontak':  { id: 'Kontak',           en: 'Contact',         zh: '联系我们' },
  'nav.kalkulator': { id: 'Kalkulator',    en: 'Calculator',      zh: '计算器' },

  'nav.zoomlionSub':  { id: 'Alat berat & mesin pertanian', en: 'Heavy & agricultural machinery', zh: '重型农业机械' },
  'nav.eavisionSub':  { id: 'Drone sprayer pertanian',      en: 'Agricultural sprayer drones',    zh: '农业植保无人机' },
  'nav.vectoragrSub': { id: 'Drone pertanian',              en: 'Agricultural drones',            zh: '农业无人机' },

  /* ===== HERO ===== */
  'hero.judul': {
    id: 'Distributor Traktor & Drone Pertanian di Jakarta',
    en: 'Tractor & Agricultural Drone Distributor in Jakarta',
    zh: '雅加达拖拉机与农业无人机经销商'
  },
  'hero.desc': {
    id: 'Distributor resmi Zoomlion, EAVision, dan VectorAgr. Setiap proyek, satu solusi.',
    en: 'Authorised distributor of Zoomlion, EAVision, and VectorAgr. Every project, one solution.',
    zh: '中联重科、EAVision、VectorAgr 授权经销商。每个项目，一站式解决方案。'
  },

  /* ===== TENTANG SINGKAT (BERANDA) ===== */
  'tentang.eyebrow': { id: 'Tentang Kami', en: 'About Us', zh: '关于我们' },
  'tentang.judul': {
    id: 'Mitra Tepercaya Sektor Pertanian',
    en: 'A Trusted Partner in Agriculture',
    zh: '农业领域的可信赖伙伴'
  },
  'tentang.paragraf': {
    id: 'Berbasis di Jakarta Timur, kami berfokus pada penyediaan alat berat dan mesin pertanian berkualitas. Kami tidak sekadar menjual unit — kami membantu Anda memilih mesin yang benar-benar sesuai kebutuhan lahan',
    en: 'Based in East Jakarta, we focus on supplying quality heavy and agricultural machinery. We do more than sell machines — we help you choose the one that truly fits your land',
    zh: '公司位于东雅加达，专注于提供优质的重型及农业机械。我们不仅销售机械，更帮助您选择真正适合您土地的机型'
  },
  'tentang.poin1': {
    id: 'Produk dari prinsipal berskala global dengan standar mutu internasional',
    en: 'Products from global principals meeting international quality standards',
    zh: '来自全球厂商、符合国际质量标准的产品'
  },
  'tentang.poin2': {
    id: 'Distributor resmi Zoomlion, EAVision, dan VectorAgr di Jakarta',
    en: 'Authorised distributor of Zoomlion, EAVision, and VectorAgr in Jakarta',
    zh: '雅加达中联重科、EAVision 和 VectorAgr 授权经销商'
  },
  'tentang.poin3': {
    id: 'Brosur dan spesifikasi teknis lengkap untuk setiap unit',
    en: 'Brochures and full technical specifications for every unit',
    zh: '每款机型均提供宣传册和完整技术参数'
  },
  'tentang.poin4': {
    id: 'Konsultasi kebutuhan unit sesuai skala dan jenis lahan',
    en: 'Consultation to match units to your land scale and type',
    zh: '根据地块规模与类型提供选型咨询'
  },
  'tentang.badge': { id: 'Brand Global',              en: 'Global Brands',       zh: '国际品牌' },
  'tentang.btn':   { id: 'Selengkapnya Tentang Kami', en: 'Learn More About Us', zh: '了解更多' },

  /* ===== PRODUK ===== */
  'produk.eyebrow': { id: 'Produk Kami', en: 'Our Products', zh: '我们的产品' },
  'produk.judul': {
    id: 'Pilihan Unit untuk Setiap Kebutuhan',
    en: 'A Machine for Every Requirement',
    zh: '满足各类需求的机型选择'
  },
  'produk.desc': {
    id: 'Dari alat berat pertanian hingga teknologi penyemprotan berbasis drone',
    en: 'From agricultural heavy machinery to drone-based spraying technology',
    zh: '从农业重型机械到无人机植保技术'
  },
  'produk.lihat': { id: 'Lihat Produk', en: 'View Products', zh: '查看产品' },

  /* ===== KEUNGGULAN ===== */
  'unggul.eyebrow': { id: 'Mengapa Kami',               en: 'Why Choose Us',           zh: '为何选择我们' },
  'unggul.judul':   { id: 'Bukan Sekadar Penjual Unit', en: 'More Than Just a Seller', zh: '不仅仅是销售商' },

  'unggul.1.judul': { id: 'Produk Bergaransi', en: 'Warranted Products', zh: '正品保修' },
  'unggul.1.teks':  { id: 'Unit resmi dari prinsipal, disertai garansi dan dokumen lengkap', en: 'Official units from the principal, with warranty and complete documentation', zh: '厂商正品机型，配备保修与完整文件' },
  'unggul.2.judul': { id: 'Distributor Resmi', en: 'Authorised Distributor', zh: '授权经销商' },
  'unggul.2.teks':  { id: 'Unit asli dari Zoomlion, EAVision, dan VectorAgr, dijual langsung oleh distributor resminya', en: 'Genuine Zoomlion, EAVision, and VectorAgr units, sold directly by their authorised distributor', zh: '中联重科、EAVision 和 VectorAgr 正品机型，由授权经销商直接销售' },
  'unggul.3.judul': { id: 'Spesifikasi Lengkap', en: 'Full Specifications', zh: '参数齐全' },
  'unggul.3.teks':  { id: 'Data teknis, brosur PDF, dan fitur bandingkan unit tersedia langsung di website', en: 'Technical data, PDF brochures, and a unit comparison tool right on our website', zh: '网站直接提供技术参数、PDF 宣传册和机型对比功能' },
  'unggul.4.judul': { id: 'Konsultasi Teknis', en: 'Technical Consultation', zh: '技术咨询' },
  'unggul.4.teks':  { id: 'Kami bantu menentukan unit yang sesuai luas lahan dan jenis pekerjaan', en: 'We help you choose the right unit for your land size and job type', zh: '协助您根据地块面积与作业类型选择合适机型' },

  /* ===== SEKTOR ===== */
  'sektor.eyebrow': { id: 'Sektor Layanan',               en: 'Sectors We Serve',                  zh: '服务领域' },
  'sektor.judul':   { id: 'Melayani Beragam Skala Usaha', en: 'Serving Businesses of Every Scale', zh: '服务各类规模的企业' },

  'sektor.1.judul': { id: 'Perkebunan',       en: 'Plantations',  zh: '种植园' },
  'sektor.2.judul': { id: 'Pertanian Pangan', en: 'Food Crops',   zh: '粮食作物' },
  'sektor.3.judul': { id: 'Hortikultura',     en: 'Horticulture', zh: '园艺种植' },

  /* ===== MITRA ===== */
  'mitra.eyebrow': { id: 'Kemitraan', en: 'Partnership', zh: '合作伙伴' },
  'mitra.judul': {
    id: 'Membangun Kolaborasi Jangka Panjang',
    en: 'Building Long-Term Collaboration',
    zh: '建立长期合作关系'
  },
  'mitra.desc': {
    id: 'Kami membuka peluang kemitraan strategis dengan pelaku usaha agrikultur, penyedia jasa mekanisasi, serta jaringan dealer di seluruh Indonesia',
    en: 'We are open to strategic partnerships with agricultural enterprises, mechanisation service providers, and dealer networks across Indonesia',
    zh: '我们诚邀印尼各地的农业企业、机械化服务商及经销商网络建立战略合作关系'
  },
  'mitra.btn': { id: 'Hubungi Kami', en: 'Contact Us', zh: '联系我们' },

  /* ===== FOOTER ===== */
  'footer.alamat':      { id: 'Alamat',            en: 'Address',          zh: '地址' },
  'footer.kantorPusat': { id: 'Kantor Pusat:',     en: 'Head Office:',     zh: '总部：' },
  'footer.kontak':      { id: 'Hubungi Kami',      en: 'Contact Us',       zh: '联系我们' },
  'footer.tanya':       { id: 'Punya Pertanyaan?', en: 'Have a Question?', zh: '有疑问吗？' },
  'footer.tanyaDesc': {
    id: 'Sampaikan kebutuhan unit Anda kepada tim kami. Kami siap membantu dari pemilihan spesifikasi hingga penawaran harga',
    en: 'Tell our team what you need. We can help from choosing specifications through to a price quotation',
    zh: '请告知我们您的需求。从选型到报价，我们全程为您提供支持'
  },
  'footer.btnTanya': { id: 'Hubungi via WhatsApp', en: 'Contact via WhatsApp', zh: '通过 WhatsApp 联系' },
  'footer.jualTraktor': { id: 'Jual Traktor Jakarta',         en: 'Tractors for Sale in Jakarta',       zh: '雅加达拖拉机销售' },
  'footer.jualDrone':   { id: 'Jual Drone Pertanian Jakarta', en: 'Agricultural Drones in Jakarta',     zh: '雅加达农业无人机销售' },
  'footer.jualMesin':   { id: 'Jual Mesin Pertanian Jakarta', en: 'Agricultural Machinery in Jakarta',  zh: '雅加达农业机械销售' },
  'footer.kalkulator':  { id: 'Kalkulator Pertanian',         en: 'Agricultural Calculator',            zh: '农业计算器' },

  /* ===== MODAL PRODUK ===== */
  'modal.kegunaan':    { id: 'Keunggulan',         en: 'Key Features',     zh: '产品优势' },
  'modal.spesifikasi': { id: 'Spesifikasi',        en: 'Specifications',   zh: '技术参数' },
  'modal.tanyaWA':     { id: 'Tanya via WhatsApp', en: 'Ask via WhatsApp', zh: '通过 WhatsApp 咨询' },
  'modal.tutup':       { id: 'Tutup',              en: 'Close',            zh: '关闭' },
  'modal.brosur':      { id: 'Download PDF',       en: 'Download PDF',     zh: '下载 PDF' },
  'modal.detail':      { id: 'Lihat Halaman Lengkap', en: 'View Full Page', zh: '查看完整页面' },

  /* ===== HALAMAN DETAIL PRODUK ===== */
  'detail.ctaJudul':   { id: 'Tanya harga & ketersediaan unit', en: 'Ask for price & availability', zh: '咨询价格与库存' },
  'detail.ctaDesc':    { id: 'Tim kami siap membantu memilih unit yang sesuai kebutuhan lahan Anda.', en: 'Our team is ready to help you choose the right unit for your land.', zh: '我们的团队随时帮助您选择适合您土地的机型。' },
  'detail.lainnya':    { id: 'Produk Lainnya',     en: 'Other Products',   zh: '其他产品' },
  'detail.semua':      { id: 'Lihat semua produk', en: 'View all products', zh: '查看全部产品' },
  'detail.diagramJudul': { id: 'Bagian & Dimensi Unit', en: 'Unit Parts & Dimensions', zh: '整机部件与尺寸' },
  'detail.diagramKlik':  { id: 'Klik gambar untuk melihat ukuran penuh.', en: 'Click the image to view it full size.', zh: '点击图片查看大图。' },
  'detail.diagramZoom':  { id: 'Lihat ukuran penuh', en: 'View full size', zh: '查看大图' },

  /* ===== HALAMAN BRAND (UMUM) ===== */
  'brand.semuaProduk': { id: 'Semua Produk',               en: 'All Products',        zh: '全部产品' },
  'brand.katalog':     { id: 'Katalog Produk',             en: 'Product Catalogue',   zh: '产品目录' },
  'brand.pilihKat':    { id: 'Pilih Kategori Unit',        en: 'Select a Category',   zh: '选择产品类别' },
  'brand.klikKartu':   { id: 'Klik kartu produk untuk melihat kegunaan dan spesifikasi lengkap', en: 'Click a product card to view its applications and full specifications', zh: '点击产品卡片查看用途与详细参数' },
  'brand.kosong':      { id: 'Produk sedang kami siapkan', en: 'Products coming soon', zh: '产品即将上线' },

  /* ===== HALAMAN ZOOMLION ===== */
  'zl.eyebrow': { id: 'Agriculture Machinery', en: 'Agriculture Machinery', zh: '农业机械' },
  'zl.h1':      { id: 'Traktor & Mesin Pertanian di Jakarta', en: 'Tractors & Agricultural Machinery in Jakarta', zh: '雅加达拖拉机与农业机械' },
  'zl.hero': {
    id: 'Lini lengkap mesin pertanian Zoomlion — dari traktor hybrid, combine harvester, mesin tanam padi, pemanen tebu, mesin pengering, hingga baler dan implement. Dijual langsung oleh distributor resmi',
    en: 'The complete Zoomlion agricultural machinery line — from hybrid tractors and combine harvesters to rice transplanters, sugarcane harvesters, dryers, balers and implements. Sold directly by the authorised distributor',
    zh: '中联重科农业机械全系列产品——从混合动力拖拉机、联合收割机到水稻插秧机、甘蔗收割机、烘干机、打捆机及农机具。由授权经销商直接销售'
  },
  'zl.tipeUnit': { id: 'Tipe Unit', en: 'Machine Types', zh: '机型' },
  'zl.kategori': { id: 'Kategori',  en: 'Categories',    zh: '类别' },

  /* ===== HALAMAN EAVISION ===== */
  'ea.eyebrow': { id: 'Agricultural Sprayer Drone', en: 'Agricultural Sprayer Drone', zh: '农业植保无人机' },
  'ea.h1':      { id: 'Drone Sprayer Pertanian di Jakarta', en: 'Agricultural Spray Drones in Jakarta', zh: '雅加达农业植保无人机' },
  'ea.hero': {
    id: 'Drone penyemprot pertanian dengan navigasi otomatis dan sensor penghindar rintangan. Tersedia dalam beberapa kelas kapasitas untuk berbagai skala lahan',
    en: 'Agricultural sprayer drones with automated navigation and obstacle avoidance sensors. Available in several capacity classes for different field scales',
    zh: '配备自动导航与避障传感器的农业植保无人机，提供多种容量级别，适配不同规模地块'
  },

  /* ===== HALAMAN VECTORAGR ===== */
  'va.eyebrow': { id: 'Agricultural Drone', en: 'Agricultural Drone', zh: '农业无人机' },
  'va.h1':      { id: 'Drone Pertanian & Auto Steering di Jakarta', en: 'Agricultural Drones & Auto Steering in Jakarta', zh: '雅加达农业无人机与自动驾驶系统' },
  'va.hero': {
    id: 'Teknologi pertanian presisi VectorAgr — drone penyemprot, sistem kemudi otomatis, robot pertanian, hingga solusi digital untuk pengelolaan lahan',
    en: 'VectorAgr precision agriculture technology — sprayer drones, auto steering systems, agricultural rovers, and digital solutions for land management',
    zh: 'VectorAgr 精准农业技术——植保无人机、自动驾驶系统、农业机器人及土地管理数字化解决方案'
  },

  /* ===== HALAMAN ARTIKEL ===== */
  'artikel.eyebrow': { id: 'Berita & Artikel',                en: 'News & Articles',                    zh: '新闻与文章' },
  'artikel.judul':   { id: 'Wawasan Seputar Mesin Pertanian', en: 'Insights on Agricultural Machinery', zh: '农业机械资讯' },
  'artikel.desc': {
    id: 'Tips perawatan, informasi produk, dan kabar terbaru dari kami',
    en: 'Maintenance tips, product information, and our latest news',
    zh: '保养技巧、产品信息与最新动态'
  },
  'artikel.semua':   { id: 'Semua',                       en: 'All',                          zh: '全部' },
  'artikel.kosong':  { id: 'Belum ada artikel.',          en: 'No articles yet.',             zh: '暂无文章。' },
  'artikel.sumber':  { id: 'Sumber:',                     en: 'Sources:',                     zh: '资料来源：' },

  /* ===== HALAMAN KONTAK ===== */
  'kontak.eyebrow': { id: 'Hubungi Kami',             en: 'Contact Us',            zh: '联系我们' },
  'kontak.judul':   { id: 'Sampaikan Kebutuhan Anda', en: 'Tell Us What You Need', zh: '告诉我们您的需求' },
  'kontak.desc': {
    id: 'Tim kami siap membantu dari pemilihan spesifikasi unit, brosur, hingga penawaran harga',
    en: 'Our team is ready to help from specification selection and brochures through to a price quotation',
    zh: '我们的团队将为您提供从选型、宣传册到报价的全程支持'
  },
  'kontak.alamat':    { id: 'Alamat Kantor',   en: 'Office Address',  zh: '办公地址' },
  'kontak.telepon':   { id: 'Telepon',         en: 'Phone',           zh: '电话' },
  'kontak.email':     { id: 'Email',           en: 'Email',           zh: '电子邮箱' },
  'kontak.jam':       { id: 'Jam Operasional', en: 'Operating Hours', zh: '营业时间' },
  /* Isi jam operasional; versi Indonesia diambil dari config.js */
  'kontak.jamIsi':    { en: 'Monday – Friday, 08:00 – 17:00 WIB (UTC+7)', zh: '周一至周五 08:00–17:00（印尼西部时间）' },
  'kontak.formJudul': { id: 'Kirim Pesan',     en: 'Send a Message',  zh: '发送消息' },
  'kontak.formNote': {
    id: 'Isi keterangan di bawah, lalu pesan akan diteruskan ke WhatsApp kami',
    en: 'Fill in the details below and your message will be forwarded to our WhatsApp',
    zh: '填写以下信息，消息将转发至我们的 WhatsApp'
  },
  'kontak.petaEyebrow': { id: 'Lokasi',            en: 'Location',        zh: '位置' },
  'kontak.petaJudul':   { id: 'Kantor Pusat Kami', en: 'Our Head Office', zh: '我们的总部' },

  /* ===== FORM ===== */
  'form.nama':       { id: 'Nama Lengkap',          en: 'Full Name',              zh: '姓名' },
  'form.perusahaan': { id: 'Perusahaan / Instansi', en: 'Company / Organisation', zh: '公司 / 单位' },
  'form.minat':      { id: 'Produk yang Diminati',  en: 'Product of Interest',    zh: '感兴趣的产品' },
  'form.pesan':      { id: 'Pesan',                 en: 'Message',                zh: '留言' },
  'form.kirim':      { id: 'Kirim via WhatsApp',    en: 'Send via WhatsApp',      zh: '通过 WhatsApp 发送' },
  'form.phNama':     { id: 'Nama Anda',             en: 'Your name',              zh: '您的姓名' },
  'form.phOpsional': { id: 'Opsional',              en: 'Optional',               zh: '选填' },
  'form.phPesan':    { id: 'Sampaikan kebutuhan Anda', en: 'Tell us what you need', zh: '请描述您的需求' },
  'form.pilih':      { id: '— Pilih —',             en: '— Select —',             zh: '— 请选择 —' },
  'form.lain':       { id: 'Lainnya',               en: 'Other',                  zh: '其他' },

  /* ===== HALAMAN TENTANG KAMI ===== */
  'tt.eyebrow': { id: 'Tentang Kami', en: 'About Us', zh: '关于我们' },
  'tt.hero': {
    id: 'Menggerakkan Masa Depan Pertanian Indonesia',
    en: 'Driving the Future of Indonesian Agriculture',
    zh: '推动印尼农业的未来'
  },
  'tt.judul': {
    id: 'Menggerakkan Masa Depan Pertanian Indonesia',
    en: 'Driving the Future of Indonesian Agriculture',
    zh: '推动印尼农业的未来'
  },
  'tt.p1': {
    id: 'PT Diesel Agri Sukses Sejahtera adalah mitra berdedikasi dalam memajukan sektor pertanian dan perkebunan Indonesia. Sebagai distributor dan pengecer terkemuka, kami berspesialisasi dalam menyediakan mesin dan peralatan pertanian berkualitas tinggi serta drone pertanian yang dapat diandalkan oleh para petani dan pelaku usaha perkebunan.',
    en: 'PT Diesel Agri Sukses Sejahtera is a dedicated partner in advancing Indonesia\u2019s agriculture and plantation sectors. As a leading distributor and retailer, we specialise in supplying high-quality agricultural machinery, equipment, and agricultural drones that farmers and plantation businesses can rely on.',
    zh: 'PT Diesel Agri Sukses Sejahtera 致力于推动印尼农业与种植业的发展。作为领先的经销商与零售商，我们专注于提供高品质的农业机械设备与农业无人机，为农户与种植企业提供可靠支持。'
  },
  'tt.p2': {
    id: 'Kami menggabungkan yang terbaik dari dua dunia: teknologi mutakhir dari produsen internasional terpercaya, di samping dukungan bangga untuk peralatan fabrikasi lokal yang luar biasa. Pendekatan ganda ini memungkinkan kami menawarkan solusi yang terbukti secara global namun relevan secara lokal, dibuat untuk realitas pertanian Indonesia.',
    en: 'We combine the best of both worlds: cutting-edge technology from trusted international manufacturers, alongside our proud support for outstanding locally fabricated equipment. This dual approach allows us to offer solutions that are globally proven yet locally relevant, built for the realities of Indonesian farming.',
    zh: '我们兼容并蓄：既引进国际知名厂商的先进技术，也积极支持优秀的本地制造设备。这种双轨模式使我们能够提供既经过全球验证、又贴合本地实际的解决方案，真正适应印尼农业的现实需求。'
  },
  'tt.p3': {
    id: 'Kami percaya pertanian modern menuntut lebih dari sekadar alat berat. Ia membutuhkan solusi menyeluruh yang menangani setiap tahap proses pertanian dan perkebunan. Itu sebabnya misi kami melampaui sekadar menjual mesin. Kami di sini untuk memberdayakan petani dan operator agribisnis dengan peralatan yang mereka butuhkan untuk memaksimalkan efisiensi, meningkatkan hasil panen, dan membangun masa depan yang lebih berkelanjutan bagi pertanian Indonesia.',
    en: 'We believe modern agriculture demands more than heavy machinery alone. It requires comprehensive solutions that address every stage of the farming and plantation process. That is why our mission goes beyond simply selling machines. We are here to empower farmers and agribusiness operators with the equipment they need to maximise efficiency, increase yields, and build a more sustainable future for Indonesian agriculture.',
    zh: '我们相信，现代农业所需的不仅是重型机械，更需要覆盖种植与耕作各环节的全面解决方案。因此，我们的使命远不止于销售机械。我们致力于为农户与农业企业提供所需装备，帮助他们提升效率、增加产量，共同构建印尼农业更可持续的未来。'
  },
  'tt.vmEyebrow': { id: 'Arah Kami',   en: 'Our Direction',    zh: '我们的方向' },
  'tt.vmJudul':   { id: 'Visi & Misi', en: 'Vision & Mission', zh: '愿景与使命' },
  'tt.visiJudul': { id: 'Visi',        en: 'Vision',           zh: '愿景' },
  'tt.misiJudul': { id: 'Misi',        en: 'Mission',          zh: '使命' },
  'tt.visi': {
    id: 'Menjadi mitra paling terpercaya di Indonesia dalam mekanisasi pertanian, mendorong produktivitas, keberlanjutan, dan kemakmuran bagi petani dan pelaku usaha perkebunan di seluruh Indonesia.',
    en: 'To become Indonesia\u2019s most trusted partner in agricultural mechanisation, driving productivity, sustainability, and prosperity for farmers and plantation businesses across the country.',
    zh: '成为印尼农业机械化领域最值得信赖的合作伙伴，为全国农户与种植企业带来更高的生产力、可持续性与繁荣。'
  },
  'tt.misi1': {
    id: 'Menyediakan mesin pertanian berkualitas tinggi dan andal dari produsen internasional terkemuka',
    en: 'Supplying high-quality, reliable agricultural machinery from leading international manufacturers',
    zh: '提供来自国际知名厂商的高品质、可靠农业机械'
  },
  'tt.misi2': {
    id: 'Memperjuangkan dan mempromosikan peralatan fabrikasi lokal yang unggul di samping teknologi global',
    en: 'Championing and promoting outstanding locally fabricated equipment alongside global technology',
    zh: '在引进全球技术的同时，积极推广优秀的本地制造设备'
  },
  'tt.misi3': {
    id: 'Menyediakan solusi menyeluruh yang mendukung setiap tahap operasi pertanian dan perkebunan',
    en: 'Providing comprehensive solutions that support every stage of farming and plantation operations',
    zh: '提供覆盖种植与耕作各环节的全面解决方案'
  },
  'tt.misi4': {
    id: 'Memberdayakan petani dan operator agribisnis dengan peralatan yang memaksimalkan efisiensi dan hasil panen',
    en: 'Empowering farmers and agribusiness operators with equipment that maximises efficiency and yields',
    zh: '为农户与农业企业提供装备，助力效率与产量最大化'
  },
  'tt.misi5': {
    id: 'Membangun kemitraan jangka panjang yang didasarkan pada kepercayaan, layanan, dan pertumbuhan bersama',
    en: 'Building long-term partnerships founded on trust, service, and shared growth',
    zh: '建立以信任、服务与共同成长为基础的长期合作关系'
  },
  'tt.misi6': {
    id: 'Berkontribusi pada keberlanjutan dan kemajuan sektor pertanian Indonesia',
    en: 'Contributing to the sustainability and advancement of Indonesia\u2019s agricultural sector',
    zh: '为印尼农业的可持续发展与进步作出贡献'
  },

  /* ===== MENU WHATSAPP & TOMBOL BAGIKAN ===== */
  'wa.judul':          { id: 'Ada yang bisa kami bantu?', en: 'How can we help?', zh: '需要什么帮助？' },
  'wa.harga':          { id: 'Tanya harga & ketersediaan', en: 'Ask about price & availability', zh: '咨询价格与库存' },
  'wa.konsultasi':     { id: 'Konsultasi memilih unit', en: 'Help choosing a unit', zh: '选型咨询' },
  'wa.brosur':         { id: 'Minta brosur / katalog', en: 'Request a brochure / catalogue', zh: '索取宣传册/产品目录' },
  'wa.lain':           { id: 'Pertanyaan lain', en: 'Other questions', zh: '其他问题' },
  'wa.tutup':          { id: 'Tutup', en: 'Close', zh: '关闭' },
  'wa.online':         { id: 'Tim kami sedang online', en: 'Our team is online', zh: '团队在线' },
  'wa.offline':        { id: 'Di luar jam kerja — kami balas di jam kerja berikutnya', en: 'Outside working hours — we will reply during the next working hours', zh: '非工作时间，我们将在下个工作时段回复' },
  'cari.tombol':       { id: 'Cari produk', en: 'Search products', zh: '搜索产品' },
  'cari.placeholder':  { id: 'Cari traktor, drone, combine, RK504…', en: 'Search tractors, drones, combines, RK504…', zh: '搜索拖拉机、无人机、收割机、RK504…' },
  'cari.contoh':       { id: 'Coba cari:', en: 'Try searching:', zh: '试试搜索：' },
  'cari.memuat':       { id: 'Memuat…', en: 'Loading…', zh: '加载中…' },
  'cari.gagal':        { id: 'Gagal memuat data produk. Coba muat ulang halaman.', en: 'Could not load product data. Please reload the page.', zh: '无法加载产品数据，请刷新页面。' },
  'cari.kosong':       { id: 'Tidak ada produk untuk "{q}". Tanyakan langsung ke tim kami:', en: 'No products found for "{q}". Ask our team directly:', zh: '未找到“{q}”相关产品，请直接咨询我们的团队：' },
  'cari.tanyaWA':      { id: 'Tanya via WhatsApp', en: 'Ask on WhatsApp', zh: '通过WhatsApp咨询' },
  'dilihat.judul':     { id: 'Terakhir Anda Lihat', en: 'Recently Viewed', zh: '最近浏览' },
  'dilihat.hapus':     { id: 'Hapus riwayat', en: 'Clear history', zh: '清除记录' },
  'bagikan.label':     { id: 'Bagikan:', en: 'Share:', zh: '分享：' },
  'bagikan.bagikan':   { id: 'Bagikan', en: 'Share', zh: '分享' },
  'bagikan.salin':     { id: 'Salin link', en: 'Copy link', zh: '复制链接' },
  'bagikan.tersalin':  { id: 'Link tersalin!', en: 'Link copied!', zh: '链接已复制！' },

  /* ===== BANDINGKAN PRODUK (bandingkan.html) ===== */
  'banding.langkah1':  { id: '1. Pilih kategori', en: '1. Choose a category', zh: '1. 选择类别' },
  'banding.langkah2':  { id: '2. Pilih unit yang ingin dibandingkan', en: '2. Choose the units to compare', zh: '2. 选择要对比的机型' },
  'banding.petunjuk':  { id: 'Ketuk foto untuk memilih atau membatalkan. Maksimal {n} unit.', en: 'Tap a photo to select or deselect. Up to {n} units.', zh: '点击图片选择或取消，最多{n}台。' },
  'banding.minimal':   { id: 'Pilih minimal 2 unit untuk mulai membandingkan.', en: 'Select at least 2 units to start comparing.', zh: '请至少选择2台开始对比。' },
  'banding.hapus':     { id: 'Hapus dari perbandingan', en: 'Remove from comparison', zh: '从对比中移除' },
  'banding.hanyaBeda': { id: 'Tampilkan hanya yang berbeda', en: 'Show differences only', zh: '仅显示不同项' },
  'banding.spek':      { id: 'Spesifikasi', en: 'Specification', zh: '规格' },
  'banding.samaSemua': { id: 'Semua spesifikasi yang tercatat sama.', en: 'All recorded specifications are the same.', zh: '所有已记录的规格均相同。' },
  'banding.tanya':     { id: 'Tanya Harga', en: 'Ask for Price', zh: '询价' },
  'banding.detail':    { id: 'Bandingkan dengan unit lain →', en: 'Compare with other units →', zh: '与其他机型对比 →' },
  'banding.tombol':    { id: 'Bandingkan', en: 'Compare', zh: '对比' },
  'banding.catatan':   { id: 'Baris yang disorot menandakan spesifikasi yang berbeda. Spesifikasi dapat berubah sesuai kebijakan pabrikan; hubungi kami untuk data terbaru.', en: 'Highlighted rows mark specifications that differ. Specifications may change according to the manufacturer; contact us for the latest data.', zh: '高亮行表示规格不同。规格可能根据厂商政策变更，请联系我们获取最新数据。' },
  'nav.bandingkanSub': { id: 'Spesifikasi berdampingan', en: 'Side-by-side specs', zh: '规格并排对比' },
  'footer.faq':        { id: 'FAQ', en: 'FAQ', zh: '常见问题' },
  'footer.kamus':      { id: 'Kamus Istilah Pertanian', en: 'Agricultural Glossary', zh: '农业术语词典' },
  'footer.bandingkan': { id: 'Bandingkan Produk', en: 'Compare Products', zh: '产品对比' },
  'judul.bandingkan':  { en: 'Compare Tractors & Agricultural Drones | DASS', zh: '拖拉机与农业无人机对比 | DASS' },

  /* ===== KALKULATOR (kalkulator.html) ===== */
  'kalk.droneJudul':   { id: 'Kalkulator Semprot Drone', en: 'Drone Spraying Calculator', zh: '无人机喷洒计算器' },
  'kalk.droneDesk':    { id: 'Bandingkan waktu, air, dan tenaga kerja semprot drone dengan penyemprotan manual.', en: 'Compare drone spraying time, water, and labour with manual spraying.', zh: '比较无人机喷洒与人工喷洒的时间、用水和人工。' },
  'kalk.traktorJudul': { id: 'Kalkulator Pilih Traktor', en: 'Tractor Selection Calculator', zh: '拖拉机选型计算器' },
  'kalk.traktorDesk':  { id: 'Temukan kelas tenaga traktor yang sesuai luas dan jenis lahan Anda.', en: 'Find the tractor power class that suits your land size and type.', zh: '根据您的土地面积和类型找到合适的拖拉机马力等级。' },
  'kalk.luas':         { id: 'Luas lahan (hektar)', en: 'Land area (hectares)', zh: '土地面积（公顷）' },
  'kalk.drone':        { id: 'Pilih drone', en: 'Choose a drone', zh: '选择无人机' },
  'kalk.dosis':        { id: 'Volume semprot drone (liter/ha)', en: 'Drone spray volume (litres/ha)', zh: '无人机喷洒量（升/公顷）' },
  'kalk.dosisInfo':    { id: 'Umumnya 10–20 L/ha, tergantung tanaman dan pestisida.', en: 'Usually 10–20 L/ha, depending on the crop and pesticide.', zh: '一般为10–20升/公顷，视作物和农药而定。' },
  'kalk.lahan':        { id: 'Jenis lahan', en: 'Land type', zh: '土地类型' },
  'kalk.lahan.sawah':  { id: 'Sawah (padi)', en: 'Rice field (paddy)', zh: '水田（水稻）' },
  'kalk.lahan.kering': { id: 'Lahan kering / tegalan (jagung, palawija)', en: 'Dryland (corn, secondary crops)', zh: '旱地（玉米、杂粮）' },
  'kalk.lahan.kebun':  { id: 'Perkebunan (sawit, karet)', en: 'Plantation (oil palm, rubber)', zh: '种植园（油棕、橡胶）' },
  'kalk.lahan.tebu':   { id: 'Kebun tebu', en: 'Sugarcane', zh: '甘蔗园' },
  'kalk.hasil':        { id: 'Hasil Estimasi', en: 'Estimated Result', zh: '估算结果' },
  'kalk.isiDulu':      { id: 'Isi luas lahan untuk melihat hasil.', en: 'Enter the land area to see the result.', zh: '请输入土地面积以查看结果。' },
  'kalk.kapasitas':    { id: 'Kapasitas kerja drone', en: 'Drone work rate', zh: '无人机作业效率' },
  'kalk.waktuDrone':   { id: 'Waktu semprot dengan drone', en: 'Spraying time by drone', zh: '无人机喷洒时间' },
  'kalk.isiUlang':     { id: 'Isi ulang tangki', en: 'Tank refills', zh: '药箱加注次数' },
  'kalk.airDrone':     { id: 'Kebutuhan air drone', en: 'Water needed (drone)', zh: '无人机用水量' },
  'kalk.waktuManual':  { id: 'Waktu semprot manual', en: 'Manual spraying time', zh: '人工喷洒时间' },
  'kalk.hariOrang':    { id: 'hari kerja (1 orang)', en: 'work days (1 person)', zh: '个工作日（1人）' },
  'kalk.airManual':    { id: 'Kebutuhan air manual', en: 'Water needed (manual)', zh: '人工用水量' },
  'kalk.airHemat':     { id: 'Air yang dihemat', en: 'Water saved', zh: '节约用水' },
  'kalk.haPerHari':    { id: 'Luas semprot drone per hari (8 jam)', en: 'Area sprayed by drone per day (8 h)', zh: '无人机每天喷洒面积（8小时）' },
  'kalk.setara':       { id: '1 drone setara dengan', en: '1 drone equals', zh: '1架无人机相当于' },
  'kalk.pekerja':      { id: 'pekerja semprot manual', en: 'manual sprayer workers', zh: '名人工喷洒工人' },
  'kalk.miniJudul':    { id: 'Hitung Kebutuhan Semprot', en: 'Spraying Calculator for', zh: '喷洒需求计算：' },
  'kalk.miniDesk':     { id: 'Isi luas lahan Anda untuk melihat perkiraan waktu kerja dan tenaga yang dihemat.', en: 'Enter your land area to see the estimated work time and labour saved.', zh: '输入您的土地面积，查看预计作业时间和节省的人工。' },
  'kalk.lengkap':      { id: 'Bandingkan dengan drone lain di kalkulator lengkap', en: 'Compare with other drones in the full calculator', zh: '在完整计算器中与其他无人机比较' },
  'kalk.lengkapTraktor': { id: 'Buka kalkulator pilih traktor', en: 'Open the tractor selection calculator', zh: '打开拖拉机选型计算器' },
  'kalk.cocokJudul':   { id: 'Cocok untuk Lahan', en: 'Suitable Land', zh: '适用土地' },
  'kalk.cocokDesk':    { id: 'Perkiraan luas lahan yang sesuai untuk {nama} (kelas tenaga {hp}).', en: 'Estimated land sizes suited to the {nama} ({hp} power class).', zh: '{nama}（功率等级 {hp}）适用的土地面积估算。' },
  'kalk.hingga':       { id: 'hingga {b} ha', en: 'up to {b} ha', zh: '{b}公顷以内' },
  'kalk.semuaLuas':    { id: 'semua luas lahan', en: 'all land sizes', zh: '各种面积' },
  'kalk.diAtas':       { id: 'di atas {a} ha', en: 'over {a} ha', zh: '{a}公顷以上' },
  'kalk.produkCocok':  { id: '✓ {nama} termasuk dalam kelas tenaga ini.', en: '✓ The {nama} is in this power class.', zh: '✓ {nama}属于该马力等级。' },
  'kalk.produkKurang': { id: '{nama} kurang sesuai untuk lahan ini. Lihat unit yang lebih cocok di bawah.', en: 'The {nama} is less suited to this land. See better-matched units below.', zh: '{nama}不太适合该土地，请参考下方更合适的机型。' },
  'kalk.jam':          { id: 'jam', en: 'h', zh: '小时' },
  'kalk.menit':        { id: 'menit', en: 'min', zh: '分钟' },
  'kalk.kelasHP':      { id: 'Kelas tenaga yang disarankan', en: 'Recommended power class', zh: '建议马力等级' },
  'kalk.catatanTraktor': { id: 'Traktor Zoomlion di kelas tenaga ini:', en: 'Zoomlion tractors in this power class:', zh: '该马力等级的中联重科拖拉机：' },
  'kalk.ctaDrone':     { id: 'Konsultasi Drone via WhatsApp', en: 'Ask About Drones on WhatsApp', zh: '通过WhatsApp咨询无人机' },
  'kalk.ctaTraktor':   { id: 'Konsultasi Traktor via WhatsApp', en: 'Ask About Tractors on WhatsApp', zh: '通过WhatsApp咨询拖拉机' },
  'kalk.asumsi':       { id: 'Asumsi: drone terbang 5 m/detik dengan efisiensi kerja 50% (belok, isi ulang, ganti baterai); 1 hari kerja = 8 jam; semprot manual 300 L/ha dan 1 ha per orang per hari. Hasil adalah estimasi umum, bukan penawaran resmi.', en: 'Assumptions: drone flies at 5 m/s with 50% working efficiency (turns, refills, battery swaps); 1 working day = 8 hours; manual spraying uses 300 L/ha and covers 1 ha per person per day. Results are general estimates, not an official quotation.', zh: '假设：无人机飞行速度5米/秒，作业效率50%（转弯、加药、换电池）；每个工作日按8小时计；人工喷洒每公顷300升，每人每天1公顷。结果仅为一般估算，并非正式报价。' },
  'kalk.asumsiTraktor': { id: 'Rekomendasi bersifat umum. Kebutuhan sebenarnya juga dipengaruhi kondisi tanah, implement yang dipakai, dan target waktu kerja. Konsultasikan dengan tim kami.', en: 'Recommendations are general. Actual needs also depend on soil conditions, the implements used, and target work time. Consult our team.', zh: '建议仅供参考。实际需求还取决于土壤条件、所用农具和作业时间目标，请咨询我们的团队。' },
};


/* =====================================================================
   2. NAMA KATEGORI PRODUK
   ===================================================================== */
const KATEGORI_TEKS = {
  /* --- Zoomlion --- */
  'hybrid':    { id: 'Hybrid Product',      en: 'Hybrid Product',      zh: '混合动力产品' },
  'tractor':   { id: 'Tractor',             en: 'Tractor',             zh: '拖拉机' },
  'planter':   { id: 'Rice Transplanter',   en: 'Rice Transplanter',   zh: '水稻插秧机' },
  'harvester': { id: 'Combine Harvester',   en: 'Combine Harvester',   zh: '联合收割机' },
  'sugarcane': { id: 'Sugarcane Harvester', en: 'Sugarcane Harvester', zh: '甘蔗收割机' },
  'dryer':     { id: 'Dryer',               en: 'Dryer',               zh: '烘干机' },
  'baler':     { id: 'Baler',               en: 'Baler',               zh: '打捆机' },
  'implement': { id: 'Implement',           en: 'Implement',           zh: '农机具' },

  /* --- EAVision --- */
  'sprayer-drone': { id: 'Sprayer Drone', en: 'Sprayer Drone', zh: '植保无人机' },

  /* --- VectorAgr --- */
  'va-drone':    { id: 'Agricultural Drone',   en: 'Agricultural Drone',   zh: '农业无人机' },
  'va-steering': { id: 'Auto Steering System', en: 'Auto Steering System', zh: '自动驾驶系统' },
  'va-rover':    { id: 'Agricultural Rover',   en: 'Agricultural Rover',   zh: '农业机器人' },
  'va-digital':  { id: 'Digital Ag Solution',  en: 'Digital Ag Solution',  zh: '数字农业解决方案' }
};


/* =====================================================================
   3. LABEL SPESIFIKASI
   Key = label persis seperti di data produk. 1 key = 1 arti saja!
   ===================================================================== */
const SPEC_TEKS = {
  // --- VectorAgr: rover ---
'Sistem Penggerak': { en: 'Drive System', zh: '驱动系统' },
'Modul Kerja': { en: 'Work Modules', zh: '作业模块' },
'Kapasitas Muatan': { en: 'Load Capacity', zh: '载重能力' },
'Muatan Maksimum per Modul': { en: 'Max. Payload per Module', zh: '单模块最大载重' },
'Laju Aliran Semprot': { en: 'Spray Flow Rate', zh: '喷洒流量' },
'Lebar Semprot Maksimum': { en: 'Max. Spray Width', zh: '最大喷幅' },
'Kemampuan Tanjakan Maksimum': { en: 'Max. Gradeability', zh: '最大爬坡能力' },
'Kemiringan Maks. Saat Bermuatan': { en: 'Max. Slope Under Load', zh: '负载最大坡度' },
'Waktu Operasi': { en: 'Operating Time', zh: '作业时间' },
'Jangkauan Sensor Kedalaman': { en: 'Depth Sensing Range', zh: '深度感知距离' },
'Bidang Pandang Sensor': { en: 'Sensor Field of View', zh: '传感器视场角' },

// --- VectorAgr: digital ag ---
'Pemetaan Lahan': { en: 'Field Mapping', zh: '地块测绘' },
'Sumber Data': { en: 'Data Sources', zh: '数据来源' },
'Jenis Peta': { en: 'Map Types', zh: '地图类型' },
'Aplikasi VRA': { en: 'VRA Application', zh: '变量作业应用' },
'Format Impor': { en: 'Import Formats', zh: '导入格式' },
'Format Ekspor': { en: 'Export Formats', zh: '导出格式' },
'Sinkronisasi Data': { en: 'Data Sync', zh: '数据同步' },
'Perangkat Terhubung': { en: 'Connected Devices', zh: '兼容设备' },
  // --- VectorAgr: drone ---
'Model Produk': { en: 'Product Model', zh: '产品型号' },
'Konfigurasi Rotor': { en: 'Rotor Configuration', zh: '旋翼布局' },
'Dimensi (Terbuka)': { en: 'Dimensions (Unfolded)', zh: '展开尺寸' },
'Dimensi (Terlipat)': { en: 'Dimensions (Folded)', zh: '折叠尺寸' },
'Wheelbase Maksimum': { en: 'Max. Wheelbase', zh: '最大轴距' },
'Berat Lepas Landas Maksimum': { en: 'Max. Takeoff Weight', zh: '最大起飞重量' },
'Berat Kosong (Tanpa Baterai)': { en: 'Empty Weight (Without Battery)', zh: '空机重量（不含电池）' },
'Muatan Maksimum': { en: 'Max. Payload', zh: '最大载重' },
'Muatan Semprot': { en: 'Spraying Payload', zh: '喷洒载重' },
'Muatan Tebar Maksimum': { en: 'Max. Spreading Payload', zh: '最大播撒载重' },
'Kapasitas Tangki Semprot': { en: 'Spray Tank Capacity', zh: '药箱容量' },
'Kapasitas Tangki Tebar': { en: 'Spreading Tank Capacity', zh: '播撒箱容量' },
'Laju Aliran Maksimum': { en: 'Max. Flow Rate', zh: '最大流量' },
'Laju Debit Maksimum': { en: 'Max. Discharge Rate', zh: '最大下料速度' },
'Lebar Semprot Efektif': { en: 'Effective Spray Width', zh: '有效喷幅' },
'Lebar Tebar': { en: 'Spreading Width', zh: '播撒幅宽' },
'Ukuran Partikel Tebar': { en: 'Granule Size', zh: '适用颗粒直径' },
'Jenis Nozel': { en: 'Nozzle Type', zh: '喷头类型' },
'Ukuran Droplet': { en: 'Droplet Size', zh: '雾化粒径' },
'Akurasi Posisi RTK': { en: 'RTK Positioning Accuracy', zh: 'RTK 定位精度' },
'Waktu Hover (Tanpa Muatan)': { en: 'Hover Time (No Load)', zh: '空载悬停时间' },
'Waktu Hover (Muatan Penuh)': { en: 'Hover Time (Full Load)', zh: '满载悬停时间' },
'Daya Motor': { en: 'Motor Power', zh: '电机功率' },
'Daya Dorong Maks. per Motor': { en: 'Max. Thrust per Motor', zh: '单电机最大拉力' },
'Diameter Baling-Baling': { en: 'Propeller Diameter', zh: '桨叶直径' },
'Baterai': { en: 'Battery', zh: '电池' },
'Pengisian Cepat': { en: 'Fast Charging', zh: '快充时间' },
'Charger': { en: 'Charger', zh: '充电器' },
'Remote Control': { en: 'Remote Controller', zh: '遥控器' },
'Layar Remote': { en: 'Remote Display', zh: '遥控器屏幕' },
'Jangkauan Transmisi Gambar': { en: 'Image Transmission Range', zh: '图传距离' },
'Daya Tahan Remote': { en: 'Remote Battery Life', zh: '遥控器续航' },
'Kamera FPV': { en: 'FPV Camera', zh: 'FPV 摄像头' },
'Radar Penghindar Rintangan': { en: 'Obstacle Avoidance Radar', zh: '避障雷达' },
'Kecepatan Penghindaran Maks.': { en: 'Max. Obstacle Avoidance Speed', zh: '最大避障速度' },
'Lampu Sorot': { en: 'Spotlights', zh: '探照灯' },

// --- VectorAgr: auto steering ---
'Layar': { en: 'Display', zh: '显示屏' },
'Layar Sentuh': { en: 'Touchscreen', zh: '触摸屏' },
'Resolusi': { en: 'Resolution', zh: '分辨率' },
'Kecerahan': { en: 'Brightness', zh: '亮度' },
'Prosesor': { en: 'Processor', zh: '处理器' },
'Memori': { en: 'Memory', zh: '存储' },
'Sistem Operasi': { en: 'Operating System', zh: '操作系统' },
'Konektivitas': { en: 'Connectivity', zh: '通信' },
'Kamera': { en: 'Camera', zh: '摄像头' },
'Tegangan Input': { en: 'Input Voltage', zh: '输入电压' },
'Dimensi Layar': { en: 'Display Dimensions', zh: '显示屏尺寸' },
'Berat Layar': { en: 'Display Weight', zh: '显示屏重量' },
'Proteksi Layar': { en: 'Display Ingress Protection', zh: '显示屏防护等级' },
'Suhu Operasional': { en: 'Operating Temperature', zh: '工作温度' },
'Receiver GNSS': { en: 'GNSS Receiver', zh: 'GNSS 接收机' },
'Radio': { en: 'Radio', zh: '电台' },
'Akurasi Posisi': { en: 'Positioning Accuracy', zh: '定位精度' },
'Proteksi Receiver': { en: 'Receiver Ingress Protection', zh: '接收机防护等级' },
'Tegangan Motor Kemudi': { en: 'Steering Motor Voltage', zh: '转向电机电压' },
'Torsi Motor Kemudi': { en: 'Steering Motor Torque', zh: '转向电机扭矩' },
'Torsi Maksimum': { en: 'Max. Torque', zh: '最大扭矩' },
'Daya Motor Kemudi': { en: 'Steering Motor Power', zh: '转向电机功率' },
'Kecepatan Putar Maks.': { en: 'Max. Rotation Speed', zh: '最大转速' },
'Proteksi Motor': { en: 'Motor Ingress Protection', zh: '电机防护等级' },
'Diameter Setir': { en: 'Steering Wheel Diameter', zh: '方向盘直径' },
'Mode Jalur': { en: 'Guidance Patterns', zh: '导航路径模式' },
'Antarmuka I/O': { en: 'I/O Interfaces', zh: 'I/O 接口' },
'Daya Terukur': { en: 'Rated Power', zh: '额定功率' },
'Standar Ketahanan': { en: 'Durability Standards', zh: '可靠性标准' },
  /* --- Drone EAVision --- */
  'Jarak Sumbu Roda Maksimum':    { id: 'Jarak Sumbu Roda Maksimum',    en: 'Max. Wheelbase',              zh: '最大轴距' },
  'Dimensi (Terlipat)':           { id: 'Dimensi (Terlipat)',           en: 'Dimensions (Folded)',         zh: '尺寸（折叠）' },
  'Dimensi (Terbentang)':         { id: 'Dimensi (Terbentang)',         en: 'Dimensions (Unfolded)',       zh: '尺寸（展开）' },
  'Muatan Semprot':               { id: 'Muatan Semprot',               en: 'Spraying Payload',            zh: '喷洒载重' },
  'Berat Drone (dengan Baterai)': { id: 'Berat Drone (dengan Baterai)', en: 'Drone Weight (with Battery)', zh: '整机重量（含电池）' },
  'Lebar Semprotan Efektif':      { id: 'Lebar Semprotan Efektif',      en: 'Effective Spray Width',       zh: '有效喷幅' },
  'Waktu Melayang':               { id: 'Waktu Melayang',               en: 'Hover Time',                  zh: '悬停时间' },
  'Ukuran Tetesan':               { id: 'Ukuran Tetesan',               en: 'Droplet Size',                zh: '雾滴粒径' },
  'Rating IP':                    { id: 'Rating IP',                    en: 'IP Rating',                   zh: '防护等级' },
  'Laju Alir Maksimum':           { id: 'Laju Alir Maksimum',           en: 'Max. Flow Rate',              zh: '最大流量' },
  'Jumlah Nosel Standar':         { id: 'Jumlah Nosel Standar',         en: 'Standard Nozzles',            zh: '标配喷头数' },
  'Muatan Angkat':                { id: 'Muatan Angkat',                en: 'Lifting Payload',             zh: '吊运载重' },
  'Waktu Kerja / Pengisian':      { id: 'Waktu Kerja / Pengisian',      en: 'Work / Charge Time',          zh: '作业/充电时间' },
  'Muatan Penebar':               { id: 'Muatan Penebar',               en: 'Spreader Rated Load',         zh: '播撒额定载重' },
  'Daya Pengisian':               { id: 'Daya Pengisian',               en: 'Charging Power',              zh: '充电功率' },

  /* --- Umum --- */
  'Model':             { id: 'Model',             en: 'Model',             zh: '型号' },
  'Kode Varian':       { id: 'Kode Varian',       en: 'Variant Code',      zh: '型号编码' },
  'Konfigurasi':       { id: 'Konfigurasi',       en: 'Configuration',     zh: '配置' },
  'Fungsi':            { id: 'Fungsi',            en: 'Functions',         zh: '功能' },
  'Sistem Kontrol':    { id: 'Sistem Kontrol',    en: 'Control System',    zh: '控制系统' },
  'Sistem Operasi':    { id: 'Sistem Operasi',    en: 'Operating System',  zh: '操作方式' },
  'Mode Operasi':      { id: 'Mode Operasi',      en: 'Operating Mode',    zh: '作业模式' },
  'Telematika':        { id: 'Telematika',        en: 'Remote Telematics', zh: '远程监控' },
  'Sistem Pemantauan': { id: 'Sistem Pemantauan', en: 'Monitoring System', zh: '监控系统' },

  /* --- Mesin & bahan bakar --- */
  'Tenaga Mesin':         { id: 'Tenaga Mesin',         en: 'Engine Power',        zh: '发动机功率' },
  'Daya Mesin':           { id: 'Daya Mesin',           en: 'Engine Power',        zh: '发动机功率' },
  'Model Mesin':          { id: 'Model Mesin',          en: 'Engine Model',        zh: '发动机型号' },
  'Tipe Mesin':           { id: 'Tipe Mesin',           en: 'Engine Type',         zh: '发动机类型' },
  'Kapasitas Mesin':      { id: 'Kapasitas Mesin',      en: 'Engine Displacement', zh: '发动机排量' },
  'Putaran Mesin':        { id: 'Putaran Mesin',        en: 'Rated Speed',         zh: '额定转速' },
  'Cadangan Torsi':       { id: 'Cadangan Torsi',       en: 'Torque Reserve',      zh: '扭矩储备' },
  'Standar Emisi':        { id: 'Standar Emisi',        en: 'Emission Standard',   zh: '排放标准' },
  'Konsumsi Bahan Bakar': { id: 'Konsumsi Bahan Bakar', en: 'Fuel Consumption',    zh: '燃油消耗' },
  'Kapasitas Tangki BBM': { id: 'Kapasitas Tangki BBM', en: 'Fuel Tank Capacity',  zh: '油箱容量' },

  /* --- Motor listrik (hybrid) --- */
  'Daya Motor': { id: 'Daya Motor', en: 'Rated Motor Output', zh: '电机额定功率' },
  'Tegangan':   { id: 'Tegangan',   en: 'Rated Voltage',      zh: '额定电压' },

  /* --- Transmisi & penggerak --- */
  'Transmisi':        { id: 'Transmisi',        en: 'Transmission',        zh: '变速箱' },
  'Sistem Transmisi': { id: 'Sistem Transmisi', en: 'Transmission System', zh: '传动系统' },
  'Konfigurasi Gigi': { id: 'Konfigurasi Gigi', en: 'Gear Configuration',  zh: '挡位配置' },
  'Displacement HST': { id: 'Displacement HST', en: 'HST Displacement',    zh: '静液压排量' },
  'Sistem Gerak':     { id: 'Sistem Gerak',     en: 'Drive System',        zh: '驱动系统' },
  'Sistem Penggerak': { id: 'Sistem Penggerak', en: 'Drive Type',          zh: '行走方式' },
  'Kopling':          { id: 'Kopling',          en: 'Clutch',              zh: '离合器' },
  'PTO':              { id: 'PTO',              en: 'PTO',                 zh: '动力输出轴' },
  'Putaran PTO':      { id: 'Putaran PTO',      en: 'PTO Speed',           zh: '动力输出轴转速' },

  /* --- Dimensi & bobot --- */
  'Dimensi':                { id: 'Dimensi',                en: 'Dimensions',             zh: '外形尺寸' },
  'Dimensi (P × L × T)':    { id: 'Dimensi (P × L × T)',    en: 'Dimensions (L × W × H)', zh: '外形尺寸（长×宽×高）' },
  'Dimensi Terbuka':        { id: 'Dimensi Terbuka',        en: 'Unfolded Dimensions',    zh: '展开尺寸' },
  'Dimensi Terlipat':       { id: 'Dimensi Terlipat',       en: 'Folded Dimensions',      zh: '折叠尺寸' },
  'Dimensi Transportasi':   { id: 'Dimensi Transportasi',   en: 'Transport Dimensions',   zh: '运输尺寸' },
  'Dimensi Operasional':    { id: 'Dimensi Operasional',    en: 'Working Dimensions',     zh: '作业尺寸' },
  'Jarak Sumbu Roda':       { id: 'Jarak Sumbu Roda',       en: 'Wheelbase',              zh: '轴距' },
  'Jarak Rendah Ketanah':   { id: 'Jarak Rendah Ketanah',   en: 'Ground Clearance',       zh: '最小离地间隙' },
  'Berat':                  { id: 'Berat',                  en: 'Weight',                 zh: '重量' },
  'Berat Operasi':          { id: 'Berat Operasi',          en: 'Operating Weight',       zh: '整机重量' },
  'Berat Operasi Minimum':  { id: 'Berat Operasi Minimum',  en: 'Min. Operating Weight',  zh: '最小工作重量' },
  'Berat Operasi Maksimum': { id: 'Berat Operasi Maksimum', en: 'Max. Operating Weight',  zh: '最大工作重量' },
  'Berat Kosong':           { id: 'Berat Kosong',           en: 'Empty Weight',           zh: '空机重量' },

  /* --- Roda, kemudi & kecepatan --- */
  'Ukuran Ban':             { id: 'Ukuran Ban',             en: 'Tyre Size',           zh: '轮胎规格' },
  'Jenis Roda':             { id: 'Jenis Roda',             en: 'Wheel Type',          zh: '车轮类型' },
  'Diameter Roda':          { id: 'Diameter Roda',          en: 'Wheel Diameter',      zh: '车轮直径' },
  'Lebar Jejak Roda':       { id: 'Lebar Jejak Roda',       en: 'Wheel Track',         zh: '轮距' },
  'Sistem Kemudi':          { id: 'Sistem Kemudi',          en: 'Steering System',     zh: '转向系统' },
  'Radius Putar Minimum':   { id: 'Radius Putar Minimum',   en: 'Min. Turning Radius', zh: '最小转弯半径' },
  'Sistem Rem':             { id: 'Sistem Rem',             en: 'Braking System',      zh: '制动系统' },
  'Kemampuan Tanjakan':     { id: 'Kemampuan Tanjakan',     en: 'Max. Gradeability',   zh: '最大爬坡度' },
  'Kecepatan':              { id: 'Kecepatan',              en: 'Speed',               zh: '速度' },
  'Kecepatan Maksimum':     { id: 'Kecepatan Maksimum',     en: 'Max. Speed',          zh: '最高速度' },
  'Kecepatan Operasi':      { id: 'Kecepatan Operasi',      en: 'Working Speed',       zh: '作业速度' },
  'Kecepatan Kerja':        { id: 'Kecepatan Kerja',        en: 'Operating Speed',     zh: '作业速度' },
  'Kecepatan Jalan':        { id: 'Kecepatan Jalan',        en: 'Travel Speed',        zh: '行驶速度' },
  'Kecepatan Transportasi': { id: 'Kecepatan Transportasi', en: 'Transport Speed',     zh: '运输速度' },

  /* --- Crawler & kabin --- */
  'Spesifikasi Track':    { id: 'Spesifikasi Track',    en: 'Track Specification',   zh: '履带规格' },
  'Lebar Crawler':        { id: 'Lebar Crawler',        en: 'Track Width',           zh: '履带宽度' },
  'Ukuran Crawler':       { id: 'Ukuran Crawler',       en: 'Track Size',            zh: '履带规格' },
  'Jarak Antar Crawler':  { id: 'Jarak Antar Crawler',  en: 'Track Gauge',           zh: '履带轨距' },
  'Wheelbase Crawler':    { id: 'Wheelbase Crawler',    en: 'Track Wheelbase',       zh: '履带轴距' },
  'Lebar Gauge':          { id: 'Lebar Gauge',          en: 'Track Gauge',           zh: '轮距' },
  'Panjang Kontak Tanah': { id: 'Panjang Kontak Tanah', en: 'Ground Contact Length', zh: '接地长度' },
  'Tekanan Tanah':        { id: 'Tekanan Tanah',        en: 'Ground Pressure',       zh: '接地比压' },
  'Tipe Kabin':           { id: 'Tipe Kabin',           en: 'Cabin Type',            zh: '驾驶室类型' },
  'Kabin':                { id: 'Kabin',                en: 'Cabin',                 zh: '驾驶室' },

  /* --- Hidrolik, hitch & angkat --- */
  'Kapasitas Angkat':          { id: 'Kapasitas Angkat',          en: 'Lifting Capacity',        zh: '提升能力' },
  'Kapasitas Angkat Maksimum': { id: 'Kapasitas Angkat Maksimum', en: 'Max. Lifting Capacity',   zh: '最大提升力' },
  'Sistem Angkat':             { id: 'Sistem Angkat',             en: 'Lifting System',          zh: '提升系统' },
  'Sistem Pengangkatan':       { id: 'Sistem Pengangkatan',       en: 'Lifting System',          zh: '升降系统' },
  'Hitch':                     { id: 'Hitch',                     en: 'Hitch',                   zh: '悬挂装置' },
  'Kategori Hitch':            { id: 'Kategori Hitch',            en: 'Hitch Category',          zh: '悬挂类别' },
  'Drawbar':                   { id: 'Drawbar',                   en: 'Drawbar Type',            zh: '牵引杆类型' },
  'Kendali Kedalaman':         { id: 'Kendali Kedalaman',         en: 'Depth Control',           zh: '耕深控制' },
  'Hydraulic Output':          { id: 'Hydraulic Output',          en: 'Hydraulic Outputs',       zh: '液压输出' },
  'Aliran Hidrolik':           { id: 'Aliran Hidrolik',           en: 'Hydraulic Flow',          zh: '液压流量' },
  'Kapasitas Pompa Hidrolik':  { id: 'Kapasitas Pompa Hidrolik',  en: 'Hydraulic Pump Flow',     zh: '液压泵流量' },
  'Kapasitas Oli Hidrolik':    { id: 'Kapasitas Oli Hidrolik',    en: 'Hydraulic Oil Capacity',  zh: '液压油容量' },
  'Kapasitas Tangki Hidrolik': { id: 'Kapasitas Tangki Hidrolik', en: 'Hydraulic Tank Capacity', zh: '液压油箱容积' },

  /* --- Combine harvester --- */
  'Lebar Potong':              { id: 'Lebar Potong',              en: 'Cutting Width',              zh: '割幅' },
  'Lebar Meja Potong':         { id: 'Lebar Meja Potong',         en: 'Header Width',               zh: '割台宽度' },
  'Lebar Feeder Housing':      { id: 'Lebar Feeder Housing',      en: 'Feeder Housing Width',       zh: '喂入槽宽度' },
  'Floating Axes':             { id: 'Floating Axes',             en: 'Floating Axes',              zh: '浮动轴数' },
  'Diameter Reel':             { id: 'Diameter Reel',             en: 'Reel Diameter',              zh: '拨禾轮直径' },
  'Jumlah Reel Bat':           { id: 'Jumlah Reel Bat',           en: 'Number of Reel Bats',        zh: '拨禾轮板数' },
  'Kapasitas Umpan':           { id: 'Kapasitas Umpan',           en: 'Feeding Capacity',           zh: '喂入量' },
  'Kapasitas Feeding':         { id: 'Kapasitas Feeding',         en: 'Feeding Capacity',           zh: '喂入量' },
  'Kapasitas Panen':           { id: 'Kapasitas Panen',           en: 'Harvest Capacity',           zh: '收割效率' },
  'Produktivitas Kerja':       { id: 'Produktivitas Kerja',       en: 'Work Productivity',          zh: '作业效率' },
  'Sistem Pemanenan':          { id: 'Sistem Pemanenan',          en: 'Harvesting System',          zh: '收割方式' },
  'Sistem Perontokan':         { id: 'Sistem Perontokan',         en: 'Threshing System',           zh: '脱粒系统' },
  'Ukuran Drum Perontok':      { id: 'Ukuran Drum Perontok',      en: 'Threshing Drum Size',        zh: '脱粒滚筒尺寸' },
  'Putaran Drum Perontok':     { id: 'Putaran Drum Perontok',     en: 'Cylinder Speed',             zh: '滚筒转速' },
  'Jumlah Drum Separasi':      { id: 'Jumlah Drum Separasi',      en: 'Number of Separating Drums', zh: '分离滚筒数量' },
  'Ukuran Drum Separasi':      { id: 'Ukuran Drum Separasi',      en: 'Separating Drum Size',       zh: '分离滚筒尺寸' },
  'Luas Area Separasi':        { id: 'Luas Area Separasi',        en: 'Total Separation Area',      zh: '分离总面积' },
  'Sistem Pembersihan':        { id: 'Sistem Pembersihan',        en: 'Cleaning System',            zh: '清选系统' },
  'Luas Area Pembersihan':     { id: 'Luas Area Pembersihan',     en: 'Cleaning Area',              zh: '清选面积' },
  'Tangki Gabah':              { id: 'Tangki Gabah',              en: 'Grain Tank',                 zh: '粮仓容积' },
  'Sistem Pembongkaran Gabah': { id: 'Sistem Pembongkaran Gabah', en: 'Grain Unloading System',     zh: '卸粮系统' },
  'Kecepatan Pembongkaran':    { id: 'Kecepatan Pembongkaran',    en: 'Unloading Rate',             zh: '卸粮速度' },
  'Tingkat Kehilangan':        { id: 'Tingkat Kehilangan',        en: 'Loss Rate',                  zh: '损失率' },
  'Tingkat Kotoran':           { id: 'Tingkat Kotoran',           en: 'Impurity Rate',              zh: '含杂率' },
  'Rigid Grain Header':        { id: 'Rigid Grain Header',        en: 'Rigid Grain Header',         zh: '刚性割台' },
  'Soybean Flex Header':       { id: 'Soybean Flex Header',       en: 'Soybean Flex Header',        zh: '大豆挠性割台' },
  'Corn Header':               { id: 'Corn Header',               en: 'Corn Header',                zh: '玉米割台' },
  'Multi-Crop Header':         { id: 'Multi-Crop Header',         en: 'Multi-Crop Header',          zh: '多作物割台' },

  /* --- Sugarcane harvester --- */
  'Jenis Mesin Panen':     { id: 'Jenis Mesin Panen',     en: 'Harvester Type',       zh: '收割机类型' },
  'Tipe Crop Divider':     { id: 'Tipe Crop Divider',     en: 'Crop Divider Type',    zh: '分蔗器类型' },
  'Jarak Ujung Divider':   { id: 'Jarak Ujung Divider',   en: 'Divider Tip Spacing',  zh: '分蔗器尖端间距' },
  'Rentang Tinggi Topper': { id: 'Rentang Tinggi Topper', en: 'Topper Height Range',  zh: '切梢器高度范围' },
  'Kapasitas Hopper':      { id: 'Kapasitas Hopper',      en: 'Hopper Capacity',      zh: '料斗容积' },
  'Beban Hopper Maksimum': { id: 'Beban Hopper Maksimum', en: 'Max. Hopper Load',     zh: '料斗最大载重' },
  'Tinggi Pembongkaran':   { id: 'Tinggi Pembongkaran',   en: 'Discharge Height',     zh: '卸料高度' },
  'Sudut Ayun Elevator':   { id: 'Sudut Ayun Elevator',   en: 'Elevator Swing Angle', zh: '输送带摆动角度' },
  'Jarak Antarbaris Tebu': { id: 'Jarak Antarbaris Tebu', en: 'Cane Row Spacing',     zh: '甘蔗行距' },
  'Tinggi Guludan':        { id: 'Tinggi Guludan',        en: 'Ridge Height',         zh: '垄高' },
  'Kemiringan Lahan':      { id: 'Kemiringan Lahan',      en: 'Field Slope',          zh: '地块坡度' },

  /* --- Rice transplanter --- */
  'Jumlah Baris':          { id: 'Jumlah Baris',          en: 'Number of Rows',           zh: '作业行数' },
  'Jumlah Baris Tanam':    { id: 'Jumlah Baris Tanam',    en: 'Planting Rows',            zh: '种植行数' },
  'Lebar Kerja':           { id: 'Lebar Kerja',           en: 'Working Width',            zh: '作业幅宽' },
  'Jarak Antarbaris':      { id: 'Jarak Antarbaris',      en: 'Row Spacing',              zh: '行距' },
  'Jarak Tanam':           { id: 'Jarak Tanam',           en: 'Plant Spacing',            zh: '株距' },
  'Kedalaman Tanam':       { id: 'Kedalaman Tanam',       en: 'Transplanting Depth',      zh: '插秧深度' },
  'Kedalaman Pengambilan': { id: 'Kedalaman Pengambilan', en: 'Pickup Depth',             zh: '取秧深度' },
  'Sistem Leveling':       { id: 'Sistem Leveling',       en: 'Levelling System',         zh: '仿形系统' },
  'Sistem Pelempar Bibit': { id: 'Sistem Pelempar Bibit', en: 'Seedling Throwing System', zh: '抛秧系统' },
  'Kapasitas Tray Bibit':  { id: 'Kapasitas Tray Bibit',  en: 'Seedling Tray Capacity',   zh: '秧盘容量' },
  'Jenis Bibit':           { id: 'Jenis Bibit',           en: 'Seedling Type',            zh: '秧苗类型' },
  'Tinggi Bibit':          { id: 'Tinggi Bibit',          en: 'Seedling Height',          zh: '秧苗高度' },
  'Umur Bibit':            { id: 'Umur Bibit',            en: 'Seedling Age',             zh: '秧龄' },
  'Kapasitas':             { id: 'Kapasitas',             en: 'Capacity',                 zh: '作业效率' },
  'Kapasitas Kerja':       { id: 'Kapasitas Kerja',       en: 'Work Capacity',            zh: '作业效率' },
  'Efisiensi Kerja':       { id: 'Efisiensi Kerja',       en: 'Work Efficiency',          zh: '作业效率' },

  /* --- Implement: bajak --- */
  'Kebutuhan Daya Traktor':  { id: 'Kebutuhan Daya Traktor',  en: 'Required Tractor Power',  zh: '配套拖拉机功率' },
  'Traktor Kompatibel':      { id: 'Traktor Kompatibel',      en: 'Compatible Tractors',     zh: '适配拖拉机' },
  'Struktur Rangka Utama':   { id: 'Struktur Rangka Utama',   en: 'Main Frame Structure',    zh: '主梁结构' },
  'Ukuran Beam':             { id: 'Ukuran Beam',             en: 'Beam Size',               zh: '主梁尺寸' },
  'Jarak Bebas Bawah Beam':  { id: 'Jarak Bebas Bawah Beam',  en: 'Underbeam Clearance',     zh: '梁下间隙' },
  'Konfigurasi Badan Bajak': { id: 'Konfigurasi Badan Bajak', en: 'Plow Body Configuration', zh: '犁体配置' },
  'Lebar Badan Bajak':       { id: 'Lebar Badan Bajak',       en: 'Body Width',              zh: '犁体幅宽' },
  'Bajak Depan':             { id: 'Bajak Depan',             en: 'Front Furrow Body',       zh: '前犁体' },
  'Lebar Alur':              { id: 'Lebar Alur',              en: 'Furrow Width',            zh: '犁距' },
  'Kedalaman Bajak':         { id: 'Kedalaman Bajak',         en: 'Plowing Depth',           zh: '耕深' },
  'Roda Kedalaman':          { id: 'Roda Kedalaman',          en: 'Depth Wheel',             zh: '限深轮' },
  'Metode Penyetelan':       { id: 'Metode Penyetelan',       en: 'Adjustment Method',       zh: '调节方式' },

  /* --- Implement: seeder / planter --- */
  'Jarak Antar Baris':      { id: 'Jarak Antar Baris',      en: 'Row Spacing',                zh: '行距' },
  'Kapasitas Hopper Benih': { id: 'Kapasitas Hopper Benih', en: 'Seed Hopper Capacity',       zh: '种箱容积' },
  'Kapasitas Hopper Pupuk': { id: 'Kapasitas Hopper Pupuk', en: 'Fertilizer Hopper Capacity', zh: '肥箱容积' },
  'Kedalaman Benih':        { id: 'Kedalaman Benih',        en: 'Seeding Depth',              zh: '播深' },

  /* --- Baler --- */
  'Lebar Pickup':                  { id: 'Lebar Pickup',                  en: 'Pickup Width',                 zh: '捡拾宽度' },
  'Pengangkat Pickup':             { id: 'Pengangkat Pickup',             en: 'Pickup Lift',                  zh: '捡拾器升降' },
  'Jarak Tine':                    { id: 'Jarak Tine',                    en: 'Tine Spacing',                 zh: '弹齿间距' },
  'Jumlah Batang Tine':            { id: 'Jumlah Batang Tine',            en: 'Tine Bars',                    zh: '弹齿杆数' },
  'Jumlah Tine':                   { id: 'Jumlah Tine',                   en: 'Number of Tines',              zh: '弹齿数量' },
  'Tipe Pengumpan':                { id: 'Tipe Pengumpan',                en: 'Feeder Type',                  zh: '喂入器型式' },
  'Penampang Bal (L × T)':         { id: 'Penampang Bal (L × T)',         en: 'Bale Cross Section (W × H)',   zh: '草捆截面（宽×高）' },
  'Panjang Bal':                   { id: 'Panjang Bal',                   en: 'Bale Length',                  zh: '草捆长度' },
  'Ukuran Bal (Diameter × Lebar)': { id: 'Ukuran Bal (Diameter × Lebar)', en: 'Bale Size (Diameter × Width)', zh: '草捆尺寸（直径×宽）' },
  'Kepadatan Bal':                 { id: 'Kepadatan Bal',                 en: 'Bale Density',                 zh: '草捆密度' },
  'Volume Ruang Bal':              { id: 'Volume Ruang Bal',              en: 'Bale Chamber Volume',          zh: '压缩室容积' },
  'Kontrol Kepadatan':             { id: 'Kontrol Kepadatan',             en: 'Density Control',              zh: '密度控制' },
  'Frekuensi Plunger':             { id: 'Frekuensi Plunger',             en: 'Plunger Frequency',            zh: '活塞频率' },
  'Efisiensi Pengepresan':         { id: 'Efisiensi Pengepresan',         en: 'Baling Efficiency',            zh: '打捆效率' },
  'Jumlah Roller':                 { id: 'Jumlah Roller',                 en: 'Number of Rollers',            zh: '辊数量' },
  'Jumlah Pisau':                  { id: 'Jumlah Pisau',                  en: 'Number of Knives',             zh: '定刀数量' },
  'Konfigurasi Pisau':             { id: 'Konfigurasi Pisau',             en: 'Knife Configuration',          zh: '刀具配置' },
  'Panjang Potongan':              { id: 'Panjang Potongan',              en: 'Chop Length',                  zh: '切段长度' },
  'Tipe Knotter':                  { id: 'Tipe Knotter',                  en: 'Knotter Type',                 zh: '打结器型式' },
  'Jumlah Knotter':                { id: 'Jumlah Knotter',                en: 'Number of Knotters',           zh: '打结器数量' },
  'Kapasitas Kotak Tali':          { id: 'Kapasitas Kotak Tali',          en: 'Twine Box Capacity',           zh: '绳箱容量' },
  'Alarm Tali':                    { id: 'Alarm Tali',                    en: 'Twine Alarm',                  zh: '缺绳报警' },
  'Proteksi Beban Lebih':          { id: 'Proteksi Beban Lebih',          en: 'Overload Protection',          zh: '过载保护' },
  'Sistem Pelumasan':              { id: 'Sistem Pelumasan',              en: 'Lubrication System',           zh: '润滑系统' },

  /* --- Dryer --- */
  'Kapasitas per Batch':     { id: 'Kapasitas per Batch',     en: 'Batch Capacity',           zh: '批处理量' },
  'Tipe Struktur':           { id: 'Tipe Struktur',           en: 'Structure Type',           zh: '结构类型' },
  'Metode Pemanasan':        { id: 'Metode Pemanasan',        en: 'Heating Method',           zh: '加热方式' },
  'Prinsip Pengeringan':     { id: 'Prinsip Pengeringan',     en: 'Drying Principle',         zh: '烘干原理' },
  'Laju Pengeringan':        { id: 'Laju Pengeringan',        en: 'Moisture Removal Rate',    zh: '降水速率' },
  'Jumlah Bagian Pengering': { id: 'Jumlah Bagian Pengering', en: 'Drying Sections',          zh: '烘干段数量' },
  'Jumlah Bagian Tempering': { id: 'Jumlah Bagian Tempering', en: 'Tempering Sections',       zh: '缓苏段数量' },
  'Tinggi Bagian Pengering': { id: 'Tinggi Bagian Pengering', en: 'Drying Section Height',    zh: '烘干段总高度' },
  'Tinggi Bagian Tempering': { id: 'Tinggi Bagian Tempering', en: 'Tempering Section Height', zh: '缓苏段总高度' },
  'Volume Efektif':          { id: 'Volume Efektif',          en: 'Effective Volume',         zh: '有效容积' },
  'Suhu Udara Panas':        { id: 'Suhu Udara Panas',        en: 'Hot Air Temperature',      zh: '热风温度' },
  'Tipe Kipas':              { id: 'Tipe Kipas',              en: 'Fan Type',                 zh: '风机类型' },
  'Sumber Panas':            { id: 'Sumber Panas',            en: 'Heat Source',              zh: '热源' },
  'Daya Termal':             { id: 'Daya Termal',             en: 'Thermal Power',            zh: '热功率' },
  'Total Daya':              { id: 'Total Daya',              en: 'Total Power',              zh: '总功率' },
  'Sumber Listrik':          { id: 'Sumber Listrik',          en: 'Power Supply',             zh: '电源' },
  'Kapasitas Elevator':      { id: 'Kapasitas Elevator',      en: 'Elevator Capacity',        zh: '提升机产量' },
  'Waktu Pengisian Gabah':   { id: 'Waktu Pengisian Gabah',   en: 'Loading Time',             zh: '进粮时间' },
  'Waktu Pengeluaran':       { id: 'Waktu Pengeluaran',       en: 'Unloading Time',           zh: '排粮时间' },

  /* --- Drone: umum & bobot --- */
  'Jenis Drone':                 { id: 'Jenis Drone',                 en: 'Drone Type',          zh: '无人机类型' },
  'Berat Drone':                 { id: 'Berat Drone',                 en: 'Drone Weight',        zh: '整机重量' },
  'Berat Lepas Landas Maksimum': { id: 'Berat Lepas Landas Maksimum', en: 'Max. Takeoff Weight', zh: '最大起飞重量' },
  'Bobot Lepas Landas':          { id: 'Bobot Lepas Landas',          en: 'Takeoff Weight',      zh: '起飞重量' },
  'Payload Maksimum':            { id: 'Payload Maksimum',            en: 'Max. Payload',        zh: '最大载荷' },
  'Wheelbase Maksimum':          { id: 'Wheelbase Maksimum',          en: 'Max. Wheelbase',      zh: '最大轴距' },
  'Rating Proteksi':             { id: 'Rating Proteksi',             en: 'Protection Rating',   zh: '防护等级' },

  /* --- Drone: semprot & sebar --- */
  'Kapasitas Tangki':         { id: 'Kapasitas Tangki',         en: 'Tank Capacity',                 zh: '药箱容量' },
  'Kapasitas Tangki Semprot': { id: 'Kapasitas Tangki Semprot', en: 'Spray Tank Capacity',           zh: '药箱容量' },
  'Kapasitas Tangki Penuh':   { id: 'Kapasitas Tangki Penuh',   en: 'Full Tank Capacity',            zh: '满载容量' },
  'Kapasitas Tangki Sebar':   { id: 'Kapasitas Tangki Sebar',   en: 'Spreader Capacity',             zh: '播撒箱容量' },
  'Lebar Semprot':            { id: 'Lebar Semprot',            en: 'Spray Width',                   zh: '喷幅' },
  'Lebar Semprot Efektif':    { id: 'Lebar Semprot Efektif',    en: 'Effective Spray Width',         zh: '有效喷幅' },
  'Lebar Semprot Maksimum':   { id: 'Lebar Semprot Maksimum',   en: 'Max. Spray Width',              zh: '最大喷幅' },
  'Aliran Semprot Maksimum':  { id: 'Aliran Semprot Maksimum',  en: 'Max. Spray Flow',               zh: '最大喷洒流量' },
  'Debit Semprot Maksimum':   { id: 'Debit Semprot Maksimum',   en: 'Max. Spray Rate',               zh: '最大喷洒流量' },
  'Ukuran Droplet':           { id: 'Ukuran Droplet',           en: 'Droplet Size',                  zh: '雾滴粒径' },
  'Jumlah Nozzle':            { id: 'Jumlah Nozzle',            en: 'Number of Nozzles',             zh: '喷头数量' },
  'Sistem Penyemprotan':      { id: 'Sistem Penyemprotan',      en: 'Spraying System',               zh: '喷洒系统' },
  'Mode Penyemprotan':        { id: 'Mode Penyemprotan',        en: 'Spraying Mode',                 zh: '喷洒模式' },
  'Sistem Pompa':             { id: 'Sistem Pompa',             en: 'Pump System',                   zh: '水泵系统' },
  'Kapasitas Sebar Maksimum': { id: 'Kapasitas Sebar Maksimum', en: 'Max. Spreading Capacity',       zh: '最大播撒容量' },
  'Kecepatan Sebar Maksimum': { id: 'Kecepatan Sebar Maksimum', en: 'Max. Spreading Rate',           zh: '最大播撒速度' },
  'Output Sebar Maksimum':    { id: 'Output Sebar Maksimum',    en: 'Max. Spreading Output',         zh: '最大播撒量' },
  'Kapasitas Sebar Pupuk':    { id: 'Kapasitas Sebar Pupuk',    en: 'Fertiliser Spreading Capacity', zh: '施肥播撒量' },
  'Kapasitas Spreader':       { id: 'Kapasitas Spreader',       en: 'Spreader Capacity',             zh: '播撒器容量' },

  /* --- Drone: rotor & tenaga --- */
  'Jumlah Rotor':          { id: 'Jumlah Rotor',          en: 'Number of Rotors',   zh: '旋翼数量' },
  'Diameter Rotor':        { id: 'Diameter Rotor',        en: 'Rotor Diameter',     zh: '旋翼直径' },
  'Sistem Rotor':          { id: 'Sistem Rotor',          en: 'Rotor System',       zh: '旋翼系统' },
  'Material Propeller':    { id: 'Material Propeller',    en: 'Propeller Material', zh: '螺旋桨材质' },
  'Maksimum Thrust':       { id: 'Maksimum Thrust',       en: 'Max. Thrust',        zh: '最大推力' },
  'Thrust Maksimum Motor': { id: 'Thrust Maksimum Motor', en: 'Max. Motor Thrust',  zh: '单电机最大推力' },
  'Thrust Total Maksimum': { id: 'Thrust Total Maksimum', en: 'Max. Total Thrust',  zh: '最大总推力' },
  'Sistem Pendinginan':    { id: 'Sistem Pendinginan',    en: 'Cooling System',     zh: '散热系统' },

  /* --- Drone: baterai & waktu --- */
  'Kapasitas Baterai':       { id: 'Kapasitas Baterai',       en: 'Battery Capacity',       zh: '电池容量' },
  'Sistem Baterai':          { id: 'Sistem Baterai',          en: 'Battery System',         zh: '电池系统' },
  'Charger':                 { id: 'Charger',                 en: 'Charger',                zh: '充电器' },
  'Sistem Pengisian':        { id: 'Sistem Pengisian',        en: 'Charging System',        zh: '充电系统' },
  'Waktu Pengisian':         { id: 'Waktu Pengisian',         en: 'Charging Time',          zh: '充电时间' },
  'Waktu Terbang':           { id: 'Waktu Terbang',           en: 'Flight Time',            zh: '飞行时间' },
  'Waktu Operasi':           { id: 'Waktu Operasi',           en: 'Operating Time',         zh: '作业时间' },
  'Waktu Operasi Remote':    { id: 'Waktu Operasi Remote',    en: 'Controller Runtime',     zh: '遥控器续航' },
  'Waktu Hover Beban Penuh': { id: 'Waktu Hover Beban Penuh', en: 'Hover Time (Full Load)', zh: '满载悬停时间' },
  'Waktu Hover Tanpa Beban': { id: 'Waktu Hover Tanpa Beban', en: 'Hover Time (No Load)',   zh: '空载悬停时间' },

  /* --- Drone: terbang, navigasi & sensor --- */
  'Kecepatan Terbang Maksimum': { id: 'Kecepatan Terbang Maksimum', en: 'Max. Flight Speed',      zh: '最大飞行速度' },
  'Kecepatan Angin Maksimum':   { id: 'Kecepatan Angin Maksimum',   en: 'Max. Wind Speed',        zh: '最大抗风速度' },
  'Jarak Operasi Maksimum':     { id: 'Jarak Operasi Maksimum',     en: 'Max. Operating Range',   zh: '最大作业距离' },
  'Jarak Transmisi':            { id: 'Jarak Transmisi',            en: 'Transmission Range',     zh: '图传距离' },
  'Jarak Transmisi FPV':        { id: 'Jarak Transmisi FPV',        en: 'FPV Transmission Range', zh: 'FPV 图传距离' },
  'Jangkauan Deteksi':          { id: 'Jangkauan Deteksi',          en: 'Detection Range',        zh: '探测距离' },
  'Sistem Navigasi':            { id: 'Sistem Navigasi',            en: 'Navigation System',      zh: '导航系统' },
  'Sistem Radar':               { id: 'Sistem Radar',               en: 'Radar System',           zh: '雷达系统' },
  'Sistem Hindar Rintangan':    { id: 'Sistem Hindar Rintangan',    en: 'Obstacle Avoidance',     zh: '避障系统' },
  'Sistem Persepsi':            { id: 'Sistem Persepsi',            en: 'Perception System',      zh: '感知系统' },
  'Remote Controller':          { id: 'Remote Controller',          en: 'Remote Controller',      zh: '遥控器' }
};


/* =====================================================================
   4. NILAI SPESIFIKASI — KAMUS KATA
   PENTING: diproses dari atas ke bawah.
   Frasa panjang/spesifik di ATAS, kata tunggal & satuan di BAWAH.
   Kalau nambah frasa baru, taruh di grup domainnya (bukan di bawah).
   ===================================================================== */
const NILAI_KATA = [
    /* ===== VECTORAGR (rover & digital ag) ===== */
  { cari: /potong rumput/gi,     en: 'mowing',              zh: '割草' },
  { cari: /\bsemprot\b/gi,       en: 'Spraying',            zh: '喷洒' },
  { cari: /\bangkut\b/gi,        en: 'transport',           zh: '运输' },
  { cari: /\blistrik\b/gi,       en: 'Electric',            zh: '电动' },
  { cari: /citra satelit/gi,     en: 'Satellite imagery',   zh: '卫星影像' },
  { cari: /data tanah/gi,        en: 'soil data',           zh: '土壤数据' },
  { cari: /batas lahan/gi,       en: 'Field boundary',      zh: '地块边界' },
  { cari: /resep VRA/gi,         en: 'VRA prescription',    zh: 'VRA 处方' },
  { cari: /\bzona\b/gi,          en: 'Zone',                zh: '分区' },
  { cari: /pupuk nitrogen/gi,    en: 'Nitrogen fertilizer', zh: '氮肥' },
  { cari: /jarak jauh/gi,        en: 'Remote',              zh: '远程' },
  /* ===== VECTORAGR ===== */
  { cari: /nozel sentrifugal/gi,     en: 'centrifugal nozzle',      zh: '离心喷头' },
  { cari: /radar pengikut medan/gi,  en: 'terrain-following radar', zh: '仿地雷达' },
  { cari: /radar belakang/gi,        en: 'rear radar',              zh: '后置雷达' },
  { cari: /radar putar/gi,           en: 'rotating radar',          zh: '旋转雷达' },
  { cari: /versi semprot/gi,         en: 'spraying version',        zh: '喷洒版' },
  { cari: /versi angkut/gi,          en: 'transport version',       zh: '吊运版' },
  { cari: /jaringan listrik/gi,      en: 'mains',                   zh: '市电' },
  { cari: /baling-baling/gi,         en: 'rotors',                  zh: '旋翼' },
  { cari: /\blengan\b/gi,            en: 'axes',                    zh: '轴' },
  { cari: /\bstandar\b/gi,           en: 'standard',                zh: '标配' },
  { cari: /\bopsional\b/gi,          en: 'optional',                zh: '选配' },
  { cari: /\bnozel\b/gi,             en: 'nozzles',                 zh: '喷头' },
  { cari: /\bgenerator\b/gi,         en: 'generator',               zh: '发电机' },
  { cari: /\bmonokuler\b/gi,         en: 'monocular',               zh: '单目' },
  { cari: /\bbinokuler\b/gi,         en: 'binocular',               zh: '双目' },
  { cari: /night vision/gi,          en: 'night vision',            zh: '夜视' },
  { cari: /\bkapasitif\b/gi,         en: 'capacitive',              zh: '电容式' },
  { cari: /\btitik\b/gi,             en: 'points',                  zh: '点' },
  { cari: /\binti\b/gi,              en: 'cores',                   zh: '核' },
  { cari: /\bglobal\b/gi,            en: 'global',                  zh: '全球' },
  { cari: /\bkamera\b/gi,            en: 'camera',                  zh: '摄像头' },
  /* ===== DRONE EAVISION ===== */
  { cari: /tanpa muatan/gi,  en: 'no load',      zh: '空载' },
  { cari: /muatan penuh/gi,  en: 'full load',    zh: '满载' },
  { cari: /seluruh drone/gi, en: 'entire drone', zh: '整机' },
  { cari: /\bModul\b/gi,     en: 'Modules',      zh: '模块' },
  { cari: /\bpengisian\b/gi, en: 'charge',       zh: '充电' },
  { cari: /\bnosel\b/gi,     en: 'nozzles',      zh: '喷头' },

  /* ===== BALER & IMPLEMENT ===== */
  { cari: /Pelumasan oli otomatis untuk rantai \+ gemuk otomatis untuk bearing/gi, en: 'Automatic chain oil lubrication + automatic bearing grease lubrication', zh: '链条自动注油 + 轴承自动注脂' },
  { cari: /Hitch hidrolik traktor/gi,                  en: 'Tractor hydraulic hitch',                  zh: '拖拉机液压悬挂提升' },
  { cari: /Angkat hidrolik, dapat dilepas/gi,          en: 'Hydraulic lift, removable',                zh: '液压升降，可拆卸' },
  { cari: /Manual Spring-Tension Control/gi,           en: 'Manual Spring-Tension Control',            zh: '弹簧张紧手动调节' },
  { cari: /3-Star Double-Paddle Screw Feeder/gi,       en: '3-Star Double-Paddle Screw Feeder',        zh: '三星双桨螺旋喂入器' },
  { cari: /4-Fork Feeder/gi,                           en: '4-Fork Feeder',                            zh: '四叉式喂入器' },
  { cari: /Self-Propelled, Tracked/gi,                 en: 'Self-Propelled, Tracked',                  zh: '自走履带式' },
  { cari: /D-Type/g,                                   en: 'D-Type',                                   zh: 'D型打结器' },
  { cari: /Semi-mounted/gi,                            en: 'Semi-mounted',                             zh: '半悬挂' },
  { cari: /Direct Pull/gi,                             en: 'Direct Pull',                              zh: '直接牵引' },
  { cari: /Shear Bolt/gi,                              en: 'Shear Bolt',                               zh: '剪切螺栓保护' },
  { cari: /Combined Depth & Transport Wheel/gi,        en: 'Combined Depth & Transport Wheel',         zh: '限深运输两用轮' },
  { cari: /Slatted Body, Reinforced Plow Leg Plate/gi, en: 'Slatted Body, Reinforced Plow Leg Plate',  zh: '栅条式犁体，加强犁柱板' },
  { cari: /Large Front Moldboard/gi,                   en: 'Large Front Moldboard',                    zh: '大前犁壁' },
  { cari: /Small Front Moldboard/gi,                   en: 'Small Front Moldboard',                    zh: '小前犁壁' },
  { cari: /In-furrow/gi,                               en: 'In-furrow',                                zh: '沟内' },
  { cari: /On-land/gi,                                 en: 'On-land',                                  zh: '沟上' },
  { cari: /versi standar/gi,                           en: 'standard version',                         zh: '标准版' },
  { cari: /dapat disetel/gi,                           en: 'adjustable',                               zh: '可调' },
  { cari: /kadar air/gi,                               en: 'moisture',                                 zh: '含水率' },

  /* ===== DRYER ===== */
  { cari: /Pemanasan tidak langsung/gi,            en: 'Indirect heating',                  zh: '间接加热' },
  { cari: /tiga fasa empat kawat dengan ground/gi, en: 'three-phase four-wire with ground', zh: '三相四线制（带接地）' },
  { cari: /Batch sirkulasi/gi,                     en: 'Batch recirculating',               zh: '批次循环式' },
  { cari: /Aliran campuran/gi,                     en: 'Mixed flow',                        zh: '混流' },
  { cari: /Aliran silang/gi,                       en: 'Cross flow',                        zh: '横流' },
  { cari: /Tekanan negatif/gi,                     en: 'Negative pressure',                 zh: '负压' },
  { cari: /Chute atas/gi,                          en: 'Upper discharge chute',             zh: '上部出料溜槽' },
  { cari: /chute bawah/gi,                         en: 'lower discharge chute',             zh: '下部出料溜槽' },
  { cari: /Auger atas/gi,                          en: 'Upper auger',                       zh: '上部绞龙' },
  { cari: /auger bawah/gi,                         en: 'lower auger',                       zh: '下部绞龙' },
  { cari: /Tungku biomassa/gi,                     en: 'Biomass furnace',                   zh: '生物质炉' },
  { cari: /heat pump listrik/gi,                   en: 'electric heat pump',                zh: '电热泵' },
  { cari: /burner minyak\/gas/gi,                  en: 'oil/gas burner',                    zh: '燃油/燃气燃烧器' },
  { cari: /heat exchanger uap/gi,                  en: 'steam heat exchanger',              zh: '蒸汽换热器' },
  { cari: /sekam padi/gi,                          en: 'rice husk',                         zh: '稻壳' },
  { cari: /\bthin-layer\b/gi,                      en: 'thin-layer',                        zh: '薄层' },

  /* ===== MESIN ===== */
  { cari: /High Pressure Common Rail/gi,  en: 'High Pressure Common Rail',  zh: '高压共轨' },
  { cari: /Turbocharged & Intercooled/gi, en: 'Turbocharged & Intercooled', zh: '涡轮增压中冷' },
  { cari: /Turbo Intercooled/gi,          en: 'Turbo Intercooled',          zh: '涡轮增压中冷' },
  { cari: /Common Rail/gi,                en: 'Common Rail',                zh: '高压共轨' },
  { cari: /Turbocharged/gi,               en: 'Turbocharged',               zh: '涡轮增压' },
  { cari: /Direct Injection/gi,           en: 'Direct Injection',           zh: '直喷' },
  { cari: /Water-Cooled/gi,               en: 'Water-Cooled',               zh: '水冷' },
  { cari: /Euro Stage V/gi,               en: 'Euro Stage V',               zh: '欧盟第五阶段' },

  /* ===== TRANSMISI, PENGGERAK, KEMUDI & REM ===== */
  { cari: /Mechanical \+ Continuously Variable Transmission/gi, en: 'Mechanical + Continuously Variable Transmission', zh: '机械式 + 无级变速' },
  { cari: /Range Infinitely Variable Transmission/gi,  en: 'Range Infinitely Variable Transmission',  zh: '段式无级变速' },
  { cari: /YD100 Heavy-Duty Transmission/gi,           en: 'YD100 Heavy-Duty Transmission',           zh: 'YD100 重载变速箱' },
  { cari: /Collar Shift dengan Partial Power Shift/gi, en: 'Collar Shift with Partial Power Shift',   zh: '啮合套换挡配部分动力换挡' },
  { cari: /Range Power Shift/gi,                       en: 'Range Power Shift',                       zh: '段式动力换挡' },
  { cari: /Partial Power Shift/gi,                     en: 'Partial Power Shift',                     zh: '部分动力换挡' },
  { cari: /Synchronizer Sleeve Gear Shifting/gi,       en: 'Synchronizer Sleeve Gear Shifting',       zh: '同步啮合套换挡' },
  { cari: /Synchronizer Gear Shifting/gi,              en: 'Synchronizer Gear Shifting',              zh: '同步器换挡' },
  { cari: /Synchronizer Shuttle Shift/gi,              en: 'Synchronizer Shuttle Shift',              zh: '同步器换向换挡' },
  { cari: /Shuttle Shift/gi,                           en: 'Shuttle Shift',                           zh: '换向换挡' },
  { cari: /Meshing Sleeve Shift/gi,                    en: 'Meshing Sleeve Shift',                    zh: '啮合套换挡' },
  { cari: /Synchromesh/gi,                             en: 'Synchromesh',                             zh: '同步器' },
  { cari: /Synchronizer/gi,                            en: 'Synchronizer',                            zh: '同步器' },
  { cari: /Electro-Hydraulic Shift \+ HST/gi,          en: 'Electro-Hydraulic Shift + HST',           zh: '电液换挡 + 静液压传动' },
  { cari: /Hydrostatic Transmission \(HST\)/gi,        en: 'Hydrostatic Transmission (HST)',          zh: '静液压传动（HST）' },
  { cari: /Mechanical \+ HST/gi,                       en: 'Mechanical + HST',                        zh: '机械 + 静液压传动' },
  { cari: /Dual-Motor Coupled Drive/gi,                en: 'Dual-Motor Coupled Drive',                zh: '双电机耦合驱动' },
  { cari: /2-Speed AMT/gi,                             en: '2-Speed AMT',                             zh: '两挡 AMT' },
  { cari: /\bECVT\b/g,                                 en: 'ECVT',                                    zh: '电控无级变速' },
  { cari: /Hydraulic On-Demand 4WD/gi,                 en: 'Hydraulic On-Demand 4WD',                 zh: '液压按需四驱' },
  { cari: /Permanent 4WD/gi,                           en: 'Permanent 4WD',                           zh: '全时四驱' },
  { cari: /Electro-Mechanical/gi,                      en: 'Electro-Mechanical',                      zh: '机电式' },
  { cari: /Hydrostatic Power Steering/gi,              en: 'Hydrostatic Power Steering',              zh: '静液压助力转向' },
  { cari: /Hydraulic Power Steering/gi,                en: 'Hydraulic Power Steering',                zh: '液压助力转向' },
  { cari: /Hydraulic Steering/gi,                      en: 'Hydraulic Steering',                      zh: '液压转向' },
  { cari: /Full Electro-Hydraulic dengan Multi-Function Joystick/gi, en: 'Full Electro-Hydraulic with Multi-Function Joystick', zh: '全电液控制配多功能手柄' },
  { cari: /Dual-Circuit Air Brake/gi,                  en: 'Dual-Circuit Air Brake',                  zh: '双回路气刹' },
  { cari: /3-Circuit Air Brake/gi,                     en: '3-Circuit Air Brake',                     zh: '三回路气刹' },
  { cari: /\bGearbox\b/gi,                             en: 'Gearbox',                                 zh: '变速箱' },

  /* ===== KOPLING, HIDROLIK & HITCH ===== */
  { cari: /Dry Type, Independent Double-Action/gi,          en: 'Dry Type, Independent Double-Action',          zh: '干式独立双作用' },
  { cari: /Independent Double-Action/gi,                    en: 'Independent Double-Action',                    zh: '独立双作用' },
  { cari: /Wet Multi-Plate Clutch/gi,                       en: 'Wet Multi-Plate Clutch',                       zh: '湿式多片离合器' },
  { cari: /Partially Separated Hydraulic Lifting System/gi, en: 'Partially Separated Hydraulic Lifting System', zh: '半分置式液压提升系统' },
  { cari: /Split Type Hydraulic Lifting System/gi,          en: 'Split Type Hydraulic Lifting System',          zh: '分置式液压提升系统' },
  { cari: /Swinging Drawbar dengan Quick-Attach Hitch/gi,   en: 'Swinging Drawbar with Quick-Attach Hitch',     zh: '摆动式牵引杆配快挂装置' },
  { cari: /Force and Position Adjustment/gi,                en: 'Force and Position Adjustment',                zh: '力位综合调节' },
  { cari: /Three-Point Hitch, Category 3 \(belakang\) \/ 2N \(depan\)/gi, en: 'Three-Point Hitch, Category 3 (rear) / 2N (front)', zh: '三点悬挂，后三类 / 前 2N 类' },
  { cari: /Rear Three-Point Hitch, Category (\w+)/gi,       en: 'Rear Three-Point Hitch, Category $1',          zh: '后三点悬挂，$1 类' },
  { cari: /Rear 3-Point Hitch, Category (\w+)/gi,           en: 'Rear 3-Point Hitch, Category $1',              zh: '后三点悬挂，$1 类' },
  { cari: /Three-Point Hitch, Category (\w+)/gi,            en: 'Three-Point Hitch, Category $1',               zh: '三点悬挂，$1 类' },
  { cari: /\(EU Standard\)/gi,                              en: '(EU Standard)',                                zh: '（欧盟标准）' },
  { cari: /Category 4N \/ 4/gi,                             en: 'Category 4N / 4',                              zh: '4N / 4 类' },
  { cari: /Category 4N/gi,                                  en: 'Category 4N',                                  zh: '4N 类' },
  { cari: /Category 3N/gi,                                  en: 'Category 3N',                                  zh: '3N 类' },
  { cari: /Category 4/gi,                                   en: 'Category 4',                                   zh: '四类' },
  { cari: /Category 3/gi,                                   en: 'Category 3',                                   zh: '三类' },
  { cari: /Category 2/gi,                                   en: 'Category 2',                                   zh: '二类' },
  { cari: /Category 1/gi,                                   en: 'Category 1',                                   zh: '一类' },

  /* ===== PANEN (COMBINE & TEBU) ===== */
  { cari: /3-Stage Tangential Separation \+ Twin Axial Rotors/gi, en: '3-Stage Tangential Separation + Twin Axial Rotors', zh: '三级切流分离 + 双纵轴流滚筒' },
  { cari: /Tangential Separation \+ Twin Axial Rotors/gi, en: 'Tangential Separation + Twin Axial Rotors', zh: '切流分离 + 双纵轴流滚筒' },
  { cari: /Triple Tangential & Dual Axial Flow/gi,  en: 'Triple Tangential & Dual Axial Flow',  zh: '三切流双纵轴流' },
  { cari: /Longitudinal Axial Flow/gi,              en: 'Longitudinal Axial Flow',              zh: '纵向轴流' },
  { cari: /Longitudinal Threshing Drum/gi,          en: 'Longitudinal Threshing Drum',          zh: '纵向脱粒滚筒' },
  { cari: /Single Axial Rotor/gi,                   en: 'Single Axial Rotor',                   zh: '单纵轴流滚筒' },
  { cari: /Air & Sieve Cleaning System/gi,          en: 'Air & Sieve Cleaning System',          zh: '风筛式清选系统' },
  { cari: /Dual Fan Outlet, CVT Fan Speed/gi,       en: 'Dual Fan Outlet, CVT Fan Speed',       zh: '双风道出风，风机无级调速' },
  { cari: /270° Hydraulic Unloading/gi,             en: '270° Hydraulic Unloading',             zh: '270° 液压卸粮' },
  { cari: /Hydraulic Unloading/gi,                  en: 'Hydraulic Unloading',                  zh: '液压卸粮' },
  { cari: /tanpa header/gi,                         en: 'excluding header',                     zh: '不含割台' },
  { cari: /Crawler Chopped Sugarcane Harvester/gi,  en: 'Crawler Chopped Sugarcane Harvester',  zh: '履带式切段甘蔗收割机' },
  { cari: /Chopped Sugarcane Harvester/gi,          en: 'Chopped Sugarcane Harvester',          zh: '切段式甘蔗收割机' },
  { cari: /Wheeled Sugarcane Harvester/gi,          en: 'Wheeled Sugarcane Harvester',          zh: '轮式甘蔗收割机' },
  { cari: /Tracked Sugarcane Harvester/gi,          en: 'Tracked Sugarcane Harvester',          zh: '履带式甘蔗收割机' },
  { cari: /Boat-Type Divider/gi,                    en: 'Boat-Type Divider',                    zh: '船型分蔗器' },
  { cari: /Conical Divider/gi,                      en: 'Conical Divider',                      zh: '锥形分蔗器' },
  { cari: /Harvesting Video Monitoring \+ Rearview Camera/gi, en: 'Harvesting Video Monitoring + Rearview Camera', zh: '收获视频监控 + 倒车影像' },

  /* ===== KABIN & AKSESORI ===== */
  { cari: /Cabin dengan Air Conditioner & Heating/gi, en: 'Cabin with Air Conditioner & Heating', zh: '配备空调与暖风的驾驶室' },
  { cari: /Cabin dengan Air Conditioner/gi,           en: 'Cabin with Air Conditioner',           zh: '配备空调的驾驶室' },
  { cari: /Sunshade with Fan \/ Optional Cabin/gi,    en: 'Sunshade with Fan / Optional Cabin',   zh: '带风扇遮阳棚 / 可选驾驶室' },
  { cari: /Sunshade Shed/gi,                          en: 'Sunshade Shed',                        zh: '遮阳棚' },
  { cari: /dengan front loader/gi,                    en: 'with front loader',                    zh: '含前装载机' },

  /* ===== TANAM ===== */
  { cari: /Free-Fall melalui Throwing Belt/gi,              en: 'Free-Fall via Throwing Belt',                 zh: '通过抛秧带自由落体' },
  { cari: /Potted Rice Seedlings/gi,                        en: 'Potted Rice Seedlings',                       zh: '钵苗' },
  { cari: /Front Anti-Explosion \/ Rear Paddy Anti-Slip/gi, en: 'Front Anti-Explosion / Rear Paddy Anti-Slip', zh: '前防爆胎 / 后水田防滑轮' },
  { cari: /Front Solid Rubber \/ Rear Paddy Anti-Slip/gi,   en: 'Front Solid Rubber / Rear Paddy Anti-Slip',   zh: '前实心胶轮 / 后水田防滑轮' },
  { cari: /Variable Forward & Reverse/gi,                   en: 'Variable Forward & Reverse',                  zh: '前进后退无级调速' },

  /* ===== DRONE ===== */
  { cari: /Agricultural Spraying, Spreading & Lifting Drone/gi, en: 'Agricultural Spraying, Spreading & Lifting Drone', zh: '农业喷洒、播撒与吊运无人机' },
  { cari: /Agricultural Spraying & Spreading Drone/gi,          en: 'Agricultural Spraying & Spreading Drone',          zh: '农业喷洒与播撒无人机' },
  { cari: /Multifunction Agricultural Drone/gi,                 en: 'Multifunction Agricultural Drone',                 zh: '多功能农业无人机' },
  { cari: /Agricultural Spraying Drone/gi,                      en: 'Agricultural Spraying Drone',                      zh: '农业植保无人机' },
  { cari: /Autonomous Flight & Intelligent Route Planning/gi,   en: 'Autonomous Flight & Intelligent Route Planning',   zh: '自主飞行与智能航线规划' },
  { cari: /RTK & Intelligent Route Planning/gi,                 en: 'RTK & Intelligent Route Planning',                 zh: 'RTK 与智能航线规划' },
  { cari: /Intelligent Route Planning/gi,                       en: 'Intelligent Route Planning',                       zh: '智能航线规划' },
  { cari: /RTK High-Precision Positioning/gi,                   en: 'RTK High-Precision Positioning',                   zh: 'RTK 高精度定位' },
  { cari: /Terrain Following \+ LiDAR/gi,                       en: 'Terrain Following + LiDAR',                        zh: '仿地飞行 + 激光雷达' },
  { cari: /Autonomous Flight Control/gi,                        en: 'Autonomous Flight Control',                        zh: '自主飞行控制' },
  { cari: /Autonomous Flight/gi,                                en: 'Autonomous Flight',                                zh: '自主飞行' },
  { cari: /Binocular Environmental Perception/gi,               en: 'Binocular Environmental Perception',               zh: '双目环境感知' },
  { cari: /360° Millimeter-Wave Radar/gi,                       en: '360° Millimeter-Wave Radar',                       zh: '360° 毫米波雷达' },
  { cari: /360° Omnidirectional Radar/gi,                       en: '360° Omnidirectional Radar',                       zh: '360° 全向雷达' },
  { cari: /360° Radar Sensing/gi,                               en: '360° Radar Sensing',                               zh: '360° 雷达感知' },
  { cari: /LiDAR \+ Radar/gi,                                   en: 'LiDAR + Radar',                                    zh: '激光雷达 + 雷达' },
  { cari: /EAV-CCMS Bimodal Mist Nozzle/gi,                     en: 'EAV-CCMS Bimodal Mist Nozzle',                     zh: 'EAV-CCMS 双模雾化喷头' },
  { cari: /CCMS-L20000 Bimodal Mist Nozzle/gi,                  en: 'CCMS-L20000 Bimodal Mist Nozzle',                  zh: 'CCMS-L20000 双模雾化喷头' },
  { cari: /Precision Spot Spraying/gi,                          en: 'Precision Spot Spraying',                          zh: '精准定点喷洒' },
  { cari: /High-Power Dual-Magnetic Impeller Pump/gi,           en: 'High-Power Dual-Magnetic Impeller Pump',           zh: '大功率双磁叶轮泵' },
  { cari: /Intelligent HD Remote Controller/gi,                 en: 'Intelligent HD Remote Controller',                 zh: '智能高清遥控器' },
  { cari: /HRC2 Smart Controller/gi,                            en: 'HRC2 Smart Controller',                            zh: 'HRC2 智能遥控器' },
  { cari: /Smart Controller/gi,                                 en: 'Smart Controller',                                 zh: '智能遥控器' },
  { cari: /Intelligent Charger/gi,                              en: 'Intelligent Charger',                              zh: '智能充电器' },
  { cari: /Smart Charger/gi,                                    en: 'Smart Charger',                                    zh: '智能充电器' },
  { cari: /Intelligent Battery/gi,                              en: 'Intelligent Battery',                              zh: '智能电池' },
  { cari: /Grid Battery/gi,                                     en: 'Grid Battery',                                     zh: '格栅电池' },
  { cari: /Active & Passive Cooling/gi,                         en: 'Active & Passive Cooling',                         zh: '主动与被动散热' },
  { cari: /Spraying, Spreading & Lifting/gi,                    en: 'Spraying, Spreading & Lifting',                    zh: '喷洒、播撒与吊运' },
  { cari: /Spraying & Spreading/gi,                             en: 'Spraying & Spreading',                             zh: '喷洒与播撒' },
  { cari: /Spraying & Lifting/gi,                               en: 'Spraying & Lifting',                               zh: '喷洒与吊运' },
  { cari: /Single Operator/gi,                                  en: 'Single Operator',                                  zh: '单人操作' },
  { cari: /Six-Axis Design/gi,                                  en: 'Six-Axis Design',                                  zh: '六轴设计' },
  { cari: /4-Axis, 8-Propeller/gi,                              en: '4-Axis, 8-Propeller',                              zh: '四轴八桨' },
  { cari: /Carbon Fiber/gi,                                     en: 'Carbon Fiber',                                     zh: '碳纤维' },
  { cari: /per motor set/gi,                                    en: 'per motor set',                                    zh: '每组电机' },
  { cari: /per motor/gi,                                        en: 'per motor',                                        zh: '每台电机' },
  { cari: /Crawler \/ Track/gi,                                 en: 'Crawler / Track',                                  zh: '履带式' },
  { cari: /Wheeled \/ Roda/gi,                                  en: 'Wheeled',                                          zh: '轮式' },

  /* ===== KATA UMUM (kata tunggal — HARUS di bawah semua frasa) ===== */
  { cari: /termasuk baterai/gi,  en: 'including battery', zh: '含电池' },
  { cari: /opsional hingga/gi,   en: 'optional up to',    zh: '可选至' },
  { cari: /\bopsional\b/gi,      en: 'optional',          zh: '可选' },
  { cari: /\bHingga\b/gi,        en: 'Up to',             zh: '最高' },
  { cari: /\bHidrolik\b/gi,      en: 'Hydraulic',         zh: '液压' },
  { cari: /\bMekanis\b/gi,       en: 'Mechanical',        zh: '机械' },
  { cari: /\bStandar\b/g,        en: 'Standard',          zh: '标配' },
  { cari: /\bGandum\b/gi,        en: 'Wheat',             zh: '小麦' },
  { cari: /\bPadi\b/gi,          en: 'Rice',              zh: '水稻' },
  { cari: /\bBiomassa\b/gi,      en: 'Biomass',           zh: '生物质' },
  { cari: /\bSilinder\b/gi,      en: 'Cylinder',          zh: '缸' },
  { cari: /(\d)\s*Tak\b/gi,      en: '$1-Stroke',         zh: '$1冲程' },
  { cari: /\bBaris\b/g,          en: 'Rows',              zh: '行' },
  { cari: /\bbaris\b/g,          en: 'rows',              zh: '行' },
  { cari: /\bTray\b/gi,          en: 'Trays',             zh: '秧盘' },
  { cari: /\bDaun\b/gi,          en: 'Leaves',            zh: '叶' },
  { cari: /\bmelalui\b/gi,       en: 'via',               zh: '通过' },
  { cari: /\bdengan\b/gi,        en: 'with',              zh: '配备' },
  { cari: /\bDepan\b/gi,         en: 'Front',             zh: '前' },
  { cari: /\bBelakang\b/g,       en: 'Rear',              zh: '后' },
  { cari: /\bbelakang\b/g,       en: 'rear',              zh: '后' },
  { cari: /\bdalam\b/gi,         en: 'inner',             zh: '内' },
  { cari: /\bluar\b/gi,          en: 'outer',             zh: '外' },
  { cari: /\bMaju\b/gi,          en: 'Forward',           zh: '前进' },
  { cari: /\bMundur\b/gi,        en: 'Reverse',           zh: '后退' },
  { cari: /\bdual\b/g,           en: 'dual',              zh: '双胎' },
  { cari: /\blow\b/g,            en: 'low',               zh: '低速' },
  { cari: /\bhigh\b/g,           en: 'high',              zh: '高速' },
  { cari: /\bstepless\b/gi,      en: 'stepless',          zh: '无级' },
  { cari: /\bpilihan\b/gi,       en: 'settings',          zh: '档' },
  { cari: /\blevel\b/gi,         en: 'levels',            zh: '档' },
  { cari: /\blinks\b/gi,         en: 'links',             zh: '节' },
  { cari: /\bkali\b/gi,          en: 'times',             zh: '次' },
  { cari: /\bbal\b/gi,           en: 'bales',             zh: '捆' },
  { cari: /\balur\b/gi,          en: 'furrows',           zh: '铧' },
  { cari: /\bgulung\b/gi,        en: 'rolls',             zh: '卷' },
  { cari: /\bbuzzer\b/gi,        en: 'buzzer',            zh: '蜂鸣器' },
  { cari: /\bMonitor\b/g,        en: 'Monitor',           zh: '显示屏控制' },
  { cari: /\bCrawler\b/gi,       en: 'Crawler',           zh: '履带' },
  { cari: /\bNozzle\b/gi,        en: 'Nozzle',            zh: '喷头' },
  { cari: /\bRotor\b/gi,         en: 'Rotor',             zh: '旋翼' },
  { cari: /\bCharger\b/gi,       en: 'Charger',           zh: '充电器' },
  { cari: /\bCabin\b/gi,         en: 'Cabin',             zh: '驾驶室' },
  { cari: /\bDiesel\b/gi,        en: 'Diesel',            zh: '柴油' },
  { cari: /\bInline\b/gi,        en: 'Inline',            zh: '直列' },
  { cari: /(\d+)\s*Groups?/gi,   en: '$1 Groups',         zh: '$1路' },

  /* ===== SATUAN (satuan gabungan dulu, baru satuan tunggal) ===== */
  { cari: /ton\/jam/gi,  en: 't/h',    zh: '吨/小时' },
  { cari: /km\/jam/gi,   en: 'km/h',   zh: '公里/小时' },
  { cari: /ha\/jam/gi,   en: 'ha/h',   zh: '公顷/小时' },
  { cari: /mu\/jam/gi,   en: 'mu/h',   zh: '亩/小时' },
  { cari: /ha\/hari/gi,  en: 'ha/day', zh: '公顷/天' },
  { cari: /\bTon\b/g,    en: 'Ton',    zh: '吨' },
  { cari: /\bton\b/g,    en: 't',      zh: '吨' },
  { cari: /\bjam\b/gi,   en: 'h',      zh: '小时' },
  { cari: /\bhari\b/gi,  en: 'day',    zh: '天' },
  { cari: /\bmenit\b/gi, en: 'min',    zh: '分钟' },
  { cari: /\bdetik\b/gi, en: 's',      zh: '秒' },
  { cari: /\binci\b/gi,  en: 'inch',   zh: '英寸' }
];