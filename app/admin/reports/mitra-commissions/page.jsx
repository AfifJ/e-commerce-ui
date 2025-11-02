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
  DollarSign,
  Building,
  Calendar,
  Download,
  CheckCircle,
  Clock,
  Receipt,
  Percent,
  Award,
  MapPin,
  Star,
  Handshake,
} from "lucide-react";
import { Target } from "lucide-react";

// Mock data matching database schema
const mockMitraCommissionPayments = [
  {
    id: "uuid-mcp-001",
    userId: "uuid-mitra-001",
    userType: "mitra",
    userName: "PT. Mitra Sejahtera",
    userEmail: "info@mitrasejahtera.com",
    periodMonth: 1,
    periodYear: 2024,
    totalCommission: "5420000",
    totalTransactions: 89,
    status: "paid",
    paymentMethod: "transfer",
    bankAccount: "BCA 9999888877 a.n PT. Mitra Sejahtera",
    paidAt: "2024-01-28T10:30:00Z",
    processedBy: "uuid-admin-001",
    processedByName: "Admin User",
    notes: "Mitra commission for January 2024",
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-28T10:30:00Z"
  },
  {
    id: "uuid-mcp-002",
    userId: "uuid-mitra-002",
    userType: "mitra",
    userName: "CV. Karya Mandiri",
    userEmail: "contact@karyamandiri.com",
    periodMonth: 1,
    periodYear: 2024,
    totalCommission: "3890000",
    totalTransactions: 67,
    status: "processing",
    paymentMethod: "transfer",
    bankAccount: "Mandiri 6666555544 a.n CV. Karya Mandiri",
    paidAt: null,
    processedBy: null,
    processedByName: null,
    notes: "Mitra commission for January 2024 - processing",
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-27T14:20:00Z"
  },
  {
    id: "uuid-mcp-003",
    userId: "uuid-mitra-003",
    userType: "mitra",
    userName: "UD. Berkah Jaya",
    userEmail: "ud.berkahjaya@gmail.com",
    periodMonth: 12,
    periodYear: 2023,
    totalCommission: "4670000",
    totalTransactions: 103,
    status: "paid",
    paymentMethod: "transfer",
    bankAccount: "BRI 3333222211 a.n UD. Berkah Jaya",
    paidAt: "2024-01-10T15:45:00Z",
    processedBy: "uuid-admin-001",
    processedByName: "Admin User",
    notes: "Mitra commission for December 2023",
    createdAt: "2023-12-31T23:59:59Z",
    updatedAt: "2024-01-10T15:45:00Z"
  },
  {
    id: "uuid-mcp-004",
    userId: "uuid-mitra-001",
    userType: "mitra",
    userName: "PT. Mitra Sejahtera",
    userEmail: "info@mitrasejahtera.com",
    periodMonth: 12,
    periodYear: 2023,
    totalCommission: "6230000",
    totalTransactions: 125,
    status: "cancelled",
    paymentMethod: "transfer",
    bankAccount: "BCA 9999888877 a.n PT. Mitra Sejahtera",
    paidAt: null,
    processedBy: "uuid-admin-002",
    processedByName: "Admin Two",
    notes: "Cancelled due to non-compliance",
    createdAt: "2023-12-31T23:59:59Z",
    updatedAt: "2024-01-05T09:15:00Z"
  },
  {
    id: "uuid-mcp-005",
    userId: "uuid-mitra-004",
    userType: "mitra",
    userName: "PT. Partner Bisnis",
    userEmail: "hello@partnerbisnis.com",
    periodMonth: 1,
    periodYear: 2024,
    totalCommission: "2150000",
    totalTransactions: 34,
    status: "pending",
    paymentMethod: null,
    bankAccount: "BNI 2222111100 a.n PT. Partner Bisnis",
    paidAt: null,
    processedBy: null,
    processedByName: null,
    notes: "New mitra commission pending approval",
    createdAt: "2024-01-27T00:00:00Z",
    updatedAt: "2024-01-27T00:00:00Z"
  }
];

// Summary data
const mockMitraCommissionData = {
  summary: {
    totalCommissionPaid: 234500000,
    totalCommissionEarned: 267800000,
    pendingCommission: 33300000,
    totalBookingsGenerated: 1256,
    totalRevenueGenerated: 8934000000,
    averageCommissionRate: 3.0
  },
  commissionsByPeriod: [
    {
      period: "Jan 2024",
      earned: 18500000,
      paid: 16500000,
      pending: 2000000,
      bookings: 98,
      revenue: 650000000,
      rate: 2.8
    },
    {
      period: "Feb 2024",
      earned: 22300000,
      paid: 20800000,
      pending: 1500000,
      bookings: 112,
      revenue: 780000000,
      rate: 2.9
    },
    {
      period: "Mar 2024",
      earned: 26700000,
      paid: 25200000,
      pending: 1500000,
      bookings: 134,
      revenue: 920000000,
      rate: 2.9
    },
    {
      period: "Apr 2024",
      earned: 29800000,
      paid: 27800000,
      pending: 2000000,
      bookings: 156,
      revenue: 1050000000,
      rate: 2.8
    },
    {
      period: "May 2024",
      earned: 34200000,
      paid: 31200000,
      pending: 3000000,
      bookings: 178,
      revenue: 1210000000,
      rate: 2.8
    },
    {
      period: "Jun 2024",
      earned: 38900000,
      paid: 35400000,
      pending: 3500000,
      bookings: 189,
      revenue: 1340000000,
      rate: 2.9
    },
    {
      period: "Jul 2024",
      earned: 42500000,
      paid: 38500000,
      pending: 4000000,
      bookings: 201,
      revenue: 1480000000,
      rate: 2.9
    },
    {
      period: "Aug 2024",
      earned: 46700000,
      paid: 41900000,
      pending: 4800000,
      bookings: 188,
      revenue: 1504000000,
      rate: 3.1
    }
  ],
  topMitra: [
    {
      id: "MTR-001",
      name: "Hotel Maju Jaya",
      chain: "Independent",
      location: "Jakarta Pusat",
      starRating: 4,
      totalBookings: 156,
      totalRevenue: 1234000000,
      totalCommission: 37020000,
      pendingCommission: 2800000,
      commissionRate: 3.0,
      averageRoomRate: 7910256,
      performanceRating: "Excellent",
      lastCommissionDate: "2024-08-25T14:30:00Z",
      totalRooms: 120,
      occupancyRate: 78.5,
      mitraType: "hotel"
    },
    {
      id: "MTR-002",
      name: "Hotel Melati Indah",
      chain: "Local Chain",
      location: "Jakarta Selatan",
      starRating: 3,
      totalBookings: 134,
      totalRevenue: 876000000,
      totalCommission: 26280000,
      pendingCommission: 2100000,
      commissionRate: 3.0,
      averageRoomRate: 6537313,
      performanceRating: "Excellent",
      lastCommissionDate: "2024-08-24T10:15:00Z",
      totalRooms: 80,
      occupancyRate: 82.3,
      mitraType: "hotel"
    },
    {
      id: "MTR-003",
      name: "Restaurant Berkah",
      chain: "Independent",
      location: "Jakarta Barat",
      starRating: 3,
      totalBookings: 98,
      totalRevenue: 612000000,
      totalCommission: 18360000,
      pendingCommission: 1800000,
      commissionRate: 3.0,
      averageRoomRate: 6244897,
      performanceRating: "Good",
      lastCommissionDate: "2024-08-23T16:45:00Z",
      totalRooms: 60,
      occupancyRate: 75.8,
      mitraType: "restaurant"
    },
    {
      id: "MTR-004",
      name: "Grand Palace Hotel",
      chain: "International Chain",
      location: "Jakarta Pusat",
      starRating: 5,
      totalBookings: 89,
      totalRevenue: 1567000000,
      totalCommission: 47010000,
      pendingCommission: 3500000,
      commissionRate: 3.0,
      averageRoomRate: 1760674,
      performanceRating: "Excellent",
      lastCommissionDate: "2024-08-22T09:30:00Z",
      totalRooms: 200,
      occupancyRate: 85.2,
      mitraType: "hotel"
    },
    {
      id: "MTR-005",
      name: "Travel Wisata Nusantara",
      chain: "Budget Chain",
      location: "Jakarta Timur",
      starRating: 2,
      totalBookings: 167,
      totalRevenue: 334000000,
      totalCommission: 10020000,
      pendingCommission: 1200000,
      commissionRate: 3.0,
      averageRoomRate: 2000000,
      performanceRating: "Good",
      lastCommissionDate: "2024-08-20T11:20:00Z",
      totalRooms: 40,
      occupancyRate: 88.9,
      mitraType: "travel"
    }
  ],
  commissionsByChain: [
    {
      chain: "International Chain",
      mitra: 8,
      totalBookings: 456,
      totalRevenue: 3456000000,
      totalCommission: 103680000,
      averageRate: 3.0,
      pendingCommission: 8900000,
      topMitra: "Grand Palace Hotel"
    },
    {
      chain: "Local Chain",
      mitra: 15,
      totalBookings: 523,
      totalRevenue: 2876000000,
      totalCommission: 86280000,
      averageRate: 3.0,
      pendingCommission: 12800000,
      topMitra: "Hotel Melati Indah"
    },
    {
      chain: "Independent",
      mitra: 22,
      totalBookings: 277,
      totalRevenue: 1602000000,
      totalCommission: 48060000,
      averageRate: 3.0,
      pendingCommission: 11600000,
      topMitra: "Hotel Maju Jaya"
    },
    {
      chain: "Budget Chain",
      mitra: 6,
      totalBookings: 189,
      totalRevenue: 756000000,
      totalCommission: 22680000,
      averageRate: 3.0,
      pendingCommission: 3200000,
      topMitra: "Travel Wisata Nusantara"
    }
  ],
  commissionsByLocation: [
    {
      location: "Jakarta Pusat",
      mitra: 12,
      totalBookings: 445,
      totalRevenue: 4234000000,
      totalCommission: 127020000,
      averageRate: 3.0,
      pendingCommission: 15600000,
      topMitra: "Grand Palace Hotel"
    },
    {
      location: "Jakarta Selatan",
      mitra: 18,
      totalBookings: 389,
      totalRevenue: 2678000000,
      totalCommission: 80340000,
      averageRate: 3.0,
      pendingCommission: 8900000,
      topMitra: "Hotel Melati Indah"
    },
    {
      location: "Jakarta Barat",
      mitra: 10,
      totalBookings: 267,
      totalRevenue: 1234000000,
      totalCommission: 37020000,
      averageRate: 3.0,
      pendingCommission: 5600000,
      topMitra: "Restaurant Berkah"
    },
    {
      location: "Jakarta Timur",
      mitra: 8,
      totalBookings: 134,
      totalRevenue: 678000000,
      totalCommission: 20340000,
      averageRate: 3.0,
      pendingCommission: 2800000,
      topMitra: "Travel Wisata Nusantara"
    },
    {
      location: "Jakarta Utara",
      mitra: 3,
      totalBookings: 21,
      totalRevenue: 116000000,
      totalCommission: 3480000,
      averageRate: 3.0,
      pendingCommission: 400000,
      topMitra: "Mitra Utama"
    }
  ],
  commissionStatus: [
    {
      status: "Paid",
      count: 1098,
      amount: 234500000,
      percentage: 87.6
    },
    {
      status: "Pending",
      count: 158,
      amount: 33300000,
      percentage: 12.4
    }
  ],
  recentCommissions: [
    {
      id: "MTR-COM-2024-001",
      mitraId: "MTR-001",
      mitraName: "Hotel Maju Jaya",
      bookingId: "BKG-2024-089",
      amount: 14500000,
      bookingRevenue: 483333333,
      commissionRate: 3.0,
      status: "paid",
      paymentDate: "2024-08-25T14:30:00Z",
      dueDate: "2024-08-25T23:59:59Z",
      paymentMethod: "Transfer Bank",
      referenceNumber: "TRF-MTR-2024082501",
      checkInDate: "2024-08-20",
      checkOutDate: "2024-08-23",
      roomType: "Deluxe",
      nights: 3,
      notes: "Commission for August bookings"
    },
    {
      id: "MTR-COM-2024-002",
      mitraId: "MTR-002",
      mitraName: "Hotel Melati Indah",
      bookingId: "BKG-2024-156",
      amount: 8900000,
      bookingRevenue: 296666666,
      commissionRate: 3.0,
      status: "pending",
      paymentDate: null,
      dueDate: "2024-08-30T23:59:59Z",
      paymentMethod: null,
      referenceNumber: null,
      checkInDate: "2024-08-18",
      checkOutDate: "2024-08-20",
      roomType: "Superior",
      nights: 2,
      notes: "Monthly commission processing"
    },
    {
      id: "MTR-COM-2024-003",
      mitraId: "MTR-004",
      mitraName: "Grand Palace Hotel",
      bookingId: "BKG-2024-134",
      amount: 6700000,
      bookingRevenue: 223333333,
      commissionRate: 3.0,
      status: "paid",
      paymentDate: "2024-08-24T09:30:00Z",
      dueDate: "2024-08-24T23:59:59Z",
      paymentMethod: "Transfer Bank",
      referenceNumber: "TRF-MTR-2024082401",
      checkInDate: "2024-08-15",
      checkOutDate: "2024-08-17",
      roomType: "Executive Suite",
      nights: 2,
      notes: "Commission for premium bookings"
    }
  ]
};

function MetricCard({ title, value, icon, subtitle }) {
  const Icon = icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <div className="text-xs text-muted-foreground">
            {subtitle}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function PerformanceBadge({ rating }) {
  const ratingConfig = {
    Excellent: { color: "bg-green-100 text-green-800", icon: Award },
    Good: { color: "bg-blue-100 text-blue-800", icon: Target },
    Average: { color: "bg-yellow-100 text-yellow-800", icon: Target }
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


export default function MitraCommissionReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedChain, setSelectedChain] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState(null);

  const handleExportReport = (format) => {
    console.log(`Exporting mitra commission report in ${format} format`);
    // Implement export functionality
  };

  const handleViewCommissionDetails = (commission) => {
    setSelectedCommission(commission);
    setShowDetailsDialog(true);
  };

  const processCommissionPayment = (commissionId) => {
    console.log(`Processing mitra commission payment: ${commissionId}`);
    // Implement commission payment processing
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Handshake className="w-6 h-6" />
            Laporan Komisi Mitra
          </h1>
          <p className="text-gray-500">Analisis komprehensif komisi dari mitra bisnis</p>
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
          title="Total Komisi Mitra"
          value={`Rp ${(mockMitraCommissionData.summary.totalCommissionPaid / 1000000).toFixed(0)}M`}
          icon={DollarSign}
          subtitle="total komisi"
        />
        <MetricCard
          title="Total Booking Generate"
          value={mockMitraCommissionData.summary.totalBookingsGenerated.toLocaleString('id-ID')}
          icon={Calendar}
          subtitle="pemesanan"
        />
        <MetricCard
          title="Total Revenue Mitra"
          value={`Rp ${(mockMitraCommissionData.summary.totalRevenueGenerated / 1000000000).toFixed(1)}B`}
          icon={Building}
          subtitle="nilai pemesanan"
        />
        <MetricCard
          title="Rata-rata Rate Komisi"
          value={`${mockMitraCommissionData.summary.averageCommissionRate}%`}
          icon={Percent}
          subtitle="dari semua mitra"
        />
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Mitra */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Handshake className="w-5 h-5" />
              Mitra Teratas
            </CardTitle>
            <CardDescription>
              5 mitra dengan komisi tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMitraCommissionData.topMitra.map((mitra, index) => (
                <div key={mitra.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{mitra.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="capitalize">{mitra.mitraType}</span>
                        <span>•</span>
                        <span>{mitra.location}</span>
                        <span>•</span>
                        <span>{mitra.totalBookings} booking</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      Rp {(mitra.totalCommission / 1000000).toFixed(1)}M
                    </div>
                    <PerformanceBadge rating={mitra.performanceRating} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Commission by Chain */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Komisi per Jaringan
            </CardTitle>
            <CardDescription>
              Analisis komisi berdasarkan tipe jaringan mitra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMitraCommissionData.commissionsByChain.map((chain) => (
                <div key={chain.chain} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{chain.chain}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Rp {(chain.totalCommission / 1000000).toFixed(1)}M
                      </span>
                      <Badge variant="outline">{chain.mitra} mitra</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(chain.totalCommission / mockMitraCommissionData.summary.totalCommissionEarned) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>{chain.totalBookings} booking</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission by Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Komisi per Lokasi
            </CardTitle>
            <CardDescription>
              Distribusi komisi berdasarkan lokasi mitra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMitraCommissionData.commissionsByLocation.map((location) => (
                <div key={location.location} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{location.location}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Rp {(location.totalCommission / 1000000).toFixed(1)}M
                      </span>
                      <Badge variant="outline">{location.mitra} mitra</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(location.totalCommission / mockMitraCommissionData.summary.totalCommissionEarned) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>{location.totalBookings} booking</span>
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
              Aktivitas komisi mitra terkini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMitraCommissionData.recentCommissions.map((commission) => (
                <div key={commission.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Receipt className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-sm">{commission.mitraName}</div>
                      <div className="text-xs text-gray-500">
                        {commission.roomType} • {commission.nights} malam • {commission.commissionRate}% komisi
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