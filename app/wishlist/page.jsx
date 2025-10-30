"use client";

import { useState, useMemo } from "react";
import Header from "@/components/shared/header/components/header";
import { wishlistProducts, categories } from "@/data/mock-data";

// Import components
import WishlistHeader from "./components/wishlist-header";
import FilterSortBar from "./components/filter-sort-bar";
import CollapsibleFilter from "./components/collapsible-filter";
import ProductGrid from "./components/product-grid";
import WishlistBreadcrumb from "./components/breadcrumb";

export default function WishlistPage() {
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRating, setSelectedRating] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    let filtered = [...wishlistProducts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= parseInt(priceRange.max));
    }

    // Rating filter
    if (selectedRating) {
      filtered = filtered.filter(product => product.rating >= parseInt(selectedRating));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default: // relevance
          return 0;
      }
    });

    return filtered;
  }, [wishlistProducts, searchTerm, selectedCategory, priceRange, selectedRating, sortBy]);

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'search':
        setSearchTerm(value);
        // Add a small delay for search to show loading state
        if (value) {
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 200);
        }
        break;
      case 'category':
        setIsLoading(true);
        setTimeout(() => {
          setSelectedCategory(value);
          setIsLoading(false);
        }, 200);
        break;
      case 'priceRange':
        setIsLoading(true);
        setTimeout(() => {
          setPriceRange(value);
          setIsLoading(false);
        }, 200);
        break;
      case 'rating':
        setIsLoading(true);
        setTimeout(() => {
          setSelectedRating(value);
          setIsLoading(false);
        }, 200);
        break;
      case 'sort':
        setSortBy(value);
        break;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSelectedRating('');
    setSortBy('relevance');
  };

  const removeFromWishlist = (productId) => {
    // In a real app, this would call an API
    console.log('Remove from wishlist:', productId);
    // TODO: Implement actual removal logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <WishlistBreadcrumb />

      {/* Wishlist Header */}
      <WishlistHeader totalItems={wishlistProducts.length} />

      {/* Filter & Sort Bar */}
      <FilterSortBar
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        priceRange={priceRange}
        selectedRating={selectedRating}
        sortBy={sortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        filteredCount={filteredProducts.length}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
      />

      {/* Collapsible Filters */}
      {isFilterOpen && (
        <CollapsibleFilter
          categories={categories}
          selectedCategory={selectedCategory}
          priceRange={priceRange}
          selectedRating={selectedRating}
          handleFilterChange={handleFilterChange}
        />
      )}

      {/* Product Grid */}
      <ProductGrid
        filteredProducts={filteredProducts}
        isLoading={isLoading}
        viewMode={viewMode}
        clearFilters={clearFilters}
        removeFromWishlist={removeFromWishlist}
      />
    </div>
  );
}