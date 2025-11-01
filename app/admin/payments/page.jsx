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
  CreditCard,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  RefreshCw,
  FileText,
  Calendar,
  User,
  Receipt,
  Banknote,
  Smartphone,
} from "lucide-react";

// Mock data
const mockPayments = [
  {
    id: "PAY-2024-001",
    orderId: "ORD-2024-001",
    customerName: "Ahmad Fadli",
    customerEmail: "ahmad@gmail.com",
    amount: 15500000,
    method: "transfer",
    bankName: "BCA",
    accountNumber: "1234567890",
    accountName: "Ahmad Fadli",
    status: "completed",
    paymentDate: "2024-01-15T10:45:00Z",
    dueDate: "2024-01-15T23:59:59Z",
    referenceNumber: "BCA-TRF-2024011501",
    description: "Payment for order ORD-2024-001",
    fees: 150000,
    netAmount: 15350000,
    refundAmount: 0,
    actions: [
      { label: "View Details", icon: Eye, onClick: (payment) => console.log("View", payment) },
      { label: "Download Receipt", icon: Download, onClick: (payment) => console.log("Download", payment) },
      { label: "Process Refund", icon: RefreshCw, onClick: (payment) => console.log("Refund", payment) }
    ]
  },
  {
    id: "PAY-2024-002",
    orderId: "ORD-2024-002",
    customerName: "Siti Aminah",
    customerEmail: "siti@gmail.com",
    amount: 700000,
    method: "ewallet",
    ewalletType: "gopay",
    ewalletNumber: "08123456788",
    status: "completed",
    paymentDate: "2024-01-14T14:20:00Z",
    dueDate: "2024-01-14T23:59:59Z",
    referenceNumber: "GOPAY-2024011402",
    description: "Payment for order ORD-2024-002",
    fees: 7000,
    netAmount: 693000,
    refundAmount: 0,
    actions: [
      { label: "View Details", icon: Eye, onClick: (payment) => console.log("View", payment) },
      { label: "Download Receipt", icon: Download, onClick: (payment) => console.log("Download", payment) }
    ]
  },
  {
    id: "PAY-2024-003",
    orderId: "ORD-2024-003",
    customerName: "Rizky Ahmad",
    customerEmail: "rizky@gmail.com",
    amount: 12150000,
    method: "credit_card",
    cardType: "visa",
    cardLast4: "1234",
    cardHolder: "Rizky Ahmad",
    status: "failed",
    paymentDate: "2024-01-13T16:00:00Z",
    dueDate: "2024-01-13T23:59:59Z",
    referenceNumber: "CC-VISA-2024011301",
    description: "Payment for order ORD-2024-003",
    failureReason: "Insufficient funds",
    fees: 0,
    netAmount: 0,
    refundAmount: 0,
    actions: [
      { label: "View Details", icon: Eye, onClick: (payment) => console.log("View", payment) },
      { label: "Retry Payment", icon: RefreshCw, onClick: (payment) => console.log("Retry", payment) }
    ]
  },
  {
    id: "PAY-2024-004",
    orderId: "ORD-2024-004",
    customerName: "Dewi Lestari",
    customerEmail: "dewi@gmail.com",
    amount: 1800000,
    method: "cod",
    status: "pending",
    paymentDate: null,
    dueDate: "2024-01-15T23:59:59Z",
    referenceNumber: null,
    description: "COD payment for order ORD-2024-004",
    fees: 0,
    netAmount: 1800000,
    refundAmount: 0,
    actions: [
      { label: "View Details", icon: Eye, onClick: (payment) => console.log("View", payment) },
      { label: "Mark as Paid", icon: CheckCircle, onClick: (payment) => console.log("Mark Paid", payment) }
    ]
  },
  {
    id: "PAY-2024-005",
    orderId: "ORD-2024-005",
    customerName: "Budi Santoso",
    customerEmail: "budi@gmail.com",
    amount: 4500000,
    method: "transfer",
    bankName: "Mandiri",
    accountNumber: "9876543210",
    accountName: "Budi Santoso",
    status: "refunded",
    paymentDate: "2024-01-11T14:30:00Z",
    dueDate: "2024-01-11T23:59:59Z",
    refundDate: "2024-01-13T09:00:00Z",
    referenceNumber: "MND-TRF-2024011101",
    refundReference: "MND-REF-2024011301",
    description: "Payment for order ORD-2024-005 (Cancelled Order)",
    fees: 45000,
    netAmount: 4455000,
    refundAmount: 4500000,
    refundReason: "Order cancelled by customer",
    actions: [
      { label: "View Details", icon: Eye, onClick: (payment) => console.log("View", payment) },
      { label: "View Refund Details", icon: FileText, onClick: (payment) => console.log("Refund", payment) }
    ]
  }
];

const paymentStats = {
  total: 5,
  completed: 2,
  pending: 1,
  failed: 1,
  refunded: 1,
  totalAmount: 41250000,
  totalFees: 207000,
  totalNetAmount: 41043000,
  totalRefunded: 4500000,
  todayPayments: 2,
  todayAmount: 22500000
};

function StatusBadge({ status }) {
  const statusConfig = {
    completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
    failed: { color: "bg-red-100 text-red-800", icon: XCircle },
    refunded: { color: "bg-gray-100 text-gray-800", icon: RefreshCw }
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

function MethodIcon({ method, methodDetails }) {
  const icons = {
    transfer: <Banknote className="w-4 h-4" />,
    credit_card: <CreditCard className="w-4 h-4" />,
    ewallet: <Smartphone className="w-4 h-4" />,
    cod: <Receipt className="w-4 h-4" />
  };

  return icons[method] || <Banknote className="w-4 h-4" />;
}

export default function PaymentsPage() {
  const [payments] = useState(mockPayments);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    {
      key: "id",
      title: "Payment Information",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="font-medium text-blue-600">{value}</div>
          <div className="flex items-center gap-2 text-sm">
            <Receipt className="w-3 h-3 text-gray-400" />
            <span>Order: {row.orderId}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="w-3 h-3 text-gray-400" />
            <span>{row.customerName}</span>
          </div>
          <div className="text-xs text-gray-500">{row.customerEmail}</div>
        </div>
      )
    },
    {
      key: "amount",
      title: "Amount",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">
            Rp {value.toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-gray-500">
            Net: Rp {row.netAmount.toLocaleString('id-ID')}
          </div>
          {row.fees > 0 && (
            <div className="text-xs text-red-500">
              Fee: Rp {row.fees.toLocaleString('id-ID')}
            </div>
          )}
        </div>
      )
    },
    {
      key: "method",
      title: "Payment Method",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MethodIcon method={row.method} methodDetails={row} />
            <span className="text-sm font-medium capitalize">
              {row.method.replace('_', ' ')}
            </span>
          </div>
          {row.method === 'transfer' && (
            <div className="text-xs text-gray-500">
              {row.bankName} - {row.accountName}
            </div>
          )}
          {row.method === 'credit_card' && (
            <div className="text-xs text-gray-500">
              {row.cardType.toUpperCase()} •••••{row.cardLast4}
            </div>
          )}
          {row.method === 'ewallet' && (
            <div className="text-xs text-gray-500">
              {row.ewalletType?.toUpperCase()}
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
          {row.refundAmount > 0 && (
            <div className="text-xs text-orange-600">
              Refunded: Rp {row.refundAmount.toLocaleString('id-ID')}
            </div>
          )}
        </div>
      )
    },
    {
      key: "paymentDate",
      title: "Payment Date",
      sortable: true,
      render: (value, row) => (
        <div className="text-sm space-y-1">
          <div>
            {row.paymentDate ? (
              new Date(row.paymentDate).toLocaleDateString('id-ID')
            ) : (
              <span className="text-gray-500">Not paid yet</span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            Due: {new Date(row.dueDate).toLocaleDateString('id-ID')}
          </div>
          {row.refundDate && (
            <div className="text-xs text-orange-500">
              Refunded: {new Date(row.refundDate).toLocaleDateString('id-ID')}
            </div>
          )}
        </div>
      )
    },
    {
      key: "referenceNumber",
      title: "Reference",
      render: (value, row) => (
        <div className="text-sm space-y-1">
          {row.referenceNumber ? (
            <div className="font-mono">{row.referenceNumber}</div>
          ) : (
            <div className="text-gray-500">-</div>
          )}
          {row.failureReason && (
            <div className="text-xs text-red-500">
              Failed: {row.failureReason}
            </div>
          )}
          {row.refundReason && (
            <div className="text-xs text-orange-500">
              Reason: {row.refundReason}
            </div>
          )}
        </div>
      )
    },
    {
      key: "createdAt",
      title: "Created",
      sortable: true,
      render: (value, row) => (
        <div className="text-sm">
          {new Date(row.createdAt || row.paymentDate).toLocaleDateString('id-ID')}
        </div>
      )
    }
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Payment Status",
      type: "select",
      options: [
        { value: "all", label: "All Status" },
        { value: "completed", label: "Completed" },
        { value: "pending", label: "Pending" },
        { value: "failed", label: "Failed" },
        { value: "refunded", label: "Refunded" }
      ]
    },
    {
      key: "method",
      label: "Payment Method",
      type: "select",
      options: [
        { value: "all", label: "All Methods" },
        { value: "transfer", label: "Bank Transfer" },
        { value: "credit_card", label: "Credit Card" },
        { value: "ewallet", label: "E-Wallet" },
        { value: "cod", label: "COD" }
      ]
    },
    {
      key: "dateRange",
      label: "Date Range",
      type: "select",
      options: [
        { value: "all", label: "All Time" },
        { value: "today", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
        { value: "quarter", label: "This Quarter" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-500">Monitor and process all payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Manual Payment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentStats.total}</div>
            <p className="text-xs text-muted-foreground">
              All transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paymentStats.completed}</div>
            <p className="text-xs text-muted-foreground">
              Successfully processed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{paymentStats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting payment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{paymentStats.failed}</div>
            <p className="text-xs text-muted-foreground">
              Payment failed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              Rp {(paymentStats.totalNetAmount / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Net revenue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={payments}
        searchKey="id"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedPayments}
        onSelectedRowsChange={setSelectedPayments}
        pagination={{
          total: payments.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        }}
        emptyMessage="No payment records found"
        actions={[
          {
            label: "Process Refund",
            icon: RefreshCw,
            onClick: (ids) => console.log("Refund", ids),
            disabled: selectedPayments.length === 0
          },
          {
            label: "Send Receipt",
            icon: FileText,
            onClick: (ids) => console.log("Receipt", ids),
            disabled: selectedPayments.length === 0
          },
          {
            label: "Export Data",
            icon: Download,
            onClick: (ids) => console.log("Export", ids),
            disabled: selectedPayments.length === 0
          }
        ]}
      />
    </div>
  );
}