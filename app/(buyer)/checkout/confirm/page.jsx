"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CheckCircle,
  Truck,
  Smartphone,
  MapPin,
  User,
  Package,
  Clock
} from "lucide-react";
import Link from "next/link";
import { processPaymentAction, getOrderDetails } from "../actions/checkout";
import { generateQRIS } from "@/lib/user-service";

// Order Item Component
function OrderItem({ item }) {
  return (
    <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
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
  );
}

// Customer Info Component
function CustomerInfo({ customerInfo, shippingInfo }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="w-5 h-5" />
          Informasi Penerima
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Nama Lengkap</p>
            <p className="font-medium text-gray-900">{customerInfo.nama}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">WhatsApp</p>
            <p className="font-medium text-gray-900">{customerInfo.whatsapp}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600">Alamat Lengkap</p>
          <p className="font-medium text-gray-900">{customerInfo.alamat}</p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Kecamatan</p>
            <p className="font-medium text-gray-900">{shippingInfo.kecamatan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Kota/Kabupaten</p>
            <p className="font-medium text-gray-900">{shippingInfo.kotaKabupaten}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Kode Pos</p>
            <p className="font-medium text-gray-900">{shippingInfo.kodePos}</p>
          </div>
        </div>

        {shippingInfo.catatan && (
          <div>
            <p className="text-sm text-gray-600">Catatan</p>
            <p className="font-medium text-gray-900">{shippingInfo.catatan}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Order Summary Component
function OrderSummary({ order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ringkasan Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({order.items.length} produk)</span>
            <span className="font-medium text-gray-900">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(order.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Biaya Pengiriman</span>
            <span className="font-medium text-gray-900">
              {order.shippingCost === 0
                ? 'GRATIS'
                : new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(order.shippingCost)}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Diskon</span>
              <span>
                -{new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(order.discount)}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total Pembayaran</span>
          <span className="text-xl font-bold text-gray-900">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(order.total)}
          </span>
        </div>

        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <Clock className="w-4 h-4 text-blue-600" />
          <p className="text-sm text-blue-800">
            Pembayaran harus diselesaikan dalam 2 jam
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Shipping & Payment Info Component
function ShippingPaymentInfo({ order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Metode Pengiriman & Pembayaran</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
          <Truck className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">{order.shipping}</p>
            <p className="text-sm text-gray-600">Estimasi 2-4 hari kerja</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
          <Smartphone className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">{order.payment}</p>
            <p className="text-sm text-gray-600">Pembayaran instan dengan QR code</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const orderId = searchParams.get('orderId');

  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Keranjang', href: '/cart' },
    { label: 'Checkout', href: '/checkout' },
    { label: 'Konfirmasi', href: null }
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

  const handlePayment = async () => {
    if (!order) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Create FormData for server action
      const formData = new FormData();
      formData.append('orderId', order.id);
      formData.append('paymentMethod', order.payment);
      formData.append('amount', order.total.toString());

      // Process payment
      const result = await processPaymentAction(formData);

      if (result?.success) {
        // Redirect to payment page
        router.push(`/payment/${order.id}`);
      } else {
        setError(result.error || 'Gagal memproses pembayaran');
        setIsProcessing(false);
      }
    } catch (error) {
      // Handle redirect errors (this is normal behavior)
      if (error.digest?.startsWith('NEXT_REDIRECT')) {
        // This is a redirect, let it happen
        return;
      }

      console.error('Payment error:', error);
      setError('Terjadi kesalahan saat memproses pembayaran');
      setIsProcessing(false);
    }
  };

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
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Berhasil Dibuat!</h1>
          <p className="text-gray-600">
            Order ID: <span className="font-medium text-gray-900">{order.id}</span>
          </p>
        </div>

        {/* Breadcrumb */}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Order Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detail Produk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <OrderItem key={`${item.id}-${item.variant}-${index}`} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <CustomerInfo
              customerInfo={order.customerInfo}
              shippingInfo={order.shippingInfo}
            />

            {/* Shipping & Payment Info */}
            <ShippingPaymentInfo order={order} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <OrderSummary order={order} />

            {/* Action Button */}
            <Card>
              <CardContent className="pt-6">
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? 'Memproses...' : 'Bayar dengan QRIS'}
                </Button>

                <div className="mt-4 text-center">
                  <Link href="/cart" className="text-sm text-gray-600 hover:text-gray-900">
                    Batalkan Order
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}