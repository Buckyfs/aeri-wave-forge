-- =====================================================
-- SUPABASE DATABASE SCHEMA TEMPLATE
-- =====================================================
-- Copy this template and customize for your project
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- EXAMPLE TABLES (Customize these for your project)
-- =====================================================

-- Example: Users/Contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Example: Submissions table
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied'))
);

-- Example: Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT UNIQUE NOT NULL,
    subscribed BOOLEAN NOT NULL DEFAULT true
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Contacts table indexes
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Submissions table indexes
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);

-- Newsletter table indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed ON newsletter(subscribed);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) - CRITICAL FOR CONNECTION
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES - ALLOW ANONYMOUS INSERTS
-- =====================================================

-- Contacts table policies
CREATE POLICY "Allow anonymous inserts on contacts" ON contacts
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all contacts" ON contacts
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update contacts" ON contacts
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Submissions table policies
CREATE POLICY "Allow anonymous inserts on submissions" ON submissions
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all submissions" ON submissions
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update submissions" ON submissions
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Newsletter table policies
CREATE POLICY "Allow anonymous inserts on newsletter" ON newsletter
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all newsletter" ON newsletter
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update newsletter" ON newsletter
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- =====================================================
-- PERMISSIONS
-- =====================================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- HELPER FUNCTIONS (Optional)
-- =====================================================

-- Function to get dashboard stats
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE (
    contacts_count BIGINT,
    submissions_count BIGINT,
    newsletter_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*) FROM contacts) as contacts_count,
        (SELECT COUNT(*) FROM submissions) as submissions_count,
        (SELECT COUNT(*) FROM newsletter WHERE subscribed = true) as newsletter_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION get_dashboard_stats() TO anon, authenticated;

-- =====================================================
-- USAGE INSTRUCTIONS
-- =====================================================

-- 1. Copy this template to your project
-- 2. Customize table names and columns for your needs
-- 3. Run this SQL in your Supabase SQL Editor
-- 4. Update your TypeScript types to match the schema
-- 5. Test the connection using the provided hooks

-- =====================================================
-- TROUBLESHOOTING
-- =====================================================

-- If you get "row-level security policy violation":
-- 1. Make sure RLS is enabled: ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
-- 2. Make sure you have INSERT policies for anonymous users
-- 3. Check that your policies use "WITH CHECK (true)" for INSERT operations

-- If you get "table does not exist":
-- 1. Run this schema SQL in your Supabase dashboard
-- 2. Check table names match exactly in your code

-- If you get "invalid authentication credentials":
-- 1. Check your environment variables are correct
-- 2. Restart your development server
-- 3. Verify your Supabase URL and anon key
