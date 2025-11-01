"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Target,
  Package,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from "lucide-react";

// Mock data
const mockSalesData = {
  summary: {
    totalRevenue: 2847500000,
    totalOrders: 1247,
    averageOrderValue: 2283000,
    totalCustomers: 892,
    growthRate: 15.8,
    monthOverMonth: 12.3,
    yearOverYear: 28.5
  },
  revenueByPeriod: [
    { period: "Jan 2024", revenue: 185000000, orders: 89, customers: 67 },
    { period: "Feb 2024", revenue: 223000000, orders: 104, customers: 78 },
    { period: "Mar 2024", revenue: 267000000, orders: 118, customers: 89 },
    { period: "Apr 2024", revenue: 298000000, orders: 134, customers: 101 },
    { period: "May 2024", revenue: 342000000, orders: 156, customers: 118 },
    { period: "Jun 2024", revenue: 389000000, orders: 178, customers: 134 },
    { period: "Jul 2024", revenue: 425000000, orders: 195, customers: 147 },
    { period: "Aug 2024", revenue: 467000000, orders: 213, customers: 162 }
  ],
  topProducts: [
    {
      id: "PRD-001",
      name: "Laptop ASUS ROG Strix G15",
      category: "Elektronik",
      totalSold: 45,
      revenue: 675000000,
      growthRate: 23.5,
      averagePrice: 15000000
    },
    {
      id: "PRD-002",
      name: "Samsung Galaxy S24 Ultra",
      category: "Elektronik",
      totalSold: 38,
      revenue: 836000000,
      growthRate: 18.2,
      averagePrice: 22000000
    },
    {
      id: "PRD-003",
      name: "Baju Muslim Wanita Premium",
      category: "Fashion",
      totalSold: 127,
      revenue: 19050000,
      growthRate: 45.8,
      averagePrice: 150000
    },
    {
      id: "PRD-004",
      name: "Smart TV LG 43 inch",
      category: "Elektronik",
      totalSold: 28,
      revenue: 126000000,
      growthRate: 12.3,
      averagePrice: 4500000
    },
    {
      id: "PRD-005",
      name: "Sepatu Nike Air Max 270",
      category: "Fashion",
      totalSold: 89,
      revenue: 160200000,
      growthRate: 8.7,
      averagePrice: 1800000
    }
  ],
  salesByCategory: [
    {
      category: "Elektronik",
      revenue: 1837000000,
      percentage: 64.5,
      orders: 712,
      growthRate: 22.3,
      topProduct: "Samsung Galaxy S24 Ultra"
    },
    {
      category: "Fashion",
      revenue: 756500000,
      percentage: 26.6,
      orders: 387,
      growthRate: 18.7,
      topProduct: "Baju Muslim Wanita Premium"
    },
    {
      category: "Rumah Tangga",
      revenue: 254000000,
      percentage: 8.9,
      orders: 148,
      growthRate: 5.2,
      topProduct: "Kitchen Set Stainless Steel"
    }
  ],
  paymentMethods: [
    {
      method: "Transfer Bank",
      count: 456,
      revenue: 1298500000,
      percentage: 45.6,
      growthRate: 8.3
    },
    {
      method: "E-Wallet",
      count: 389,
      revenue: 856400000,
      percentage: 30.1,
      growthRate: 45.2
    },
    {
      method: "Kartu Kredit",
      count: 267,
      revenue: 523800000,
      percentage: 18.4,
      growthRate: 12.8
    },
    {
      method: "COD",
      count: 135,
      revenue: 168800000,
      percentage: 5.9,
      growthRate: -5.3
    }
  ],
  topCustomers: [
    {
      id: "CUS-001",
      name: "PT. Teknologi Maju",
      email: "procurement@teknologimaju.com",
      totalOrders: 23,
      totalSpent: 345000000,
      averageOrderValue: 15000000,
      lastOrderDate: "2024-08-28T10:30:00Z",
      category: "Elektronik"
    },
    {
      id: "CUS-002",
      name: "CV. Fashion Trend",
      email: "info@fashiontrend.com",
      totalOrders: 18,
      totalSpent: 127500000,
      averageOrderValue: 7083333,
      lastOrderDate: "2024-08-25T14:15:00Z",
      category: "Fashion"
    },
    {
      id: "CUS-003",
      name: "PT. Hospitality Indonesia",
      email: "procurement@hospitality.co.id",
      totalOrders: 15,
      totalSpent: 98000000,
      averageOrderValue: 6533333,
      lastOrderDate: "2024-08-22T09:45:00Z",
      category: "Rumah Tangga"
    }
  ]
};

function MetricCard({ title, value, change, changeType, icon, subtitle }) {
  const isPositive = changeType === "positive";
  const Icon = icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3 text-green-600" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-600" />
            )}
            <span className={isPositive ? "text-green-600" : "text-red-600"}>
              {Math.abs(change)}%
            </span>
            <span>{subtitle}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GrowthIndicator({ value, label }) {
  const isPositive = value > 0;

  return (
    <div className="flex items-center gap-1">
      {isPositive ? (
        <TrendingUp className="w-4 h-4 text-green-600" />
      ) : (
        <TrendingDown className="w-4 h-4 text-red-600" />
      )}
      <span className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {Math.abs(value).toFixed(1)}%
      </span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}

export default function SalesReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  const handleExportReport = (format) => {
    console.log(`Exporting sales report in ${format} format`);
    // Implement export functionality
  };

  const handleViewDetails = (metricType) => {
    setSelectedMetric(metricType);
    setShowDetailsDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Penjualan</h1>
          <p className="text-gray-500">Analisis komprehensif performa penjualan</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="week">Minggu Ini</SelectItem>
              <SelectItem value="month">Bulan Ini</SelectItem>
              <SelectItem value="quarter">Kuartal Ini</SelectItem>
              <SelectItem value="year">Tahun Ini</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Pendapatan"
          value={`Rp ${(mockSalesData.summary.totalRevenue / 1000000000).toFixed(1)}B`}
          change={mockSalesData.summary.growthRate}
          changeType="positive"
          icon={DollarSign}
          subtitle="dari bulan lalu"
        />
        <MetricCard
          title="Total Pesanan"
          value={mockSalesData.summary.totalOrders.toLocaleString('id-ID')}
          change={mockSalesData.summary.monthOverMonth}
          changeType="positive"
          icon={ShoppingCart}
          subtitle="dari bulan lalu"
        />
        <MetricCard
          title="Rata-rata Nilai Pesanan"
          value={`Rp ${mockSalesData.summary.averageOrderValue.toLocaleString('id-ID')}`}
          change={8.5}
          changeType="positive"
          icon={Package}
          subtitle="dari bulan lalu"
        />
        <MetricCard
          title="Total Pelanggan"
          value={mockSalesData.summary.totalCustomers.toLocaleString('id-ID')}
          change={15.2}
          changeType="positive"
          icon={Users}
          subtitle="dari bulan lalu"
        />
      </div>

      {/* Revenue Trend Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Tren Pendapatan
          </CardTitle>
          <CardDescription>
            Pendapatan bulanan selama 8 bulan terakhir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Grafik Tren Pendapatan</p>
              <p className="text-sm text-gray-500">
                Total pendapatan tumbuh {mockSalesData.summary.yearOverYear}% YoY
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Produk Terlaris
            </CardTitle>
            <CardDescription>
              5 produk dengan penjualan tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSalesData.topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      Rp {(product.revenue / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-gray-500">{product.totalSold} terjual</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Penjualan per Kategori
            </CardTitle>
            <CardDescription>
              Distribusi penjualan berdasarkan kategori produk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSalesData.salesByCategory.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{category.category}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Rp {(category.revenue / 1000000).toFixed(1)}M
                      </span>
                      <Badge variant="outline">{category.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{category.orders} pesanan</span>
                    <GrowthIndicator value={category.growthRate} label="YoY" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Metode Pembayaran
            </CardTitle>
            <CardDescription>
              Distribusi transaksi berdasarkan metode pembayaran
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSalesData.paymentMethods.map((method) => (
                <div key={method.method} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-sm">{method.method}</div>
                      <div className="text-xs text-gray-500">{method.count} transaksi</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      {method.percentage}%
                    </div>
                    <GrowthIndicator value={method.growthRate} label="YoY" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Pelanggan Terbaik
            </CardTitle>
            <CardDescription>
              Pelanggan dengan nilai transaksi tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSalesData.topCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{customer.name}</div>
                      <div className="text-xs text-gray-500">{customer.totalOrders} pesanan</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      Rp {(customer.totalSpent / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-gray-500">
                      Avg: Rp {customer.averageOrderValue.toLocaleString('id-ID')}
                    </div>
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