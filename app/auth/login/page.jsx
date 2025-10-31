"use client";

import { useState } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/shared/auth/auth-layout";
import FormInput from "@/components/shared/auth/form-input";
import PasswordInput from "@/components/shared/auth/password-input";
import SocialButton from "@/components/shared/auth/social-button";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // TODO: Implement actual login logic
      console.log("Login data:", formData);

      // Simulate successful login
      alert("Login berhasil! (Ini adalah simulasi)");

      // TODO: Redirect to dashboard or previous page

    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        general: "Email atau password salah. Silakan coba lagi."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);

    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));

      // TODO: Implement actual OAuth flow
      console.log(`Login with ${provider}`);

      // Simulate successful social login
      alert(`Login dengan ${provider} berhasil! (Ini adalah simulasi)`);

      // TODO: Redirect to dashboard or previous page

    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <AuthLayout
      title="Masuk ke Akun Anda"
      subtitle="Selamat datang kembali! Silakan masuk untuk melanjutkan"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors.general && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{errors.general}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="nama@email.com"
            required
            disabled={isLoading}
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            placeholder="Masukkan password Anda"
            required
            disabled={isLoading}
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, rememberMe: checked }))
              }
              disabled={isLoading}
            />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ingat saya
            </label>
          </div>

          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:text-primary/90 transition-colors"
          >
            Lupa password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Memproses...</span>
            </div>
          ) : (
            "Masuk"
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Atau masuk dengan
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <SocialButton
            provider="google"
            onClick={handleSocialLogin}
            loading={socialLoading === "google"}
            disabled={isLoading}
          />

          <SocialButton
            provider="facebook"
            onClick={handleSocialLogin}
            loading={socialLoading === "facebook"}
            disabled={isLoading}
          />
        </div>
      </form>
    </AuthLayout>
  );
}