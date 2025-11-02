"use client";

import { useState } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  QrCode,
  Smartphone,
  Building,
  Wallet,
  Image as ImageIcon,
} from "lucide-react";

// Mock data matching database schema
const mockPayments = [
  {
    id: "uuid-payment-001",
    orderId: "uuid-order-001",
    orderNumber: "ORD-20240115-001",
    paymentMethod: "transfer",
    paymentGateway: "midtrans",
    gatewayReference: "MID-20240115-001",
    amount: "29900000",
    status: "success",
    currency: "IDR",
    qrCodeUrl: null,
    proofImage: "https://example.com/proof/transfer-001.jpg",
    adminVerified: true,
    verifiedBy: "uuid-admin-001",
    verifiedByName: "Admin User",
    verifiedAt: "2024-01-15T14:30:00Z",
    gatewayResponse: {
      transaction_id: "MID-123456",
      status_code: "200"
    },
    paidAt: "2024-01-15T14:25:00Z",
    expiresAt: null,
    createdAt: "2024-01-15T09:30:00Z",
    updatedAt: "2024-01-15T14:30:00Z"
  },
  {
    id: "uuid-payment-002",
    orderId: "uuid-order-002",
    orderNumber: "ORD-20240114-002",
    paymentMethod: "qris",
    paymentGateway: "shopeepay",
    gatewayReference: "SPP-20240114-002",
    amount: "4960000",
    status: "success",
    currency: "IDR",
    qrCodeUrl: "https://example.com/qr/qris-002.png",
    proofImage: null,
    adminVerified: true,
    verifiedBy: "uuid-admin-001",
    verifiedByName: "Admin User",
    verifiedAt: "2024-01-14T16:45:00Z",
    gatewayResponse: {
      transaction_id: "SPP-789012",
      status_code: "200"
    },
    paidAt: "2024-01-14T16:40:00Z",
    expiresAt: "2024-01-14T18:00:00Z",
    createdAt: "2024-01-14T14:15:00Z",
    updatedAt: "2024-01-14T16:45:00Z"
  },
  {
    id: "uuid-payment-003",
    orderId: "uuid-order-003",
    orderNumber: "ORD-20240113-003",
    paymentMethod: "ewallet",
    paymentGateway: "gopay",
    gatewayReference: "GPY-20240113-003",
    amount: "8612000",
    status: "pending",
    currency: "IDR",
    qrCodeUrl: "https://example.com/qr/gopay-003.png",
    proofImage: null,
    adminVerified: false,
    verifiedBy: null,
    verifiedByName: null,
    verifiedAt: null,
    gatewayResponse: {
      transaction_id: "GPY-345678",
      status_code: "201"
    },
    paidAt: null,
    expiresAt: "2024-01-13T20:00:00Z",
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-13T16:45:00Z"
  },
  {
    id: "uuid-payment-004",
    orderId: "uuid-order-004",
    orderNumber: "ORD-20240112-004",
    paymentMethod: "transfer",
    paymentGateway: "midtrans",
    gatewayReference: "MID-20240112-004",
    amount: "3758000",
    status: "failed",
    currency: "IDR",
    qrCodeUrl: null,
    proofImage: "https://example.com/proof/transfer-004.jpg",
    adminVerified: true,
    verifiedBy: "uuid-admin-002",
    verifiedByName: "Admin Two",
    verifiedAt: "2024-01-12T18:30:00Z",
    gatewayResponse: {
      transaction_id: "MID-901234",
      status_code: "401",
      error_message: "Payment expired"
    },
    paidAt: null,
    expiresAt: "2024-01-12T17:00:00Z",
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-12T18:30:00Z"
  },
  {
    id: "uuid-payment-005",
    orderId: "uuid-order-005",
    orderNumber: "ORD-20240111-005",
    paymentMethod: "ewallet",
    paymentGateway: "ovo",
    gatewayReference: "OVO-20240111-005",
    amount: "15000000",
    status: "refunded",
    currency: "IDR",
    qrCodeUrl: "https://example.com/qr/ovo-005.png",
    proofImage: "https://example.com/proof/ovo-005.jpg",
    adminVerified: true,
    verifiedBy: "uuid-admin-001",
    verifiedByName: "Admin User",
    verifiedAt: "2024-01-11T15:20:00Z",
    gatewayResponse: {
      transaction_id: "OVO-567890",
      status_code: "200"
    },
    paidAt: "2024-01-11T14:15:00Z",
    refundedAt: "2024-01-11T16:45:00Z",
    expiresAt: "2024-01-11T18:00:00Z",
    createdAt: "2024-01-11T13:30:00Z",
    updatedAt: "2024-01-11T16:45:00Z"
  }
];

function StatusBadge({ status }) {
  const statusConfig = {
    "pending": { bg: "bg-yellow-100 text-yellow-800", icon: Clock },
    "processing": { bg: "bg-blue-100 text-blue-800", icon: CreditCard },
    "success": { bg: "bg-green-100 text-green-800", icon: CheckCircle },
    "failed": { bg: "bg-red-100 text-red-800", icon: XCircle },
    "cancelled": { bg: "bg-gray-100 text-gray-800", icon: XCircle },
    "refunded": { bg: "bg-orange-100 text-orange-800", icon: AlertCircle }
  };

  const config = statusConfig[status] || { bg: "bg-gray-100 text-gray-800", icon: AlertCircle };
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function PaymentMethodBadge({ method }) {
  const methodConfig = {
    "qris": { icon: QrCode, label: "QRIS" },
    "transfer": { icon: Building, label: "Bank Transfer" },
    "ewallet": { icon: Smartphone, label: "E-Wallet" },
    "cash": { icon: Wallet, label: "Cash" }
  };

  const config = methodConfig[method] || { icon: CreditCard, label: method };
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-1 text-sm">
      <Icon className="w-4 h-4" />
      {config.label}
    </div>
  );
}

function VerifiedBadge({ verified, verifiedByName }) {
  if (verified) {
    return (
      <div className="flex items-center gap-1 text-xs text-green-600">
        <CheckCircle className="w-3 h-3" />
        Verified by {verifiedByName}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-xs text-yellow-600">
      <Clock className="w-3 h-3" />
      Pending verification
    </div>
  );
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(parseInt(amount) || 0);
}

export default function PaymentsPage() {
  const [payments] = useState(mockPayments);

  const handleViewPayment = (payment) => {
    const hasProof = payment.proofImage || payment.qrCodeUrl;
    const proofType = payment.proofImage ? 'Proof Image' : payment.qrCodeUrl ? 'QR Code' : null;

    alert(`Payment Details:\n\n` +
      `Payment ID: ${payment.id}\n` +
      `Order: ${payment.orderNumber}\n` +
      `Gateway: ${payment.paymentGateway} (${payment.gatewayReference})\n` +
      `Method: ${payment.paymentMethod.toUpperCase()}\n` +
      `Amount: ${formatCurrency(payment.amount)}\n` +
      `Status: ${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}\n` +
      `Verification: ${payment.adminVerified ? `Verified by ${payment.verifiedByName}` : 'Pending verification'}\n\n` +
      `Timeline:\n` +
      `Created: ${new Date(payment.createdAt).toLocaleString('id-ID')}\n` +
      `${payment.paidAt ? `Paid: ${new Date(payment.paidAt).toLocaleString('id-ID')}\n` : ''}` +
      `${payment.expiresAt ? `Expires: ${new Date(payment.expiresAt).toLocaleString('id-ID')}\n` : ''}` +
      `${payment.verifiedAt ? `Verified: ${new Date(payment.verifiedAt).toLocaleString('id-ID')}\n` : ''}` +
      `${payment.refundedAt ? `Refunded: ${new Date(payment.refundedAt).toLocaleString('id-ID')}\n` : ''}` +
      `Updated: ${new Date(payment.updatedAt).toLocaleString('id-ID')}\n\n` +
      `${hasProof ? `Available: ${proofType}\n` : ''}` +
      `Gateway Response: ${JSON.stringify(payment.gatewayResponse, null, 2)}`
    );
  };

  const columns = [
    {
      key: "gatewayReference",
      title: "Transaction Info",
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-gray-500">{row.paymentGateway}</div>
          <div className="text-xs text-blue-600">{row.orderNumber}</div>
        </div>
      )
    },
    {
      key: "paymentMethod",
      title: "Method",
      render: (value) => <PaymentMethodBadge method={value} />
    },
    {
      key: "amount",
      title: "Amount",
      render: (value) => (
        <div className="font-medium">
          {formatCurrency(value)}
        </div>
      )
    },
    {
      key: "status",
      title: "Status",
      render: (value) => <StatusBadge status={value} />
    },
    {
      key: "adminVerified",
      title: "Verification",
      render: (value, row) => <VerifiedBadge verified={value} verifiedByName={row.verifiedByName} />
    },
    {
      key: "createdAt",
      title: "Date",
      render: (value, row) => (
        <div className="text-sm">
          <div>{new Date(value).toLocaleDateString('id-ID')}</div>
          <div className="text-xs text-gray-500">
            {new Date(value).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </div>
          {row.expiresAt && row.status === 'pending' && (
            <div className="text-xs text-orange-600">
              Expires: {new Date(row.expiresAt).toLocaleDateString('id-ID')}
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            Payment Management
          </h1>
          <p className="text-gray-500">Manage payment transactions and verification</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Payment
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={payments}
        searchable={true}
        emptyMessage="No payments found"
        actions={[
          { label: "View", icon: Eye, onClick: handleViewPayment },
          { label: "Edit", icon: Edit, onClick: (payment) => console.log("Edit", payment) },
          { label: "Delete", icon: Trash2, onClick: (payment) => console.log("Delete", payment) }
        ]}
      />
    </div>
  );
}