import Image from "next/image";
import { Star, MapPin, Package, Shield, CheckCircle } from "lucide-react";

export default function VendorHeader({ vendor }) {
  if (!vendor) return null;

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Vendor Profile Photo */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
            <Image
              src={vendor.logo}
              alt={vendor.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Vendor Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{vendor.name}</h1>
              {vendor.isVerified && (
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              )}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm md:text-base">{vendor.location}</span>
            </div>

            {/* Vendor Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-gray-900">{vendor.rating}</span>
                <span className="text-gray-600">({vendor.totalReviews} ulasan)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Package className="w-4 h-4" />
                <span>{vendor.totalProducts} produk</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Terpercaya</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}