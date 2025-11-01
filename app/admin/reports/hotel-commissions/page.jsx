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
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building,
  Calendar,
  Download,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  Receipt,
  Percent,
  Award,
  MapPin,
  Star,
  BedDouble,
} from "lucide-react";
import { Target } from "lucide-react";

// Mock data
const mockHotelCommissionData = {
  summary: {
    totalCommissionPaid: 234500000,
    totalCommissionEarned: 267800000,
    pendingCommission: 33300000,
    totalBookingsGenerated: 1256,
    totalRevenueGenerated: 8934000000,
    averageCommissionRate: 3.0,
    commissionGrowthRate: 35.2,
    bookingGrowthRate: 28.7
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
  topHotels: [
    {
      id: "HTL-001",
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
      growthRate: 42.5,
      lastCommissionDate: "2024-08-25T14:30:00Z",
      totalRooms: 120,
      occupancyRate: 78.5
    },
    {
      id: "HTL-002",
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
      growthRate: 38.2,
      lastCommissionDate: "2024-08-24T10:15:00Z",
      totalRooms: 80,
      occupancyRate: 82.3
    },
    {
      id: "HTL-003",
      name: "Hotel Berkah",
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
      growthRate: 28.7,
      lastCommissionDate: "2024-08-23T16:45:00Z",
      totalRooms: 60,
      occupancyRate: 75.8
    },
    {
      id: "HTL-004",
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
      growthRate: 45.8,
      lastCommissionDate: "2024-08-22T09:30:00Z",
      totalRooms: 200,
      occupancyRate: 85.2
    },
    {
      id: "HTL-005",
      name: "Hotel Budget 88",
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
      growthRate: 22.3,
      lastCommissionDate: "2024-08-20T11:20:00Z",
      totalRooms: 40,
      occupancyRate: 88.9
    }
  ],
  commissionsByChain: [
    {
      chain: "International Chain",
      hotels: 8,
      totalBookings: 456,
      totalRevenue: 3456000000,
      totalCommission: 103680000,
      averageRate: 3.0,
      pendingCommission: 8900000,
      growthRate: 42.3,
      topHotel: "Grand Palace Hotel"
    },
    {
      chain: "Local Chain",
      hotels: 15,
      totalBookings: 523,
      totalRevenue: 2876000000,
      totalCommission: 86280000,
      averageRate: 3.0,
      pendingCommission: 12800000,
      growthRate: 35.8,
      topHotel: "Hotel Melati Indah"
    },
    {
      chain: "Independent",
      hotels: 22,
      totalBookings: 277,
      totalRevenue: 1602000000,
      totalCommission: 48060000,
      averageRate: 3.0,
      pendingCommission: 11600000,
      growthRate: 28.5,
      topHotel: "Hotel Maju Jaya"
    },
    {
      chain: "Budget Chain",
      hotels: 6,
      totalBookings: 189,
      totalRevenue: 756000000,
      totalCommission: 22680000,
      averageRate: 3.0,
      pendingCommission: 3200000,
      growthRate: 18.7,
      topHotel: "Hotel Budget 88"
    }
  ],
  commissionsByLocation: [
    {
      location: "Jakarta Pusat",
      hotels: 12,
      totalBookings: 445,
      totalRevenue: 4234000000,
      totalCommission: 127020000,
      averageRate: 3.0,
      pendingCommission: 15600000,
      growthRate: 45.2,
      topHotel: "Grand Palace Hotel"
    },
    {
      location: "Jakarta Selatan",
      hotels: 18,
      totalBookings: 389,
      totalRevenue: 2678000000,
      totalCommission: 80340000,
      averageRate: 3.0,
      pendingCommission: 8900000,
      growthRate: 32.8,
      topHotel: "Hotel Melati Indah"
    },
    {
      location: "Jakarta Barat",
      hotels: 10,
      totalBookings: 267,
      totalRevenue: 1234000000,
      totalCommission: 37020000,
      averageRate: 3.0,
      pendingCommission: 5600000,
      growthRate: 25.3,
      topHotel: "Hotel Berkah"
    },
    {
      location: "Jakarta Timur",
      hotels: 8,
      totalBookings: 134,
      totalRevenue: 678000000,
      totalCommission: 20340000,
      averageRate: 3.0,
      pendingCommission: 2800000,
      growthRate: 18.5,
      topHotel: "Hotel Budget 88"
    },
    {
      location: "Jakarta Utara",
      hotels: 3,
      totalBookings: 21,
      totalRevenue: 116000000,
      totalCommission: 3480000,
      averageRate: 3.0,
      pendingCommission: 400000,
      growthRate: 8.2,
      topHotel: "Hotel Utama"
    }
  ],
  commissionStatus: [
    {
      status: "Paid",
      count: 1098,
      amount: 234500000,
      percentage: 87.6,
      trend: "up"
    },
    {
      status: "Pending",
      count: 158,
      amount: 33300000,
      percentage: 12.4,
      trend: "stable"
    }
  ],
  recentCommissions: [
    {
      id: "HTL-COM-2024-001",
      hotelId: "HTL-001",
      hotelName: "Hotel Maju Jaya",
      bookingId: "BKG-2024-089",
      amount: 14500000,
      bookingRevenue: 483333333,
      commissionRate: 3.0,
      status: "paid",
      paymentDate: "2024-08-25T14:30:00Z",
      dueDate: "2024-08-25T23:59:59Z",
      paymentMethod: "Transfer Bank",
      referenceNumber: "TRF-HTL-2024082501",
      checkInDate: "2024-08-20",
      checkOutDate: "2024-08-23",
      roomType: "Deluxe",
      nights: 3,
      notes: "Commission for August bookings"
    },
    {
      id: "HTL-COM-2024-002",
      hotelId: "HTL-002",
      hotelName: "Hotel Melati Indah",
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
      id: "HTL-COM-2024-003",
      hotelId: "HTL-004",
      hotelName: "Grand Palace Hotel",
      bookingId: "BKG-2024-134",
      amount: 6700000,
      bookingRevenue: 223333333,
      commissionRate: 3.0,
      status: "paid",
      paymentDate: "2024-08-24T09:30:00Z",
      dueDate: "2024-08-24T23:59:59Z",
      paymentMethod: "Transfer Bank",
      referenceNumber: "TRF-HTL-2024082401",
      checkInDate: "2024-08-15",
      checkOutDate: "2024-08-17",
      roomType: "Executive Suite",
      nights: 2,
      notes: "Commission for premium bookings"
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

export default function HotelCommissionReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedChain, setSelectedChain] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState(null);

  const handleExportReport = (format) => {
    console.log(`Exporting hotel commission report in ${format} format`);
    // Implement export functionality
  };

  const handleViewCommissionDetails = (commission) => {
    setSelectedCommission(commission);
    setShowDetailsDialog(true);
  };

  const processCommissionPayment = (commissionId) => {
    console.log(`Processing hotel commission payment: ${commissionId}`);
    // Implement commission payment processing
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Komisi Hotel</h1>
          <p className="text-gray-500">Analisis komprehensif komisi dari mitra hotel</p>
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
          title="Total Komisi Hotel"
          value={`Rp ${(mockHotelCommissionData.summary.totalCommissionPaid / 1000000).toFixed(0)}M`}
          change={mockHotelCommissionData.summary.commissionGrowthRate}
          changeType="positive"
          icon={DollarSign}
          subtitle="dari bulan lalu"
        />
        <MetricCard
          title="Total Booking Generate"
          value={mockHotelCommissionData.summary.totalBookingsGenerated.toLocaleString('id-ID')}
          change={mockHotelCommissionData.summary.bookingGrowthRate}
          changeType="positive"
          icon={Calendar}
          subtitle="pemesanan"
        />
        <MetricCard
          title="Total Revenue Hotel"
          value={`Rp ${(mockHotelCommissionData.summary.totalRevenueGenerated / 1000000000).toFixed(1)}B`}
          change={25.8}
          changeType="positive"
          icon={Building}
          subtitle="nilai pemesanan"
        />
        <MetricCard
          title="Rata-rata Rate Komisi"
          value={`${mockHotelCommissionData.summary.averageCommissionRate}%`}
          changeType="neutral"
          icon={Percent}
          subtitle="dari semua hotel"
        />
      </div>

      {/* Commission Trend Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Tren Komisi Hotel
          </CardTitle>
          <CardDescription>
            Perkembangan komisi hotel dan pemesanan per bulan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Grafik Tren Komisi Hotel</p>
              <p className="text-sm text-gray-500">
                Total komisi tumbuh {mockHotelCommissionData.summary.commissionGrowthRate}% MoM
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Hotels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Hotel Teratas
            </CardTitle>
            <CardDescription>
              5 hotel dengan komisi tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockHotelCommissionData.topHotels.map((hotel, index) => (
                <div key={hotel.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{hotel.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <StarRating rating={hotel.starRating} />
                        <span>•</span>
                        <span>{hotel.location}</span>
                        <span>•</span>
                        <span>{hotel.totalBookings} booking</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      Rp {(hotel.totalCommission / 1000000).toFixed(1)}M
                    </div>
                    <PerformanceBadge rating={hotel.performanceRating} />
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
              <BedDouble className="w-5 h-5" />
              Komisi per Jaringan
            </CardTitle>
            <CardDescription>
              Analisis komisi berdasarkan tipe jaringan hotel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockHotelCommissionData.commissionsByChain.map((chain) => (
                <div key={chain.chain} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{chain.chain}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Rp {(chain.totalCommission / 1000000).toFixed(1)}M
                      </span>
                      <Badge variant="outline">{chain.hotels} hotel</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(chain.totalCommission / mockHotelCommissionData.summary.totalCommissionEarned) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{chain.totalBookings} booking</span>
                    <GrowthIndicator value={chain.growthRate} label="YoY" />
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
              Distribusi komisi berdasarkan lokasi hotel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockHotelCommissionData.commissionsByLocation.map((location) => (
                <div key={location.location} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{location.location}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Rp {(location.totalCommission / 1000000).toFixed(1)}M
                      </span>
                      <Badge variant="outline">{location.hotels} hotel</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(location.totalCommission / mockHotelCommissionData.summary.totalCommissionEarned) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{location.totalBookings} booking</span>
                    <GrowthIndicator value={location.growthRate} label="YoY" />
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
              Aktivitas komisi hotel terkini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockHotelCommissionData.recentCommissions.map((commission) => (
                <div key={commission.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Receipt className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-sm">{commission.hotelName}</div>
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