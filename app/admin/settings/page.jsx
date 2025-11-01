"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Badge,
} from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Settings,
  DollarSign,
  CreditCard,
  Shield,
  Bell,
  Mail,
  Smartphone,
  Globe,
  Palette,
  Users,
  Building,
  FileText,
  Database,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Upload,
  Key,
  Lock
} from "lucide-react";

// Mock settings data
const mockSettings = {
  general: {
    siteName: "Bahana UMKM",
    siteDescription: "Platform UMKM Terpadu",
    siteEmail: "info@bahana-umkm.com",
    sitePhone: "+62 812-3456-7890",
    siteAddress: "Jakarta, Indonesia",
    timezone: "Asia/Jakarta",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    language: "id"
  },
  commission: {
    salesCommissionRate: 10,
    hotelCommissionRate: 5,
    vendorPaymentCycle: 30,
    commissionPaymentCycle: 15,
    minimumCommission: 10000
  },
  payment: {
    adminFee: 2000,
    shippingCost: 5000,
    taxRate: 11,
    currency: "IDR",
    autoConfirmOrders: false,
    autoVerifyPayments: false,
    paymentTimeout: 24
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    lowStockAlert: true,
    newOrderAlert: true,
    paymentAlert: true,
    systemAlert: true
  },
  security: {
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireTwoFactor: false,
    autoLogout: false,
    ipWhitelist: [],
    auditLogging: true
  },
  system: {
    maintenanceMode: false,
    debugMode: false,
    apiRateLimit: 1000,
    uploadMaxSize: 10,
    backupSchedule: "daily",
    cacheEnabled: true
  }
};

const paymentGateways = [
  {
    id: "qris",
    name: "QRIS",
    status: "active",
    config: {
      merchantId: "1234567890",
      apiKey: "****-****-****-****",
      environment: "production"
    }
  },
  {
    id: "bca",
    name: "BCA Virtual Account",
    status: "active",
    config: {
      vaNumber: "1234567890",
      companyCode: "12345",
      environment: "production"
    }
  },
  {
    id: "gopay",
    name: "GoPay",
    status: "inactive",
    config: {
      merchantId: "GOPAY123",
      apiKey: "****-****-****-****",
      environment: "sandbox"
    }
  }
];

const shippingMethods = [
  {
    id: "jne",
    name: "JNE Express",
    status: "active",
    cost: 5000,
    estimatedDays: 1
  },
  {
    id: "jnt",
    name: "J&T Express",
    status: "active",
    cost: 7000,
    estimatedDays: 2
  },
  {
    id: "sicepat",
    name: "SiCepat Express",
    status: "inactive",
    cost: 6000,
    estimatedDays: 2
  }
];

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings);
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = async (section) => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    // Show success message
  };

  const handleGatewayToggle = async (gatewayId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-500">Configure your e-commerce platform settings</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Settings
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="commission" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Commission
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            System
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure basic site information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, siteName: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="siteEmail">Site Email</Label>
                  <Input
                    id="siteEmail"
                    type="email"
                    value={settings.general.siteEmail}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, siteEmail: e.target.value }
                    }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.general.siteDescription}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, siteDescription: e.target.value }
                    }))}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="sitePhone">Phone Number</Label>
                  <Input
                    id="sitePhone"
                    value={settings.general.sitePhone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, sitePhone: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="siteAddress">Address</Label>
                  <Input
                    id="siteAddress"
                    value={settings.general.siteAddress}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, siteAddress: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, timezone: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                      <SelectItem value="Asia/Singapore">Asia/Singapore</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, language: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave('general')} disabled={saving}>
                  {saving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commission Settings */}
        <TabsContent value="commission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Commission Settings
              </CardTitle>
              <CardDescription>
                Configure commission rates for sales and hotel partners
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="salesCommission">Sales Commission Rate (%)</Label>
                  <Input
                    id="salesCommission"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.commission.salesCommissionRate}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      commission: { ...prev.commission, salesCommissionRate: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Percentage of sales given to sales person
                  </p>
                </div>
                <div>
                  <Label htmlFor="hotelCommission">Hotel Commission Rate (%)</Label>
                  <Input
                    id="hotelCommission"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.commission.hotelCommissionRate}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      commission: { ...prev.commission, hotelCommissionRate: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Percentage of transaction given to hotel partner
                  </p>
                </div>
                <div>
                  <Label htmlFor="vendorPaymentCycle">Vendor Payment Cycle (days)</Label>
                  <Input
                    id="vendorPaymentCycle"
                    type="number"
                    min="1"
                    max="365"
                    value={settings.commission.vendorPaymentCycle}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      commission: { ...prev.commission, vendorPaymentCycle: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Days before vendor payments are processed
                  </p>
                </div>
                <div>
                  <Label htmlFor="commissionPaymentCycle">Commission Payment Cycle (days)</Label>
                  <Input
                    id="commissionPaymentCycle"
                    type="number"
                    min="1"
                    max="365"
                    value={settings.commission.commissionPaymentCycle}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      commission: { ...prev.commission, commissionPaymentCycle: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Days before commission payments are processed
                  </p>
                </div>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  Changes to commission rates will apply to new transactions only. Existing transactions will continue with the previous rates.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end">
                <Button onClick={() => handleSave('commission')} disabled={saving}>
                  {saving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Settings
              </CardTitle>
              <CardDescription>
                Configure payment methods and processing settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="adminFee">Admin Fee (fixed)</Label>
                  <Input
                    id="adminFee"
                    type="number"
                    min="0"
                    value={settings.payment.adminFee}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      payment: { ...prev.payment, adminFee: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Fixed admin fee per transaction
                  </p>
                </div>
                <div>
                  <Label htmlFor="shippingCost">Default Shipping Cost</Label>
                  <Input
                    id="shippingCost"
                    type="number"
                    min="0"
                    value={settings.payment.shippingCost}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      payment: { ...prev.payment, shippingCost: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Default shipping cost if not specified
                  </p>
                </div>
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.payment.taxRate}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      payment: { ...prev.payment, taxRate: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tax percentage (PPN)
                  </p>
                </div>
                <div>
                  <Label htmlFor="paymentTimeout">Payment Timeout (hours)</Label>
                  <Input
                    id="paymentTimeout"
                    type="number"
                    min="1"
                    max="168"
                    value={settings.payment.paymentTimeout}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      payment: { ...prev.payment, paymentTimeout: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Hours before unverified payments expire
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoConfirmOrders">Auto Confirm Orders</Label>
                    <p className="text-xs text-gray-500">
                      Automatically confirm orders after payment verification
                    </p>
                  </div>
                  <Switch
                    id="autoConfirmOrders"
                    checked={settings.payment.autoConfirmOrders}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      payment: { ...prev.payment, autoConfirmOrders: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoVerifyPayments">Auto Verify Payments</Label>
                    <p className="text-xs text-gray-500">
                      Automatically verify small payments
                    </p>
                  </div>
                  <Switch
                    id="autoVerifyPayments"
                    checked={settings.payment.autoVerifyPayments}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      payment: { ...prev.payment, autoVerifyPayments: checked }
                    }))}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave('payment')} disabled={saving}>
                  {saving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Gateways */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateways</CardTitle>
              <CardDescription>
                Configure payment gateway providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentGateways.map((gateway) => (
                  <div key={gateway.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-medium">{gateway.name}</h3>
                        <p className="text-sm text-gray-500">
                          {gateway.config.environment === 'production' ? 'Production' : 'Sandbox'}
                        </p>
                      </div>
                      <Badge className={gateway.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {gateway.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Switch
                        checked={gateway.status === 'active'}
                        onCheckedChange={() => handleGatewayToggle(gateway.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Methods</CardTitle>
              <CardDescription>
                Configure available shipping options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shippingMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(method.cost)} • {method.estimatedDays} {method.estimatedDays === 1 ? 'day' : 'days'}
                      </p>
                    </div>
                    <Switch
                      checked={method.status === 'active'}
                      onCheckedChange={() => handleGatewayToggle(method.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailNotifications: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send notifications via SMS
                    </p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, smsNotifications: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send push notifications to mobile apps
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, pushNotifications: checked }
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="lowStockAlert">Low Stock Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Alert when products run low on stock
                    </p>
                  </div>
                  <Switch
                    id="lowStockAlert"
                    checked={settings.notifications.lowStockAlert}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, lowStockAlert: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="newOrderAlert">New Order Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Alert when new orders are received
                    </p>
                  </div>
                  <Switch
                    id="newOrderAlert"
                    checked={settings.notifications.newOrderAlert}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, newOrderAlert: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="paymentAlert">Payment Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Alert when payments are received or verified
                    </p>
                  </div>
                  <Switch
                    id="paymentAlert"
                    checked={settings.notifications.paymentAlert}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, paymentAlert: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="systemAlert">System Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Alert for important system events
                    </p>
                  </div>
                  <Switch
                    id="systemAlert"
                    checked={settings.notifications.systemAlert}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, systemAlert: checked }
                    }))}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave('notifications')} disabled={saving}>
                  {saving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security policies and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="1440"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minutes of inactivity before automatic logout
                  </p>
                </div>
                <div>
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    min="1"
                    max="10"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, maxLoginAttempts: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum failed login attempts before lockout
                  </p>
                </div>
                <div>
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    min="6"
                    max="50"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordMinLength: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum number of characters for passwords
                  </p>
                </div>
                <div>
                  <Label htmlFor="apiRateLimit">API Rate Limit (requests/minute)</Label>
                  <Input
                    id="apiRateLimit"
                    type="number"
                    min="1"
                    max="10000"
                    value={settings.security.apiRateLimit}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, apiRateLimit: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum API requests per minute per user
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Features</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="requireTwoFactor">Require Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">
                      Enable 2FA for admin accounts
                    </p>
                  </div>
                  <Switch
                    id="requireTwoFactor"
                    checked={settings.security.requireTwoFactor}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, requireTwoFactor: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="autoLogout">Auto Logout on Browser Close</Label>
                    <p className="text-sm text-gray-500">
                      Automatically log out when browser is closed
                    </p>
                  </div>
                  <Switch
                    id="autoLogout"
                    checked={settings.security.autoLogout}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, autoLogout: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auditLogging">Enable Audit Logging</Label>
                    <p className="text-sm text-gray-500">
                      Log all admin actions for security auditing
                    </p>
                  </div>
                  <Switch
                    id="auditLogging"
                    checked={settings.security.auditLogging}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, auditLogging: checked }
                    }))}
                  />
                </div>
              </div>

              <Alert>
                <Lock className="h-4 w-4" />
                <AlertTitle>Security Notice</AlertTitle>
                <AlertDescription>
                  Changing security settings may affect user access. Ensure you communicate any changes to your team and provide adequate training.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end">
                <Button onClick={() => handleSave('security')} disabled={saving}>
                  {saving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Settings
              </CardTitle>
              <CardDescription>
                Configure system maintenance and performance settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Status</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">
                      Put site in maintenance mode for updates
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.system.maintenanceMode}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      system: { ...prev.system, maintenanceMode: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="debugMode">Debug Mode</Label>
                    <p className="text-sm text-gray-500">
                      Enable debug logging and error details
                    </p>
                  </div>
                  <Switch
                    id="debugMode"
                    checked={settings.system.debugMode}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      system: { ...prev.system, debugMode: checked }
                    }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="uploadMaxSize">Max Upload Size (MB)</Label>
                  <Input
                    id="uploadMaxSize"
                    type="number"
                    min="1"
                    max="100"
                    value={settings.system.uploadMaxSize}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      system: { ...prev.system, uploadMaxSize: Number(e.target.value) }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum file size for uploads
                  </p>
                </div>
                <div>
                  <Label htmlFor="backupSchedule">Backup Schedule</Label>
                  <Select
                    value={settings.system.backupSchedule}
                    onValueChange={(value) => setSettings(prev => ({
                      ...prev,
                      system: { ...prev.system, backupSchedule: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    Frequency of automatic backups
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="cacheEnabled">Enable Caching</Label>
                  <p className="text-sm text-gray-500">
                    Improve performance with caching
                  </p>
                </div>
                <Switch
                  id="cacheEnabled"
                  checked={settings.system.cacheEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    system: { ...prev.system, cacheEnabled: checked }
                  }))}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Backup
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore Backup
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Logs
                  </Button>
                </div>
              </div>

              <Alert>
                <Database className="h-4 w-4" />
                <AlertTitle>System Maintenance</AlertTitle>
                <AlertDescription>
                  System maintenance actions should be performed during off-peak hours. Always create a backup before making significant changes.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end">
                <Button onClick={() => handleSave('system')} disabled={saving}>
                  {saving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}