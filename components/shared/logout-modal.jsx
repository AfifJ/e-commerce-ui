"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, LogOut, AlertTriangle } from "lucide-react";

export function LogoutModal({
  isOpen,
  onOpenChange,
  onLogout,
  isLoading = false
}) {
  const handleLogout = async () => {
    try {
      await onLogout();
      // Dialog will be closed by parent component after successful logout
    } catch (error) {
      // Error will be handled by parent component and shown as toast
      console.error("Logout error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-orange-600" />
            Konfirmasi Logout
          </DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin keluar dari akun Anda?
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0" />
          <p className="text-sm text-orange-800">
            Setelah logout, Anda perlu login kembali untuk mengakses akun Anda.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Keluar...
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Ya, Keluar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}