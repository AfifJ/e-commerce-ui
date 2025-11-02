"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/admin/components/data-table";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
} from "lucide-react";

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "Order",
    description: "New order #ORD-001 from John Doe",
    amount: "Rp 15,750,000",
    time: "2 minutes ago",
    status: "Pending"
  },
  {
    id: 2,
    type: "Product",
    description: "Low stock alert for Laptop ASUS ROG",
    amount: "5 units left",
    time: "15 minutes ago",
    status: "Warning"
  },
  {
    id: 3,
    type: "User",
    description: "New user registration: Jane Smith",
    amount: "jane@example.com",
    time: "1 hour ago",
    status: "Active"
  },
  {
    id: 4,
    type: "Payment",
    description: "Payment received for order #ORD-998",
    amount: "Rp 8,500,000",
    time: "2 hours ago",
    status: "Completed"
  }
];

// Mock data for quick stats
const quickStats = [
  {
    title: "Total Revenue",
    value: "Rp 450.5M",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "Total Orders",
    value: "1,248",
    icon: ShoppingCart,
    color: "text-blue-600"
  },
  {
    title: "Total Products",
    value: "156",
    icon: Package,
    color: "text-purple-600"
  },
  {
    title: "Total Users",
    value: "3,842",
    icon: Users,
    color: "text-orange-600"
  }
];

function StatusBadge({ status }) {
  const statusConfig = {
    "Pending": "bg-yellow-100 text-yellow-800",
    "Warning": "bg-orange-100 text-orange-800",
    "Active": "bg-green-100 text-green-800",
    "Completed": "bg-blue-100 text-blue-800"
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const columns = [
    {
      key: "type",
      title: "Type",
      render: (value) => <div className="font-medium">{value}</div>
    },
    {
      key: "description",
      title: "Description",
      render: (value) => <div className="text-sm">{value}</div>
    },
    {
      key: "amount",
      title: "Details",
      render: (value) => <div className="text-sm font-medium">{value}</div>
    },
    {
      key: "time",
      title: "Time",
      render: (value) => <div className="text-sm text-gray-500">{value}</div>
    },
    {
      key: "status",
      title: "Status",
      render: (value) => <StatusBadge status={value} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Overview of your business</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activities</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={recentActivities}
            searchable={false}
            showPagination={false}
            emptyMessage="No recent activities"
          />
        </CardContent>
      </Card>
    </div>
  );
}