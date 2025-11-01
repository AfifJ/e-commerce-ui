"use client";

import { useState } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Eye,
  Edit,
  Package,
  AlertTriangle,
  Archive,
  TrendingUp,
  CheckCircle,
  XCircle,
  RefreshCw,
  BarChart3,
} from "lucide-react";

// Mock data
const mockInventory = [
  {
    id: "INV-001",
    sku: "LAP-ASUS-001",
    productName: "Laptop ASUS ROG Strix G15",
    category: "Elektronik",
    vendor: "PT. Elektronik Jaya",
    currentStock: 25,
    minStock: 10,
    maxStock: 100,
    reservedStock: 8,
    availableStock: 17,
    unitCost: 12000000,
    sellingPrice: 15000000,
    location: "Gudang A - Rak 3-12",
    lastUpdated: "2024-01-15T14:30:00Z",
    status: "normal",
    movements: [
      { type: "in", quantity: 50, date: "2024-01-01", reference: "Purchase Order PO-001" },
      { type: "out", quantity: 25, date: "2024-01-15", reference: "Sales Order ORD-001" }
    ],
    actions: [
      { label: "View Details", icon: Eye, onClick: (item) => console.log("View", item) },
      { label: "Update Stock", icon: Edit, onClick: (item) => console.log("Update", item) },
      { label: "View Movements", icon: BarChart3, onClick: (item) => console.log("Movements", item) }
    ]
  },
  {
    id: "INV-002",
    sku: "PHN-SAMS-002",
    productName: "Samsung Galaxy S24 Ultra",
    category: "Elektronik",
    vendor: "PT. Elektronik Jaya",
    currentStock: 8,
    minStock: 15,
    maxStock: 80,
    reservedStock: 5,
    availableStock: 3,
    unitCost: 18000000,
    sellingPrice: 22000000,
    location: "Gudang A - Rak 2-8",
    lastUpdated: "2024-01-15T11:20:00Z",
    status: "low_stock",
    movements: [
      { type: "in", quantity: 30, date: "2024-01-05", reference: "Purchase Order PO-002" },
      { type: "out", quantity: 22, date: "2024-01-14", reference: "Sales Order ORD-003" }
    ],
    actions: [
      { label: "View Details", icon: Eye, onClick: (item) => console.log("View", item) },
      { label: "Restock Now", icon: RefreshCw, onClick: (item) => console.log("Restock", item) },
      { label: "View Movements", icon: BarChart3, onClick: (item) => console.log("Movements", item) }
    ]
  },
  {
    id: "INV-003",
    sku: "FASH-FEM-003",
    productName: "Baju Muslim Wanita - Premium Collection",
    category: "Fashion",
    vendor: "CV. Fashion Trend",
    currentStock: 150,
    minStock: 50,
    maxStock: 200,
    reservedStock: 20,
    availableStock: 130,
    unitCost: 100000,
    sellingPrice: 150000,
    location: "Gudang B - Rak 5-15",
    lastUpdated: "2024-01-15T16:45:00Z",
    status: "normal",
    movements: [
      { type: "in", quantity: 200, date: "2024-01-10", reference: "Purchase Order PO-003" },
      { type: "out", quantity: 50, date: "2024-01-15", reference: "Sales Order ORD-004" }
    ],
    actions: [
      { label: "View Details", icon: Eye, onClick: (item) => console.log("View", item) },
      { label: "Update Stock", icon: Edit, onClick: (item) => console.log("Update", item) },
      { label: "View Movements", icon: BarChart3, onClick: (item) => console.log("Movements", item) }
    ]
  },
  {
    id: "INV-004",
    sku: "SHO-NIKE-004",
    productName: "Sepatu Nike Air Max 270",
    category: "Fashion",
    vendor: "CV. Fashion Trend",
    currentStock: 0,
    minStock: 20,
    maxStock: 100,
    reservedStock: 0,
    availableStock: 0,
    unitCost: 1200000,
    sellingPrice: 1800000,
    location: "Gudang B - Rak 6-20",
    lastUpdated: "2024-01-13T09:30:00Z",
    status: "out_of_stock",
    movements: [
      { type: "in", quantity: 50, date: "2024-01-08", reference: "Purchase Order PO-004" },
      { type: "out", quantity: 50, date: "2024-01-13", reference: "Sales Order ORD-005" }
    ],
    actions: [
      { label: "View Details", icon: Eye, onClick: (item) => console.log("View", item) },
      { label: "Urgent Restock", icon: AlertTriangle, onClick: (item) => console.log("Urgent Restock", item) },
      { label: "View Movements", icon: BarChart3, onClick: (item) => console.log("Movements", item) }
    ]
  },
  {
    id: "INV-005",
    sku: "HOM-KIT-005",
    productName: "Kitchen Set Stainless Steel 10pcs",
    category: "Rumah Tangga",
    vendor: "UD. Rumah Tangga",
    currentStock: 85,
    minStock: 30,
    maxStock: 120,
    reservedStock: 10,
    availableStock: 75,
    unitCost: 500000,
    sellingPrice: 750000,
    location: "Gudang C - Rak 1-5",
    lastUpdated: "2024-01-15T13:15:00Z",
    status: "overstock",
    movements: [
      { type: "in", quantity: 100, date: "2024-01-03", reference: "Purchase Order PO-005" },
      { type: "out", quantity: 15, date: "2024-01-12", reference: "Sales Order ORD-006" }
    ],
    actions: [
      { label: "View Details", icon: Eye, onClick: (item) => console.log("View", item) },
      { label: "Promote Sale", icon: TrendingUp, onClick: (item) => console.log("Promote", item) },
      { label: "View Movements", icon: BarChart3, onClick: (item) => console.log("Movements", item) }
    ]
  }
];

const inventoryStats = {
  totalProducts: 5,
  totalStockValue: 578500000,
  lowStockItems: 1,
  outOfStockItems: 1,
  overstockItems: 1,
  normalItems: 2,
  totalCurrentStock: 268,
  totalReservedStock: 43,
  totalAvailableStock: 225
};

function StatusBadge({ status }) {
  const statusConfig = {
    normal: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    low_stock: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
    out_of_stock: { color: "bg-red-100 text-red-800", icon: XCircle },
    overstock: { color: "bg-blue-100 text-blue-800", icon: Archive }
  };

  const config = statusConfig[status] || statusConfig.normal;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
    </span>
  );
}

function StockLevelIndicator({ current, min, max }) {
  const percentage = (current / max) * 100;
  let color = "bg-green-600";
  let status = "Good";

  if (current === 0) {
    color = "bg-red-600";
    status = "Out of Stock";
  } else if (current <= min) {
    color = "bg-yellow-600";
    status = "Low Stock";
  } else if (current >= max * 0.9) {
    color = "bg-blue-600";
    status = "High Stock";
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span>{status}</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500">
        {current} / {max} units
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const [inventory] = useState(mockInventory);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    {
      key: "sku",
      title: "Product Information",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="font-medium text-blue-600">{value}</div>
          <div className="text-sm font-medium">{row.productName}</div>
          <div className="text-xs text-gray-500">Category: {row.category}</div>
          <div className="text-xs text-gray-500">Vendor: {row.vendor}</div>
        </div>
      )
    },
    {
      key: "stockInfo",
      title: "Stock Information",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="text-sm font-medium">
            Available: <span className="text-green-600">{row.availableStock}</span>
          </div>
          <div className="text-xs text-gray-500">
            Reserved: {row.reservedStock} / Total: {row.currentStock}
          </div>
          <StockLevelIndicator
            current={row.currentStock}
            min={row.minStock}
            max={row.maxStock}
          />
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
      key: "pricing",
      title: "Pricing",
      sortable: true,
      render: (_, row) => (
        <div className="space-y-1">
          <div className="text-sm">
            Cost: <span className="font-medium">Rp {row.unitCost.toLocaleString('id-ID')}</span>
          </div>
          <div className="text-sm">
            Price: <span className="font-medium text-green-600">Rp {row.sellingPrice.toLocaleString('id-ID')}</span>
          </div>
          <div className="text-xs text-gray-500">
            Margin: {((row.sellingPrice - row.unitCost) / row.sellingPrice * 100).toFixed(1)}%
          </div>
        </div>
      )
    },
    {
      key: "location",
      title: "Location",
      sortable: true,
      render: (_, row) => (
        <div className="text-sm">
          {row.location}
        </div>
      )
    },
    {
      key: "stockValue",
      title: "Stock Value",
      sortable: true,
      render: (_, row) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">
            Rp {(row.currentStock * row.unitCost).toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-gray-500">
            {row.currentStock} units @ Rp {row.unitCost.toLocaleString('id-ID')}
          </div>
        </div>
      )
    },
    {
      key: "lastUpdated",
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
      label: "Stock Status",
      type: "select",
      options: [
        { value: "all", label: "All Status" },
        { value: "normal", label: "Normal Stock" },
        { value: "low_stock", label: "Low Stock" },
        { value: "out_of_stock", label: "Out of Stock" },
        { value: "overstock", label: "Overstock" }
      ]
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [
        { value: "all", label: "All Categories" },
        { value: "Elektronik", label: "Elektronik" },
        { value: "Fashion", label: "Fashion" },
        { value: "Rumah Tangga", label: "Rumah Tangga" }
      ]
    },
    {
      key: "stockLevel",
      label: "Stock Level",
      type: "select",
      options: [
        { value: "all", label: "All Levels" },
        { value: "critical", label: "Critical (≤ Min Stock)" },
        { value: "healthy", label: "Healthy (Min < Stock ≤ Max)" },
        { value: "excess", label: "Excess (> Max Stock)" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500">Monitor and manage product inventory levels</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Stock
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Unique items
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {inventoryStats.lowStockItems + inventoryStats.outOfStockItems}
            </div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Stock</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{inventoryStats.totalAvailableStock}</div>
            <p className="text-xs text-muted-foreground">
              Ready to sell
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved Stock</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{inventoryStats.totalReservedStock}</div>
            <p className="text-xs text-muted-foreground">
              On hold
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              Rp {(inventoryStats.totalStockValue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Total value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={inventory}
        searchKey="sku"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedItems}
        onSelectedRowsChange={setSelectedItems}
        pagination={{
          total: inventory.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        }}
        emptyMessage="No inventory items found"
        actions={[
          {
            label: "Restock Items",
            icon: RefreshCw,
            onClick: (ids) => console.log("Restock", ids),
            disabled: selectedItems.length === 0
          },
          {
            label: "Update Stock",
            icon: Edit,
            onClick: (ids) => console.log("Update", ids),
            disabled: selectedItems.length === 0
          },
          {
            label: "Generate Report",
            icon: BarChart3,
            onClick: (ids) => console.log("Report", ids),
            disabled: selectedItems.length === 0
          }
        ]}
      />
    </div>
  );
}