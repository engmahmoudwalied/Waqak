import type { Metadata, Viewport } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Providers } from "./providers";
import { COMPANY_INFO } from "@/constants";
import { generateSEO } from "@/lib/seo";

// Font optimization with proper fallbacks
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

// Enhanced metadata with SEO
export const metadata: Metadata = generateSEO({
  title: COMPANY_INFO.name.en,
  description: COMPANY_INFO.description.en,
  keywords: [
    "web development",
    "mobile apps",
    "programming",
    "digital solutions",
    "ecommerce",
    "software development",
    "tech consulting",
    "واقعك",
    "برمجة",
    "تطوير مواقع",
    "تطبيقات جوال",
    "حلول رقمية"
  ].join(", "),
  type: "website",
  locale: "en",
  image: "/images/og-image.jpg",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${cairo.variable} scroll-smooth`}
    >
        <head>
          {/* Preload critical resources */}
          <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
          <link rel="preload" href="/fonts/cairo-var.woff2" as="font" type="font/woff2" crossOrigin="" />

          {/* DNS prefetch for external domains */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />
          <link rel="dns-prefetch" href="//supabase.co" />

          {/* Apple touch icon and startup images */}
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />

          {/* Web app manifest */}
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Waqak" />

          {/* Microsoft tiles */}
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-config" content="/browserconfig.xml" />

          {/* Verification meta tags */}
          <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION || ""} />
          <meta name="yandex-verification" content={process.env.YANDEX_VERIFICATION || ""} />
        </head>
        <body
          className={`
            ${inter.className}
            font-sans
            antialiased
            bg-background
            text-foreground
            min-h-screen
            selection:bg-primary/20
          `}
        >
          <Providers>
            <LanguageProvider>
              <TooltipProvider>
                {children}
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </LanguageProvider>
          </Providers>

          {/* Performance monitoring script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Web Vitals monitoring
                if (typeof window !== 'undefined') {
                  function sendToAnalytics(metric) {
                    // Send to your analytics service
                    if (typeof gtag !== 'undefined') {
                      gtag('event', metric.name, {
                        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                        event_category: 'Web Vitals',
                        event_label: metric.rating,
                        non_interaction: true,
                      });
                    }
                  }

                  // Import and observe web vitals
                  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
                    onCLS(sendToAnalytics);
                    onFID(sendToAnalytics);
                    onFCP(sendToAnalytics);
                    onLCP(sendToAnalytics);
                    onTTFB(sendToAnalytics);
                  });
                }
              `,
            }}
          />
        </body>
      </html>
  );
}