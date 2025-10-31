"use client";

import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function OrderItem({ item, onReview }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-gray-900">{item.name}</h4>
            {item.variant && (
              <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
            )}
            <p className="text-sm text-gray-700">Qty: {item.quantity}</p>

          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">
              {formatCurrency(item.price)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-gray-500">
                {formatCurrency(item.price * item.quantity)} total
              </p>
            )}
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReview(item)}
              >
                <Star className="w-4 h-4" />
                Review Produk
              </Button>
            </div>
          </div>
        </div>

        {/* Review Button */}
        {/* {onReview && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReview(item)}
              className="w-full flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4" />
              Review Produk
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}