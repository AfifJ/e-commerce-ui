"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Heart,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCw,
  CreditCard,
  Check,
  ChevronDown,
  MapPin,
  Store
} from "lucide-react";
import VendorCard from "./vendor-card";

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [location, setLocation] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const discount = calculateDiscount();

  // Mock data untuk varian
  const colors = [
    { name: "Hitam", value: "#000000", inStock: true },
    { name: "Navy", value: "#1e3a8a", inStock: true },
    { name: "Abu-abu", value: "#6b7280", inStock: false },
    { name: "Putih", value: "#ffffff", inStock: true },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const promoOffers = [
    { icon: Truck, text: "Gratis Ongkir ke Jakarta" },
    { icon: CreditCard, text: "Cicilan 0% 3x dengan Kartu Kredit BCA" },
    { icon: RefreshCw, text: "Bebas Return 30 Hari" },
    { icon: Shield, text: "Garansi 100% Original" },
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Implement add to cart logic
    console.log(`Added ${quantity} x ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Implement buy now logic
    console.log(`Buy now: ${quantity} x ${product.name}`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist: ${product.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
          </div>
          <button className="text-blue-600 hover:text-blue-700">
            Lihat {product.reviews} ulasan
          </button>
          <span className="text-gray-500">• 900+ terjual</span>
        </div>
      </div>

      {/* Price Section */}
      <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:space-x-3">
        <span className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl text-gray-500 line-through truncate">
              {formatPrice(product.originalPrice)}
            </span>
            <Badge className="bg-red-500 text-white shrink-0">
              -{discount}%
            </Badge>
          </div>
        )}
      </div>

      <Separator />

      {/* Product Variants */}
      <div className="space-y-4">
        {/* Color Selection */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Warna: {colors[selectedColor].name}</h3>
          <div className="flex items-center space-x-3">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                disabled={!color.inStock}
                className={`
                  relative w-10 h-10 rounded-full border-2 transition-all
                  ${selectedColor === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}
                  ${!color.inStock ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}
                `}
                title={color.name}
              >
                <div
                  className="w-full h-full rounded-full border border-gray-200"
                  style={{ backgroundColor: color.value }}
                />
                {selectedColor === index && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Ukuran: {selectedSize}</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                  px-4 py-2 border rounded-lg font-medium transition-all
                  ${selectedSize === size
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Promo & Offers */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Promo & Penawaran Khusus</h3>
        <div className="space-y-2">
          {promoOffers.map((offer, index) => {
            const IconComponent = offer.icon;
            return (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <IconComponent className="w-5 h-5 text-green-600" />
                <span>{offer.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Quantity & CTA */}
      <div className="space-y-4">
        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-900">Jumlah:</span>
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              className="w-16 text-center border-0 focus:ring-0"
              min={1}
              max={10}
            />
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={quantity >= 10}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            variant="outline"
            onClick={handleAddToCart}
            className="flex items-center justify-center space-x-2"
          >
            <span>Tambah ke Keranjang</span>
          </Button>
          <Button
            size="lg"
            onClick={handleBuyNow}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Beli Sekarang
          </Button>
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          onClick={handleWishlist}
          className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-red-600"
        >
          <Heart
            className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
          />
          <span>{isWishlisted ? 'Dihapus dari Wishlist' : 'Tambah ke Wishlist'}</span>
        </Button>
      </div>

      <Separator />

      {/* Shipping Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Informasi Pengiriman</h3>

        {/* Location Input */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-400" />
          <Input
            placeholder="Cek pengiriman ke kota Anda"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" size="sm">
            Cek
          </Button>
        </div>

        {/* Shipping Info */}
        {location && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-sm text-blue-800">
              <Check className="w-4 h-4" />
              <span>
                Estimasi sampai: 2-4 hari kerja ke {location}
              </span>
            </div>
          </div>
        )}

        {/* Stock Status */}
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <Check className="w-4 h-4" />
          <span>Stok tersedia • Dikirim dari Jakarta</span>
        </div>
      </div>

      <Separator />

      {/* Vendor Information */}
      {product.vendorId && <VendorCard vendorId={product.vendorId} />}

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <Shield className="w-6 h-6 text-blue-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Garansi Uang Kembali</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <Truck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Pengiriman Aman</p>
        </div>
      </div>
    </div>
  );
}