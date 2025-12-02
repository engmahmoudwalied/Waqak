"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const router = useRouter();

  const handleGetQuote = () => {
    router.push("/portfolio");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo + Text */}
          <div className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-2 sm:space-x-3" : "space-x-2 sm:space-x-3"}`}>
            <Image
              src="/waqeak-logo.jpg"
              alt="شركة واقعك - برمجة وتطوير مواقع"
              width={40}
              height={40}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg"
              priority
            />
            <div className="hidden sm:block">
              <h1 className={`text-lg sm:text-xl font-bold text-primary ${language === "ar" ? "text-right" : "text-left"}`}>
                {t("companyName")}
              </h1>
              <p className={`text-xs text-muted-foreground ${language === "ar" ? "text-right" : "text-left"}`}>
                {t("programming")}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center ${language === "ar" ? "space-x-reverse space-x-8" : "space-x-8"}`}>
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              {t("home")}
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary transition-colors">
              {t("services")}
            </Link>
            <Link href="/portfolio" className="text-foreground hover:text-primary transition-colors">
              {t("portfolio")}
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              {t("about")}
            </Link>
            <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
              {t("blog")}
            </Link>
            <a href="/#contact" className="text-foreground hover:text-primary transition-colors">
              {t("contact")}
            </a>
          </nav>

          {/* Desktop Buttons */}
          <div className={`hidden md:flex items-center ${language === "ar" ? "space-x-reverse space-x-4" : "space-x-4"}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className={`flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}
            >
              <Languages size={16} />
              {language === "ar" ? "EN" : "ع"}
            </Button>

            <Button variant="hero" size="sm" onClick={handleGetQuote}>
              {t("getQuote")}
            </Button>
          </div>

          {/* Mobile Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
            <nav className={`px-4 pt-4 pb-6 space-y-4 ${language === "ar" ? "text-right" : "text-left"}`}>
              <Link href="/" className={`block hover:text-primary transition-colors ${language === "ar" ? "text-right" : "text-left"}`}>
                {t("home")}
              </Link>
              <Link href="/services" className={`block hover:text-primary transition-colors ${language === "ar" ? "text-right" : "text-left"}`}>
                {t("services")}
              </Link>
              <Link href="/portfolio" className={`block hover:text-primary transition-colors ${language === "ar" ? "text-right" : "text-left"}`}>
                {t("portfolio")}
              </Link>
              <Link href="/about" className={`block hover:text-primary transition-colors ${language === "ar" ? "text-right" : "text-left"}`}>
                {t("about")}
              </Link>
              <Link href="/blog" className={`block hover:text-primary transition-colors ${language === "ar" ? "text-right" : "text-left"}`}>
                {t("blog")}
              </Link>
              <a href="/#contact" className={`block hover:text-primary transition-colors ${language === "ar" ? "text-right" : "text-left"}`}>
                {t("contact")}
              </a>

              <div className="pt-4 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className={`w-full flex items-center justify-center gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  <Languages size={16} />
                  {language === "ar" ? "English" : "العربية"}
                </Button>

                <Button
                  variant="hero"
                  size="sm"
                  className="w-full"
                  onClick={handleGetQuote}
                >
                  {t("getQuote")}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
