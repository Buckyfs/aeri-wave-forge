import { supabase } from './supabase';
import type { Partner, Researcher, Supporter, Mentor, Newsletter } from '@/types/database';

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
  }
}; 