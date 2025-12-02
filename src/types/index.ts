// Language and Internationalization Types
export type Language = 'en' | 'ar';

export interface TranslationKeys {
  // Navigation
  home: string;
  services: string;
  portfolio: string;
  about: string;
  blog: string;
  contact: string;
  getQuote: string;
  browseWork: string;

  // Company Info
  companyName: string;
  programming: string;

  // Hero Section
  welcome: string;
  heroSubtitle: string;
  websites: string;
  websitesDesc: string;
  mobileApps: string;
  mobileAppsDesc: string;
  customSolutions: string;
  customSolutionsDesc: string;

  // Services
  ourServices: string;
  servicesDesc: string;
  webDevelopment: string;
  webDevelopmentDesc: string;
  mobileDevelopment: string;
  mobileDevelopmentDesc: string;
  ecommerce: string;
  ecommerceDesc: string;
  consulting: string;
  consultingDesc: string;
  training: string;
  trainingDesc: string;
  maintenance: string;
  maintenanceDesc: string;

  // About
  aboutUs: string;
  ourStory: string;
  mission: string;
  vision: string;
  values: string;

  // Portfolio
  ourWork: string;
  workDesc: string;
  viewProject: string;
  livePreview: string;

  // Contact
  contactUs: string;
  contactDesc: string;
  sendEmail: string;
  callUs: string;
  visitUs: string;

  // Forms
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
  service: string;
  budget: string;
  submit: string;
  required: string;
  invalidEmail: string;

  // Auth
  login: string;
  signup: string;
  logout: string;
  dashboard: string;
  admin: string;

  // Common
  loading: string;
  error: string;
  success: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  add: string;
  search: string;
  filter: string;
  sort: string;
}

// Business Types
export interface Service {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  price: number;
  category: 'web' | 'mobile' | 'ecommerce' | 'consulting' | 'training' | 'maintenance';
  features: { ar: string[]; en: string[] };
  popular?: boolean;
  icon?: string;
}

export interface Portfolio {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  category: 'web' | 'mobile' | 'ecommerce' | 'consulting';
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  order: number;
  featured: boolean;
}

export interface TrainingApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  course: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  created_at: string;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  period: 'monthly' | 'yearly';
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
}

export interface TrainingFormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  course: string;
  message: string;
}

// API Types
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// UI Types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
  code?: string;
}

export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: string;
}

// SEO Types
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: { ar: string; en: string };
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

// Chart Types
export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface FinancialData {
  revenue: number;
  expenses: number;
  profit: number;
  expensesByCategory: ChartData[];
  monthlyTrend: ChartData[];
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
}

// Configuration Types
export interface AppConfig {
  siteUrl: string;
  apiUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  whatsappNumber: string;
  email: string;
  phone: string;
  address: string;
}

// Validation Types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}