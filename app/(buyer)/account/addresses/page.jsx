"use client";

import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import SidebarNavigation from "../components/sidebar-navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";

export default function AddressesPage() {
  const breadcrumbItems = [
    { label: 'Akun Saya', href: '/account' },
    { label: 'Alamat Pengiriman', href: null }
  ];

  const addresses = [
    {
      id: 1,
      name: "Rumah",
      recipient: "Ahmad Fauzi",
      phone: "081234567890",
      address: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12345",
      isDefault: true
    },
    {
      id: 2,
      name: "Kantor",
      recipient: "Ahmad Fauzi",
      phone: "081234567891",
      address: "Jl. Sudirman No. 456, Gedung BCA Tower",
      city: "Jakarta Pusat",
      province: "DKI Jakarta",
      postalCode: "12346",
      isDefault: false
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Alamat Pengiriman
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Kelola alamat pengiriman untuk pesanan Anda
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Tambah Alamat Baru
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {addresses.map((address) => (
                  <div key={address.id} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{address.name}</h3>
                          {address.isDefault && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              Alamat Utama
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>{address.recipient}</strong></p>
                          <p>{address.phone}</p>
                          <p>{address.address}</p>
                          <p>{address.city}, {address.province} {address.postalCode}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}