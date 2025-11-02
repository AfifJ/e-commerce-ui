"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Building,
  X,
  Save,
  Package,
  TrendingUp,
  Calendar,
  Loader2,
  Mail,
  Phone,
  User,
  Star,
  ShoppingCart,
  AlertCircle,
  ExternalLink,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getVendors, createVendor, updateVendor, deleteVendor, toggleVendorStatus } from "./actions";
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


function PerformanceBadge({ orders, revenue, rating }) {
  const getPerformanceColor = (orders) => {
    if (orders >= 200) return "text-green-600";
    if (orders >= 100) return "text-blue-600";
    if (orders >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  // Safely handle values
  const safeOrders = orders || 0;
  const safeRevenue = parseInt(revenue) || 0;
  const safeRating = rating || 0;

  return (
    <div className="text-sm">
      <div className={`font-medium ${getPerformanceColor(safeOrders)}`}>
        {safeOrders} orders
      </div>
      <div className="text-xs text-gray-500">
        Rp {(safeRevenue / 1000000).toFixed(0)}M revenue
      </div>
      <div className="text-xs text-gray-500 flex items-center gap-1">
        ⭐ {safeRating.toFixed(1)} rating
      </div>
    </div>
  );
}

function ViewVendorModal({ vendor, isOpen, onClose }) {
  if (!vendor) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(parseInt(amount) || 0);
  };

  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Vendor Details
          </DialogTitle>
          <DialogDescription>
            Complete information about {vendor.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vendor Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Vendor Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Username</Label>
                <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{vendor.username}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <div className="mt-1">
                  <StatusBadge isActive={vendor.isActive} />
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Vendor Name</Label>
              <p className="text-sm font-medium">{vendor.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Email</Label>
                <p className="text-sm flex items-center gap-1">
                  <Mail className="w-3 h-3 text-gray-400" />
                  {vendor.email}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Phone</Label>
                <p className="text-sm flex items-center gap-1">
                  <Phone className="w-3 h-3 text-gray-400" />
                  {vendor.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Business Performance */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Business Performance</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Package className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-blue-900">{vendor.totalProducts || 0}</p>
                <p className="text-xs text-blue-600">Total Products</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-green-900">{formatCurrency(vendor.estimatedValue)}</p>
                <p className="text-xs text-green-600">Estimated Value</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-yellow-900">{(vendor.averageRating || 0).toFixed(1)}</p>
                <p className="text-xs text-yellow-600">Avg Rating</p>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Additional Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Active Products</Label>
                <p className="text-sm font-medium">{vendor.activeProducts || 0} / {vendor.totalProducts || 0}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Featured Products</Label>
                <p className="text-sm font-medium">{vendor.featuredProducts || 0}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Total Reviews</Label>
                <p className="text-sm font-medium">{vendor.totalReviews || 0}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Stock Issues</Label>
                <div className="text-sm">
                  {vendor.outOfStockProducts > 0 || vendor.lowStockProducts > 0 ? (
                    <div className="flex items-center gap-1 text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      <span>{(vendor.outOfStockProducts || 0) + (vendor.lowStockProducts || 0)} items</span>
                    </div>
                  ) : (
                    <span className="text-green-600">All good</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Verification Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Email Verification</Label>
                <div className="flex items-center gap-2">
                  {vendor.emailVerified ? (
                    <>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="text-sm text-red-600">Not Verified</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Phone Verification</Label>
                <div className="flex items-center gap-2">
                  {vendor.phoneVerified ? (
                    <>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="text-sm text-red-600">Not Verified</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">System Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Vendor ID</Label>
                <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{vendor.id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Role</Label>
                <p className="text-sm">{vendor.role}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Created At</Label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  {formatDate(vendor.createdAt)}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  {formatDate(vendor.updatedAt)}
                </p>
              </div>
            </div>
            {vendor.lastLogin && (
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Login</Label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  {formatDate(vendor.lastLogin)}
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Vendor Form Component
function VendorForm({ vendor, onSave, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    isActive: true,
    emailVerified: false,
    phoneVerified: false,
    image: ""
  });

  // Update form data when vendor prop changes
  useEffect(() => {
    if (vendor) {
      setFormData({
        username: vendor.username || "",
        name: vendor.name || "",
        email: vendor.email || "",
        phone: vendor.phone || "",
        isActive: vendor.isActive ?? true,
        emailVerified: vendor.emailVerified ?? false,
        phoneVerified: vendor.phoneVerified ?? false,
        image: vendor.image || ""
      });
    } else {
      // Reset form for new vendor
      setFormData({
        username: "",
        name: "",
        email: "",
        phone: "",
        isActive: true,
        emailVerified: false,
        phoneVerified: false,
        image: ""
      });
    }
  }, [vendor]);

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
      id: vendor?.id || `uuid-${Date.now()}`,
      role: "vendor",
      lastLogin: vendor?.lastLogin || null,
      currentHotelId: vendor?.currentHotelId || null,
      totalProducts: vendor?.totalProducts || 0,
      activeProducts: vendor?.activeProducts || 0,
      totalRevenue: vendor?.totalRevenue || "0",
      totalOrders: vendor?.totalOrders || 0,
      averageRating: vendor?.averageRating || 0,
      createdAt: vendor?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {vendor ? "Edit Vendor" : "Add New Vendor"}
          </DialogTitle>
          <DialogDescription>
            {vendor ? "Update vendor information below." : "Create a new vendor account."}
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
              <Label htmlFor="name">Vendor Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter vendor name"
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
              {vendor ? "Update" : "Create"} Vendor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function VendorPage() {
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [viewingVendor, setViewingVendor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch vendors data on component mount
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      const result = await getVendors();
      if (result.success) {
        // Add actions to each vendor user
        const vendorsWithActions = result.data.map(vendorUser => ({
          ...vendorUser,
          actions: [
            { label: "View", icon: Eye, onClick: () => handleViewVendor(vendorUser) },
            { label: "Edit", icon: Edit, onClick: () => handleEditVendor(vendorUser) },
            { label: "Delete", icon: Trash2, onClick: () => handleDeleteVendor(vendorUser), destructive: true }
          ]
        }));
        setVendors(vendorsWithActions);
      } else {
        toast.error(result.error || "Failed to fetch vendors");
      }
    } catch (error) {
      toast.error("Failed to fetch vendors");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVendor = () => {
    setEditingVendor(null);
    setIsFormOpen(true);
  };

  const handleEditVendor = (vendor) => {
    setEditingVendor(vendor);
    setIsFormOpen(true);
  };

  const handleSaveVendor = async (vendorData) => {
    let result;

    if (editingVendor) {
      // Update existing vendor
      result = await updateVendor(editingVendor.id, vendorData);
    } else {
      // Add new vendor
      result = await createVendor(vendorData);
    }

    if (result.success) {
      await fetchVendors(); // Refresh the vendors list
      setIsFormOpen(false);
      setEditingVendor(null);
      toast.success(editingVendor ? "Vendor updated successfully" : "Vendor created successfully");
    } else {
      toast.error(result.error || "Failed to save vendor");
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingVendor(null);
  };

  const handleDeleteVendor = async (vendor) => {
    if (confirm(`Are you sure you want to delete vendor "${vendor.name}"?`)) {
      try {
        const result = await deleteVendor(vendor.id);
        if (result.success) {
          toast.success("Vendor deleted successfully");
          await fetchVendors(); // Refresh the vendors list
        } else {
          toast.error(result.error || "Failed to delete vendor");
        }
      } catch (error) {
        toast.error("Failed to delete vendor");
      }
    }
  };

  const handleViewVendor = (vendor) => {
    setViewingVendor(vendor);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingVendor(null);
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
      title: "Vendor Info",
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
      key: "products",
      title: "Products",
      render: (value, row) => (
        <div className="text-sm">
          <div className="font-medium">{row.activeProducts}/{row.totalProducts}</div>
          <div className="text-xs text-gray-500">active products</div>
        </div>
      )
    },
    {
      key: "performance",
      title: "Performance",
      render: (value, row) => <PerformanceBadge orders={row.totalOrders || 0} revenue={row.totalRevenue} rating={row.averageRating} />
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
            <Building className="w-6 h-6" />
            Vendor Management
          </h1>
          <p className="text-gray-500">Manage product vendors and their performance</p>
        </div>
        <Button onClick={handleAddVendor} disabled={isLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading vendors data...</span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={vendors}
          searchable={true}
          emptyMessage="No vendors found"
        />
      )}

      {/* Vendor Form Modal */}
      <VendorForm
        vendor={editingVendor}
        onSave={handleSaveVendor}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />

      {/* View Vendor Modal */}
      <ViewVendorModal
        vendor={viewingVendor}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />
    </div>
  );
}