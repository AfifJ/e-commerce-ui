"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Search,
  Home,
  ShoppingBag,
  Heart,
  User,
  Zap,
  Package,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Twitter
} from "lucide-react";

export default function MobileMenu({ isOpen, onClose, categories }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (category) => {
    console.log(`Navigate to category: ${category.slug}`);
    onClose();
  };

  const handleFlashSaleClick = () => {
    console.log("Navigate to flash sale");
    onClose();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Search for: ${searchQuery}`);
    onClose();
  };

  const handleLinkClick = (path) => {
    console.log(`Navigate to: ${path}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu Panel */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </form>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-2 p-4 border-b border-gray-200">
            <button
              onClick={() => handleLinkClick('/')}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-600">Home</span>
            </button>
            <button
              onClick={() => handleLinkClick('/keranjang')}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-600">Keranjang</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => handleLinkClick('/wishlist')}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <Heart className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-600">Wishlist</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => handleLinkClick('/akun')}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-600">Akun</span>
            </button>
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Kategori</h3>
            <div className="space-y-1">
              {categories.map((category) => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{category.name}</div>
                        <div className="text-xs text-gray-500">
                          {category.subcategories.length} subkategori
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flash Sale */}
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={handleFlashSaleClick}
              className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-red-600">Flash Sale</div>
                  <div className="text-xs text-red-500">Diskon hingga 70%</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </button>
          </div>

          {/* Quick Links */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleLinkClick('/about')}
                className="w-full text-left p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Tentang Kami
              </button>
              <button
                onClick={() => handleLinkClick('/contact')}
                className="w-full text-left p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Hubungi Kami
              </button>
              <button
                onClick={() => handleLinkClick('/help')}
                className="w-full text-left p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Bantuan
              </button>
              <button
                onClick={() => handleLinkClick('/terms')}
                className="w-full text-left p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Syarat & Ketentuan
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span>support@premium.com</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <Instagram className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <Facebook className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <MessageCircle className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <Twitter className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* App Download */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Download our app</p>
            <div className="flex justify-center space-x-2">
              <button className="px-3 py-1 bg-black text-white text-xs rounded">
                App Store
              </button>
              <button className="px-3 py-1 bg-black text-white text-xs rounded">
                Play Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper function untuk mendapatkan icon component
function getIconComponent(iconName) {
  const icons = {
    User: Package,
    Users: Package,
    Smartphone: Package,
    Home: Package,
    Trophy: Package,
    Heart: Package,
    default: Package
  };
  return icons[iconName] || icons.default;
}