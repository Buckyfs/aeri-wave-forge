-- =====================================================
-- FIX MISSING TABLES AND POLICIES
-- =====================================================
-- This script only creates what's missing, avoiding conflicts
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CREATE TABLES (only if they don't exist)
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
-- CREATE INDEXES (only if they don't exist)
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
-- ENABLE RLS (safe to run multiple times)
-- =====================================================

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE researchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE POLICIES (only if they don't exist)
-- =====================================================

-- Partners policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'partners' AND policyname = 'Allow anonymous inserts on partners') THEN
        CREATE POLICY "Allow anonymous inserts on partners" ON partners
            FOR INSERT TO anon WITH CHECK (true);
    END IF;
END $$;

-- Researchers policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'researchers' AND policyname = 'Allow anonymous inserts on researchers') THEN
        CREATE POLICY "Allow anonymous inserts on researchers" ON researchers
            FOR INSERT TO anon WITH CHECK (true);
    END IF;
END $$;

-- Supporters policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'supporters' AND policyname = 'Allow anonymous inserts on supporters') THEN
        CREATE POLICY "Allow anonymous inserts on supporters" ON supporters
            FOR INSERT TO anon WITH CHECK (true);
    END IF;
END $$;

-- Mentors policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'mentors' AND policyname = 'Allow anonymous inserts on mentors') THEN
        CREATE POLICY "Allow anonymous inserts on mentors" ON mentors
            FOR INSERT TO anon WITH CHECK (true);
    END IF;
END $$;

-- Newsletter policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'newsletter' AND policyname = 'Allow anonymous inserts on newsletter') THEN
        CREATE POLICY "Allow anonymous inserts on newsletter" ON newsletter
            FOR INSERT TO anon WITH CHECK (true);
    END IF;
END $$;

-- =====================================================
-- GRANT PERMISSIONS (safe to run multiple times)
-- =====================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check what we have now
SELECT 'Tables created:' as info;
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter')
ORDER BY table_name;

SELECT 'Policies created:' as info;
SELECT tablename, policyname
FROM pg_policies
WHERE tablename IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter')
ORDER BY tablename, policyname;
