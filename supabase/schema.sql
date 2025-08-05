-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables for AERI application

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_created_at ON partners(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_researchers_status ON researchers(status);
CREATE INDEX IF NOT EXISTS idx_researchers_created_at ON researchers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_supporters_created_at ON supporters(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentors_status ON mentors(status);
CREATE INDEX IF NOT EXISTS idx_mentors_created_at ON mentors(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed ON newsletter(subscribed);

-- Enable Row Level Security (RLS)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE researchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for form submissions)
CREATE POLICY "Allow public insert on partners" ON partners
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on researchers" ON researchers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on supporters" ON supporters
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on mentors" ON mentors
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public upsert on newsletter" ON newsletter
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on newsletter" ON newsletter
    FOR UPDATE USING (true);

-- Create policies for authenticated users (for admin access)
CREATE POLICY "Allow authenticated users to view all data" ON partners
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to view all data" ON researchers
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to view all data" ON supporters
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to view all data" ON mentors
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to view all data" ON newsletter
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for admin users to update status
CREATE POLICY "Allow admin to update partner status" ON partners
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin to update researcher status" ON researchers
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin to update mentor status" ON mentors
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create functions for analytics
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

-- CMS Content tables
CREATE TABLE IF NOT EXISTS cms_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    section_key TEXT UNIQUE NOT NULL, -- e.g., 'hero_title', 'hero_subtitle', 'about_description'
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'html', 'image', 'json')),
    title TEXT NOT NULL, -- Human readable title for admin
    content TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true
);

-- CMS Admin users table
CREATE TABLE IF NOT EXISTS cms_admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for CMS tables
CREATE INDEX IF NOT EXISTS idx_cms_content_section_key ON cms_content(section_key);
CREATE INDEX IF NOT EXISTS idx_cms_content_published ON cms_content(is_published);
CREATE INDEX IF NOT EXISTS idx_cms_admins_email ON cms_admins(email);
CREATE INDEX IF NOT EXISTS idx_cms_admins_active ON cms_admins(is_active);

-- NOTE: RLS is DISABLED for CMS tables to prevent site breakage
-- Enable RLS for CMS tables - COMMENTED OUT TO PREVENT ISSUES
-- ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_admins ENABLE ROW LEVEL SECURITY;

-- CMS content policies - COMMENTED OUT SINCE RLS IS DISABLED
-- CREATE POLICY "Allow public to read published content" ON cms_content
--     FOR SELECT USING (is_published = true);

-- CMS admin policies - COMMENTED OUT SINCE RLS IS DISABLED
-- CREATE POLICY "Allow admin to manage content" ON cms_content
--     FOR ALL USING (auth.role() = 'authenticated');

-- CREATE POLICY "Allow admin to read admin table" ON cms_admins
--     FOR SELECT USING (auth.role() = 'authenticated');

-- Insert default content
INSERT INTO cms_content (section_key, content_type, title, content) VALUES 
('hero_title', 'text', 'Hero Title', 'Advancing Ethical AI Research'),
('hero_subtitle', 'text', 'Hero Subtitle', 'Empowering the next generation of AI researchers with ethical frameworks and collaborative opportunities'),
('hero_cta_text', 'text', 'Hero CTA Button', 'Get Started'),
('about_title', 'text', 'About Title', 'About AERI'),
('about_description', 'html', 'About Description', 'The Advancing Ethical AI Research Initiative (AERI) is dedicated to fostering responsible innovation in artificial intelligence. We bring together researchers, students, and industry partners to develop AI technologies that prioritize human welfare, fairness, and transparency.'),
('impact_researchers', 'text', 'Impact - Researchers Count', '50+'),
('impact_projects', 'text', 'Impact - Projects Count', '25+'),
('impact_publications', 'text', 'Impact - Publications Count', '100+'),
('impact_partners', 'text', 'Impact - Partners Count', '15+'),
('footer_description', 'text', 'Footer Description', 'Advancing Ethical AI Research Initiative - Building a responsible future through collaborative innovation.')
ON CONFLICT (section_key) DO NOTHING;

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER cms_content_updated_at
    BEFORE UPDATE ON cms_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_dashboard_stats() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_updated_at() TO anon, authenticated;
