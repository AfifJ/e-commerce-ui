"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authClient } from "@/lib/auth-client";
import { formatUserWithRole } from "@/lib/role-utils";
import { toast } from "sonner";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      // Actions
      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      setUser: (user) =>
        set({
          user: formatUserWithRole(user),
          isAuthenticated: !!user,
          error: null
        }),

      // Check authentication status
      checkAuth: async () => {
        try {
          set({ isLoading: true, error: null });

          const session = await authClient.getSession();

          if (session.data) {
            set({
              user: formatUserWithRole(session.data.user),
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false
            });
          }
        } catch (err) {
          console.error("Auth check failed:", err);
          set({
            error: err.message,
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      },

      // Login function
      login: async (email, password, rememberMe = false) => {
        try {
          set({ isLoading: true, error: null });

          const result = await authClient.signIn.email({
            email,
            password,
            rememberMe,
          });

          if (result.error) {
            set({
              error: result.error.message,
              isLoading: false
            });
            toast.error("Login gagal. " + result.error.message);
            return { success: false, error: result.error.message };
          }

          set({
            user: formatUserWithRole(result.data.user),
            isAuthenticated: true,
            isLoading: false
          });

          toast.success("Login berhasil! Selamat datang kembali");

          return { success: true, data: result.data };
        } catch (err) {
          console.error("Login failed:", err);
          const errorMessage = err.message || "Login gagal. Silakan coba lagi.";
          set({
            error: errorMessage,
            isLoading: false
          });
          toast.error(errorMessage);
          return { success: false, error: errorMessage };
        }
      },

      // Register function
      register: async (userData) => {
        try {
          set({ isLoading: true, error: null });

          const { username, name, email, password, phone } = userData;

          const result = await authClient.signUp.email({
            username,
            name,
            email,
            password,
            phone,
          });

          if (result.error) {
            set({
              error: result.error.message,
              isLoading: false
            });
            toast.error("Registrasi gagal. " + result.error.message);
            return { success: false, error: result.error.message };
          }

          set({ isLoading: false });
          toast.success("Registrasi berhasil! Silakan login untuk melanjutkan");
          return { success: true, data: result.data };
        } catch (err) {
          console.error("Registration failed:", err);
          const errorMessage = err.message || "Registrasi gagal. Silakan coba lagi.";
          set({
            error: errorMessage,
            isLoading: false
          });
          toast.error(errorMessage);
          return { success: false, error: errorMessage };
        }
      },

      // Logout function
      logout: async () => {
        try {
          set({ isLoading: true });

          await authClient.signOut();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });

          // Show success toast
          toast.success("Anda berhasil keluar dari akun");

          return { success: true };
        } catch (err) {
          console.error("Logout failed:", err);
          const errorMessage = "Gagal keluar dari akun. Silakan coba lagi.";

          set({
            error: errorMessage,
            isLoading: false
          });

          // Show error toast
          toast.error(errorMessage);

          return { success: false, error: errorMessage };
        }
      },

      // Update user profile
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData }
          });
        }
      },

      // Get redirect path based on user role
      getRedirectPath: (role) => {
        switch (role) {
          case "admin":
            return "/admin/dashboard";
          case "vendor":
            return "/vendor/dashboard";
          case "sales":
            return "/sales/dashboard";
          case "mitra":
            return "/mitra/dashboard";
          case "customer":
          default:
            return "/account";
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist user data and authentication state
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for common state combinations
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);

// Hooks for role-based access
export const useRoleAuth = (allowedRoles = []) => {
  const user = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  const hasAccess = isAuthenticated &&
    (!allowedRoles.length || allowedRoles.includes(user?.role));

  return {
    hasAccess,
    user,
    isAuthenticated,
    role: user?.role,
  };
};

export const useIsAdmin = () => useRoleAuth(['admin']);
export const useIsVendor = () => useRoleAuth(['vendor']);
export const useIsCustomer = () => useRoleAuth(['customer']);

// Combined hook for convenience (similar to original useAuth)
export function useAuth() {
  const user = useAuthUser();
  const isLoading = useAuthLoading();
  const error = useAuthError();
  const isAuthenticated = useIsAuthenticated();

  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const logout = useAuthStore((state) => state.logout);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const updateUser = useAuthStore((state) => state.updateUser);
  const clearError = useAuthStore((state) => state.clearError);
  const getRedirectPath = useAuthStore((state) => state.getRedirectPath);

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
    checkAuth,
    updateUser,
    clearError,
    getRedirectPath,
  };
}