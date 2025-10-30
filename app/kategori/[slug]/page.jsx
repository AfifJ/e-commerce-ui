"use client";

import React, { useState, useMemo } from "react";
import { flushSync } from "react-dom";
import { startTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/shared/header/components/header";
import { products, categories } from "@/data/mock-data";

// Import components
import CategoryHeader from "./components/category-header";
import FilterSortBar from "./components/filter-sort-bar";
import CollapsibleFilter from "./components/collapsible-filter";
import ProductGrid from "./components/product-grid";
import Breadcrumb from "./components/breadcrumb";

export default function CategoryPage({ params }) {
  const { slug } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Find category by slug
  const category = useMemo(() => {
    return categories.find(c => c.slug === slug);
  }, [slug]);

  // Filter products by category
  const categoryProducts = useMemo(() => {
    if (!category) return products;
    return products.filter(product => product.category === category.name);
  }, [category]);

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || ''
  });
  const [selectedRating, setSelectedRating] = useState(searchParams.get('rating') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevant');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = categoryProducts.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Price filter
      const matchesPrice = (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
                          (!priceRange.max || product.price <= parseInt(priceRange.max));

      // Rating filter
      const matchesRating = selectedRating === 'all' || product.rating >= parseInt(selectedRating);

      return matchesSearch && matchesPrice && matchesRating;
    });

    // Sort products
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'name':
          return a.name.localeCompare(b.name);
        default: // relevant
          return 0;
      }
    });
  }, [categoryProducts, searchTerm, priceRange, selectedRating, sortBy]);

  // Update URL when filters change
  const updateURL = (newFilters) => {
    const params = new URLSearchParams();

    if (newFilters.search && newFilters.search !== '') params.set('search', newFilters.search);
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice);
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice);
    if (newFilters.rating && newFilters.rating !== 'all') params.set('rating', newFilters.rating);
    if (newFilters.sort && newFilters.sort !== 'relevant') params.set('sort', newFilters.sort);

    const queryString = params.toString();
    const newUrl = queryString ? `/kategori/${slug}?${queryString}` : `/kategori/${slug}`;

    router.push(newUrl, { scroll: false });
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setIsLoading(true);

    startTransition(() => {
      flushSync(() => {
        switch (filterType) {
          case 'search':
            setSearchTerm(value);
            break;
          case 'priceRange':
            setPriceRange(value);
            break;
          case 'rating':
            setSelectedRating(value);
            break;
          case 'sort':
            setSortBy(value);
            break;
          case 'viewMode':
            setViewMode(value);
            break;
          case 'clearAll':
            setSearchTerm('');
            setPriceRange({ min: '', max: '' });
            setSelectedRating('all');
            setSortBy('relevant');
            break;
        }

        if (filterType !== 'clearAll') {
          updateURL({
            search: filterType === 'search' ? value : searchTerm,
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            rating: selectedRating,
            sort: sortBy
          });
        } else {
          router.push(`/kategori/${slug}`, { scroll: false });
        }
      });

      setTimeout(() => setIsLoading(false), 100);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Breadcrumb Navigation */}
      <Breadcrumb category={category} />

      {/* Category Header */}
      <CategoryHeader category={category} categoryProducts={categoryProducts} />

      {/* Filter Sort Bar */}
      <FilterSortBar
        searchTerm={searchTerm}
        priceRange={priceRange}
        selectedRating={selectedRating}
        sortBy={sortBy}
        viewMode={viewMode}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        filteredCount={filteredAndSortedProducts.length}
        handleFilterChange={handleFilterChange}
      />

      {/* Collapsible Filter */}
      <CollapsibleFilter
        isFilterOpen={isFilterOpen}
        priceRange={priceRange}
        selectedRating={selectedRating}
        handleFilterChange={handleFilterChange}
      />

      {/* Product Grid */}
      <ProductGrid
        filteredProducts={filteredAndSortedProducts}
        isLoading={isLoading}
        viewMode={viewMode}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
}