import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, X, Grid, List, Search } from "lucide-react";

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
                placeholder="Cari produk di toko ini..."
                value={searchTerm}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
              {(selectedCategory !== 'all' || priceRange.min || priceRange.max || selectedRating !== 'all') && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {[selectedCategory !== 'all', priceRange.min || priceRange.max, selectedRating !== 'all'].filter(Boolean).length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Right Section - Sort and View */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Results Count */}
            <span className="text-sm text-gray-600 hidden sm:block">
              {filteredCount} produk ditemukan
            </span>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevant">Paling Relevan</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="reviews">Ulasan Terbanyak</option>
              <option value="name">Nama A-Z</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex border rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCategory !== 'all' || priceRange.min || priceRange.max || selectedRating !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {searchTerm}
                <button onClick={() => handleFilterChange('search', '')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Kategori: {selectedCategory}
                <button onClick={() => handleFilterChange('category', 'all')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {priceRange.min && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Min: Rp {parseInt(priceRange.min).toLocaleString('id-ID')}
                <button onClick={() => handleFilterChange('priceRange', { ...priceRange, min: '' })}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {priceRange.max && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Max: Rp {parseInt(priceRange.max).toLocaleString('id-ID')}
                <button onClick={() => handleFilterChange('priceRange', { ...priceRange, max: '' })}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedRating !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Rating: {selectedRating}+
                <button onClick={() => handleFilterChange('rating', 'all')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Hapus Semua
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}