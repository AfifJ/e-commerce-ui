import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus } from "lucide-react";
import { products } from "@/data/mock-data";
import { useCart } from "@/lib/cart-context";

export default function Recommendations() {
  const { addToCart, getItemQuantity, isInCart } = useCart();

  // Mock recommendations - in real app, this would come from an API
  const recommendations = products.slice(4, 8); // Get some products as recommendations

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Lengkapi Belanjaan Anda
        </h3>
        <Badge variant="secondary" className="text-xs">
          Rekomendasi
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recommendations.map((product) => {
          const inCart = isInCart(product.id);
          const quantity = getItemQuantity(product.id);

          return (
            <div key={product.id} className="bg-white rounded-lg border hover:shadow-md transition-all duration-200 overflow-hidden">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.badge}
                  </div>
                )}

                {/* Add to Cart Indicator */}
                {inCart && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {quantity}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                  {product.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539 1.118l1.07 3.292a1 1 0 00.364 1.118L-2.8 9.972c-.784.57-.38 1.81.588 1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span>{product.rating}</span>
                  <span>({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-xs text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={inCart}
                  className={`w-full text-sm ${
                    inCart
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {inCart ? (
                    <div className="flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      <span>Ditambahkan</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      <Plus className="w-3 h-3" />
                      <span>Tambah</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More Button */}
      <div className="text-center mt-6">
        <Button variant="outline" className="text-sm">
          Lihat Lebih Banyak
        </Button>
      </div>
    </div>
  );
}