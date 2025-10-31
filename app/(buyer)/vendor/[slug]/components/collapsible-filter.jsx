import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

export default function CollapsibleFilter({
  isFilterOpen,
  selectedCategory,
  priceRange,
  selectedRating,
  categories,
  handleFilterChange
}) {
  return (
    <div className={`bg-white border-l border-r ${isFilterOpen ? 'border-b' : ''} transition-all duration-300 ${isFilterOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold mb-3">Kategori</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => handleFilterChange('category', 'all')}
                  className="mr-2"
                />
                Semua Kategori
              </label>
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => handleFilterChange('category', category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold mb-3">Rentang Harga</h3>
            <div className="space-y-3">
              <Input
                type="number"
                placeholder="Harga minimum"
                value={priceRange.min}
                onChange={(e) => handleFilterChange('priceRange', { ...priceRange, min: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Harga maximum"
                value={priceRange.max}
                onChange={(e) => handleFilterChange('priceRange', { ...priceRange, max: e.target.value })}
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-semibold mb-3">Rating Minimum</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === rating.toString()}
                    onChange={() => handleFilterChange('rating', rating.toString())}
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2">& ke atas</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <h3 className="font-semibold mb-3">Filter Cepat</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('priceRange', { min: '', max: '100000' })}
                className="w-full justify-start"
              >
                &lt; Rp 100.000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('priceRange', { min: '100000', max: '500000' })}
                className="w-full justify-start"
              >
                Rp 100.000 - 500.000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('priceRange', { min: '500000', max: '' })}
                className="w-full justify-start"
              >
                &gt; Rp 500.000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('rating', '4')}
                className="w-full justify-start"
              >
                Rating 4+
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}