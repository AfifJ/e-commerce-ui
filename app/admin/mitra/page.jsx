"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/app/admin/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Loader2,
  Handshake,
  MapPin,
  Building,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { getHotels, createHotel, updateHotel, deleteHotel, toggleHotelStatus, getMitraUsers } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

function StatusBadge({ isActive }) {
  const statusConfig = {
    true: "bg-green-100 text-green-800",
    false: "bg-gray-100 text-gray-800"
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[isActive] || "bg-gray-100 text-gray-800"}`}>
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

function CommissionBadge({ commissionRate }) {
  const rate = parseFloat(commissionRate || 0);
  const getColor = () => {
    if (rate >= 15) return "bg-purple-100 text-purple-800";
    if (rate >= 10) return "bg-blue-100 text-blue-800";
    if (rate >= 5) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
      {rate}%
    </span>
  );
}

function ViewHotelModal({ hotel, isOpen, onClose }) {
  if (!hotel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Hotel Details
          </DialogTitle>
          <DialogDescription>
            Complete information about {hotel.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hotel Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Hotel Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Hotel Code</Label>
                <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{hotel.code}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <div className="mt-1">
                  <StatusBadge isActive={hotel.isActive} />
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Hotel Name</Label>
              <p className="text-sm font-medium">{hotel.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Address</Label>
              <p className="text-sm flex items-start gap-1">
                <MapPin className="w-3 h-3 mt-0.5 text-gray-400 flex-shrink-0" />
                {hotel.address}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Phone</Label>
                <p className="text-sm flex items-center gap-1">
                  <Phone className="w-3 h-3 text-gray-400" />
                  {hotel.phone}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Email</Label>
                <p className="text-sm flex items-center gap-1">
                  <Mail className="w-3 h-3 text-gray-400" />
                  {hotel.email || 'Not provided'}
                </p>
              </div>
            </div>
            {hotel.contactPerson && (
              <div>
                <Label className="text-sm font-medium text-gray-500">Contact Person</Label>
                <p className="text-sm flex items-center gap-1">
                  <User className="w-3 h-3 text-gray-400" />
                  {hotel.contactPerson}
                </p>
              </div>
            )}
          </div>

          {/* Owner Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Owner Information</h3>
            {hotel.owner ? (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Assigned Owner</span>
                </div>
                <p className="text-sm text-blue-800">{hotel.owner.name}</p>
                <p className="text-xs text-blue-600">{hotel.owner.email}</p>
              </div>
            ) : (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500 italic">No owner assigned</p>
              </div>
            )}
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Commission Rate</Label>
                <div className="mt-1">
                  <CommissionBadge commissionRate={hotel.commissionRate} />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">QR Code</Label>
                <p className="text-sm">
                  {hotel.qrCodeUrl ? (
                    <a href={hotel.qrCodeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View QR Code
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">System Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Created At</Label>
                <p className="text-sm">
                  {new Date(hotel.createdAt).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                <p className="text-sm">
                  {new Date(hotel.updatedAt).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function HotelForm({ hotel, onSave, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    contactPerson: "",
    commissionRate: "10.00",
    isActive: true,
    qrCodeUrl: "",
    ownerId: "none"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mitraUsers, setMitraUsers] = useState([]);

  useEffect(() => {
    fetchMitraUsers();
  }, []);

  useEffect(() => {
    if (hotel) {
      setFormData({
        code: hotel.code || "",
        name: hotel.name || "",
        address: hotel.address || "",
        phone: hotel.phone || "",
        email: hotel.email || "",
        contactPerson: hotel.contactPerson || "",
        commissionRate: hotel.commissionRate || "10.00",
        isActive: hotel.isActive ?? true,
        qrCodeUrl: hotel.qrCodeUrl || "",
        ownerId: hotel.ownerId || "none"
      });
    } else {
      setFormData({
        code: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        contactPerson: "",
        commissionRate: "10.00",
        isActive: true,
        qrCodeUrl: "",
        ownerId: "none"
      });
    }
  }, [hotel]);

  const fetchMitraUsers = async () => {
    try {
      const result = await getMitraUsers();
      if (result.success) {
        setMitraUsers(result.data);
      }
    } catch (error) {
      console.error('Error fetching mitra users:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const hotelData = {
        ...formData,
        id: hotel?.id || null,
        createdAt: hotel?.createdAt || null,
        updatedAt: hotel?.updatedAt || null,
        ownerId: formData.ownerId === "none" ? null : formData.ownerId
      };

      const result = await onSave(hotelData);

      if (result.success) {
        toast.success(hotel ? "Hotel updated successfully" : "Hotel created successfully");
        setFormData({
          code: "",
          name: "",
          address: "",
          phone: "",
          email: "",
          contactPerson: "",
          commissionRate: "10.00",
          isActive: true,
          qrCodeUrl: "",
          ownerId: "none"
        });
      } else {
        toast.error(result.error || "Failed to save hotel");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {hotel ? "Edit Hotel" : "Add New Hotel"}
          </DialogTitle>
          <DialogDescription>
            {hotel ? "Update hotel information below." : "Create a new hotel partner."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Hotel Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                placeholder="Enter hotel code"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Hotel Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter hotel name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange("contactPerson", e.target.value)}
              placeholder="Enter contact person name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerId">Hotel Owner (Mitra)</Label>
            <Select value={formData.ownerId} onValueChange={(value) => handleInputChange("ownerId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select hotel owner (mitra user)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No owner assigned</SelectItem>
                {mitraUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} - {user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter complete address"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="commissionRate">Commission Rate (%) *</Label>
              <Input
                id="commissionRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.commissionRate}
                onChange={(e) => handleInputChange("commissionRate", e.target.value)}
                placeholder="Enter commission rate"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qrCodeUrl">QR Code URL</Label>
              <Input
                id="qrCodeUrl"
                value={formData.qrCodeUrl}
                onChange={(e) => handleInputChange("qrCodeUrl", e.target.value)}
                placeholder="Enter QR code URL"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange("isActive", checked)}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {hotel ? "Update" : "Create"} Hotel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function MitraPage() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [viewingHotel, setViewingHotel] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setIsLoading(true);
    try {
      const result = await getHotels();
      if (result.success) {
        const hotelsWithActions = result.data.map(hotel => ({
          ...hotel,
          actions: [
            { label: "View", icon: Eye, onClick: () => handleViewHotel(hotel) },
            { label: "Edit", icon: Edit, onClick: () => handleEditHotel(hotel) },
            { label: "Delete", icon: Trash2, onClick: () => handleDeleteHotel(hotel), destructive: true }
          ]
        }));
        setHotels(hotelsWithActions);
      } else {
        toast.error(result.error || "Failed to fetch hotels");
      }
    } catch (error) {
      toast.error("Failed to fetch hotels");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHotel = () => {
    setEditingHotel(null);
    setIsFormOpen(true);
  };

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setIsFormOpen(true);
  };

  const handleSaveHotel = async (hotelData) => {
    let result;

    if (editingHotel) {
      result = await updateHotel(editingHotel.id, hotelData);
    } else {
      result = await createHotel(hotelData);
    }

    if (result.success) {
      await fetchHotels();
      setIsFormOpen(false);
      setEditingHotel(null);
      return result;
    }

    return result;
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingHotel(null);
  };

  const handleDeleteHotel = async (hotel) => {
    if (confirm(`Are you sure you want to delete hotel "${hotel.name}"?`)) {
      try {
        const result = await deleteHotel(hotel.id);
        if (result.success) {
          toast.success("Hotel deleted successfully");
          await fetchHotels();
        } else {
          toast.error(result.error || "Failed to delete hotel");
        }
      } catch (error) {
        toast.error("Failed to delete hotel");
      }
    }
  };

  const handleViewHotel = (hotel) => {
    setViewingHotel(hotel);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingHotel(null);
  };

  const handleToggleStatus = async (hotel) => {
    try {
      const result = await toggleHotelStatus(hotel.id);
      if (result.success) {
        toast.success(`Hotel ${result.data.isActive ? 'activated' : 'deactivated'} successfully`);
        await fetchHotels();
      } else {
        toast.error(result.error || "Failed to update hotel status");
      }
    } catch (error) {
      toast.error("Failed to update hotel status");
    }
  };

  const columns = [
    {
      key: "code",
      title: "Hotel Info",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Building className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-gray-500">{value}</div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {row.address?.substring(0, 30)}...
            </div>
          </div>
        </div>
      )
    },
    {
      key: "contact",
      title: "Contact",
      render: (_, row) => (
        <div className="space-y-1">
          {row.email && (
            <div className="flex items-center gap-1 text-sm">
              <Mail className="w-3 h-3 text-gray-400" />
              {row.email}
            </div>
          )}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Phone className="w-3 h-3 text-gray-400" />
            {row.phone}
          </div>
          {row.contactPerson && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <User className="w-3 h-3 text-gray-400" />
              {row.contactPerson}
            </div>
          )}
        </div>
      )
    },
    {
      key: "owner",
      title: "Owner",
      render: (value) => (
        <div className="space-y-1">
          {value ? (
            <>
              <div className="flex items-center gap-1 text-sm font-medium">
                <User className="w-3 h-3 text-gray-400" />
                {value.name}
              </div>
              <div className="text-xs text-gray-500">{value.email}</div>
            </>
          ) : (
            <div className="text-xs text-gray-400 italic">No owner assigned</div>
          )}
        </div>
      )
    },
    {
      key: "commissionRate",
      title: "Commission",
      render: (value) => <CommissionBadge commissionRate={value} />
    },
    {
      key: "isActive",
      title: "Status",
      render: (value) => <StatusBadge isActive={value} />
    },
    {
      key: "createdAt",
      title: "Created At",
      render: (value) => (
        <div className="text-sm">
          {new Date(value).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Handshake className="w-6 h-6" />
            Hotel Partners Management
          </h1>
          <p className="text-gray-500">Manage hotel partners and commission rates</p>
        </div>
        <Button onClick={handleAddHotel} disabled={isLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Add Hotel
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading hotels...</span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={hotels}
          searchable={true}
          emptyMessage="No hotels found"
        />
      )}

      <HotelForm
        hotel={editingHotel}
        onSave={handleSaveHotel}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />

      <ViewHotelModal
        hotel={viewingHotel}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />
    </div>
  );
}