"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { userOrders } from "@/data/mock-data";
import {
  Phone,
  MessageCircle,
  Copy,
  CreditCard,
  ArrowLeft,
  Star,
  RefreshCw,
  Check
} from "lucide-react";
import SidebarNavigation from "@/app/account/components/sidebar-navigation";
import OrderProgressTracker from "@/app/account/orders/components/order-progress-tracker";
import OrderItem from "@/app/account/orders/components/order-item";
import ProductReviewModal from "@/app/account/orders/components/product-review-modal";

// Mock function untuk mendapatkan order berdasarkan ID
function getOrder(id) {
  return userOrders.find(order => order.id === id);
}

export default function OrderDetailPage({ params }) {
  const resolvedParams = use(params);
  const order = getOrder(resolvedParams.id);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  if (!order) {
    notFound();
  }

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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const breadcrumbItems = [
    { label: 'Akun Saya', href: '/account' },
    { label: 'Pesanan Saya', href: '/account/orders' },
    { label: `Detail Pesanan ${order.id}`, href: null }
  ];

  // Calculate order totals
  const subtotal = order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = order.total - subtotal; // Simplified shipping calculation

  const copyTrackingNumber = () => {
    if (order.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      // TODO: Show toast notification
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation - Desktop Only */}
          <div className="lg:w-80 order-1 lg:order-1 hidden lg:block">
            <div className="sticky top-12 lg:block">
              <SidebarNavigation />
            </div>
          </div>

          {/* Main Content - Full Width on Mobile */}
          <div className="flex-1 order-2 lg:order-2">
            <div className="space-y-8">
              {/* Header */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Detail Pesanan</h1>
                </div>
                <p className="text-gray-600">
                  Nomor Pesanan : {order.id} • {formatDate(order.date)}
                </p>
              </div>

              {/* Order Progress Tracker */}
              <OrderProgressTracker status={order.status} />

              {/* Products Section */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detail Produk</h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <OrderItem
                      key={index}
                      item={item}
                      onReview={(item) => alert(`Review: ${item.name} - ${item.variant || ''}`)}
                    />
                  ))}
                </div>
              </section>

              {/* Order Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shipping Information */}
                <section className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pengiriman</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                      <p className="text-gray-600 text-sm mt-1">{order.shippingAddress.address}</p>
                      <p className="text-gray-600 text-sm">
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                      </p>
                      <p className="text-gray-600 text-sm">{order.shippingAddress.phone}</p>
                    </div>

                    {order.trackingNumber && (
                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Nomor Tracking</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600 font-mono">{order.trackingNumber}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyTrackingNumber}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Payment Information */}
                <section className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pembayaran</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">Transfer Bank BCA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Pembayaran Dikonfirmasi</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Virtual Account: 1234567890</p>
                      <p>Dibayar pada: {formatDate(order.date)}</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Price Breakdown */}
              <section className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rincian Pembayaran</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({order.items.reduce((total, item) => total + item.quantity, 0)} item)</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Biaya Pengiriman</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  {shipping < 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Diskon Pengiriman</span>
                      <span>-{formatCurrency(Math.abs(shipping))}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total Pembayaran</span>
                      <span className="text-xl">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Order Actions */}
              {order.status != null || order.status == 'pending' || order.status == 'delivered' &&
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tindakan Pesanan</h3>
                  <div className="flex flex-wrap gap-3">
                    {order.status === 'pending' && (
                      <>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Bayar Sekarang
                        </Button>
                        <Button variant="outline">
                          Batalkan Pesanan
                        </Button>
                      </>
                    )}
                    {order.status === 'delivered' && (
                      <>
                        <Button variant="outline" className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4" />
                          Beli Lagi
                        </Button>
                        {order.canReview && (
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => setReviewModalOpen(true)}
                          >
                            <Star className="w-4 h-4" />
                            Tulis Review
                          </Button>
                        )}
                        <Button variant="outline" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                          <RefreshCw className="w-4 h-4" />
                          Ajukan Return
                        </Button>
                      </>
                    )}
                  </div>
                </section>}

              {/* Quick Support */}
              <section className="border p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Butuh Bantuan?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Hubungi Customer Service
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Live Chat
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Product Review Modal */}
      <ProductReviewModal
        isOpen={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        orderItems={order.items}
        orderId={order.id}
      />
    </div>
  );
}