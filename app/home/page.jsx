"use client";

import Header from "@/components/shared/header/components/header";
import HeroCarousel from "@/components/shared/hero/components/hero-carousel";
import TrustSignals from "./components/trust-signals";
import CategoryGrid from "./components/category-grid";
import FeaturedProducts from "./components/featured-products";
import PromoBanner from "./components/promo-banner";
import TrendingProducts from "./components/trending-products";
import Testimonials from "./components/testimonials";
import Newsletter from "./components/newsletter";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroCarousel />

      {/* Trust Signals */}
      <TrustSignals />

      {/* Categories */}
      <CategoryGrid />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Trending Products */}
      <TrendingProducts />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}