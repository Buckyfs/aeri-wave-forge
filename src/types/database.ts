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