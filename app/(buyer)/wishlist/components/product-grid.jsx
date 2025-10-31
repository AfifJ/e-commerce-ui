import { Button } from "@/components/ui/button";
import { Heart, Package } from "lucide-react";
import ProductCard from "@/components/shared/product-card";

export default function ProductGrid({
  filteredProducts,
  isLoading,
  viewMode,
  clearFilters,
  removeFromWishlist
}) {
  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <Heart className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Belum ada produk di wishlist
          </h3>
          <p className="text-gray-600 mb-4">
            Mulai tambahkan produk favorit Anda ke wishlist
          </p>
          <Button onClick={() => window.location.href = '/'}>
            Jelajahi Produk
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48 mb-2"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid gap-4 ${
          viewMode === 'grid'
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                isWishlisted: true // Semua produk di wishlist pasti diwishlist
              }}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Wishlist Summary */}
      <div className="mt-12 p-6 bg-white rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Ringkasan Wishlist
            </h3>
            <p className="text-sm text-gray-600">
              {filteredProducts.length} produk dengan total nilai{" "}
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(
                filteredProducts.reduce((total, product) => total + product.price, 0)
              )}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                // Add all to cart functionality
                console.log('Add all to cart');
              }}
            >
              <Package className="w-4 h-4 mr-2" />
              Tambah Semua ke Keranjang
            </Button>
            <Button
              variant="default"
              onClick={() => {
                // Share wishlist functionality
                console.log('Share wishlist');
              }}
            >
              Bagikan Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}