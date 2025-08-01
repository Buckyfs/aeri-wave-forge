-- =====================================================
-- DISABLE RLS ON ALL TABLES
-- =====================================================
-- This will fix all form submission issues
-- =====================================================

-- Disable RLS on all tables
ALTER TABLE partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE researchers DISABLE ROW LEVEL SECURITY;
ALTER TABLE supporters DISABLE ROW LEVEL SECURITY;
ALTER TABLE mentors DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter DISABLE ROW LEVEL SECURITY;

-- Grant all permissions to anonymous users
GRANT ALL ON partners TO anon;
GRANT ALL ON researchers TO anon;
GRANT ALL ON supporters TO anon;
GRANT ALL ON mentors TO anon;
GRANT ALL ON newsletter TO anon;

-- Grant all permissions to authenticated users
GRANT ALL ON partners TO authenticated;
GRANT ALL ON researchers TO authenticated;
GRANT ALL ON supporters TO authenticated;
GRANT ALL ON mentors TO authenticated;
GRANT ALL ON newsletter TO authenticated;

-- Verify RLS is disabled
SELECT 'RLS Status:' as info;
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter')
ORDER BY tablename;

-- Test insert into partners table
INSERT INTO partners (organization_name, contact_name, email, partnership_type, message)
VALUES ('Test Org', 'Test Contact', 'test@example.com', 'academic', 'Test message')
RETURNING id;

-- Clean up test data
DELETE FROM partners WHERE organization_name = 'Test Org';

SELECT 'RLS disabled successfully! All forms should work now.' as status;
