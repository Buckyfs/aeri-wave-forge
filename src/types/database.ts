export interface Partner {
  id: string;
  created_at: string;
  organization_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  partnership_type: 'business' | 'academic' | 'nonprofit';
  message: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Researcher {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  institution: string;
  research_area: string;
  cv_url?: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Supporter {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  amount: number;
  message?: string;
  is_recurring: boolean;
}

export interface Mentor {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  expertise: string;
  availability: string;
  linkedin_url?: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Newsletter {
  id: string;
  created_at: string;
  email: string;
  subscribed: boolean;
}

export interface CMSContent {
  id: string;
  created_at: string;
  updated_at: string;
  section_key: string;
  content_type: 'text' | 'html' | 'image' | 'json';
  title: string;
  content: string;
  is_published: boolean;
}

export interface CMSAdmin {
  id: string;
  created_at: string;
  email: string;
  password_hash: string;
  full_name: string;
  is_active: boolean;
  last_login?: string;
} 