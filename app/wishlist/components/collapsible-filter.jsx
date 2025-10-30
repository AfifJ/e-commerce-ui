import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

export default function CollapsibleFilter({
  categories,
  selectedCategory,
  priceRange,
  selectedRating,
  handleFilterChange
}) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category Filter */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900"
            >
              <span>Kategori</span>
              {expandedSections.category ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {expandedSections.category && (
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => handleFilterChange('category', category.name)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900"
            >
              <span>Rentang Harga</span>
              {expandedSections.price ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {expandedSections.price && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Rp</span>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => handleFilterChange('priceRange', {
                      ...priceRange,
                      min: e.target.value
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Rp</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => handleFilterChange('priceRange', {
                      ...priceRange,
                      max: e.target.value
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Quick Price Ranges */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-medium">Pilih cepat:</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleFilterChange('priceRange', { min: '0', max: '100000' })}
                      className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      &lt; 100rb
                    </button>
                    <button
                      onClick={() => handleFilterChange('priceRange', { min: '100000', max: '500000' })}
                      className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      100rb - 500rb
                    </button>
                    <button
                      onClick={() => handleFilterChange('priceRange', { min: '500000', max: '1000000' })}
                      className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      500rb - 1jt
                    </button>
                    <button
                      onClick={() => handleFilterChange('priceRange', { min: '1000000', max: '' })}
                      className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      &gt; 1jt
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900"
            >
              <span>Rating Minimum</span>
              {expandedSections.rating ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {expandedSections.rating && (
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating.toString()}
                      onChange={() => handleFilterChange('rating', rating.toString())}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-700">
                        {rating}.0 ke atas
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}