import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import ProductCard from "@/components/shared/product-card";

export default function ProductGrid({ filteredProducts, isLoading, viewMode, clearFilters }) {
  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <Package className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada produk ditemukan</h3>
          <p className="text-gray-600 mb-4">Coba ubah filter atau kata kunci pencarian Anda</p>
          <Button onClick={clearFilters}>Hapus Filter</Button>
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
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}