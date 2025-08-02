// Environment configuration with fallbacks
export const config = {
  // Supabase configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'http://supabase.aeri-research.org',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc1Mzg4MDEwMCwiZXhwIjo0OTA5NTUzNzAwLCJyb2xlIjoiYW5vbiJ9.y-l9Zkfd4FTm_JakQne7p3r42xMZeZG0guRg8wUyE1U',
  },

  // App configuration
  app: {
    name: 'AERI - Applied Engineering Research Institute',
    description: 'Empowering the next generation of engineering innovators',
    baseUrl: import.meta.env.BASE_URL || '/aeri-wave-forge/',
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV,
  },

  // API configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
  },
} as const;

// Environment validation
export const validateEnvironment = () => {
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
  ];

  const missing = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    console.log('Using fallback values for Supabase configuration');
  }
};
