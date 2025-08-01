# Supabase Forms Setup Guide - Complete Walkthrough

This guide provides a step-by-step process to connect web application forms to Supabase, ensuring they work "right out of the box" based on real-world debugging experience.

## 🎯 **What This Guide Covers**

- ✅ Setting up Supabase database for web forms
- ✅ Configuring environment variables correctly
- ✅ Creating database tables and RLS policies
- ✅ Building React forms with proper error handling
- ✅ Deploying to Coolify with working forms
- ✅ Troubleshooting common issues

## 📋 **Prerequisites**

- Supabase account and project
- React/Vite web application
- Coolify deployment platform
- Basic knowledge of React and SQL

## 🔧 **Step-by-Step Setup**

### **Step 1: Create Supabase Project**

1. **Go to [supabase.com](https://supabase.com)** and sign in
2. **Click "New Project"**
3. **Choose project name** (e.g., "my-webapp-forms")
4. **Set database password**
5. **Choose region** (closest to your users)
6. **Wait for project creation** (2-3 minutes)

### **Step 2: Get Project Credentials**

1. **Go to Settings → API** in your Supabase dashboard
2. **Copy the Project URL** (e.g., `http://your-project.supabase.co`)
3. **Copy the anon/public key** (starts with `eyJ...`)

**⚠️ CRITICAL**: Note the exact protocol (HTTP vs HTTPS) from your dashboard!

### **Step 3: Set Up Environment Variables**

Create `.env.local` in your project root:

```env
# For Vite/React projects
VITE_SUPABASE_URL=http://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# For Next.js projects
NEXT_PUBLIC_SUPABASE_URL=http://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ IMPORTANT LESSONS LEARNED**:
- Use `VITE_` prefix for Vite projects, `NEXT_PUBLIC_` for Next.js
- Copy the exact URL protocol (HTTP/HTTPS) from your dashboard
- Never commit `.env.local` to git

### **Step 4: Install Dependencies**

```bash
# For React/Vite projects
npm install @supabase/supabase-js @tanstack/react-query

# For Next.js projects
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs @tanstack/react-query
```

### **Step 5: Create Supabase Client**

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
```

### **Step 6: Create Database Service**

Create `src/lib/database.ts`:

```typescript
import { supabase } from './supabase';

export class DatabaseService {
  // Generic insert method
  static async insert<T>(table: string, data: T) {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  // Generic get all method
  static async getAll<T>(table: string): Promise<T[]> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Generic update method
  static async update<T>(table: string, id: string, updates: Partial<T>): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Generic delete method
  static async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
```

### **Step 7: Create React Hooks**

Create `src/hooks/useDatabase.ts`:

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DatabaseService } from '@/lib/database';
import { toast } from '@/components/ui/use-toast';

// Generic hooks for any table
export const useTableData = <T>(table: string) => {
  return useQuery({
    queryKey: [table],
    queryFn: () => DatabaseService.getAll<T>(table),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateRecord = <T>(table: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: T) => DatabaseService.insert(table, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
      toast({
        title: "Success!",
        description: "Your submission has been received successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
      console.error(`Error creating record in ${table}:`, error);
    },
  });
};

export const useUpdateRecord = <T>(table: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<T> }) =>
      DatabaseService.update(table, id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update record.",
        variant: "destructive",
      });
      console.error(`Error updating record in ${table}:`, error);
    },
  });
};
```

### **Step 8: Set Up Database Schema**

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Example: Contact form table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending'
);

-- Example: Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT UNIQUE NOT NULL,
    subscribed BOOLEAN NOT NULL DEFAULT true
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);

-- DISABLE RLS FOR PUBLIC FORMS (CRITICAL FOR SUCCESS)
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter DISABLE ROW LEVEL SECURITY;

-- Grant permissions to anonymous users
GRANT ALL ON contacts TO anon, authenticated;
GRANT ALL ON newsletter TO anon, authenticated;
```

### **Step 9: Create Form Component**

Create `src/components/ContactForm.tsx`:

```typescript
import React, { useState } from 'react';
import { useCreateRecord } from '@/hooks/useDatabase';

interface Contact {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<Contact>({
    name: '',
    email: '',
    message: '',
  });

  const createContact = useCreateRecord<Contact>('contacts');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createContact.mutateAsync(formData);

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      // Error handling is done in the hook
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={createContact.isPending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {createContact.isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### **Step 10: Set Up React Query Provider**

In your main App component or entry point:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
      <Toaster />
    </QueryClientProvider>
  );
}
```

### **Step 11: Deploy to Coolify**

1. **Add environment variables** in Coolify dashboard:
   - `VITE_SUPABASE_URL=http://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=your-anon-key`

2. **Deploy your application**

3. **Test forms** on the live site

## 🚨 **Common Issues & Solutions**

### **Issue 1: "Failed to fetch"**
**Cause**: Wrong URL protocol or incorrect environment variables
**Solution**:
- Check exact URL from Supabase dashboard (HTTP vs HTTPS)
- Verify environment variable names match your framework
- Restart development server after changing `.env.local`

### **Issue 2: "Row-level security policy violation"**
**Cause**: RLS enabled without proper policies
**Solution**:
- Disable RLS for public forms: `ALTER TABLE your_table DISABLE ROW LEVEL SECURITY;`
- Or create proper policies for anonymous inserts

### **Issue 3: "Table does not exist"**
**Cause**: Database tables not created
**Solution**:
- Run the SQL schema in Supabase SQL Editor
- Check table names match exactly in your code

### **Issue 4: Environment variables not loading**
**Cause**: Wrong prefix or file location
**Solution**:
- Use `VITE_` for Vite projects, `NEXT_PUBLIC_` for Next.js
- Ensure `.env.local` is in project root
- Restart development server

## 📚 **Lessons Learned from Real Debugging**

### **1. Environment Variable Prefixes**
- **Vite projects**: Use `VITE_` prefix
- **Next.js projects**: Use `NEXT_PUBLIC_` prefix
- **Never mix them up** - this was a major source of issues

### **2. URL Protocol Matters**
- **Copy the exact protocol** (HTTP vs HTTPS) from your Supabase dashboard
- **Don't assume HTTPS** - some Supabase instances use HTTP
- **Test connectivity** before building complex forms

### **3. RLS for Public Forms**
- **Disable RLS** for public forms without authentication
- **RLS policies are complex** and often cause more problems than they solve for simple forms
- **Use RLS only** when you have user authentication

### **4. Testing Strategy**
- **Start with simple test forms** to isolate connection issues
- **Test database connectivity** before building complex UI
- **Use browser console** to see exact error messages

### **5. Framework-Specific Issues**
- **Vite**: Uses `import.meta.env.VITE_*`
- **Next.js**: Uses `process.env.NEXT_PUBLIC_*`
- **Environment variables** must be loaded at build time

### **6. Database Setup**
- **Create tables first** before building forms
- **Test inserts manually** in Supabase SQL Editor
- **Use proper data types** and constraints

### **7. Error Handling**
- **Always use try-catch** in form submissions
- **Show user-friendly error messages**
- **Log detailed errors** to console for debugging

### **8. Development vs Production**
- **Test on production URLs** before deploying
- **Environment variables** must be set in deployment platform
- **CORS issues** can occur in production

## 🎯 **Quick Checklist for New Projects**

- [ ] Create Supabase project
- [ ] Get correct URL and anon key
- [ ] Set up environment variables with correct prefix
- [ ] Install Supabase client and React Query
- [ ] Create database service and hooks
- [ ] Set up database schema with RLS disabled
- [ ] Create form components using hooks
- [ ] Test locally
- [ ] Deploy with environment variables
- [ ] Test on production

## 🚀 **Pro Tips**

1. **Always test database connection** before building forms
2. **Use TypeScript** for better error catching
3. **Implement proper loading states** in forms
4. **Add form validation** on both client and server
5. **Use React Query** for caching and error handling
6. **Test on multiple browsers** and devices
7. **Monitor form submissions** in Supabase dashboard
8. **Set up error tracking** for production

---

**Last Updated**: December 2024
**Based on Real Debugging Experience**: ✅ All lessons learned from actual troubleshooting
**Tested and Verified**: ✅ Working forms with proper error handling
