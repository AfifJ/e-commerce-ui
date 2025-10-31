"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/header/components/header";
import { CartProvider, useCart } from "@/lib/cart/cart-context";
import EmptyCart from "./components/empty-cart";
import CartItem from "./components/cart-item";
import CartSummary from "./components/cart-summary";
import Recommendations from "./components/recommendations";
import Breadcrumb from "@/components/shared/breadcrumb";

// Cart Header Component
function CartHeader({ itemCount }) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Keranjang Belanja Anda
          </h1>
          {itemCount > 0 && (
            <span className="text-sm text-gray-600">
              ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


// Breadcrumb Component for Cart
function CartBreadcrumb() {
  const breadcrumbItems = [
    {
      label: "Keranjang",
      href: null // Current page, not clickable
    }
  ];

  return <Breadcrumb items={breadcrumbItems} />;
}

// Cart Main Component
function CartContent() {
  const router = useRouter();
  const {
    items,
    totalItems,
    subtotal,
    shipping,
    discount,
    total,
    voucher,
    orderNotes,
    updateQuantity,
    removeFromCart,
    applyVoucher,
    removeVoucher,
    updateOrderNotes,
    updateShipping
  } = useCart();

  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = () => {
    setIsLoading(true);

    // Prepare checkout data
    const checkoutData = {
      items: items,
      subtotal: subtotal,
      shipping: shipping,
      discount: discount,
      total: total,
      voucher: voucher,
      orderNotes: orderNotes,
      timestamp: new Date().toISOString()
    };

    // Store checkout data in sessionStorage
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));

    // Simulate processing time then redirect
    setTimeout(() => {
      router.push('/checkout');
    }, 500);
  };

  const handleMoveToWishlist = (item) => {
    // Mock move to wishlist functionality
    console.log('Moving to wishlist:', item);
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CartBreadcrumb />
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Breadcrumb Navigation */}
      <CartBreadcrumb />

      {/* Cart Header */}
      <CartHeader itemCount={totalItems} />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-4 pb-32 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {/* Cart Items Header (Desktop) */}
              <div className="hidden lg:flex items-center bg-white rounded-lg border p-4 text-sm font-medium text-gray-700">
                <div className="flex-1">PRODUK</div>
                <div className="w-32">HARGA</div>
                <div className="w-32">JUMLAH</div>
                <div className="w-32">SUBTOTAL</div>
                <div className="w-24">AKSI</div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.variant}`}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    onMoveToWishlist={handleMoveToWishlist}
                  />
                ))}
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Catatan Pesanan
                </h3>
                <textarea
                  placeholder="Tambahkan catatan untuk pesanan Anda (opsional)"
                  value={orderNotes}
                  onChange={(e) => updateOrderNotes(e.target.value)}
                  className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Cart Summary */}
          <div className="lg:col-span-4">
            <CartSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              voucher={voucher}
              onApplyVoucher={applyVoucher}
              onRemoveVoucher={removeVoucher}
              onCheckout={handleCheckout}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
}