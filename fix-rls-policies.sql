-- Fix RLS policies for partners table
-- Drop existing policies first
DROP POLICY IF EXISTS "Allow anonymous submissions" ON public.partners;
DROP POLICY IF EXISTS "Allow users to view their own submissions" ON public.partners;
DROP POLICY IF EXISTS "Admins can do all on partners" ON public.partners;

-- Create correct policies for partners table
CREATE POLICY "Allow anonymous inserts on partners"
ON public.partners FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all partners"
ON public.partners FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to update partners"
ON public.partners FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix RLS policies for researchers table
DROP POLICY IF EXISTS "Allow anonymous submissions" ON public.researchers;
DROP POLICY IF EXISTS "Allow users to view their own submissions" ON public.researchers;
DROP POLICY IF EXISTS "Admins can do all on researchers" ON public.researchers;

CREATE POLICY "Allow anonymous inserts on researchers"
ON public.researchers FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all researchers"
ON public.researchers FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to update researchers"
ON public.researchers FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix RLS policies for supporters table
DROP POLICY IF EXISTS "Allow anonymous donations" ON public.supporters;
DROP POLICY IF EXISTS "Allow users to view their own donations" ON public.supporters;
DROP POLICY IF EXISTS "Admins can do all on supporters" ON public.supporters;

CREATE POLICY "Allow anonymous inserts on supporters"
ON public.supporters FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all supporters"
ON public.supporters FOR SELECT
TO authenticated
USING (true);

-- Fix RLS policies for mentors table
DROP POLICY IF EXISTS "Allow anonymous submissions" ON public.mentors;
DROP POLICY IF EXISTS "Allow users to view their own submissions" ON public.mentors;
DROP POLICY IF EXISTS "Admins can do all on mentors" ON public.mentors;

CREATE POLICY "Allow anonymous inserts on mentors"
ON public.mentors FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all mentors"
ON public.mentors FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to update mentors"
ON public.mentors FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix RLS policies for newsletter table
DROP POLICY IF EXISTS "Allow anonymous subscriptions" ON public.newsletter;
DROP POLICY IF EXISTS "Allow users to manage their subscription" ON public.newsletter;
DROP POLICY IF EXISTS "Admins can do all on newsletter" ON public.newsletter;

CREATE POLICY "Allow anonymous inserts on newsletter"
ON public.newsletter FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all newsletter"
ON public.newsletter FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to update newsletter"
ON public.newsletter FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
