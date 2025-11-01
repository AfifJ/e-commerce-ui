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
  Truck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  MapPin,
  Phone,
  Calendar,
  Navigation,
  RefreshCw,
} from "lucide-react";
import { Star } from "lucide-react";
import { Download } from "lucide-react";
import { User } from "lucide-react";
import { CreditCard } from "lucide-react";

// Mock data
const mockDeliveries = [
  {
    id: "DEL-2024-001",
    orderId: "ORD-2024-003",
    customerName: "Rizky Ahmad",
    customerPhone: "08123456789",
    customerAddress: "Jl. Thamrin No. 789, Jakarta Pusat",
    courier: "J&T Express",
    trackingNumber: "JP1234567890",
    status: "in_transit",
    estimatedDelivery: "2024-01-16T18:00:00Z",
    actualDelivery: null,
    origin: "Gudang Jakarta Pusat",
    destination: "Jakarta Pusat",
    distance: 15.5,
    weight: 2.5,
    dimensions: "30x20x15 cm",
    deliveryCost: 15000,
    insurance: true,
    insuranceValue: 12150000,
    driver: "Budi Santoso",
    driverPhone: "08123456791",
    createdAt: "2024-01-15T16:00:00Z",
    updatedAt: "2024-01-15T18:30:00Z",
    notes: "Handle with care - electronic items",
    actions: [
      { label: "Track Delivery", icon: Navigation, onClick: (delivery) => console.log("Track", delivery) },
      { label: "Contact Driver", icon: Phone, onClick: (delivery) => console.log("Contact", delivery) },
      { label: "Update Status", icon: Edit, onClick: (delivery) => console.log("Update", delivery) }
    ]
  },
  {
    id: "DEL-2024-002",
    orderId: "ORD-2024-002",
    customerName: "Siti Aminah",
    customerPhone: "08123456788",
    customerAddress: "Jl. Gatot Subroto No. 456, Jakarta Selatan",
    courier: "SiCepat",
    trackingNumber: "SC0987654321",
    status: "delivered",
    estimatedDelivery: "2024-01-17T18:00:00Z",
    actualDelivery: "2024-01-15T11:45:00Z",
    origin: "Gudang Jakarta Selatan",
    destination: "Jakarta Selatan",
    distance: 22.3,
    weight: 1.8,
    dimensions: "25x20x10 cm",
    deliveryCost: 12000,
    insurance: false,
    insuranceValue: 0,
    driver: "Ahmad Rahman",
    driverPhone: "08123456792",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T11:45:00Z",
    notes: "Delivered to receptionist",
    actions: [
      { label: "View Details", icon: Eye, onClick: (delivery) => console.log("View", delivery) },
      { label: "Rate Service", icon: Star, onClick: (delivery) => console.log("Rate", delivery) },
      { label: "Download Proof", icon: Download, onClick: (delivery) => console.log("Download", delivery) }
    ]
  },
  {
    id: "DEL-2024-003",
    orderId: "ORD-2024-001",
    customerName: "Ahmad Fadli",
    customerPhone: "08123456787",
    customerAddress: "Jl. Sudirman No. 123, Jakarta Pusat",
    courier: "Grab Express",
    trackingNumber: "GR5678901234",
    status: "pending",
    estimatedDelivery: "2024-01-18T20:00:00Z",
    actualDelivery: null,
    origin: "Gudang Jakarta Pusat",
    destination: "Jakarta Pusat",
    distance: 12.0,
    weight: 3.2,
    dimensions: "35x25x20 cm",
    deliveryCost: 18000,
    insurance: true,
    insuranceValue: 15500000,
    driver: null,
    driverPhone: null,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    notes: "Waiting for courier pickup",
    actions: [
      { label: "View Details", icon: Eye, onClick: (delivery) => console.log("View", delivery) },
      { label: "Assign Driver", icon: User, onClick: (delivery) => console.log("Assign", delivery) },
      { label: "Update Status", icon: Edit, onClick: (delivery) => console.log("Update", delivery) }
    ]
  },
  {
    id: "DEL-2024-004",
    orderId: "ORD-2024-004",
    customerName: "Dewi Lestari",
    customerPhone: "08123456790",
    customerAddress: "Jl. MH Thamrin No. 100, Jakarta Pusat",
    courier: "Gojek Same Day",
    trackingNumber: "GOJ3456789012",
    status: "failed",
    estimatedDelivery: "2024-01-15T18:00:00Z",
    actualDelivery: null,
    origin: "Gudang Jakarta Pusat",
    destination: "Jakarta Pusat",
    distance: 8.0,
    weight: 1.2,
    dimensions: "20x15x10 cm",
    deliveryCost: 25000,
    insurance: false,
    insuranceValue: 0,
    driver: "Eko Prasetyo",
    driverPhone: "08123456793",
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-13T09:00:00Z",
    notes: "Delivery failed - customer unavailable",
    retryCount: 2,
    actions: [
      { label: "View Details", icon: Eye, onClick: (delivery) => console.log("View", delivery) },
      { label: "Retry Delivery", icon: RefreshCw, onClick: (delivery) => console.log("Retry", delivery) },
      { label: "Contact Customer", icon: Phone, onClick: (delivery) => console.log("Contact", delivery) }
    ]
  },
  {
    id: "DEL-2024-005",
    orderId: "ORD-2024-005",
    customerName: "Budi Santoso",
    customerPhone: "08123456791",
    customerAddress: "Jl. Sudirman No. 200, Jakarta Pusat",
    courier: "Ninja Xpress",
    trackingNumber: "NX7890123456",
    status: "returned",
    estimatedDelivery: "2024-01-11T18:00:00Z",
    actualDelivery: "2024-01-12T10:00:00Z",
    returnDate: "2024-01-13T14:30:00Z",
    origin: "Gudang Jakarta Pusat",
    destination: "Jakarta Pusat",
    distance: 18.7,
    weight: 2.0,
    dimensions: "28x22x18 cm",
    deliveryCost: 20000,
    insurance: false,
    insuranceValue: 0,
    driver: "Fajar Budi",
    driverPhone: "08123456794",
    createdAt: "2024-01-11T14:30:00Z",
    updatedAt: "2014-01-13T14:30:00Z",
    notes: "Order cancelled, items returned to warehouse",
    returnReason: "Customer requested cancellation",
    actions: [
      { label: "View Details", icon: Eye, onClick: (delivery) => console.log("View", delivery) },
      { label: "View Return", icon: RefreshCw, onClick: (delivery) => console.log("Return", delivery) },
      { label: "Process Refund", icon: CreditCard, onClick: (delivery) => console.log("Refund", delivery) }
    ]
  }
];

const deliveryStats = {
  total: 5,
  pending: 1,
  in_transit: 1,
  delivered: 1,
  failed: 1,
  returned: 1,
  totalCost: 90000,
  totalDistance: 76.5,
  totalWeight: 10.7,
  todayDeliveries: 2,
  onTimeRate: 80
};

function StatusBadge({ status }) {
  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
    in_transit: { color: "bg-blue-100 text-blue-800", icon: Truck },
    delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    failed: { color: "bg-red-100 text-red-800", icon: XCircle },
    returned: { color: "bg-gray-100 text-gray-800", icon: RefreshCw }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
    </span>
  );
}

function InsuranceBadge({ insured }) {
  return insured ? (
    <Badge className="bg-green-100 text-green-800 border-green-200">
      <CheckCircle className="w-3 h-3 mr-1" />
      Insured
    </Badge>
  ) : (
    <Badge variant="outline" className="text-orange-600 border-orange-300">
      <AlertTriangle className="w-3 h-3 mr-1" />
      No Insurance
    </Badge>
  );
}

export default function DeliveriesPage() {
  const [deliveries] = useState(mockDeliveries);
  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    {
      key: "id",
      title: "Delivery Information",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="font-medium text-blue-600">{value}</div>
          <div className="flex items-center gap-2 text-sm">
            <Package className="w-3 h-3 text-gray-400" />
            <span>Order: {row.orderId}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="w-3 h-3 text-gray-400" />
            <span>{row.customerName}</span>
          </div>
          <div className="text-xs text-gray-500 line-clamp-1">
            {row.customerAddress}
          </div>
        </div>
      )
    },
    {
      key: "courier",
      title: "Courier Service",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">{row.courier}</div>
          <div className="text-xs text-blue-600 font-mono">
            {row.trackingNumber}
          </div>
          <div className="text-xs text-gray-500">
            Driver: {row.driver || 'Not assigned'}
          </div>
          {row.driverPhone && (
            <div className="text-xs text-gray-500">
              {row.driverPhone}
            </div>
          )}
        </div>
      )
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <StatusBadge status={row.status} />
          <InsuranceBadge insured={row.insurance} />
        </div>
      )
    },
    {
      key: "timeline",
      title: "Delivery Timeline",
      sortable: true,
      render: (value, row) => (
        <div className="text-sm space-y-1">
          <div>
            <span className="text-gray-500">Est:</span>
            <div className="font-medium">
              {new Date(row.estimatedDelivery).toLocaleDateString('id-ID')}
            </div>
          </div>
          {row.actualDelivery && (
            <div>
              <span className="text-gray-500">Actual:</span>
              <div className="font-medium text-green-600">
                {new Date(row.actualDelivery).toLocaleDateString('id-ID')}
              </div>
            </div>
          )}
          {row.returnDate && (
            <div>
              <span className="text-gray-500">Returned:</span>
              <div className="font-medium text-orange-600">
                {new Date(row.returnDate).toLocaleDateString('id-ID')}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      key: "route",
      title: "Route Info",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span>{row.distance} km</span>
          </div>
          <div className="text-xs text-gray-500">
            {row.weight} kg • {row.dimensions}
          </div>
          <div className="text-xs text-gray-500">
            Cost: Rp {row.deliveryCost.toLocaleString('id-ID')}
          </div>
        </div>
      )
    },
    {
      key: "insuranceValue",
      title: "Insurance",
      sortable: true,
      render: (value, row) => (
        <div className="text-sm">
          {row.insuranceValue > 0 ? (
            <div className="font-medium">
              Rp {row.insuranceValue.toLocaleString('id-ID')}
            </div>
          ) : (
            <div className="text-gray-500">No insurance</div>
          )}
        </div>
      )
    },
    {
      key: "updatedAt",
      title: "Last Updated",
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {new Date(value).toLocaleDateString('id-ID')}
          <div className="text-xs text-gray-500">
            {new Date(value).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      )
    }
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Delivery Status",
      type: "select",
      options: [
        { value: "all", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "in_transit", label: "In Transit" },
        { value: "delivered", label: "Delivered" },
        { value: "failed", label: "Failed" },
        { value: "returned", label: "Returned" }
      ]
    },
    {
      key: "courier",
      label: "Courier",
      type: "select",
      options: [
        { value: "all", label: "All Couriers" },
        { value: "J&T Express", label: "J&T Express" },
        { value: "SiCepat", label: "SiCepat" },
        { value: "Grab Express", label: "Grab Express" },
        { value: "Gojek", label: "Gojek" },
        { value: "Ninja Xpress", label: "Ninja Xpress" }
      ]
    },
    {
      key: "insurance",
      label: "Insurance",
      type: "select",
      options: [
        { value: "all", label: "All Items" },
        { value: "insured", label: "Insured Only" },
        { value: "uninsured", label: "Uninsured Only" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Management</h1>
          <p className="text-gray-500">Track and manage all product deliveries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Trackings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Delivery
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveryStats.total}</div>
            <p className="text-xs text-muted-foreground">
              All shipments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{deliveryStats.in_transit}</div>
            <p className="text-xs text-muted-foreground">
              Currently shipping
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{deliveryStats.delivered}</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{deliveryStats.failed}</div>
            <p className="text-xs text-muted-foreground">
              Delivery issues
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{deliveryStats.onTimeRate}%</div>
            <p className="text-xs text-muted-foreground">
              Performance metric
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={deliveries}
        searchKey="id"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedDeliveries}
        onSelectedRowsChange={setSelectedDeliveries}
        pagination={{
          total: deliveries.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        }}
        emptyMessage="No delivery records found"
        actions={[
          {
            label: "Update Status",
            icon: Edit,
            onClick: (ids) => console.log("Update", ids),
            disabled: selectedDeliveries.length === 0
          },
          {
            label: "Track Shipments",
            icon: Navigation,
            onClick: (ids) => console.log("Track", ids),
            disabled: selectedDeliveries.length === 0
          },
          {
            label: "Contact Customers",
            icon: Phone,
            onClick: (ids) => console.log("Contact", ids),
            disabled: selectedDeliveries.length === 0
          }
        ]}
      />
    </div>
  );
}