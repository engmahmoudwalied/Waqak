import { useEffect, useRef, useCallback, useState } from 'react';

// Performance monitoring utilities
export class PerformanceManager {
  private metrics: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  /**
   * Start performance measurement
   */
  startMeasure(name: string): void {
    if (typeof window !== 'undefined' && performance.mark) {
      performance.mark(`${name}-start`);
    }
  }

  /**
   * End performance measurement
   */
  endMeasure(name: string): number | null {
    if (typeof window !== 'undefined' && performance.mark && performance.measure) {
      const startMark = `${name}-start`;
      const endMark = `${name}-end`;

      try {
        performance.mark(endMark);
        performance.measure(name, startMark, endMark);

        const measures = performance.getEntriesByName(name, 'measure');
        const measure = measures[measures.length - 1];

        if (measure) {
          this.metrics.set(name, measure.duration);
          return measure.duration;
        }
      } catch (error) {
        console.warn(`Performance measurement failed for ${name}:`, error);
      }
    }
    return null;
  }

  /**
   * Get measurement by name
   */
  getMeasure(name: string): number | undefined {
    return this.metrics.get(name);
  }

  /**
   * Get all measurements
   */
  getAllMeasures(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Clear all measurements
   */
  clearMeasures(): void {
    if (typeof window !== 'undefined' && performance.clearMarks) {
      performance.clearMarks();
      performance.clearMeasures();
    }
    this.metrics.clear();
  }

  /**
   * Monitor Core Web Vitals
   */
  observeWebVitals(callback: (metric: any) => void): void {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    this.observePerformanceObserver('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1];
      callback({
        name: 'LCP',
        value: lastEntry.startTime,
        rating: this.getLCPRating(lastEntry.startTime),
      });
    });

    // First Input Delay (FID)
    this.observePerformanceObserver('first-input', (entries) => {
      const firstEntry = entries[0];
      callback({
        name: 'FID',
        value: firstEntry.processingStart - firstEntry.startTime,
        rating: this.getFIDRating(firstEntry.processingStart - firstEntry.startTime),
      });
    });

    // Cumulative Layout Shift (CLS)
    this.observePerformanceObserver('layout-shift', (entries) => {
      let clsValue = 0;
      entries.forEach(entry => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      callback({
        name: 'CLS',
        value: clsValue,
        rating: this.getCLSRating(clsValue),
      });
    });
  }

  private observePerformanceObserver(type: string, callback: (entries: any[]) => void): void {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });

      observer.observe({ type, buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn(`Failed to observe ${type}:`, error);
    }
  }

  private getLCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  private getFIDRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  }

  private getCLSRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Disconnect all observers
   */
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  /**
   * Get memory usage (if available)
   */
  getMemoryUsage(): any {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  }

  /**
   * Get navigation timing
   */
  getNavigationTiming(): any {
    if (typeof window !== 'undefined' && performance.timing) {
      const timing = performance.timing;
      return {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        request: timing.responseStart - timing.requestStart,
        response: timing.responseEnd - timing.responseStart,
        dom: timing.domContentLoadedEventEnd - timing.navigationStart,
        load: timing.loadEventEnd - timing.navigationStart,
        total: timing.loadEventEnd - timing.navigationStart,
      };
    }
    return null;
  }
}

// Singleton instance
export const performanceManager = new PerformanceManager();

// Custom hook for performance measurement
export function usePerformanceMeasure(name: string, dependencies: any[] = []) {
  const measureRef = useRef<number | null>(null);

  useEffect(() => {
    performanceManager.startMeasure(name);
    return () => {
      const duration = performanceManager.endMeasure(name);
      if (duration !== null) {
        measureRef.current = duration;
      }
    };
  }, dependencies);

  return measureRef.current;
}

// Custom hook for Web Vitals monitoring
export function useWebVitals() {
  useEffect(() => {
    const handleWebVital = (metric: any) => {
      // Send to analytics or logging service
      console.log('Web Vital:', metric);

      // Example: Send to Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.rating,
          non_interaction: true,
        });
      }
    };

    performanceManager.observeWebVitals(handleWebVital);

    return () => {
      performanceManager.disconnect();
    };
  }, []);
}

// Debounce hook
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  ) as T;

  return debouncedCallback;
}

// Throttle hook
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef<number>(0);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  ) as T;

  return throttledCallback;
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

// Image loading optimization
export function optimizeImageSrc(src: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
} = {}): string {
  const { width, height, quality = 80, format = 'webp' } = options;

  // For Next.js Image component, this is handled automatically
  // This is for manual image optimization
  let optimizedSrc = src;

  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());
    params.set('f', format);

    const separator = src.includes('?') ? '&' : '?';
    optimizedSrc = `${src}${separator}${params.toString()}`;
  }

  return optimizedSrc;
}

// Bundle size monitoring
export function getBundleSize(): Promise<{ size: number; gzipped: number }> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve({ size: 0, gzipped: 0 });
      return;
    }

    fetch(window.location.href)
      .then(response => {
        const size = new TextEncoder().encode(response.clone().text() as any).length;
        resolve({ size, gzipped: Math.round(size * 0.3) }); // Rough estimate
      })
      .catch(() => resolve({ size: 0, gzipped: 0 }));
  });
}

// Memory leak detection
export function useMemoryLeakDetection() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('memory' in performance)) return;

    const checkMemory = () => {
      const memory = (performance as any).memory;
      const usedMemory = memory.usedJSHeapSize / 1024 / 1024;

      if (usedMemory > 100) { // 100MB threshold
        console.warn(`High memory usage: ${usedMemory.toFixed(2)} MB`);

        // Optional: Send to monitoring service
        if (typeof gtag !== 'undefined') {
          gtag('event', 'memory_warning', {
            value: Math.round(usedMemory),
            event_category: 'Performance',
          });
        }
      }
    };

    const interval = setInterval(checkMemory, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);
}

// Route change performance tracking
export function trackRoutePerformance(router: NextRouter) {
  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      performanceManager.startMeasure(`route-${url}`);
    };

    const handleRouteChangeComplete = (url: string) => {
      const duration = performanceManager.endMeasure(`route-${url}`);
      if (duration !== null && duration > 1000) {
        console.warn(`Slow route change: ${url} took ${duration}ms`);
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);
}

// Preload critical resources
export function preloadCriticalResources(resources: string[]) {
  if (typeof window === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;

    if (resource.endsWith('.js')) {
      link.as = 'script';
    } else if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.match(/\.(png|jpg|jpeg|webp|avif)$/)) {
      link.as = 'image';
    }

    document.head.appendChild(link);
  });
}