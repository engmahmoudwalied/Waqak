"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { CheckCircle2, Target, Eye, Award, Users, Clock, Shield, TrendingUp } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t('aboutTitle');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('aboutSubtitle'));
    }
  }, [t]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in text-center">
            {t('aboutHero')}
          </h1>
          <p className="text-xl text-primary-foreground/90 animate-fade-in text-center" style={{ animationDelay: '0.2s' }}>
            {t('aboutSubtitle')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">{t('ourStory')}</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('storyContent')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-card p-8 rounded-lg shadow-elegant border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-card-foreground">{t('ourMission')}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('missionContent')}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card p-8 rounded-lg shadow-elegant border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-card-foreground">{t('ourVision')}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('visionContent')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">{t('ourValues')}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">{t('valueQuality')}</h3>
              <p className="text-muted-foreground">{t('valueQualityDesc')}</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">{t('valueInnovation')}</h3>
              <p className="text-muted-foreground">{t('valueInnovationDesc')}</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">{t('valueTransparency')}</h3>
              <p className="text-muted-foreground">{t('valueTransparencyDesc')}</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">{t('valueCommitment')}</h3>
              <p className="text-muted-foreground">{t('valueCommitmentDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">{t('whyChooseUs')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('whyExpertise')}</h3>
                <p className="text-muted-foreground">{t('whyExpertiseDesc')}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('whyCustomSolutions')}</h3>
                <p className="text-muted-foreground">{t('whyCustomSolutionsDesc')}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('whySupport')}</h3>
                <p className="text-muted-foreground">{t('whySupportDesc')}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('whyPricing')}</h3>
                <p className="text-muted-foreground">{t('whyPricingDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">{t('trustUs')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('trustContent')}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;