import { Language } from '@/types';

export class RTLSupport {
  /**
   * Get text direction based on language
   */
  getDirection(language: Language): 'ltr' | 'rtl' {
    return language === 'ar' ? 'rtl' : 'ltr';
  }

  /**
   * Get text alignment class based on language
   */
  getTextAlign(language: Language, align: 'start' | 'center' | 'end' = 'start'): string {
    const direction = this.getDirection(language);

    switch (align) {
      case 'start':
        return direction === 'rtl' ? 'text-right' : 'text-left';
      case 'center':
        return 'text-center';
      case 'end':
        return direction === 'rtl' ? 'text-left' : 'text-right';
      default:
        return 'text-left';
    }
  }

  /**
   * Get margin/padding classes for spacing
   */
  getSpacing(language: Language, type: 'margin' | 'padding', side: 'start' | 'end', size: string): string {
    const prefix = type === 'margin' ? 'm' : 'p';
    const direction = this.getDirection(language);
    const sideClass = direction === 'rtl'
      ? (side === 'start' ? 'r' : 'l')
      : (side === 'start' ? 'l' : 'r');

    return `${prefix}${sideClass}-${size}`;
  }

  /**
   * Get flex direction class
   */
  getFlexDirection(language: Language): string {
    return language === 'ar' ? 'flex-row-reverse' : 'flex-row';
  }

  /**
   * Get icon transform class for RTL
   */
  getIconTransform(language: Language): string {
    return language === 'ar' ? 'transform scale-x-[-1]' : '';
  }

  /**
   * Get safe classes for RTL/LTR support
   */
  getSafeClasses(language: Language, classes: {
    text?: 'start' | 'center' | 'end';
    margin?: { start?: string; end?: string };
    padding?: { start?: string; end?: string };
    flex?: boolean;
    icon?: boolean;
  }): string {
    const result: string[] = [];

    if (classes.text) {
      result.push(this.getTextAlign(language, classes.text));
    }

    if (classes.margin?.start) {
      result.push(this.getSpacing(language, 'margin', 'start', classes.margin.start));
    }

    if (classes.margin?.end) {
      result.push(this.getSpacing(language, 'margin', 'end', classes.margin.end));
    }

    if (classes.padding?.start) {
      result.push(this.getSpacing(language, 'padding', 'start', classes.padding.start));
    }

    if (classes.padding?.end) {
      result.push(this.getSpacing(language, 'padding', 'end', classes.padding.end));
    }

    if (classes.flex) {
      result.push(this.getFlexDirection(language));
    }

    if (classes.icon) {
      result.push(this.getIconTransform(language));
    }

    return result.join(' ');
  }

  /**
   * Format text content for RTL/LTR
   */
  formatText(language: Language, content: string): string {
    // Add U+202B (RTL) or U+202A (LTR) mark to ensure correct text direction
    const directionMark = language === 'ar' ? '\u202B' : '\u202A';
    return `${directionMark}${content}`;
  }

  /**
   * Get safe HTML attributes for language
   */
  getLanguageAttributes(language: Language): {
    dir: 'ltr' | 'rtl';
    lang: string;
    'data-language': Language;
  } {
    return {
      dir: this.getDirection(language),
      lang: language,
      'data-language': language,
    };
  }

  /**
   * Check if text is likely RTL
   */
  isRTLText(text: string): boolean {
    // Check for RTL characters (Arabic, Hebrew, etc.)
    const rtlRegex = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return rtlRegex.test(text);
  }

  /**
   * Auto-detect text direction
   */
  autoDetectDirection(text: string): 'ltr' | 'rtl' {
    return this.isRTLText(text) ? 'rtl' : 'ltr';
  }

  /**
   * Mix RTL and LTR content safely
   */
  mixedDirection(language: Language, rtlContent?: string, ltrContent?: string, separator = ' | '): string {
    const parts: string[] = [];

    if (rtlContent) {
      parts.push(this.formatText('ar', rtlContent));
    }

    if (ltrContent) {
      parts.push(this.formatText('en', ltrContent));
    }

    return parts.join(separator);
  }

  /**
   * Get number format for language
   */
  getNumberFormat(language: Language): Intl.NumberFormatOptions {
    return {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...(language === 'ar' && {
        numberingSystem: 'arab',
      }),
    };
  }

  /**
   * Format currency for language
   */
  formatCurrency(language: Language, amount: number, currency = 'SAR'): string {
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    };

    if (language === 'ar') {
      options.numberingSystem = 'arab';
    }

    return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-US', options).format(amount);
  }

  /**
   * Format date for language
   */
  formatDate(language: Language, date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const finalOptions = { ...defaultOptions, ...options };
    const locale = language === 'ar' ? 'ar-EG' : 'en-US';

    return new Intl.DateTimeFormat(locale, finalOptions).format(
      typeof date === 'string' ? new Date(date) : date
    );
  }

  /**
   * Get reading time estimation
   */
  getReadingTime(language: Language, content: string): string {
    const wordsPerMinute = language === 'ar' ? 150 : 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    const readTimeText = language === 'ar'
      ? `${minutes} دقيقة قراءة`
      : `${minutes} min read`;

    return this.formatText(language, readTimeText);
  }

  /**
   * Get safe class name for conditional RTL styles
   */
  conditionalClass(language: Language, ltrClass: string, rtlClass?: string): string {
    return language === 'ar' && rtlClass ? rtlClass : ltrClass;
  }

  /**
   * Get logical properties for CSS
   */
  getLogicalProperties(language: Language) {
    const direction = this.getDirection(language);
    return {
      'text-align': 'start',
      'margin-inline-start': '0',
      'margin-inline-end': 'auto',
      'padding-inline-start': '1rem',
      'padding-inline-end': '0',
      'border-start-start-radius': '0.5rem',
      'border-start-end-radius': '0',
      'border-end-start-radius': '0',
      'border-end-end-radius': '0.5rem',
      ...(direction === 'rtl' && {
        'direction': 'rtl',
      }),
    };
  }

  /**
   * Create CSS-in-JS styles with RTL support
   */
  createRTLStyles(language: Language, styles: Record<string, any>): Record<string, any> {
    const direction = this.getDirection(language);
    const rtlStyles = { ...styles };

    // Convert left/right properties to logical equivalents
    const logicalMappings: Record<string, string> = {
      'marginLeft': 'marginInlineStart',
      'marginRight': 'marginInlineEnd',
      'paddingLeft': 'paddingInlineStart',
      'paddingRight': 'paddingInlineEnd',
      'borderLeft': 'borderInlineStart',
      'borderRight': 'borderInlineEnd',
      'borderTopLeftRadius': 'borderStartStartRadius',
      'borderTopRightRadius': 'borderStartEndRadius',
      'borderBottomLeftRadius': 'borderEndStartRadius',
      'borderBottomRightRadius': 'borderEndEndRadius',
      'textAlign': 'textAlign',
    };

    Object.keys(rtlStyles).forEach(property => {
      const logicalProperty = logicalMappings[property];
      if (logicalProperty) {
        rtlStyles[logicalProperty] = rtlStyles[property];
        delete rtlStyles[property];
      }
    });

    if (direction === 'rtl') {
      rtlStyles.direction = 'rtl';
    }

    return rtlStyles;
  }
}

// Singleton instance
export const rtlSupport = new RTLSupport();

// Helper functions for common RTL operations
export const getDirection = (language: Language) => rtlSupport.getDirection(language);
export const getTextAlign = (language: Language, align?: 'start' | 'center' | 'end') =>
  rtlSupport.getTextAlign(language, align);
export const getSpacing = (language: Language, type: 'margin' | 'padding', side: 'start' | 'end', size: string) =>
  rtlSupport.getSpacing(language, type, side, size);
export const getFlexDirection = (language: Language) => rtlSupport.getFlexDirection(language);
export const getIconTransform = (language: Language) => rtlSupport.getIconTransform(language);
export const formatCurrency = (language: Language, amount: number, currency?: string) =>
  rtlSupport.formatCurrency(language, amount, currency);
export const formatDate = (language: Language, date: Date | string, options?: Intl.DateTimeFormatOptions) =>
  rtlSupport.formatDate(language, date, options);
export const formatText = (language: Language, content: string) => rtlSupport.formatText(language, content);