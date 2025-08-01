# AERI Wave Forge - Database Reconnection Guide

This guide documents the complete process of reconnecting the AERI Wave Forge website to a new Supabase database after rebuilding the database.

## 🎯 **What This Guide Covers**

- ✅ Setting up environment variables for new database
- ✅ Creating all necessary database tables
- ✅ Configuring Row Level Security (RLS) policies
- ✅ Updating code to use correct table names
- ✅ Testing all forms (Research, Mentors, Partners, Newsletter)
- ✅ Troubleshooting common issues

## 📋 **Prerequisites**

- New Supabase database created
- Supabase URL and anon key ready
- Access to Supabase SQL Editor
- Local development environment running

## 🔧 **Step-by-Step Process**

### 1. **Environment Variables Setup**

**File**: `.env.local` (create in project root)

```env
# Supabase Configuration (NEW DATABASE)
VITE_SUPABASE_URL=https://supabase.aeri-research.org
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc1Mzg4MDEwMCwiZXhwIjo0OTA5NTUzNzAwLCJyb2xlIjoiYW5vbiJ9.y-l9Zkfd4FTm_JakQne7p3r42xMZeZG0guRg8wUyE1U

# Optional: Base URL for deployment
BASE_URL=/aeri-wave-forge/
```

**Important Notes**:
- Use `VITE_` prefix for Vite/React projects
- Never commit `.env.local` to git
- Restart development server after updating

### 2. **Database Schema Setup**

**File**: `setup-new-database.sql` (run in Supabase SQL Editor)

This script creates:
- ✅ All required tables (`partners`, `researchers`, `supporters`, `mentors`, `newsletter`)
- ✅ Proper indexes for performance
- ✅ Row Level Security (RLS) enabled
- ✅ Anonymous insert policies for forms
- ✅ Dashboard stats function

**To run**:
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the entire `setup-new-database.sql` content
3. Click "Run" to execute

### 3. **Code Updates**

**Files Updated**:
- `src/lib/database.ts` - Updated table names from `partner2`/`newsletter2` to `partners`/`newsletter`

**Key Changes**:
```typescript
// Before (old code)
.from('partner2')
.from('newsletter2')

// After (new code)
.from('partners')
.from('newsletter')
```

### 4. **Testing Process**

**Test Each Form**:

1. **Newsletter Subscription** (Homepage)
   - Go to homepage
   - Enter email in newsletter form
   - Should show success message

2. **Partner Application** (`/become-partner`)
   - Fill out partner form
   - Should submit successfully
   - Check Supabase dashboard for new record

3. **Researcher Application** (`/apply-researcher`)
   - Fill out researcher form
   - Should submit successfully

4. **Mentor Application** (`/become-mentor`)
   - Fill out mentor form
   - Should submit successfully

5. **Support Form** (`/support`)
   - Fill out support form
   - Should submit successfully

## 🚨 **Common Issues & Solutions**

### Issue 1: "Invalid authentication credentials"
**Solution**:
- Check environment variables are correct
- Restart development server
- Verify Supabase URL and anon key

### Issue 2: "Row-level security policy violation"
**Solution**:
- Run the RLS policies from `setup-new-database.sql`
- Ensure policies use `TO anon WITH CHECK (true)`

### Issue 3: "Table does not exist"
**Solution**:
- Run the complete `setup-new-database.sql` script
- Check table names match exactly in code

### Issue 4: Forms not working after database switch
**Solution**:
- Update code to use correct table names
- Ensure RLS policies are in place
- Test connection with debug function

## 🔍 **Verification Queries**

Run these in Supabase SQL Editor to verify setup:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter');

-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter');

-- Check policies exist
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter');
```

## 📁 **File Structure**

```
aeri-wave-forge/
├── .env.local                    # Environment variables
├── setup-new-database.sql        # Database setup script
├── src/
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   └── database.ts          # Database service (updated)
│   ├── hooks/
│   │   └── useDatabase.ts       # React hooks
│   └── components/
│       └── forms/               # Form components
└── templates/                   # Reusable templates
```

## 🎯 **Success Criteria**

✅ All forms submit successfully without errors
✅ Data appears in Supabase dashboard
✅ No console errors in browser
✅ Newsletter subscription works
✅ All application forms work
✅ Dashboard stats function works

## 🚀 **Deployment Notes**

When deploying:
1. Add environment variables to your hosting platform
2. Use the same variable names (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
3. Ensure database is accessible from your deployment domain

## 📚 **Additional Resources**

- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## 🔄 **Quick Reconnection Process**

For future database rebuilds:

1. **Update `.env.local`** with new credentials
2. **Run `setup-new-database.sql`** in Supabase SQL Editor
3. **Restart development server**: `npm run dev`
4. **Test all forms** to ensure they work
5. **Deploy with new environment variables**

---

**Last Updated**: December 2024
**Database URL**: https://supabase.aeri-research.org
**Status**: ✅ All forms working correctly
