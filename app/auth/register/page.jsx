"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/shared/auth/auth-layout";
import FormInput from "@/components/shared/auth/form-input";
import PasswordInput from "@/components/shared/auth/password-input";
import SocialButton from "@/components/shared/auth/social-button";
import { useAuth } from "@/stores/auth-store";
import { registerSchema } from "./schema/register";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, isAuthenticated, clearError, error } = useAuth();

  const [socialLoading, setSocialLoading] = useState(null);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false
    }
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated, router]);

  // Clear form errors when user starts typing
  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.errors.root) {
        form.clearErrors('root');
      }
      if (error) {
        clearError();
      }
    });
    return () => subscription.unsubscribe();
  }, [form, error, clearError]);

  const onSubmit = async (data) => {
    try {
      const result = await register({
        username: data.username,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      if (!result.success) {
        form.setError('root', {
          message: result.error || "Pendaftaran gagal. Silakan coba lagi."
        });
        return;
      }

      // Redirect ke login dengan pesan sukses
      router.push('/auth/login?message=Registrasi berhasil, silakan login');
    } catch (error) {
      console.error("Registration error:", error);
      form.setError('root', {
        message: "Terjadi kesalahan. Silakan coba lagi."
      });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* General Error */}
        {form.formState.errors.root && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <FormInput
            label="Username"
            type="text"
            {...form.register('username')}
            error={form.formState.errors.username?.message}
            placeholder="john_doe"
            disabled={isLoading}
          />
          <FormInput
            label="Nama Lengkap"
            type="text"
            {...form.register('name')}
            error={form.formState.errors.name?.message}
            placeholder="John Doe"
            disabled={isLoading}
          />

          <FormInput
            label="Email"
            type="email"
            {...form.register('email')}
            error={form.formState.errors.email?.message}
            placeholder="nama@email.com"
            disabled={isLoading}
          />

          <FormInput
            label="Nomor HP"
            type="tel"
            {...form.register('phone')}
            error={form.formState.errors.phone?.message}
            placeholder="+62 812-3456-7890"
            disabled={isLoading}
          />

          <PasswordInput
            label="Password"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
            placeholder="Minimal 8 karakter"
            showStrengthIndicator={false}
            disabled={isLoading}
          />

          <PasswordInput
            label="Konfirmasi Password"
            {...form.register('confirmPassword')}
            error={form.formState.errors.confirmPassword?.message}
            placeholder="Ketik ulang password"
            disabled={isLoading}
          />
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToTerms"
              {...form.register('agreeToTerms')}
              checked={form.watch('agreeToTerms')}
              onCheckedChange={(checked) =>
                form.setValue('agreeToTerms', checked)
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
          {form.formState.errors.agreeToTerms && (
            <p className="text-xs text-destructive">{form.formState.errors.agreeToTerms.message}</p>
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