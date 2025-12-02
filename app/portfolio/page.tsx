"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  link: string;
  image_url?: string;
  display_order: number;
}

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    loadPortfolioItems();

    // SEO: Update page title and description
    document.title = "أعمالنا | واقعك - مشاريع البرمجة والتطوير | Portfolio - Waquek";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'اطلع على مشاريع واقعك السابقة في برمجة المواقع والتطبيقات. واقعك تقدم حلول برمجية متميزة في مصر والشرق الأوسط.');
    }
  }, []);

  const loadPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error) {
      console.error("Error loading portfolio:", error);
      toast({
        title: "Error",
        description: "Failed to load portfolio items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in text-center">
              {t('ourWork')}
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-fade-in text-center" style={{ animationDelay: '0.2s' }}>
              {t('portfolioIntro')}
            </p>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">{t('portfolioApproach')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              {t('portfolioApproachText')}
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t('portfolioStandOut')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-12 max-w-3xl mx-auto">
              {t('portfolioStandOutText')}
            </p>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <CardContent className="p-6">
                      <div className="h-6 bg-muted rounded mb-2" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : portfolioItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t('noProjects')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50"
                  >
                    {item.image_url && (
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group/btn"
                        asChild
                      >
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          {t('viewProject')}
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">{t('whyContactUs')}</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-semibold text-card-foreground mb-2">{t('contactBenefit1')}</h3>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-semibold text-card-foreground mb-2">{t('contactBenefit2')}</h3>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-semibold text-card-foreground mb-2">{t('contactBenefit3')}</h3>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-semibold text-card-foreground mb-2">{t('contactBenefit4')}</h3>
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => window.location.href = '/#contact'}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t('contact')}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;