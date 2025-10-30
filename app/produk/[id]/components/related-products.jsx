"use client";

import { products } from "@/data/mock-data";
import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Heart } from "lucide-react";

export default function RelatedProducts({ currentProduct }) {
  // Filter related products (excluding current product)
  const relatedProducts = products
    .filter(product => product.id !== currentProduct.id)
    .slice(0, 4);

  // Mock data untuk "Pelanggan yang melihat ini juga melihat"
  const alsoViewed = products
    .filter(product => product.id !== currentProduct.id && product.category === currentProduct.category)
    .slice(0, 3);

  // Mock data untuk "Dari Brand yang Sama"
  const sameBrand = [
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

  return (
    <div className="space-y-12 pt-6">
      {/* Also Viewed Section */}
      {alsoViewed.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Eye className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Pelanggan yang melihat ini juga melihat
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Produk-produk serupa yang mungkin Anda suka
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {alsoViewed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Complete Your Look Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Lengkapi Gaya Kamu
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Produk-produk yang sempurna untuk melengkapi koleksi Anda
              </p>
            </div>
          </div>
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 md:hidden">
          <Button variant="outline" className="w-full">
            Lihat Semua Produk
          </Button>
        </div>
      </section>

      {/* Same Brand Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Dari Brand yang Sama
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Eksplorasi produk lain dari Premium
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            Lihat Brand Premium
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {sameBrand.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Dapatkan Penawaran Eksklusif!
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe untuk mendapatkan info diskon dan produk terbaru dari Premium
        </p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
          <input
            type="email"
            placeholder="Masukkan email Anda"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="bg-blue-600 hover:bg-blue-700">
            Subscribe
          </Button>
        </div>
      </section>
    </div>
  );
}