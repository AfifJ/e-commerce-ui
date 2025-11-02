"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Loader2,
} from "lucide-react";
import { getUsers, createUser, updateUser, deleteUser, toggleUserStatus } from "./actions";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Building,
  Mail,
  Phone,
  User,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";

function VerificationBadge({ emailVerified, phoneVerified }) {
  // If both are not verified, show single dash
  if (!emailVerified && !phoneVerified) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        -
      </span>
    );
  }

  // Otherwise, show individual verification statuses
  const badges = [];

  if (emailVerified) {
    badges.push(
      <span key="email" className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-1">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        Email Verified
      </span>
    );
  }

  if (phoneVerified) {
    badges.push(
      <span key="phone" className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        Phone Verified
      </span>
    );
  }

  return (
    <div className="space-y-1">
      {badges}
    </div>
  );
}

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

function RoleBadge({ role }) {
  const roleConfig = {
    "admin": "bg-purple-100 text-purple-800",
    "vendor": "bg-blue-100 text-blue-800",
    "sales": "bg-orange-100 text-orange-800",
    "mitra": "bg-green-100 text-green-800",
    "customer": "bg-gray-100 text-gray-800"
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize ${roleConfig[role] || "bg-gray-100 text-gray-800"}`}>
      {role}
    </span>
  );
}

function ViewUserModal({ user, isOpen, onClose }) {
  if (!user) return null;

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800",
      vendor: "bg-blue-100 text-blue-800",
      sales: "bg-green-100 text-green-800",
      mitra: "bg-orange-100 text-orange-800",
      customer: "bg-gray-100 text-gray-800"
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            User Details
          </DialogTitle>
          <DialogDescription>
            Complete information about {user.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">User Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Username</Label>
                <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{user.username}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <div className="mt-1">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Full Name</Label>
              <p className="text-sm font-medium">{user.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Email</Label>
                <p className="text-sm flex items-center gap-1">
                  <Mail className="w-3 h-3 text-gray-400" />
                  {user.email}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Phone</Label>
                <p className="text-sm flex items-center gap-1">
                  <Phone className="w-3 h-3 text-gray-400" />
                  {user.phone}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Role</Label>
              <div className="mt-1">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  <Shield className="w-3 h-3" />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Verification Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Email Verification</Label>
                <div className="mt-1 flex items-center gap-2">
                  {user.emailVerified ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600">Not Verified</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Phone Verification</Label>
                <div className="mt-1 flex items-center gap-2">
                  {user.phoneVerified ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600">Not Verified</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Assignment (for mitra users) */}
          {user.role === 'mitra' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Hotel Assignment</h3>
              {user.hotel ? (
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-orange-600" />
                    <span className="font-medium text-orange-900">Assigned Hotel</span>
                  </div>
                  <p className="text-sm text-orange-800">{user.hotel.name}</p>
                  <p className="text-xs text-orange-600">Code: {user.hotel.code}</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 italic">No hotel assigned</p>
                </div>
              )}
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
                  {new Date(user.createdAt).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  {new Date(user.updatedAt).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            {user.lastLogin && (
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Login</Label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  {new Date(user.lastLogin).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
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

// User Form Component
function UserForm({ user, onSave, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    role: "customer",
    isActive: true,
    emailVerified: false,
    phoneVerified: false,
    image: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  // Update form data when user prop changes (for edit mode)
  useEffect(() => {
    console.log('UserForm - user prop changed:', user);
    if (user) {
      const formData = {
        username: user.username || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "customer",
        isActive: user.isActive ?? true,
        emailVerified: user.emailVerified ?? false,
        phoneVerified: user.phoneVerified ?? false,
        image: user.image || "",
        password: "", // Don't populate password for security
        confirmPassword: ""
      };
      console.log('UserForm - setting form data:', formData);
      setFormData(formData);
    } else {
      // Reset form for create mode
      const resetData = {
        username: "",
        name: "",
        email: "",
        phone: "",
        role: "customer",
        isActive: true,
        emailVerified: false,
        phoneVerified: false,
        image: "",
        password: "",
        confirmPassword: ""
      };
      console.log('UserForm - resetting form data:', resetData);
      setFormData(resetData);
    }
  }, [user]);

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
      // Validate password for new users
      if (!user) {
        if (!formData.password) {
          toast.error("Password is required for new users");
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          setIsLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          setIsLoading(false);
          return;
        }
      } else {
        // For existing users, validate password only if provided
        if (formData.password && formData.password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          setIsLoading(false);
          return;
        }
        if (formData.password && formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          setIsLoading(false);
          return;
        }
      }
      const userData = {
        ...formData,
        id: user?.id || null,
        lastLogin: user?.lastLogin || null,
        currentHotelId: user?.currentHotelId || null,
        createdAt: user?.createdAt || null
      };

      console.log('Submitting user data:', userData);
      const result = await onSave(userData);

      if (result.success) {
        toast.success(user ? "User updated successfully" : "User created successfully");
        setFormData({
          username: "",
          name: "",
          email: "",
          phone: "",
          role: "customer",
          isActive: true,
          emailVerified: false,
          phoneVerified: false,
          image: "",
          password: "",
          confirmPassword: ""
        });
      } else {
        toast.error(result.error || "Failed to save user");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {user ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogDescription>
            {user ? "Update user information below." : "Create a new user account."}
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

          {/* Password Fields - Only show for new users or when changing password */}
          {!user ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Enter password (min 6 characters)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm password"
                  required
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="password">New Password (leave empty to keep current)</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter new password (min 6 characters)"
              />

              {formData.password && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="mitra">Mitra</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
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
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {user ? "Update" : "Create"} User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await getUsers();
      if (result.success) {
        // Add actions to each user
        const usersWithActions = result.data.map(user => ({
          ...user,
          actions: [
            { label: "View", icon: Eye, onClick: () => handleViewUser(user) },
            { label: "Edit", icon: Edit, onClick: () => handleEditUser(user) },
            { label: "Delete", icon: Trash2, onClick: () => handleDeleteUser(user), destructive: true }
          ]
        }));
        console.log('Users with actions:', usersWithActions);
        setUsers(usersWithActions);
      } else {
        toast.error(result.error || "Failed to fetch users");
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user) => {
    console.log('Editing user:', user);
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleSaveUser = async (userData) => {
    let result;

    if (editingUser) {
      // Update existing user
      result = await updateUser(editingUser.id, userData);
    } else {
      // Add new user
      result = await createUser(userData);
    }

    if (result.success) {
      await fetchUsers(); // Refresh the users list with actions
      setIsFormOpen(false);
      setEditingUser(null);
      return result;
    }

    return result;
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = async (user) => {
    if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      try {
        const result = await deleteUser(user.id);
        if (result.success) {
          toast.success("User deleted successfully");
          await fetchUsers(); // Refresh the users list
        } else {
          toast.error(result.error || "Failed to delete user");
        }
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const handleViewUser = (user) => {
    setViewingUser(user);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingUser(null);
  };

  const handleToggleStatus = async (user) => {
    try {
      const result = await toggleUserStatus(user.id);
      if (result.success) {
        toast.success(`User ${result.data.isActive ? 'activated' : 'deactivated'} successfully`);
        await fetchUsers(); // Refresh the users list
      } else {
        toast.error(result.error || "Failed to update user status");
      }
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const columns = [
    {
      key: "image",
      title: "Avatar",
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
      key: "email",
      title: "Contact",
      render: (value, row) => (
        <div>
          <div className="text-sm">{value}</div>
          <div className="text-xs text-gray-500">{row.phone}</div>
        </div>
      )
    },
    {
      key: "role",
      title: "Role",
      render: (value) => <RoleBadge role={value} />
    },
    {
      key: "verification",
      title: "Verification",
      render: (value, row) => <VerificationBadge emailVerified={row.emailVerified} phoneVerified={row.phoneVerified} />
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
    },
    {
      key: "createdAt",
      title: "Member Since",
      render: (value) => (
        <div className="text-sm">
          {new Date(value).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
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
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500">Manage system users</p>
        </div>
        <Button onClick={handleAddUser} disabled={isLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading users...</span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          searchable={true}
          emptyMessage="No users found"
        />
      )}

      {/* User Form Modal */}
      <UserForm
        user={editingUser}
        onSave={handleSaveUser}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />

      {/* View User Modal */}
      <ViewUserModal
        user={viewingUser}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />
    </div>
  );
}