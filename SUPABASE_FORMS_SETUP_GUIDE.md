# 🚀 Supabase Forms Setup Guide - Foolproof Edition

## 📋 Prerequisites
- Supabase project created
- React/Vite project ready
- Coolify deployment configured

---

## 🔧 Step-by-Step Setup

### 1. **Database Schema Setup**
Run this SQL in your Supabase SQL Editor:

```sql
-- Create all tables
CREATE TABLE IF NOT EXISTS partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  partnership_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS researchers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  research_area TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mentors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  expertise_area TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS supporters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  support_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DISABLE RLS FOR PUBLIC FORMS (CRITICAL!)
ALTER TABLE partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE researchers DISABLE ROW LEVEL SECURITY;
ALTER TABLE mentors DISABLE ROW LEVEL SECURITY;
ALTER TABLE supporters DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON partners TO anon;
GRANT ALL ON researchers TO anon;
GRANT ALL ON mentors TO anon;
GRANT ALL ON supporters TO anon;
GRANT ALL ON newsletter TO anon;

GRANT ALL ON partners TO authenticated;
GRANT ALL ON researchers TO authenticated;
GRANT ALL ON mentors TO authenticated;
GRANT ALL ON supporters TO authenticated;
GRANT ALL ON newsletter TO authenticated;
```

### 2. **Environment Variables Setup**

#### Local Development (`.env.local`)
```bash
# CRITICAL: Use HTTPS for Supabase URL
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Coolify Production Environment Variables
Add these in your Coolify dashboard:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. **Code Implementation**

#### `src/lib/config.ts`
```typescript
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here',
  },
  app: {
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV,
  },
};

export const validateEnvironment = () => {
  const requiredVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    console.log('Using fallback values for Supabase configuration');
  }
};
```

#### `src/lib/database.ts`
```typescript
import { supabase } from './supabase';
import { config } from './config';

export class DatabaseService {
  static async createPartner(partner: any) {
    console.log('Creating partner with config:', config.supabase);
    console.log('Supabase client:', supabase);

    try {
      const { data, error } = await supabase
        .from('partners')
        .insert([{ ...partner, status: 'pending' }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }

  static async subscribeToNewsletter(email: string) {
    try {
      const { data, error } = await supabase
        .from('newsletter')
        .insert([{ email }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }

  // Add other methods as needed...
}
```

#### `src/hooks/useDatabase.ts`
```typescript
import { useMutation } from '@tanstack/react-query';
import { DatabaseService } from '@/lib/database';

export const useCreatePartner = () => {
  return useMutation({
    mutationFn: DatabaseService.createPartner,
    onSuccess: (data) => {
      console.log('Partner created:', data);
    },
    onError: (error) => {
      console.error('Partner creation failed:', error);
    },
  });
};

export const useSubscribeToNewsletter = () => {
  return useMutation({
    mutationFn: DatabaseService.subscribeToNewsletter,
    onSuccess: (data) => {
      console.log('Newsletter subscription:', data);
    },
    onError: (error) => {
      console.error('Newsletter subscription failed:', error);
    },
  });
};
```

### 4. **Form Component Example**
```typescript
import { useCreatePartner } from '@/hooks/useDatabase';

export function PartnerForm() {
  const createPartner = useCreatePartner();

  const handleSubmit = async (formData: any) => {
    try {
      await createPartner.mutateAsync(formData);
      // Show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  );
}
```

---

## 🚨 CRITICAL LESSONS LEARNED

### 1. **HTTPS Protocol Mismatch** ⚠️
**Problem**: Using `http://` when Supabase Kong requires `https://`
- **Local**: May work due to development settings
- **Production**: Will fail with "Failed to fetch" errors
- **Solution**: Always use `https://` in environment variables

### 2. **Environment Variable Prefixes** ⚠️
**Problem**: Using `NEXT_PUBLIC_` instead of `VITE_`
- **Vite projects**: Use `VITE_` prefix
- **Next.js projects**: Use `NEXT_PUBLIC_` prefix
- **Solution**: Match your framework's requirements

### 3. **Row Level Security (RLS)** ⚠️
**Problem**: RLS policies blocking anonymous inserts
- **Public forms**: Disable RLS entirely
- **Authenticated forms**: Use proper RLS policies
- **Solution**: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`

### 4. **Environment Variables in Production** ⚠️
**Problem**: Variables not set in Coolify
- **Local**: Works with `.env.local`
- **Production**: Must set in Coolify dashboard
- **Solution**: Always configure production environment variables

### 5. **Anon Key Format** ⚠️
**Problem**: Malformed keys due to line wrapping
- **Terminal**: Keys get split across lines
- **Solution**: Use `echo` commands or copy-paste carefully

---

## 🔍 Debugging Checklist

### Local Testing
- [ ] Environment variables set in `.env.local`
- [ ] Using correct protocol (HTTPS)
- [ ] Using correct prefix (`VITE_`)
- [ ] Database tables created
- [ ] RLS disabled for public forms
- [ ] Permissions granted to `anon` role

### Production Testing
- [ ] Environment variables set in Coolify
- [ ] Using correct protocol (HTTPS)
- [ ] Using correct prefix (`VITE_`)
- [ ] Database accessible from production
- [ ] No CORS issues
- [ ] Network connectivity confirmed

### Debug Tools
```typescript
// Add this component for production debugging
export function DebugPanel() {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('partners').select('count');
      setConnectionStatus(error ? 'Failed' : 'Success');
    } catch (error) {
      setConnectionStatus('Failed');
    }
  };

  return (
    <div className="debug-panel">
      <h3>Debug Panel</h3>
      <p>URL: {import.meta.env.VITE_SUPABASE_URL}</p>
      <p>Key: {import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 20)}...</p>
      <button onClick={testConnection}>Test Connection</button>
      <p>Status: {connectionStatus}</p>
    </div>
  );
}
```

---

## 🎯 Quick Start Template

1. **Copy the SQL schema** to your Supabase SQL Editor
2. **Set environment variables** (local and production)
3. **Copy the code files** to your project
4. **Test locally** with debug panel
5. **Deploy to Coolify** with environment variables
6. **Test production** with debug panel
7. **Remove debug panel** once confirmed working

---

## ✅ Success Indicators

- ✅ Connection test passes
- ✅ Form submission creates database records
- ✅ Success messages display
- ✅ No console errors
- ✅ Works in both local and production

**This guide should make your forms work "right out of the box" for all future projects!** 🚀
