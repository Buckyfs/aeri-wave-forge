# 🚀 Supabase Quick Start Checklist

Use this checklist to set up Supabase in any new project. Follow the steps in order!

## ✅ Pre-Setup Checklist

- [ ] Supabase account created
- [ ] New Supabase project created
- [ ] Project credentials copied (URL + anon key)
- [ ] Node.js project ready

## 🔧 Setup Steps

### 1. Install Dependencies
```bash
npm install @supabase/supabase-js
# For React Query (optional but recommended)
npm install @tanstack/react-query
```

### 2. Create Environment File
Create `.env.local` in project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Copy Template Files
Copy these files from the `templates/` folder to your project:
- `supabase-client.ts` → `src/lib/supabase.ts`
- `database-service.ts` → `src/lib/database.ts`
- `react-hooks.ts` → `src/hooks/useDatabase.ts`
- `schema-template.sql` → Run in Supabase SQL Editor

### 4. Set Up Database Schema
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the content from `schema-template.sql`
3. Customize table names and columns for your project
4. Click "Run"

### 5. Test Connection
Create a test component or use the test function:
```typescript
import { testSupabaseConnection } from '@/lib/supabase';

// Test the connection
const result = await testSupabaseConnection();
console.log('Connection result:', result);
```

### 6. Create Your First Form
Use the example form as a template:
```typescript
import { useCreateRecord } from '@/hooks/useDatabase';

const createRecord = useCreateRecord<YourType>('your_table_name');
await createRecord.mutateAsync(yourData);
```

## 🚨 Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| "Invalid authentication credentials" | Check `.env.local` file and restart dev server |
| "Row-level security policy violation" | Run the RLS policies from schema template |
| "Table does not exist" | Run the schema SQL in Supabase dashboard |
| Environment variables not loading | Restart dev server and check variable names |
| Forms using old API module | Replace with database hooks (useCreateRecord, etc.) |

## 📁 File Structure After Setup

```
your-project/
├── .env.local                 # ✅ Environment variables
├── src/
│   ├── lib/
│   │   ├── supabase.ts        # ✅ Supabase client
│   │   └── database.ts        # ✅ Database service
│   ├── hooks/
│   │   └── useDatabase.ts     # ✅ React hooks
│   └── components/
│       └── forms/             # Your forms
└── README.md
```

## 🎯 Quick Copy-Paste Commands

### For Vite/React:
```bash
# Install dependencies
npm install @supabase/supabase-js @tanstack/react-query

# Create .env.local
echo "VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here" > .env.local
```

### For Next.js:
```bash
# Install dependencies
npm install @supabase/supabase-js @tanstack/react-query

# Create .env.local
echo "NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here" > .env.local
```

## 🔄 For Each New Project

1. **Copy the template files** from this project
2. **Update environment variables** with new project credentials
3. **Customize the schema** for your specific needs
4. **Test the connection** before building forms
5. **Use the hooks** for all database operations

## 📚 Next Steps

- Read the full `SUPABASE_SETUP_GUIDE.md` for detailed explanations
- Check the example form for usage patterns
- Customize the schema for your specific project needs
- Set up proper RLS policies for production

---

**Need help?** Check the troubleshooting section in `SUPABASE_SETUP_GUIDE.md`
