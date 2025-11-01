"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  MoreHorizontal
} from "lucide-react";

// Mock data - replace with actual API calls
const dashboardStats = {
  todayRevenue: {
    value: "Rp 15.750.000",
    change: 12.5,
    trend: "up"
  },
  monthlyOrders: {
    value: "248",
    change: -3.2,
    trend: "down"
  },
  lowStockProducts: {
    value: "8",
    change: 2,
    trend: "up"
  },
  pendingVerifications: {
    value: "12",
    change: -5,
    trend: "down"
  }
};

const recentOrders = [
  {
    id: "ORD20240115001",
    customer: "Ahmad Fadli",
    hotel: "Hotel Maju Jaya",
    amount: "Rp 3.336.890",
    status: "confirmed",
    date: "2024-01-15 11:00"
  },
  {
    id: "ORD20240115002",
    customer: "Siti Aminah",
    hotel: "Hotel Sentosa Abadi",
    amount: "Rp 3.555.790",
    status: "pending",
    date: "2024-01-15 12:00"
  },
  {
    id: "ORD20240115003",
    customer: "Budi Santoso",
    hotel: "Hotel Berkah",
    amount: "Rp 1.250.000",
    status: "processing",
    date: "2024-01-15 13:30"
  },
  {
    id: "ORD20240115004",
    customer: "Dewi Lestari",
    hotel: "Hotel Maju Jaya",
    amount: "Rp 899.000",
    status: "shipped",
    date: "2024-01-15 14:15"
  },
  {
    id: "ORD20240115005",
    customer: "Rizky Ahmad",
    hotel: "Hotel Sentosa Abadi",
    amount: "Rp 2.199.000",
    status: "delivered",
    date: "2024-01-15 15:00"
  }
];

const pendingPayments = [
  {
    id: "PAY20240115001",
    order: "ORD20240115002",
    customer: "Siti Aminah",
    amount: "Rp 3.555.790",
    method: "Transfer Bank",
    date: "2024-01-15 12:00",
    proofImage: true
  },
  {
    id: "PAY20240115002",
    order: "ORD20240115003",
    customer: "Budi Santoso",
    amount: "Rp 1.250.000",
    method: "QRIS",
    date: "2024-01-15 13:30",
    proofImage: true
  },
  {
    id: "PAY20240115003",
    order: "ORD20240115006",
    customer: "Maya Putri",
    amount: "Rp 5.750.000",
    method: "Transfer Bank",
    date: "2024-01-15 15:45",
    proofImage: false
  }
];

const stockAlerts = [
  {
    product: "Samsung Galaxy A15",
    sku: "SGA15-BLK-128",
    currentStock: 5,
    minStock: 10,
    vendor: "PT. Elektronik Jaya"
  },
  {
    product: "Xiaomi Redmi Note 13",
    sku: "XRN13-WHT-256",
    currentStock: 3,
    minStock: 5,
    vendor: "PT. Elektronik Jaya"
  },
  {
    product: "Kemeja Formal Pria - Navy",
    sku: "KFP-NAV-L",
    currentStock: 12,
    minStock: 20,
    vendor: "CV. Fashion Trend"
  },
  {
    product: "Vitamin C 1000mg",
    sku: "VC1000-60",
    currentStock: 8,
    minStock: 50,
    vendor: "PT. Elektronik Jaya"
  }
];

const topProducts = [
  { name: "Samsung Galaxy A15", sales: 45, revenue: "Rp 134.955.000" },
  { name: "Kemeja Formal Pria - Navy", sales: 38, revenue: "Rp 7.562.000" },
  { name: "Xiaomi Redmi Note 13", sales: 32, revenue: "Rp 105.568.000" },
  { name: "Dress Wanita - Floral", sales: 28, revenue: "Rp 6.972.000" },
  { name: "Madu Murni 500ml", sales: 25, revenue: "Rp 3.000.000" }
];

const salesData = [
  { date: "01-Jan", revenue: 12500000 },
  { date: "02-Jan", revenue: 15800000 },
  { date: "03-Jan", revenue: 18900000 },
  { date: "04-Jan", revenue: 14200000 },
  { date: "05-Jan", revenue: 22100000 },
  { date: "06-Jan", revenue: 19500000 },
  { date: "07-Jan", revenue: 23800000 },
  { date: "08-Jan", revenue: 17200000 },
  { date: "09-Jan", revenue: 25600000 },
  { date: "10-Jan", revenue: 21400000 },
  { date: "11-Jan", revenue: 28900000 },
  { date: "12-Jan", revenue: 26700000 },
  { date: "13-Jan", revenue: 31200000 },
  { date: "14-Jan", revenue: 28500000 },
  { date: "15-Jan", revenue: 15750000 }
];

// Simple bar chart component
function SimpleBarChart({ data, height = 200 }) {
  const maxValue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between h-full gap-1">
        {data.map((item, index) => {
          const heightPercent = (item.revenue / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                style={{ height: `${heightPercent}%` }}
                title={`${item.date}: Rp ${item.revenue.toLocaleString('id-ID')}`}
              />
              <div className="text-xs text-gray-500 mt-1 rotate-45 origin-left whitespace-nowrap">
                {item.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    confirmed: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
    processing: { color: "bg-purple-100 text-purple-800", icon: Package },
    shipped: { color: "bg-indigo-100 text-indigo-800", icon: Package },
    delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    cancelled: { color: "bg-red-100 text-red-800", icon: XCircle }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Overview sistem Bahana UMKM</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendapatan Hari Ini</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.todayRevenue.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {dashboardStats.todayRevenue.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={dashboardStats.todayRevenue.trend === "up" ? "text-green-500" : "text-red-500"}>
                {dashboardStats.todayRevenue.change > 0 ? "+" : ""}{dashboardStats.todayRevenue.change}%
              </span>
              <span>dari kemarin</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Bulan Ini</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.monthlyOrders.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {dashboardStats.monthlyOrders.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={dashboardStats.monthlyOrders.trend === "up" ? "text-green-500" : "text-red-500"}>
                {dashboardStats.monthlyOrders.change > 0 ? "+" : ""}{dashboardStats.monthlyOrders.change}%
              </span>
              <span>dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produk Low Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{dashboardStats.lowStockProducts.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 text-orange-500" />
              <span>Perlu restock segera</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{dashboardStats.pendingVerifications.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3 text-blue-500" />
              <span>Menunggu verifikasi</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Latest Orders</CardTitle>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={order.status} />
                    <p className="text-xs text-gray-500 mt-1">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Payments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Payments</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{payment.order}</p>
                    <p className="text-xs text-gray-500">{payment.customer}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{payment.method}</span>
                      {payment.proofImage && (
                        <span className="text-xs text-green-600">✓ Bukti</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{payment.amount}</p>
                    <p className="text-xs text-gray-500">{payment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stock Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Stock Alerts</CardTitle>
              <Button variant="ghost" size="sm">
                <AlertTriangle className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{alert.product}</p>
                    <p className="text-xs text-gray-500">{alert.vendor}</p>
                    <p className="text-xs text-gray-400">{alert.sku}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      alert.currentStock <= alert.minStock / 2 ? "text-red-600" : "text-orange-600"
                    }`}>
                      {alert.currentStock}/{alert.minStock}
                    </div>
                    <p className="text-xs text-gray-500">stock</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}