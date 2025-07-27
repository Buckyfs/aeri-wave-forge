# Supabase Database Connection Setup Guide

This guide provides a complete setup for connecting your web applications to Supabase, avoiding common connection issues.

## 🚀 Quick Start Checklist

- [ ] Create Supabase project
- [ ] Get project credentials
- [ ] Set up environment variables
- [ ] Install Supabase client
- [ ] Create connection files
- [ ] Set up database schema
- [ ] Configure RLS policies
- [ ] Test connection

## 📋 Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Node.js Project**: Any React, Next.js, Vue, or vanilla JS project
3. **Package Manager**: npm, yarn, or pnpm

## 🔧 Step-by-Step Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose a name (e.g., "my-app-database")
4. Set a database password
5. Choose a region (closest to your users)
6. Wait for project creation (2-3 minutes)

### 2. Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://abc123.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 3. Install Supabase Client

```bash
# For React/Vite projects
npm install @supabase/supabase-js

# For Next.js projects
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# For Vue projects
npm install @supabase/supabase-js
```

### 4. Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# For Next.js, use:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**:
- For Vite/React: Use `VITE_` prefix
- For Next.js: Use `NEXT_PUBLIC_` prefix
- Never commit `.env.local` to git

### 5. Create Connection Files

#### For Vite/React Projects

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

#### For Next.js Projects

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 6. Create Database Service

Create `src/lib/database.ts`:

```typescript
import { supabase } from './supabase';

// Generic database operations
export class DatabaseService {
  // Insert data into any table
  static async insert<T>(table: string, data: T) {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  // Get all data from a table
  static async getAll<T>(table: string): Promise<T[]> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get data by ID
  static async getById<T>(table: string, id: string): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Update data
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

  // Delete data
  static async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
```

### 7. Create React Hooks (Optional)

Create `src/hooks/useDatabase.ts`:

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DatabaseService } from '@/lib/database';

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
  });
};
```

### 8. Set Up Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Example table structure
CREATE TABLE IF NOT EXISTS example_table (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending'
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_example_created_at ON example_table(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_example_status ON example_table(status);

-- Enable RLS
ALTER TABLE example_table ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (IMPORTANT: This fixes connection issues!)
CREATE POLICY "Allow anonymous inserts" ON example_table
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all" ON example_table
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update" ON example_table
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
```

### 9. Test Connection

Create a test component:

```typescript
import { supabase } from '@/lib/supabase';

export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('example_table')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Connection failed:', error);
      return false;
    }

    console.log('Connection successful!');
    return true;
  } catch (err) {
    console.error('Connection error:', err);
    return false;
  }
}
```

## 🚨 Common Issues & Solutions

### Issue 1: "Invalid authentication credentials"
**Solution**: Check your environment variables are correct and loaded

### Issue 2: "Row-level security policy violation"
**Solution**: Run the RLS policies from step 8

### Issue 3: "Table does not exist"
**Solution**: Run the schema SQL in your Supabase dashboard

### Issue 4: Environment variables not loading
**Solution**:
- Restart your development server
- Check variable names match your framework
- Ensure `.env.local` is in project root

### Issue 5: Forms using old API module instead of database hooks
**Solution**:
- Replace `api` module calls with database hooks
- Use `useCreateRecord`, `useSubscribeToNewsletter`, etc.
- Remove manual toast handling (hooks handle it automatically)

## 📁 File Structure

```
your-project/
├── .env.local                 # Environment variables
├── src/
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client
│   │   └── database.ts        # Database service
│   ├── hooks/
│   │   └── useDatabase.ts     # React hooks
│   └── components/
│       └── forms/             # Your forms
└── README.md
```

## 🔒 Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use different keys** for development/staging/production
3. **Enable RLS** on all tables
4. **Use proper RLS policies** for your use case
5. **Rotate keys** regularly

## 🚀 Deployment

### Vercel
1. Add environment variables in Vercel dashboard
2. Deploy your app

### Netlify
1. Add environment variables in Netlify dashboard
2. Deploy your app

### Other Platforms
1. Add environment variables in your platform's settings
2. Deploy your app

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## 🎯 Quick Copy-Paste Setup

For a new project, just copy these files and update the environment variables!

## ⚠️ Important: Use Database Hooks, Not Direct API Calls

**Critical Lesson Learned**: Always use the database hooks instead of direct API calls.

### ❌ Don't Do This (Old Way):
```typescript
import { api } from '@/lib/api';

const handleSubmit = async (data) => {
  try {
    await api.submitData(data);
    // Manual toast handling
    toast({ title: "Success" });
  } catch (error) {
    // Manual error handling
    toast({ title: "Error" });
  }
};
```

### ✅ Do This Instead (New Way):
```typescript
import { useCreateRecord } from '@/hooks/useDatabase';

const MyForm = () => {
  const createRecord = useCreateRecord<MyType>('my_table');

  const handleSubmit = async (data) => {
    await createRecord.mutateAsync(data);
    // Hooks handle success/error automatically!
  };
};
```

**Benefits of using hooks:**
- ✅ Automatic success/error handling
- ✅ Built-in loading states
- ✅ Automatic cache invalidation
- ✅ TypeScript support
- ✅ Consistent error messages
- ✅ No manual toast management needed

---

**Need help?** Check the troubleshooting section above or refer to the Supabase documentation.
