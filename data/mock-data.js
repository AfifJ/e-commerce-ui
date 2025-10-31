// Mock data untuk e-commerce homepage

// Data kategori produk
export const categories = [
  {
    id: 1,
    name: "Pria",
    slug: "pria",
    icon: "User",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=200&h=200&fit=crop&crop=center",
    subcategories: ["Baju", "Celana", "Sepatu", "Aksesoris"]
  },
  {
    id: 2,
    name: "Wanita",
    slug: "wanita",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop&crop=center",
    subcategories: ["Dress", "Tas", "Sepatu", "Makeup"]
  },
  {
    id: 3,
    name: "Elektronik",
    slug: "elektronik",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=200&h=200&fit=crop&crop=center",
    subcategories: ["Smartphone", "Laptop", "Audio", "Gaming"]
  },
  {
    id: 4,
    name: "Rumah Tangga",
    slug: "rumah-tangga",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop&crop=center",
    subcategories: ["Dapur", "Kamar Mandi", "Dekorasi", "Furniture"]
  },
  {
    id: 5,
    name: "Olahraga",
    slug: "olahraga",
    icon: "Trophy",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center",
    subcategories: ["Pakaian Olahraga", "Sepatu", "Alat Fitness", "Outdoor"]
  },
  {
    id: 6,
    name: "Kesehatan",
    slug: "kesehatan",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&crop=center",
    subcategories: ["Vitamin", "Skincare", "Perawatan", "Medis"]
  }
];

// Data vendor
export const vendors = [
  {
    id: 1,
    name: "TechStore Official",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center",
    rating: 4.9,
    totalReviews: 1250,
    location: "Jakarta Pusat",
    joinDate: "2020-01-15",
    totalProducts: 156,
    responseRate: 98,
    responseTime: "±1 jam",
    isVerified: true,
    description: "Toko elektronik terpercaya dengan produk original dan garansi resmi"
  },
  {
    id: 2,
    name: "Fashion Hub",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=60&h=60&fit=crop&crop=center",
    rating: 4.7,
    totalReviews: 890,
    location: "Bandung",
    joinDate: "2019-06-20",
    totalProducts: 342,
    responseRate: 95,
    responseTime: "±2 jam",
    isVerified: true,
    description: "Toko fashion dengan koleksi terkini dan kualitas terbaik"
  },
  {
    id: 3,
    name: "Sports Pro",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=center",
    rating: 4.8,
    totalReviews: 567,
    location: "Surabaya",
    joinDate: "2021-03-10",
    totalProducts: 89,
    responseRate: 92,
    responseTime: "±3 jam",
    isVerified: false,
    description: "Specialist perlengkapan olahraga professional"
  },
  {
    id: 4,
    name: "Beauty Care Store",
    logo: "https://images.unsplash.com/photo-1556228720-195a672e8a04?w=60&h=60&fit=crop&crop=center",
    rating: 4.9,
    totalReviews: 2340,
    location: "Jakarta Utara",
    joinDate: "2018-11-05",
    totalProducts: 278,
    responseRate: 99,
    responseTime: "±30 menit",
    isVerified: true,
    description: "Produk kecantikan original dengan izin BPOM"
  }
];

// Data produk
export const products = [
  // Featured Products
  {
    id: 1,
    name: "Smartphone Premium X",
    category: "Elektronik",
    price: 8999000,
    originalPrice: 12999000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&crop=center",
    rating: 4.8,
    reviews: 245,
    badge: "HOT",
    vendorId: 1,
    description: "Smartphone flagship dengan kamera terbaik"
  },
  {
    id: 2,
    name: "Tas Leather Premium",
    category: "Wanita",
    price: 1299000,
    originalPrice: 1899000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center",
    rating: 4.6,
    reviews: 89,
    badge: "DISKON",
    vendorId: 2,
    description: "Tas kulit asli dengan desain elegan"
  },
  {
    id: 3,
    name: "Sepatu Running Pro",
    category: "Olahraga",
    price: 799000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center",
    rating: 4.7,
    reviews: 156,
    badge: "BARU",
    vendorId: 3,
    description: "Sepatu lari profesional dengan teknologi terbaru"
  },
  {
    id: 4,
    name: "Skincare Set Complete",
    category: "Kesehatan",
    price: 599000,
    originalPrice: 899000,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a04?w=300&h=300&fit=crop&crop=center",
    rating: 4.9,
    reviews: 312,
    badge: "BESTSELLER",
    vendorId: 4,
    description: "Set perawatan wajah lengkap"
  },
  // Trending Products
  {
    id: 5,
    name: "Laptop Ultra Thin",
    category: "Elektronik",
    price: 12999000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&crop=center",
    rating: 4.7,
    reviews: 78,
    badge: "TRENDING",
    description: "Laptop tipis dengan performa tinggi"
  },
  {
    id: 6,
    name: "Dress Party Elegant",
    category: "Wanita",
    price: 899000,
    originalPrice: 1499000,
    image: "https://images.unsplash.com/photo-1572804013427-37d9098c636f?w=300&h=300&fit=crop&crop=center",
    rating: 4.5,
    reviews: 45,
    badge: "LIMITED",
    description: "Dress elegan untuk acara spesial"
  },
  {
    id: 7,
    name: "Smartwatch Health",
    category: "Elektronik",
    price: 2399000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop&crop=center",
    rating: 4.6,
    reviews: 189,
    badge: null,
    description: "Jam tangan pintar dengan fitur kesehatan"
  },
  {
    id: 8,
    name: "Coffee Maker Premium",
    category: "Rumah Tangga",
    price: 1599000,
    originalPrice: 2199000,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop&crop=center",
    rating: 4.8,
    reviews: 234,
    badge: null,
    description: "Mesin kopi otomatis dengan kualitas terbaik"
  }
];

// Data testimonials
export const testimonials = [
  {
    id: 1,
    name: "Sarah Putri",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c31c?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    text: "Pengalaman berbelanja yang sangat menyenangkan! Produk berkualitas dan pengiriman cepat.",
    product: "Smartphone Premium X"
  },
  {
    id: 2,
    name: "Budi Santoso",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    text: "Harga terjangkau dengan kualitas premium. Sudah 3 kali belanja di sini dan selalu puas.",
    product: "Laptop Ultra Thin"
  },
  {
    id: 3,
    name: "Maya Indah",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    rating: 4,
    text: "Customer service sangat helpful. Produk sesuai deskripsi dan packaging rapi.",
    product: "Tas Leather Premium"
  }
];

// Data hero carousel banners
export const heroBanners = [
  {
    id: 1,
    title: "Koleksi Musim Panas 2024",
    subtitle: "Temukan gaya terbaru dengan diskon hingga 50%",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&crop=center",
    ctaText: "Belanja Sekarang",
    ctaLink: "/sale"
  },
  {
    id: 2,
    title: "Teknologi Masa Depan, Hari Ini",
    subtitle: "Gadget terbaru dengan spesifikasi terbaik",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&h=400&fit=crop&crop=center",
    ctaText: "Jelajahi Koleksi",
    ctaLink: "/elektronik"
  },
  {
    id: 3,
    title: "Flash Sale Midnight!",
    subtitle: "Diskon ekstra hingga 70% untuk member",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop&crop=center",
    ctaText: "Dapatkan Penawaran",
    ctaLink: "/flash-sale"
  }
];

// Trust signals data
export const trustSignals = [
  {
    icon: "Shield",
    title: "Garansi 100% Ori",
    description: "Jaminan keaslian produk"
  },
  {
    icon: "Truck",
    title: "Gratis Ongkir",
    description: "Min. belanja Rp 100k"
  },
  {
    icon: "Lock",
    title: "Pembayaran Aman",
    description: "100% transaksi aman"
  },
  {
    icon: "Clock",
    title: "Bantuan 24/7",
    description: "Customer service ready"
  }
];

// Footer links data
export const footerLinks = {
  company: {
    title: "Tentang Kami",
    links: [
      { name: "Visi Misi", href: "/tentang" },
      { name: "Cerita Kami", href: "/story" },
      { name: "Karir", href: "/karir" },
      { name: "Blog", href: "/blog" }
    ]
  },
  help: {
    title: "Bantuan",
    links: [
      { name: "Kontak", href: "/kontak" },
      { name: "Pengiriman", href: "/pengiriman" },
      { name: "Pengembalian", href: "/pengembalian" },
      { name: "FAQ", href: "/faq" }
    ]
  },
  policy: {
    title: "Kebijakan",
    links: [
      { name: "Privasi", href: "/privacy" },
      { name: "Syarat & Ketentuan", href: "/terms" },
      { name: "Kebijakan Pengembalian", href: "/return-policy" }
    ]
  }
};

// Social media links
export const socialLinks = [
  { name: "Instagram", icon: "Camera", href: "#" },
  { name: "Facebook", icon: "MessageCircle", href: "#" },
  { name: "TikTok", icon: "Music", href: "#" },
  { name: "Twitter", icon: "Twitter", href: "#" }
];

// Payment methods
export const paymentMethods = [
  { name: "BCA", logo: "CreditCard" },
  { name: "Mandiri", logo: "CreditCard" },
  { name: "BRI", logo: "CreditCard" },
  { name: "Gopay", logo: "Wallet" },
  { name: "OVO", logo: "Wallet" },
  { name: "ShopeePay", logo: "Wallet" }
];

// Shipping partners
export const shippingPartners = [
  { name: "JNE", logo: "Package" },
  { name: "J&T", logo: "Package" },
  { name: "Tiki", logo: "Package" },
  { name: "GoSend", logo: "Truck" }
];

// Vouchers data for cart functionality
export const vouchers = [
  {
    id: "DISKON10",
    code: "DISKON10",
    type: "percentage",
    value: 10,
    description: "Diskon 10% untuk pembelian minimal Rp 100.000",
    minPurchase: 100000,
    maxDiscount: 50000,
    isActive: true,
    expiryDate: "2024-12-31"
  },
  {
    id: "GRATISONGKIR",
    code: "GRATISONGKIR",
    type: "shipping",
    value: 20000,
    description: "Gratis ongkir maksimal Rp 20.000",
    minPurchase: 50000,
    maxDiscount: 20000,
    isActive: true,
    expiryDate: "2024-12-15"
  },
  {
    id: "CASHBACK25",
    code: "CASHBACK25",
    type: "fixed",
    value: 25000,
    description: "Cashback Rp 25.000 untuk pembelian minimal Rp 200.000",
    minPurchase: 200000,
    maxDiscount: 25000,
    isActive: true,
    expiryDate: "2024-11-30"
  }
];

// Shipping cost estimator data
export const shippingCosts = {
  jakarta: 15000,
  bandung: 20000,
  surabaya: 25000,
  yogyakarta: 20000,
  medan: 30000,
  semarang: 22000,
  makassar: 35000,
  palembang: 28000,
  bogor: 18000,
  tangerang: 15000,
  depok: 15000,
  bekasi: 18000
};

// Mock function to get shipping cost by city
export function getShippingCost(city) {
  return shippingCosts[city.toLowerCase()] || 25000;
}

// Mock function to validate voucher
export function validateVoucher(code, subtotal) {
  const voucher = vouchers.find(v => v.code === code.toUpperCase());

  if (!voucher) {
    return { valid: false, message: "Kode voucher tidak valid" };
  }

  if (!voucher.isActive) {
    return { valid: false, message: "Voucher sudah tidak aktif" };
  }

  if (subtotal < voucher.minPurchase) {
    return {
      valid: false,
      message: `Minimal pembelian Rp ${voucher.minPurchase.toLocaleString('id-ID')} untuk menggunakan voucher ini`
    };
  }

  return { valid: true, voucher };
}

// Mock function to calculate discount
export function calculateDiscount(voucher, subtotal) {
  let discount = 0;

  switch (voucher.type) {
    case 'percentage':
      discount = subtotal * (voucher.value / 100);
      if (voucher.maxDiscount && discount > voucher.maxDiscount) {
        discount = voucher.maxDiscount;
      }
      break;
    case 'fixed':
      discount = voucher.value;
      break;
    case 'shipping':
      discount = Math.min(voucher.value, getShippingCost('jakarta')); // Mock shipping cost
      break;
  }

  return discount;
}

// Product variants data
export const productVariants = {
  colors: [
    { name: "Hitam", value: "#000000", inStock: true },
    { name: "Navy", value: "#1e3a8a", inStock: true },
    { name: "Abu-abu", value: "#6b7280", inStock: false },
    { name: "Putih", value: "#ffffff", inStock: true },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  promoOffers: [
    { icon: "Truck", text: "Gratis Ongkir ke Jakarta" },
    { icon: "CreditCard", text: "Cicilan 0% 3x dengan Kartu Kredit BCA" },
    { icon: "RefreshCw", text: "Bebas Return 30 Hari" },
    { icon: "Shield", text: "Garansi 100% Original" },
  ]
};

// Bundle products data
export const bundleProducts = [
  {
    id: 101,
    name: "Premium Case",
    price: 99000,
    originalPrice: 149000,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
    description: "Pelindung premium dengan desain elegant",
    category: "Aksesoris"
  },
  {
    id: 102,
    name: "Screen Protector Tempered Glass",
    price: 49000,
    originalPrice: 79000,
    image: "https://images.unsplash.com/photo-1587854692158-c3a51596e649?w=100&h=100&fit=crop&crop=center",
    description: "Anti gores 9H dengan clarity maksimal",
    category: "Aksesoris"
  },
  {
    id: 103,
    name: "Charging Cable Premium",
    price: 79000,
    originalPrice: 99000,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop&crop=center",
    description: "Kabel fast charging dengan material durable",
    category: "Aksesoris"
  }
];

// Product tabs data
export const productTabsData = {
  // Product description data
  productDescription: {
    mainDescription: (productName) => `Temukan kualitas dan kenyamanan dalam ${productName}. Produk ini dirancang dengan memperhatikan setiap detail untuk memberikan pengalaman terbaik bagi pengguna. Dibuat dengan material pilihan dan teknologi terkini, produk ini menjadi pilihan sempurna untuk kebutuhan sehari-hari Anda.`,
    features: [
      "Material premium berkualitas tinggi",
      "Desain ergonomis yang nyaman digunakan",
      "Tahan lama dan mudah perawatannya",
      "Teknologi terkini untuk performa optimal",
      "Garansi resmi dari produsen"
    ],
    materials: "Dibuat dengan 100% material berkualitas tinggi yang telah melalui proses quality control ketat untuk memastikan produk yang Anda terima dalam kondisi sempurna.",
    care: "Cara perawatan: Cuci dengan air dingin, jangan gunakan pemutih, setrika dengan suhu rendah, jangan dry clean.",
    dimensions: "Dimensi: 30cm x 20cm x 10cm",
    weight: "Berat: 500g",
    packageIncludes: [
      "1x Produk Utama",
      "1x Buku Panduan",
      "1x Kartu Garansi",
      "1x Packaging Premium"
    ]
  },

  // Specifications data
  specifications: (product) => [
    { category: "Umum", items: [
      { label: "Merek", value: "Premium" },
      { label: "Model", value: product.name },
      { label: "Kategori", value: product.category },
      { label: "Berat", value: "500g" },
      { label: "Dimensi", value: "30x20x10 cm" }
    ]},
    { category: "Material", items: [
      { label: "Bahan Utama", value: "100% Cotton Premium" },
      { label: "Kualitas", value: "Grade A" },
      { label: "Sertifikasi", value: "ISO 9001:2015" },
      { label: "Eco-Friendly", value: "Yes" }
    ]},
    { category: "Garansi", items: [
      { label: "Masa Garansi", value: "12 Bulan" },
      { label: "Cakupan", value: "Produk Defect" },
      { label: "Service Center", value: "Tersedia di 20 Kota" }
    ]}
  ],

  // Reviews data
  reviews: [
    {
      id: 1,
      name: "Sarah Putri",
      rating: 5,
      date: "2 hari yang lalu",
      verified: true,
      text: "Produk sangat bagus! Kualitas sesuai dengan harga dan pengiriman cepat. Recommended seller!",
      helpful: 23,
      images: []
    },
    {
      id: 2,
      name: "Budi Santoso",
      rating: 4,
      date: "1 minggu yang lalu",
      verified: true,
      text: "Bagus, cuma pengiriman agak lama. Tapi produknya memang worth it dengan harga segini.",
      helpful: 15,
      images: []
    },
    {
      id: 3,
      name: "Maya Indah",
      rating: 5,
      date: "2 minggu yang lalu",
      verified: true,
      text: "Sudah beli yang kedua kalinya, kualitas always the best! Packaging rapi dan aman.",
      helpful: 31,
      images: []
    }
  ],

  // FAQ data
  faqs: [
    {
      question: "Apakah produk ini bergaransi?",
      answer: "Ya, semua produk kami bergaransi 12 bulan untuk cacat produksi. Garansi tidak berlaku untuk kerusakan akibat penggunaan yang salah."
    },
    {
      question: "Bagaimana cara klaim garansi?",
      answer: "Hubungi customer service kami dengan menyertakan nomor order dan foto/video kerusakan. Tim kami akan memandu proses klaim Anda."
    },
    {
      question: "Apakah bisa return jika tidak cocok?",
      answer: "Ya, kami menyediakan kebijakan return 30 hari. Produk harus dalam kondisi baru dengan label dan packaging lengkap."
    },
    {
      question: "Berapa lama pengiriman ke luar kota?",
      answer: "Pengiriman regular 3-7 hari kerja untuk pulau Jawa dan 7-14 hari kerja untuk luar pulau Jawa. Pengiriman ekspres tersedia dengan biaya tambahan."
    },
    {
      question: "Apakah ada diskon untuk pembelian grosir?",
      answer: "Ya, kami menyediakan harga khusus untuk pembelian minimal 5 pcs. Hubungi tim sales kami untuk info lebih lanjut."
    }
  ]
};

// Extended categories data for all categories page
export const allCategories = [
  {
    id: 1,
    name: "Elektronik",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&crop=center",
    productCount: 1248,
    description: "Gadget dan perangkat elektronik terkini",
    subcategories: [
      { name: "Smartphone", count: 456 },
      { name: "Laptop", count: 234 },
      { name: "Tablet", count: 123 },
      { name: "Smartwatch", count: 89 },
      { name: "Audio", count: 346 }
    ],
    isHot: true,
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Fashion",
    icon: "Shirt",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center",
    productCount: 3456,
    description: "Pakaian dan aksesoris fashion terkini",
    subcategories: [
      { name: "Pakaian Pria", count: 1234 },
      { name: "Pakaian Wanita", count: 1567 },
      { name: "Sepatu", count: 456 },
      { name: "Tas", count: 123 },
      { name: "Aksesoris", count: 76 }
    ],
    color: "bg-purple-500"
  },
  {
    id: 3,
    name: "Rumah Tangga",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
    productCount: 892,
    description: "Perlengkapan dan dekorasi rumah",
    subcategories: [
      { name: "Dekorasi", count: 234 },
      { name: "Perabot", count: 345 },
      { name: "Dapur", count: 189 },
      { name: "Kamar Mandi", count: 78 },
      { name: "Taman", count: 46 }
    ],
    isTrending: true,
    color: "bg-green-500"
  },
  {
    id: 4,
    name: "Otomotif",
    icon: "Car",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop&crop=center",
    productCount: 567,
    description: "Aksesoris dan perawatan kendaraan",
    subcategories: [
      { name: "Mobil", count: 234 },
      { name: "Motor", count: 189 },
      { name: "Aksesoris", count: 123 },
      { name: "Perawatan", count: 21 }
    ],
    color: "bg-red-500"
  },
  {
    id: 5,
    name: "Gaming",
    icon: "Gamepad2",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center",
    productCount: 789,
    description: "Perangkat gaming dan aksesoris",
    subcategories: [
      { name: "Console", count: 123 },
      { name: "PC Gaming", count: 234 },
      { name: "Aksesoris", count: 345 },
      { name: "Game", count: 87 }
    ],
    isHot: true,
    color: "bg-indigo-500"
  },
  {
    id: 6,
    name: "Buku & Alat Tulis",
    icon: "Book",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
    productCount: 2345,
    description: "Buku, majalah, dan alat tulis",
    subcategories: [
      { name: "Buku", count: 1234 },
      { name: "Alat Tulis", count: 678 },
      { name: "Majalah", count: 234 },
      { name: "E-Book", count: 199 }
    ],
    color: "bg-yellow-500"
  },
  {
    id: 7,
    name: "Kesehatan & Kecantikan",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
    productCount: 1567,
    description: "Produk kesehatan dan kecantikan",
    subcategories: [
      { name: "Skincare", count: 567 },
      { name: "Makeup", count: 345 },
      { name: "Kesehatan", count: 456 },
      { name: "Perawatan", count: 199 }
    ],
    isTrending: true,
    color: "bg-pink-500"
  },
  {
    id: 8,
    name: "Kamera",
    icon: "Camera",
    image: "https://images.unsplash.com/photo-1516035069371-2981d14848aa?w=400&h=300&fit=crop&crop=center",
    productCount: 445,
    description: "Kamera dan perlengkapannya",
    subcategories: [
      { name: "DSLR", count: 123 },
      { name: "Mirrorless", count: 89 },
      { name: "Action Cam", count: 67 },
      { name: "Aksesoris", count: 166 }
    ],
    color: "bg-teal-500"
  },
  {
    id: 9,
    name: "Audio",
    icon: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
    productCount: 678,
    description: "Headphone, speaker, dan audio system",
    subcategories: [
      { name: "Headphone", count: 234 },
      { name: "Speaker", count: 189 },
      { name: "Audio System", count: 123 },
      { name: "Aksesoris", count: 132 }
    ],
    color: "bg-orange-500"
  },
  {
    id: 10,
    name: "Smartwatch",
    icon: "Watch",
    image: "https://images.unsplash.com/photo-1523275335684-e5db3bdc6a86?w=400&h=300&fit=crop&crop=center",
    productCount: 334,
    description: "Jam pintar dan aksesorisnya",
    subcategories: [
      { name: "Apple Watch", count: 89 },
      { name: "Samsung Watch", count: 67 },
      { name: "Smartband", count: 123 },
      { name: "Aksesoris", count: 55 }
    ],
    color: "bg-cyan-500"
  },
  {
    id: 11,
    name: "Tablet",
    icon: "Tablet",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&crop=center",
    productCount: 223,
    description: "Tablet dan aksesoris",
    subcategories: [
      { name: "iPad", count: 67 },
      { name: "Samsung Tab", count: 45 },
      { name: "Android Tablet", count: 78 },
      { name: "Aksesoris", count: 33 }
    ],
    color: "bg-lime-500"
  },
  {
    id: 12,
    name: "Lainnya",
    icon: "Package",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
    productCount: 890,
    description: "Berbagai produk lainnya",
    subcategories: [
      { name: "Mainan", count: 234 },
      { name: "Hobi", count: 189 },
      { name: "Olahraga", count: 267 },
      { name: "Lainnya", count: 200 }
    ],
    color: "bg-gray-500"
  }
];

// Contact and social data
export const contactInfo = {
  phone: "+62 812-3456-7890",
  email: "support@premium.com",
  socialMedia: [
    { name: "Instagram", icon: "Instagram", href: "#" },
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "MessageCircle", icon: "MessageCircle", href: "#" },
    { name: "Twitter", icon: "Twitter", href: "#" }
  ],
  appDownload: {
    appStore: "App Store",
    playStore: "Play Store"
  }
};

// Same brand products data
export const sameBrandProducts = (currentProduct) => [
  {
    id: 201,
    name: "Premium Series X Pro",
    category: currentProduct.category,
    price: 1599000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop&crop=center",
    rating: 4.9,
    reviews: 89,
    badge: "NEW",
    description: "Versi upgrade dengan fitur premium"
  },
  {
    id: 202,
    name: "Premium Classic",
    category: currentProduct.category,
    price: 899000,
    originalPrice: 1299000,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop&crop=center",
    rating: 4.7,
    reviews: 156,
    badge: "BESTSELLER",
    description: "Klasik yang selalu diminati"
  }
];

// User profile data
export const userProfile = {
  id: "user-001",
  name: "Ahmad Fauzi",
  email: "ahmad.fauzi@email.com",
  phone: "+62 812-3456-7890",
  avatar: "/images/avatars/default-avatar.png",
  memberSince: "2024-01-15",
  memberLevel: "Premium Member",
  totalOrders: 12,
  totalSpent: 4500000,
  wishlistCount: 8,
  reviewsCount: 5,
  preferences: {
    language: "id",
    currency: "IDR",
    newsletter: true,
    marketingEmails: false
  }
};

// User addresses data
export const userAddresses = [
  {
    id: "addr-001",
    name: "Rumah",
    recipient: "Ahmad Fauzi",
    phone: "+62 812-3456-7890",
    address: "Jl. Merdeka No. 123",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12345",
    isDefault: true
  },
  {
    id: "addr-002",
    name: "Kantor",
    recipient: "Ahmad Fauzi",
    phone: "+62 812-3456-7890",
    address: "Jl. Sudirman No. 456, Gedung Bursa Lt. 15",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    postalCode: "10210",
    isDefault: false
  },
  {
    id: "addr-003",
    name: "Orang Tua",
    recipient: "Siti Aminah",
    phone: "+62 813-4567-8901",
    address: "Jl. Veteran No. 78",
    city: "Bandung",
    province: "Jawa Barat",
    postalCode: "40115",
    isDefault: false
  }
];

// User orders data
export const userOrders = [
  {
    id: "ORD-001",
    date: "2024-10-28",
    total: 750000,
    status: "delivered",
    statusLabel: "Terkirim",
    items: [
      { name: "iPhone 15 Pro Max", quantity: 1, price: 18999000, image: "https://images.unsplash.com/photo-1592286115803-a1c3b552ee43?w=100&h=100&fit=crop&crop=center", variant: "Natural Titanium 256GB" },
      { name: "AirPods Pro 2", quantity: 1, price: 3999000, image: "https://images.unsplash.com/photo-1606140949696-34e7272b3413?w=100&h=100&fit=crop&crop=center", variant: "USB-C" }
    ],
    trackingNumber: "TRK123456789",
    shippingAddress: {
      name: "Ahmad Fauzi",
      address: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      postalCode: "12345",
      phone: "+62 812-3456-7890"
    },
    canReview: true
  },
  {
    id: "ORD-002",
    date: "2024-10-25",
    total: 1200000,
    status: "processing",
    statusLabel: "Diproses",
    items: [
      { name: "MacBook Air M3", quantity: 1, price: 15999000, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop&crop=center", variant: "Midnight 13-inch 8GB/256GB" },
      { name: "USB-C Hub", quantity: 1, price: 450000, image: "https://images.unsplash.com/photo-1528638835415-7b5320f6465a?w=100&h=100&fit=crop&crop=center", variant: "7-in-1" },
      { name: "Laptop Sleeve", quantity: 1, price: 250000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop&crop=center", variant: "Size M, Black" }
    ],
    trackingNumber: "TRK123456788",
    shippingAddress: {
      name: "Ahmad Fauzi",
      address: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      postalCode: "12345",
      phone: "+62 812-3456-7890"
    },
    canReview: false
  },
  {
    id: "ORD-003",
    date: "2024-10-20",
    total: 550000,
    status: "shipped",
    statusLabel: "Dikirim",
    items: [
      { name: "Apple Watch Series 9", quantity: 1, price: 6999000, image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=100&h=100&fit=crop&crop=center", variant: "GPS 45mm Pink Aluminum" }
    ],
    trackingNumber: "TRK123456787",
    shippingAddress: {
      name: "Ahmad Fauzi",
      address: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      postalCode: "12345",
      phone: "+62 812-3456-7890"
    },
    canReview: false
  },
  {
    id: "ORD-004",
    date: "2024-10-18",
    total: 1250000,
    status: "delivered",
    statusLabel: "Terkirim",
    items: [
      { name: "Premium Case iPhone", quantity: 2, price: 99000, image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center", variant: "Blue" },
      { name: "Screen Protector Tempered Glass", quantity: 1, price: 49000, image: "https://images.unsplash.com/photo-1587854692158-c3a51596e649?w=100&h=100&fit=crop&crop=center", variant: "9H" },
      { name: "Charging Cable Premium", quantity: 3, price: 79000, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop&crop=center", variant: "USB-C to Lightning 1.5m" }
    ],
    trackingNumber: "TRK123456786",
    shippingAddress: {
      name: "Ahmad Fauzi",
      address: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      postalCode: "12345",
      phone: "+62 812-3456-7890"
    },
    canReview: true
  },
  {
    id: "ORD-005",
    date: "2024-10-15",
    total: 2899000,
    status: "pending",
    statusLabel: "Pending",
    items: [
      { name: "Sony WH-1000XM5 Headphones", quantity: 1, price: 2899000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center", variant: "Midnight Black" }
    ],
    trackingNumber: null,
    shippingAddress: {
      name: "Ahmad Fauzi",
      address: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      postalCode: "12345",
      phone: "+62 812-3456-7890"
    },
    canReview: false
  },
  {
    id: "ORD-006",
    date: "2024-10-12",
    total: 3450000,
    status: "delivered",
    statusLabel: "Terkirim",
    items: [
      { name: "iPad Air 5th Gen", quantity: 1, price: 8999000, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop&crop=center", variant: "Wi-Fi 64GB Space Gray" },
      { name: "Apple Pencil 2nd Gen", quantity: 1, price: 1499000, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=100&h=100&fit=crop&crop=center" },
      { name: "iPad Smart Cover", quantity: 1, price: 99000, image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=100&h=100&fit=crop&crop=center", variant: "English Lavender" }
    ],
    trackingNumber: "TRK123456785",
    shippingAddress: {
      name: "Ahmad Fauzi",
      address: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      postalCode: "12345",
      phone: "+62 812-3456-7890"
    },
    canReview: true
  },
  {
    id: "ORD-007",
    date: "2024-10-10",
    total: 890000,
    status: "processing",
    statusLabel: "Diproses",
    items: [
      { name: "Coffee Maker Premium", quantity: 1, price: 1599000, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&crop=center" }
    ],
    trackingNumber: "TRK123456784",
    shippingAddress: {
      name: "Ahmad Fauzi",
      address: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      postalCode: "12345",
      phone: "+62 812-3456-7890"
    },
    canReview: false
  },
  {
    id: "ORD-008",
    date: "2024-10-08",
    total: 750000,
    status: "delivered",
    statusLabel: "Terkirim",
    items: [
      { name: "Tas Leather Premium", quantity: 1, price: 750000, variant: "Cognac, Size L" }, // Tanpa gambar untuk testing fallback
      { name: "Dompet Pria Premium", quantity: 1, price: 350000, image: "https://images.unsplash.com/photo-1622565891845-762463e37b5a?w=100&h=100&fit=crop&crop=center", variant: "Black" }
    ],
    trackingNumber: "TRK123456783",
    shippingAddress: {
      name: "Ahmad Fauzi",
      address: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      postalCode: "12345",
      phone: "+62 812-3456-7890"
    },
    canReview: true
  }
];

// Wishlist products data
export const wishlistProducts = [
  {
    id: 101,
    name: "iPhone 15 Pro Max 256GB",
    description: "Smartphone flagship dengan A17 Pro chip dan titanium design",
    price: 18499000,
    originalPrice: 19999000,
    image: "https://images.unsplash.com/photo-1592286115803-a1c3b552ee43?w=400&h=400&fit=crop&crop=center",
    category: "Elektronik",
    rating: 4.8,
    reviews: 1243,
    stock: 15,
    vendor: "Apple Store",
    vendorId: "apple-store",
    discount: 8,
    isNew: true,
    isBestseller: true,
    createdAt: "2024-01-15"
  },
  {
    id: 102,
    name: "MacBook Air M2 13-inch",
    description: "Laptop ultra-thin dengan M2 chip yang powerful",
    price: 15999000,
    originalPrice: 17999000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
    category: "Elektronik",
    rating: 4.9,
    reviews: 892,
    stock: 8,
    vendor: "Apple Store",
    vendorId: "apple-store",
    discount: 11,
    isNew: false,
    isBestseller: true,
    createdAt: "2024-01-10"
  },
  {
    id: 103,
    name: "Nike Air Max 270",
    description: "Sepatu olahraga dengan Max Air cushioning",
    price: 1599000,
    originalPrice: 1899000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    category: "Fashion",
    rating: 4.6,
    reviews: 2341,
    stock: 25,
    vendor: "Nike Official",
    vendorId: "nike-official",
    discount: 16,
    isNew: false,
    isBestseller: true,
    createdAt: "2024-01-08"
  },
  {
    id: 104,
    name: "Sony WH-1000XM5",
    description: "Wireless noise canceling headphones terbaik",
    price: 4299000,
    originalPrice: 4999000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    category: "Elektronik",
    rating: 4.7,
    reviews: 1567,
    stock: 12,
    vendor: "Sony Indonesia",
    vendorId: "sony-official",
    discount: 14,
    isNew: true,
    isBestseller: false,
    createdAt: "2024-01-20"
  },
  {
    id: 105,
    name: "Levi's 501 Original Jeans",
    description: "Celana jeans ikonik dengan fit regular",
    price: 899000,
    originalPrice: 1099000,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop&crop=center",
    category: "Fashion",
    rating: 4.5,
    reviews: 892,
    stock: 18,
    vendor: "Levi's Store",
    vendorId: "levis-official",
    discount: 18,
    isNew: false,
    isBestseller: true,
    createdAt: "2024-01-05"
  },
  {
    id: 106,
    name: "iPad Pro 12.9-inch M2",
    description: "Tablet professional dengan M2 chip dan Liquid Retina XDR display",
    price: 12499000,
    originalPrice: 14499000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center",
    category: "Elektronik",
    rating: 4.8,
    reviews: 623,
    stock: 10,
    vendor: "Apple Store",
    vendorId: "apple-store",
    discount: 14,
    isNew: false,
    isBestseller: false,
    createdAt: "2024-01-12"
  },
  {
    id: 107,
    name: "Adidas Ultraboost 22",
    description: "Sepatu lari dengan Boost midsole yang responsive",
    price: 2299000,
    originalPrice: 2599000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    category: "Fashion",
    rating: 4.4,
    reviews: 1782,
    stock: 30,
    vendor: "Adidas Official",
    vendorId: "adidas-official",
    discount: 12,
    isNew: true,
    isBestseller: true,
    createdAt: "2024-01-18"
  },
  {
    id: 108,
    name: "Samsung Galaxy Watch 6",
    description: "Smartwatch dengan body sensor dan sleep tracking",
    price: 3299000,
    originalPrice: 3999000,
    image: "https://images.unsplash.com/photo-1523275335684-0cfed4f6a45d?w=400&h=400&fit=crop&crop=center",
    category: "Elektronik",
    rating: 4.3,
    reviews: 543,
    stock: 22,
    vendor: "Samsung Store",
    vendorId: "samsung-official",
    discount: 18,
    isNew: false,
    isBestseller: false,
    createdAt: "2024-01-03"
  },
  {
    id: 109,
    name: "H&M Oversized Hoodie",
    description: "Hoodie nyaman dengan bahan katun organic",
    price: 459000,
    originalPrice: 599000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
    category: "Fashion",
    rating: 4.2,
    reviews: 234,
    stock: 35,
    vendor: "H&M Store",
    vendorId: "hm-official",
    discount: 23,
    isNew: true,
    isBestseller: false,
    createdAt: "2024-01-25"
  },
  {
    id: 110,
    name: "Canon EOS R6 Mark II",
    description: "Mirrorless camera dengan 24.2MP full-frame sensor",
    price: 28999000,
    originalPrice: 31999000,
    image: "https://images.unsplash.com/photo-1516035069371-2981d14848aa?w=400&h=400&fit=crop&crop=center",
    category: "Elektronik",
    rating: 4.9,
    reviews: 156,
    stock: 5,
    vendor: "Canon Store",
    vendorId: "canon-official",
    discount: 9,
    isNew: false,
    isBestseller: true,
    createdAt: "2024-01-14"
  },
  {
    id: 111,
    name: "Uniqlo Airism T-Shirt",
    description: "Kaos teknologi Airism yang adem dan nyaman",
    price: 199000,
    originalPrice: 299000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
    category: "Fashion",
    rating: 4.6,
    reviews: 3421,
    stock: 50,
    vendor: "Uniqlo Store",
    vendorId: "uniqlo-official",
    discount: 33,
    isNew: false,
    isBestseller: true,
    createdAt: "2024-01-07"
  },
  {
    id: 112,
    name: "JBL Flip 6",
    description: "Portable Bluetooth speaker dengan waterproof design",
    price: 1299000,
    originalPrice: 1599000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    category: "Elektronik",
    rating: 4.4,
    reviews: 892,
    stock: 28,
    vendor: "JBL Store",
    vendorId: "jbl-official",
    discount: 19,
    isNew: true,
    isBestseller: false,
    createdAt: "2024-01-22"
  },
  {
    id: 113,
    name: "Zara Trench Coat",
    description: "Trench coat klasik dengan modern twist",
    price: 1599000,
    originalPrice: 1899000,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop&crop=center",
    category: "Fashion",
    rating: 4.7,
    reviews: 267,
    stock: 15,
    vendor: "Zara Store",
    vendorId: "zara-official",
    discount: 16,
    isNew: false,
    isBestseller: false,
    createdAt: "2024-01-11"
  },
  {
    id: 114,
    name: "Kindle Paperwhite",
    description: "E-reader waterproof dengan 6.8 inch display",
    price: 2199000,
    originalPrice: 2499000,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&crop=center",
    category: "Elektronik",
    rating: 4.5,
    reviews: 1234,
    stock: 20,
    vendor: "Amazon Store",
    vendorId: "amazon-official",
    discount: 12,
    isNew: false,
    isBestseller: true,
    createdAt: "2024-01-16"
  },
  {
    id: 115,
    name: "Converse Chuck Taylor All Star",
    description: "Sepatu sneakers ikonik yang timeless",
    price: 899000,
    originalPrice: 1099000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    category: "Fashion",
    rating: 4.3,
    reviews: 3421,
    stock: 45,
    vendor: "Converse Store",
    vendorId: "converse-official",
    discount: 18,
    isNew: false,
    isBestseller: true,
    createdAt: "2024-01-02"
  }
];