"use client";

import { CheckCircle, Circle, Truck, Package, Clock, MapPin } from "lucide-react";

// Order Timeline Component
export function OrderTimeline({ status, trackingNumber, createdAt }) {
  // Define timeline steps
  const timelineSteps = [
    {
      key: 'pending',
      label: 'Order Dibuat',
      description: 'Pesanan Anda telah diterima',
      icon: Circle,
      isCompleted: ['pending', 'paid', 'processing', 'shipped', 'delivered'].includes(status),
      isActive: status === 'pending'
    },
    {
      key: 'paid',
      label: 'Pembayaran Berhasil',
      description: 'Pembayaran telah dikonfirmasi',
      icon: CheckCircle,
      isCompleted: ['paid', 'processing', 'shipped', 'delivered'].includes(status),
      isActive: status === 'paid'
    },
    {
      key: 'processing',
      label: 'Diproses',
      description: 'Pesanan sedang disiapkan',
      icon: Package,
      isCompleted: ['processing', 'shipped', 'delivered'].includes(status),
      isActive: status === 'processing'
    },
    {
      key: 'shipped',
      label: 'Dikirim',
      description: `Pesanan dalam perjalanan${trackingNumber ? ` (${trackingNumber})` : ''}`,
      icon: Truck,
      isCompleted: ['shipped', 'delivered'].includes(status),
      isActive: status === 'shipped'
    },
    {
      key: 'delivered',
      label: 'Terkirim',
      description: 'Pesanan telah diterima',
      icon: CheckCircle,
      isCompleted: status === 'delivered',
      isActive: status === 'delivered'
    }
  ];

  // Handle cancelled status
  if (status === 'cancelled') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 text-red-600">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <Circle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-medium text-red-900">Order Dibatalkan</h3>
            <p className="text-sm text-red-700">
              Order ini telah dibatalkan oleh sistem atau pengguna
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Order</h3>

      <div className="space-y-4">
        {timelineSteps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = step.isCompleted;
          const isActive = step.isActive;

          return (
            <div key={step.key} className="flex items-start gap-4">
              {/* Timeline Icon */}
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-green-100 text-green-600'
                      : isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Timeline Line */}
                {index < timelineSteps.length - 1 && (
                  <div
                    className={`absolute top-8 left-4 w-0.5 h-8 -translate-x-1/2 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>

              {/* Timeline Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className={`font-medium ${
                      isCompleted
                        ? 'text-gray-900'
                        : isActive
                        ? 'text-blue-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </h4>
                  {isActive && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      Proses
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm ${
                    isCompleted
                      ? 'text-gray-600'
                      : isActive
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Estimated Delivery Time */}
      {status === 'shipped' && (
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center gap-3 text-blue-600">
            <Clock className="w-5 h-5" />
            <div>
              <p className="font-medium text-blue-900">Estimasi Tiba</p>
              <p className="text-sm text-blue-700">2-4 hari kerja</p>
            </div>
          </div>
        </div>
      )}

      {/* Delivered Message */}
      {status === 'delivered' && (
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center gap-3 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <div>
              <p className="font-medium text-green-900">Pesanan Selesai</p>
              <p className="text-sm text-green-700">Terima kasih telah berbelanja!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact Timeline Component (for smaller spaces)
export function CompactOrderTimeline({ status }) {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Menunggu Pembayaran',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100'
        };
      case 'paid':
        return {
          label: 'Pembayaran Berhasil',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        };
      case 'processing':
        return {
          label: 'Diproses',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100'
        };
      case 'shipped':
        return {
          label: 'Dikirim',
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-100'
        };
      case 'delivered':
        return {
          label: 'Terkirim',
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        };
      case 'cancelled':
        return {
          label: 'Dibatalkan',
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        };
      default:
        return {
          label: 'Status Tidak Diketahui',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.bgColor}`}>
      <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
      <span className={`text-sm font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    </div>
  );
}

// Status Badge Component
export function OrderStatusBadge({ status, className = "" }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Menunggu Pembayaran',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'paid':
        return {
          label: 'Pembayaran Berhasil',
          color: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'processing':
        return {
          label: 'Diproses',
          color: 'bg-purple-100 text-purple-800 border-purple-200'
        };
      case 'shipped':
        return {
          label: 'Dikirim',
          color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
        };
      case 'delivered':
        return {
          label: 'Terkirim',
          color: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'cancelled':
        return {
          label: 'Dibatalkan',
          color: 'bg-red-100 text-red-800 border-red-200'
        };
      default:
        return {
          label: 'Status Tidak Diketahui',
          color: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color} ${className}`}
    >
      {statusConfig.label}
    </span>
  );
}

// Tracking Info Component
export function TrackingInfo({ trackingNumber, status }) {
  if (!trackingNumber || status !== 'shipped') {
    return null;
  }

  const handleCopyTracking = async () => {
    try {
      await navigator.clipboard.writeText(trackingNumber);
      // Could add toast notification here
    } catch (error) {
      console.error('Failed to copy tracking number:', error);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Truck className="w-5 h-5 text-blue-600" />
        <div className="flex-1">
          <h4 className="font-medium text-blue-900">Nomor Resi</h4>
          <p className="text-sm text-blue-700">{trackingNumber}</p>
        </div>
        <button
          onClick={handleCopyTracking}
          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
        >
          Salin
        </button>
      </div>
    </div>
  );
}

export default OrderTimeline;