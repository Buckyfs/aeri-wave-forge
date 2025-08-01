-- =====================================================
-- AERI WAVE FORGE DATABASE SETUP
-- =====================================================
-- Run this in your Supabase SQL Editor to set up the new database
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    organization_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    partnership_type TEXT NOT NULL CHECK (partnership_type IN ('business', 'academic', 'nonprofit')),
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Researchers table
CREATE TABLE IF NOT EXISTS researchers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    institution TEXT NOT NULL,
    research_area TEXT NOT NULL,
    cv_url TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Supporters table
CREATE TABLE IF NOT EXISTS supporters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    message TEXT,
    is_recurring BOOLEAN NOT NULL DEFAULT false
);

-- Mentors table
CREATE TABLE IF NOT EXISTS mentors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    expertise TEXT NOT NULL,
    availability TEXT NOT NULL,
    linkedin_url TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT UNIQUE NOT NULL,
    subscribed BOOLEAN NOT NULL DEFAULT true
);

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Partners indexes
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_created_at ON partners(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partners_email ON partners(email);

-- Researchers indexes
CREATE INDEX IF NOT EXISTS idx_researchers_status ON researchers(status);
CREATE INDEX IF NOT EXISTS idx_researchers_created_at ON researchers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_researchers_email ON researchers(email);

-- Supporters indexes
CREATE INDEX IF NOT EXISTS idx_supporters_created_at ON supporters(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_supporters_email ON supporters(email);

-- Mentors indexes
CREATE INDEX IF NOT EXISTS idx_mentors_status ON mentors(status);
CREATE INDEX IF NOT EXISTS idx_mentors_created_at ON mentors(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentors_email ON mentors(email);

-- Newsletter indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed ON newsletter(subscribed);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE researchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE RLS POLICIES FOR ANONYMOUS ACCESS
-- =====================================================

-- Partners policies
CREATE POLICY "Allow anonymous inserts on partners" ON partners
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all partners" ON partners
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update partners" ON partners
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Researchers policies
CREATE POLICY "Allow anonymous inserts on researchers" ON researchers
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all researchers" ON researchers
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update researchers" ON researchers
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Supporters policies
CREATE POLICY "Allow anonymous inserts on supporters" ON supporters
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all supporters" ON supporters
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update supporters" ON supporters
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Mentors policies
CREATE POLICY "Allow anonymous inserts on mentors" ON mentors
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all mentors" ON mentors
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update mentors" ON mentors
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Newsletter policies
CREATE POLICY "Allow anonymous inserts on newsletter" ON newsletter
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all newsletter" ON newsletter
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update newsletter" ON newsletter
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- CREATE HELPER FUNCTION FOR DASHBOARD STATS
-- =====================================================

CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE (
    partners_count BIGINT,
    researchers_count BIGINT,
    supporters_count BIGINT,
    mentors_count BIGINT,
    newsletter_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*) FROM partners) as partners_count,
        (SELECT COUNT(*) FROM researchers) as researchers_count,
        (SELECT COUNT(*) FROM supporters) as supporters_count,
        (SELECT COUNT(*) FROM mentors) as mentors_count,
        (SELECT COUNT(*) FROM newsletter WHERE subscribed = true) as newsletter_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION get_dashboard_stats() TO anon, authenticated;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if tables were created successfully
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter');

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter');

-- Check if policies exist
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter');
