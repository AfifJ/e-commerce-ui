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
  User,
  Calendar,
  CreditCard,
  MapPin,
  Phone,
} from "lucide-react";

// Mock data
const mockOrders = [
  {
    id: "ORD-2024-001",
    customerName: "Ahmad Fadli",
    customerEmail: "ahmad@gmail.com",
    customerPhone: "08123456787",
    items: [
      { name: "Laptop ASUS ROG", quantity: 1, price: 15000000 },
      { name: "Mouse Gaming", quantity: 2, price: 250000 }
    ],
    totalAmount: 15500000,
    status: "pending",
    paymentStatus: "paid",
    paymentMethod: "transfer",
    shippingAddress: "Jl. Sudirman No. 123, Jakarta Pusat",
    trackingNumber: null,
    estimatedDelivery: "2024-01-18",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (order) => console.log("View", order) },
      { label: "Process Order", icon: Edit, onClick: (order) => console.log("Process", order) },
      { label: "Cancel Order", icon: XCircle, onClick: (order) => console.log("Cancel", order), destructive: true }
    ]
  },
  {
    id: "ORD-2024-002",
    customerName: "Siti Aminah",
    customerEmail: "siti@gmail.com",
    customerPhone: "08123456788",
    items: [
      { name: "Baju Muslim Wanita", quantity: 3, price: 150000 },
      { name: "Hijab Segi Empat", quantity: 5, price: 50000 }
    ],
    totalAmount: 700000,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "ewallet",
    shippingAddress: "Jl. Gatot Subroto No. 456, Jakarta Selatan",
    trackingNumber: "TRK-123456789",
    estimatedDelivery: "2024-01-17",
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-15T11:45:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (order) => console.log("View", order) },
      { label: "Update Status", icon: Edit, onClick: (order) => console.log("Update", order) },
      { label: "Cancel Order", icon: XCircle, onClick: (order) => console.log("Cancel", order), destructive: true }
    ]
  },
  {
    id: "ORD-2024-003",
    customerName: "Rizky Ahmad",
    customerEmail: "rizky@gmail.com",
    customerPhone: "08123456789",
    items: [
      { name: "Samsung Galaxy S24", quantity: 1, price: 12000000 },
      { name: "Charger Samsung", quantity: 1, price: 150000 }
    ],
    totalAmount: 12150000,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    shippingAddress: "Jl. Thamrin No. 789, Jakarta Pusat",
    trackingNumber: "TRK-987654321",
    estimatedDelivery: "2024-01-16",
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (order) => console.log("View", order) },
      { label: "Track Order", icon: Truck, onClick: (order) => console.log("Track", order) },
      { label: "Update Status", icon: Edit, onClick: (order) => console.log("Update", order) }
    ]
  },
  {
    id: "ORD-2024-004",
    customerName: "Dewi Lestari",
    customerEmail: "dewi@gmail.com",
    customerPhone: "08123456790",
    items: [
      { name: "Sepatu Nike Air Max", quantity: 1, price: 1800000 }
    ],
    totalAmount: 1800000,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "cod",
    shippingAddress: "Jl. MH Thamrin No. 100, Jakarta Pusat",
    trackingNumber: "TRK-555666777",
    estimatedDelivery: "2024-01-15",
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (order) => console.log("View", order) },
      { label: "View Receipt", icon: Package, onClick: (order) => console.log("Receipt", order) }
    ]
  },
  {
    id: "ORD-2024-005",
    customerName: "Budi Santoso",
    customerEmail: "budi@gmail.com",
    customerPhone: "08123456791",
    items: [
      { name: "Smart TV LG 43 inch", quantity: 1, price: 4500000 }
    ],
    totalAmount: 4500000,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "transfer",
    shippingAddress: "Jl. Sudirman No. 200, Jakarta Pusat",
    trackingNumber: null,
    estimatedDelivery: null,
    createdAt: "2024-01-11T14:30:00Z",
    updatedAt: "2024-01-13T09:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (order) => console.log("View", order) },
      { label: "Refund Details", icon: CreditCard, onClick: (order) => console.log("Refund", order) }
    ]
  }
];

const orderStats = {
  total: 5,
  pending: 1,
  processing: 1,
  shipped: 1,
  delivered: 1,
  cancelled: 1,
  totalRevenue: 34150000,
  todayOrders: 2,
  thisMonthRevenue: 34150000
};

function StatusBadge({ status }) {
  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
    processing: { color: "bg-blue-100 text-blue-800", icon: Package },
    shipped: { color: "bg-purple-100 text-purple-800", icon: Truck },
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

function PaymentStatusBadge({ status }) {
  const statusConfig = {
    paid: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
    failed: { color: "bg-red-100 text-red-800", icon: XCircle },
    refunded: { color: "bg-gray-100 text-gray-800", icon: CreditCard }
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

export default function OrdersPage() {
  const [orders] = useState(mockOrders);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    {
      key: "id",
      title: "Order Information",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="font-medium text-blue-600">{value}</div>
          <div className="flex items-center gap-2 text-sm">
            <User className="w-3 h-3 text-gray-400" />
            <span>{row.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Phone className="w-3 h-3 text-gray-400" />
            <span>{row.customerPhone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span>{new Date(row.createdAt).toLocaleDateString('id-ID')}</span>
          </div>
        </div>
      )
    },
    {
      key: "items",
      title: "Items",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">{row.items.length} items</div>
          <div className="text-xs text-gray-500 line-clamp-2">
            {row.items.map((item, index) => (
              <div key={index}>
                {item.quantity}x {item.name}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      key: "totalAmount",
      title: "Total",
      sortable: true,
      render: (value) => (
        <div className="text-sm font-medium">
          Rp {value.toLocaleString('id-ID')}
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
      key: "paymentStatus",
      title: "Payment",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <PaymentStatusBadge status={value} />
          <div className="text-xs text-gray-500 capitalize">
            {row.paymentMethod?.replace('_', ' ')}
          </div>
        </div>
      )
    },
    {
      key: "trackingNumber",
      title: "Shipping",
      render: (value, row) => (
        <div className="space-y-1">
          {value ? (
            <div className="text-sm font-medium">{value}</div>
          ) : (
            <div className="text-sm text-gray-500">No tracking</div>
          )}
          <div className="text-xs text-gray-500">
            Est: {row.estimatedDelivery ? new Date(row.estimatedDelivery).toLocaleDateString('id-ID') : 'TBD'}
          </div>
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
      label: "Order Status",
      type: "select",
      options: [
        { value: "all", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "processing", label: "Processing" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" }
      ]
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
      type: "select",
      options: [
        { value: "all", label: "All Payment Status" },
        { value: "paid", label: "Paid" },
        { value: "pending", label: "Pending" },
        { value: "failed", label: "Failed" },
        { value: "refunded", label: "Refunded" }
      ]
    },
    {
      key: "paymentMethod",
      label: "Payment Method",
      type: "select",
      options: [
        { value: "all", label: "All Methods" },
        { value: "transfer", label: "Bank Transfer" },
        { value: "credit_card", label: "Credit Card" },
        { value: "ewallet", label: "E-Wallet" },
        { value: "cod", label: "COD" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-500">Manage and track all customer orders</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.total}</div>
            <p className="text-xs text-muted-foreground">
              All time orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{orderStats.todayOrders}</div>
            <p className="text-xs text-muted-foreground">
              New orders today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{orderStats.delivered}</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              Rp {(orderStats.thisMonthRevenue / 1000000).toFixed(1)}M
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
        data={orders}
        searchKey="id"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedOrders}
        onSelectedRowsChange={setSelectedOrders}
        pagination={{
          total: orders.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        }}
        emptyMessage="No orders found"
        actions={[
          {
            label: "Process Orders",
            icon: Package,
            onClick: (ids) => console.log("Process", ids),
            disabled: selectedOrders.length === 0
          },
          {
            label: "Mark as Shipped",
            icon: Truck,
            onClick: (ids) => console.log("Ship", ids),
            disabled: selectedOrders.length === 0
          },
          {
            label: "Cancel Orders",
            icon: XCircle,
            onClick: (ids) => console.log("Cancel", ids),
            disabled: selectedOrders.length === 0,
            destructive: true
          }
        ]}
      />
    </div>
  );
}