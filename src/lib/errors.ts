import React, { useCallback } from 'react';
import { ErrorState } from '@/types';

// Error classes for different types of errors
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly timestamp: Date;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    code: string = 'APP_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string, value?: any) {
    super(message, 'VALIDATION_ERROR', 400, true, { field, value });
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred', statusCode: number = 0) {
    super(message, 'NETWORK_ERROR', statusCode || 500, true);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR', 401, true);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 'AUTHORIZATION_ERROR', 403, true);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND_ERROR', 404, true);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, query?: string) {
    super(message, 'DATABASE_ERROR', 500, true, { query });
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string = 'External service error') {
    super(`${service}: ${message}`, 'EXTERNAL_SERVICE_ERROR', 502, true, { service });
  }
}

// Error handling utilities
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errors: AppError[] = [];
  private maxErrors: number = 100;

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * Handle and log error
   */
  handle(error: Error | AppError, context?: Record<string, any>): AppError {
    const appError = this.normalizeError(error, context);
    this.logError(appError);
    this.storeError(appError);
    this.notifyUser(appError);

    return appError;
  }

  /**
   * Convert any error to AppError
   */
  private normalizeError(error: Error | AppError, context?: Record<string, any>): AppError {
    if (error instanceof AppError) {
      return error;
    }

    // Handle fetch errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return new NetworkError('Network connection failed');
    }

    // Handle Supabase errors
    if (error.message.includes('Supabase')) {
      return new DatabaseError(error.message, context?.query);
    }

    // Handle validation errors
    if (error.name === 'ZodError') {
      return new ValidationError('Validation failed', context?.field);
    }

    // Default error
    return new AppError(error.message, 'UNKNOWN_ERROR', 500, true, {
      originalError: error.name,
      ...context,
    });
  }

  /**
   * Log error to console and external services
   */
  private logError(error: AppError): void {
    // Console logging with different levels
    if (error.statusCode >= 500) {
      console.error('Server Error:', error);
    } else if (error.statusCode >= 400) {
      console.warn('Client Error:', error);
    } else {
      console.info('App Error:', error);
    }

    // Send to monitoring service (example: Sentry, LogRocket)
    this.sendToMonitoringService(error);
  }

  /**
   * Store error in memory
   */
  private storeError(error: AppError): void {
    this.errors.push(error);

    // Keep only last N errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }
  }

  /**
   * Show user-friendly error message
   */
  private notifyUser(error: AppError): void {
    if (typeof window !== 'undefined') {
      // Dispatch custom event for UI components to listen
      window.dispatchEvent(new CustomEvent('app-error', {
        detail: {
          message: error.message,
          code: error.code,
          statusCode: error.statusCode,
        },
      }));
    }
  }

  /**
   * Send error to external monitoring service
   */
  private sendToMonitoringService(error: AppError): void {
    // Example implementation for different services
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.message,
        fatal: error.statusCode >= 500,
      });
    }

    // Example: Send to Sentry
    if (typeof window !== 'undefined' && 'Sentry' in window) {
      (window as any).Sentry.captureException(error, {
        tags: {
          component: 'frontend',
          error_code: error.code,
        },
        extra: error.context,
      });
    }

    // Example: Send to custom logging endpoint
    if (typeof fetch !== 'undefined') {
      fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: error.message,
          code: error.code,
          statusCode: error.statusCode,
          stack: error.stack,
          context: error.context,
          timestamp: error.timestamp,
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      }).catch(() => {
        // Silently fail to avoid infinite error loops
      });
    }
  }

  /**
   * Get stored errors
   */
  getErrors(): AppError[] {
    return [...this.errors];
  }

  /**
   * Clear stored errors
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Get error by code
   */
  getErrorByCode(code: string): AppError | undefined {
    return this.errors.find(error => error.code === code);
  }

  /**
   * Get error statistics
   */
  getErrorStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    this.errors.forEach(error => {
      stats[error.code] = (stats[error.code] || 0) + 1;
    });
    return stats;
  }
}

// Singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Custom hooks for error handling
export function useErrorHandler() {
  const handleError = useCallback((error: Error | AppError, context?: Record<string, any>) => {
    return errorHandler.handle(error, context);
  }, []);

  const clearErrors = useCallback(() => {
    errorHandler.clearErrors();
  }, []);

  const getErrors = useCallback(() => {
    return errorHandler.getErrors();
  }, []);

  const getErrorStats = useCallback(() => {
    return errorHandler.getErrorStats();
  }, []);

  return {
    handleError,
    clearErrors,
    getErrors,
    getErrorStats,
  };
}


// Retry utility for failed operations
export class RetryManager {
  private static defaultOptions = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffFactor: 2,
    shouldRetry: (error: Error) => {
      // Retry on network errors and 5xx server errors
      return error instanceof NetworkError ||
             (error as any).statusCode >= 500 ||
             error.message.includes('fetch');
    },
  };

  static async execute<T>(
    operation: () => Promise<T>,
    options: Partial<typeof RetryManager.defaultOptions> = {}
  ): Promise<T> {
    const config = { ...RetryManager.defaultOptions, ...options };
    let lastError: Error;

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Don't retry on the last attempt
        if (attempt === config.maxAttempts || !config.shouldRetry(lastError)) {
          throw lastError;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(
          config.baseDelay * Math.pow(config.backoffFactor, attempt - 1),
          config.maxDelay
        );

        // Add jitter to prevent thundering herd
        const jitter = Math.random() * 0.1 * delay;
        const totalDelay = delay + jitter;

        await new Promise(resolve => setTimeout(resolve, totalDelay));
      }
    }

    throw lastError!;
  }
}

// Safe async wrapper with error handling
export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback?: T,
  context?: Record<string, any>
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const data = await operation();
    return { data, error: null };
  } catch (error) {
    const appError = errorHandler.handle(error as Error, context);
    return { data: fallback || null, error: appError };
  }
}

// Error state utilities
export function createErrorState(hasError: boolean = false, message: string = ''): ErrorState {
  return { hasError, message };
}

export function isErrorState(state: any): state is ErrorState {
  return state && typeof state === 'object' && 'hasError' in state && 'message' in state;
}

// Error message formatting
export function formatErrorMessage(error: Error | AppError, language: 'en' | 'ar' = 'en'): string {
  if (error instanceof AppError) {
    return error.message;
  }

  // Format common error messages based on language
  const messageMap: Record<string, { en: string; ar: string }> = {
    'Network request failed': {
      en: 'Network connection failed. Please check your internet connection.',
      ar: 'فشل الاتصال بالشبكة. يرجى التحقق من اتصال الإنترنت الخاص بك.',
    },
    'Failed to fetch': {
      en: 'Unable to connect to the server. Please try again later.',
      ar: 'غير قادر على الاتصال بالخادم. يرجى المحاولة مرة أخرى لاحقًا.',
    },
    'Unauthorized': {
      en: 'Please log in to access this resource.',
      ar: 'يرجى تسجيل الدخول للوصول إلى هذا المورد.',
    },
    'Forbidden': {
      en: 'You do not have permission to access this resource.',
      ar: 'ليس لديك إذن للوصول إلى هذا المورد.',
    },
    'Not Found': {
      en: 'The requested resource was not found.',
      ar: 'المورد المطلوب غير موجود.',
    },
  };

  const mapped = messageMap[error.message];
  return mapped ? mapped[language] : error.message;
}