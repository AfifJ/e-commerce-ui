"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/shared/header/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Truck, Smartphone, CheckCircle } from "lucide-react";
import Link from "next/link";
import { createOrderAction } from "./actions/checkout";
import { checkoutFormSchema } from "@/lib/schemas/checkout-schema";
// import { getCurrentUser } from "@/lib/user-service";
getCurrentUser
import Breadcrumb from "@/components/shared/breadcrumb";
import { getCurrentUser } from "@/lib/user-service";

// Customer Info Component (Read-only)
function ReadOnlyCustomerInfo({ userData }) {
  if (!userData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Data Penerima</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-600">Nama Lengkap</Label>
            <p className="text-gray-900 font-medium">{userData.nama}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Nomor WhatsApp</Label>
            <p className="text-gray-900 font-medium">{userData.whatsapp}</p>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Alamat Lengkap</Label>
          <p className="text-gray-900">{userData.alamat}</p>
        </div>
        {userData.isVerified && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Akun Terverifikasi</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Checkout Form Component (Read-Only)
function CheckoutForm({ form, onSubmit, isSubmitting, checkoutData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Informasi Pengiriman Tambahan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kecamatan">Kecamatan *</Label>
              <Input
                id="kecamatan"
                {...form.register('kecamatan')}
                disabled={true}
                className="bg-gray-50 text-gray-700"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kotaKabupaten">Kota/Kabupaten *</Label>
              <Input
                id="kotaKabupaten"
                {...form.register('kotaKabupaten')}
                disabled={true}
                className="bg-gray-50 text-gray-700"
                readOnly
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kodePos">Kode Pos *</Label>
            <Input
              id="kodePos"
              {...form.register('kodePos')}
              disabled={true}
              className="bg-gray-50 text-gray-700"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="catatan">Catatan untuk Penjual (Opsional)</Label>
            <Textarea
              id="catatan"
              placeholder="Tambahkan catatan khusus untuk pesanan Anda"
              rows={3}
              {...form.register('catatan')}
              disabled={isSubmitting}
            />
            {form.formState.errors.catatan && (
              <p className="text-sm text-red-600">
                {form.formState.errors.catatan.message}
              </p>
            )}
          </div>

          <input type="hidden" name="checkoutData" value={JSON.stringify(checkoutData)} />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Memproses...' : 'Buat Order'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Fixed Shipping & Payment Component
function FixedShippingPayment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Metode Pengiriman & Pembayaran</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-600">Pengiriman</Label>
          <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
            <Truck className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Kurir Bahana</p>
              <p className="text-sm text-gray-600">Estimasi 2-4 hari kerja</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-600">Pembayaran</Label>
          <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
            <Smartphone className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">QRIS</p>
              <p className="text-sm text-gray-600">Pembayaran instan dengan QR code</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Order Summary Component
function OrderSummary({ checkoutData }) {
  if (!checkoutData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ringkasan Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {checkoutData.items?.length || 0} produk
            </span>
            <span className="font-medium text-gray-900">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(checkoutData.subtotal || 0)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Biaya Pengiriman</span>
            <span className="font-medium text-gray-900">
              {(checkoutData.shipping || 0) === 0
                ? 'GRATIS'
                : new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(checkoutData.shipping || 0)}
            </span>
          </div>
          {(checkoutData.discount || 0) > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Diskon</span>
              <span>
                -{new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(checkoutData.discount)}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(checkoutData.total || 0)}
          </span>
        </div>

        <div className="pt-4 border-t">
          <div className="text-center text-xs text-gray-500">
            <div className="flex items-center justify-center gap-4">
              <span>Pembayaran aman</span>
              <span>Pengiriman terpercaya</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Checkout Page Component
export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      kecamatan: 'Menteng',
      kotaKabupaten: 'Jakarta Pusat',
      kodePos: '10310',
      catatan: ''
    }
  });

  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Keranjang', href: '/cart' },
    { label: 'Checkout', href: null }
  ];

  useEffect(() => {
    async function initializeCheckout() {
      try {
        // Load checkout data from sessionStorage
        const savedData = sessionStorage.getItem('checkoutData');
        if (!savedData) {
          router.push('/cart');
          return;
        }

        const parsed = JSON.parse(savedData);
        setCheckoutData(parsed);

        // Get current user data
        const userResult = await getCurrentUser();
        if (userResult.success) {
          setUserData(userResult.data);
        } else {
          setServerError('Anda harus login untuk melakukan checkout');
        }

      } catch (error) {
        console.error('Error initializing checkout:', error);
        setServerError('Terjadi kesalahan saat memuat data checkout');
      } finally {
        setIsLoading(false);
      }
    }

    initializeCheckout();
  }, [router]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      // Create FormData for server action
      const formData = new FormData();
      formData.append('kecamatan', data.kecamatan);
      formData.append('kotaKabupaten', data.kotaKabupaten);
      formData.append('kodePos', data.kodePos);
      formData.append('catatan', data.catatan);
      formData.append('checkoutData', JSON.stringify(checkoutData));

      // Call server action
      const result = await createOrderAction(formData);

      // Handle validation errors
      if (result?.success === false) {
        setServerError(result.error || 'Terjadi kesalahan saat membuat order');
        setIsSubmitting(false);
      }
      // Server action akan redirect ke halaman konfirmasi jika berhasil

    } catch (error) {
      // Handle redirect errors (this is normal behavior)
      if (error.digest?.startsWith('NEXT_REDIRECT')) {
        // This is a redirect, let it happen
        return;
      }

      console.error('Checkout error:', error);
      setServerError('Terjadi kesalahan server. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading checkout data...</p>
        </div>
      </div>
    );
  }

  if (serverError && !userData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4">
            <CheckCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{serverError}</p>
          <Button onClick={() => router.push('/cart')}>
            Kembali ke Keranjang
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}

        {/* Page Header */}
        <div className="mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Keranjang
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Lengkapi informasi pengiriman untuk menyelesaikan pesanan Anda
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{serverError}</p>
          </div>
        )}

        {/* Checkout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ReadOnlyCustomerInfo userData={userData} />
            <CheckoutForm
              form={form}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              checkoutData={checkoutData}
            />
            <FixedShippingPayment />
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <OrderSummary checkoutData={checkoutData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}