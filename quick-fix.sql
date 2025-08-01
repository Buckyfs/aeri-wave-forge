-- =====================================================
-- QUICK FIX FOR RESEARCHERS TABLE
-- =====================================================
-- Run this in Supabase SQL Editor to fix the researcher form
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create researchers table
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

-- Create index
CREATE INDEX IF NOT EXISTS idx_researchers_status ON researchers(status);
CREATE INDEX IF NOT EXISTS idx_researchers_created_at ON researchers(created_at DESC);

-- Enable RLS
ALTER TABLE researchers ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for anonymous inserts
DROP POLICY IF EXISTS "Allow anonymous inserts on researchers" ON researchers;
CREATE POLICY "Allow anonymous inserts on researchers" ON researchers
    FOR INSERT TO anon WITH CHECK (true);

-- Grant permissions
GRANT ALL ON researchers TO anon, authenticated;

-- Verify the table was created
SELECT 'Researchers table created successfully!' as status;
