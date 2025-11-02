"use client";

import { useState, useEffect } from "react";
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
  RefreshCw,
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
import { getInventory, getProductsForInventory, createInventory, updateInventory, deleteInventory } from "./actions";


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
function InventoryForm({ inventory, onSave, onCancel, isOpen, products }) {
  const [formData, setFormData] = useState({
    productId: inventory?.productId || "",
    currentStock: inventory?.currentStock || 0,
    reservedStock: inventory?.reservedStock || 0,
    minStock: inventory?.minStock || 10
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'currentStock' || field === 'reservedStock' || field === 'minStock'
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const selectedProduct = products.find(p => p.id === formData.productId);
      if (!selectedProduct) {
        alert("Please select a valid product");
        setIsLoading(false);
        return;
      }

      const availableStock = formData.currentStock - formData.reservedStock;

      const data = {
        ...formData,
        availableStock,
        lowStockThreshold: availableStock <= formData.minStock,
        outOfStock: formData.currentStock === 0,
        product: selectedProduct
      };

      await onSave(data);
    } catch (error) {
      console.error("Error saving inventory:", error);
      alert("Failed to save inventory: " + error.message);
    } finally {
      setIsLoading(false);
    }
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
                {products.map((product) => (
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
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : (inventory ? "Update" : "Create") + " Inventory"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInventory, setEditingInventory] = useState(null);

  // Load data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [inventoryData, productsData] = await Promise.all([
        getInventory(),
        getProductsForInventory()
      ]);
      setInventory(inventoryData);
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

  const handleAddInventory = () => {
    setEditingInventory(null);
    setIsFormOpen(true);
  };

  const handleEditInventory = (inventoryItem) => {
    setEditingInventory(inventoryItem);
    setIsFormOpen(true);
  };

  const handleSaveInventory = async (inventoryData) => {
    try {
      if (editingInventory) {
        // Update existing inventory
        const updated = await updateInventory(editingInventory.id, inventoryData);
        setInventory(prev => prev.map(i => i.id === updated.id ? updated : i));
      } else {
        // Add new inventory
        const created = await createInventory(inventoryData);
        setInventory(prev => [...prev, created]);
      }
      setIsFormOpen(false);
      setEditingInventory(null);
    } catch (error) {
      console.error("Error saving inventory:", error);
      throw error;
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingInventory(null);
  };

  const handleDeleteInventory = async (inventoryItem) => {
    if (confirm(`Are you sure you want to delete inventory record for "${inventoryItem.product?.name || 'Unknown Product'}"?`)) {
      try {
        await deleteInventory(inventoryItem.id);
        setInventory(prev => prev.filter(i => i.id !== inventoryItem.id));
      } catch (error) {
        console.error("Error deleting inventory:", error);
        alert("Failed to delete inventory");
      }
    }
  };

  const handleViewInventory = (inventoryItem) => {
    const product = inventoryItem.product || {};
    alert(`Inventory Details:\n\nProduct: ${product.name || 'Unknown'}\nSKU: ${product.sku || 'N/A'}\nCurrent Stock: ${inventoryItem.currentStock}\nReserved Stock: ${inventoryItem.reservedStock}\nAvailable Stock: ${inventoryItem.availableStock}\nMin Stock: ${inventoryItem.minStock}\nStatus: ${inventoryItem.outOfStock ? 'Out of Stock' : inventoryItem.lowStockThreshold ? 'Low Stock' : 'In Stock'}\nLast Updated: ${new Date(inventoryItem.updatedAt).toLocaleString('id-ID')}`);
  };

  const columns = [
    {
      key: "product",
      title: "Product",
      render: (value, row) => <ProductInfo product={row.product || {}} />
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
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleAddInventory}>
            <Plus className="w-4 h-4 mr-2" />
            Add Inventory
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={inventory}
        searchable={true}
        emptyMessage={isLoading ? "Loading..." : "No inventory records found"}
        loading={isLoading}
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
        products={products}
      />
    </div>
  );
}