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
  Package,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

// Mock data
const mockVendors = [
  {
    id: "vendor_001",
    name: "PT. Elektronik Jaya",
    email: "vendor1@supplier.com",
    phone: "08123456781",
    address: "Jl. Industri No. 123, Jakarta Utara",
    city: "Jakarta",
    status: "active",
    rating: 4.5,
    totalProducts: 150,
    activeProducts: 142,
    totalOrders: 1250,
    revenue: 250000000,
    commissionRate: 8,
    totalCommission: 20000000,
    joinDate: "2024-01-03T00:00:00Z",
    lastOrder: "2024-01-15T14:20:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (vendor) => console.log("View", vendor) },
      { label: "Edit Vendor", icon: Edit, onClick: (vendor) => console.log("Edit", vendor) },
      { label: "Delete", icon: Trash2, onClick: (vendor) => console.log("Delete", vendor), destructive: true }
    ]
  },
  {
    id: "vendor_002",
    name: "CV. Fashion Trend",
    email: "vendor2@supplier.com",
    phone: "08123456782",
    address: "Jl. Pusat Mode No. 456, Jakarta Pusat",
    city: "Jakarta",
    status: "active",
    rating: 4.8,
    totalProducts: 200,
    activeProducts: 198,
    totalOrders: 2100,
    revenue: 420000000,
    commissionRate: 10,
    totalCommission: 42000000,
    joinDate: "2024-01-04T00:00:00Z",
    lastOrder: "2024-01-15T16:45:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (vendor) => console.log("View", vendor) },
      { label: "Edit Vendor", icon: Edit, onClick: (vendor) => console.log("Edit", vendor) },
      { label: "Delete", icon: Trash2, onClick: (vendor) => console.log("Delete", vendor), destructive: true }
    ]
  },
  {
    id: "vendor_003",
    name: "UD. Rumah Tangga",
    email: "vendor3@supplier.com",
    phone: "08123456789",
    address: "Jl. Perabotan No. 789, Jakarta Barat",
    city: "Jakarta",
    status: "pending",
    rating: 4.2,
    totalProducts: 80,
    activeProducts: 0,
    totalOrders: 0,
    revenue: 0,
    commissionRate: 7,
    totalCommission: 0,
    joinDate: "2024-01-10T00:00:00Z",
    lastOrder: null,
    actions: [
      { label: "View Details", icon: Eye, onClick: (vendor) => console.log("View", vendor) },
      { label: "Edit Vendor", icon: Edit, onClick: (vendor) => console.log("Edit", vendor) },
      { label: "Delete", icon: Trash2, onClick: (vendor) => console.log("Delete", vendor), destructive: true }
    ]
  }
];

const vendorStats = {
  total: 3,
  active: 2,
  pending: 1,
  inactive: 0,
  totalProducts: 430,
  activeProducts: 340,
  totalOrders: 3350,
  totalRevenue: 670000000,
  totalCommission: 62000000
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

export default function VendorPage() {
  const [vendors] = useState(mockVendors);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    {
      key: "name",
      title: "Vendor Information",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Building className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-medium">{value}</div>
              <div className="text-sm text-gray-500">{row.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 text-gray-400" />
            <span className="text-sm text-gray-600">{row.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-sm text-gray-600 line-clamp-1">{row.address}</span>
          </div>
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
      key: "products",
      title: "Products",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Package className="w-3 h-3 text-gray-400" />
            <span className="font-medium">{row.activeProducts}</span>
            <span className="text-gray-500">/ {row.totalProducts}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${(row.activeProducts / row.totalProducts) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">
            {((row.activeProducts / row.totalProducts) * 100).toFixed(1)}% active
          </div>
        </div>
      )
    },
    {
      key: "totalOrders",
      title: "Performance",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-3 h-3 text-gray-400" />
            <span>{row.totalOrders} orders</span>
          </div>
          <div className="text-sm font-medium">
            Rp {row.revenue.toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-gray-500">
            {row.commissionRate}% commission
          </div>
        </div>
      )
    },
    {
      key: "totalCommission",
      title: "Commission",
      sortable: true,
      render: (value) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">
            Rp {row.totalCommission.toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-gray-500">
            Total earned
          </div>
        </div>
      )
    },
    {
      key: "lastOrder",
      title: "Last Activity",
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {value ? new Date(value).toLocaleDateString('id-ID') : 'No orders'}
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
          <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
          <p className="text-gray-500">Manage vendors and their product catalogs</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
              <DialogDescription>
                Register a new vendor in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendorName">Company Name</Label>
                  <Input id="vendorName" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="vendor@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="08123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input id="commissionRate" type="number" placeholder="10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter full address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Jakarta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" placeholder="John Doe" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Vendor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Registered vendors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{vendorStats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{vendorStats.activeProducts}</div>
            <p className="text-xs text-muted-foreground">
              Out of {vendorStats.totalProducts} total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              Rp {(vendorStats.totalRevenue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              From all vendors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={vendors}
        searchKey="name"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedVendors}
        onSelectedRowsChange={setSelectedVendors}
        pagination={{
          total: vendors.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        }}
        emptyMessage="No vendors found"
        actions={[
          {
            label: "Approve",
            icon: CheckCircle,
            onClick: (ids) => console.log("Approve", ids),
            disabled: selectedVendors.length === 0
          },
          {
            label: "Suspend",
            icon: XCircle,
            onClick: (ids) => console.log("Suspend", ids),
            disabled: selectedVendors.length === 0
          },
          {
            label: "Delete",
            icon: Trash2,
            onClick: (ids) => console.log("Delete", ids),
            disabled: selectedVendors.length === 0,
            destructive: true
          }
        ]}
      />
    </div>
  );
}