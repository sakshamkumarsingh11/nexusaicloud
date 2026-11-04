// ===== Navigation =====
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ===== Service =====
export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
  features?: string[];
}

// ===== Case Study =====
export interface CaseStudy {
  id: string;
  industry: string;
  title: string;
  description: string;
  technologies: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  isFeatured?: boolean;
  isSample?: boolean;
}

// ===== Industry =====
export interface Industry {
  name: string;
  description: string;
  icon?: string;
}

// ===== Process Step =====
export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

// ===== Technology =====
export interface Technology {
  name: string;
  category?: string;
}

// ===== Contact Form =====
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  service?: string;
  budget?: string;
}

// ===== Enquiry (Admin) =====
export type EnquiryStatus = 'new' | 'in_progress' | 'completed';
export type EnquirySource = 'contact' | 'project' | 'service';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  service?: string;
  budget?: string;
  status: EnquiryStatus;
  source: EnquirySource;
  created_at: string;
  updated_at: string;
}

// ===== API Response =====
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// ===== Feature Card =====
export interface FeatureCard {
  number: string;
  title: string;
  description: string;
  variant: 'light' | 'dark';
}

// ===== Team Member =====
export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
}
