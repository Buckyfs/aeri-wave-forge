-- CMS Migration Script for AERI Website
-- Run this in your Supabase SQL Editor

-- Create CMS Content table
CREATE TABLE IF NOT EXISTS cms_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    section_key TEXT UNIQUE NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'html', 'image', 'json')),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true
);

-- Create CMS Admin users table (optional for future use)
CREATE TABLE IF NOT EXISTS cms_admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cms_content_section_key ON cms_content(section_key);
CREATE INDEX IF NOT EXISTS idx_cms_content_published ON cms_content(is_published);
CREATE INDEX IF NOT EXISTS idx_cms_admins_email ON cms_admins(email);

-- Insert default content for the website - COMPREHENSIVE COVERAGE
INSERT INTO cms_content (section_key, content_type, title, content) VALUES

-- Hero Section (Homepage)
('hero_title', 'text', 'Hero Main Title', 'Advancing Ethical AI Research'),
('hero_subtitle', 'text', 'Hero Subtitle', 'Empowering the next generation of AI researchers with ethical frameworks and collaborative opportunities'),
('hero_cta_text', 'text', 'Hero CTA Button', 'Get Started'),

-- About Page
('about_page_title', 'text', 'About Page Title', 'About Applied Engineering Research Institute (AERI)'),
('about_page_subtitle', 'text', 'About Page Subtitle', 'Empowering creators to build the next generation of digital experiences'),
('about_mission_title', 'text', 'Mission Section Title', 'Our Mission'),
('about_mission_content', 'html', 'Mission Content', 'At Applied Engineering Research Institute (AERI), we''re dedicated to revolutionizing the way digital experiences are created and shared. Our platform combines cutting-edge technology with intuitive design tools to empower creators of all skill levels.'),
('about_values_title', 'text', 'Values Section Title', 'Our Values'),
('about_innovation_title', 'text', 'Innovation Value Title', 'Innovation'),
('about_innovation_content', 'text', 'Innovation Value Content', 'We push the boundaries of what''s possible in digital creation'),
('about_accessibility_title', 'text', 'Accessibility Value Title', 'Accessibility'),
('about_accessibility_content', 'text', 'Accessibility Value Content', 'Making powerful tools available to creators of all backgrounds'),
('about_community_title', 'text', 'Community Value Title', 'Community'),
('about_community_content', 'text', 'Community Value Content', 'Building a supportive ecosystem for creators to thrive'),

-- Projects Page
('projects_title', 'text', 'Projects Page Title', 'Our Projects'),
('projects_subtitle', 'text', 'Projects Page Subtitle', 'Explore our latest innovations in digital creation and collaboration'),

-- Currently Exploring Section (Homepage)
('exploring_title', 'text', 'Currently Exploring Title', 'Currently Exploring'),
('exploring_subtitle', 'text', 'Currently Exploring Subtitle', 'Discover our cutting-edge research projects that aim to solve real-world environmental challenges through innovative engineering solutions.'),

-- Meet Our Innovators Section (Homepage)
('innovators_title', 'text', 'Innovators Section Title', 'Meet Our Innovators'),
('innovators_subtitle', 'text', 'Innovators Section Subtitle', 'AERI brings together passionate students, experienced mentors, and industry experts to foster collaboration and drive sustainable innovation.'),
('innovators_stats', 'text', 'Community Stats', '500+ Community Members and Growing'),
('innovators_description', 'text', 'Community Description', 'Our community spans across 15 universities and 8 countries, united by the mission to create sustainable environmental solutions through applied engineering research.'),

-- Community Page
('community_title', 'text', 'Community Page Title', 'Join Our Community'),
('community_subtitle', 'text', 'Community Page Subtitle', 'Connect, learn, and create with fellow digital creators'),
('community_highlights_title', 'text', 'Community Highlights Title', 'Community Highlights'),
('community_spotlight_title', 'text', 'Creator Spotlight Title', 'Creator Spotlight'),
('community_spotlight_content', 'text', 'Creator Spotlight Content', 'Weekly features of outstanding projects and creators from our community'),
('community_events_title', 'text', 'Community Events Title', 'Community Events'),
('community_events_content', 'text', 'Community Events Content', 'Regular meetups, workshops, and collaborative sessions'),
('community_resources_title', 'text', 'Learning Resources Title', 'Learning Resources'),
('community_resources_content', 'text', 'Learning Resources Content', 'Tutorials, guides, and documentation created by the community'),
('community_forums_title', 'text', 'Discussion Forums Title', 'Discussion Forums'),
('community_forums_content', 'text', 'Discussion Forums Content', 'Active spaces for sharing ideas, getting help, and connecting'),
('community_get_involved_title', 'text', 'Get Involved Title', 'Get Involved'),
('community_get_involved_subtitle', 'text', 'Get Involved Subtitle', 'There are many ways to contribute to and benefit from our community. Join us and be part of something special.'),

-- Impact Page
('impact_title', 'text', 'Impact Page Title', 'Our Global Impact'),
('impact_subtitle', 'text', 'Impact Page Subtitle', 'Transforming digital creation and empowering creators worldwide'),
('impact_stats_users', 'text', 'Active Users Count', '50K+'),
('impact_stats_users_label', 'text', 'Active Users Label', 'Active Users'),
('impact_stats_users_desc', 'text', 'Active Users Description', 'Creators using our platform'),
('impact_stats_projects', 'text', 'Projects Created Count', '100K+'),
('impact_stats_projects_label', 'text', 'Projects Created Label', 'Projects Created'),
('impact_stats_projects_desc', 'text', 'Projects Created Description', 'Digital experiences launched'),
('impact_stats_countries', 'text', 'Countries Count', '120+'),
('impact_stats_countries_label', 'text', 'Countries Label', 'Countries'),
('impact_stats_countries_desc', 'text', 'Countries Description', 'Global community reach'),
('impact_stats_events', 'text', 'Community Events Count', '500+'),
('impact_stats_events_label', 'text', 'Community Events Label', 'Community Events'),
('impact_stats_events_desc', 'text', 'Community Events Description', 'Workshops and meetups'),
('impact_success_title', 'text', 'Success Stories Title', 'Success Stories'),

-- Collaborate With Us (Homepage Section)
('collab_homepage_title', 'text', 'Collaborate Section Title', 'Collaborate With Us'),
('collab_homepage_subtitle', 'text', 'Collaborate Section Subtitle', 'Together, we can accelerate innovation and create meaningful solutions to our most pressing environmental challenges.'),
('collab_organizations_title', 'text', 'For Organizations Title', 'For Organizations'),
('collab_organizations_subtitle', 'text', 'For Organizations Subtitle', 'Partner with us to accelerate environmental innovation'),
('collab_students_title', 'text', 'For Students Title', 'For Students'),
('collab_students_subtitle', 'text', 'For Students Subtitle', 'Join our community of innovators'),
('collab_supporters_title', 'text', 'For Supporters Title', 'For Supporters'),
('collab_supporters_subtitle', 'text', 'For Supporters Subtitle', 'Help empower young innovators'),

-- Get Started Page
('getstarted_title', 'text', 'Get Started Page Title', 'Get Started with AERI'),
('getstarted_subtitle', 'text', 'Get Started Page Subtitle', 'Join our community of innovators and start making an impact today. Choose your path to begin your journey with AERI.'),
('getstarted_researchers_title', 'text', 'For Researchers Title', 'For Researchers'),
('getstarted_researchers_content', 'text', 'For Researchers Content', 'Lead innovative projects and gain hands-on experience.'),
('getstarted_mentors_title', 'text', 'For Mentors Title', 'For Mentors'),
('getstarted_mentors_content', 'text', 'For Mentors Content', 'Share your expertise and guide the next generation.'),
('getstarted_partners_title', 'text', 'For Partners Title', 'For Partners'),
('getstarted_partners_content', 'text', 'For Partners Content', 'Collaborate with us on groundbreaking research.'),

-- Ready to Make Your Mark Section (Homepage)
('mark_title', 'text', 'Make Your Mark Title', 'Ready to Make Your Mark?'),
('mark_subtitle', 'text', 'Make Your Mark Subtitle', 'Choose your path and join us in creating sustainable solutions for tomorrow''s challenges.'),
('mark_newsletter_title', 'text', 'Newsletter Section Title', 'Stay Updated on Our Journey'),
('mark_newsletter_subtitle', 'text', 'Newsletter Section Subtitle', 'Subscribe to our newsletter for project updates, research breakthroughs, and community achievements.'),

-- Footer Content
('footer_org_name', 'text', 'Footer Organization Name', 'AERI'),
('footer_org_full_name', 'text', 'Footer Full Name', 'APPLIED ENGINEERING RESEARCH INSTITUTE'),
('footer_description', 'text', 'Footer Description', 'Empowering the next generation of innovators to solve environmental challenges through applied engineering research.'),
('footer_contact_address', 'text', 'Footer Address', '8300 Wisconsin Ave'),
('footer_contact_city', 'text', 'Footer City', 'Bethesda, MD 20814'),
('footer_contact_country', 'text', 'Footer Country', 'United States'),
('footer_contact_email', 'text', 'Footer Email', 'contact@aeri-research.org'),
('footer_copyright', 'text', 'Footer Copyright', '© 2025 AERI. All rights reserved.')

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
DROP TRIGGER IF EXISTS cms_content_updated_at ON cms_content;
CREATE TRIGGER cms_content_updated_at
    BEFORE UPDATE ON cms_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Note: RLS is intentionally NOT enabled to prevent site breakage
-- Grant permissions (these may already exist)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_updated_at() TO anon, authenticated;
