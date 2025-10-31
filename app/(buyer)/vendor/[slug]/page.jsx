"use client";

import { useState, use, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { flushSync } from "react-dom";
import { startTransition } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/shared/header/components/header";
import { products, vendors } from "@/data/mock-data";

// Import components
import VendorHeader from "./components/vendor-header";
import FilterSortBar from "./components/filter-sort-bar";
import CollapsibleFilter from "./components/collapsible-filter";
import ProductGrid from "./components/product-grid";
import Breadcrumb from "./components/breadcrumb";

// Generate slug from name
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Main Vendor Store Page Component
export default function VendorStorePage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();

  const slug = resolvedParams.slug;

  // Find vendor by slug
  const vendor = useMemo(() => {
    return vendors.find(v => generateSlug(v.name) === slug);
  }, [slug]);

  // Filter products by vendor
  const vendorProducts = useMemo(() => {
    if (!vendor) return [];
    return products.filter(product => product.vendorId === vendor.id);
  }, [vendor]);

  // Get unique categories from vendor products
  const categories = useMemo(() => {
    const cats = [...new Set(vendorProducts.map(p => p.category))];
    return cats.sort();
  }, [vendorProducts]);

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
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
    let filtered = vendorProducts.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // Price filter
      const matchesPrice = (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
                          (!priceRange.max || product.price <= parseInt(priceRange.max));

      // Rating filter
      const matchesRating = selectedRating === 'all' || product.rating >= parseInt(selectedRating);

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
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
  }, [vendorProducts, searchTerm, selectedCategory, priceRange, selectedRating, sortBy]);

  // Update URL when filters change
  const updateURL = (newFilters) => {
    const params = new URLSearchParams();

    if (newFilters.search && newFilters.search !== '') params.set('search', newFilters.search);
    if (newFilters.category && newFilters.category !== 'all') params.set('category', newFilters.category);
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice);
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice);
    if (newFilters.rating && newFilters.rating !== 'all') params.set('rating', newFilters.rating);
    if (newFilters.sort && newFilters.sort !== 'relevant') params.set('sort', newFilters.sort);

    const queryString = params.toString();
    const newUrl = queryString ? `/vendor/${slug}?${queryString}` : `/vendor/${slug}`;

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
          case 'category':
            setSelectedCategory(value);
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
        }

        updateURL({
          search: filterType === 'search' ? value : searchTerm,
          category: selectedCategory,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          rating: selectedRating,
          sort: sortBy
        });
      });

      setTimeout(() => setIsLoading(false), 100);
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setIsLoading(true);

    startTransition(() => {
      flushSync(() => {
        setSearchTerm('');
        setSelectedCategory('all');
        setPriceRange({ min: '', max: '' });
        setSelectedRating('all');
        setSortBy('relevant');
      });

      router.push(`/vendor/${slug}`, { scroll: false });
      setTimeout(() => setIsLoading(false), 100);
    });
  };

  // If vendor not found
  if (!vendor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Breadcrumb Navigation */}
      <Breadcrumb vendor={vendor} />

      {/* Vendor Header */}
      <VendorHeader vendor={vendor} />

      {/* Filter Sort Bar */}
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
        filteredCount={filteredAndSortedProducts.length}
        categories={categories}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
      />

      {/* Collapsible Filter */}
      <CollapsibleFilter
        isFilterOpen={isFilterOpen}
        selectedCategory={selectedCategory}
        priceRange={priceRange}
        selectedRating={selectedRating}
        categories={categories}
        handleFilterChange={handleFilterChange}
      />

      {/* Product Grid */}
      <ProductGrid
        filteredProducts={filteredAndSortedProducts}
        isLoading={isLoading}
        viewMode={viewMode}
        clearFilters={clearFilters}
      />
    </div>
  );
}