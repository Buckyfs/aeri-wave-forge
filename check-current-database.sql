-- =====================================================
-- CHECK CURRENT DATABASE STATE
-- =====================================================

-- Check what tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter')
ORDER BY table_name;

-- Check if RLS is enabled on tables
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter')
ORDER BY tablename;

-- Check what policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter')
ORDER BY tablename, policyname;

-- Check permissions
SELECT grantee, table_name, privilege_type
FROM information_schema.role_table_grants
WHERE table_name IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter')
ORDER BY table_name, grantee;
