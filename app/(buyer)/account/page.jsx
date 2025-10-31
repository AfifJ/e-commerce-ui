"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  MapPin,
  Bell,
  Shield
} from "lucide-react";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import Dashboard from "./components/dashboard";
import { userProfile } from "@/data/mock-data";
import SidebarNavigation from "./components/sidebar-navigation";

export default function AccountPage() {
  const breadcrumbItems = [
    { label: 'Akun Saya', href: null }
  ];

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Ringkasan akun Anda",
      href: "/account/dashboard",
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: "profile",
      label: "Profil Saya",
      icon: User,
      description: "Kelola informasi pribadi",
      href: "/account/profile",
      color: "bg-green-50 text-green-600"
    },
    {
      id: "orders",
      label: "Pesanan Saya",
      icon: ShoppingBag,
      description: "Riwayat dan status pesanan",
      href: "/account/orders",
      color: "bg-purple-50 text-purple-600"
    },
    {
      id: "addresses",
      label: "Alamat Pengiriman",
      icon: MapPin,
      description: "Kelola alamat pengiriman",
      href: "/account/addresses",
      color: "bg-orange-50 text-orange-600"
    },
    {
      id: "notifications",
      label: "Notifikasi",
      icon: Bell,
      description: "Pengaturan notifikasi",
      href: "/account/notifications",
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      id: "security",
      label: "Keamanan",
      icon: Shield,
      description: "Ubah password dan keamanan",
      href: "/account/security",
      color: "bg-red-50 text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Desktop View - Full Dashboard */}
        <div className="hidden lg:block">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Navigation - Desktop Only */}
            <div className="lg:w-80 order-1 lg:order-1">
              <div className="sticky top-8 lg:block border-t border-gray-200 pt-6 lg:border-t-0 lg:pt-0">
                <SidebarNavigation />
              </div>
            </div>
            {/* <div className="lg:w-80">
              <div className="sticky top-12 space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Menu Cepat</h3>
                  <div className="space-y-2">
                    {menuItems.slice(0, 4).map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div> */}

            {/* Main Dashboard Content */}
            <div className="flex-1 order-2 lg:order-2">
              <Dashboard userData={userProfile} />
            </div>
          </div>
        </div>

        {/* Mobile View - Menu Selection */}
        <div className="lg:hidden">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Selamat Datang, {userProfile.name}!
            </h1>
            <p className="text-gray-600">
              Pilih menu yang ingin Anda akses
            </p>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className='w-full flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                >
                  <IconComponent className={`w-5 h-5 text-gray-400`} />
                  <div className="flex-1 text-left">
                    <div className="font-bold text-black text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}