import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Heart,
  Minus,
  Plus,
  Check,
  AlertTriangle,
  Truck,
  Star
} from "lucide-react";
import Link from "next/link";

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
  readOnly = false
}) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isMovingToWishlist, setIsMovingToWishlist] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (item.stock && newQuantity > item.stock) return;
    onUpdateQuantity(item.id, newQuantity, item.variant);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(item.id, item.variant);
    }, 300);
  };

  const handleMoveToWishlist = async () => {
    setIsMovingToWishlist(true);
    setTimeout(() => {
      onMoveToWishlist?.(item);
      onRemove(item.id, item.variant);
    }, 300);
  };

  const getStockStatus = () => {
    if (!item.stock) return { status: 'available', text: 'Tersedia', color: 'green' };
    if (item.stock <= 3) return { status: 'low', text: `Stok Menipis (${item.stock})`, color: 'yellow' };
    return { status: 'available', text: 'Tersedia', color: 'green' };
  };

  const stockStatus = getStockStatus();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`border rounded-lg bg-white overflow-hidden transition-all duration-200 ${
      isRemoving ? 'opacity-50 scale-95' : ''
    }`}>
      {/* Mobile Layout - Card Style */}
      <div className="lg:hidden">
        <div className="flex gap-3 p-3">
          {/* Product Image - Left */}
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              width={96}
              height={96}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Product Details - Right */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Top Section - Name, Variant, Stock */}
            <div className="space-y-1">
              <Link
                href={`/produk/${item.id}`}
                className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
              >
                {item.name}
              </Link>

              {/* Variant Badge */}
              {item.variant && item.variant !== 'default' && (
                <Badge variant="secondary" className="text-xs inline-block">
                  {item.variant}
                </Badge>
              )}

              {/* Stock Status */}
              <div className={`flex items-center gap-1 text-xs ${
                stockStatus.color === 'green' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {stockStatus.color === 'green' ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <AlertTriangle className="w-3 h-3" />
                )}
                <span>{stockStatus.text}</span>
              </div>
            </div>

            {/* Middle Section - Price and Rating */}
            <div className="space-y-1">
              {/* Price Section */}
              <div className="flex items-center gap-2">
                <div className="text-base font-bold text-gray-900">
                  {formatPrice(item.price)}
                </div>
                {item.originalPrice && item.originalPrice > item.price && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 line-through">
                      {formatPrice(item.originalPrice)}
                    </span>
                    <Badge className="bg-red-500 text-white text-xs px-1 py-0">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    </Badge>
                  </div>
                )}
              </div>

              {/* Product Meta */}
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  <span>2-3 hari</span>
                </div>
              </div>
            </div>

            {/* Bottom Section - Quantity and Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              {/* Quantity Control */}
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1 || readOnly}
                  className="p-1 h-8 rounded-r-none"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  disabled={readOnly}
                  className="w-10 text-center border-0 rounded-none focus:ring-0 text-sm"
                  min={1}
                  max={item.stock || 99}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.stock && item.quantity >= item.stock || readOnly}
                  className="p-1 h-8 rounded-l-none"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {!readOnly && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleMoveToWishlist}
                      disabled={isMovingToWishlist}
                      className="p-1 h-8 w-8"
                    >
                      <Heart className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemove}
                      disabled={isRemoving}
                      className="p-1 h-8 w-8"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Subtotal Footer */}
        <div className="bg-white px-3 py-2 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Subtotal:</span>
            <span className="text-base font-bold text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Table Style */}
      <div className="hidden lg:block">
        <div className="p-4">
          <div className="flex gap-4">
            {/* Product Image */}
            <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                width={128}
                height={128}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-2">
                {/* Product Name & Variant */}
                <div className="flex-1">
                  <Link
                    href={`/produk/${item.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  {item.variant && item.variant !== 'default' && (
                    <Badge variant="secondary" className="mt-1 inline-block">
                      {item.variant}
                    </Badge>
                  )}
                </div>

                {/* Stock Status */}
                <div className={`flex items-center gap-1 text-sm ${
                  stockStatus.color === 'green' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {stockStatus.color === 'green' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  <span>{stockStatus.text}</span>
                </div>
              </div>

              {/* Product Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>2-3 hari</span>
                </div>
              </div>

              {/* Original Price (if discounted) */}
              {item.originalPrice && item.originalPrice > item.price && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(item.originalPrice)}
                  </span>
                  <Badge className="bg-red-500 text-white">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Table Row */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            {/* Price */}
            <div className="w-32">
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(item.price)}
              </div>
              {item.originalPrice && item.originalPrice > item.price && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(item.originalPrice)}
                </div>
              )}
            </div>

            {/* Quantity Control */}
            <div className="w-32">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1 || readOnly}
                  className="p-2 h-10 rounded-r-none"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  disabled={readOnly}
                  className="w-16 text-center border-0 rounded-none focus:ring-0"
                  min={1}
                  max={item.stock || 99}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.stock && item.quantity >= item.stock || readOnly}
                  className="p-2 h-10 rounded-l-none"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="w-32">
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>

            {/* Actions */}
            <div className="w-24 flex gap-2">
              {!readOnly && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMoveToWishlist}
                    disabled={isMovingToWishlist}
                    className="flex items-center gap-1"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemove}
                    disabled={isRemoving}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}