"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Code, Smartphone, TrendingUp, MessageSquare, GraduationCap, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ServicesPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    document.title = t('servicesPageTitle');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('servicesPageSubtitle'));
    }
  }, [t]);

  const services = [
    {
      icon: Code,
      title: t('webDevelopment'),
      fullTitle: t('webDevFullTitle'),
      intro: t('webDevIntro'),
      explanation: t('webDevExplanation'),
      problems: [
        t('webDevProblem1'),
        t('webDevProblem2'),
        t('webDevProblem3'),
        t('webDevProblem4')
      ],
      benefits: [
        t('webDevBenefit1'),
        t('webDevBenefit2'),
        t('webDevBenefit3'),
        t('webDevBenefit4')
      ],
      tech: t('webDevTech')
    },
    {
      icon: Smartphone,
      title: t('mobileAppsDev'),
      fullTitle: t('mobileDevFullTitle'),
      intro: t('mobileDevIntro'),
      explanation: t('mobileDevExplanation'),
      problems: [
        t('mobileDevProblem1'),
        t('mobileDevProblem2'),
        t('mobileDevProblem3')
      ],
      benefits: [
        t('mobileDevBenefit1'),
        t('mobileDevBenefit2'),
        t('mobileDevBenefit3')
      ],
      tech: t('mobileDevTech')
    },
    {
      icon: TrendingUp,
      title: t('digitalMarketing'),
      fullTitle: t('marketingFullTitle'),
      intro: t('marketingIntro'),
      explanation: t('marketingExplanation'),
      problems: [
        t('marketingProblem1'),
        t('marketingProblem2'),
        t('marketingProblem3')
      ],
      benefits: [
        t('marketingBenefit1'),
        t('marketingBenefit2'),
        t('marketingBenefit3')
      ],
      tech: 'SEO, Google Ads, Social Media, Analytics'
    },
    {
      icon: MessageSquare,
      title: t('technicalConsulting'),
      fullTitle: t('consultingFullTitle'),
      intro: t('consultingIntro'),
      explanation: t('consultingExplanation'),
      problems: [],
      benefits: [
        t('consultingBenefit1'),
        t('consultingBenefit2'),
        t('consultingBenefit3')
      ],
      tech: 'Architecture Design, Tech Stack Selection, Performance Optimization'
    },
    {
      icon: GraduationCap,
      title: t('technicalTraining'),
      fullTitle: t('trainingFullTitle'),
      intro: t('trainingIntro'),
      explanation: t('trainingExplanation'),
      problems: [],
      benefits: [
        t('trainingBenefit1'),
        t('trainingBenefit2'),
        t('trainingBenefit3')
      ],
      tech: 'React, Node.js, Python, Mobile Development'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in text-center">
            {t('ourServices')}
          </h1>
          <p className="text-xl text-primary-foreground/90 animate-fade-in text-center mb-8" style={{ animationDelay: '0.2s' }}>
            {t('servicesPageSubtitle')}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <p className="text-lg text-muted-foreground leading-relaxed text-center">
            {t('servicesIntroText')}
          </p>
        </div>
      </section>

      {/* Services Detailed */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-card rounded-lg shadow-elegant border border-border overflow-hidden">
                <div className="p-8">
                  {/* Service Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-card-foreground">{service.title}</h2>
                      <p className="text-muted-foreground mt-1">{service.intro}</p>
                    </div>
                  </div>

                  {/* What is this service */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      {t('whatIsWebDev')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.explanation}
                    </p>
                  </div>

                  {/* Problems We Solve */}
                  {service.problems.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-card-foreground mb-4">{t('webDevProblems')}</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {service.problems.map((problem, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-6 h-6 bg-destructive/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-destructive text-sm font-bold">✗</span>
                            </div>
                            <p className="text-muted-foreground">{problem}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      {service.problems.length > 0 ? t('whyChooseOurWebDev') : t('whyChooseUs')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">{t('technologiesUsed')}</h3>
                    <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      {service.tech}
                    </p>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => router.push('/contact')}
                    className="w-full md:w-auto"
                  >
                    {t('requestQuote')}
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;