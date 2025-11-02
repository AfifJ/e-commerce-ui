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
  User,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Loader2,
  Filter,
} from "lucide-react";
import {
  getOrders,
  getOrderById,
  getOrderItems,
  getOrderStatusHistory,
  updateOrderStatus,
  getOrderStatistics,
} from "./actions";
import { toast } from "sonner";


function StatusBadge({ status }) {
  const statusConfig = {
    "pending": { bg: "bg-yellow-100 text-yellow-800", icon: Clock },
    "confirmed": { bg: "bg-blue-100 text-blue-800", icon: CheckCircle },
    "processing": { bg: "bg-indigo-100 text-indigo-800", icon: Package },
    "shipped": { bg: "bg-purple-100 text-purple-800", icon: Truck },
    "delivered": { bg: "bg-green-100 text-green-800", icon: CheckCircle },
    "cancelled": { bg: "bg-red-100 text-red-800", icon: XCircle },
    "refunded": { bg: "bg-orange-100 text-orange-800", icon: AlertCircle }
  };

  const config = statusConfig[status] || { bg: "bg-gray-100 text-gray-800", icon: AlertCircle };
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function PaymentStatusBadge({ status }) {
  const statusConfig = {
    "pending": { bg: "bg-yellow-100 text-yellow-800", icon: Clock },
    "processing": { bg: "bg-blue-100 text-blue-800", icon: CreditCard },
    "success": { bg: "bg-green-100 text-green-800", icon: CheckCircle },
    "failed": { bg: "bg-red-100 text-red-800", icon: XCircle },
    "cancelled": { bg: "bg-gray-100 text-gray-800", icon: XCircle },
    "refunded": { bg: "bg-orange-100 text-orange-800", icon: AlertCircle }
  };

  const config = statusConfig[status] || { bg: "bg-gray-100 text-gray-800", icon: AlertCircle };
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(parseInt(amount) || 0);
}

function getNextStatuses(currentStatus) {
  const statusFlow = {
    'pending': ['confirmed', 'cancelled'],
    'confirmed': ['processing', 'cancelled'],
    'processing': ['shipped', 'cancelled'],
    'shipped': ['delivered', 'cancelled'],
    'delivered': ['refunded'],
    'cancelled': ['refunded'],
    'refunded': []
  };
  return statusFlow[currentStatus] || [];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [statistics, setStatistics] = useState(null);

  // Fetch orders from database
  const fetchOrders = async (search = '', page = 1, limit = 10) => {
    try {
      const result = await getOrders(search, page, limit, statusFilter);
      if (result.success) {
        setOrders(result.data);
      } else {
        toast.error(result.error || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch order statistics
  const fetchStatistics = async () => {
    try {
      const result = await getOrderStatistics();
      if (result.success) {
        setStatistics(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  // View order details
  const handleViewOrder = async (order) => {
    try {
      const [orderResult, itemsResult, historyResult] = await Promise.all([
        getOrderById(order.id),
        getOrderItems(order.id),
        getOrderStatusHistory(order.id)
      ]);

      if (orderResult.success) {
        setViewingOrder({
          ...orderResult.data,
          items: itemsResult.success ? itemsResult.data : [],
          statusHistory: historyResult.success ? historyResult.data : []
        });
        setIsViewModalOpen(true);
      } else {
        toast.error(orderResult.error || "Failed to fetch order details");
      }
    } catch (error) {
      toast.error("Failed to fetch order details");
    }
  };

  // Update order status
  const handleUpdateStatus = async (orderId, newStatus, notes) => {
    try {
      const result = await updateOrderStatus(orderId, newStatus, notes);
      if (result.success) {
        toast.success(result.message);
        // Refresh orders and update viewing order
        await fetchOrders();
        if (viewingOrder && viewingOrder.id === orderId) {
          const updatedOrder = await getOrderById(orderId);
          if (updatedOrder.success) {
            setViewingOrder({
              ...updatedOrder.data,
              items: viewingOrder.items,
              statusHistory: [...viewingOrder.statusHistory, {
                toStatus: newStatus,
                notes: notes,
                createdAt: new Date().toISOString()
              }]
            });
          }
        }
      } else {
        toast.error(result.error || "Failed to update order status");
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  // Handle status filter change
  const handleStatusFilterChange = (newFilter) => {
    setStatusFilter(newFilter);
    setIsLoading(true);
    fetchOrders('', 1, 10);
  };

  // Initial data fetch
  useEffect(() => {
    fetchOrders();
    fetchStatistics();
  }, [statusFilter]);

  const columns = [
    {
      key: "orderNumber",
      title: "Order Info",
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-gray-500">{row.items.length} items</div>
          {row.hotelName && (
            <div className="text-xs text-blue-600 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {row.hotelName}
            </div>
          )}
        </div>
      )
    },
    {
      key: "userName",
      title: "Customer",
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{row.userEmail}</div>
        </div>
      )
    },
    {
      key: "salesName",
      title: "Sales",
      render: (value) => (
        <div className="text-sm">
          {value || (
            <span className="text-gray-400 italic">Direct Order</span>
          )}
        </div>
      )
    },
    {
      key: "totalAmount",
      title: "Amount",
      render: (value, row) => (
        <div>
          <div className="font-medium">{formatCurrency(value)}</div>
          {row.discountAmount && row.discountAmount !== "0" && (
            <div className="text-xs text-green-600">
              -{formatCurrency(row.discountAmount)} discount
            </div>
          )}
        </div>
      )
    },
    {
      key: "paymentStatus",
      title: "Payment",
      render: (value, row) => (
        <div>
          <PaymentStatusBadge status={value} />
          <div className="text-xs text-gray-500 mt-1">{row.paymentMethod}</div>
        </div>
      )
    },
    {
      key: "status",
      title: "Order Status",
      render: (value) => <StatusBadge status={value} />
    },
    {
      key: "createdAt",
      title: "Date",
      render: (value) => (
        <div className="text-sm">
          <div>{new Date(value).toLocaleDateString('id-ID')}</div>
          <div className="text-xs text-gray-500">
            {new Date(value).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </div>
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
            <Package className="w-6 h-6" />
            Order Management
          </h1>
          <p className="text-gray-500">Manage customer orders and track deliveries</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.totalOrders || 0}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{statistics.pendingOrders || 0}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">{statistics.processingOrders || 0}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(statistics.totalRevenue || 0)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      )}

      {/* Status Filter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filter by Status:</span>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilterChange(status)}
              className="capitalize"
            >
              {status === 'all' ? 'All' : status}
            </Button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading orders...</span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={orders}
          searchable={true}
          emptyMessage="No orders found"
          onRefresh={() => fetchOrders()}
          actions={[
            { label: "View", icon: Eye, onClick: handleViewOrder },
            { label: "Edit", icon: Edit, onClick: (order) => console.log("Edit", order) },
            { label: "Delete", icon: Trash2, onClick: (order) => console.log("Delete", order) }
          ]}
        />
      )}

      {/* Order Detail Modal will be added here */}
      {isViewModalOpen && viewingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <div className="flex items-center gap-2">
                {/* Status Update Buttons */}
                {viewingOrder.status !== 'delivered' && viewingOrder.status !== 'cancelled' && viewingOrder.status !== 'refunded' && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Update Status:</span>
                    {getNextStatuses(viewingOrder.status).map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const notes = prompt(`Add notes for ${status} status (optional):`);
                          handleUpdateStatus(viewingOrder.id, status, notes);
                        }}
                        className="capitalize"
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsViewModalOpen(false)}>
                  X
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Information</h3>
                  <p><strong>Order Number:</strong> {viewingOrder.orderNumber}</p>
                  <p><strong>Status:</strong> <StatusBadge status={viewingOrder.status} /></p>
                  <p><strong>Created:</strong> {new Date(viewingOrder.createdAt).toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Information</h3>
                  <p><strong>Method:</strong> {viewingOrder.paymentMethod || 'N/A'}</p>
                  <p><strong>Status:</strong> <PaymentStatusBadge status={viewingOrder.paymentStatus || 'pending'} /></p>
                  {viewingOrder.paidAt && <p><strong>Paid At:</strong> {new Date(viewingOrder.paidAt).toLocaleString('id-ID')}</p>}
                </div>
              </div>

              {/* Customer & Sales Info */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Customer</h3>
                  <p><strong>Name:</strong> {viewingOrder.userName || 'N/A'}</p>
                  <p><strong>Email:</strong> {viewingOrder.userEmail || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sales</h3>
                  <p><strong>Name:</strong> {viewingOrder.salesName || 'Direct Order'}</p>
                  <p><strong>Email:</strong> {viewingOrder.salesEmail || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Hotel</h3>
                  <p><strong>Name:</strong> {viewingOrder.hotelName || 'N/A'}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Product</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="px-4 py-2 text-right">Unit Price</th>
                        <th className="px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewingOrder.items.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="px-4 py-2">
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              {item.vendorName && <p className="text-sm text-gray-500">Vendor: {item.vendorName}</p>}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-right">{item.quantity}</td>
                          <td className="px-4 py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-4 py-2 text-right font-medium">{formatCurrency(item.totalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Price Breakdown */}
              <div>
                <h3 className="font-semibold mb-2">Price Breakdown</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(viewingOrder.subtotal)}</span>
                  </div>
                  {viewingOrder.taxAmount && viewingOrder.taxAmount !== "0" && (
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>{formatCurrency(viewingOrder.taxAmount)}</span>
                    </div>
                  )}
                  {viewingOrder.shippingCost && viewingOrder.shippingCost !== "0" && (
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{formatCurrency(viewingOrder.shippingCost)}</span>
                    </div>
                  )}
                  {viewingOrder.discountAmount && viewingOrder.discountAmount !== "0" && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-{formatCurrency(viewingOrder.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>{formatCurrency(viewingOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {viewingOrder.shippingAddress && (
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p className="text-gray-700">{viewingOrder.shippingAddress}</p>
                </div>
              )}

              {/* Notes */}
              {viewingOrder.notes && (
                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-gray-700">{viewingOrder.notes}</p>
                </div>
              )}

              {/* Cancellation Reason */}
              {viewingOrder.cancellationReason && (
                <div>
                  <h3 className="font-semibold mb-2">Cancellation Reason</h3>
                  <p className="text-gray-700">{viewingOrder.cancellationReason}</p>
                </div>
              )}

              {/* Status History */}
              {viewingOrder.statusHistory && viewingOrder.statusHistory.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Status History</h3>
                  <div className="space-y-2">
                    {viewingOrder.statusHistory.map((history, index) => (
                      <div key={history.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-800">{index + 1}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <StatusBadge status={history.fromStatus || 'pending'} />
                              <span className="text-gray-400">→</span>
                              <StatusBadge status={history.toStatus} />
                            </div>
                            {history.notes && (
                              <p className="text-sm text-gray-600 mt-1">{history.notes}</p>
                            )}
                            {history.createdBy && (
                              <p className="text-xs text-gray-500">
                                By {history.createdBy} • {new Date(history.createdAt).toLocaleString('id-ID')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}