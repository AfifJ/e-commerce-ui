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
  User,
  Package,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  RefreshCw,
  Truck,
  Phone,
  MapPin,
} from "lucide-react";
import { XCircle } from "lucide-react";

// Mock data
const mockBorrows = [
  {
    id: "BOR-2024-001",
    salesPerson: "John Doe",
    salesEmail: "john.sales@bahana-umkm.com",
    salesPhone: "08123456783",
    salesArea: "Jakarta Pusat",
    hotelName: "Hotel Maju Jaya",
    hotelContact: "Budi Santoso",
    hotelPhone: "08123456785",
    items: [
      { name: "Laptop ASUS ROG", quantity: 5, value: 75000000, serialNumbers: ["LAP-001", "LAP-002", "LAP-003", "LAP-004", "LAP-005"] },
      { name: "Mouse Gaming", quantity: 10, value: 2500000, serialNumbers: ["MOU-001", "MOU-002", "MOU-003", "MOU-004", "MOU-005", "MOU-006", "MOU-007", "MOU-008", "MOU-009", "MOU-010"] }
    ],
    totalValue: 77500000,
    status: "active",
    borrowDate: "2024-01-10T09:00:00Z",
    expectedReturn: "2024-01-20T18:00:00Z",
    actualReturn: null,
    purpose: "Hotel room display and guest trials",
    notes: "Items to be displayed in hotel lobby and available for guest trials",
    location: "Hotel Maju Jaya - Lobby Display Area",
    agreementDocument: "BOR-2024-001-agreement.pdf",
    insuranceCoverage: true,
    insuranceValue: 77500000,
    actions: [
      { label: "View Details", icon: Eye, onClick: (borrow) => console.log("View", borrow) },
      { label: "Extend Borrow", icon: Calendar, onClick: (borrow) => console.log("Extend", borrow) },
      { label: "Return Items", icon: RefreshCw, onClick: (borrow) => console.log("Return", borrow) }
    ]
  },
  {
    id: "BOR-2024-002",
    salesPerson: "Jane Smith",
    salesEmail: "jane.sales@bahana-umkm.com",
    salesPhone: "08123456784",
    salesArea: "Jakarta Selatan",
    hotelName: "Hotel Melati Indah",
    hotelContact: "Siti Aminah",
    hotelPhone: "08123456787",
    items: [
      { name: "Smart TV LG 43 inch", quantity: 3, value: 13500000, serialNumbers: ["TV-001", "TV-002", "TV-003"] },
      { name: "Speaker Bluetooth", quantity: 8, value: 1600000, serialNumbers: ["SPK-001", "SPK-002", "SPK-003", "SPK-004", "SPK-005", "SPK-006", "SPK-007", "SPK-008"] }
    ],
    totalValue: 15100000,
    status: "returned",
    borrowDate: "2024-01-05T14:30:00Z",
    expectedReturn: "2024-01-15T18:00:00Z",
    actualReturn: "2024-01-14T16:45:00Z",
    purpose: "Hotel room upgrades and guest amenities",
    notes: "Items returned in good condition, all serial numbers matched",
    location: "Hotel Melati Indah - Returned to warehouse",
    agreementDocument: "BOR-2024-002-agreement.pdf",
    insuranceCoverage: true,
    insuranceValue: 15100000,
    returnCondition: "good",
    returnNotes: "All items inspected and found in excellent condition",
    actions: [
      { label: "View Details", icon: Eye, onClick: (borrow) => console.log("View", borrow) },
      { label: "Download Report", icon: FileText, onClick: (borrow) => console.log("Report", borrow) },
      { label: "View Agreement", icon: FileText, onClick: (borrow) => console.log("Agreement", borrow) }
    ]
  },
  {
    id: "BOR-2024-003",
    salesPerson: "Ahmad Rahman",
    salesEmail: "ahmad.sales@bahana-umkm.com",
    salesPhone: "08123456788",
    salesArea: "Jakarta Barat",
    hotelName: "Hotel Berkah",
    hotelContact: "Ahmad Fadli",
    hotelPhone: "08123456786",
    items: [
      { name: "Coffee Machine Deluxe", quantity: 2, value: 8000000, serialNumbers: ["CFE-001", "CFE-002"] },
      { name: "Kettle Electric", quantity: 5, value: 1500000, serialNumbers: ["KTL-001", "KTL-002", "KTL-003", "KTL-004", "KTL-005"] }
    ],
    totalValue: 9500000,
    status: "overdue",
    borrowDate: "2024-01-01T10:00:00Z",
    expectedReturn: "2024-01-10T18:00:00Z",
    actualReturn: null,
    purpose: "Hotel room coffee station setup",
    notes: "Initial borrow period extended once, now overdue by 5 days",
    location: "Hotel Berkah - In-Room Coffee Stations",
    agreementDocument: "BOR-2024-003-agreement.pdf",
    insuranceCoverage: true,
    insuranceValue: 9500000,
    overdueDays: 5,
    actions: [
      { label: "Contact Hotel", icon: Phone, onClick: (borrow) => console.log("Contact", borrow) },
      { label: "Extend Period", icon: Calendar, onClick: (borrow) => console.log("Extend", borrow) },
      { label: "Force Return", icon: RefreshCw, onClick: (borrow) => console.log("Force Return", borrow) }
    ]
  },
  {
    id: "BOR-2024-004",
    salesPerson: "John Doe",
    salesEmail: "john.sales@bahana-umkm.com",
    salesPhone: "08123456783",
    salesArea: "Jakarta Pusat",
    hotelName: "Hotel Maju Jaya",
    hotelContact: "Budi Santoso",
    hotelPhone: "08123456785",
    items: [
      { name: "Projector BenQ", quantity: 1, value: 12000000, serialNumbers: ["PRJ-001"] },
      { name: "Screen Projector", quantity: 1, value: 3000000, serialNumbers: ["SCR-001"] }
    ],
    totalValue: 15000000,
    status: "pending",
    borrowDate: null,
    expectedReturn: "2024-01-25T18:00:00Z",
    actualReturn: null,
    purpose: "Conference room setup for business meetings",
    notes: "Awaiting hotel confirmation for conference room availability",
    location: "Not yet assigned - pending approval",
    agreementDocument: null,
    insuranceCoverage: false,
    insuranceValue: 0,
    actions: [
      { label: "Approve Borrow", icon: CheckCircle, onClick: (borrow) => console.log("Approve", borrow) },
      { label: "Edit Request", icon: Edit, onClick: (borrow) => console.log("Edit", borrow) },
      { label: "Cancel Request", icon: XCircle, onClick: (borrow) => console.log("Cancel", borrow) }
    ]
  }
];

const borrowStats = {
  total: 4,
  active: 1,
  returned: 1,
  overdue: 1,
  pending: 1,
  totalValue: 117100000,
  activeValue: 77500000,
  overdueValue: 9500000,
  itemsBorrowed: 35,
  itemsReturned: 25,
  itemsOutstanding: 10
};

function StatusBadge({ status, overdueDays }) {
  if (status === "overdue") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <AlertTriangle className="w-3 h-3" />
        Overdue ({overdueDays} days)
      </span>
    );
  }

  const statusConfig = {
    active: { color: "bg-green-100 text-green-800", icon: Package },
    returned: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock }
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

function InsuranceBadge({ covered }) {
  return covered ? (
    <Badge className="bg-green-100 text-green-800 border-green-200">
      <CheckCircle className="w-3 h-3 mr-1" />
      Insured
    </Badge>
  ) : (
    <Badge variant="outline" className="text-orange-600 border-orange-300">
      <AlertTriangle className="w-3 h-3 mr-1" />
      No Insurance
    </Badge>
  );
}

export default function BorrowsPage() {
  const [borrows] = useState(mockBorrows);
  const [selectedBorrows, setSelectedBorrows] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const columns = [
    {
      key: "id",
      title: "Borrow Information",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-2">
          <div className="font-medium text-blue-600">{value}</div>
          <div className="flex items-center gap-2 text-sm">
            <User className="w-3 h-3 text-gray-400" />
            <span>{row.salesPerson}</span>
          </div>
          <div className="text-xs text-gray-500">
            {row.salesArea}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span>{row.hotelName}</span>
          </div>
        </div>
      )
    },
    {
      key: "items",
      title: "Items",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">{row.items.length} item types</div>
          <div className="text-xs text-gray-500">
            Total {row.items.reduce((sum, item) => sum + item.quantity, 0)} units
          </div>
          <div className="text-xs text-gray-500 line-clamp-2">
            {row.items.slice(0, 2).map((item, index) => (
              <div key={index}>
                {item.quantity}x {item.name}
              </div>
            ))}
            {row.items.length > 2 && (
              <div>+{row.items.length - 2} more</div>
            )}
          </div>
        </div>
      )
    },
    {
      key: "totalValue",
      title: "Total Value",
      sortable: true,
      render: (value) => (
        <div className="text-sm font-medium">
          Rp {value.toLocaleString('id-ID')}
        </div>
      )
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <StatusBadge status={row.status} overdueDays={row.overdueDays} />
          <InsuranceBadge covered={row.insuranceCoverage} />
        </div>
      )
    },
    {
      key: "borrowDate",
      title: "Timeline",
      sortable: true,
      render: (value, row) => (
        <div className="text-sm space-y-1">
          <div>
            <span className="text-gray-500">Borrow:</span>
            <div className="font-medium">
              {row.borrowDate ? new Date(row.borrowDate).toLocaleDateString('id-ID') : 'Pending'}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Due:</span>
            <div className="font-medium">
              {row.expectedReturn ? new Date(row.expectedReturn).toLocaleDateString('id-ID') : '-'}
            </div>
          </div>
          {row.actualReturn && (
            <div>
              <span className="text-gray-500">Returned:</span>
              <div className="font-medium text-green-600">
                {new Date(row.actualReturn).toLocaleDateString('id-ID')}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      key: "location",
      title: "Location",
      render: (value, row) => (
        <div className="text-sm line-clamp-2">
          {row.location}
        </div>
      )
    },
    {
      key: "agreementDocument",
      title: "Documents",
      render: (value, row) => (
        <div className="space-y-1">
          {row.agreementDocument ? (
            <div className="text-sm text-blue-600 cursor-pointer hover:underline">
              📄 Agreement
            </div>
          ) : (
            <div className="text-sm text-gray-400">No agreement</div>
          )}
          {row.insuranceCoverage && (
            <div className="text-sm text-green-600 cursor-pointer hover:underline">
              🛡️ Insurance
            </div>
          )}
        </div>
      )
    }
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Borrow Status",
      type: "select",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "returned", label: "Returned" },
        { value: "overdue", label: "Overdue" },
        { value: "pending", label: "Pending" }
      ]
    },
    {
      key: "salesPerson",
      label: "Sales Person",
      type: "select",
      options: [
        { value: "all", label: "All Sales" },
        { value: "John Doe", label: "John Doe" },
        { value: "Jane Smith", label: "Jane Smith" },
        { value: "Ahmad Rahman", label: "Ahmad Rahman" }
      ]
    },
    {
      key: "insurance",
      label: "Insurance",
      type: "select",
      options: [
        { value: "all", label: "All Items" },
        { value: "insured", label: "Insured Only" },
        { value: "uninsured", label: "Uninsured Only" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Borrow Management</h1>
          <p className="text-gray-500">Manage item borrows for sales demonstrations and hotel displays</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Borrow Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Borrows</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{borrowStats.total}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{borrowStats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently borrowed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{borrowStats.overdue}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Value</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              Rp {(borrowStats.activeValue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Out on loan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Outstanding</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{borrowStats.itemsOutstanding}</div>
            <p className="text-xs text-muted-foreground">
              Total units
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={borrows}
        searchKey="id"
        filters={filterOptions}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRows={selectedBorrows}
        onSelectedRowsChange={setSelectedBorrows}
        pagination={{
          total: borrows.length,
          page: 1,
          pageSize: 10
        }}
        onSearch={setSearchTerm}
        onFilter={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        }}
        emptyMessage="No borrow records found"
        actions={[
          {
            label: "Approve Request",
            icon: CheckCircle,
            onClick: (ids) => console.log("Approve", ids),
            disabled: selectedBorrows.length === 0
          },
          {
            label: "Extend Period",
            icon: Calendar,
            onClick: (ids) => console.log("Extend", ids),
            disabled: selectedBorrows.length === 0
          },
          {
            label: "Return Items",
            icon: RefreshCw,
            onClick: (ids) => console.log("Return", ids),
            disabled: selectedBorrows.length === 0
          }
        ]}
      />
    </div>
  );
}