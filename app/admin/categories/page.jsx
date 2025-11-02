"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Folder,
  X,
  Save,
  Image,
  Package,
  AlertCircle,
  Loader2,
  Calendar,
  BarChart3,
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
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./actions";
import { toast } from "sonner";

function ViewCategoryModal({ category, isOpen, onClose }) {
  if (!category) return null;

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
            <Folder className="w-5 h-5" />
            Category Details
          </DialogTitle>
          <DialogDescription>
            Complete information about {category.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Category Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Category ID</Label>
                <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{category.id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <div className="mt-1">
                  {category.isActive ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Category Name</Label>
              <p className="text-sm font-medium">{category.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Slug</Label>
              <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{category.slug}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Description</Label>
              <p className="text-sm whitespace-pre-wrap">{category.description || 'No description'}</p>
            </div>
          </div>

          
          {/* Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Package className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-blue-900">{category.productCount || 0}</p>
                <p className="text-xs text-blue-600">Products</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-purple-900">{category.sortOrder}</p>
                <p className="text-xs text-purple-600">Sort Priority</p>
              </div>
            </div>
          </div>

          {/* Category Image */}
          {category.image && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Category Image</h3>
              <div className="flex justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-32 h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x150?text=Error';
                  }}
                />
              </div>
            </div>
          )}

          {/* System Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">System Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Created At</Label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  {formatDate(category.createdAt)}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  {formatDate(category.updatedAt)}
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

function StatusBadge({ isActive }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
      isActive
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800"
    }`}>
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

function CategoryForm({ category, onSave, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    isActive: true,
    sortOrder: 0
  });
  const [slugError, setSlugError] = useState("");

  // Update form data when category prop changes
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        image: category.image || "",
        isActive: category.isActive ?? true,
        sortOrder: category.sortOrder || 0
      });
    } else {
      // Reset form for new category
      setFormData({
        name: "",
        description: "",
        image: "",
        isActive: true,
        sortOrder: 0
      });
    }
    setSlugError("");
  }, [category]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setSlugError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name
    if (!formData.name.trim()) {
      setSlugError("Category name is required");
      return;
    }

    // Generate slug from name
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    onSave({
      ...formData,
      slug: category?.slug || slug, // Keep existing slug for updates
      sortOrder: parseInt(formData.sortOrder) || 0
    });
  };

  
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {category ? "Update category information below." : "Create a new category for your products."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter category name"
              required
              className={slugError ? "border-red-500" : ""}
            />
            <p className="text-xs text-gray-500">Slug will be automatically generated from the category name</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Category description"
              rows={3}
            />
          </div>

                      <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              type="number"
              min="0"
              value={formData.sortOrder}
              onChange={(e) => handleInputChange("sortOrder", parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Category Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="Enter image URL (optional)"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange("isActive", checked)}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          {slugError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{slugError}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {category ? "Update" : "Create"} Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [viewingCategory, setViewingCategory] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchCategories();
      }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const result = await getCategories();
      if (result.success) {
        // Add actions to each category
        const categoriesWithActions = result.data.map(category => ({
          ...category,
          actions: [
            { label: "View", icon: Eye, onClick: () => handleViewCategory(category) },
            { label: "Edit", icon: Edit, onClick: () => handleEditCategory(category) },
            { label: "Delete", icon: Trash2, onClick: () => handleDeleteCategory(category), destructive: true }
          ]
        }));
        setCategories(categoriesWithActions);
      } else {
        toast.error(result.error || "Failed to fetch categories");
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleSaveCategory = async (categoryData) => {
    let result;

    if (editingCategory) {
      // Update existing category
      result = await updateCategory(editingCategory.id, categoryData);
    } else {
      // Add new category
      result = await createCategory(categoryData);
    }

    if (result.success) {
      await fetchCategories(); // Refresh the categories list
            setIsFormOpen(false);
      setEditingCategory(null);
      toast.success(editingCategory ? "Category updated successfully" : "Category created successfully");
    } else {
      toast.error(result.error || "Failed to save category");
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (category) => {
    if (confirm(`Are you sure you want to delete category "${category.name}"?`)) {
      try {
        const result = await deleteCategory(category.id);
        if (result.success) {
          toast.success("Category deleted successfully");
          await fetchCategories(); // Refresh the categories list
                  } else {
          toast.error(result.error || "Failed to delete category");
        }
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleViewCategory = (category) => {
    setViewingCategory(category);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingCategory(null);
  };

  const columns = [
    {
      key: "name",
      title: "Category",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.image ? (
            <img
              src={row.image}
              alt={row.name}
              className="w-10 h-10 rounded-lg object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center" style={{display: row.image ? 'none' : 'flex'}}>
            <Folder className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-gray-500 font-mono">{row.slug}</div>
                      </div>
        </div>
      )
    },
    {
      key: "productCount",
      title: "Products",
      render: (value) => (
        <div className="text-sm">
          <div className="font-medium">{value || 0}</div>
          <div className="text-xs text-gray-500">products</div>
        </div>
      )
    },
    {
      key: "sortOrder",
      title: "Order",
      render: (value) => (
        <div className="text-sm font-medium text-center">
          {value}
        </div>
      )
    },
    {
      key: "isActive",
      title: "Status",
      render: (value) => <StatusBadge isActive={value} />
    },
    {
      key: "createdAt",
      title: "Created",
      render: (value) => (
        <div className="text-sm">
          {value ? new Date(value).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
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
            <Folder className="w-6 h-6" />
            Category Management
          </h1>
          <p className="text-gray-500">Manage product categories and hierarchy</p>
        </div>
        <Button onClick={handleAddCategory} disabled={isLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading categories data...</span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={categories}
          searchable={true}
          emptyMessage="No categories found"
        />
      )}

      {/* Category Form Modal */}
      <CategoryForm
        category={editingCategory}
        onSave={handleSaveCategory}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
              />

      {/* View Category Modal */}
      <ViewCategoryModal
        category={viewingCategory}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />
    </div>
  );
}