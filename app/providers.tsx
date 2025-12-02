"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode, useEffect } from "react";
import { performanceManager } from "@/lib/performance";

interface ProvidersProps {
  children: ReactNode;
}

// Enhanced QueryClient with optimized configuration
function createQueryClient() {
  performanceManager.startMeasure('query-client-init');

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        // Time in milliseconds
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }
          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        networkMode: 'online',
      },
      mutations: {
        retry: 1,
        networkMode: 'online',
      },
    },
  });

  performanceManager.endMeasure('query-client-init');
  return client;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());

  useEffect(() => {
    // Simple performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor page load performance
      const handleLoad = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;

        console.log(`Page load time: ${loadTime}ms`);

        // You can send this to your analytics service
        if (typeof gtag !== 'undefined') {
          gtag('event', 'page_load_time', {
            value: Math.round(loadTime),
            event_category: 'Performance',
          });
        }
      };

      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}