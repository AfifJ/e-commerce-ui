"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import SidebarNavigation from "../components/sidebar-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userProfile } from "@/data/mock-data";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Ahmad",
    lastName: "Fauzi",
    email: userProfile.email,
    phone: userProfile.phone,
    birthDate: "1990-05-15",
    gender: "male",
    language: userProfile.preferences.language,
    currency: userProfile.preferences.currency,
    newsletter: userProfile.preferences.newsletter,
    marketingEmails: userProfile.preferences.marketingEmails
  });

  const breadcrumbItems = [
    { label: 'Akun Saya', href: '/account' },
    { label: 'Profil Saya', href: null }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // TODO: Reset form data
    setIsEditing(false);
  };

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
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
                  <p className="text-gray-600 mt-1">
                    Kelola informasi pribadi dan preferensi akun Anda
                  </p>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profil
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Batal
                    </Button>
                    <Button onClick={handleSave}>
                      Simpan Perubahan
                    </Button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-8">
                  {/* Personal Information */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pribadi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">Nama Depan</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nama Belakang</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthDate">Tanggal Lahir</Label>
                        <Input
                          id="birthDate"
                          name="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Jenis Kelamin</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) => handleSelectChange("gender", value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Laki-laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
                            <SelectItem value="other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </section>

                  {/* Preferences */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferensi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="language">Bahasa</Label>
                        <Select
                          value={formData.language}
                          onValueChange={(value) => handleSelectChange("language", value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="id">Bahasa Indonesia</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="currency">Mata Uang</Label>
                        <Select
                          value={formData.currency}
                          onValueChange={(value) => handleSelectChange("currency", value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IDR">IDR (Rupiah)</SelectItem>
                            <SelectItem value="USD">USD (Dollar)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </section>

                  {/* Communication Preferences */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferensi Komunikasi</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          name="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) =>
                            setFormData(prev => ({ ...prev, newsletter: checked }))
                          }
                          disabled={!isEditing}
                        />
                        <Label htmlFor="newsletter">
                          Berlangganan newsletter untuk mendapatkan penawaran dan promo terbaru
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="marketingEmails"
                          name="marketingEmails"
                          checked={formData.marketingEmails}
                          onCheckedChange={(checked) =>
                            setFormData(prev => ({ ...prev, marketingEmails: checked }))
                          }
                          disabled={!isEditing}
                        />
                        <Label htmlFor="marketingEmails">
                          Izinkan email marketing dan rekomendasi produk
                        </Label>
                      </div>
                    </div>
                  </section>

                  {/* Account Actions */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Akun</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        Unduh Data Pribadi
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                        Hapus Akun
                      </Button>
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