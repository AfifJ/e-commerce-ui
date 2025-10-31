"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/shared/auth/auth-layout";
import FormInput from "@/components/shared/auth/form-input";
import PasswordInput from "@/components/shared/auth/password-input";
import SocialButton from "@/components/shared/auth/social-button";
import { useAuth } from "@/stores/auth-store";
import { loginSchema } from "./schema/login";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, isAuthenticated, getRedirectPath, clearError, error } = useAuth();

  const [socialLoading, setSocialLoading] = useState(null);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  // Get success message from URL params
  const successMessage = searchParams.get('message');

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
      const result = await login(
        data.email,
        data.password,
        data.rememberMe
      );

      if (!result.success) {
        // Set root error untuk ditampilkan di form
        form.setError('root', { message: result.error });
        return;
      }

      // Redirect berdasarkan role user
      const redirectPath = getRedirectPath(result.data.user?.role);
      router.push(redirectPath);
    } catch (error) {
      console.error("Login error:", error);
      form.setError('root', { message: error.message || "Login gagal. Silakan coba lagi." });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Success Message */}
        {successMessage && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            {...form.register('email')}
            error={form.formState.errors.email?.message}
            placeholder="nama@email.com"
            disabled={isLoading}
          />

          <PasswordInput
            label="Password"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
            placeholder="Masukkan password Anda"
            disabled={isLoading}
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              {...form.register('rememberMe')}
              checked={form.watch('rememberMe')}
              onCheckedChange={(checked) =>
                form.setValue('rememberMe', checked)
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

        {/* General Error */}
        {form.formState.errors.root && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
          </div>
        )}

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