"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, Plus, Minus } from "lucide-react";

export default function StickyCta({ product, isVisible, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(product.price);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} x ${product.name}`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist: ${product.name}`);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-3 sm:p-4">
      {/* Close Button (Desktop) */}
      <button
        onClick={onClose}
        className="hidden md:block absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Product Info */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1 w-full sm:w-auto">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 p-0 text-xs bg-red-500">
                  {product.badge}
                </Badge>
              )}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <h3 className="font-semibold text-gray-900 truncate text-xs sm:text-sm">
                {product.name}
              </h3>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-sm sm:text-lg font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-gray-500 line-through hidden sm:inline">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quantity Selector (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Qty:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-1 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                className="w-12 text-center border-0 focus:ring-0 text-sm"
                min={1}
                max={10}
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-1 hover:bg-gray-100 transition-colors"
                disabled={quantity >= 10}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
            {/* Wishlist Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleWishlist}
              className="hidden md:flex items-center space-x-1 px-2 sm:px-3 min-w-[44px]"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>

            {/* Mobile Wishlist Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleWishlist}
              className="md:hidden p-2 min-w-[44px]"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>

            {/* Add to Cart */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-3 min-w-[80px]"
            >
              <span className="hidden sm:inline">+ Keranjang</span>
              <span className="sm:hidden">Keranjang</span>
            </Button>

            {/* Buy Now */}
            <Button
              size="sm"
              onClick={handleBuyNow}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-2 sm:px-3 min-w-[90px]"
            >
              <span className="hidden sm:inline">Beli Sekarang</span>
              <span className="sm:hidden">Beli</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}