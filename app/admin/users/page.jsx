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
  UserCog,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

// Mock data
const mockUsers = [
  {
    id: "user_001_admin",
    name: "Super Admin",
    email: "admin@bahana-umkm.com",
    phone: "08123456789",
    role: "Super Admin",
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (user) => console.log("View", user) },
      { label: "Edit User", icon: Edit, onClick: (user) => console.log("Edit", user) },
      { label: "Delete", icon: Trash2, onClick: (user) => console.log("Delete", user), destructive: true }
    ]
  },
  {
    id: "user_002_admin_gudang",
    name: "Admin Gudang",
    email: "gudang@bahana-umkm.com",
    phone: "08123456780",
    role: "Admin",
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    lastLogin: "2024-01-15T09:15:00Z",
    createdAt: "2024-01-02T00:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (user) => console.log("View", user) },
      { label: "Edit User", icon: Edit, onClick: (user) => console.log("Edit", user) },
      { label: "Delete", icon: Trash2, onClick: (user) => console.log("Delete", user), destructive: true }
    ]
  },
  {
    id: "user_003_vendor1",
    name: "PT. Elektronik Jaya",
    email: "vendor1@supplier.com",
    phone: "08123456781",
    role: "Vendor",
    status: "active",
    emailVerified: true,
    phoneVerified: false,
    lastLogin: "2024-01-14T14:20:00Z",
    createdAt: "2024-01-03T00:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (user) => console.log("View", user) },
      { label: "Edit User", icon: Edit, onClick: (user) => console.log("Edit", user) },
      { label: "Delete", icon: Trash2, onClick: (user) => console.log("Delete", user), destructive: true }
    ]
  },
  {
    id: "user_004_vendor2",
    name: "CV. Fashion Trend",
    email: "vendor2@supplier.com",
    phone: "08123456782",
    role: "Vendor",
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    lastLogin: "2024-01-14T16:45:00Z",
    createdAt: "2024-01-04T00:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (user) => console.log("View", user) },
      { label: "Edit User", icon: Edit, onClick: (user) => console.log("Edit", user) },
      { label: "Delete", icon: Trash2, onClick: (user) => console.log("Delete", user), destructive: true }
    ]
  },
  {
    id: "user_005_sales1",
    name: "John Doe",
    email: "john.sales@bahana-umkm.com",
    phone: "08123456783",
    role: "Sales",
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    lastLogin: "2024-01-15T08:00:00Z",
    createdAt: "2024-01-05T00:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (user) => console.log("View", user) },
      { label: "Edit User", icon: Edit, onClick: (user) => console.log("Edit", user) },
      { label: "Delete", icon: Trash2, onClick: (user) => console.log("Delete", user), destructive: true }
    ]
  },
  {
    id: "user_006_sales2",
    name: "Jane Smith",
    email: "jane.sales@bahana-umkm.com",
    phone: "08123456784",
    role: "Sales",
    status: "inactive",
    emailVerified: true,
    phoneVerified: false,
    lastLogin: "2024-01-10T15:30:00Z",
    createdAt: "2024-01-06T00:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (user) => console.log("View", user) },
      { label: "Edit User", icon: Edit, onClick: (user) => console.log("Edit", user) },
      { label: "Delete", icon: Trash2, onClick: (user) => console.log("Delete", user), destructive: true }
    ]
  },
  {
    id: "user_007_hotel1",
    name: "Budi Santoso",
    email: "info@majujaya.com",
    phone: "08123456785",
    role: "Mitra",
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    lastLogin: "2024-01-14T18:00:00Z",
    createdAt: "2024-01-07T00:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (user) => console.log("View", user) },
      { label: "Edit User", icon: Edit, onClick: (user) => console.log("Edit", user) },
      { label: "Delete", icon: Trash2, onClick: (user) => console.log("Delete", user), destructive: true }
    ]
  },
  {
    id: "user_008_customer1",
    name: "Ahmad Fadli",
    email: "ahmad@gmail.com",
    phone: "08123456787",
    role: "Customer",
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    lastLogin: "2024-01-15T11:45:00Z",
    createdAt: "2024-01-09T00:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (user) => console.log("View", user) },
      { label: "Edit User", icon: Edit, onClick: (user) => console.log("Edit", user) },
      { label: "Delete", icon: Trash2, onClick: (user) => console.log("Delete", user), destructive: true }
    ]
  },
  {
    id: "user_009_customer2",
    name: "Siti Aminah",
    email: "siti@gmail.com",
    phone: "08123456788",
    role: "Customer",
    status: "pending",
    emailVerified: false,
    phoneVerified: false,
    lastLogin: null,
    createdAt: "2024-01-10T00:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (user) => console.log("View", user) },
      { label: "Edit User", icon: Edit, onClick: (user) => console.log("Edit", user) },
      { label: "Delete", icon: Trash2, onClick: (user) => console.log("Delete", user), destructive: true }
    ]
  },
  {
    id: "user_010_customer3",
    name: "Rizky Ahmad",
    email: "rizky@gmail.com",
    phone: "08123456789",
    role: "Customer",
    status: "suspended",
    emailVerified: true,
    phoneVerified: false,
    lastLogin: "2024-01-05T12:00:00Z",
    createdAt: "2024-01-11T00:00:00Z",
    actions: [
      { label: "View Details", icon: Eye, onClick: (user) => console.log("View", user) },
      { label: "Edit User", icon: Edit, onClick: (user) => console.log("Edit", user) },
      { label: "Delete", icon: Trash2, onClick: (user) => console.log("Delete", user), destructive: true }
    ]
  }
];

const userStats = {
  total: 10,
  active: 7,
  inactive: 1,
  pending: 1,
  suspended: 1
};

function StatusBadge({ status }) {
  const statusConfig = {
    active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    inactive: { color: "bg-gray-100 text-gray-800", icon: XCircle },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
    suspended: { color: "bg-red-100 text-red-800", icon: XCircle }
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

function RoleBadge({ role }) {
  const roleColors = {
    "Super Admin": "bg-purple-100 text-purple-800",
    "Admin": "bg-blue-100 text-blue-800",
    "Vendor": "bg-green-100 text-green-800",
    "Sales": "bg-orange-100 text-orange-800",
    "Mitra": "bg-indigo-100 text-indigo-800",
    "Customer": "bg-gray-100 text-gray-800"
  };

  return (
    <Badge className={roleColors[role] || roleColors.Customer}>
      {role}
    </Badge>
  );
}

function VerificationIcon({ verified }) {
  return verified ? (
    <CheckCircle className="w-4 h-4 text-green-500" />
  ) : (
    <XCircle className="w-4 h-4 text-gray-400" />
  );
}

export default function UsersPage() {
  const [users] = useState(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    {
      key: "name",
      title: "Name",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <UserCog className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: "role",
      title: "Role",
      sortable: true,
      render: (value) => <RoleBadge role={value} />
    },
    {
      key: "phone",
      title: "Contact",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <Phone className="w-3 h-3 text-gray-400" />
            {value}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <VerificationIcon verified={row.phoneVerified} />
            Phone
          </div>
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
      key: "lastLogin",
      title: "Last Login",
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {value ? new Date(value).toLocaleDateString('id-ID') : 'Never'}
          <div className="text-xs text-gray-500">
            {value ? new Date(value).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'}
          </div>
        </div>
      )
    },
    {
      key: "createdAt",
      title: "Joined",
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar className="w-3 h-3" />
          {new Date(value).toLocaleDateString('id-ID')}
        </div>
      )
    }
  ];

  const filterOptions = [
    {
      key: "role",
      label: "Role",
      type: "select",
      options: [
        { value: "all", label: "All Roles" },
        { value: "Super Admin", label: "Super Admin" },
        { value: "Admin", label: "Admin" },
        { value: "Vendor", label: "Vendor" },
        { value: "Sales", label: "Sales" },
        { value: "Mitra", label: "Mitra" },
        { value: "Customer", label: "Customer" }
      ]
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
        { value: "suspended", label: "Suspended" }
      ]
    },
    {
      key: "emailVerified",
      label: "Email Verified",
      type: "select",
      options: [
        { value: "all", label: "All" },
        { value: "true", label: "Verified" },
        { value: "false", label: "Not Verified" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-500">Manage all users in the system</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account. Fill in the required information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
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
            </div>
            <DialogFooter>
              <Button type="submit">Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-muted-foreground">
              All registered users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userStats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{userStats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting verification
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{userStats.suspended}</div>
            <p className="text-xs text-muted-foreground">
              Suspended accounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={users}
        searchKey="name"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedUsers}
        onSelectedRowsChange={setSelectedUsers}
        pagination={{
          total: users.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        }}
        emptyMessage="No users found"
        actions={[
          {
            label: "Activate",
            icon: CheckCircle,
            onClick: (ids) => console.log("Activate", ids),
            disabled: selectedUsers.length === 0
          },
          {
            label: "Suspend",
            icon: XCircle,
            onClick: (ids) => console.log("Suspend", ids),
            disabled: selectedUsers.length === 0
          },
          {
            label: "Delete",
            icon: Trash2,
            onClick: (ids) => console.log("Delete", ids),
            disabled: selectedUsers.length === 0,
            destructive: true
          }
        ]}
      />
    </div>
  );
}