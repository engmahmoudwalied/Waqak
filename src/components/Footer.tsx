"use client";

import { Phone, Mail, MapPin, Globe, Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer
      className="bg-primary text-primary-foreground mt-16"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/waqeak-logo.jpg"
                alt="Waquak Logo"
                width={48}
                height={48}
                className="rounded-lg object-cover"
                itemProp="logo"
              />

              <div>
                <h3 className="text-2xl font-bold" itemProp="name">
                  واقعك - Waquek - Waqak
                </h3>
                <p className="text-primary-foreground/80">
                  {t("programming")}
                </p>
              </div>
            </div>

            <p className="text-primary-foreground/80 mb-6 leading-relaxed max-w-lg">
              {t("footerDescription")}
            </p>

            {/* Social */}
            <div className="flex gap-4 flex-row-reverse sm:flex-row">
              <a
                href="https://www.facebook.com/WaqeakTheNewcode/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/waqkakcompany.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://www.waquakcode.com"
                className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("quickLinks")}</h4>

            <ul className="space-y-3">
              <li><a href="#home" className="hover:text-white transition">{t("home")}</a></li>
              <li><a href="#services" className="hover:text-white transition">{t("services")}</a></li>
              <li><a href="/about" className="hover:text-white transition">{t("about")}</a></li>
              <li><a href="#contact" className="hover:text-white transition">{t("contact")}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("contactInfo")}</h4>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/80" />
                <a href="tel:+201200186404" className="hover:text-white transition">
                  +20 120 018 6404
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/80" />
                <a href="mailto:Omar@waqeak.com" className="hover:text-white transition">
                  info@waqeak.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-white/80" />
                <span>
                  {language === "ar" ? "القاهرة، مصر" : "Cairo, Egypt"}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center">
          <p className="text-white/70">{t("copyright")}</p>
          <p className="text-white/60 text-sm mt-2">{t("footerTagline")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
