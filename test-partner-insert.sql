-- =====================================================
-- TEST PARTNER INSERT
-- =====================================================

-- Check if partners table exists
SELECT 'Partners table exists:' as info;
SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name = 'partners'
) as table_exists;

-- Check RLS status
SELECT 'RLS status for partners:' as info;
SELECT rowsecurity FROM pg_tables WHERE tablename = 'partners';

-- Test insert into partners
INSERT INTO partners (organization_name, contact_name, email, partnership_type, message)
VALUES ('Test Organization', 'Test Contact', 'test@example.com', 'business', 'This is a test message')
RETURNING id, organization_name, created_at;

-- Clean up test data
DELETE FROM partners WHERE organization_name = 'Test Organization';

SELECT 'Partner insert test completed successfully!' as status;
