"use client";

import { useState } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/shared/auth/auth-layout";
import FormInput from "@/components/shared/auth/form-input";
import PasswordInput from "@/components/shared/auth/password-input";
import SocialButton from "@/components/shared/auth/social-button";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
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

    // Name validation
    if (!formData.name) {
      newErrors.name = "Nama wajib diisi";
    } else if (formData.name.length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password harus mengandung huruf besar, huruf kecil, dan angka";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Anda harus menyetujui syarat dan ketentuan";
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
      await new Promise(resolve => setTimeout(resolve, 2500));

      // TODO: Implement actual registration logic
      console.log("Register data:", formData);

      // Simulate successful registration
      alert("Pendaftaran berhasil! Silakan cek email untuk verifikasi (Ini adalah simulasi)");

      // TODO: Redirect to email verification or login page

    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        general: "Pendaftaran gagal. Silakan coba lagi."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setSocialLoading(provider);

    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));

      // TODO: Implement actual OAuth flow
      console.log(`Register with ${provider}`);

      // Simulate successful social registration
      alert(`Pendaftaran dengan ${provider} berhasil! (Ini adalah simulasi)`);

      // TODO: Redirect to dashboard or onboarding

    } catch (error) {
      console.error(`${provider} registration error:`, error);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <AuthLayout
      title="Buat Akun Baru"
      subtitle="Bergabunglah dengan PREMIUM dan nikmati pengalaman berbelanja yang premium"
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
            label="Nama Lengkap"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            placeholder="John Doe"
            required
            disabled={isLoading}
          />

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
            placeholder="Buat password yang kuat"
            showStrengthIndicator={true}
            required
            disabled={isLoading}
          />

          <PasswordInput
            label="Konfirmasi Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            placeholder="Ketik ulang password"
            required
            disabled={isLoading}
          />
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, agreeToTerms: checked }))
              }
              disabled={isLoading}
            />
            <label
              htmlFor="agreeToTerms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Saya menyetujui{" "}
              <Link
                href="/terms"
                className="text-primary hover:text-primary/90 transition-colors underline"
              >
                Syarat dan Ketentuan
              </Link>{" "}
              serta{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/90 transition-colors underline"
              >
                Kebijakan Privasi
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-xs text-destructive">{errors.agreeToTerms}</p>
          )}
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
              <span>Mendaftar...</span>
            </div>
          ) : (
            "Daftar Sekarang"
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Atau daftar dengan
            </span>
          </div>
        </div>

        {/* Social Register Buttons */}
        <div className="space-y-3">
          <SocialButton
            provider="google"
            onClick={handleSocialRegister}
            loading={socialLoading === "google"}
            disabled={isLoading}
          />

          <SocialButton
            provider="facebook"
            onClick={handleSocialRegister}
            loading={socialLoading === "facebook"}
            disabled={isLoading}
          />
        </div>
      </form>
    </AuthLayout>
  );
}