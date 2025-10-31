"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Image } from "lucide-react";

export default function ProductReviewModal({
  isOpen,
  onOpenChange,
  orderItems,
  orderId
}) {
  const handleReviewProduct = (product) => {
    // TODO: Navigate to product review page
    console.log(`Review product: ${product.name} from order ${orderId}`);
    alert(`Review: ${product.name} - ${product.variant || ''}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pilih Produk yang Ingin Diulas</DialogTitle>
          <DialogDescription>
            Pilih produk dari pesanan {orderId} yang ingin Anda berikan ulasan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {orderItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                {item.variant && (
                  <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
                )}
              </div>

              {/* Review Button */}
              <Button
                size="sm"
                onClick={() => handleReviewProduct(item)}
                className="flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                Review Produk
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}