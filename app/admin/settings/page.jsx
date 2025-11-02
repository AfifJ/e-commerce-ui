"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Settings } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "E-Commerce Admin",
    siteEmail: "admin@example.com",
    sitePhone: "+62 21 1234 5678",
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlert: true,
    newOrderAlert: true,
    paymentReminder: false
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    // Add save logic here
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage system settings and preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteEmail">Site Email</Label>
              <Input
                id="siteEmail"
                type="email"
                value={settings.siteEmail}
                onChange={(e) => handleInputChange("siteEmail", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sitePhone">Site Phone</Label>
              <Input
                id="sitePhone"
                value={settings.sitePhone}
                onChange={(e) => handleInputChange("sitePhone", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <div className="text-sm text-gray-500">Receive email alerts</div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <div className="text-sm text-gray-500">Receive SMS alerts</div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={() => handleToggle("smsNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Stock Alert</Label>
                <div className="text-sm text-gray-500">Alert when inventory is low</div>
              </div>
              <Switch
                checked={settings.lowStockAlert}
                onCheckedChange={() => handleToggle("lowStockAlert")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Order Alert</Label>
                <div className="text-sm text-gray-500">Alert for new orders</div>
              </div>
              <Switch
                checked={settings.newOrderAlert}
                onCheckedChange={() => handleToggle("newOrderAlert")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Payment Reminder</Label>
                <div className="text-sm text-gray-500">Send payment reminders</div>
              </div>
              <Switch
                checked={settings.paymentReminder}
                onCheckedChange={() => handleToggle("paymentReminder")}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <div className="text-sm text-gray-500">Put site in maintenance mode</div>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={() => handleToggle("maintenanceMode")}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}