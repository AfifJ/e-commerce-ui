"use client";

import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Package,
  Clock,
  MessageCircle,
  CheckCircle,
  Store,
  Shield
} from "lucide-react";
import { vendors } from "@/data/mock-data";
import { Button } from "@/components/ui/button";

// Generate slug from name
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function VendorCard({ vendorId }) {
  const vendor = vendors.find(v => v.id === vendorId);

  if (!vendor) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={vendor.logo}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
              {vendor.isVerified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <p className="text-sm text-gray-600">{vendor.description}</p>
          </div>
        </div>
      </div>


      {/* CTA Buttons */}
      <div className="flex gap-3 pt-2">
        <Button className="flex-1">
          <MessageCircle className="w-4 h-4" />
          Chat dengan Penjual
        </Button>
        <a href={`/vendor/${generateSlug(vendor.name)}`} className="flex-1">
          <Button variant="outline" className="w-full">
            <Store className="w-4 h-4" />
            Kunjungi Toko
          </Button>
        </a>
      </div>
    </div>
  );
}