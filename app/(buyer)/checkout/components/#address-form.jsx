"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  User,
  Building,
  ChevronRight,
  Home,
  Check
} from "lucide-react";

export default function AddressForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    province: initialData?.province || '',
    city: initialData?.city || '',
    district: initialData?.district || '',
    postalCode: initialData?.postalCode || '',
    notes: initialData?.notes || ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const provinces = [
    'DKI Jakarta',
    'Jawa Barat',
    'Jawa Tengah',
    'Jawa Timur',
    'Bali',
    'Sumatera Utara',
    'Sumatera Barat',
    'Sulawesi Selatan',
    'Kalimantan Timur',
    'DI Yogyakarta'
  ];

  const cities = {
    'DKI Jakarta': ['Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Timur'],
    'Jawa Barat': ['Bandung', 'Bogor', 'Depok', 'Bekasi', 'Cimahi'],
    'Jawa Tengah': ['Semarang', 'Surakarta', 'Tegal', 'Pekalongan', 'Salatiga'],
    'Jawa Timur': ['Surabaya', 'Malang', 'Kediri', 'Blitar', 'Madiun'],
    'Bali': ['Denpasar', 'Badung', 'Gianyar', 'Tabanan', 'Bangli'],
    'Sumatera Utara': ['Medan', 'Binjai', 'Pematangsiantar', 'Tanjungbalai', 'Tebingtinggi'],
    'Sumatera Barat': ['Padang', 'Bukittinggi', 'Payakumbuh', 'Pariaman', 'Solok'],
    'Sulawesi Selatan': ['Makassar', 'Parepare', 'Palopo', 'Luwu', 'Bone'],
    'Kalimantan Timur': ['Balikpapan', 'Samarinda', 'Bontang', 'Penajam', 'Kutai'],
    'DI Yogyakarta': ['Yogyakarta', 'Sleman', 'Bantul', 'Gunung Kidul', 'Kulon Progo']
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = 'Nomor telepon hanya boleh angka';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Alamat wajib diisi';
    }

    if (!formData.province) {
      newErrors.province = 'Provinsi wajib dipilih';
    }

    if (!formData.city) {
      newErrors.city = 'Kota/Kabupaten wajib dipilih';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Kode pos wajib diisi';
    } else if (!/^[0-9]+$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Kode pos hanya boleh angka';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      onSubmit(formData);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Alamat Pengiriman</h2>
        </div>
        <Badge variant="secondary" className="text-xs">Langkah 1 dari 3</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Main Content */}
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Kontak</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      className={`pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="08xx-xxxx-xxxx"
                      className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Alamat Lengkap</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Alamat <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Contoh: Jl. Sudirman No. 123, RT 01/RW 02, Kelurahan Sukamaju"
                      className={`w-full min-h-[100px] pl-10 pr-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.address ? 'border-red-500' : ''
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-xs text-red-500">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="province" className="text-sm font-medium text-gray-700">
                      Provinsi <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="province"
                      value={formData.province}
                      onChange={(e) => {
                        handleInputChange('province', e.target.value);
                        handleInputChange('city', ''); // Reset city when province changes
                      }}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.province ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="text-xs text-red-500">{errors.province}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                      Kota/Kabupaten <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!formData.province}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.city ? 'border-red-500' : ''
                      } ${!formData.province ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    >
                      <option value="">Pilih Kota/Kabupaten</option>
                      {formData.province && cities[formData.province]?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-sm font-medium text-gray-700">
                      Kecamatan
                    </Label>
                    <Input
                      id="district"
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      placeholder="Masukkan kecamatan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                      Kode Pos <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="12345"
                      className={errors.postalCode ? 'border-red-500' : ''}
                    />
                    {errors.postalCode && (
                      <p className="text-xs text-red-500">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                    Catatan Pengiriman <span className="text-xs text-gray-500">(Opsional)</span>
                  </Label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Contoh: Patokan depan warnet biru, belok di gapura hijau"
                    className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="font-semibold px-8"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Menyimpan...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Lanjutkan ke Pembayaran</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar - Address Preview */}
        {/* <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Alamat</h3>

            {formData.fullName || formData.phone || formData.address ? (
              <div className="space-y-3">
                {formData.fullName && (
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{formData.fullName}</div>
                      {formData.phone && (
                        <div className="text-sm text-gray-600">{formData.phone}</div>
                      )}
                    </div>
                  </div>
                )}

                {formData.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="text-sm text-gray-600">
                      <div>{formData.address}</div>
                      {(formData.city || formData.province) && (
                        <div>
                          {[formData.district, formData.city, formData.province].filter(Boolean).join(', ')}
                        </div>
                      )}
                      {formData.postalCode && <div>{formData.postalCode}</div>}
                      {formData.notes && (
                        <div className="text-gray-500 italic mt-1">Catatan: {formData.notes}</div>
                      )}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="text-xs text-gray-500">
                  <div className="flex items-center gap-1 mb-1">
                    <Check className="w-3 h-3 text-green-600" />
                    <span>Alamat akan digunakan untuk pengiriman</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-600" />
                    <span>Anda dapat mengubah alamat kapan saja</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">
                  Lengkapi formulir untuk melihat preview alamat
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-xs text-gray-500 space-y-1">
                <p className="font-medium text-gray-700 mb-2">=� Tips:</p>
                <p>Masukkan alamat yang lengkap dan detail</p>
                <p>Sertakan patokan jika diperlukan</p>
                <p>Pastikan nomor telepon dapat dihubungi</p>
                <p>Informasikan jika ada jam khusus pengiriman</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}