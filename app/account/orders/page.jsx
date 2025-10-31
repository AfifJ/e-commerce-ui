"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import SidebarNavigation from "@/app/account/components/sidebar-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Search,
  Filter,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  ArrowRight,
  Download,
  Phone,
  MessageCircle,
  Image
} from "lucide-react";
import { userOrders } from "@/data/mock-data";
import ProductReviewModal from "@/app/account/orders/components/product-review-modal";


export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const breadcrumbItems = [
    { label: 'Akun Saya', href: '/account' },
    { label: 'Pesanan Saya', href: null }
  ];

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
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { variant: "default", icon: CheckCircle, color: "text-green-600" },
      shipped: { variant: "secondary", icon: Truck, color: "text-blue-600" },
      processing: { variant: "outline", icon: Clock, color: "text-yellow-600" },
      pending: { variant: "destructive", icon: AlertCircle, color: "text-red-600" }
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

  const filteredOrders = userOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleReviewOrder = (order) => {
    setSelectedOrder(order);
    setReviewModalOpen(true);
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Pesanan Saya</h1>
                  <p className="text-gray-600 mt-1">
                    Kelola dan lacak semua pesanan Anda
                  </p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Riwayat
                </Button>
              </div>

              {/* Quick Actions Section */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Butuh Bantuan?</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 mb-4">
                    Hubungi customer service kami untuk bantuan mengenai pesanan Anda
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Hubungi CS
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Live Chat
                    </Button>
                  </div>
                </div>
              </section>

              {/* Content */}
              <div className="space-y-8">
                {/* Search and Filter */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cari Pesanan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Cari pesanan atau produk..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="all">Semua Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Diproses</option>
                      <option value="shipped">Dikirim</option>
                      <option value="delivered">Terkirim</option>
                    </select>
                  </div>
                </section>

                {/* Orders List */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Daftar Pesanan</h3>
                  <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <div key={order.id} className={`bg-white border ${order.status === 'pending' ? 'border-orange-200 bg-orange-50/30' : order.status === 'processing' ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'} rounded-lg transition-all duration-200 hover:shadow-sm`}>
                          <div className="p-6">
                            {/* Order Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-gray-900">{order.id}</span>
                                  {getStatusBadge(order.status)}
                                </div>
                                <p className="text-sm text-gray-600">
                                  {formatDate(order.date)} • {order.items.reduce((total, item) => total + item.quantity, 0)} item ({order.items.length} produk)
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">
                                  {formatCurrency(order.total)}
                                </div>
                                {order.trackingNumber && (
                                  <p className="text-sm text-gray-600">
                                    Tracking: {order.trackingNumber}
                                  </p>
                                )}
                                {order.status === 'pending' && (
                                  <p className="text-xs text-orange-600 mt-1">
                                    Menunggu pembayaran
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="border-t border-gray-200 pt-4 mb-4">
                              <div className="space-y-3">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      {item.image ? (
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                              e.target.onerror = null;
                                              e.target.style.display = 'none';
                                              e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                                            }}
                                          />
                                        </div>
                                      ) : (
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                          <Image className="w-6 h-6 text-gray-400" />
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        {item.variant && (
                                          <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
                                        )}

                                      </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                      <p className="font-medium text-gray-900">
                                        {formatCurrency(item.price)}
                                      </p>
                                      {item.quantity > 1 && (
                                        <p className="text-xs text-gray-500">
                                          {formatCurrency(item.price * item.quantity)} total
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Actions */}
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                              {/* <Button variant="outline" size="sm">
                                <Truck className="w-4 h-4 mr-2" />
                                Lacak Pengiriman
                              </Button> */}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => alert('cart dengan produk yang sama')}
                              >
                                Pesan Ulang
                              </Button>
                              {order.canReview && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleReviewOrder(order)}
                                >
                                  <Star className="w-4 h-4 mr-2" />
                                  Beri Ulasan
                                </Button>
                              )}
                              <Link href={`/account/orders/${order.id}`}>
                                <Button variant="ghost" size="sm" className="ml-auto">
                                  <ArrowRight className="w-4 h-4 mr-2" />
                                  Detail
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Tidak ada pesanan ditemukan
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Coba ubah filter pencarian Anda
                        </p>
                        <Button onClick={() => {
                          setSearchTerm("");
                          setStatusFilter("all");
                        }}>
                          Reset Filter
                        </Button>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Review Modal */}
      {selectedOrder && (
        <ProductReviewModal
          isOpen={reviewModalOpen}
          onOpenChange={setReviewModalOpen}
          orderItems={selectedOrder.items}
          orderId={selectedOrder.id}
        />
      )}
    </div>
  );
}