"use client";

import { useState } from "react";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import SidebarNavigation from "../components/sidebar-navigation";
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
  Download
} from "lucide-react";
import { userProfile, userOrders } from "@/data/mock-data";


export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Package className="w-6 h-6" />
                    Pesanan Saya
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Kelola dan lacak semua pesanan Anda
                  </p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Riwayat
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
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
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Semua Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Diproses</option>
                    <option value="shipped">Dikirim</option>
                    <option value="delivered">Terkirim</option>
                  </select>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200">
                        <div className="p-6">
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900">{order.id}</span>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-sm text-gray-600">
                                {formatDate(order.date)} • {order.items.length} item
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
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="border-t border-gray-200 pt-4 mb-4">
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                      <Package className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900">{item.name}</p>
                                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <p className="font-medium text-gray-900">
                                    {formatCurrency(item.price)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Actions */}
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              <Truck className="w-4 h-4 mr-2" />
                              Lacak Pengiriman
                            </Button>
                            <Button variant="outline" size="sm">
                              Pesan Ulang
                            </Button>
                            {order.canReview && (
                              <Button variant="outline" size="sm">
                                <Star className="w-4 h-4 mr-2" />
                                Beri Ulasan
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="ml-auto">
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Detail
                            </Button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}