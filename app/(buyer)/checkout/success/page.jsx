"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle,
  Package,
  Truck,
  Clock,
  Home,
  ShoppingBag,
  FileText
} from "lucide-react";
import Link from "next/link";
import { getOrderDetails } from "../actions/checkout";

// Order Summary Component
function SuccessOrderSummary({ order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ringkasan Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Order ID</span>
            <span className="font-medium text-gray-900">{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Jumlah Produk</span>
            <span className="font-medium text-gray-900">{order.items.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Metode Pembayaran</span>
            <span className="font-medium text-gray-900">{order.payment}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Status Pembayaran</span>
            <span className="font-medium text-green-600">Berhasil</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total Pembayaran</span>
          <span className="text-xl font-bold text-green-600">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(order.total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// Next Steps Component
function NextSteps({ order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Langkah Selanjutnya</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Order Diproses</h4>
              <p className="text-sm text-gray-600">
                Pesanan Anda sedang disiapkan oleh seller
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Pengiriman</h4>
              <p className="text-sm text-gray-600">
                Estimasi pengiriman 2-4 hari kerja
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Pesanan Tiba</h4>
              <p className="text-sm text-gray-600">
                Terima pesanan dan konfirmasi penerimaan
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Link href={`/orders/${order.id}`}>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Lihat Detail Order
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Action Buttons Component
function ActionButtons({ order }) {
  return (
    <div className="space-y-3">
      <Link href={`/orders/${order.id}`}>
        <Button className="w-full flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Track Order
        </Button>
      </Link>

      <Link href="/cart">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          Belanja Lagi
        </Button>
      </Link>

      <Link href="/">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Home className="w-4 h-4" />
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderId = searchParams.get('orderId');

  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Keranjang', href: '/cart' },
    { label: 'Checkout', href: '/checkout' },
    { label: 'Pembayaran', href: `/payment/${orderId}` },
    { label: 'Berhasil', href: null }
  ];

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) {
        setError('Order ID tidak ditemukan');
        setIsLoading(false);
        return;
      }

      try {
        const result = await getOrderDetails(orderId);
        if (result.success) {
          setOrder(result.data);
        } else {
          setError(result.error || 'Order tidak ditemukan');
        }
      } catch (error) {
        console.error('Error loading order:', error);
        setError('Terjadi kesalahan saat memuat data order');
      } finally {
        setIsLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4">
            <CheckCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Order tidak ditemukan'}</p>
          <Button onClick={() => router.push('/cart')}>
            Kembali ke Keranjang
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb - Outside container */}
      <Breadcrumb items={breadcrumbItems} className="bg-white border-b" />

      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pembayaran Berhasil!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Terima kasih, pesanan Anda telah diterima
          </p>
          <p className="text-gray-600">
            Order ID: <span className="font-medium text-gray-900">{order.id}</span>
          </p>
        </div>

        {/* Success Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Detail Produk ({order.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={`${item.id}-${item.variant}-${index}`} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        {item.variant && (
                          <p className="text-sm text-gray-600">Variant: {item.variant}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-medium text-gray-900">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0
                            }).format(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <NextSteps order={order} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <SuccessOrderSummary order={order} />

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <ActionButtons order={order} />
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Butuh Bantuan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Jika Anda memiliki pertanyaan tentang pesanan Anda, jangan ragu untuk menghubungi customer service kami.
                </p>
                <Button variant="outline" className="w-full">
                  Hubungi Customer Service
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}