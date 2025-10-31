"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Bell,
  Shield,
  LogOut
} from "lucide-react";

export default function SidebarNavigation() {
  const pathname = usePathname();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Ringkasan akun Anda",
      href: "/account/dashboard"
    },
    {
      id: "profile",
      label: "Profil Saya",
      icon: User,
      description: "Kelola informasi pribadi",
      href: "/account/profile"
    },
    {
      id: "orders",
      label: "Pesanan Saya",
      icon: ShoppingBag,
      description: "Riwayat dan status pesanan",
      href: "/account/orders"
    },
    {
      id: "addresses",
      label: "Alamat Pengiriman",
      icon: MapPin,
      description: "Kelola alamat pengiriman",
      href: "/account/addresses"
    },
    {
      id: "notifications",
      label: "Notifikasi",
      icon: Bell,
      description: "Pengaturan notifikasi",
      href: "/account/notifications"
    },
    {
      id: "security",
      label: "Keamanan",
      icon: Shield,
      description: "Ubah password dan keamanan",
      href: "/account/security"
    }
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
  };

  return (
    <div className="space-y-1">
      {/* Menu Items */}
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = pathname === item.href;

        // Special handling for dashboard - active on both /account and /account/dashboard
        const isDashboardActive = item.id === "dashboard" && (pathname === "/account" || pathname === "/account/dashboard");
        const isItemActive = isActive || isDashboardActive;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`
              w-full flex items-center space-x-4 p-4 rounded-lg transition-all duration-200
              ${isItemActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <IconComponent className={`w-5 h-5 ${isItemActive ? 'text-blue-600' : 'text-gray-400'}`} />
            <div className="flex-1 text-left">
              <div className="font-bold text-black text-sm">{item.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
            </div>
          </Link>
        );
      })}

      {/* Divider */}
      <div className="border-t border-gray-100 my-4"></div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center space-x-4 p-4 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
      >
        <LogOut className="w-5 h-5 text-gray-400" />
        <div className="flex-1 text-left">
          <div className="font-medium text-sm">Keluar</div>
          <div className="text-xs text-gray-500 mt-0.5">Logout dari akun Anda</div>
        </div>
      </button>
    </div>
  );
}