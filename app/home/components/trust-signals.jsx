"use client";

import { Shield, Truck, Lock, Clock } from "lucide-react";
import { trustSignals } from "@/data/mock-data";

// Icon mapping
const iconMap = {
  Shield,
  Truck,
  Lock,
  Clock
};

export default function TrustSignals() {
  return (
    <section className="bg-gray-50 py-6 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {trustSignals.map((signal, index) => {
            const IconComponent = iconMap[signal.icon];
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {signal.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {signal.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}