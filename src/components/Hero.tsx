"use client";

import { ArrowLeft, Code, Globe, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { sendWhatsAppMessage, browseWorkMessage } from "@/utils/whatsapp";
const Hero = () => {
  const {
    language,
    t
  } = useLanguage();
  const router = useRouter();
  
  const handleBrowseWork = () => {
    router.push("/portfolio");
  };
  return <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden pt-20 sm:pt-0">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-primary/20"></div>
      
      <div className="container mx-auto mt-10 sm:mt-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-primary-foreground bg-transparent">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              {t('welcome')} <span className="animate-pulse-glow text-primary-glow">{t('companyName')}</span> {language === 'ar' ? 'للبرمجة' : 'Programming'}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-primary-foreground/90 max-w-4xl mx-auto px-4">
              {t('heroSubtitle')}
            </p>
          </div>
  

          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
           <a href="https://wa.me/201200186404?text=$hi" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg" className="shadow-glow" >
              {t('getQuote')}
              <ArrowLeft className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
            </Button>
            </a>
            <Button variant="outline" size="lg" className="border-primary-foreground hover:bg-primary-foreground text-base text-foreground" onClick={handleBrowseWork}>
              {t('browseWork')}
            </Button>
          </div>

          {/* Services Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto animate-slide-up">
            <Card className="bg-card/10 border-primary-foreground/20 backdrop-blur-sm p-4 sm:p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <Globe className="h-10 w-10 sm:h-12 sm:w-12 text-primary-glow mx-auto mb-4" aria-label="أيقونة مواقع الويب" />
              <h3 className="text-lg sm:text-xl font-semibold text-primary-foreground mb-2">{t('websites')}</h3>
              <p className="text-sm sm:text-base text-primary-foreground/80">{t('websitesDesc')}</p>
            </Card>

            <Card className="border-primary-foreground/20 backdrop-blur-sm p-4 sm:p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-[#999ba7]/[0.22]">
              <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-primary-glow mx-auto mb-4" aria-label="أيقونة تطبيقات الجوال" />
              <h3 className="text-lg sm:text-xl font-semibold text-primary-foreground mb-2">{t('mobileApps')}</h3>
              <p className="text-sm sm:text-base text-primary-foreground/80">{t('mobileAppsDesc')}</p>
            </Card>

            <Card className="bg-card/10 border-primary-foreground/20 backdrop-blur-sm p-4 sm:p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105 sm:col-span-2 md:col-span-1">
              <Code className="h-10 w-10 sm:h-12 sm:w-12 text-primary-glow mx-auto mb-4" aria-label="أيقونة الحلول المخصصة" />
              <h3 className="text-lg sm:text-xl font-semibold text-primary-foreground mb-2">{t('customSolutions')}</h3>
              <p className="text-sm sm:text-base text-primary-foreground/80">{t('customSolutionsDesc')}</p>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;