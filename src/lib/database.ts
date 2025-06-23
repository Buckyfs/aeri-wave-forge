import { supabase } from './supabase';
import type {
  Partner,
  Researcher,
  Supporter,
  Mentor,
  Newsletter
} from '@/types/database';

// Database service class for all table operations
export class DatabaseService {
  // Partner operations
  static async createPartner(partner: Omit<Partner, 'id' | 'created_at' | 'status'>): Promise<Partner> {
    const { data, error } = await supabase
      .from('partners')
      .insert([{ ...partner, status: 'pending' }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getPartners(): Promise<Partner[]> {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async updatePartnerStatus(id: string, status: Partner['status']): Promise<Partner> {
    const { data, error } = await supabase
      .from('partners')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Researcher operations
  static async createResearcher(researcher: Omit<Researcher, 'id' | 'created_at' | 'status'>): Promise<Researcher> {
    const { data, error } = await supabase
      .from('researchers')
      .insert([{ ...researcher, status: 'pending' }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getResearchers(): Promise<Researcher[]> {
    const { data, error } = await supabase
      .from('researchers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async updateResearcherStatus(id: string, status: Researcher['status']): Promise<Researcher> {
    const { data, error } = await supabase
      .from('researchers')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supporter operations
  static async createSupporter(supporter: Omit<Supporter, 'id' | 'created_at'>): Promise<Supporter> {
    const { data, error } = await supabase
      .from('supporters')
      .insert([supporter])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getSupporters(): Promise<Supporter[]> {
    const { data, error } = await supabase
      .from('supporters')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Mentor operations
  static async createMentor(mentor: Omit<Mentor, 'id' | 'created_at' | 'status'>): Promise<Mentor> {
    const { data, error } = await supabase
      .from('mentors')
      .insert([{ ...mentor, status: 'pending' }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getMentors(): Promise<Mentor[]> {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async updateMentorStatus(id: string, status: Mentor['status']): Promise<Mentor> {
    const { data, error } = await supabase
      .from('mentors')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Newsletter operations
  static async subscribeToNewsletter(email: string): Promise<Newsletter> {
    const { data, error } = await supabase
      .from('newsletter')
      .upsert([{ email, subscribed: true }], { onConflict: 'email' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async unsubscribeFromNewsletter(email: string): Promise<Newsletter> {
    const { data, error } = await supabase
      .from('newsletter')
      .update({ subscribed: false })
      .eq('email', email)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getNewsletterSubscribers(): Promise<Newsletter[]> {
    const { data, error } = await supabase
      .from('newsletter')
      .select('*')
      .eq('subscribed', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Analytics and reporting
  static async getDashboardStats() {
    const [
      { count: partnersCount },
      { count: researchersCount },
      { count: supportersCount },
      { count: mentorsCount },
      { count: newsletterCount }
    ] = await Promise.all([
      supabase.from('partners').select('*', { count: 'exact', head: true }),
      supabase.from('researchers').select('*', { count: 'exact', head: true }),
      supabase.from('supporters').select('*', { count: 'exact', head: true }),
      supabase.from('mentors').select('*', { count: 'exact', head: true }),
      supabase.from('newsletter').select('*', { count: 'exact', head: true }).eq('subscribed', true)
    ]);

    return {
      partners: partnersCount || 0,
      researchers: researchersCount || 0,
      supporters: supportersCount || 0,
      mentors: mentorsCount || 0,
      newsletterSubscribers: newsletterCount || 0
    };
  }
}
