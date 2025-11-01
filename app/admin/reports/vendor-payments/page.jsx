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
  Building,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Users,
  Package,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Receipt,
} from "lucide-react";

// Mock data
const mockVendorPaymentsData = {
  summary: {
    totalPayments: 4567000000,
    totalVendors: 127,
    averagePaymentPerVendor: 35960000,
    pendingPayments: 234000000,
    completedPayments: 4333000000,
    overduePayments: 123000000,
    paymentGrowthRate: 18.5,
    vendorGrowthRate: 12.3
  },
  paymentsByPeriod: [
    { period: "Jan 2024", amount: 485000000, vendors: 89, completed: 435000000, pending: 50000000 },
    { period: "Feb 2024", amount: 523000000, vendors: 94, completed: 498000000, pending: 25000000 },
    { period: "Mar 2024", amount: 567000000, vendors: 102, completed: 542000000, pending: 25000000 },
    { period: "Apr 2024", amount: 598000000, vendors: 108, completed: 578000000, pending: 20000000 },
    { period: "May 2024", amount: 642000000, vendors: 115, completed: 612000000, pending: 30000000 },
    { period: "Jun 2024", amount: 689000000, vendors: 118, completed: 654000000, pending: 35000000 },
    { period: "Jul 2024", amount: 725000000, vendors: 123, completed: 685000000, pending: 40000000 },
    { period: "Aug 2024", amount: 786000000, vendors: 127, completed: 729000000, pending: 57000000 }
  ],
  topVendors: [
    {
      id: "VND-001",
      name: "PT. Elektronik Jaya",
      category: "Elektronik",
      totalPayments: 856000000,
      pendingAmount: 45000000,
      paymentFrequency: "Monthly",
      lastPaymentDate: "2024-08-25T14:30:00Z",
      totalOrders: 156,
      averageOrderValue: 5487179,
      paymentStatus: "active",
      growthRate: 23.5
    },
    {
      id: "VND-002",
      name: "CV. Fashion Trend",
      category: "Fashion",
      totalPayments: 634000000,
      pendingAmount: 28000000,
      paymentFrequency: "Bi-weekly",
      lastPaymentDate: "2024-08-22T10:15:00Z",
      totalOrders: 289,
      averageOrderValue: 2193775,
      paymentStatus: "active",
      growthRate: 18.2
    },
    {
      id: "VND-003",
      name: "UD. Rumah Tangga",
      category: "Rumah Tangga",
      totalPayments: 423000000,
      pendingAmount: 35000000,
      paymentFrequency: "Monthly",
      lastPaymentDate: "2024-08-20T16:45:00Z",
      totalOrders: 98,
      averageOrderValue: 4316326,
      paymentStatus: "active",
      growthRate: 15.8
    },
    {
      id: "VND-004",
      name: "PT. Gadget Indonesia",
      category: "Elektronik",
      totalPayments: 389000000,
      pendingAmount: 12000000,
      paymentFrequency: "Weekly",
      lastPaymentDate: "2024-08-26T09:30:00Z",
      totalOrders: 87,
      averageOrderValue: 4471264,
      paymentStatus: "active",
      growthRate: 28.5
    },
    {
      id: "VND-005",
      name: "CV. Sports Collection",
      category: "Fashion",
      totalPayments: 312000000,
      pendingAmount: 56000000,
      paymentFrequency: "Monthly",
      lastPaymentDate: "2024-08-15T11:20:00Z",
      totalOrders: 145,
      averageOrderValue: 2151724,
      paymentStatus: "overdue",
      growthRate: 8.7
    }
  ],
  paymentsByCategory: [
    {
      category: "Elektronik",
      totalPayments: 2845000000,
      percentage: 62.3,
      vendors: 45,
      pendingPayments: 89000000,
      completedPayments: 2756000000,
      growthRate: 22.3,
      topVendor: "PT. Elektronik Jaya"
    },
    {
      category: "Fashion",
      totalPayments: 1245000000,
      percentage: 27.3,
      vendors: 52,
      pendingPayments: 98000000,
      completedPayments: 1147000000,
      growthRate: 18.7,
      topVendor: "CV. Fashion Trend"
    },
    {
      category: "Rumah Tangga",
      totalPayments: 477000000,
      percentage: 10.4,
      vendors: 30,
      pendingPayments: 47000000,
      completedPayments: 430000000,
      growthRate: 5.2,
      topVendor: "UD. Rumah Tangga"
    }
  ],
  paymentStatus: [
    {
      status: "Completed",
      count: 1098,
      amount: 4333000000,
      percentage: 94.9,
      trend: "up"
    },
    {
      status: "Pending",
      count: 87,
      amount: 234000000,
      percentage: 5.1,
      trend: "stable"
    },
    {
      status: "Overdue",
      count: 12,
      amount: 123000000,
      percentage: 2.7,
      trend: "down"
    }
  ],
  recentPayments: [
    {
      id: "PAY-2024-001",
      vendorId: "VND-001",
      vendorName: "PT. Elektronik Jaya",
      amount: 125000000,
      status: "completed",
      paymentDate: "2024-08-25T14:30:00Z",
      dueDate: "2024-08-25T23:59:59Z",
      paymentMethod: "Transfer Bank",
      referenceNumber: "TRF-2024082501",
      invoiceNumber: "INV-2024-0845",
      ordersCovered: 15,
      notes: "Payment for August orders"
    },
    {
      id: "PAY-2024-002",
      vendorId: "VND-002",
      vendorName: "CV. Fashion Trend",
      amount: 89000000,
      status: "pending",
      paymentDate: null,
      dueDate: "2024-08-30T23:59:59Z",
      paymentMethod: null,
      referenceNumber: null,
      invoiceNumber: "INV-2024-0889",
      ordersCovered: 28,
      notes: "Bi-weekly payment schedule"
    },
    {
      id: "PAY-2024-003",
      vendorId: "VND-004",
      vendorName: "PT. Gadget Indonesia",
      amount: 67000000,
      status: "completed",
      paymentDate: "2024-08-26T09:30:00Z",
      dueDate: "2024-08-26T23:59:59Z",
      paymentMethod: "Transfer Bank",
      referenceNumber: "TRF-2024082601",
      invoiceNumber: "INV-2024-0867",
      ordersCovered: 12,
      notes: "Weekly payment for latest orders"
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

function PaymentStatusBadge({ status }) {
  const statusConfig = {
    completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    overdue: { color: "bg-red-100 text-red-800", icon: AlertTriangle }
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

export default function VendorPaymentsReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleExportReport = (format) => {
    console.log(`Exporting vendor payments report in ${format} format`);
    // Implement export functionality
  };

  const handleViewPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setShowDetailsDialog(true);
  };

  const processPayment = (paymentId) => {
    console.log(`Processing payment: ${paymentId}`);
    // Implement payment processing
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Pembayaran Vendor</h1>
          <p className="text-gray-500">Analisis pembayaran dan hubungan dengan vendor</p>
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
          title="Total Pembayaran"
          value={`Rp ${(mockVendorPaymentsData.summary.totalPayments / 1000000000).toFixed(1)}B`}
          change={mockVendorPaymentsData.summary.paymentGrowthRate}
          changeType="positive"
          icon={DollarSign}
          subtitle="dari bulan lalu"
        />
        <MetricCard
          title="Total Vendor"
          value={mockVendorPaymentsData.summary.totalVendors}
          change={mockVendorPaymentsData.summary.vendorGrowthRate}
          changeType="positive"
          icon={Building}
          subtitle="aktif"
        />
        <MetricCard
          title="Pembayaran Pending"
          value={`Rp ${(mockVendorPaymentsData.summary.pendingPayments / 1000000).toFixed(0)}M`}
          changeType="neutral"
          icon={Clock}
          subtitle="menunggu proses"
        />
        <MetricCard
          title="Rata-rata Pembayaran"
          value={`Rp ${(mockVendorPaymentsData.summary.averagePaymentPerVendor / 1000000).toFixed(1)}M`}
          change={8.5}
          changeType="positive"
          icon={Receipt}
          subtitle="per vendor"
        />
      </div>

      {/* Payment Trend Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Tren Pembayaran Vendor
          </CardTitle>
          <CardDescription>
            Total pembayaran vendor bulanan selama 8 bulan terakhir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Grafik Tren Pembayaran Vendor</p>
              <p className="text-sm text-gray-500">
                Total pembayaran tumbuh {mockVendorPaymentsData.summary.paymentGrowthRate}% MoM
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Vendors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Vendor Teratas
            </CardTitle>
            <CardDescription>
              5 vendor dengan nilai pembayaran tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVendorPaymentsData.topVendors.map((vendor, index) => (
                <div key={vendor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{vendor.name}</div>
                      <div className="text-xs text-gray-500">{vendor.category} • {vendor.totalOrders} pesanan</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      Rp {(vendor.totalPayments / 1000000).toFixed(1)}M
                    </div>
                    <PaymentStatusBadge status={vendor.paymentStatus} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Distribusi Status Pembayaran
            </CardTitle>
            <CardDescription>
              Status pembayaran vendor saat ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVendorPaymentsData.paymentStatus.map((status) => (
                <div key={status.status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm flex items-center gap-2">
                      <PaymentStatusBadge status={status.status.toLowerCase()} />
                      {status.status}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {status.count} transaksi
                      </span>
                      <Badge variant="outline">{status.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        status.status === "Completed" ? "bg-green-600" :
                        status.status === "Pending" ? "bg-yellow-600" : "bg-red-600"
                      }`}
                      style={{ width: `${status.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Rp {(status.amount / 1000000).toFixed(1)}M
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payments by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Pembayaran per Kategori
            </CardTitle>
            <CardDescription>
              Total pembayaran berdasarkan kategori vendor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVendorPaymentsData.paymentsByCategory.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{category.category}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Rp {(category.totalPayments / 1000000).toFixed(1)}M
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
                    <span>{category.vendors} vendor</span>
                    <GrowthIndicator value={category.growthRate} label="YoY" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Pembayaran Terbaru
            </CardTitle>
            <CardDescription>
              Aktivitas pembayaran vendor terkini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVendorPaymentsData.recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Receipt className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-sm">{payment.vendorName}</div>
                      <div className="text-xs text-gray-500">
                        {payment.ordersCovered} pesanan • {payment.invoiceNumber}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      Rp {(payment.amount / 1000000).toFixed(1)}M
                    </div>
                    <PaymentStatusBadge status={payment.status} />
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