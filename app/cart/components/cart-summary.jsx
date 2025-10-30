import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Truck,
  Shield,
  Lock,
  X,
  ChevronRight,
  Check,
  AlertCircle
} from "lucide-react";
import { validateVoucher, calculateDiscount, getShippingCost } from "@/data/mock-data";

export default function CartSummary({
  items,
  subtotal,
  shipping,
  discount,
  total,
  voucher,
  onApplyVoucher,
  onRemoveVoucher,
  onCheckout,
  isLoading = false
}) {
  const [voucherCode, setVoucherCode] = useState('');
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setVoucherError('Masukkan kode voucher');
      return;
    }

    setIsApplyingVoucher(true);
    setVoucherError('');
    setVoucherSuccess('');

    // Simulate API call
    setTimeout(() => {
      const validation = validateVoucher(voucherCode, subtotal);

      if (validation.valid) {
        const discountAmount = calculateDiscount(validation.voucher, subtotal);
        onApplyVoucher({
          ...validation.voucher,
          discount: discountAmount
        });
        setVoucherSuccess('Voucher berhasil diterapkan!');
        setVoucherCode('');
      } else {
        setVoucherError(validation.message);
      }

      setIsApplyingVoucher(false);
    }, 1000);
  };

  const handleRemoveVoucher = () => {
    onRemoveVoucher();
    setVoucherSuccess('');
  };

  const handleCheckout = () => {
    onCheckout();
  };

  return (
    <>
      {/* Mobile Version - Sticky Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="p-4 space-y-3">
          {/* Total & Checkout */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs text-gray-600 mb-1">Total ({items.length} items)</div>
              <div className="text-lg font-bold text-gray-900">{formatPrice(total)}</div>
              {discount > 0 && (
                <div className="text-xs text-green-600">
                  Hemat {formatPrice(discount)}
                </div>
              )}
            </div>
            <Button
              onClick={handleCheckout}
              disabled={items.length === 0 || isLoading}
              size="lg"
              className="font-semibold px-6 py-3 h-auto"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Memproses...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Checkout</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>

          {/* Quick Voucher Input */}
          {!voucher && (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Kode voucher"
                value={voucherCode}
                onChange={(e) => {
                  setVoucherCode(e.target.value);
                  setVoucherError('');
                  setVoucherSuccess('');
                }}
                className="flex-1 text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleApplyVoucher();
                  }
                }}
              />
              <Button
                onClick={handleApplyVoucher}
                disabled={isApplyingVoucher || !voucherCode.trim()}
                size="sm"
                className="px-3"
              >
                {isApplyingVoucher ? '...' : 'Terapkan'}
              </Button>
            </div>
          )}

          {/* Applied Voucher */}
          {voucher && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-1 text-xs font-medium text-green-800">
                  <Check className="w-3 h-3" />
                  {voucher.code}
                </div>
                <div className="text-xs text-green-600">
                  Hemat: {formatPrice(discount)}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveVoucher}
                className="text-green-600 hover:text-green-700 hover:bg-green-100 p-1 h-6 w-6"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          {/* Voucher Messages */}
          {voucherError && (
            <div className="flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="w-3 h-3" />
              <span>{voucherError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Version - Sidebar */}
      <div className="hidden lg:block lg:sticky lg:top-24 lg:w-96">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Ringkasan Pesanan</h3>
          </div>

          {/* Items Count */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-4">
            {/* Subtotal */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Diskon</span>
                <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
              </div>
            )}

            {/* Shipping */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Biaya Pengiriman</span>
              <span className="font-medium">
                {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
              </span>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-blue-600">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Voucher Section */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Kode Voucher
            </div>

            {voucher ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-sm font-medium text-green-800">
                      <Check className="w-4 h-4" />
                      {voucher.code}
                    </div>
                    <p className="text-xs text-green-600 mt-1">{voucher.description}</p>
                    <div className="text-xs text-green-600 mt-1">
                      Hemat: {formatPrice(discount)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveVoucher}
                    className="text-green-600 hover:text-green-700 hover:bg-green-100 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Masukkan kode voucher"
                  value={voucherCode}
                  onChange={(e) => {
                    setVoucherCode(e.target.value);
                    setVoucherError('');
                    setVoucherSuccess('');
                  }}
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleApplyVoucher();
                    }
                  }}
                />
                <Button
                  onClick={handleApplyVoucher}
                  disabled={isApplyingVoucher || !voucherCode.trim()}
                  className="whitespace-nowrap"
                >
                  {isApplyingVoucher ? '...' : 'Terapkan'}
                </Button>
              </div>
            )}

            {/* Voucher Messages */}
            {voucherError && (
              <div className="flex items-center gap-1 mt-2 text-xs text-red-600">
                <AlertCircle className="w-3 h-3" />
                <span>{voucherError}</span>
              </div>
            )}

            {voucherSuccess && (
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <Check className="w-3 h-3" />
                <span>{voucherSuccess}</span>
              </div>
            )}
          </div>

          {/* Shipping Estimate */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <Truck className="w-4 h-4" />
              <span>Estimasi pengiriman: 2-4 hari kerja</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            onClick={handleCheckout}
            disabled={items.length === 0 || isLoading}
            size="lg"
            className="w-full font-semibold py-3"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Memproses...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>Lanjutkan ke Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </Button>

          {/* Trust Signals */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Lock className="w-3 h-3" />
              <span>Pembayaran aman & terenkripsi</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Shield className="w-3 h-3" />
              <span>Garansi 100% original</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Metode Pembayaran:</div>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-white text-xs">VISA</span>
              </div>
              <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">GOPAY</span>
              </div>
              <div className="w-8 h-5 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">OVO</span>
              </div>
              <div className="w-8 h-5 bg-purple-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">QRIS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}