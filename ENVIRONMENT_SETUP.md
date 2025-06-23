# Environment Setup Guide

This guide will help you set up your environment variables and connect your AERI application to Supabase.

## 🚀 Quick Start

### 1. Create Environment File

Create a `.env.local` file in your project root:

```bash
# Copy the example file
cp .env.example .env.local
```

### 2. Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up/Login and create a new project
   - Choose a name (e.g., "aeri-wave-forge")
   - Select your region
   - Wait for the project to be created

2. **Get Your Project Credentials**
   - In your Supabase dashboard, go to **Settings** → **API**
   - Copy the following values:
     - **Project URL** (e.g., `https://your-project.supabase.co`)
     - **anon/public key** (starts with `eyJ...`)

3. **Update Your Environment File**

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Base URL for deployment
BASE_URL=/aeri-wave-forge/
```

### 3. Set Up Database Tables

1. **Open Supabase SQL Editor**
   - In your Supabase dashboard, go to **SQL Editor**
   - Create a new query

2. **Run the Schema Script**
   - Copy the contents of `supabase/schema.sql`
   - Paste it into the SQL editor
   - Click **Run** to create all tables

3. **Verify Tables Created**
   - Go to **Table Editor** in your dashboard
   - You should see these tables:
     - `partners`
     - `researchers`
     - `supporters`
     - `mentors`
     - `newsletter`

## 🔧 Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `BASE_URL` | Base URL for deployment | No | `/aeri-wave-forge/` |

## 🌐 Deployment Environment Variables

### For GitHub Pages (GitHub Secrets)

Set these in your GitHub repository settings:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `supabase_url`: Your Supabase project URL
   - `supabase_anon_key`: Your Supabase anonymous key

### For Coolify

1. In your Coolify dashboard, go to your application settings
2. Add these environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `BASE_URL` (if deploying to a subdirectory)

### For Other Platforms

- **Vercel**: Add in Project Settings → Environment Variables
- **Netlify**: Add in Site Settings → Environment Variables
- **Railway**: Add in Variables tab
- **Render**: Add in Environment section

## 🔒 Security Best Practices

### 1. Never Commit Environment Files

Ensure `.env.local` is in your `.gitignore`:

```gitignore
.env.local
.env.*.local
```

### 2. Use Different Keys for Different Environments

- **Development**: Use your local `.env.local`
- **Staging**: Use staging environment variables
- **Production**: Use production environment variables

### 3. Rotate Keys Regularly

- Regularly rotate your Supabase keys
- Use different keys for different environments
- Monitor key usage in Supabase dashboard

## 🧪 Testing Your Connection

### 1. Test Locally

```bash
# Start your development server
npm run dev

# Check the browser console for any connection errors
# Try submitting a form to test database operations
```

### 2. Test Database Operations

You can test the connection by:

1. **Submitting a form** (e.g., Partner Form)
2. **Checking Supabase dashboard** for new records
3. **Using the browser console** to test queries

### 3. Debug Connection Issues

If you encounter issues:

1. **Check environment variables** are loaded correctly
2. **Verify Supabase URL and key** are correct
3. **Check browser console** for error messages
4. **Verify RLS policies** are set up correctly
5. **Check network tab** for failed requests

## 📊 Database Schema Overview

### Tables Structure

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `partners` | Partnership applications | organization_name, contact_name, email, status |
| `researchers` | Research applications | full_name, email, institution, research_area |
| `supporters` | Support donations | full_name, email, amount, is_recurring |
| `mentors` | Mentor applications | full_name, email, expertise, availability |
| `newsletter` | Newsletter subscriptions | email, subscribed |

### Row Level Security (RLS)

- **Public Insert**: Anyone can submit forms
- **Authenticated Read**: Only authenticated users can view data
- **Authenticated Update**: Only authenticated users can update status

## 🚨 Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Check your `.env.local` file exists
   - Verify variable names are correct
   - Restart your development server

2. **"Permission denied" errors**
   - Check RLS policies in Supabase
   - Verify table permissions
   - Check if user is authenticated (if required)

3. **"Network error" or "Connection failed"**
   - Check your internet connection
   - Verify Supabase URL is correct
   - Check if Supabase service is down

4. **"Table does not exist"**
   - Run the schema.sql script in Supabase
   - Check table names match exactly
   - Verify you're in the correct schema

### Getting Help

1. **Check Supabase logs** in your dashboard
2. **Review browser console** for detailed error messages
3. **Test with Supabase CLI** for local development
4. **Check Supabase documentation** for specific issues

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [TypeScript with Supabase](https://supabase.com/docs/guides/api/typescript-support)
