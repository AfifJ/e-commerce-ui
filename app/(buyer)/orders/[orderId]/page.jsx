"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderTimeline, TrackingInfo, OrderStatusBadge } from "@/app/(buyer)/checkout/components/order-timeline";
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  User,
  Phone,
  CreditCard,
  RefreshCw,
  MessageCircle,
  Download,
  Share,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { getOrderDetails } from "@/app/(buyer)/checkout/actions/checkout";

// Order Item Component
function OrderItemDetail({ item }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <Package className="w-8 h-8 text-gray-500" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        {item.variant && (
          <p className="text-sm text-gray-600 mb-2">Variant: {item.variant}</p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            <p className="text-sm text-gray-600 mt-1">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(item.price)} / pcs
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Customer Information Component
function CustomerInformation({ order }) {
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
            <p className="font-medium text-gray-900">{order.customerInfo.nama}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">WhatsApp</p>
            <p className="font-medium text-gray-900">{order.customerInfo.whatsapp}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600">Alamat Lengkap</p>
          <p className="font-medium text-gray-900">{order.customerInfo.alamat}</p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Kecamatan</p>
            <p className="font-medium text-gray-900">{order.shippingInfo.kecamatan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Kota/Kabupaten</p>
            <p className="font-medium text-gray-900">{order.shippingInfo.kotaKabupaten}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Kode Pos</p>
            <p className="font-medium text-gray-900">{order.shippingInfo.kodePos}</p>
          </div>
        </div>

        {order.shippingInfo.catatan && (
          <>
            <Separator />
            <div>
              <p className="text-sm text-gray-600">Catatan</p>
              <p className="font-medium text-gray-900">{order.shippingInfo.catatan}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Order Summary Component
function OrderSummaryDetails({ order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detail Pembayaran</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Order ID</span>
            <span className="font-medium text-gray-900">{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tanggal Order</span>
            <span className="font-medium text-gray-900">
              {new Date(order.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Metode Pembayaran</span>
            <span className="font-medium text-gray-900">{order.payment}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Metode Pengiriman</span>
            <span className="font-medium text-gray-900">{order.shipping}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
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
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
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

// Action Buttons Component
function ActionButtons({ order, onRefresh }) {
  const handleDownloadInvoice = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Invoice-${order.id}.pdf`;
    link.click();
  };

  const handleShareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Order ${order.id}`,
          text: `Status order ${order.id}: ${order.status}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const handleTrackOrder = () => {
    if (order.trackingNumber) {
      // Mock tracking URL
      window.open(`https://tracking.example.com/${order.trackingNumber}`, '_blank');
    }
  };

  const handleContactSupport = () => {
    // Mock contact support
    window.open('https://wa.me/6281234567890?text=Halo,%20saya%20butuh%20bantuan%20untuk%20order%20' + order.id, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tindakan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="outline"
          onClick={handleDownloadInvoice}
          className="w-full flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Invoice
        </Button>

        <Button
          variant="outline"
          onClick={handleShareOrder}
          className="w-full flex items-center gap-2"
        >
          <Share className="w-4 h-4" />
          Bagikan Order
        </Button>

        {order.trackingNumber && (
          <Button
            variant="outline"
            onClick={handleTrackOrder}
            className="w-full flex items-center gap-2"
          >
            <Truck className="w-4 h-4" />
            Lacak Pengiriman
          </Button>
        )}

        <Button
          variant="outline"
          onClick={handleContactSupport}
          className="w-full flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Hubungi CS
        </Button>

        <Button
          variant="outline"
          onClick={onRefresh}
          className="w-full flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  );
}

export default function OrderStatusPage({ params }) {
  const router = useRouter();
  const { orderId } = use(params);

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Akun', href: '/account' },
    { label: 'Order Saya', href: '/account/orders' },
    { label: 'Detail Order', href: null }
  ];

  const loadOrder = async () => {
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
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  // Auto refresh for active orders
  useEffect(() => {
    if (!order || !['pending', 'paid', 'processing'].includes(order.status)) {
      return;
    }

    const interval = setInterval(() => {
      loadOrder();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [order]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadOrder();
    setIsRefreshing(false);
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
          <Button onClick={() => router.push('/account/orders')}>
            Kembali ke Daftar Order
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
        {/* Order Header */}

        {/* Order Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Link href="/account/orders">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 mb-2">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Daftar Order
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-gray-600 mt-1">
                Dibuat pada {new Date(order.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isRefreshing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Order Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            <OrderTimeline
              status={order.status}
              trackingNumber={order.trackingNumber}
              createdAt={order.createdAt}
            />

            {/* Tracking Info */}
            <TrackingInfo
              trackingNumber={order.trackingNumber}
              status={order.status}
            />

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
                    <OrderItemDetail
                      key={`${item.id}-${item.variant}-${index}`}
                      item={item}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <CustomerInformation order={order} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <OrderSummaryDetails order={order} />

            {/* Action Buttons */}
            <ActionButtons order={order} onRefresh={handleRefresh} />
          </div>
        </div>
      </div>
    </div>
  );
}