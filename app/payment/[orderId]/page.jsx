"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaymentTimer } from "@/app/checkout/components/payment-timer";
import {
  ArrowLeft,
  Smartphone,
  QrCode,
  Copy,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { getOrderDetails, checkPaymentStatusAction, generateQRISAction } from "@/app/checkout/actions/checkout";

// QR Code Display Component
function QRCodeDisplay({ qrisData, order, onRefresh }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyQRIS = async () => {
    try {
      await navigator.clipboard.writeText(qrisData?.qrCode || '');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy QRIS code:', error);
    }
  };

  const handleDownloadQR = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = qrisData?.qrCode || '';
    link.download = `QRIS-${order.id}.png`;
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          QR Code Pembayaran
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* QR Code Image */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
              {qrisData?.qrCode ? (
                <img
                  src={qrisData.qrCode}
                  alt="QRIS Payment"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Loading QR Code...</p>
                </div>
              )}
            </div>
            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="absolute -top-2 -right-2 bg-white shadow-md"
            >
              <RefreshCw className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="text-center space-y-2">
          <h3 className="font-medium text-gray-900">Cara Pembayaran:</h3>
          <ol className="text-sm text-gray-600 space-y-1 text-left max-w-xs mx-auto">
            <li>1. Buka aplikasi e-wallet atau mobile banking</li>
            <li>2. Pilih menu "QRIS" atau "Scan QR"</li>
            <li>3. Scan QR code di atas</li>
            <li>4. Konfirmasi pembayaran</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleCopyQRIS}
            className="flex items-center gap-2"
          >
            {copySuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin QR</span>
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadQR}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Order Summary Component
function PaymentOrderSummary({ order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detail Pembayaran</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Order ID</span>
            <span className="font-medium text-gray-900">{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Jumlah Produk</span>
            <span className="font-medium text-gray-900">{order.items.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Metode Pembayaran</span>
            <span className="font-medium text-gray-900">{order.payment}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(order.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Biaya Pengiriman</span>
            <span className="font-medium text-gray-900">
              {order.shippingCost === 0
                ? 'GRATIS'
                : new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                  }).format(order.shippingCost)}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Diskon</span>
              <span>
                -{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                  }).format(order.discount)}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total Pembayaran</span>
          <span className="text-xl font-bold text-blue-600">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(order.total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// Help Section Component
function HelpSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Bantuan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Butuh bantuan?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Pastikan QR code terlihat jelas</li>
            <li>• Periksa koneksi internet Anda</li>
            <li>• Refresh QR code jika tidak dapat di-scan</li>
            <li>• Hubungi customer service jika masalah berlanjut</li>
          </ul>
        </div>

        <div className="pt-3 border-t">
          <Button variant="outline" size="sm" className="w-full">
            <HelpCircle className="w-4 h-4 mr-2" />
            Hubungi Customer Service
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PaymentPage({ params }) {
  const router = useRouter();
  const { orderId } = use(params);

  const [order, setOrder] = useState(null);
  const [qrisData, setQrisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [error, setError] = useState(null);

  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Keranjang', href: '/cart' },
    { label: 'Checkout', href: '/checkout' },
    { label: 'Pembayaran', href: null }
  ];

  // Load order and generate QRIS
  useEffect(() => {
    async function initializePayment() {
      try {
        // Get order details
        const orderResult = await getOrderDetails(orderId);
        if (!orderResult.success) {
          setError(orderResult.error || 'Order tidak ditemukan');
          return;
        }

        setOrder(orderResult.data);

        // Generate QRIS
        const formData = new FormData();
        formData.append('orderId', orderId);
        formData.append('amount', orderResult.data.total.toString());

        const qrisResult = await generateQRISAction(formData);
        if (qrisResult.success) {
          setQrisData(qrisResult.data);
        } else {
          console.error('Failed to generate QRIS:', qrisResult.error);
        }

      } catch (error) {
        console.error('Error initializing payment:', error);
        setError('Terjadi kesalahan saat memuat data pembayaran');
      } finally {
        setIsLoading(false);
      }
    }

    initializePayment();
  }, [orderId]);

  // Check payment status periodically
  useEffect(() => {
    if (!order || paymentStatus !== 'pending') return;

    const interval = setInterval(async () => {
      try {
        const result = await checkPaymentStatusAction(orderId);
        if (result.success) {
          const status = result.data.status;
          setPaymentStatus(status);

          // Redirect if payment is successful
          if (status === 'paid') {
            clearInterval(interval);
            router.push(`/checkout/success?orderId=${orderId}`);
          } else if (status === 'expired') {
            clearInterval(interval);
            // Will handle expired state
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [order, paymentStatus, orderId, router]);

  // Handle QRIS refresh
  const handleRefreshQR = async () => {
    if (!order || isRefreshing) return;

    setIsRefreshing(true);
    try {
      const formData = new FormData();
      formData.append('orderId', orderId);
      formData.append('amount', order.total.toString());

      const result = await generateQRISAction(formData);
      if (result.success) {
        setQrisData(result.data);
      }
    } catch (error) {
      console.error('Error refreshing QRIS:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle payment expiry
  const handlePaymentExpire = () => {
    setPaymentStatus('expired');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading payment data...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Order tidak ditemukan'}</p>
          <Button onClick={() => router.push('/cart')}>
            Kembali ke Keranjang
          </Button>
        </div>
      </div>
    );
  }

  // Handle expired payment
  if (paymentStatus === 'expired') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Pembayaran Kadaluarsa</h2>
              <p className="text-gray-600 mb-4">
                Waktu pembayaran telah habis. Silakan membuat order baru.
              </p>
              <Button onClick={() => router.push('/cart')}>
                Buat Order Baru
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb - Outside container */}
      <Breadcrumb items={breadcrumbItems} className="bg-white border-b" />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link href="/checkout">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Checkout
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Pembayaran QRIS</h1>
          <p className="text-gray-600 mt-2">
            Selesaikan pembayaran dalam 2 jam untuk mengkonfirmasi order Anda
          </p>
        </div>

        {/* Payment Timer */}
        <div className="mb-6 max-w-md mx-auto">
          <PaymentTimer
            initialTime={7200} // 2 hours
            onExpire={handlePaymentExpire}
          />
        </div>

        {/* Payment Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <QRCodeDisplay
              qrisData={qrisData}
              order={order}
              onRefresh={handleRefreshQR}
            />

            {/* Payment Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Panduan Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">E-Wallet</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>Gopay:</strong> Buka Gopay → Scan QR</li>
                      <li>• <strong>OVO:</strong> Buka OVO → Scan QR</li>
                      <li>• <strong>Dana:</strong> Buka Dana → Scan QR</li>
                      <li>• <strong>ShopeePay:</strong> Buka ShopeePay → Scan QR</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Mobile Banking</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>BCA:</strong> Mobile BCA → m-Transfer</li>
                      <li>• <strong>Mandiri:</strong> Livin' → Scan QR</li>
                      <li>• <strong>BNI:</strong> BNI Mobile → Scan QR</li>
                      <li>• <strong>BRI:</strong> BRImo → BRIVA → Scan QR</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <PaymentOrderSummary order={order} />
            <HelpSection />
          </div>
        </div>
      </div>
    </div>
  );
}