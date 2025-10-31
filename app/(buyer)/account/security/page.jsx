"use client";

import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import SidebarNavigation from "../components/sidebar-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SecurityPage() {
  const breadcrumbItems = [
    { label: 'Akun Saya', href: '/account' },
    { label: 'Keamanan', href: null }
  ];

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Mobile First */}
          <div className="lg:w-80 order-1 lg:order-1">
            <div className="sticky top-8 lg:block border-t border-gray-200 pt-6 lg:border-t-0 lg:pt-0">
              <SidebarNavigation />
            </div>
          </div>

          {/* Main Content - Mobile Second */}
          <div className="flex-1 order-2 lg:order-2">
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Keamanan Akun
                </h1>
                <p className="text-gray-600 mt-1">
                  Kelola keamanan dan kata sandi akun Anda
                </p>
              </div>

              {/* Content */}
              <div className="space-y-8">
                  {/* Change Password */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ubah Kata Sandi</h3>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <Label htmlFor="currentPassword">Kata Sandi Saat Ini</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            className="mt-1 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="newPassword">Kata Sandi Baru</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            className="mt-1 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi Baru</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className="mt-1 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <Button>
                        Ubah Kata Sandi
                      </Button>
                    </div>
                  </section>

                  {/* Security Settings */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pengaturan Keamanan</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Login Ganda (2FA)</h4>
                          <p className="text-sm text-gray-600">Tambah lapisan keamanan ekstra untuk akun Anda</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Aktifkan
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Sesi Aktif</h4>
                          <p className="text-sm text-gray-600">Kelola perangkat yang sedang login</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Kelola
                        </Button>
                      </div>
                    </div>
                  </section>

                  {/* Account Activity */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Akun</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Login Terakhir</h4>
                          <p className="text-sm text-gray-600">Hari ini, 14:30 • Chrome, Windows</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Perangkat Terpercaya</h4>
                          <p className="text-sm text-gray-600">2 perangkat tersimpan</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Lihat
                        </Button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}