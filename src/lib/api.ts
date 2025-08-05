import { supabase } from './supabase';
import type { Partner, Researcher, Supporter, Mentor, Newsletter, CMSContent } from '@/types/database';

export const api = {
  // Partner functions
  async submitPartnerApplication(data: Omit<Partner, 'id' | 'created_at' | 'status'>) {
    const { error } = await supabase
      .from('partners')
      .insert([{ ...data, status: 'pending' }]);
    if (error) throw error;
  },

  // Researcher functions
  async submitResearcherApplication(data: Omit<Researcher, 'id' | 'created_at' | 'status'>) {
    const { error } = await supabase
      .from('researchers')
      .insert([{ ...data, status: 'pending' }]);
    if (error) throw error;
  },

  // Supporter functions
  async submitDonation(data: Omit<Supporter, 'id' | 'created_at'>) {
    const { error } = await supabase
      .from('supporters')
      .insert([data]);
    if (error) throw error;
  },

  // Mentor functions
  async submitMentorApplication(data: Omit<Mentor, 'id' | 'created_at' | 'status'>) {
    const { error } = await supabase
      .from('mentors')
      .insert([{ ...data, status: 'pending' }]);
    if (error) throw error;
  },

  // Newsletter functions
  async subscribeToNewsletter(email: string) {
    const { error } = await supabase
      .from('newsletter')
      .insert([{ email, subscribed: true }]);
    if (error) throw error;
  },

  // CMS functions (RLS disabled for compatibility)
  async getCMSContent(sectionKey?: string) {
    let query = supabase
      .from('cms_content')
      .select('*');
    
    if (sectionKey) {
      query = query.eq('section_key', sectionKey).single();
    }
    
    const { data, error } = await query;
    if (error) {
      console.warn('CMS content fetch error:', error);
      return null; // Return null instead of throwing to prevent site breakage
    }
    return data;
  },

  async updateCMSContent(sectionKey: string, content: string) {
    const { error } = await supabase
      .from('cms_content')
      .update({ content })
      .eq('section_key', sectionKey);
    if (error) {
      console.error('CMS content update error:', error);
      throw error;
    }
  },

  async getAllCMSContent() {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .order('section_key');
    if (error) {
      console.warn('CMS content fetch error:', error);
      return []; // Return empty array instead of throwing
    }
    return data || [];
  }
}; 