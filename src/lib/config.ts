// Environment configuration with fallbacks
export const config = {
  // Supabase configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key',
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

  if (missing.length > 0 && config.app.isProduction) {
    console.error('Missing required environment variables:', missing);
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (missing.length > 0 && config.app.isDevelopment) {
    console.warn('Missing environment variables in development:', missing);
  }
};
