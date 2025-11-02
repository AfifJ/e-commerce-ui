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
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  User,
  Calendar,
  CheckCircle,
  Clock,
  RotateCcw,
  PackageOpen,
} from "lucide-react";

// Mock data matching database schema
const mockSales = [
  {
    id: "uuid-sales-001",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    area: "Jakarta Pusat",
    isActive: true,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe"
  },
  {
    id: "uuid-sales-002",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    area: "Jakarta Selatan",
    isActive: true,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=janesmith"
  },
  {
    id: "uuid-sales-003",
    name: "Ahmad Rahman",
    username: "ahmadr",
    email: "ahmad.rahman@example.com",
    area: "Jakarta Barat",
    isActive: true,
    image: null
  }
];

const mockProducts = [
  {
    id: "uuid-prod-001",
    name: "Laptop ASUS ROG",
    sku: "LAP-001",
    category: "Elektronik",
    currentStock: 25,
    borrowedStock: 5,
    sellPrice: 15000000
  },
  {
    id: "uuid-prod-002",
    name: "Mouse Gaming",
    sku: "MOU-001",
    category: "Elektronik",
    currentStock: 100,
    borrowedStock: 10,
    sellPrice: 250000
  },
  {
    id: "uuid-prod-003",
    name: "Smart TV LG 43 inch",
    sku: "TV-001",
    category: "Elektronik",
    currentStock: 15,
    borrowedStock: 3,
    sellPrice: 4500000
  },
  {
    id: "uuid-prod-004",
    name: "Coffee Machine Deluxe",
    sku: "CFE-001",
    category: "Rumah Tangga",
    currentStock: 8,
    borrowedStock: 2,
    sellPrice: 4000000
  }
];

const mockBorrows = [
  {
    id: "uuid-borrow-001",
    borrowCode: "BOR-20240115-001",
    salesId: "uuid-sales-001",
    salesName: "John Doe",
    salesArea: "Jakarta Pusat",
    productId: "uuid-prod-001",
    productName: "Laptop ASUS ROG",
    productSku: "LAP-001",
    borrowQuantity: 1,
    returnedQuantity: 0,
    status: "borrowed",
    borrowDate: "2024-01-15T09:00:00Z",
    returnDate: null,
    notes: "Demo untuk client PT Tech Indonesia",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z"
  },
  {
    id: "uuid-borrow-002",
    borrowCode: "BOR-20240110-002",
    salesId: "uuid-sales-002",
    salesName: "Jane Smith",
    salesArea: "Jakarta Selatan",
    productId: "uuid-prod-002",
    productName: "Mouse Gaming",
    productSku: "MOU-001",
    borrowQuantity: 2,
    returnedQuantity: 2,
    status: "returned",
    borrowDate: "2024-01-10T14:30:00Z",
    returnDate: "2024-01-16T11:20:00Z",
    notes: "Demo untuk hotel client",
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-16T11:20:00Z"
  },
  {
    id: "uuid-borrow-003",
    borrowCode: "BOR-20240108-003",
    salesId: "uuid-sales-003",
    salesName: "Ahmad Rahman",
    salesArea: "Jakarta Barat",
    productId: "uuid-prod-003",
    productName: "Smart TV LG 43 inch",
    productSku: "TV-001",
    borrowQuantity: 1,
    returnedQuantity: 0,
    status: "borrowed",
    borrowDate: "2024-01-08T10:15:00Z",
    returnDate: null,
    notes: "Demo untuk restoran client",
    createdAt: "2024-01-08T10:15:00Z",
    updatedAt: "2024-01-08T10:15:00Z"
  },
  {
    id: "uuid-borrow-004",
    borrowCode: "BOR-20240112-004",
    salesId: "uuid-sales-001",
    salesName: "John Doe",
    salesArea: "Jakarta Pusat",
    productId: "uuid-prod-004",
    productName: "Coffee Machine Deluxe",
    productSku: "CFE-001",
    borrowQuantity: 1,
    returnedQuantity: 1,
    status: "partial",
    borrowDate: "2024-01-12T16:45:00Z",
    returnDate: "2024-01-18T09:30:00Z",
    notes: "Demo untuk cafe - dikembalikan sebagian (unit rusak)",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-18T09:30:00Z"
  }
];

function StatusBadge({ status }) {
  const statusConfig = {
    "borrowed": "bg-orange-100 text-orange-800",
    "partial": "bg-blue-100 text-blue-800",
    "returned": "bg-green-100 text-green-800"
  };

  const statusIcons = {
    "borrowed": Clock,
    "partial": PackageOpen,
    "returned": CheckCircle
  };

  const Icon = statusIcons[status] || Package;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status] || "bg-gray-100 text-gray-800"}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function generateBorrowCode() {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `BOR-${dateStr}-${random}`;
}

// Borrow Form Component
function BorrowForm({ borrow, onSave, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    salesId: borrow?.salesId || "",
    productId: borrow?.productId || "",
    borrowQuantity: borrow?.borrowQuantity || 1,
    notes: borrow?.notes || ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedSales = mockSales.find(s => s.id === formData.salesId);
    const selectedProduct = mockProducts.find(p => p.id === formData.productId);

    if (!selectedSales || !selectedProduct) {
      alert('Please select valid sales and product');
      return;
    }

    const availableStock = selectedProduct.currentStock - selectedProduct.borrowedStock;
    if (formData.borrowQuantity > availableStock) {
      alert(`Only ${availableStock} units available for borrow`);
      return;
    }

    onSave({
      ...formData,
      id: borrow?.id || `uuid-${Date.now()}`,
      borrowCode: borrow?.borrowCode || generateBorrowCode(),
      salesName: selectedSales.name,
      salesArea: selectedSales.area,
      productName: selectedProduct.name,
      productSku: selectedProduct.sku,
      returnedQuantity: borrow?.returnedQuantity || 0,
      status: borrow?.status || "borrowed",
      borrowDate: borrow?.borrowDate || new Date().toISOString(),
      returnDate: borrow?.returnDate,
      createdAt: borrow?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  const selectedProduct = mockProducts.find(p => p.id === formData.productId);
  const availableStock = selectedProduct ? selectedProduct.currentStock - selectedProduct.borrowedStock : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {borrow ? "Edit Borrow" : "New Borrow Request"}
          </DialogTitle>
          <DialogDescription>
            {borrow ? "Update borrow information below." : "Create a new product borrow request for sales demonstration."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salesId">Sales Person</Label>
              <Select value={formData.salesId} onValueChange={(value) => handleInputChange("salesId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sales" />
                </SelectTrigger>
                <SelectContent>
                  {mockSales.filter(s => s.isActive).map((sales) => (
                    <SelectItem key={sales.id} value={sales.id}>
                      <div className="flex items-center gap-2">
                        {sales.image ? (
                          <img
                            src={sales.image}
                            alt={sales.name}
                            className="w-5 h-5 rounded-full"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center" style={{display: sales.image ? 'none' : 'flex'}}>
                          <span className="text-xs">{sales.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{sales.name}</div>
                          <div className="text-xs text-gray-500">{sales.area}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="productId">Product</Label>
              <Select value={formData.productId} onValueChange={(value) => handleInputChange("productId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => {
                    const available = product.currentStock - product.borrowedStock;
                    return (
                      <SelectItem key={product.id} value={product.id} disabled={available <= 0}>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            SKU: {product.sku} | Available: {available} units
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="borrowQuantity">Quantity</Label>
              <Input
                id="borrowQuantity"
                type="number"
                min="1"
                max={availableStock}
                value={formData.borrowQuantity}
                onChange={(e) => handleInputChange("borrowQuantity", parseInt(e.target.value) || 1)}
                placeholder="Enter quantity"
                required
              />
              {selectedProduct && (
                <p className="text-xs text-gray-500">
                  Available: {availableStock} units
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Enter notes about the borrow purpose..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {borrow ? "Update" : "Create"} Borrow
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function BorrowsPage() {
  const [borrows, setBorrows] = useState(mockBorrows);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBorrow, setEditingBorrow] = useState(null);

  const handleAddBorrow = () => {
    setEditingBorrow(null);
    setIsFormOpen(true);
  };

  const handleEditBorrow = (borrow) => {
    setEditingBorrow(borrow);
    setIsFormOpen(true);
  };

  const handleSaveBorrow = (borrowData) => {
    if (editingBorrow) {
      // Update existing borrow
      setBorrows(prev => prev.map(b =>
        b.id === borrowData.id ? borrowData : b
      ));
    } else {
      // Add new borrow
      setBorrows(prev => [...prev, borrowData]);

      // Update product borrowed stock
      const product = mockProducts.find(p => p.id === borrowData.productId);
      if (product) {
        product.borrowedStock += borrowData.borrowQuantity;
      }
    }
    setIsFormOpen(false);
    setEditingBorrow(null);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingBorrow(null);
  };

  const handleDeleteBorrow = (borrow) => {
    if (confirm(`Are you sure you want to delete borrow "${borrow.borrowCode}"?`)) {
      setBorrows(prev => prev.filter(b => b.id !== borrow.id));

      // Update product borrowed stock
      const product = mockProducts.find(p => p.id === borrow.productId);
      if (product) {
        product.borrowedStock -= borrow.borrowQuantity;
      }
    }
  };

  const handleReturnBorrow = (borrow) => {
    if (confirm(`Mark borrow "${borrow.borrowCode}" as returned? This will update the inventory stock.`)) {
      const updatedBorrow = {
        ...borrow,
        returnedQuantity: borrow.borrowQuantity,
        status: "returned",
        returnDate: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setBorrows(prev => prev.map(b =>
        b.id === borrow.id ? updatedBorrow : b
      ));

      // Update product stock
      const product = mockProducts.find(p => p.id === borrow.productId);
      if (product) {
        product.borrowedStock -= borrow.borrowQuantity;
        product.currentStock += borrow.borrowQuantity;
      }
    }
  };

  const handleViewBorrow = (borrow) => {
    const status = borrow.status === 'borrowed' && new Date(borrow.expectedReturnDate) < new Date() ? 'overdue' : borrow.status;
    alert(`Borrow Details:\n\nBorrow Code: ${borrow.borrowCode}\nSales: ${borrow.salesName} (${borrow.salesArea})\nProduct: ${borrow.productName} (${borrow.productSku})\nQuantity: ${borrow.borrowQuantity} units\nStatus: ${status}\nBorrow Date: ${new Date(borrow.borrowDate).toLocaleString('id-ID')}\nExpected Return: ${new Date(borrow.expectedReturnDate).toLocaleString('id-ID')}\nActual Return: ${borrow.returnDate ? new Date(borrow.returnDate).toLocaleString('id-ID') : 'Not returned'}\nNotes: ${borrow.notes || 'No notes'}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const columns = [
    {
      key: "borrowCode",
      title: "Borrow Code",
      render: (value) => <div className="font-mono text-sm font-medium">{value}</div>
    },
    {
      key: "salesInfo",
      title: "Sales Info",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
            {row.salesName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-sm">{row.salesName}</div>
            <div className="text-xs text-gray-500">{row.salesArea}</div>
          </div>
        </div>
      )
    },
    {
      key: "productInfo",
      title: "Product",
      render: (value, row) => (
        <div>
          <div className="font-medium text-sm">{row.productName}</div>
          <div className="text-xs text-gray-500">
            SKU: {row.productSku} | {formatCurrency(mockProducts.find(p => p.id === row.productId)?.sellPrice || 0)}
          </div>
        </div>
      )
    },
    {
      key: "quantity",
      title: "Quantity",
      render: (value, row) => (
        <div className="text-sm">
          <div className="font-medium">{row.borrowQuantity} units</div>
          {row.returnedQuantity > 0 && (
            <div className="text-xs text-gray-500">
              {row.returnedQuantity} returned
            </div>
          )}
        </div>
      )
    },
    {
      key: "status",
      title: "Status",
      render: (value, row) => <StatusBadge status={row.status} />
    },
    {
      key: "dates",
      title: "Dates",
      render: (value, row) => (
        <div className="text-sm">
          <div>Borrow: {new Date(row.borrowDate).toLocaleDateString('id-ID')}</div>
          {row.returnDate && (
            <div className="text-xs text-green-600">
              Returned: {new Date(row.returnDate).toLocaleDateString('id-ID')}
            </div>
          )}
        </div>
      )
    }
  ];

  // Calculate summary stats
  const activeBorrows = borrows.filter(b => b.status === 'borrowed').length;
  const totalBorrows = borrows.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <PackageOpen className="w-6 h-6" />
            Sales Borrow Management
          </h1>
          <p className="text-gray-500">Manage product borrows for sales demonstrations</p>
        </div>
        <Button onClick={handleAddBorrow}>
          <Plus className="w-4 h-4 mr-2" />
          New Borrow
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Borrows</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBorrows}</div>
            <p className="text-xs text-muted-foreground">All borrow records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Borrows</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{activeBorrows}</div>
            <p className="text-xs text-muted-foreground">Currently borrowed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products on Borrow</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {borrows.filter(b => b.status !== 'returned').reduce((sum, b) => sum + b.borrowQuantity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total units borrowed</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={borrows}
        searchable={true}
        emptyMessage="No borrow records found"
        actions={[
          { label: "View", icon: Eye, onClick: handleViewBorrow },
          { label: "Edit", icon: Edit, onClick: handleEditBorrow },
          {
            label: "Return",
            icon: RotateCcw,
            onClick: handleReturnBorrow,
            condition: (borrow) => borrow.status !== 'returned'
          },
          { label: "Delete", icon: Trash2, onClick: handleDeleteBorrow }
        ]}
      />

      {/* Borrow Form Modal */}
      <BorrowForm
        borrow={editingBorrow}
        onSave={handleSaveBorrow}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />
    </div>
  );
}