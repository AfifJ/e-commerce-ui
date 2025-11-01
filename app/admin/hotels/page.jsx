"use client";

import { useState } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Building,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

// Mock data
const mockHotels = [
  {
    id: "hotel_001",
    name: "Hotel Maju Jaya",
    ownerName: "Budi Santoso",
    email: "info@majujaya.com",
    phone: "08123456785",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    city: "Jakarta",
    status: "active",
    rating: 4.5,
    totalRooms: 50,
    commissionedRooms: 35,
    commissionRate: 10,
    totalCommission: 2500000,
    createdAt: "2024-01-07T00:00:00Z",
    lastPayment: "2024-01-14T10:30:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (hotel) => console.log("View", hotel) },
      { label: "Edit Hotel", icon: Edit, onClick: (hotel) => console.log("Edit", hotel) },
      { label: "Delete", icon: Trash2, onClick: (hotel) => console.log("Delete", hotel), destructive: true }
    ]
  },
  {
    id: "hotel_002",
    name: "Hotel Berkah",
    ownerName: "Ahmad Fadli",
    email: "contact@berkahhotel.com",
    phone: "08123456786",
    address: "Jl. Gatot Subroto No. 456, Jakarta Selatan",
    city: "Jakarta",
    status: "pending",
    rating: 4.2,
    totalRooms: 30,
    commissionedRooms: 0,
    commissionRate: 8,
    totalCommission: 0,
    createdAt: "2024-01-08T00:00:00Z",
    lastPayment: null,
    actions: [
      { label: "View Details", icon: Eye, onClick: (hotel) => console.log("View", hotel) },
      { label: "Edit Hotel", icon: Edit, onClick: (hotel) => console.log("Edit", hotel) },
      { label: "Delete", icon: Trash2, onClick: (hotel) => console.log("Delete", hotel), destructive: true }
    ]
  },
  {
    id: "hotel_003",
    name: "Hotel Melati Indah",
    ownerName: "Siti Aminah",
    email: "info@melatiindah.com",
    phone: "08123456787",
    address: "Jl. Thamrin No. 789, Jakarta Pusat",
    city: "Jakarta",
    status: "active",
    rating: 4.8,
    totalRooms: 40,
    commissionedRooms: 28,
    commissionRate: 12,
    totalCommission: 1800000,
    createdAt: "2024-01-09T00:00:00Z",
    lastPayment: "2024-01-15T14:20:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (hotel) => console.log("View", hotel) },
      { label: "Edit Hotel", icon: Edit, onClick: (hotel) => console.log("Edit", hotel) },
      { label: "Delete", icon: Trash2, onClick: (hotel) => console.log("Delete", hotel), destructive: true }
    ]
  }
];

const hotelStats = {
  total: 3,
  active: 2,
  pending: 1,
  inactive: 0,
  totalRooms: 120,
  commissionedRooms: 63,
  totalCommission: 4300000
};

function StatusBadge({ status }) {
  const statusConfig = {
    active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
    inactive: { color: "bg-gray-100 text-gray-800", icon: XCircle }
  };

  const config = statusConfig[status] || statusConfig.active;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function RatingDisplay({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="text-sm font-medium">{rating}</span>
    </div>
  );
}

export default function HotelsPage() {
  const [hotels] = useState(mockHotels);
  const [selectedHotels, setSelectedHotels] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    {
      key: "name",
      title: "Hotel Information",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">{value}</div>
              <div className="text-sm text-gray-500">Owner: {row.ownerName}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 text-gray-400" />
            <span className="text-sm text-gray-600">{row.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3 text-gray-400" />
            <span className="text-sm text-gray-600">{row.email}</span>
          </div>
        </div>
      )
    },
    {
      key: "address",
      title: "Location",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="line-clamp-2">{value}</span>
          </div>
          <div className="text-xs text-gray-500">{row.city}</div>
        </div>
      )
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (value) => <StatusBadge status={value} />
    },
    {
      key: "rating",
      title: "Rating",
      sortable: true,
      render: (value) => <RatingDisplay rating={value} />
    },
    {
      key: "roomInfo",
      title: "Room Info",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="text-sm">
            <span className="font-medium">{row.commissionedRooms}</span> / {row.totalRooms} rooms
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(row.commissionedRooms / row.totalRooms) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">
            Commission: {row.commissionRate}%
          </div>
        </div>
      )
    },
    {
      key: "totalCommission",
      title: "Commission",
      sortable: true,
      render: (value) => (
        <div className="text-sm font-medium">
          Rp {value.toLocaleString('id-ID')}
        </div>
      )
    },
    {
      key: "lastPayment",
      title: "Last Payment",
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {value ? new Date(value).toLocaleDateString('id-ID') : 'Never'}
          <div className="text-xs text-gray-500">
            {value ? new Date(value).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'}
          </div>
        </div>
      )
    }
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "pending", label: "Pending" },
        { value: "inactive", label: "Inactive" }
      ]
    },
    {
      key: "city",
      label: "City",
      type: "select",
      options: [
        { value: "all", label: "All Cities" },
        { value: "Jakarta", label: "Jakarta" },
        { value: "Surabaya", label: "Surabaya" },
        { value: "Bandung", label: "Bandung" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hotel Management</h1>
          <p className="text-gray-500">Manage hotel partners and their properties</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Hotel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Hotel</DialogTitle>
              <DialogDescription>
                Register a new hotel partner in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hotelName">Hotel Name</Label>
                  <Input id="hotelName" placeholder="Enter hotel name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input id="ownerName" placeholder="Enter owner name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="hotel@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="08123456789" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter full address" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Jakarta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalRooms">Total Rooms</Label>
                  <Input id="totalRooms" type="number" placeholder="50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input id="commissionRate" type="number" placeholder="10" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Hotel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hotels</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hotelStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Registered hotels
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{hotelStats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commissioned Rooms</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{hotelStats.commissionedRooms}</div>
            <p className="text-xs text-muted-foreground">
              Out of {hotelStats.totalRooms} total rooms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              Rp {hotelStats.totalCommission.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={hotels}
        searchKey="name"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedHotels}
        onSelectedRowsChange={setSelectedHotels}
        pagination={{
          total: hotels.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        }}
        emptyMessage="No hotels found"
        actions={[
          {
            label: "Approve",
            icon: CheckCircle,
            onClick: (ids) => console.log("Approve", ids),
            disabled: selectedHotels.length === 0
          },
          {
            label: "Suspend",
            icon: XCircle,
            onClick: (ids) => console.log("Suspend", ids),
            disabled: selectedHotels.length === 0
          },
          {
            label: "Delete",
            icon: Trash2,
            onClick: (ids) => console.log("Delete", ids),
            disabled: selectedHotels.length === 0,
            destructive: true
          }
        ]}
      />
    </div>
  );
}