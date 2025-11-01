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
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Receipt,
  Percent,
  Award,
} from "lucide-react";

// Mock data
const mockCommissionData = {
  summary: {
    totalCommissionPaid: 456700000,
    totalCommissionEarned: 512300000,
    pendingCommission: 55600000,
    totalSalesGenerated: 8956000000,
    averageCommissionRate: 5.7,
    commissionGrowthRate: 23.5,
    salesGrowthRate: 18.2
  },
  commissionsByPeriod: [
    {
      period: "Jan 2024",
      earned: 42500000,
      paid: 38500000,
      pending: 4000000,
      sales: 850000000,
      rate: 5.0
    },
    {
      period: "Feb 2024",
      earned: 48300000,
      paid: 45600000,
      pending: 2700000,
      sales: 966000000,
      rate: 5.0
    },
    {
      period: "Mar 2024",
      earned: 56700000,
      paid: 54200000,
      pending: 2500000,
      sales: 1098000000,
      rate: 5.2
    },
    {
      period: "Apr 2024",
      earned: 59800000,
      paid: 57800000,
      pending: 2000000,
      sales: 1142000000,
      rate: 5.2
    },
    {
      period: "May 2024",
      earned: 64200000,
      paid: 61200000,
      pending: 3000000,
      sales: 1234000000,
      rate: 5.2
    },
    {
      period: "Jun 2024",
      earned: 68900000,
      paid: 65400000,
      pending: 3500000,
      sales: 1298000000,
      rate: 5.3
    },
    {
      period: "Jul 2024",
      earned: 72500000,
      paid: 68500000,
      pending: 4000000,
      sales: 1346000000,
      rate: 5.4
    },
    {
      period: "Aug 2024",
      earned: 78600000,
      paid: 72900000,
      pending: 5700000,
      sales: 1402000000,
      rate: 5.6
    }
  ],
  topPerformers: [
    {
      id: "SLS-001",
      name: "John Doe",
      email: "john.doe@bahana-umkm.com",
      role: "Sales Senior",
      totalSales: 1456000000,
      totalCommission: 87360000,
      pendingCommission: 5600000,
      commissionRate: 6.0,
      totalOrders: 89,
      averageOrderValue: 16359550,
      performanceRating: "Excellent",
      growthRate: 28.5,
      lastCommissionDate: "2024-08-25T14:30:00Z"
    },
    {
      id: "SLS-002",
      name: "Jane Smith",
      email: "jane.smith@bahana-umkm.com",
      role: "Sales Executive",
      totalSales: 1234000000,
      totalCommission: 68040000,
      pendingCommission: 3400000,
      commissionRate: 5.5,
      totalOrders: 156,
      averageOrderValue: 7910256,
      performanceRating: "Excellent",
      growthRate: 23.2,
      lastCommissionDate: "2024-08-24T10:15:00Z"
    },
    {
      id: "SLS-003",
      name: "Ahmad Rahman",
      email: "ahmad.rahman@bahana-umkm.com",
      role: "Sales Executive",
      totalSales: 987000000,
      totalCommission: 49350000,
      pendingCommission: 2800000,
      commissionRate: 5.0,
      totalOrders: 134,
      averageOrderValue: 7365671,
      performanceRating: "Good",
      growthRate: 18.7,
      lastCommissionDate: "2024-08-23T16:45:00Z"
    },
    {
      id: "SLS-004",
      name: "Siti Aminah",
      email: "siti.aminah@bahana-umkm.com",
      role: "Sales Junior",
      totalSales: 756000000,
      totalCommission: 34020000,
      pendingCommission: 2100000,
      commissionRate: 4.5,
      totalOrders: 98,
      averageOrderValue: 7714285,
      performanceRating: "Good",
      growthRate: 15.8,
      lastCommissionDate: "2024-08-22T09:30:00Z"
    },
    {
      id: "SLS-005",
      name: "Budi Santoso",
      email: "budi.santoso@bahana-umkm.com",
      role: "Sales Junior",
      totalSales: 523000000,
      totalCommission: 20920000,
      pendingCommission: 1700000,
      commissionRate: 4.0,
      totalOrders: 87,
      averageOrderValue: 6011494,
      performanceRating: "Average",
      growthRate: 8.5,
      lastCommissionDate: "2024-08-20T11:20:00Z"
    }
  ],
  commissionByRole: [
    {
      role: "Sales Senior",
      members: 8,
      totalSales: 3456000000,
      totalCommission: 228000000,
      averageRate: 6.6,
      pendingCommission: 15600000,
      growthRate: 25.3,
      topPerformer: "John Doe"
    },
    {
      role: "Sales Executive",
      members: 15,
      totalSales: 4234000000,
      totalCommission: 212400000,
      averageRate: 5.0,
      pendingCommission: 28000000,
      growthRate: 20.8,
      topPerformer: "Jane Smith"
    },
    {
      role: "Sales Junior",
      members: 12,
      totalSales: 1266000000,
      totalCommission: 54300000,
      averageRate: 4.3,
      pendingCommission: 12000000,
      growthRate: 15.2,
      topPerformer: "Siti Aminah"
    }
  ],
  commissionStatus: [
    {
      status: "Paid",
      count: 1197,
      amount: 456700000,
      percentage: 89.1,
      trend: "up"
    },
    {
      status: "Pending",
      count: 89,
      amount: 55600000,
      percentage: 10.9,
      trend: "stable"
    }
  ],
  recentCommissions: [
    {
      id: "COM-2024-001",
      salesId: "SLS-001",
      salesName: "John Doe",
      orderId: "ORD-2024-089",
      amount: 14500000,
      salesAmount: 250000000,
      commissionRate: 5.8,
      status: "paid",
      paymentDate: "2024-08-25T14:30:00Z",
      dueDate: "2024-08-25T23:59:59Z",
      paymentMethod: "Transfer Bank",
      referenceNumber: "TRF-COM-2024082501",
      notes: "Commission for August sales"
    },
    {
      id: "COM-2024-002",
      salesId: "SLS-002",
      salesName: "Jane Smith",
      orderId: "ORD-2024-156",
      amount: 8900000,
      salesAmount: 161818181,
      commissionRate: 5.5,
      status: "pending",
      paymentDate: null,
      dueDate: "2024-08-30T23:59:59Z",
      paymentMethod: null,
      referenceNumber: null,
      notes: "Monthly commission processing"
    },
    {
      id: "COM-2024-003",
      salesId: "SLS-003",
      salesName: "Ahmad Rahman",
      orderId: "ORD-2024-134",
      amount: 6700000,
      salesAmount: 134000000,
      commissionRate: 5.0,
      status: "paid",
      paymentDate: "2024-08-24T09:30:00Z",
      dueDate: "2024-08-24T23:59:59Z",
      paymentMethod: "Transfer Bank",
      referenceNumber: "TRF-COM-2024082401",
      notes: "Commission for multiple orders"
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

function PerformanceBadge({ rating }) {
  const ratingConfig = {
    Excellent: { color: "bg-green-100 text-green-800", icon: Award },
    Good: { color: "bg-blue-100 text-blue-800", icon: Target },
    Average: { color: "bg-yellow-100 text-yellow-800", icon: Activity }
  };

  const config = ratingConfig[rating] || ratingConfig.Average;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {rating}
    </span>
  );
}

function CommissionStatusBadge({ status }) {
  const statusConfig = {
    paid: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock }
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

export default function CommissionReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState(null);

  const handleExportReport = (format) => {
    console.log(`Exporting commission report in ${format} format`);
    // Implement export functionality
  };

  const handleViewCommissionDetails = (commission) => {
    setSelectedCommission(commission);
    setShowDetailsDialog(true);
  };

  const processCommissionPayment = (commissionId) => {
    console.log(`Processing commission payment: ${commissionId}`);
    // Implement commission payment processing
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Komisi Sales</h1>
          <p className="text-gray-500">Analisis komprehensif performa dan komisi tim sales</p>
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
          title="Total Komisi Dibayar"
          value={`Rp ${(mockCommissionData.summary.totalCommissionPaid / 1000000).toFixed(0)}M`}
          change={mockCommissionData.summary.commissionGrowthRate}
          changeType="positive"
          icon={DollarSign}
          subtitle="dari bulan lalu"
        />
        <MetricCard
          title="Total Sales Generate"
          value={`Rp ${(mockCommissionData.summary.totalSalesGenerated / 1000000000).toFixed(1)}B`}
          change={mockCommissionData.summary.salesGrowthRate}
          changeType="positive"
          icon={Target}
          subtitle="total nilai"
        />
        <MetricCard
          title="Komisi Pending"
          value={`Rp ${(mockCommissionData.summary.pendingCommission / 1000000).toFixed(0)}M`}
          changeType="neutral"
          icon={Clock}
          subtitle="menunggu pembayaran"
        />
        <MetricCard
          title="Rata-rata Rate Komisi"
          value={`${mockCommissionData.summary.averageCommissionRate}%`}
          change={2.3}
          changeType="positive"
          icon={Percent}
          subtitle="dari semua transaksi"
        />
      </div>

      {/* Commission Trend Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Tren Komisi vs Sales
          </CardTitle>
          <CardDescription>
            Perbandingan komisi dan sales yang dihasilkan per bulan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Grafik Tren Komisi dan Sales</p>
              <p className="text-sm text-gray-500">
                Total komisi tumbuh {mockCommissionData.summary.commissionGrowthRate}% MoM
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Performa Terbaik
            </CardTitle>
            <CardDescription>
              5 sales dengan performa komisi tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCommissionData.topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{performer.name}</div>
                      <div className="text-xs text-gray-500">{performer.role} • {performer.totalOrders} pesanan</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      Rp {(performer.totalCommission / 1000000).toFixed(1)}M
                    </div>
                    <PerformanceBadge rating={performer.performanceRating} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Commission by Role */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Komisi per Role
            </CardTitle>
            <CardDescription>
              Analisis komisi berdasarkan jabatan sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCommissionData.commissionByRole.map((role) => (
                <div key={role.role} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{role.role}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Rp {(role.totalCommission / 1000000).toFixed(1)}M
                      </span>
                      <Badge variant="outline">{role.members} orang</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(role.totalCommission / mockCommissionData.summary.totalCommissionEarned) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Rate: {role.averageRate}%</span>
                    <GrowthIndicator value={role.growthRate} label="YoY" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Status Komisi
            </CardTitle>
            <CardDescription>
              Distribusi status pembayaran komisi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCommissionData.commissionStatus.map((status) => (
                <div key={status.status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm flex items-center gap-2">
                      <CommissionStatusBadge status={status.status.toLowerCase()} />
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
                        status.status === "Paid" ? "bg-green-600" : "bg-yellow-600"
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

        {/* Recent Commissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Komisi Terbaru
            </CardTitle>
            <CardDescription>
              Aktivitas komisi sales terkini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCommissionData.recentCommissions.map((commission) => (
                <div key={commission.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Receipt className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-sm">{commission.salesName}</div>
                      <div className="text-xs text-gray-500">
                        {commission.commissionRate}% dari Rp {(commission.salesAmount / 1000000).toFixed(0)}M
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      Rp {(commission.amount / 1000000).toFixed(1)}M
                    </div>
                    <CommissionStatusBadge status={commission.status} />
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