-- Check current RLS policies on all tables
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('partners', 'researchers', 'supporters', 'mentors', 'newsletter')
ORDER BY tablename, policyname;
