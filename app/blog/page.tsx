"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t('blogTitle');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('blogSubtitle'));
    }
  }, [t]);

  const articles = [
    {
      title: t('article1Title'),
      summary: t('article1Summary'),
      date: '2025-01-15',
      category: t('webDevelopment')
    },
    {
      title: t('article2Title'),
      summary: t('article2Summary'),
      date: '2025-01-10',
      category: t('mobileAppsDev')
    },
    {
      title: t('article3Title'),
      summary: t('article3Summary'),
      date: '2025-01-05',
      category: t('webDevelopment')
    },
    {
      title: t('article4Title'),
      summary: t('article4Summary'),
      date: '2024-12-28',
      category: t('digitalMarketing')
    },
    {
      title: t('article5Title'),
      summary: t('article5Summary'),
      date: '2024-12-20',
      category: t('technicalConsulting')
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="w-12 h-12 text-primary-foreground" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground animate-fade-in">
              {t('blogTitle')}
            </h1>
          </div>
          <p className="text-xl text-primary-foreground/90 animate-fade-in text-center" style={{ animationDelay: '0.2s' }}>
            {t('blogSubtitle')}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <p className="text-lg text-muted-foreground leading-relaxed text-center">
            {t('blogIntro')}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article
                key={index}
                className="bg-card rounded-lg shadow-elegant border border-border overflow-hidden hover:shadow-glow transition-all group"
              >
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {article.summary}
                  </p>

                  {/* Read More Button */}
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    {t('readMore')}
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;