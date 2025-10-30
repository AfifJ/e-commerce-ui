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