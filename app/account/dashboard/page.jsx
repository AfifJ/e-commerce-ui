"use client";

import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import SidebarNavigation from "../components/sidebar-navigation";
import Dashboard from "../components/dashboard";
import { userProfile } from "@/data/mock-data";

export default function DashboardPage() {
  const breadcrumbItems = [
    { label: 'Akun Saya', href: '/account' },
    { label: 'Dashboard', href: null }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation - Desktop Only */}
          <div className="lg:w-80 order-1 lg:order-1 hidden lg:block">
            <div className="sticky top-12 lg:block">
              <SidebarNavigation />
            </div>
          </div>

          {/* Main Content - Full Width on Mobile */}
          <div className="flex-1 order-2 lg:order-2">
            <Dashboard userData={userProfile} />
          </div>
        </div>
      </div>
    </div>
  );
}