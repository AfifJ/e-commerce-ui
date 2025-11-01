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
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Tag,
  Package,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";

// Mock data
const mockCategories = [
  {
    id: "cat_001",
    name: "Elektronik",
    slug: "elektronik",
    description: "Produk elektronik dan gadget terbaru",
    status: "active",
    totalProducts: 156,
    activeProducts: 142,
    parentCategory: null,
    subcategories: ["Smartphone", "Laptop", "TV", "Audio"],
    image: "/images/categories/elektronik.jpg",
    featured: true,
    sortOrder: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (category) => console.log("View", category) },
      { label: "Edit Category", icon: Edit, onClick: (category) => console.log("Edit", category) },
      { label: "Delete", icon: Trash2, onClick: (category) => console.log("Delete", category), destructive: true }
    ]
  },
  {
    id: "cat_002",
    name: "Fashion",
    slug: "fashion",
    description: "Pakaian dan aksesoris fashion terkini",
    status: "active",
    totalProducts: 234,
    activeProducts: 220,
    parentCategory: null,
    subcategories: ["Pria", "Wanita", "Anak", "Aksesoris"],
    image: "/images/categories/fashion.jpg",
    featured: true,
    sortOrder: 2,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (category) => console.log("View", category) },
      { label: "Edit Category", icon: Edit, onClick: (category) => console.log("Edit", category) },
      { label: "Delete", icon: Trash2, onClick: (category) => console.log("Delete", category), destructive: true }
    ]
  },
  {
    id: "cat_003",
    name: "Smartphone",
    slug: "smartphone",
    description: "Berbagai jenis smartphone dan aksesorisnya",
    status: "active",
    totalProducts: 89,
    activeProducts: 85,
    parentCategory: "Elektronik",
    subcategories: ["Android", "iOS", "Aksesoris"],
    image: "/images/categories/smartphone.jpg",
    featured: false,
    sortOrder: 3,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-13T14:20:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (category) => console.log("View", category) },
      { label: "Edit Category", icon: Edit, onClick: (category) => console.log("Edit", category) },
      { label: "Delete", icon: Trash2, onClick: (category) => console.log("Delete", category), destructive: true }
    ]
  },
  {
    id: "cat_004",
    name: "Rumah Tangga",
    slug: "rumah-tangga",
    description: "Peralatan dan dekorasi rumah tangga",
    status: "inactive",
    totalProducts: 67,
    activeProducts: 0,
    parentCategory: null,
    subcategories: ["Dapur", "Kamar Mandi", "Dekorasi"],
    image: "/images/categories/rumah-tangga.jpg",
    featured: false,
    sortOrder: 4,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-12T11:15:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (category) => console.log("View", category) },
      { label: "Edit Category", icon: Edit, onClick: (category) => console.log("Edit", category) },
      { label: "Delete", icon: Trash2, onClick: (category) => console.log("Delete", category), destructive: true }
    ]
  }
];

const categoryStats = {
  total: 4,
  active: 3,
  inactive: 1,
  featured: 2,
  totalProducts: 546,
  activeProducts: 447,
  parentCategories: 2,
  subCategories: 2
};

function StatusBadge({ status }) {
  const statusConfig = {
    active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    inactive: { color: "bg-gray-100 text-gray-800", icon: XCircle }
  };

  const config = statusConfig[status] || statusConfig.active;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function FeaturedBadge({ featured }) {
  return featured ? (
    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
      <TrendingUp className="w-3 h-3 mr-1" />
      Featured
    </Badge>
  ) : null;
}

export default function CategoriesPage() {
  const [categories] = useState(mockCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    {
      key: "name",
      title: "Category Information",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Tag className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="font-medium">{value}</div>
                <FeaturedBadge featured={row.featured} />
              </div>
              <div className="text-sm text-gray-500">/{row.slug}</div>
              <div className="text-xs text-gray-400 line-clamp-2">{row.description}</div>
            </div>
          </div>
          {row.parentCategory && (
            <div className="text-xs text-blue-600">
              Parent: {row.parentCategory}
            </div>
          )}
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
      key: "products",
      title: "Products",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Package className="w-3 h-3 text-gray-400" />
            <span className="font-medium">{row.activeProducts}</span>
            <span className="text-gray-500">/ {row.totalProducts}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${(row.activeProducts / row.totalProducts) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">
            {row.totalProducts > 0 ? ((row.activeProducts / row.totalProducts) * 100).toFixed(1) : 0}% active
          </div>
        </div>
      )
    },
    {
      key: "subcategories",
      title: "Subcategories",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">{row.subcategories.length} subcategories</div>
          <div className="flex flex-wrap gap-1">
            {row.subcategories.slice(0, 3).map((sub, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {sub}
              </Badge>
            ))}
            {row.subcategories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{row.subcategories.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )
    },
    {
      key: "sortOrder",
      title: "Sort Order",
      sortable: true,
      render: (value) => (
        <div className="text-sm font-medium">#{value}</div>
      )
    },
    {
      key: "image",
      title: "Image",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {row.image ? (
            <div className="w-8 h-8 rounded border overflow-hidden">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded border border-dashed border-gray-300 flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
      )
    },
    {
      key: "updatedAt",
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
      label: "Status",
      type: "select",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" }
      ]
    },
    {
      key: "featured",
      label: "Featured",
      type: "select",
      options: [
        { value: "all", label: "All Categories" },
        { value: "featured", label: "Featured Only" },
        { value: "regular", label: "Regular Only" }
      ]
    },
    {
      key: "parent",
      label: "Category Type",
      type: "select",
      options: [
        { value: "all", label: "All Types" },
        { value: "parent", label: "Parent Categories" },
        { value: "sub", label: "Subcategories" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-500">Manage product categories and their hierarchy</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new product category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input id="categoryName" placeholder="Enter category name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" placeholder="category-slug" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter category description" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentCategory">Parent Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="None (Parent)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (Parent Category)</SelectItem>
                      <SelectItem value="elektronik">Elektronik</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="rumah-tangga">Rumah Tangga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input id="sortOrder" type="number" placeholder="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured">Featured</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Category Image URL</Label>
                <Input id="image" placeholder="/images/categories/category.jpg" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.total}</div>
            <p className="text-xs text-muted-foreground">
              All categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{categoryStats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{categoryStats.featured}</div>
            <p className="text-xs text-muted-foreground">
              Featured categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{categoryStats.activeProducts}</div>
            <p className="text-xs text-muted-foreground">
              Out of {categoryStats.totalProducts} total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={categories}
        searchKey="name"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedCategories}
        onSelectedRowsChange={setSelectedCategories}
        pagination={{
          total: categories.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        }}
        emptyMessage="No categories found"
        actions={[
          {
            label: "Activate",
            icon: CheckCircle,
            onClick: (ids) => console.log("Activate", ids),
            disabled: selectedCategories.length === 0
          },
          {
            label: "Deactivate",
            icon: XCircle,
            onClick: (ids) => console.log("Deactivate", ids),
            disabled: selectedCategories.length === 0
          },
          {
            label: "Delete",
            icon: Trash2,
            onClick: (ids) => console.log("Delete", ids),
            disabled: selectedCategories.length === 0,
            destructive: true
          }
        ]}
      />
    </div>
  );
}