"use client";

import { Globe, Smartphone, ShoppingCart, Database, Wrench, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t, language } = useLanguage();
  
  const services = [
    {
      icon: Globe,
      title: t('webDevelopment'),
      description: t('webDevelopmentDesc'),
      features: [t('responsiveDesign'), t('ultraFast'), t('seoOptimized'), t('highSecurity')],
      alt: language === 'ar' ? "خدمة تطوير وبرمجة مواقع الويب - واقعك" : "Web Development Service - Waquek"
    },
    {
      icon: Smartphone,
      title: t('mobileAppsDev'),
      description: t('mobileAppsDevDesc'),
      features: [t('nativeApps'), t('easyInterface'), t('fastPerformance'), t('continuousUpdates')],
      alt: language === 'ar' ? "خدمة تطوير تطبيقات الجوال - واقعك" : "Mobile App Development Service - Waquek"
    },
    {
      icon: ShoppingCart,
      title: t('ecommerce'),
      description: t('ecommerceDesc'),
      features: [t('securePayment'), t('productManagement'), t('salesReports'), t('shippingIntegration')],
      alt: language === 'ar' ? "خدمة تطوير المتاجر الإلكترونية - واقعك" : "E-commerce Development Service - Waquek"
    },
    {
      icon: Database,
      title: t('technicalTraining'),
      description: t('technicalTrainingDesc'),
      features: [t('programmingCourses'), t('practicalTraining'), t('certifiedCertificates'), t('continuousFollowup')],
      alt: language === 'ar' ? "خدمة التدريب التقني والبرمجة - واقعك" : "Technical Training Service - Waquek"
    },
    {
      icon: Wrench,
      title: t('digitalMarketing'),
      description: t('digitalMarketingDesc'),
      features: [t('contentMarketing'), t('campaignManagement'), t('seoImprovement'), t('dataAnalysis')],
      alt: language === 'ar' ? "خدمة التسويق الرقمي والإلكتروني - واقعك" : "Digital Marketing Service - Waquek"
    },
    {
      icon: Users,
      title: t('technicalConsulting'),
      description: t('technicalConsultingDesc'),
      features: [t('needsAnalysis'), t('technicalPlan'), t('bestPractices'), t('continuousFollowup')],
      alt: language === 'ar' ? "خدمة الاستشارات التقنية - واقعك" : "Technical Consulting Service - Waquek"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('ourServices')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('servicesIntro')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-primary rounded-lg shadow-glow">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/201200186404?text=$hi" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground">
                  {t('requestQuote')}
                </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;