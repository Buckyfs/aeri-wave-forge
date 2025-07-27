import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Test connection function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('example_table')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase connection failed:', error);
      return { success: false, error };
    }

    console.log('✅ Supabase connection successful!');
    return { success: true, data };
  } catch (err) {
    console.error('❌ Supabase connection error:', err);
    return { success: false, error: err };
  }
}
