-- =====================================================
-- FIX ALL TABLES FOR AERI WAVE FORGE
-- =====================================================
-- Run this in Supabase SQL Editor to fix all forms
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CREATE ALL TABLES
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
-- CREATE INDEXES
-- =====================================================

-- Partners indexes
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_created_at ON partners(created_at DESC);

-- Researchers indexes
CREATE INDEX IF NOT EXISTS idx_researchers_status ON researchers(status);
CREATE INDEX IF NOT EXISTS idx_researchers_created_at ON researchers(created_at DESC);

-- Supporters indexes
CREATE INDEX IF NOT EXISTS idx_supporters_created_at ON supporters(created_at DESC);

-- Mentors indexes
CREATE INDEX IF NOT EXISTS idx_mentors_status ON mentors(status);
CREATE INDEX IF NOT EXISTS idx_mentors_created_at ON mentors(created_at DESC);

-- Newsletter indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed ON newsletter(subscribed);

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE researchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE RLS POLICIES FOR ALL TABLES
-- =====================================================

-- Partners policies
DROP POLICY IF EXISTS "Allow anonymous inserts on partners" ON partners;
CREATE POLICY "Allow anonymous inserts on partners" ON partners
    FOR INSERT TO anon WITH CHECK (true);

-- Researchers policies
DROP POLICY IF EXISTS "Allow anonymous inserts on researchers" ON researchers;
CREATE POLICY "Allow anonymous inserts on researchers" ON researchers
    FOR INSERT TO anon WITH CHECK (true);

-- Supporters policies
DROP POLICY IF EXISTS "Allow anonymous inserts on supporters" ON supporters;
CREATE POLICY "Allow anonymous inserts on supporters" ON supporters
    FOR INSERT TO anon WITH CHECK (true);

-- Mentors policies
DROP POLICY IF EXISTS "Allow anonymous inserts on mentors" ON mentors;
CREATE POLICY "Allow anonymous inserts on mentors" ON mentors
    FOR INSERT TO anon WITH CHECK (true);

-- Newsletter policies
DROP POLICY IF EXISTS "Allow anonymous inserts on newsletter" ON newsletter;
CREATE POLICY "Allow anonymous inserts on newsletter" ON newsletter
    FOR INSERT TO anon WITH CHECK (true);

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

GRANT ALL ON partners TO anon, authenticated;
GRANT ALL ON researchers TO anon, authenticated;
GRANT ALL ON supporters TO anon, authenticated;
GRANT ALL ON mentors TO anon, authenticated;
GRANT ALL ON newsletter TO anon, authenticated;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check all tables exist
SELECT 'Tables created:' as info;
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter')
ORDER BY table_name;

-- Check all policies exist
SELECT 'Policies created:' as info;
SELECT tablename, policyname
FROM pg_policies
WHERE tablename IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter')
ORDER BY tablename, policyname;
