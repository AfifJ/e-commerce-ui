"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  ShoppingCart,
  Heart,
  Star,
  TrendingUp,
  Clock,
  ArrowRight,
  Truck,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Dashboard({ userData }) {
  const [recentOrders] = useState([
    {
      id: "ORD-001",
      date: "2024-10-28",
      total: 750000,
      status: "delivered",
      statusLabel: "Terkirim",
      items: 2,
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD-002",
      date: "2024-10-25",
      total: 1200000,
      status: "processing",
      statusLabel: "Diproses",
      items: 3,
      trackingNumber: "TRK123456788"
    },
    {
      id: "ORD-003",
      date: "2024-10-20",
      total: 550000,
      status: "shipped",
      statusLabel: "Dikirim",
      items: 1,
      trackingNumber: "TRK123456787"
    }
  ]);

  const [recentWishlist] = useState([
    {
      id: "PROD-001",
      name: "iPhone 15 Pro Max",
      price: 18999000,
      image: "/images/products/iphone-15-pro-max.jpg",
      brand: "Apple"
    },
    {
      id: "PROD-002",
      name: "MacBook Air M3",
      price: 15999000,
      image: "/images/products/macbook-air-m3.jpg",
      brand: "Apple"
    },
    {
      id: "PROD-003",
      name: "AirPods Pro 2",
      price: 3999000,
      image: "/images/products/airpods-pro-2.jpg",
      brand: "Apple"
    },
    {
      id: "PROD-004",
      name: "Apple Watch Series 9",
      price: 6999000,
      image: "/images/products/apple-watch-9.jpg",
      brand: "Apple"
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { variant: "default", icon: CheckCircle },
      shipped: { variant: "secondary", icon: Truck },
      processing: { variant: "outline", icon: Clock },
      pending: { variant: "destructive", icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Selamat Datang Kembali, {userData.name}!
          </h1>
          <p className="text-gray-600 mt-1">Akses fitur penting dengan cepat</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-gray-300 text-gray-700" asChild>
            <Link href="/products">
              <ShoppingCart className="w-6 h-6" />
              <span>Lanjutkan Belanja</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-gray-300 text-gray-700" asChild>
            <Link href="/account/orders">
              <Package className="w-6 h-6" />
              <span>Lacak Pesanan</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-gray-300 text-gray-700" asChild>
            <Link href="/account/profile">
              <Star className="w-6 h-6" />
              <span>Update Profil</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-gray-300 text-gray-700" asChild>
            <Link href="/account/wishlist">
              <Heart className="w-6 h-6" />
              <span>Lihat Wishlist</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Pesanan Terbaru
            </h2>
            <p className="text-gray-600 text-sm mt-1">3 pesanan terakhir Anda</p>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(order.date)} • {order.items} item • {formatCurrency(order.total)}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/account/orders/${order.id}`}>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/account/orders">
              Lihat Semua Pesanan
            </Link>
          </Button>
        </div>

        {/* Recent Wishlist */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Wishlist Terbaru
            </h2>
            <p className="text-gray-600 text-sm mt-1">Produk yang baru saja Anda simpan</p>
          </div>
          <div className="space-y-3">
            {recentWishlist.map((product) => (
              <div key={product.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(product.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/account/wishlist">
              Lihat Semua Wishlist
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}