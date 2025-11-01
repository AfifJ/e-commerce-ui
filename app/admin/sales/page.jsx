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
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Target,
} from "lucide-react";

// Mock data
const mockSales = [
  {
    id: "sales_001",
    name: "John Doe",
    email: "john.sales@bahana-umkm.com",
    phone: "08123456783",
    role: "Sales",
    status: "active",
    target: 50000000,
    actual: 45000000,
    commission: 4500000,
    area: "Jakarta Pusat",
    joinDate: "2024-01-05T00:00:00Z",
    lastActive: "2024-01-15T08:00:00Z",
    totalClients: 25,
    activeBorrows: 3,
    actions: [
      { label: "View Details", icon: Eye, onClick: (sales) => console.log("View", sales) },
      { label: "Edit Sales", icon: Edit, onClick: (sales) => console.log("Edit", sales) },
      { label: "Delete", icon: Trash2, onClick: (sales) => console.log("Delete", sales), destructive: true }
    ]
  },
  {
    id: "sales_002",
    name: "Jane Smith",
    email: "jane.sales@bahana-umkm.com",
    phone: "08123456784",
    role: "Sales",
    status: "inactive",
    target: 40000000,
    actual: 35000000,
    commission: 3500000,
    area: "Jakarta Selatan",
    joinDate: "2024-01-06T00:00:00Z",
    lastActive: "2024-01-10T15:30:00Z",
    totalClients: 18,
    activeBorrows: 0,
    actions: [
      { label: "View Details", icon: Eye, onClick: (sales) => console.log("View", sales) },
      { label: "Edit Sales", icon: Edit, onClick: (sales) => console.log("Edit", sales) },
      { label: "Delete", icon: Trash2, onClick: (sales) => console.log("Delete", sales), destructive: true }
    ]
  },
  {
    id: "sales_003",
    name: "Ahmad Rahman",
    email: "ahmad.sales@bahana-umkm.com",
    phone: "08123456788",
    role: "Sales",
    status: "active",
    target: 60000000,
    actual: 62000000,
    commission: 6200000,
    area: "Jakarta Barat",
    joinDate: "2024-01-07T00:00:00Z",
    lastActive: "2024-01-15T16:45:00Z",
    totalClients: 32,
    activeBorrows: 5,
    actions: [
      { label: "View Details", icon: Eye, onClick: (sales) => console.log("View", sales) },
      { label: "Edit Sales", icon: Edit, onClick: (sales) => console.log("Edit", sales) },
      { label: "Delete", icon: Trash2, onClick: (sales) => console.log("Delete", sales), destructive: true }
    ]
  }
];

const salesStats = {
  total: 3,
  active: 2,
  inactive: 1,
  totalTarget: 150000000,
  totalActual: 142000000,
  totalCommission: 14200000,
  totalClients: 75,
  activeBorrows: 8
};

function StatusBadge({ status }) {
  const statusConfig = {
    active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
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

function PerformanceBadge({ actual, target }) {
  const percentage = (actual / target) * 100;
  const color = percentage >= 100 ? "text-green-600" : percentage >= 80 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="flex items-center gap-1">
      <TrendingUp className={`w-4 h-4 ${color}`} />
      <span className={`text-sm font-medium ${color}`}>
        {percentage.toFixed(1)}%
      </span>
    </div>
  );
}

export default function SalesPage() {
  const [sales] = useState(mockSales);
  const [selectedSales, setSelectedSales] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    {
      key: "name",
      title: "Sales Information",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <User className="w-5 h-5 text-orange-600" />
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
            <span className="text-sm text-gray-600">{row.area}</span>
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
      key: "performance",
      title: "Performance",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Target</span>
            <span className="font-medium">Rp {row.target.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Actual</span>
            <span className="font-medium">Rp {row.actual.toLocaleString('id-ID')}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                (row.actual / row.target) >= 1 ? "bg-green-600" :
                (row.actual / row.target) >= 0.8 ? "bg-yellow-600" : "bg-red-600"
              }`}
              style={{ width: `${Math.min((row.actual / row.target) * 100, 100)}%` }}
            ></div>
          </div>
          <PerformanceBadge actual={row.actual} target={row.target} />
        </div>
      )
    },
    {
      key: "commission",
      title: "Commission",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">
            Rp {row.commission.toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-gray-500">
            {((row.commission / row.actual) * 100).toFixed(1)}% rate
          </div>
        </div>
      )
    },
    {
      key: "stats",
      title: "Statistics",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-3 h-3 text-gray-400" />
            <span>{row.totalClients} clients</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target className="w-3 h-3 text-gray-400" />
            <span>{row.activeBorrows} active borrows</span>
          </div>
        </div>
      )
    },
    {
      key: "joinDate",
      title: "Join Date",
      sortable: true,
      render: (value, row) => (
        <div className="text-sm">
          <div>{new Date(value).toLocaleDateString('id-ID')}</div>
          <div className="text-xs text-gray-500">
            Last active: {new Date(row.lastActive).toLocaleDateString('id-ID')}
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
        { value: "inactive", label: "Inactive" }
      ]
    },
    {
      key: "area",
      label: "Area",
      type: "select",
      options: [
        { value: "all", label: "All Areas" },
        { value: "Jakarta Pusat", label: "Jakarta Pusat" },
        { value: "Jakarta Selatan", label: "Jakarta Selatan" },
        { value: "Jakarta Barat", label: "Jakarta Barat" },
        { value: "Jakarta Timur", label: "Jakarta Timur" },
        { value: "Jakarta Utara", label: "Jakarta Utara" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Sales</h1>
          <p className="text-gray-500">Kelola tim sales lapangan dan target penjualan</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Sales
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Sales Baru</DialogTitle>
              <DialogDescription>
                Tambahkan sales lapangan baru ke tim.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salesName">Full Name</Label>
                  <Input id="salesName" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="sales@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="08123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Sales Area</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jakarta-pusat">Jakarta Pusat</SelectItem>
                      <SelectItem value="jakarta-selatan">Jakarta Selatan</SelectItem>
                      <SelectItem value="jakarta-barat">Jakarta Barat</SelectItem>
                      <SelectItem value="jakarta-timur">Jakarta Timur</SelectItem>
                      <SelectItem value="jakarta-utara">Jakarta Utara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target">Monthly Target</Label>
                  <Input id="target" type="number" placeholder="50000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission">Commission Rate (%)</Label>
                  <Input id="commission" type="number" placeholder="10" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Sales</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Sales team members
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{salesStats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {((salesStats.totalActual / salesStats.totalTarget) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Target achievement
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
              Rp {salesStats.totalCommission.toLocaleString('id-ID')}
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
        data={sales}
        searchKey="name"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedSales}
        onSelectedRowsChange={setSelectedSales}
        pagination={{
          total: sales.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        }}
        emptyMessage="No sales found"
        actions={[
          {
            label: "Activate",
            icon: CheckCircle,
            onClick: (ids) => console.log("Activate", ids),
            disabled: selectedSales.length === 0
          },
          {
            label: "Deactivate",
            icon: XCircle,
            onClick: (ids) => console.log("Deactivate", ids),
            disabled: selectedSales.length === 0
          },
          {
            label: "Delete",
            icon: Trash2,
            onClick: (ids) => console.log("Delete", ids),
            disabled: selectedSales.length === 0,
            destructive: true
          }
        ]}
      />
    </div>
  );
}