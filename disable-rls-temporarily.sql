-- Temporarily disable RLS on all tables to test insertion
-- This is for debugging only - we'll re-enable it later

-- Disable RLS on partners table
ALTER TABLE public.partners DISABLE ROW LEVEL SECURITY;

-- Disable RLS on researchers table
ALTER TABLE public.researchers DISABLE ROW LEVEL SECURITY;

-- Disable RLS on supporters table
ALTER TABLE public.supporters DISABLE ROW LEVEL SECURITY;

-- Disable RLS on mentors table
ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;

-- Disable RLS on newsletter table
ALTER TABLE public.newsletter DISABLE ROW LEVEL SECURITY;
