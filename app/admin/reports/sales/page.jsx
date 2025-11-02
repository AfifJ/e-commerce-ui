"use client";

import { useState } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  Package,
  DollarSign,
} from "lucide-react";

// Mock data matching database schema
const mockSalesReports = [
  {
    id: "uuid-report-001",
    salesId: "uuid-sales-001",
    salesName: "Ahmad Rahman",
    salesEmail: "ahmad.rahman@example.com",
    reportDate: "2024-01-15T00:00:00Z",
    totalOrders: 45,
    totalRevenue: "125500000",
    totalCommission: "3765000",
    productsSold: 78,
    averageOrderValue: "2788889",
    createdAt: "2024-01-15T23:59:59Z"
  },
  {
    id: "uuid-report-002",
    salesId: "uuid-sales-002",
    salesName: "Siti Aminah",
    salesEmail: "siti.aminah@example.com",
    reportDate: "2024-01-15T00:00:00Z",
    totalOrders: 38,
    totalRevenue: "98500000",
    totalCommission: "2955000",
    productsSold: 52,
    averageOrderValue: "2592105",
    createdAt: "2024-01-15T23:59:59Z"
  },
  {
    id: "uuid-report-003",
    salesId: "uuid-sales-003",
    salesName: "Budi Santoso",
    salesEmail: "budi.santoso@example.com",
    reportDate: "2024-01-14T00:00:00Z",
    totalOrders: 32,
    totalRevenue: "78200000",
    totalCommission: "2346000",
    productsSold: 41,
    averageOrderValue: "2443750",
    createdAt: "2024-01-14T23:59:59Z"
  },
  {
    id: "uuid-report-004",
    salesId: "uuid-sales-001",
    salesName: "Ahmad Rahman",
    salesEmail: "ahmad.rahman@example.com",
    reportDate: "2024-01-14T00:00:00Z",
    totalOrders: 28,
    totalRevenue: "68500000",
    totalCommission: "2055000",
    productsSold: 35,
    averageOrderValue: "2446429",
    createdAt: "2024-01-14T23:59:59Z"
  },
  {
    id: "uuid-report-005",
    salesId: "uuid-sales-002",
    salesName: "Siti Aminah",
    salesEmail: "siti.aminah@example.com",
    reportDate: "2024-01-13T00:00:00Z",
    totalOrders: 41,
    totalRevenue: "112300000",
    totalCommission: "3369000",
    productsSold: 63,
    averageOrderValue: "2739024",
    createdAt: "2024-01-13T23:59:59Z"
  }
];

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(parseInt(amount) || 0);
}

function handleViewReport(report) {
  alert(`Sales Report Details:\n\n` +
    `Report ID: ${report.id}\n` +
    `Sales Person: ${report.salesName} (${report.salesEmail})\n` +
    `Report Date: ${new Date(report.reportDate).toLocaleDateString('id-ID')}\n\n` +
    `Performance Metrics:\n` +
    `Total Orders: ${report.totalOrders}\n` +
    `Products Sold: ${report.productsSold}\n` +
    `Total Revenue: ${formatCurrency(report.totalRevenue)}\n` +
    `Total Commission: ${formatCurrency(report.totalCommission)}\n` +
    `Average Order Value: ${formatCurrency(report.averageOrderValue)}\n` +
    `Commission Rate: ${((parseInt(report.totalCommission) / parseInt(report.totalRevenue)) * 100).toFixed(2)}%\n\n` +
    `Generated: ${new Date(report.createdAt).toLocaleString('id-ID')}`
  );
}

export default function SalesReportsPage() {
  const [reports] = useState(mockSalesReports);

  const columns = [
    {
      key: "salesName",
      title: "Sales Person",
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{row.salesEmail}</div>
        </div>
      )
    },
    {
      key: "reportDate",
      title: "Report Date",
      render: (value) => (
        <div className="text-sm">
          <div className="font-medium">{new Date(value).toLocaleDateString('id-ID')}</div>
        </div>
      )
    },
    {
      key: "totalOrders",
      title: "Orders",
      render: (value) => (
        <div className="text-center">
          <div className="font-medium text-lg">{value}</div>
          <div className="text-xs text-gray-500">orders</div>
        </div>
      )
    },
    {
      key: "productsSold",
      title: "Products Sold",
      render: (value) => (
        <div className="text-center">
          <div className="font-medium text-lg">{value}</div>
          <div className="text-xs text-gray-500">units</div>
        </div>
      )
    },
    {
      key: "totalRevenue",
      title: "Revenue",
      render: (value) => (
        <div className="text-right">
          <div className="font-medium">{formatCurrency(value)}</div>
        </div>
      )
    },
    {
      key: "totalCommission",
      title: "Commission",
      render: (value, row) => (
        <div className="text-right">
          <div className="font-medium text-green-600">{formatCurrency(value)}</div>
          <div className="text-xs text-gray-500">
            {((parseInt(value) / parseInt(row.totalRevenue)) * 100).toFixed(1)}%
          </div>
        </div>
      )
    },
    {
      key: "averageOrderValue",
      title: "Avg Order",
      render: (value) => (
        <div className="text-right">
          <div className="font-medium">{formatCurrency(value)}</div>
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
            <DollarSign className="w-6 h-6" />
            Sales Reports
          </h1>
          <p className="text-gray-500">Laporan performa sales</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={reports}
        searchable={true}
        emptyMessage="No sales reports found"
        actions={[
          { label: "View", icon: Eye, onClick: handleViewReport },
          { label: "Edit", icon: Edit, onClick: (report) => console.log("Edit", report) },
          { label: "Delete", icon: Trash2, onClick: (report) => console.log("Delete", report) }
        ]}
      />
    </div>
  );
}