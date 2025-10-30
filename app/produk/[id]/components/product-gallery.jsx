"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, Star, Video } from "lucide-react";

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Mock data untuk gambar tambahan
  const productImages = [
    product.image,
    `${product.image}&angle=2`,
    `${product.image}&angle=3`,
    `${product.image}&detail=1`,
    `${product.image}&lifestyle=1`,
  ];

  const imageLabels = [
    "Utama",
    "Samping",
    "Belakang",
    "Detail",
    "Lifestyle"
  ];

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
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
    <div className="space-y-4">
      {/* Main Image with Zoom */}
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group cursor-zoom-in">
        <Image
          src={productImages[selectedImage]}
          alt={`${product.name} - ${imageLabels[selectedImage]}`}
          fill
          className={`
            object-cover transition-all duration-300
            ${isZoomed ? 'scale-150' : 'scale-100'}
          `}
          onClick={handleImageClick}
        />

        {/* Product Badge */}
        {product.badge && (
          <div className={`absolute top-4 left-4 ${getBadgeColor(product.badge)} text-white text-xs font-bold px-3 py-1 rounded-full z-10`}>
            {product.badge}
          </div>
        )}

        {/* Video Indicator (jika ada video) */}
        {selectedImage === 4 && (
          <div className="absolute top-4 right-4 bg-black/70 text-white rounded-full p-2 z-10">
            <Video className="w-5 h-5" />
          </div>
        )}

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <ZoomIn className="w-5 h-5" />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-5 gap-2">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`
              relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200
              ${selectedImage === index
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <Image
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />

            {/* Thumbnail Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
              <span className="text-xs text-white font-medium">
                {imageLabels[index]}
              </span>
            </div>

            {/* Active Indicator */}
            {selectedImage === index && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Product Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span>{product.rating}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>•</span>
          <span>{product.reviews} ulasan</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>•</span>
          <span>900+ terjual</span>
        </div>
      </div>

      {/* Image Zoom Modal (simplified version) */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={productImages[selectedImage]}
              alt={`${product.name} - Zoomed`}
              width={1200}
              height={1200}
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}