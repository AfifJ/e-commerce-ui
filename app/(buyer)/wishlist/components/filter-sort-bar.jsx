import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, X, Grid, List, Search, Heart } from "lucide-react";

export default function FilterSortBar({
  searchTerm,
  selectedCategory,
  priceRange,
  selectedRating,
  sortBy,
  viewMode,
  setViewMode,
  isFilterOpen,
  setIsFilterOpen,
  filteredCount,
  handleFilterChange,
  clearFilters
}) {
  const hasActiveFilters = selectedCategory || priceRange.min || priceRange.max || selectedRating || searchTerm;

  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Left Section - Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 items-center flex-1 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Cari produk di wishlist..."
                value={searchTerm}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                  {[selectedCategory, priceRange.min || priceRange.max, selectedRating].filter(Boolean).length}
                </Badge>
              )}
            </Button>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                {selectedCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedCategory}
                    <button
                      onClick={() => handleFilterChange('category', '')}
                      className="ml-1 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    "{searchTerm}"
                    <button
                      onClick={() => handleFilterChange('search', '')}
                      className="ml-1 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedRating && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    ⭐ {selectedRating}+
                    <button
                      onClick={() => handleFilterChange('rating', '')}
                      className="ml-1 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {(priceRange.min || priceRange.max) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Rp {priceRange.min || '0'} - {priceRange.max || '∞'}
                    <button
                      onClick={() => handleFilterChange('priceRange', { min: '', max: '' })}
                      className="ml-1 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Right Section - Sort and View Mode */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="relevance">Relevansi</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="newest">Terbaru</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex border rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mt-3">
          <div className="text-sm text-gray-600">
            {filteredCount} produk ditemukan di wishlist Anda
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-primary hover:text-primary/90"
            >
              Hapus semua filter
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}