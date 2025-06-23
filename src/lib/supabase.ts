import { createClient } from '@supabase/supabase-js';
import { config, validateEnvironment } from './config';

// Validate environment variables
validateEnvironment();

export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);
