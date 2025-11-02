"use client";

import { useState } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  X,
  Save,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock products for foreign key relationship
const mockProducts = [
  {
    id: "uuid-prod-001",
    name: "Laptop ASUS ROG",
    slug: "laptop-asus-rog",
    sku: "LAP-001",
    buyPrice: "15000000",
    sellPrice: "18500000",
    margin: "3500000",
    commissionRate: 5,
    weight: 2500,
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"],
    isActive: true,
    featured: true,
    rating: 4.5,
    stock: 25,
    categoryId: "uuid-cat-002",
    vendorId: "uuid-vendor-001"
  },
  {
    id: "uuid-prod-002",
    name: "Mouse Gaming",
    slug: "mouse-gaming",
    sku: "MOU-001",
    buyPrice: "250000",
    sellPrice: "350000",
    margin: "100000",
    commissionRate: 10,
    weight: 150,
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46"],
    isActive: true,
    featured: false,
    rating: 4.2,
    stock: 8,
    categoryId: "uuid-cat-002",
    vendorId: "uuid-vendor-001"
  },
  {
    id: "uuid-prod-003",
    name: "Smart TV LG 43 inch",
    slug: "smart-tv-lg-43-inch",
    sku: "TV-001",
    buyPrice: "5500000",
    sellPrice: "6999000",
    margin: "1499000",
    commissionRate: 7,
    weight: 12000,
    images: ["https://images.unsplash.com/photo-1594736797933-d0801ba8d3e6"],
    isActive: true,
    featured: true,
    rating: 4.7,
    stock: 15,
    categoryId: "uuid-cat-001",
    vendorId: "uuid-vendor-002"
  },
  {
    id: "uuid-prod-004",
    name: "Coffee Machine Deluxe",
    slug: "coffee-machine-deluxe",
    sku: "CFE-001",
    buyPrice: "1200000",
    sellPrice: "1599000",
    margin: "399000",
    commissionRate: 12,
    weight: 4500,
    images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"],
    isActive: true,
    featured: false,
    rating: 4.0,
    stock: 0,
    categoryId: "uuid-cat-004",
    vendorId: "uuid-vendor-003"
  }
];

// Mock inventory data matching database schema
const mockInventory = [
  {
    id: "uuid-inv-001",
    productId: "uuid-prod-001",
    currentStock: 25,
    reservedStock: 3,
    minStock: 10,
    availableStock: 22,
    lowStockThreshold: false,
    outOfStock: false,
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    // Product info for display
    product: mockProducts[0]
  },
  {
    id: "uuid-inv-002",
    productId: "uuid-prod-002",
    currentStock: 8,
    reservedStock: 2,
    minStock: 10,
    availableStock: 6,
    lowStockThreshold: true,
    outOfStock: false,
    createdAt: "2024-01-02T09:15:00Z",
    updatedAt: "2024-01-14T16:20:00Z",
    product: mockProducts[1]
  },
  {
    id: "uuid-inv-003",
    productId: "uuid-prod-003",
    currentStock: 15,
    reservedStock: 1,
    minStock: 5,
    availableStock: 14,
    lowStockThreshold: false,
    outOfStock: false,
    createdAt: "2024-01-03T11:30:00Z",
    updatedAt: "2024-01-13T14:45:00Z",
    product: mockProducts[2]
  },
  {
    id: "uuid-inv-004",
    productId: "uuid-prod-004",
    currentStock: 0,
    reservedStock: 0,
    minStock: 5,
    availableStock: 0,
    lowStockThreshold: true,
    outOfStock: true,
    createdAt: "2024-01-04T13:20:00Z",
    updatedAt: "2024-01-12T09:10:00Z",
    product: mockProducts[3]
  }
];

function StockStatusBadge({ currentStock, reservedStock, minStock, availableStock }) {
  const getStatusConfig = () => {
    if (currentStock === 0) {
      return {
        color: "bg-red-100 text-red-800",
        icon: AlertTriangle,
        text: "Out of Stock"
      };
    }
    if (availableStock <= minStock) {
      return {
        color: "bg-yellow-100 text-yellow-800",
        icon: TrendingDown,
        text: "Low Stock"
      };
    }
    return {
      color: "bg-green-100 text-green-800",
      icon: TrendingUp,
      text: "In Stock"
    };
  };

  const status = getStatusConfig();
  const Icon = status.icon;

  return (
    <div className="space-y-1">
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
        <Icon className="w-3 h-3" />
        {status.text}
      </span>
      <div className="text-xs text-gray-500">
        {availableStock}/{currentStock} available
      </div>
      {reservedStock > 0 && (
        <div className="text-xs text-orange-600">
          {reservedStock} reserved
        </div>
      )}
    </div>
  );
}

function ProductInfo({ product }) {
  return (
    <div className="flex items-center gap-3">
      {product.images?.[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-12 h-12 rounded-lg object-cover border"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center border" style={{display: product.images?.[0] ? 'none' : 'flex'}}>
        <Package className="w-6 h-6 text-gray-400" />
      </div>
      <div>
        <div className="font-medium text-sm">{product.name}</div>
        <div className="text-xs text-gray-500">SKU: {product.sku}</div>
        <div className="text-xs text-gray-400">ID: {product.id.substring(0, 8)}...</div>
      </div>
    </div>
  );
}

// Inventory Form Component
function InventoryForm({ inventory, onSave, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    productId: inventory?.productId || "",
    currentStock: inventory?.currentStock || 0,
    reservedStock: inventory?.reservedStock || 0,
    minStock: inventory?.minStock || 10
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'currentStock' || field === 'reservedStock' || field === 'minStock'
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProduct = mockProducts.find(p => p.id === formData.productId);
    const availableStock = formData.currentStock - formData.reservedStock;

    onSave({
      ...formData,
      id: inventory?.id || `uuid-${Date.now()}`,
      availableStock,
      lowStockThreshold: availableStock <= formData.minStock,
      outOfStock: formData.currentStock === 0,
      product: selectedProduct,
      createdAt: inventory?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {inventory ? "Edit Inventory" : "Add New Inventory"}
          </DialogTitle>
          <DialogDescription>
            {inventory ? "Update inventory information below." : "Create a new inventory record."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productId">Product</Label>
            <Select value={formData.productId} onValueChange={(value) => handleInputChange("productId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} ({product.sku})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentStock">Current Stock</Label>
              <Input
                id="currentStock"
                type="number"
                min="0"
                value={formData.currentStock}
                onChange={(e) => handleInputChange("currentStock", e.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reservedStock">Reserved Stock</Label>
              <Input
                id="reservedStock"
                type="number"
                min="0"
                value={formData.reservedStock}
                onChange={(e) => handleInputChange("reservedStock", e.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minStock">Min Stock</Label>
              <Input
                id="minStock"
                type="number"
                min="1"
                value={formData.minStock}
                onChange={(e) => handleInputChange("minStock", e.target.value)}
                placeholder="10"
                required
              />
            </div>
          </div>

          {formData.productId && (
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <div className="font-medium mb-1">Preview:</div>
              <div>Available Stock: {formData.currentStock - formData.reservedStock}</div>
              <div>Status: {formData.currentStock === 0 ? 'Out of Stock' : (formData.currentStock - formData.reservedStock) <= formData.minStock ? 'Low Stock' : 'In Stock'}</div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {inventory ? "Update" : "Create"} Inventory
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState(mockInventory);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInventory, setEditingInventory] = useState(null);

  const handleAddInventory = () => {
    setEditingInventory(null);
    setIsFormOpen(true);
  };

  const handleEditInventory = (inventoryItem) => {
    setEditingInventory(inventoryItem);
    setIsFormOpen(true);
  };

  const handleSaveInventory = (inventoryData) => {
    if (editingInventory) {
      // Update existing inventory
      setInventory(prev => prev.map(i =>
        i.id === inventoryData.id ? inventoryData : i
      ));
    } else {
      // Add new inventory
      setInventory(prev => [...prev, inventoryData]);
    }
    setIsFormOpen(false);
    setEditingInventory(null);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingInventory(null);
  };

  const handleDeleteInventory = (inventoryItem) => {
    if (confirm(`Are you sure you want to delete inventory record for "${inventoryItem.product.name}"?`)) {
      setInventory(prev => prev.filter(i => i.id !== inventoryItem.id));
    }
  };

  const handleViewInventory = (inventoryItem) => {
    alert(`Inventory Details:\n\nProduct: ${inventoryItem.product.name}\nSKU: ${inventoryItem.product.sku}\nCurrent Stock: ${inventoryItem.currentStock}\nReserved Stock: ${inventoryItem.reservedStock}\nAvailable Stock: ${inventoryItem.availableStock}\nMin Stock: ${inventoryItem.minStock}\nStatus: ${inventoryItem.outOfStock ? 'Out of Stock' : inventoryItem.lowStockThreshold ? 'Low Stock' : 'In Stock'}\nLast Updated: ${new Date(inventoryItem.updatedAt).toLocaleString('id-ID')}`);
  };

  const columns = [
    {
      key: "product",
      title: "Product",
      render: (value, row) => <ProductInfo product={row.product} />
    },
    {
      key: "stockLevels",
      title: "Stock Levels",
      render: (value, row) => (
        <div className="text-sm">
          <div className="font-medium">Current: {row.currentStock}</div>
          <div className="text-xs text-gray-500">Available: {row.availableStock}</div>
          <div className="text-xs text-orange-600">Reserved: {row.reservedStock}</div>
          <div className="text-xs text-gray-400">Min: {row.minStock}</div>
        </div>
      )
    },
    {
      key: "status",
      title: "Status",
      render: (value, row) => <StockStatusBadge
        currentStock={row.currentStock}
        reservedStock={row.reservedStock}
        minStock={row.minStock}
        availableStock={row.availableStock}
      />
    },
    {
      key: "updatedAt",
      title: "Last Updated",
      render: (value) => (
        <div className="text-sm">
          {new Date(value).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
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
            <Package className="w-6 h-6" />
            Inventory Management
          </h1>
          <p className="text-gray-500">Manage product inventory levels and stock availability</p>
        </div>
        <Button onClick={handleAddInventory}>
          <Plus className="w-4 h-4 mr-2" />
          Add Inventory
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={inventory}
        searchable={true}
        emptyMessage="No inventory records found"
        actions={[
          { label: "View", icon: Eye, onClick: handleViewInventory },
          { label: "Edit", icon: Edit, onClick: handleEditInventory },
          { label: "Delete", icon: Trash2, onClick: handleDeleteInventory }
        ]}
      />

      {/* Inventory Form Modal */}
      <InventoryForm
        inventory={editingInventory}
        onSave={handleSaveInventory}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />
    </div>
  );
}