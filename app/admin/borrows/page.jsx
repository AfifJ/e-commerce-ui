"use client";

import { useState, useEffect } from "react";
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
  RefreshCw,
} from "lucide-react";
import {
  getBorrows,
  getSalesUsers,
  getAvailableProductsForBorrow,
  createBorrow,
  updateBorrow,
  returnBorrow,
  deleteBorrow
} from "./actions";


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
function BorrowForm({ borrow, onSave, onCancel, isOpen, salesUsers, products }) {
  const [formData, setFormData] = useState({
    salesId: borrow?.salesId || "",
    productId: borrow?.productId || "",
    borrowQuantity: borrow?.borrowQuantity || 1,
    notes: borrow?.notes || ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const selectedSales = salesUsers.find(s => s.id === formData.salesId);
      const selectedProduct = products.find(p => p.id === formData.productId);

      if (!selectedSales || !selectedProduct) {
        alert('Please select valid sales and product');
        setIsLoading(false);
        return;
      }

      if (formData.borrowQuantity <= 0) {
        alert('Borrow quantity must be greater than 0');
        setIsLoading(false);
        return;
      }

      await onSave(formData);
    } catch (error) {
      console.error("Error saving borrow:", error);
      alert("Failed to save borrow: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedProduct = products.find(p => p.id === formData.productId);
  const availableStock = selectedProduct ? selectedProduct.availableStock || 0 : 0;

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
                  {salesUsers.map((sales) => (
                    <SelectItem key={sales.id} value={sales.id}>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <span className="text-xs">{sales.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <div className="font-medium">{sales.name}</div>
                          <div className="text-xs text-gray-500">{sales.username}</div>
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
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id} disabled={(product.availableStock || 0) <= 0}>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-gray-500">
                          SKU: {product.sku} | Available: {product.availableStock || 0} units
                        </div>
                      </div>
                    </SelectItem>
                  ))}
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
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : (borrow ? "Update" : "Create") + " Borrow"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function BorrowsPage() {
  const [borrows, setBorrows] = useState([]);
  const [salesUsers, setSalesUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBorrow, setEditingBorrow] = useState(null);

  // Load data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [borrowsData, salesData, productsData] = await Promise.all([
        getBorrows(),
        getSalesUsers(),
        getAvailableProductsForBorrow()
      ]);
      setBorrows(borrowsData);
      setSalesUsers(salesData);
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddBorrow = () => {
    setEditingBorrow(null);
    setIsFormOpen(true);
  };

  const handleEditBorrow = (borrow) => {
    setEditingBorrow(borrow);
    setIsFormOpen(true);
  };

  const handleSaveBorrow = async (borrowData) => {
    try {
      if (editingBorrow) {
        // Update existing borrow
        const updated = await updateBorrow(editingBorrow.id, borrowData);
        setBorrows(prev => prev.map(b => b.id === updated.id ? updated : b));
      } else {
        // Add new borrow
        const created = await createBorrow(borrowData);
        setBorrows(prev => [...prev, created]);
      }
      setIsFormOpen(false);
      setEditingBorrow(null);
    } catch (error) {
      console.error("Error saving borrow:", error);
      throw error;
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingBorrow(null);
  };

  const handleDeleteBorrow = async (borrow) => {
    if (confirm(`Are you sure you want to delete borrow "${borrow.borrowCode}"?`)) {
      try {
        await deleteBorrow(borrow.id);
        setBorrows(prev => prev.filter(b => b.id !== borrow.id));
      } catch (error) {
        console.error("Error deleting borrow:", error);
        alert("Failed to delete borrow");
      }
    }
  };

  const handleReturnBorrow = async (borrow) => {
    if (confirm(`Mark borrow "${borrow.borrowCode}" as returned? This will update the inventory stock.`)) {
      try {
        const updated = await returnBorrow(borrow.id);
        setBorrows(prev => prev.map(b => b.id === updated.id ? updated : b));
      } catch (error) {
        console.error("Error returning borrow:", error);
        alert("Failed to return borrow");
      }
    }
  };

  const handleViewBorrow = (borrow) => {
    const sales = borrow.sales || {};
    const product = borrow.product || {};
    alert(`Borrow Details:\n\nBorrow Code: ${borrow.borrowCode}\nSales: ${sales.name || 'Unknown'} (${sales.username || 'N/A'})\nProduct: ${product.name || 'Unknown'} (${product.sku || 'N/A'})\nQuantity: ${borrow.borrowQuantity} units\nReturned: ${borrow.returnedQuantity} units\nStatus: ${borrow.status}\nBorrow Date: ${new Date(borrow.borrowDate).toLocaleString('id-ID')}\nReturn Date: ${borrow.returnDate ? new Date(borrow.returnDate).toLocaleString('id-ID') : 'Not returned'}\nNotes: ${borrow.notes || 'No notes'}`);
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
      render: (value, row) => {
        const sales = row.sales || {};
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
              {(sales.name || '?').charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-medium text-sm">{sales.name || 'Unknown'}</div>
              <div className="text-xs text-gray-500">{sales.username || 'N/A'}</div>
            </div>
          </div>
        );
      }
    },
    {
      key: "productInfo",
      title: "Product",
      render: (value, row) => {
        const product = row.product || {};
        return (
          <div>
            <div className="font-medium text-sm">{product.name || 'Unknown'}</div>
            <div className="text-xs text-gray-500">
              SKU: {product.sku || 'N/A'} | {formatCurrency(product.sellPrice || 0)}
            </div>
          </div>
        );
      }
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
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleAddBorrow}>
            <Plus className="w-4 h-4 mr-2" />
            New Borrow
          </Button>
        </div>
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
        emptyMessage={isLoading ? "Loading..." : "No borrow records found"}
        loading={isLoading}
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
        salesUsers={salesUsers}
        products={products}
      />
    </div>
  );
}