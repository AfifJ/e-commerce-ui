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