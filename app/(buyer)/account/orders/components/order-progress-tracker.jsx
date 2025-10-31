"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, Package, CreditCard, Truck } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Status configuration with monochrome design
const statusConfig = {
  created: {
    key: 'created',
    icon: Package,
    label: 'Pesanan Dibuat',
    shortLabel: 'Dibuat',
    description: 'Pesanan Anda telah diterima',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    iconColor: 'text-gray-500',
    borderColor: 'border-gray-300'
  },
  paid: {
    key: 'paid',
    icon: CreditCard,
    label: 'Pembayaran Dikonfirmasi',
    shortLabel: 'Dibayar',
    description: 'Pembayaran berhasil dikonfirmasi',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    iconColor: 'text-gray-600',
    borderColor: 'border-gray-400'
  },
  processing: {
    key: 'processing',
    icon: Package,
    label: 'Sedang Diproses',
    shortLabel: 'Diproses',
    description: 'Pesanan sedang disiapkan',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    iconColor: 'text-gray-700',
    borderColor: 'border-gray-500'
  },
  shipped: {
    key: 'shipped',
    icon: Truck,
    label: 'Dalam Pengiriman',
    shortLabel: 'Dikirim',
    description: 'Pesanan dalam perjalanan',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    iconColor: 'text-gray-700',
    borderColor: 'border-gray-500'
  },
  delivered: {
    key: 'delivered',
    icon: CheckCircle,
    label: 'Terkirim',
    shortLabel: 'Selesai',
    description: 'Pesanan telah diterima',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-900',
    iconColor: 'text-gray-800',
    borderColor: 'border-gray-600'
  }
};

// Status Trigger Component
function StatusTrigger({ currentStatus, isOpen }) {
  const config = statusConfig[currentStatus] || statusConfig.created;

  return (
    <CollapsibleTrigger asChild>
      <div className="w-full p-4 flex items-center justify-between cursor-pointer group">
        <div className="flex items-center gap-3">
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">Status Pesanan</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 ${config.bgColor} ${config.textColor} text-xs font-medium rounded-full ${config.borderColor} border`}>
            {config.shortLabel}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </CollapsibleTrigger>
  );
}

// Status Item Component
function StatusItem({ status, isActive, isCompleted, index, totalSteps }) {
  const config = statusConfig[status.key] || statusConfig.created;
  const IconComponent = config.icon;

  return (
    <div className="flex items-start gap-4 relative">
      {/* Status Icon */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
        isCompleted
          ? 'bg-gray-900 border-2 border-gray-900'
          : isActive
          ? 'bg-white border-2 border-gray-800'
          : 'bg-white border-2 border-gray-300'
      }`}>
        <IconComponent className={`w-4 h-4 ${
          isCompleted
            ? 'text-white'
            : isActive
            ? 'text-gray-800'
            : 'text-gray-400'
        }`} />
      </div>

      {/* Status Content */}
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between">
          <p className={`font-medium text-sm ${
            isCompleted || isActive ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {config.label}
          </p>
          {isActive && (
            <span className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded">Sekarang</span>
          )}
        </div>
        <p className={`text-xs mt-1 ${
          isCompleted || isActive ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {config.description}
        </p>
      </div>

      {/* Progress Line */}
      {index < totalSteps - 1 && (
        <div className={`absolute left-4 top-8 w-0.5 h-6 ${
          isCompleted ? 'bg-gray-600' : 'bg-gray-300'
        }`} />
      )}
    </div>
  );
}

// Status List Content
function StatusListContent({ currentStatus }) {
  // Determine all steps and their status
  const steps = [
    statusConfig.created,
    statusConfig.paid,
    statusConfig.processing,
    statusConfig.shipped,
    statusConfig.delivered
  ];

  const getCurrentStepIndex = () => {
    const currentIndex = steps.findIndex(step => step.key === currentStatus);
    return Math.max(0, currentIndex);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="px-6 py-4">
      {/* Vertical Status List */}
      <div className="relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <StatusItem
              key={step.key}
              status={step}
              isActive={isActive}
              isCompleted={isCompleted}
              index={index}
              totalSteps={steps.length}
            />
          );
        })}
      </div>
    </div>
  );
}

// Main Order Progress Tracker Component
export default function OrderProgressTracker({ status }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <StatusTrigger currentStatus={status} isOpen={isOpen} />
        <CollapsibleContent className="border-t border-gray-100">
          <StatusListContent currentStatus={status} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}