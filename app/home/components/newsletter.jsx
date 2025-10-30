"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail("");

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Dapatkan Penawaran Eksklusif!
          </h2>
          <p className="text-primary-foreground text-lg mb-8 opacity-90">
            Diskon 10% untuk pendaftar baru. Dapatkan info promo dan produk terbaru langsung di inbox Anda.
          </p>

          {/* Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 bg-white/90 border-white/20 text-gray-900 placeholder-gray-500"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 bg-white text-primary hover:bg-gray-100 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Mendaftar...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Berlangganan
                  </div>
                )}
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 text-primary-foreground">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-semibold">
                Terima kasih! Email Anda telah terdaftar.
              </span>
            </div>
          )}

          {/* Terms */}
          <p className="text-primary-foreground text-sm mt-4 opacity-70">
            Dengan berlangganan, Anda setuju dengan{" "}
            <a href="/privacy" className="underline hover:text-primary-foreground transition-colors">
              Kebijakan Privasi
            </a>{" "}
            kami.
          </p>
        </div>
      </div>
    </section>
  );
}