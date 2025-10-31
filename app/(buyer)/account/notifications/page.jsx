"use client";

import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import SidebarNavigation from "../components/sidebar-navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const breadcrumbItems = [
    { label: 'Akun Saya', href: '/account' },
    { label: 'Notifikasi', href: null }
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
          {/* Sidebar Navigation - Mobile First */}
          <div className="lg:w-80 order-1 lg:order-1">
            <div className="sticky top-12 lg:block border-t border-gray-200 pt-6 lg:border-t-0 lg:pt-0">
              <SidebarNavigation />
            </div>
          </div>

          {/* Main Content - Mobile Second */}
          <div className="flex-1 order-2 lg:order-2">
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Bell className="w-6 h-6" />
                  Pengaturan Notifikasi
                </h1>
                <p className="text-gray-600 mt-1">
                  Kelola preferensi notifikasi untuk akun Anda
                </p>
              </div>

              {/* Content */}
              <div className="space-y-8">
                {/* Email Notifications */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifikasi Email</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="order-updates" defaultChecked />
                      <Label htmlFor="order-updates">
                        Pembaruan status pesanan
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="promotions" defaultChecked />
                      <Label htmlFor="promotions">
                        Promo dan penawaran khusus
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="newsletter" defaultChecked />
                      <Label htmlFor="newsletter">
                        Newsletter mingguan
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="product-recommendations" />
                      <Label htmlFor="product-recommendations">
                        Rekomendasi produk personal
                      </Label>
                    </div>
                  </div>
                </section>

                {/* Push Notifications */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifikasi Browser</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="push-order-updates" defaultChecked />
                      <Label htmlFor="push-order-updates">
                        Pembaruan pesanan real-time
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="push-promotions" />
                      <Label htmlFor="push-promotions">
                        Promo flash sale
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="push-cart-reminders" />
                      <Label htmlFor="push-cart-reminders">
                        Pengingat keranjang belanja
                      </Label>
                    </div>
                  </div>
                </section>

                {/* SMS Notifications */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifikasi SMS</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms-order-updates" />
                      <Label htmlFor="sms-order-updates">
                        Pembaruan status pesanan
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms-delivery-updates" />
                      <Label htmlFor="sms-delivery-updates">
                        Pembaruan pengiriman
                      </Label>
                    </div>
                  </div>
                </section>

                {/* Save Button */}
                <div className="pt-6 border-t border-gray-200">
                  <Button>
                    Simpan Pengaturan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}