"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Truck, Tag, ArrowRight } from "lucide-react";
import { calculateTotal } from "@/lib/cart/cart-utils";

export default function PriceSummary({ items, onCheckout, loading }) {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("regular");

  const pricing = calculateTotal(items, selectedShipping);
  const discount = promoApplied ? 50000 : 0; // Dummy discount

  const finalTotal = pricing.total - discount;

  const shippingOptions = [
    {
      id: "regular",
      name: "Regular Shipping",
      description: "3-5 hari kerja",
      price: pricing.shipping,
      estimated: "3-5 hari kerja"
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "1-2 hari kerja",
      price: 25000,
      estimated: "1-2 hari kerja"
    },
    {
      id: "same_day",
      name: "Same Day Delivery",
      description: "Hari ini (Jakarta)",
      price: 45000,
      estimated: "Hari ini"
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setPromoCode("");
  };

  const handleCheckout = () => {
    onCheckout({
      items,
      shipping: selectedShipping,
      promoCode: promoApplied ? promoCode : null,
      pricing: {
        ...pricing,
        discount,
        total: finalTotal
      }
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Belanja</h3>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({items.length} produk)</span>
          <span className="font-medium text-gray-900">{formatCurrency(pricing.subtotal)}</span>
        </div>

        {/* Shipping Options */}
        <div className="border-t pt-3">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">Pengiriman</span>
          </div>
          <div className="space-y-2">
            {shippingOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedShipping === option.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={selectedShipping === option.id}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{option.name}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {option.price === 0 ? "GRATIS" : formatCurrency(option.price)}
                  </div>
                  <div className="text-xs text-gray-500">{option.estimated}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Promo Code */}
        <div className="border-t pt-3">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">Kode Promo</span>
          </div>
          {!promoApplied ? (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Masukkan kode promo"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyPromo}
                disabled={!promoCode.trim()}
              >
                Terapkan
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">DISKON</Badge>
                <span className="text-sm font-medium text-green-800">{promoCode}</span>
              </div>
              <button
                onClick={handleRemovePromo}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Hapus
              </button>
            </div>
          )}
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Diskon</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        {/* Tax */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Pajak (11%)</span>
          <span>{formatCurrency(pricing.tax)}</span>
        </div>

        {/* Total */}
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">{formatCurrency(finalTotal)}</div>
              {pricing.subtotal >= 500000 && (
                <div className="text-xs text-green-600">Gratis ongkir!</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {pricing.subtotal < 500000 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-blue-800">Tinggal {formatCurrency(500000 - pricing.subtotal)} lagi untuk gratis ongkir!</span>
            <span className="text-blue-600 font-medium">
              {Math.round((pricing.subtotal / 500000) * 100)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(pricing.subtotal / 500000) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        disabled={items.length === 0 || loading}
        className="w-full"
        size="lg"
      >
        {loading ? (
          "Memproses..."
        ) : (
          <>
            Checkout
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>

      {/* Security Info */}
      <div className="mt-4 text-center text-xs text-gray-500">
        <div className="flex items-center justify-center gap-4">
          <span>= Pembayaran aman</span>
          <span>"</span>
          <span>=� Pengiriman terpercaya</span>
          <span>"</span>
          <span>=� Pembayaran mudah</span>
        </div>
      </div>
    </div>
  );
}