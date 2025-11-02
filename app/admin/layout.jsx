"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  CreditCard,
  Truck,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  User,
  LogOut,
  Building,
  Tag,
  Archive,
  FileText,
  DollarSign,
  ShieldCheck,
  UserCog,
  Users as UsersIcon,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { canAccessAdmin } from "@/lib/role-utils";
import { useAuth } from "@/stores/auth-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { LogoutModal } from "@/components/shared/logout-modal";
import { Handshake } from "lucide-react";
import { Toaster } from "sonner";

// Navigation items based on role
const navigationItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: ["all"]
  },
  {
    title: "Manajemen Pengguna",
    icon: UsersIcon,
    roles: ["admin"],
    items: [
      {
        title: "Users Management",
        href: "/admin/users",
        icon: UserCog
      },
      {
        title: "Mitra",
        href: "/admin/mitra",
        icon: Handshake
      },
      {
        title: "Sales",
        href: "/admin/sales",
        icon: TrendingUp
      },
      {
        title: "Daftar Vendor",
        href: "/admin/vendors",
        icon: Building
      }
    ]
  },
  {
    title: "Katalog Produk",
    icon: Package,
    roles: ["admin", "vendor"],
    items: [
      {
        title: "Semua Produk",
        href: "/admin/products",
        icon: Package
      },
      {
        title: "Kategori",
        href: "/admin/categories",
        icon: Tag
      },
      {
        title: "Inventory",
        href: "/admin/inventory",
        icon: Archive
      }
    ]
  },
  {
    title: "Transaksi",
    icon: ShoppingBag,
    roles: ["admin"],
    items: [
      {
        title: "Pesanan",
        href: "/admin/orders",
        icon: ShoppingBag
      },
      {
        title: "Peminjaman Sales",
        href: "/admin/borrows",
        icon: FileText
      },
      {
        title: "Pembayaran",
        href: "/admin/payments",
        icon: CreditCard
      },
      {
        title: "Pengiriman",
        href: "/admin/deliveries",
        icon: Truck
      }
    ]
  },
  {
    title: "Laporan & Komisi",
    icon: BarChart3,
    roles: ["admin", "vendor", "sales", "mitra"],
    items: [
      {
        title: "Laporan Penjualan",
        href: "/admin/reports/sales",
        icon: BarChart3
      },
      {
        title: "Pembayaran Vendor",
        href: "/admin/reports/vendor-payments",
        icon: DollarSign
      },
      {
        title: "Laporan Komisi",
        href: "/admin/reports/commissions",
        icon: FileText
      },
      {
        title: "Komisi Mitra",
        href: "/admin/reports/mitra-commissions",
        icon: Handshake
      }
    ]
  },
  {
    title: "Pengaturan Sistem",
    href: "/admin/settings",
    icon: Settings,
    roles: ["admin"]
  }
];

// Sidebar component moved outside render function
function SidebarContent({ user, isItemActive, hasPermission }) {
  const { expandedItems, toggleExpanded, isExpanded } = useSidebarStore();
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            B
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Bahana UMKM</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            if (!hasPermission(item.roles)) return null;

            if (item.items) {
              const isExpandedItem = isExpanded(item.title);
              const hasActiveChild = item.items.some(child => isItemActive(child.href));

              return (
                <div key={item.title}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2 px-3 py-2 h-auto",
                      hasActiveChild && "bg-blue-50 text-blue-600"
                    )}
                    onClick={() => toggleExpanded(item.title)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {isExpandedItem ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  {isExpandedItem && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.items.map((subItem) => {
                        if (!hasPermission(subItem.roles || ["all"])) return null;
                        const isActive = isItemActive(subItem.href);

                        return (
                          <Link key={subItem.href} href={subItem.href}>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start gap-2 px-3 py-2 h-auto text-sm",
                                isActive && "bg-blue-100 text-blue-600"
                              )}
                            >
                              <subItem.icon className="h-4 w-4" />
                              {subItem.title}
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 px-3 py-2 h-auto",
                    isItemActive(item.href) && "bg-blue-50 text-blue-600"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const { logout, isLoading } = useAuth();
  const { expandedItems, setExpandedItems } = useSidebarStore();

  // Mock user data - replace with actual auth
  const user = {
    name: "Admin User",
    role: "admin",
    avatar: null
  };

  // Auto-expand submenu when child item is active, but preserve existing expanded items
  useEffect(() => {
    // Get current expanded items from store
    const currentExpanded = expandedItems;
    const activeExpandedItems = [];

    // Find items that should be expanded based on current route
    navigationItems.forEach(item => {
      if (item.items && item.items.length > 0) {
        const hasActiveChild = item.items.some(child =>
          pathname === child.href || pathname.startsWith(child.href + "/")
        );
        if (hasActiveChild) {
          activeExpandedItems.push(item.title);
        }
      }
    });

    // Combine: preserve manual expansions + add active expansions
    const finalExpandedItems = Array.from(new Set([
      ...currentExpanded,
      ...activeExpandedItems
    ]));

    // Only update if different
    if (finalExpandedItems.length !== currentExpanded.length ||
        !finalExpandedItems.every(item => currentExpanded.includes(item))) {
      setExpandedItems(finalExpandedItems);
    }
  }, [pathname, expandedItems, setExpandedItems]);

  
  const isItemActive = (href) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const hasPermission = (roles) => {
    return roles.includes("all") || roles.includes(user.role);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    const result = await logout();
    if (result.success) {
      setShowLogoutModal(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent
          user={user}
          isItemActive={isItemActive}
          hasPermission={hasPermission}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-3 sm:px-4 lg:px-6">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden flex-shrink-0"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 sm:gap-3 h-auto p-2">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[100px]">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div style={{display: user.avatar ? 'none' : 'flex'}}>
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* User Info Header */}
                <div className="px-2 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email || 'admin@bahana-umkm.com'}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Role Badge */}
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      <ShieldCheck className="w-3 h-3" />
                      Admin
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings" className="flex items-center space-x-3">
                      <Settings className="w-4 h-4" />
                      <span>Pengaturan</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="flex items-center space-x-3 text-red-600 focus:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onOpenChange={setShowLogoutModal}
        onLogout={handleConfirmLogout}
        isLoading={isLoading}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}