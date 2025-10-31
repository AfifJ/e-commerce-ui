import { Package } from "lucide-react";

export default function CategoryHeader({ category, categoryProducts }) {
  if (!category) {
    return (
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Semua Produk</h1>
            <p className="text-gray-600">Temukan berbagai produk pilihan</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-64 md:h-80"
      style={{ backgroundImage: `url('${category.image}')` }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-lg md:text-xl mb-4 text-white/90">{category.description}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-white/80">
            <Package className="w-4 h-4" />
            <span>{categoryProducts.length} produk tersedia</span>
          </div>
        </div>
      </div>
    </div>
  );
}