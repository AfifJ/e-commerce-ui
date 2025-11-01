"use client";

import { useState } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Upload,
  Star,
  ShoppingCart,
  DollarSign,
  Archive,
  MoreHorizontal
} from "lucide-react";

// Mock data
const mockProducts = [
  {
    id: "prod_001",
    name: "Samsung Galaxy A15",
    slug: "samsung-galaxy-a15",
    sku: "SGA15-BLK-128",
    category: "Smartphone",
    vendor: "PT. Elektronik Jaya",
    buyPrice: 2500000,
    sellPrice: 2999000,
    margin: 499000,
    currentStock: 50,
    reservedStock: 5,
    minStock: 10,
    status: "active",
    isFeatured: true,
    sales: 45,
    rating: 4.5,
    images: ["https://picsum.photos/seed/samsung-a15/600/600.jpg"],
    actions: [
      { label: "View Details", icon: Eye, onClick: (product) => console.log("View", product) },
      { label: "Edit Product", icon: Edit, onClick: (product) => console.log("Edit", product) },
      { label: "Delete", icon: Trash2, onClick: (product) => console.log("Delete", product), destructive: true }
    ]
  },
  {
    id: "prod_002",
    name: "Xiaomi Redmi Note 13",
    slug: "xiaomi-redmi-note-13",
    sku: "XRN13-WHT-256",
    category: "Smartphone",
    vendor: "PT. Elektronik Jaya",
    buyPrice: 2800000,
    sellPrice: 3299000,
    margin: 499000,
    currentStock: 30,
    reservedStock: 3,
    minStock: 5,
    status: "active",
    isFeatured: true,
    sales: 32,
    rating: 4.3,
    images: ["https://picsum.photos/seed/redmi-note13/600/600.jpg"],
    actions: [
      { label: "View Details", icon: Eye, onClick: (product) => console.log("View", product) },
      { label: "Edit Product", icon: Edit, onClick: (product) => console.log("Edit", product) },
      { label: "Delete", icon: Trash2, onClick: (product) => console.log("Delete", product), destructive: true }
    ]
  },
  {
    id: "prod_003",
    name: "Lenovo IdeaPad Slim 3",
    slug: "lenovo-ideapad-slim-3",
    sku: "LIS3-I5-8-512",
    category: "Laptop",
    vendor: "PT. Elektronik Jaya",
    buyPrice: 7500000,
    sellPrice: 8999000,
    margin: 1499000,
    currentStock: 15,
    reservedStock: 2,
    minStock: 3,
    status: "active",
    isFeatured: false,
    sales: 12,
    rating: 4.7,
    images: ["https://picsum.photos/seed/lenovo-ideapad/600/600.jpg"],
    actions: [
      { label: "View Details", icon: Eye, onClick: (product) => console.log("View", product) },
      { label: "Edit Product", icon: Edit, onClick: (product) => console.log("Edit", product) },
      { label: "Delete", icon: Trash2, onClick: (product) => console.log("Delete", product), destructive: true }
    ]
  },
  {
    id: "prod_004",
    name: "Kemeja Formal Pria - Navy",
    slug: "kemeja-formal-pria-navy",
    sku: "KFP-NAV-L",
    category: "Fashion Pria",
    vendor: "CV. Fashion Trend",
    buyPrice: 150000,
    sellPrice: 199000,
    margin: 49000,
    currentStock: 100,
    reservedStock: 10,
    minStock: 20,
    status: "active",
    isFeatured: true,
    sales: 38,
    rating: 4.2,
    images: ["https://picsum.photos/seed/kemeja-navy/600/600.jpg"],
    actions: [
      { label: "View Details", icon: Eye, onClick: (product) => console.log("View", product) },
      { label: "Edit Product", icon: Edit, onClick: (product) => console.log("Edit", product) },
      { label: "Delete", icon: Trash2, onClick: (product) => console.log("Delete", product), destructive: true }
    ]
  },
  {
    id: "prod_005",
    name: "Kemeja Casual Pria - White",
    slug: "kemeja-casual-pria-white",
    sku: "KCP-WHT-M",
    category: "Fashion Pria",
    vendor: "CV. Fashion Trend",
    buyPrice: 120000,
    sellPrice: 159000,
    margin: 39000,
    currentStock: 80,
    reservedStock: 8,
    minStock: 15,
    status: "active",
    isFeatured: false,
    sales: 25,
    rating: 4.0,
    images: ["https://picsum.photos/seed/kemeja-white/600/600.jpg"],
    actions: [
      { label: "View Details", icon: Eye, onClick: (product) => console.log("View", product) },
      { label: "Edit Product", icon: Edit, onClick: (product) => console.log("Edit", product) },
      { label: "Delete", icon: Trash2, onClick: (product) => console.log("Delete", product), destructive: true }
    ]
  },
  {
    id: "prod_006",
    name: "Dress Wanita - Floral",
    slug: "dress-wanita-floral",
    sku: "DWF-FLR-M",
    category: "Fashion Wanita",
    vendor: "CV. Fashion Trend",
    buyPrice: 180000,
    sellPrice: 249000,
    margin: 69000,
    currentStock: 60,
    reservedStock: 6,
    minStock: 10,
    status: "active",
    isFeatured: true,
    sales: 28,
    rating: 4.6,
    images: ["https://picsum.photos/seed/dress-floral/600/600.jpg"],
    actions: [
      { label: "View Details", icon: Eye, onClick: (product) => console.log("View", product) },
      { label: "Edit Product", icon: Edit, onClick: (product) => console.log("Edit", product) },
      { label: "Delete", icon: Trash2, onClick: (product) => console.log("Delete", product), destructive: true }
    ]
  },
  {
    id: "prod_007",
    name: "Vitamin C 1000mg",
    slug: "vitamin-c-1000mg",
    sku: "VC1000-60",
    category: "Kesehatan",
    vendor: "PT. Elektronik Jaya",
    buyPrice: 50000,
    sellPrice: 75000,
    margin: 25000,
    currentStock: 200,
    reservedStock: 20,
    minStock: 50,
    status: "active",
    isFeatured: false,
    sales: 89,
    rating: 4.4,
    images: ["https://picsum.photos/seed/vitamin-c/600/600.jpg"],
    actions: [
      { label: "View Details", icon: Eye, onClick: (product) => console.log("View", product) },
      { label: "Edit Product", icon: Edit, onClick: (product) => console.log("Edit", product) },
      { label: "Delete", icon: Trash2, onClick: (product) => console.log("Delete", product), destructive: true }
    ]
  },
  {
    id: "prod_008",
    name: "Madu Murni 500ml",
    slug: "madu-murni-500ml",
    sku: "MM-500ML",
    category: "Makanan & Minuman",
    vendor: "CV. Fashion Trend",
    buyPrice: 80000,
    sellPrice: 120000,
    margin: 40000,
    currentStock: 120,
    reservedStock: 12,
    minStock: 25,
    status: "active",
    isFeatured: true,
    sales: 45,
    rating: 4.8,
    images: ["https://picsum.photos/seed/madu-murni/600/600.jpg"],
    actions: [
      { label: "View Details", icon: Eye, onClick: (product) => console.log("View", product) },
      { label: "Edit Product", icon: Edit, onClick: (product) => console.log("Edit", product) },
      { label: "Delete", icon: Trash2, onClick: (product) => console.log("Delete", product), destructive: true }
    ]
  }
];

const productStats = {
  total: 8,
  active: 8,
  lowStock: 2,
  featured: 5,
  totalValue: 15800000,
  totalSales: 314,
  averageMargin: 35
};

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

function StockStatus({ current, min, reserved }) {
  const available = current - reserved;
  const isLowStock = available <= min;
  const isCritical = available <= min / 2;

  if (isCritical) {
    return (
      <Badge className="bg-red-100 text-red-800">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Critical: {available}
      </Badge>
    );
  }

  if (isLowStock) {
    return (
      <Badge className="bg-yellow-100 text-yellow-800">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Low: {available}
      </Badge>
    );
  }

  return (
    <Badge className="bg-green-100 text-green-800">
      {available} available
    </Badge>
  );
}

function RatingDisplay({ rating, sales }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm font-medium ml-1">{rating}</span>
      </div>
      <span className="text-sm text-gray-500">({sales} sold)</span>
    </div>
  );
}

export default function ProductsPage() {
  const [products] = useState(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      key: "name",
      title: "Product",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            {row.images?.[0] ? (
              <img src={row.images[0]} alt={value} className="w-full h-full object-cover" />
            ) : (
              <Package className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{value}</div>
            <div className="text-sm text-gray-500">{row.sku}</div>
            <div className="flex items-center gap-2 mt-1">
              {row.isFeatured && (
                <Badge className="bg-purple-100 text-purple-800">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              <Badge variant="outline">{row.category}</Badge>
            </div>
          </div>
        </div>
      )
    },
    {
      key: "vendor",
      title: "Vendor",
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          <div className="font-medium">{value}</div>
        </div>
      )
    },
    {
      key: "sellPrice",
      title: "Pricing",
      sortable: true,
      render: (value, row) => (
        <div className="text-sm">
          <div className="font-medium">{formatCurrency(value)}</div>
          <div className="text-gray-500">Buy: {formatCurrency(row.buyPrice)}</div>
          <div className="text-green-600">Margin: {formatCurrency(row.margin)}</div>
        </div>
      )
    },
    {
      key: "currentStock",
      title: "Stock",
      sortable: true,
      render: (value, row) => (
        <div>
          <StockStatus current={value} min={row.minStock} reserved={row.reservedStock} />
          <div className="text-xs text-gray-500 mt-1">
            Reserved: {row.reservedStock}
          </div>
        </div>
      )
    },
    {
      key: "rating",
      title: "Rating & Sales",
      sortable: true,
      render: (value, row) => (
        <RatingDisplay rating={value} sales={row.sales} />
      )
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (value) => (
        <Badge className={value === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    }
  ];

  const filterOptions = [
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [
        { value: "all", label: "All Categories" },
        { value: "Smartphone", label: "Smartphone" },
        { value: "Laptop", label: "Laptop" },
        { value: "Fashion Pria", label: "Fashion Pria" },
        { value: "Fashion Wanita", label: "Fashion Wanita" },
        { value: "Kesehatan", label: "Kesehatan" },
        { value: "Makanan & Minuman", label: "Makanan & Minuman" }
      ]
    },
    {
      key: "vendor",
      label: "Vendor",
      type: "select",
      options: [
        { value: "all", label: "All Vendors" },
        { value: "PT. Elektronik Jaya", label: "PT. Elektronik Jaya" },
        { value: "CV. Fashion Trend", label: "CV. Fashion Trend" }
      ]
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" }
      ]
    },
    {
      key: "stockStatus",
      label: "Stock Status",
      type: "select",
      options: [
        { value: "all", label: "All Stock" },
        { value: "low", label: "Low Stock" },
        { value: "critical", label: "Critical" },
        { value: "sufficient", label: "Sufficient" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-500">Manage your product catalog and inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Products
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Create a new product listing. Fill in the required information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" />
                  </div>
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="Enter SKU" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smartphone">Smartphone</SelectItem>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="fashion-pria">Fashion Pria</SelectItem>
                        <SelectItem value="fashion-wanita">Fashion Wanita</SelectItem>
                        <SelectItem value="kesehatan">Kesehatan</SelectItem>
                        <SelectItem value="makanan-minuman">Makanan & Minuman</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vendor">Vendor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-elektronik">PT. Elektronik Jaya</SelectItem>
                        <SelectItem value="cv-fashion">CV. Fashion Trend</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="buyPrice">Buy Price</Label>
                    <Input id="buyPrice" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="sellPrice">Sell Price</Label>
                    <Input id="sellPrice" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="commission">Commission %</Label>
                    <Input id="commission" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentStock">Current Stock</Label>
                    <Input id="currentStock" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input id="minStock" type="number" placeholder="0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter product description" rows={3} />
                </div>
                <div>
                  <Label htmlFor="images">Product Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload images</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productStats.total}</div>
            <p className="text-xs text-muted-foreground">
              All products
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{productStats.lowStock}</div>
            <p className="text-xs text-muted-foreground">
              Need restocking
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{productStats.featured}</div>
            <p className="text-xs text-muted-foreground">
              Featured products
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{productStats.totalSales}</div>
            <p className="text-xs text-muted-foreground">
              Items sold
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={products}
        searchKey="name"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedProducts}
        onSelectedRowsChange={setSelectedProducts}
        pagination={{
          total: products.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        emptyMessage="No products found"
        actions={[
          {
            label: "Update Stock",
            icon: Archive,
            onClick: (ids) => console.log("Update Stock", ids),
            disabled: selectedProducts.length === 0
          },
          {
            label: "Set Featured",
            icon: Star,
            onClick: (ids) => console.log("Set Featured", ids),
            disabled: selectedProducts.length === 0
          },
          {
            label: "Delete",
            icon: Trash2,
            onClick: (ids) => console.log("Delete", ids),
            disabled: selectedProducts.length === 0,
            destructive: true
          }
        ]}
      />
    </div>
  );
}