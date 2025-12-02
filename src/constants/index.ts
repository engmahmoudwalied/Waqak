import { Service, NavigationItem, AppConfig } from '@/types';

// Application Configuration
export const APP_CONFIG: AppConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://waqeak.com',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  whatsappNumber: '+201200186404',
  email: 'info@waqeak.com',
  phone: '+201200186404',
  address: {
    ar: 'مصر، القاهرة',
    en: 'Egypt, Cairo'
  }
};

// Company Information
export const COMPANY_INFO = {
  name: {
    ar: 'واقعك',
    en: 'Waqak'
  },
  tagline: {
    ar: 'شركة برمجة وحلول رقمية',
    en: 'Programming & Digital Solutions Company'
  },
  description: {
    ar: 'نحن شركة متخصصة في تطوير المواقع والتطبيقات والحلول الرقمية المبتكرة',
    en: 'We are a specialized company in developing websites, applications, and innovative digital solutions'
  },
  established: '2020',
  teamSize: '15+',
  projectsCompleted: '100+',
  happyClients: '80+'
};

// Navigation Configuration
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: { ar: 'الرئيسية', en: 'Home' },
    href: '/'
  },
  {
    id: 'services',
    label: { ar: 'الخدمات', en: 'Services' },
    href: '/services'
  },
  {
    id: 'portfolio',
    label: { ar: 'أعمالنا', en: 'Portfolio' },
    href: '/portfolio'
  },
  {
    id: 'about',
    label: { ar: 'من نحن', en: 'About' },
    href: '/about'
  },
  {
    id: 'blog',
    label: { ar: 'المدونة', en: 'Blog' },
    href: '/blog'
  }
];

// Services Configuration
export const SERVICES_CONFIG: Service[] = [
  {
    id: 'web-development',
    title: {
      ar: 'تطوير المواقع',
      en: 'Web Development'
    },
    description: {
      ar: 'تطوير مواقع ويب احترافية وسريعة الاستجابة باستخدام أحدث التقنيات',
      en: 'Professional responsive web development using latest technologies'
    },
    price: 15000,
    category: 'web',
    features: {
      ar: [
        'تصميم متجاوب',
        'سرعة تحميل عالية',
        'محسن لمحركات البحث',
        'لوحة تحكم',
        'دعم فني'
      ],
      en: [
        'Responsive Design',
        'Fast Loading',
        'SEO Optimized',
        'Admin Panel',
        'Technical Support'
      ]
    },
    popular: true,
    icon: 'globe'
  },
  {
    id: 'mobile-development',
    title: {
      ar: 'تطوير تطبيقات الجوال',
      en: 'Mobile Development'
    },
    description: {
      ar: 'تطوير تطبيقات جوال احترافية لنظامي iOS و Android',
      en: 'Professional mobile app development for iOS and Android'
    },
    price: 25000,
    category: 'mobile',
    features: {
      ar: [
        'دعم iOS و Android',
        'واجهة مستخدم حديثة',
        'أداء عالي',
        'متصل بالخوادم',
        'تحديثات مستمرة'
      ],
      en: [
        'iOS & Android Support',
        'Modern UI',
        'High Performance',
        'Server Connected',
        'Continuous Updates'
      ]
    },
    icon: 'smartphone'
  },
  {
    id: 'ecommerce',
    title: {
      ar: 'متاجر إلكترونية',
      en: 'E-commerce Solutions'
    },
    description: {
      ar: 'حلول متكاملة للمتاجر الإلكترونية مع بوابات دفع آمنة',
      en: 'Complete e-commerce solutions with secure payment gateways'
    },
    price: 30000,
    category: 'ecommerce',
    features: {
      ar: [
        'بوابات دفع متعددة',
        'إدارة المنتجات',
        'تتبع الطلبات',
        'تقارير مبيعات',
        'متعدد اللغات'
      ],
      en: [
        'Multiple Payment Gateways',
        'Product Management',
        'Order Tracking',
        'Sales Reports',
        'Multi-language Support'
      ]
    },
    popular: true,
    icon: 'shopping-cart'
  },
  {
    id: 'consulting',
    title: {
      ar: 'استشارات تقنية',
      en: 'Technical Consulting'
    },
    description: {
      ar: 'استشارات تقنية احترافية لتحسين أداء أعمالك الرقمية',
      en: 'Professional technical consulting to improve your digital business'
    },
    price: 5000,
    category: 'consulting',
    features: {
      ar: [
        'تحليل الأعمال',
        'تطوير الاستراتيجيات',
        'تحسين الأداء',
        'تدريب الفريق',
        'متابعة مستمرة'
      ],
      en: [
        'Business Analysis',
        'Strategy Development',
        'Performance Optimization',
        'Team Training',
        'Continuous Support'
      ]
    },
    icon: 'lightbulb'
  },
  {
    id: 'training',
    title: {
      ar: 'التدريب والتطوير',
      en: 'Training & Development'
    },
    description: {
      ar: 'برامج تدريبية احترافية في مجال البرمجة والتطوير',
      en: 'Professional training programs in programming and development'
    },
    price: 3000,
    category: 'training',
    features: {
      ar: [
        'دورات متخصصة',
        'مشاريع عملية',
        'شهادات معتمدة',
        'دعم مستمر',
        'مرونة في الجدولة'
      ],
      en: [
        'Specialized Courses',
        'Practical Projects',
        'Certified Certificates',
        'Ongoing Support',
        'Flexible Scheduling'
      ]
    },
    icon: 'graduation-cap'
  },
  {
    id: 'maintenance',
    title: {
      ar: 'الصيانة والدعم',
      en: 'Maintenance & Support'
    },
    description: {
      ar: 'خدمات صيانة ودعم فني مستمرة لمشاريعك',
      en: 'Continuous maintenance and technical support for your projects'
    },
    price: 2000,
    category: 'maintenance',
    features: {
      ar: [
        'صيانة دورية',
        'تحديثات أمنية',
        'نسخ احتياطي',
        'مراقبة الأداء',
        'دعم فني 24/7'
      ],
      en: [
        'Regular Maintenance',
        'Security Updates',
        'Backup Services',
        'Performance Monitoring',
        '24/7 Technical Support'
      ]
    },
    icon: 'wrench'
  }
];

// Budget Categories
export const BUDGET_CATEGORIES = {
  development: {
    ar: 'التطوير',
    en: 'Development'
  },
  marketing: {
    ar: 'التسويق',
    en: 'Marketing'
  },
  operations: {
    ar: 'العمليات',
    en: 'Operations'
  },
  tools: {
    ar: 'الأدوات',
    en: 'Tools'
  },
  other: {
    ar: 'أخرى',
    en: 'Other'
  }
};

// Budget Ranges
export const BUDGET_RANGES = {
  under_10k: {
    ar: 'أقل من 10,000 ريال',
    en: 'Under 10,000 SAR'
  },
  '10k_25k': {
    ar: '10,000 - 25,000 ريال',
    en: '10,000 - 25,000 SAR'
  },
  '25k_50k': {
    ar: '25,000 - 50,000 ريال',
    en: '25,000 - 50,000 SAR'
  },
  '50k_100k': {
    ar: '50,000 - 100,000 ريال',
    en: '50,000 - 100,000 SAR'
  },
  over_100k: {
    ar: 'أكثر من 100,000 ريال',
    en: 'Over 100,000 SAR'
  }
};

// Experience Levels
export const EXPERIENCE_LEVELS = {
  beginner: {
    ar: 'مبتدئ',
    en: 'Beginner'
  },
  intermediate: {
    ar: 'متوسط',
    en: 'Intermediate'
  },
  advanced: {
    ar: 'متقدم',
    en: 'Advanced'
  },
  expert: {
    ar: 'خبير',
    en: 'Expert'
  }
};

// Training Courses
export const TRAINING_COURSES = {
  'web-development': {
    ar: 'تطوير الويب',
    en: 'Web Development'
  },
  'mobile-development': {
    ar: 'تطوير تطبيقات الجوال',
    en: 'Mobile App Development'
  },
  'frontend': {
    ar: 'تطوير الواجهات الأمامية',
    en: 'Frontend Development'
  },
  'backend': {
    ar: 'تطوير الخوادم',
    en: 'Backend Development'
  },
  'database': {
    ar: 'قواعد البيانات',
    en: 'Database Design'
  },
  'ui-ux': {
    ar: 'تصميم واجهات المستخدم',
    en: 'UI/UX Design'
  }
};

// Social Media Links
export const SOCIAL_MEDIA_LINKS = [
  {
    name: 'facebook',
    url: 'https://facebook.com/waqak',
    icon: 'facebook'
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/waqak',
    icon: 'twitter'
  },
  {
    name: 'linkedin',
    url: 'https://linkedin.com/company/waqak',
    icon: 'linkedin'
  },
  {
    name: 'instagram',
    url: 'https://instagram.com/waqak',
    icon: 'instagram'
  },
  {
    name: 'whatsapp',
    url: `https://wa.me/${APP_CONFIG.whatsappNumber.replace('+', '')}`,
    icon: 'whatsapp'
  }
];

// Animation Durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500
};

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// Z-Index Values
export const Z_INDEX = {
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  tooltip: 60,
  notification: 70
};

// Error Messages
export const ERROR_MESSAGES = {
  networkError: {
    ar: 'حدث خطأ في الاتصال بالشبكة',
    en: 'Network connection error'
  },
  validationError: {
    ar: 'يرجى التحقق من البيانات المدخلة',
    en: 'Please check the entered data'
  },
  notFound: {
    ar: 'الصفحة غير موجودة',
    en: 'Page not found'
  },
  unauthorized: {
    ar: 'غير مصرح بالوصول',
    en: 'Unauthorized access'
  },
  serverError: {
    ar: 'خطأ في الخادم',
    en: 'Server error'
  }
};

// Success Messages
export const SUCCESS_MESSAGES = {
  formSubmitted: {
    ar: 'تم إرسال النموذج بنجاح',
    en: 'Form submitted successfully'
  },
  recordSaved: {
    ar: 'تم حفظ البيانات بنجاح',
    en: 'Data saved successfully'
  },
  recordDeleted: {
    ar: 'تم حذف السجل بنجاح',
    en: 'Record deleted successfully'
  },
  loginSuccessful: {
    ar: 'تم تسجيل الدخول بنجاح',
    en: 'Login successful'
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  services: '/api/services',
  portfolio: '/api/portfolio',
  training: '/api/training',
  expenses: '/api/expenses',
  budget: '/api/budget',
  contact: '/api/contact',
  auth: '/api/auth'
};

// Default Pagination
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10
};