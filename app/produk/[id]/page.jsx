"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/mock-data";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "./components/breadcrumb";
import ProductGallery from "./components/product-gallery";
import ProductInfo from "./components/product-info";
import ProductTabs from "./components/product-tabs";
import RelatedProducts from "./components/related-products";
import BundleProducts from "./components/bundle-products";
import StickyCta from "./components/sticky-cta";

// Mock function untuk mendapatkan produk berdasarkan ID
function getProduct(id) {
  return products.find(product => product.id === parseInt(id));
}

export default function ProductDetailPage({ params }) {
  const [showStickyCta, setShowStickyCta] = useState(false);
  const resolvedParams = use(params);
  const product = getProduct(resolvedParams.id);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past the main product info
      const scrollThreshold = 600;
      if (window.scrollY > scrollThreshold) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    notFound();
  }

  return (
    <div className="pb-16 bg-gray-50">
      {/* Header */}
      <Header />

      {/* Breadcrumb Navigation */}
      <Breadcrumb product={product} />

      {/* Main Product Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Gallery - Left Column */}
          <ProductGallery product={product} />

          {/* Product Info & CTA - Right Column */}
          <ProductInfo product={product} />
        </div>

        {/* Bundle Products Section */}
        <BundleProducts product={product} />

        {/* Product Tabs Section */}
        <ProductTabs product={product} />

        {/* Related Products Section */}
        <RelatedProducts currentProduct={product} />
      </div>

      {/* Sticky CTA for Mobile */}
      <StickyCta
        product={product}
        isVisible={showStickyCta}
        onClose={() => setShowStickyCta(false)}
      />
    </div>
  );
}