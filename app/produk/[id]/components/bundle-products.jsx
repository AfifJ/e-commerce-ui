"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Check } from "lucide-react";
import { products } from "@/data/mock-data";

export default function BundleProducts({ product }) {
  const [selectedBundle, setSelectedBundle] = useState([]);

  // Mock data untuk produk bundle
  const bundleProducts = [
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleBundleToggle = (bundleItem) => {
    setSelectedBundle(prev => {
      const isSelected = prev.some(item => item.id === bundleItem.id);
      if (isSelected) {
        return prev.filter(item => item.id !== bundleItem.id);
      } else {
        return [...prev, bundleItem];
      }
    });
  };

  const calculateBundleTotal = () => {
    const bundleTotal = selectedBundle.reduce((sum, item) => sum + item.price, 0);
    return bundleTotal;
  };

  const calculateOriginalTotal = () => {
    const bundleTotal = selectedBundle.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);
    return bundleTotal;
  };

  const calculateBundleSavings = () => {
    return calculateOriginalTotal() - calculateBundleTotal();
  };

  const getTotalWithMainProduct = () => {
    return product.price + calculateBundleTotal();
  };

  const addAllToCart = () => {
    const allItems = [product, ...selectedBundle];
    console.log("Adding to cart:", allItems);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Lengkapi Pembelian Anda
          </h2>
          <p className="text-gray-600 text-sm">
            Produk yang sering dibeli bersama {product.name}
          </p>
        </div>
        {selectedBundle.length > 0 && (
          <Badge className="bg-green-500 text-white">
            Hemat {formatPrice(calculateBundleSavings())}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Bundle Products */}
        {bundleProducts.map((bundleItem) => {
          const isSelected = selectedBundle.some(item => item.id === bundleItem.id);
          const discount = bundleItem.originalPrice ?
            Math.round(((bundleItem.originalPrice - bundleItem.price) / bundleItem.originalPrice) * 100) : 0;

          return (
            <div
              key={bundleItem.id}
              className={`
                relative border rounded-lg p-4 cursor-pointer transition-all
                ${isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
              onClick={() => handleBundleToggle(bundleItem)}
            >
              {/* Selection Indicator */}
              <div className={`
                absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                ${isSelected
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
                }
              `}>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>

              {/* Product Info */}
              <div className="flex space-x-3">
                <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={bundleItem.image}
                    alt={bundleItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {bundleItem.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {bundleItem.description}
                  </p>

                  {/* Price */}
                  <div className="flex flex-col lg:flex-row lg:items-center space-x-2 mt-2">
                    <span className="text-sm font-bold text-gray-900">
                      {formatPrice(bundleItem.price)}
                    </span>
                    {bundleItem.originalPrice && (
                      <div className="flex space-x-2">
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(bundleItem.originalPrice)}
                        </span>
                        {discount > 0 && (
                          <Badge variant="secondary" className="text-xs px-1 py-0">
                            -{discount}%
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bundle Summary */}
      {selectedBundle.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
            <div>
              <h3 className="font-semibold text-gray-900">Bundle Summary</h3>
              <p className="text-sm text-gray-600">
                Produk utama + {selectedBundle.length} aksesoris
              </p>
            </div>
            <div className="sm:text-right text-left">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 truncate">
                {formatPrice(getTotalWithMainProduct())}
              </div>
              <div className="text-sm text-green-600">
                Hemat {formatPrice(calculateBundleSavings())}
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm min-w-0">
              <span className="text-gray-600 truncate flex-shrink">{product.name}</span>
              <span className="font-medium ml-2 flex-shrink-0">{formatPrice(product.price)}</span>
            </div>
            {selectedBundle.map((item) => (
              <div key={item.id} className="flex justify-between text-sm min-w-0">
                <span className="text-gray-600 truncate flex-shrink">{item.name}</span>
                <span className="font-medium ml-2 flex-shrink-0">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={addAllToCart}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambahkan Semua ke Keranjang
          </Button>
        </div>
      )}

      {/* Empty State */}
      {selectedBundle.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <Plus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">
            Pilih produk di atas untuk melihat total bundle
          </p>
        </div>
      )}
    </div>
  );
}