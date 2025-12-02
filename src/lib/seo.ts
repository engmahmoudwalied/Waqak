import { Metadata } from 'next';
import { SEOProps, StructuredData } from '@/types';
import { APP_CONFIG, COMPANY_INFO } from '@/constants';

export class SEOManager {
  private siteName: string;
  private defaultImage: string;
  private twitterHandle: string;

  constructor() {
    this.siteName = COMPANY_INFO.name.en;
    this.defaultImage = '/images/og-image.jpg';
    this.twitterHandle = '@waqak';
  }

  /**
   * Generate complete metadata for a page
   */
  generateMetadata(seo: SEOProps): Metadata {
    const {
      title,
      description,
      keywords,
      image,
      url,
      type = 'website',
      locale = 'en'
    } = seo;

    const fullTitle = title === this.siteName
      ? title
      : `${title} | ${this.siteName}`;

    const imageUrl = image
      ? this.getAbsoluteUrl(image)
      : this.getAbsoluteUrl(this.defaultImage);

    const metaTags: Metadata = {
      title: fullTitle,
      description,
      keywords,
      authors: [{ name: this.siteName }],
      creator: this.siteName,
      publisher: this.siteName,
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION,
        yandex: process.env.YANDEX_VERIFICATION,
        yahoo: process.env.YAHOO_SITE_VERIFICATION,
      },
    };

    // Open Graph
    metaTags.openGraph = {
      type,
      locale,
      url: url ? this.getAbsoluteUrl(url) : APP_CONFIG.siteUrl,
      siteName: this.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    };

    // Twitter Card
    metaTags.twitter = {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: this.twitterHandle,
      site: this.twitterHandle,
    };

    // App links
    metaTags.other = {
      'application/ld+json': JSON.stringify(this.generateStructuredData(seo)),
    };

    // Icons
    metaTags.icons = {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    };

    // Viewport
    metaTags.viewport = 'width=device-width, initial-scale=1';

    // Theme color
    metaTags.themeColor = [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ];

    // Canonical URL
    if (url) {
      metaTags.alternates = {
        canonical: this.getAbsoluteUrl(url),
        languages: {
          'en': this.getAbsoluteUrl(`/en${url}`),
          'ar': this.getAbsoluteUrl(`/ar${url}`),
        },
      };
    }

    return metaTags;
  }

  /**
   * Generate structured data (JSON-LD)
   */
  private generateStructuredData(seo: SEOProps): StructuredData {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.siteName,
      description: seo.description,
      url: APP_CONFIG.siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${APP_CONFIG.siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    // Extend based on type
    switch (seo.type) {
      case 'article':
        return {
          ...baseData,
          '@type': 'Article',
          headline: seo.title,
          image: [seo.image || this.defaultImage],
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          author: {
            '@type': 'Organization',
            name: this.siteName,
          },
          publisher: {
            '@type': 'Organization',
            name: this.siteName,
            logo: {
              '@type': 'ImageObject',
              url: `${APP_CONFIG.siteUrl}/images/logo.png`,
            },
          },
        };

      case 'website':
      default:
        return {
          ...baseData,
          '@type': 'Organization',
          name: this.siteName,
          description: COMPANY_INFO.description.en,
          url: APP_CONFIG.siteUrl,
          logo: `${APP_CONFIG.siteUrl}/images/logo.png`,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: APP_CONFIG.phone,
            contactType: 'customer service',
            email: APP_CONFIG.email,
            availableLanguage: ['English', 'Arabic'],
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'EG',
            addressLocality: 'Cairo',
            addressRegion: 'Cairo',
          },
          sameAs: [
            'https://facebook.com/waqak',
            'https://twitter.com/waqak',
            'https://linkedin.com/company/waqak',
          ],
        };
    }
  }

  /**
   * Get absolute URL for assets
   */
  private getAbsoluteUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `${APP_CONFIG.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  /**
   * Generate breadcrumb structured data
   */
  generateBreadcrumb(breadcrumbs: Array<{ name: string; url: string }>): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: this.getAbsoluteUrl(breadcrumb.url),
      })),
    };
  }

  /**
   * Generate product/service structured data
   */
  generateProductStructuredData(
    product: {
      name: string;
      description: string;
      price: number;
      image?: string;
      category?: string;
    }
  ): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: product.name,
      description: product.description,
      provider: {
        '@type': 'Organization',
        name: this.siteName,
        url: APP_CONFIG.siteUrl,
      },
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'SAR',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: this.siteName,
        },
      },
      ...(product.image && {
        image: [this.getAbsoluteUrl(product.image)],
      }),
      ...(product.category && {
        category: product.category,
      }),
    };
  }

  /**
   * Generate FAQ structured data
   */
  generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }
}

// Singleton instance
export const seoManager = new SEOManager();

// Helper function for generating metadata
export function generateSEO(seo: SEOProps): Metadata {
  return seoManager.generateMetadata(seo);
}

// Helper function for generating structured data
export function generateStructuredData(seo: SEOProps): StructuredData {
  return seoManager.generateStructuredData(seo);
}

// Helper function for breadcrumbs
export function generateBreadcrumb(breadcrumbs: Array<{ name: string; url: string }>): StructuredData {
  return seoManager.generateBreadcrumb(breadcrumbs);
}

// Helper function for product structured data
export function generateProductStructuredData(
  product: {
    name: string;
    description: string;
    price: number;
    image?: string;
    category?: string;
  }
): StructuredData {
  return seoManager.generateProductStructuredData(product);
}

// Helper function for FAQ structured data
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>): StructuredData {
  return seoManager.generateFAQStructuredData(faqs);
}