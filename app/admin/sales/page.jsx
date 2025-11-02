"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  X,
  Save,
  Package,
  ShoppingCart,
  DollarSign,
  MapPin,
  Calendar,
  ExternalLink,
  Loader2,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getSales, createSales, updateSales, deleteSales, toggleSalesStatus } from "./actions";
import { toast } from "sonner";

function StatusBadge({ isActive }) {
  const statusConfig = {
    true: "bg-green-100 text-green-800",
    false: "bg-gray-100 text-gray-800"
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[isActive] || "bg-gray-100 text-gray-800"}`}>
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

function PerformanceBadge({ transactions, revenue }) {
  const getPerformanceColor = (transactions) => {
    if (transactions >= 40) return "text-green-600";
    if (transactions >= 25) return "text-blue-600";
    if (transactions >= 15) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="text-sm">
      <div className={`font-medium ${getPerformanceColor(transactions)}`}>
        {transactions} transaksi
      </div>
      <div className="text-xs text-gray-500">
        Rp {(parseInt(revenue) / 1000000).toFixed(0)}M revenue
      </div>
    </div>
  );
}

function BorrowStatusBadge({ borrowed, returned, salesId }) {
  const pending = borrowed - returned;
  const getStatusColor = () => {
    if (pending === 0) return "bg-green-100 text-green-800";
    if (pending <= 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="text-sm">
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
        <Package className="w-3 h-3" />
        {pending} pending
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {returned}/{borrowed} returned
      </div>
      {pending > 0 && (
        <button
          onClick={() => window.open('/admin/borrows', '_blank')}
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
          title="View all borrows"
        >
          <ExternalLink className="w-3 h-3" />
          View Details
        </button>
      )}
    </div>
  );
}

// Mock data for integration with borrows page
const mockBorrowsForSales = [
  {
    id: "uuid-borrow-001",
    salesId: "uuid-sales-001",
    borrowCode: "BOR-20240115-001",
    productName: "Laptop ASUS ROG",
    status: "borrowed",
    borrowDate: "2024-01-15T09:00:00Z"
  },
  {
    id: "uuid-borrow-002",
    salesId: "uuid-sales-001",
    borrowCode: "BOR-20240112-002",
    productName: "Coffee Machine Deluxe",
    status: "partial",
    borrowDate: "2024-01-12T16:45:00Z"
  },
  {
    id: "uuid-borrow-003",
    salesId: "uuid-sales-002",
    borrowCode: "BOR-20240110-002",
    productName: "Mouse Gaming",
    status: "returned",
    borrowDate: "2024-01-10T14:30:00Z"
  }
];

// Sales Form Component
function SalesForm({ sales, onSave, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    username: sales?.username || "",
    name: sales?.name || "",
    email: sales?.email || "",
    phone: sales?.phone || "",
    isActive: sales?.isActive ?? true,
    emailVerified: sales?.emailVerified ?? false,
    phoneVerified: sales?.phoneVerified ?? false,
    image: sales?.image || ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: sales?.id || `uuid-${Date.now()}`,
      role: "sales",
      lastLogin: sales?.lastLogin || null,
      currentHotelId: sales?.currentHotelId || null,
      totalTransactions: sales?.totalTransactions || 0,
      totalRevenue: sales?.totalRevenue || "0",
      totalCommission: sales?.totalCommission || "0",
      pendingTransactions: sales?.pendingTransactions || 0,
      borrowedProducts: sales?.borrowedProducts || 0,
      returnedProducts: sales?.returnedProducts || 0,
      joinDate: sales?.joinDate || new Date().toISOString().split('T')[0],
      createdAt: sales?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {sales ? "Edit Sales" : "Add New Sales"}
          </DialogTitle>
          <DialogDescription>
            {sales ? "Update sales information below." : "Create a new sales account."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          
          <div className="space-y-2">
            <Label htmlFor="image">Profile Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="Enter image URL (optional)"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleInputChange("isActive", checked)}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="emailVerified"
                checked={formData.emailVerified}
                onCheckedChange={(checked) => handleInputChange("emailVerified", checked)}
              />
              <Label htmlFor="emailVerified">Email Verified</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="phoneVerified"
                checked={formData.phoneVerified}
                onCheckedChange={(checked) => handleInputChange("phoneVerified", checked)}
              />
              <Label htmlFor="phoneVerified">Phone Verified</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {sales ? "Update" : "Create"} Sales
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSales, setEditingSales] = useState(null);

  // Fetch sales data on component mount
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    setIsLoading(true);
    try {
      const result = await getSales();
      if (result.success) {
        // Add actions to each sales user
        const salesWithActions = result.data.map(salesUser => ({
          ...salesUser,
          actions: [
            { label: "View", icon: Eye, onClick: () => handleViewSales(salesUser) },
            { label: "Edit", icon: Edit, onClick: () => handleEditSales(salesUser) },
            { label: "Delete", icon: Trash2, onClick: () => handleDeleteSales(salesUser), destructive: true }
          ]
        }));
        setSales(salesWithActions);
      } else {
        toast.error(result.error || "Failed to fetch sales");
      }
    } catch (error) {
      toast.error("Failed to fetch sales");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSales = () => {
    setEditingSales(null);
    setIsFormOpen(true);
  };

  const handleEditSales = (sales) => {
    setEditingSales(sales);
    setIsFormOpen(true);
  };

  const handleSaveSales = async (salesData) => {
    let result;

    if (editingSales) {
      // Update existing sales
      result = await updateSales(editingSales.id, salesData);
    } else {
      // Add new sales
      result = await createSales(salesData);
    }

    if (result.success) {
      await fetchSales(); // Refresh the sales list
      setIsFormOpen(false);
      setEditingSales(null);
      toast.success(editingSales ? "Sales updated successfully" : "Sales created successfully");
    } else {
      toast.error(result.error || "Failed to save sales");
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingSales(null);
  };

  const handleDeleteSales = async (sales) => {
    if (confirm(`Are you sure you want to delete sales "${sales.name}"?`)) {
      try {
        const result = await deleteSales(sales.id);
        if (result.success) {
          toast.success("Sales deleted successfully");
          await fetchSales(); // Refresh the sales list
        } else {
          toast.error(result.error || "Failed to delete sales");
        }
      } catch (error) {
        toast.error("Failed to delete sales");
      }
    }
  };

  const handleViewSales = (sales) => {
    const pendingBorrows = sales.pendingBorrows || 0;
    const borrowInfo = pendingBorrows > 0
      ? `\n\nPending Borrows: ${pendingBorrows} items`
      : '';

    alert(`Sales Details:\n\nName: ${sales.name}\nEmail: ${sales.email}\nPhone: ${sales.phone}\nUsername: ${sales.username}\nTotal Transactions: ${sales.totalTransactions || 0}\nTotal Revenue: Rp ${((sales.totalRevenue || 0)).toLocaleString('id-ID')}\nTotal Commission: Rp ${((sales.totalCommission || 0)).toLocaleString('id-ID')}\nPending Transactions: ${sales.pendingTransactions || 0}\nBorrowed Products: ${sales.borrowedProducts || 0}\nReturned Products: ${sales.returnedProducts || 0}\nStatus: ${sales.isActive ? 'Active' : 'Inactive'}\nEmail Verified: ${sales.emailVerified ? 'Yes' : 'No'}\nPhone Verified: ${sales.phoneVerified ? 'Yes' : 'No'}${borrowInfo}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(parseInt(amount) || 0);
  };

  const columns = [
    {
      key: "image",
      title: "Sales Info",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          {value ? (
            <img
              src={value}
              alt={row.name}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center" style={{display: value ? 'none' : 'flex'}}>
            <span className="text-xs font-medium text-gray-600">
              {row.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-gray-500">@{row.username}</div>
          </div>
        </div>
      )
    },
    {
      key: "contact",
      title: "Contact",
      render: (value, row) => (
        <div>
          <div className="text-sm">{row.email}</div>
          <div className="text-xs text-gray-500">{row.phone}</div>
        </div>
      )
    },
    {
      key: "performance",
      title: "Performance",
      render: (value, row) => <PerformanceBadge transactions={row.totalTransactions} revenue={row.totalRevenue} />
    },
    {
      key: "commission",
      title: "Commission",
      render: (value, row) => (
        <div className="text-sm">
          <div className="font-medium text-green-600">
            {formatCurrency(row.totalCommission)}
          </div>
          <div className="text-xs text-gray-500">
            {row.pendingTransactions} pending
          </div>
        </div>
      )
    },
    {
      key: "borrowStatus",
      title: "Product Borrow",
      render: (value, row) => <BorrowStatusBadge borrowed={row.borrowedProducts} returned={row.returnedProducts} salesId={row.id} />
    },
    {
      key: "isActive",
      title: "Status",
      render: (value) => <StatusBadge isActive={value} />
    },
    {
      key: "lastLogin",
      title: "Last Login",
      render: (value) => (
        <div className="text-sm">
          {value ? new Date(value).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : 'Never'}
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
            <TrendingUp className="w-6 h-6" />
            Sales Management
          </h1>
          <p className="text-gray-500">Manage sales team performance and activities</p>
        </div>
        <Button onClick={handleAddSales} disabled={isLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Add Sales
        </Button>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading sales data...</span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={sales}
          searchable={true}
          emptyMessage="No sales records found"
        />
      )}

      {/* Sales Form Modal */}
      <SalesForm
        sales={editingSales}
        onSave={handleSaveSales}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />
    </div>
  );
}