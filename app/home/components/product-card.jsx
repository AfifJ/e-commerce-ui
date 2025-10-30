"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingToCart(false);

    // You could show a toast notification here
    console.log(`Added ${product.name} to cart`);
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsWishlisted(!isWishlisted);
    // Simulate API call
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist: ${product.name}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'HOT':
        return 'bg-red-500';
      case 'DISKON':
        return 'bg-green-500';
      case 'BARU':
        return 'bg-blue-500';
      case 'BESTSELLER':
        return 'bg-purple-500';
      case 'TRENDING':
        return 'bg-orange-500';
      case 'LIMITED':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Link
      href={`/produk/${product.id}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badge */}
          {/* {product.badge && (
            <div className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} text-white text-xs font-bold px-2 py-1 rounded`}>
              {product.badge}
            </div>
          )} */}

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 bg-white/90 hover:bg-white text-gray-700 shadow-md"
              onClick={handleWishlist}
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 mb-1">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          size="sm"
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Menambahkan...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Tambah ke Keranjang
            </div>
          )}
        </Button>
      </div>
    </Link>
  );
}