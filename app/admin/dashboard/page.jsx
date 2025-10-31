"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/auth-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  Shield,
  Activity,
  BarChart3,
  FileText,
  AlertCircle
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    newUsers: 0
  });

  useEffect(() => {
    // Mock data loading
    const loadStats = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStats({
        totalUsers: 1247,
        totalOrders: 3421,
        totalProducts: 156,
        totalRevenue: 125430000,
        pendingOrders: 23,
        newUsers: 47
      });
    };

    loadStats();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-red-500" />
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-xs text-slate-400">E-Commerce Management System</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-400 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Selamat datang kembali, {user?.name}!
          </h2>
          <p className="text-slate-600">
            Kelola e-commerce platform dari dashboard administrator
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +{stats.newUsers} pengguna baru bulan ini
              </p>
            </CardContent>
          </Card>

          {/* Total Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <AlertCircle className="inline w-3 h-3 mr-1 text-amber-500" />
                {stats.pendingOrders} menunggu konfirmasi
              </p>
            </CardContent>
          </Card>

          {/* Total Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                <BarChart3 className="inline w-3 h-3 mr-1" />
                Semua kategori aktif
              </p>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(stats.totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                <Activity className="inline w-3 h-3 mr-1" />
                Tahun berjalan 2024
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Manajemen Sistem
              </CardTitle>
              <CardDescription>
                Pengaturan dan konfigurasi sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Kelola Pengguna
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Package className="w-4 h-4 mr-2" />
                Kelola Produk
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Laporan & Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Aktivitas Terkini
              </CardTitle>
              <CardDescription>
                Log aktivitas sistem terbaru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">User baru terdaftar</span>
                  <span className="text-slate-400">2 menit lalu</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Pesanan #1234 dikonfirmasi</span>
                  <span className="text-slate-400">5 menit lalu</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Produk ditambahkan</span>
                  <span className="text-slate-400">12 menit lalu</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Sistem backup selesai</span>
                  <span className="text-slate-400">1 jam lalu</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Shield className="w-5 h-5" />
              Keamanan & Privasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700">
              Anda sedang mengakses area administrator. Semua aktivitas akan dicatat dan dipantau untuk keamanan sistem.
              Pastikan Anda logout setelah selesai menggunakan dashboard ini.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}