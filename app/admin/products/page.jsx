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
  Star,
  Image,
  TrendingUp,
  AlertTriangle,
  Loader2,
  Calendar,
  Mail,
  User,
  Building,
  AlertCircle,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  toggleProductFeatured,
  getCategories,
  getVendors
} from "./actions";
import { getVendorsByRole } from "../vendors/actions";
import { toast } from "sonner";

function ViewProductModal({ product, isOpen, onClose }) {
  if (!product) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(parseFloat(amount) || 0);
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Product Details
          </DialogTitle>
          <DialogDescription>
            Complete information about {product.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Product Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Product ID</Label>
                <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{product.id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">SKU</Label>
                <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{product.sku}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Product Name</Label>
              <p className="text-sm font-medium">{product.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Slug</Label>
              <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{product.slug}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Short Description</Label>
              <p className="text-sm">{product.shortDescription || 'No short description'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Full Description</Label>
              <p className="text-sm whitespace-pre-wrap">{product.description || 'No description'}</p>
            </div>
          </div>

          {/* Pricing & Financial */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Pricing & Financial</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Label className="text-xs text-blue-600">Buy Price</Label>
                <p className="text-lg font-bold text-blue-900">{formatCurrency(product.buyPrice)}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Label className="text-xs text-green-600">Sell Price</Label>
                <p className="text-lg font-bold text-green-900">{formatCurrency(product.sellPrice)}</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Label className="text-xs text-yellow-600">Margin</Label>
                <p className="text-lg font-bold text-yellow-900">{formatCurrency(product.margin)}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Weight</Label>
                <p className="text-sm font-medium">{product.weight ? `${product.weight} kg` : 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Category & Vendor */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Category & Vendor</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Category</Label>
                <p className="text-sm font-medium">{product.categoryName || 'Uncategorized'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Vendor</Label>
                <div className="text-sm">
                  <p className="font-medium">{product.vendorName || 'No vendor'}</p>
                  {product.vendorUsername && (
                    <p className="text-xs text-gray-500">@{product.vendorUsername}</p>
                  )}
                  {product.vendorEmail && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {product.vendorEmail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Inventory & Reviews */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Inventory & Reviews</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <Package className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-indigo-900">{product.currentStock || 0}</p>
                <p className="text-xs text-indigo-600">Current Stock</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-orange-900">{product.totalSold || 0}</p>
                <p className="text-xs text-orange-600">Total Sold</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <Star className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-purple-900">{(product.averageRating || 0).toFixed(1)}</p>
                <p className="text-xs text-purple-600">Avg Rating</p>
              </div>
              <div className="text-center p-3 bg-teal-50 rounded-lg">
                <User className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-teal-900">{product.totalReviews || 0}</p>
                <p className="text-xs text-teal-600">Total Reviews</p>
              </div>
            </div>
            {(product.reservedStock > 0 || product.minStock > 0) && (
              <div className="grid grid-cols-2 gap-4">
                {product.reservedStock > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Reserved Stock</Label>
                    <p className="text-sm font-medium">{product.reservedStock}</p>
                  </div>
                )}
                {product.minStock > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Minimum Stock</Label>
                    <p className="text-sm font-medium">{product.minStock}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Images */}
          {product.images && product.images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=Error';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Active Status</Label>
                <div className="flex items-center gap-2">
                  {product.isActive ? (
                    <>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-green-600">Active</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="text-sm text-red-600">Inactive</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Featured Status</Label>
                <div className="flex items-center gap-2">
                  {product.isFeatured ? (
                    <>
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span className="text-sm text-yellow-600">Featured</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                      <span className="text-sm text-gray-600">Not Featured</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">SEO Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Meta Title</Label>
                <p className="text-sm">{product.metaTitle || 'Not specified'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Meta Description</Label>
                <p className="text-sm">{product.metaDescription || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">System Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Created At</Label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  {formatDate(product.createdAt)}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  {formatDate(product.updatedAt)}
                </p>
              </div>
            </div>
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

function StatusBadge({ isActive, isFeatured }) {
  const statusConfig = {
    true: "bg-green-100 text-green-800",
    false: "bg-gray-100 text-gray-800"
  };

  const featuredConfig = {
    true: "bg-yellow-100 text-yellow-800",
    false: "bg-gray-100 text-gray-800"
  };

  return (
    <div className="space-y-1">
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[isActive] || "bg-gray-100 text-gray-800"}`}>
        {isActive ? "Active" : "Inactive"}
      </span>
      {isFeatured && (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${featuredConfig[isFeatured] || "bg-gray-100 text-gray-800"}`}>
          ⭐ Featured
        </span>
      )}
    </div>
  );
}

function RatingBadge({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 text-yellow-400 fill-current" />
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      <span className="text-xs text-gray-500">({reviews})</span>
    </div>
  );
}

function StockStatus({ current, borrowed }) {
  const borrowedAmount = borrowed || 0;
  const available = current - borrowedAmount;
  const getStockColor = () => {
    if (available === 0) return "text-red-600";
    if (available <= 5) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="text-sm">
      <div className={`font-medium ${getStockColor()}`}>
        {available} available
      </div>
      <div className="text-xs text-gray-500">
        {current} total ({borrowedAmount} borrowed)
      </div>
    </div>
  );
}

function ProfitMarginBadge({ margin, sellPrice }) {
  // Handle null/undefined values
  const safeMargin = parseFloat(margin) || 0;
  const safeSellPrice = parseFloat(sellPrice) || 1; // Prevent division by zero

  const marginPercent = (safeMargin / safeSellPrice) * 100;

  const getColor = () => {
    if (marginPercent >= 20) return "text-green-600";
    if (marginPercent >= 10) return "text-blue-600";
    return "text-yellow-600";
  };

  // Format margin display
  const formatMargin = (amount) => {
    if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `Rp ${(amount / 1000).toFixed(1)}K`;
    } else {
      return `Rp ${amount.toLocaleString('id-ID')}`;
    }
  };

  return (
    <div className="text-sm">
      <div className={`font-medium ${getColor()}`}>
        {formatMargin(safeMargin)}
      </div>
      <div className="text-xs text-gray-500">
        {marginPercent.toFixed(1)}% margin
      </div>
    </div>
  );
}

// Product Form Component
function ProductForm({ product, onSave, onCancel, isOpen, categories, vendors }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    categoryId: "",
    vendorId: "",
    buyPrice: "",
    sellPrice: "",
    weight: "",
    currentStock: 0,
    minStock: 0,
    images: [],
    isActive: true,
    isFeatured: false
  });
  const [priceError, setPriceError] = useState("");

  // Update form data when product prop changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        shortDescription: product.shortDescription || "",
        categoryId: product.categoryId || "",
        vendorId: product.vendorId || "",
        buyPrice: product.buyPrice || "",
        sellPrice: product.sellPrice || "",
        weight: product.weight || "",
        currentStock: product.currentStock || 0,
        minStock: product.minStock || 0,
        images: product.images || [],
        isActive: product.isActive ?? true,
        isFeatured: product.isFeatured ?? false
      });
    } else {
      // Reset form for new product
      setFormData({
        name: "",
        description: "",
        shortDescription: "",
        categoryId: "",
        vendorId: "",
        buyPrice: "",
        sellPrice: "",
        weight: "",
        currentStock: 0,
        minStock: 0,
        images: [],
        isActive: true,
        isFeatured: false
      });
    }
  }, [product]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear price error when prices change
    if (field === 'buyPrice' || field === 'sellPrice') {
      setPriceError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate prices
    const buyPrice = parseFloat(formData.buyPrice);
    const sellPrice = parseFloat(formData.sellPrice);

    if (buyPrice >= sellPrice) {
      setPriceError("Harga jual harus lebih tinggi dari harga beli");
      return;
    }

    // Generate slug from name
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Generate SKU (PRD-XXX format)
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    const sku = `PRD-${randomStr}`;

    // Generate meta title and description
    const metaTitle = formData.name.length > 60
      ? formData.name.substring(0, 57) + "..."
      : formData.name;

    const metaDescription = formData.shortDescription || formData.description || '';
    const finalMetaDescription = metaDescription.length > 160
      ? metaDescription.substring(0, 157) + "..."
      : metaDescription;

    onSave({
      ...formData,
      slug: product?.slug || slug, // Keep existing slug for updates
      sku: product?.sku || sku, // Keep existing SKU for updates
      metaTitle: product?.metaTitle || metaTitle,
      metaDescription: product?.metaDescription || finalMetaDescription,
      buyPrice: buyPrice,
      sellPrice: sellPrice,
      weight: parseFloat(formData.weight) || null,
      currentStock: parseInt(formData.currentStock),
      minStock: parseInt(formData.minStock)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {product ? "Update product information below." : "Create a new product for your catalog."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter product name"
              required
            />
            <p className="text-xs text-gray-500">Slug will be automatically generated from the product name</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => handleInputChange("shortDescription", e.target.value)}
              placeholder="Brief product description"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Detailed product description"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <Select value={formData.categoryId} onValueChange={(value) => handleInputChange("categoryId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendorId">Vendor</Label>
              <Select value={formData.vendorId} onValueChange={(value) => handleInputChange("vendorId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buyPrice">Buy Price</Label>
              <Input
                id="buyPrice"
                type="number"
                min="0"
                value={formData.buyPrice}
                onChange={(e) => handleInputChange("buyPrice", parseInt(e.target.value) || 0)}
                placeholder="0"
                required
                className={priceError ? "border-red-500" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sellPrice">Sell Price</Label>
              <Input
                id="sellPrice"
                type="number"
                min="0"
                value={formData.sellPrice}
                onChange={(e) => handleInputChange("sellPrice", parseInt(e.target.value) || 0)}
                placeholder="0"
                required
                className={priceError ? "border-red-500" : ""}
              />
            </div>
          </div>

          {priceError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{priceError}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", parseFloat(e.target.value) || 0)}
                placeholder="0.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentStock">Current Stock</Label>
              <Input
                id="currentStock"
                type="number"
                min="0"
                value={formData.currentStock}
                onChange={(e) => handleInputChange("currentStock", parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">SKU will be automatically generated (PRD-XXXXXX format)</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minStock">Minimum Stock</Label>
              <Input
                id="minStock"
                type="number"
                min="0"
                value={formData.minStock}
                onChange={(e) => handleInputChange("minStock", parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500">Meta title and description will be automatically generated from product name and description</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
              />
              <Label htmlFor="isFeatured">Featured</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {product ? "Update" : "Create"} Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchVendors();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await getProducts();
      if (result.success) {
        // Add actions to each product
        const productsWithActions = result.data.map(product => ({
          ...product,
          actions: [
            { label: "View", icon: Eye, onClick: () => handleViewProduct(product) },
            { label: "Edit", icon: Edit, onClick: () => handleEditProduct(product) },
            { label: "Delete", icon: Trash2, onClick: () => handleDeleteProduct(product), destructive: true }
          ]
        }));
        setProducts(productsWithActions);
      } else {
        toast.error(result.error || "Failed to fetch products");
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await getCategories();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchVendors = async () => {
    try {
      const result = await getVendorsByRole();
      if (result.success) {
        setVendors(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = async (productData) => {
    let result;

    if (editingProduct) {
      // Update existing product
      result = await updateProduct(editingProduct.id, productData);
    } else {
      // Add new product
      result = await createProduct(productData);
    }

    if (result.success) {
      await fetchProducts(); // Refresh the products list
      setIsFormOpen(false);
      setEditingProduct(null);
      toast.success(editingProduct ? "Product updated successfully" : "Product created successfully");
    } else {
      toast.error(result.error || "Failed to save product");
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (product) => {
    if (confirm(`Are you sure you want to delete product "${product.name}"?`)) {
      try {
        const result = await deleteProduct(product.id);
        if (result.success) {
          toast.success("Product deleted successfully");
          await fetchProducts(); // Refresh the products list
        } else {
          toast.error(result.error || "Failed to delete product");
        }
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleViewProduct = (product) => {
    setViewingProduct(product);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingProduct(null);
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
      key: "images",
      title: "Product",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          {value && value.length > 0 ? (
            <img
              src={value[0]}
              alt={row.name}
              className="w-12 h-12 rounded-lg object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center" style={{display: value && value.length > 0 ? 'none' : 'flex'}}>
            <Package className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-gray-500">SKU: {row.sku}</div>
            <div className="text-xs text-gray-400">{row.categoryName || 'Uncategorized'}</div>
          </div>
        </div>
      )
    },
    {
      key: "vendorName",
      title: "Vendor",
      render: (value) => <div className="text-sm">{value || 'No vendor'}</div>
    },
    {
      key: "sellPrice",
      title: "Price",
      render: (value, row) => (
        <div>
          <div className="font-medium">{formatCurrency(value)}</div>
          <div className="text-xs text-gray-500">Buy: {formatCurrency(row.buyPrice)}</div>
        </div>
      )
    },
    {
      key: "margin",
      title: "Margin",
      render: (value, row) => <ProfitMarginBadge margin={row.margin} sellPrice={row.sellPrice} />
    },
    {
      key: "averageRating",
      title: "Rating",
      render: (value, row) => <RatingBadge rating={value} reviews={row.totalReviews} />
    },
    {
      key: "currentStock",
      title: "Stock",
      render: (value, row) => <StockStatus current={value} borrowed={row.reservedStock || 0} />
    },
    {
      key: "totalSold",
      title: "Sold",
      render: (value) => (
        <div className="text-sm font-medium text-blue-600">
          {value || 0} units
        </div>
      )
    },
    {
      key: "status",
      title: "Status",
      render: (value, row) => <StatusBadge isActive={row.isActive} isFeatured={row.isFeatured} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-6 h-6" />
            Product Management
          </h1>
          <p className="text-gray-500">Manage product catalog and inventory</p>
        </div>
        <Button onClick={handleAddProduct} disabled={isLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading products data...</span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={products}
          searchable={true}
          emptyMessage="No products found"
        />
      )}

      {/* Product Form Modal */}
      <ProductForm
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
        categories={categories}
        vendors={vendors}
      />

      {/* View Product Modal */}
      <ViewProductModal
        product={viewingProduct}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />
    </div>
  );
}