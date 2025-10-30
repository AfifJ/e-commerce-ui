"use client";

import Link from "next/link";
import { footerLinks, socialLinks, paymentMethods, shippingPartners } from "@/data/mock-data";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Music,
  Twitter,
  CreditCard,
  Wallet,
  Package,
  Truck
} from "lucide-react";

// Icon mapping for social links
const socialIconMap = {
  Camera: Instagram,
  MessageCircle: MessageCircle,
  Music: Music,
  Twitter: Twitter,
  Facebook: Facebook
};

// Icon mapping for payment methods
const paymentIconMap = {
  CreditCard: CreditCard,
  Wallet: Wallet
};

// Icon mapping for shipping partners
const shippingIconMap = {
  Package: Package,
  Truck: Truck
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">PREMIUM</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Temukan produk berkualitas tinggi dengan harga terbaik. Kami menyediakan berbagai kebutuhan Anda dengan jaminan keaslian dan pelayanan terbaik.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5" />
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5" />
                  <span>support@premium.com</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Ikuti Kami</h4>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = socialIconMap[social.icon];
                    return (
                      <Link
                        key={social.name}
                        href={social.href}
                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-5 h-5" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4">{footerLinks.company.title}</h4>
              <ul className="space-y-2">
                {footerLinks.company.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="font-semibold mb-4">{footerLinks.help.title}</h4>
              <ul className="space-y-2">
                {footerLinks.help.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policy Links */}
            <div>
              <h4 className="font-semibold mb-4">{footerLinks.policy.title}</h4>
              <ul className="space-y-2">
                {footerLinks.policy.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Payment & Shipping */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div>
              <h4 className="font-semibold mb-4">Metode Pembayaran</h4>
              <div className="flex items-center gap-4 flex-wrap">
                {paymentMethods.map((method) => {
                  const IconComponent = paymentIconMap[method.logo];
                  return (
                    <div
                      key={method.name}
                      className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center"
                      title={method.name}
                    >
                      <IconComponent className="w-6 h-6 text-gray-300" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Partners */}
            <div>
              <h4 className="font-semibold mb-4">Pengiriman</h4>
              <div className="flex items-center gap-4 flex-wrap">
                {shippingPartners.map((partner) => {
                  const IconComponent = shippingIconMap[partner.logo];
                  return (
                    <div
                      key={partner.name}
                      className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center"
                      title={partner.name}
                    >
                      <IconComponent className="w-6 h-6 text-gray-300" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} PREMIUM. Hak Cipta Dilindungi.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                Syarat & Ketentuan
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                Kebijakan Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}