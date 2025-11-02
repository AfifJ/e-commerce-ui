"use client";

import { useState } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  MapPin,
  User,
  Camera,
} from "lucide-react";
import { Plus } from "lucide-react";

// Mock data matching database schema
const mockDeliveries = [
  {
    id: "uuid-delivery-001",
    orderId: "uuid-order-001",
    orderNumber: "ORD-20240115-001",
    courierName: "Bahana Ekspedisi",
    courierPhone: "08123456789",
    deliveryMethod: "courier",
    trackingNumber: "BHN-1234567890",
    deliveryProof: "https://example.com/proof/delivery-001.jpg",
    receivedProof: "https://example.com/proof/received-001.jpg",
    pickupProof: null,
    status: "delivered",
    estimatedDelivery: "2024-01-16T15:00:00Z",
    deliveredAt: "2024-01-16T14:30:00Z",
    pickedUpAt: "2024-01-15T16:45:00Z",
    notes: "Delivered to reception desk, signed by security",
    recipientName: "John Doe",
    recipientPhone: "081234567890",
    createdAt: "2024-01-15T15:00:00Z",
    updatedAt: "2024-01-16T14:30:00Z"
  },
  {
    id: "uuid-delivery-002",
    orderId: "uuid-order-002",
    orderNumber: "ORD-20240114-002",
    courierName: "Bahana Ekspedisi",
    courierPhone: "081987654321",
    deliveryMethod: "courier",
    trackingNumber: "BHN-9876543210",
    deliveryProof: null,
    receivedProof: null,
    pickupProof: "https://example.com/proof/pickup-002.jpg",
    status: "in_transit",
    estimatedDelivery: "2024-01-15T18:00:00Z",
    deliveredAt: null,
    pickedUpAt: "2024-01-14T17:30:00Z",
    notes: "Customer requested afternoon delivery",
    recipientName: "Jane Smith",
    recipientPhone: "081234567891",
    createdAt: "2024-01-14T16:00:00Z",
    updatedAt: "2024-01-14T17:30:00Z"
  },
  {
    id: "uuid-delivery-003",
    orderId: "uuid-order-003",
    orderNumber: "ORD-20240113-003",
    courierName: null,
    courierPhone: null,
    deliveryMethod: "pickup",
    trackingNumber: null,
    deliveryProof: null,
    receivedProof: "https://example.com/proof/received-003.jpg",
    pickupProof: null,
    status: "picked_up_by_customer",
    estimatedDelivery: null,
    deliveredAt: null,
    pickedUpAt: "2024-01-14T10:15:00Z",
    notes: "Customer picked up directly from warehouse",
    recipientName: "Budi Santoso",
    recipientPhone: "081234567892",
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-14T10:15:00Z"
  },
  {
    id: "uuid-delivery-004",
    orderId: "uuid-order-004",
    orderNumber: "ORD-20240112-004",
    courierName: "Bahana Ekspedisi",
    courierPhone: "08111222333",
    deliveryMethod: "courier",
    trackingNumber: "BHN-4567890123",
    deliveryProof: null,
    receivedProof: null,
    pickupProof: null,
    status: "failed",
    estimatedDelivery: "2024-01-13T16:00:00Z",
    deliveredAt: null,
    pickedUpAt: "2024-01-12T14:20:00Z",
    notes: "Customer not available, returned to sender",
    recipientName: "Rina Wijaya",
    recipientPhone: "081234567893",
    createdAt: "2024-01-12T12:30:00Z",
    updatedAt: "2024-01-13T09:15:00Z"
  },
  {
    id: "uuid-delivery-005",
    orderId: "uuid-order-005",
    orderNumber: "ORD-20240111-005",
    courierName: "Bahana Ekspedisi",
    courierPhone: "081234567895",
    deliveryMethod: "sales",
    trackingNumber: null,
    deliveryProof: "https://example.com/proof/delivery-005.jpg",
    receivedProof: "https://example.com/proof/received-005.jpg",
    pickupProof: null,
    status: "preparing",
    estimatedDelivery: "2024-01-12T14:00:00Z",
    deliveredAt: null,
    pickedUpAt: null,
    notes: "Sales person will deliver directly to hotel",
    recipientName: "Hotel Manager",
    recipientPhone: "081234567896",
    createdAt: "2024-01-11T13:20:00Z",
    updatedAt: "2024-01-11T13:20:00Z"
  }
];

function StatusBadge({ status }) {
  const statusConfig = {
    "pending": { bg: "bg-yellow-100 text-yellow-800", icon: Clock },
    "preparing": { bg: "bg-blue-100 text-blue-800", icon: Package },
    "ready_for_pickup": { bg: "bg-indigo-100 text-indigo-800", icon: Package },
    "picked_up": { bg: "bg-purple-100 text-purple-800", icon: Truck },
    "in_transit": { bg: "bg-blue-100 text-blue-800", icon: Truck },
    "delivered": { bg: "bg-green-100 text-green-800", icon: CheckCircle },
    "picked_up_by_customer": { bg: "bg-teal-100 text-teal-800", icon: User },
    "failed": { bg: "bg-red-100 text-red-800", icon: XCircle }
  };

  const config = statusConfig[status] || { bg: "bg-gray-100 text-gray-800", icon: Clock };
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg}`}>
      <Icon className="w-3 h-3" />
      {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </span>
  );
}


export default function DeliveriesPage() {
  const [deliveries] = useState(mockDeliveries);

  const handleViewDelivery = (delivery) => {
    const hasDeliveryProof = delivery.deliveryProof;
    const hasReceivedProof = delivery.receivedProof;
    const hasPickupProof = delivery.pickupProof;

    alert(`Delivery Details:\n\n` +
      `Delivery ID: ${delivery.id}\n` +
      `Order: ${delivery.orderNumber}\n` +
      `Method: ${delivery.deliveryMethod.toUpperCase()}\n` +
      `Status: ${delivery.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}\n\n` +
      `Courier Information:\n` +
      `${delivery.courierName ? `Name: ${delivery.courierName}\n` : ''}` +
      `${delivery.courierPhone ? `Phone: ${delivery.courierPhone}\n` : ''}` +
      `${delivery.trackingNumber ? `Tracking: ${delivery.trackingNumber}\n` : ''}` +
      `${delivery.trackingNumber ? '\n' : ''}` +
      `Recipient Information:\n` +
      `Name: ${delivery.recipientName}\n` +
      `Phone: ${delivery.recipientPhone}\n\n` +
      `Timeline:\n` +
      `Created: ${new Date(delivery.createdAt).toLocaleString('id-ID')}\n` +
      `${delivery.pickedUpAt ? `Picked Up: ${new Date(delivery.pickedUpAt).toLocaleString('id-ID')}\n` : ''}` +
      `${delivery.estimatedDelivery ? `Estimated: ${new Date(delivery.estimatedDelivery).toLocaleString('id-ID')}\n` : ''}` +
      `${delivery.deliveredAt ? `Delivered: ${new Date(delivery.deliveredAt).toLocaleString('id-ID')}\n` : ''}` +
      `Updated: ${new Date(delivery.updatedAt).toLocaleString('id-ID')}\n\n` +
      `Available Proofs:\n` +
      `${hasDeliveryProof ? '• Delivery proof\n' : ''}` +
      `${hasReceivedProof ? '• Received proof\n' : ''}` +
      `${hasPickupProof ? '• Pickup proof\n' : ''}` +
      `${!hasDeliveryProof && !hasReceivedProof && !hasPickupProof ? 'No proofs available' : ''}` +
      `${delivery.notes ? `\n\nNotes: ${delivery.notes}` : ''}`
    );
  };

  const columns = [
    {
      key: "trackingNumber",
      title: "Delivery Info",
      render: (value, row) => (
        <div>
          <div className="font-medium">{value || 'No Tracking'}</div>
          <div className="text-xs text-gray-500">{row.orderNumber}</div>
          <div className="text-xs text-blue-600 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {row.deliveryMethod.replace(/_/g, ' ')}
          </div>
        </div>
      )
    },
    {
      key: "recipientName",
      title: "Recipient",
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{row.recipientPhone}</div>
        </div>
      )
    },
    {
      key: "courierName",
      title: "Courier",
      render: (value, row) => (
        <div className="text-sm">
          {value || (
            <span className="text-gray-400 italic">
              {row.deliveryMethod === 'pickup' ? 'Self Pickup' : row.deliveryMethod === 'sales' ? 'Sales Delivery' : 'Not Assigned'}
            </span>
          )}
          {row.courierPhone && (
            <div className="text-xs text-gray-500">{row.courierPhone}</div>
          )}
        </div>
      )
    },
    {
      key: "status",
      title: "Status",
      render: (value) => <StatusBadge status={value} />
    },
    {
      key: "proofs",
      title: "Proofs",
      render: (_, row) => {
        const proofs = [];
        if (row.deliveryProof) proofs.push('delivery');
        if (row.receivedProof) proofs.push('received');
        if (row.pickupProof) proofs.push('pickup');

        return (
          <div className="text-sm">
            {proofs.length > 0 ? (
              proofs.map((proof, index) => (
                <div key={index} className="flex items-center gap-1 text-green-600">
                  <Camera className="w-3 h-3" />
                  <span className="capitalize">{proof}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-1 text-gray-400">
                <Camera className="w-3 h-3" />
                No proof
              </div>
            )}
          </div>
        );
      }
    },
    {
      key: "estimatedDelivery",
      title: "Timeline",
      render: (_, row) => (
        <div className="text-sm">
          {row.deliveredAt ? (
            <div className="text-green-600">
              Delivered {new Date(row.deliveredAt).toLocaleDateString('id-ID')}
            </div>
          ) : row.estimatedDelivery ? (
            <div>
              <div className="font-medium">Est: {new Date(row.estimatedDelivery).toLocaleDateString('id-ID')}</div>
              {row.pickedUpAt && (
                <div className="text-xs text-blue-600">
                  Picked up {new Date(row.pickedUpAt).toLocaleDateString('id-ID')}
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400">No schedule</div>
          )}
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
            <Truck className="w-6 h-6" />
            Delivery Management
          </h1>
          <p className="text-gray-500">Track deliveries and manage proof of delivery</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Delivery
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={deliveries}
        searchable={true}
        emptyMessage="No deliveries found"
        actions={[
          { label: "View", icon: Eye, onClick: handleViewDelivery },
          { label: "Edit", icon: Edit, onClick: (delivery) => console.log("Edit", delivery) },
          { label: "Delete", icon: Trash2, onClick: (delivery) => console.log("Delete", delivery) }
        ]}
      />
    </div>
  );
}