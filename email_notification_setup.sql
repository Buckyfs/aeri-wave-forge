-- Email Notification System for Self-Hosted Supabase
-- This creates database triggers that call external webhook for email notifications

-- Create email notifications log table
CREATE TABLE IF NOT EXISTS email_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    email_type TEXT NOT NULL,
    recipient_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    error_message TEXT
);

-- Create webhook notification function
CREATE OR REPLACE FUNCTION notify_email_webhook()
RETURNS TRIGGER AS $$
DECLARE
    webhook_url TEXT := 'https://your-webhook-service.com/send-email'; -- Replace with your webhook URL
    email_subject TEXT;
    email_content TEXT;
    recipient_email TEXT := 'natalie@aeri-research.org'; -- Natalie's email
BEGIN
    -- Determine email content based on table
    CASE TG_TABLE_NAME
        WHEN 'partners' THEN
            email_subject := 'New Partnership Application - ' || NEW.organization_name;
            email_content := format(
                'New partnership application received:

Organization: %s
Contact: %s
Email: %s
Phone: %s
Type: %s
Message: %s

View in admin: https://www.aeri-research.org/admin/dashboard',
                NEW.organization_name,
                NEW.contact_name,
                NEW.email,
                COALESCE(NEW.phone, 'Not provided'),
                NEW.partnership_type,
                NEW.message
            );

        WHEN 'researchers' THEN
            email_subject := 'New Researcher Application - ' || NEW.full_name;
            email_content := format(
                'New researcher application received:

Name: %s
Email: %s
Institution: %s
Research Area: %s
CV URL: %s
Message: %s

View in admin: https://www.aeri-research.org/admin/dashboard',
                NEW.full_name,
                NEW.email,
                NEW.institution,
                NEW.research_area,
                COALESCE(NEW.cv_url, 'Not provided'),
                NEW.message
            );

        WHEN 'mentors' THEN
            email_subject := 'New Mentor Application - ' || NEW.full_name;
            email_content := format(
                'New mentor application received:

Name: %s
Email: %s
Expertise: %s
Availability: %s
LinkedIn: %s
Message: %s

View in admin: https://www.aeri-research.org/admin/dashboard',
                NEW.full_name,
                NEW.email,
                NEW.expertise,
                NEW.availability,
                COALESCE(NEW.linkedin_url, 'Not provided'),
                NEW.message
            );

        WHEN 'supporters' THEN
            email_subject := 'New Support Donation - $' || NEW.amount;
            email_content := format(
                'New support donation received:

Name: %s
Email: %s
Amount: $%s
Recurring: %s
Message: %s

View in admin: https://www.aeri-research.org/admin/dashboard',
                NEW.full_name,
                NEW.email,
                NEW.amount,
                CASE WHEN NEW.is_recurring THEN 'Yes' ELSE 'No' END,
                COALESCE(NEW.message, 'No message')
            );

        WHEN 'newsletter' THEN
            email_subject := 'New Newsletter Subscription';
            email_content := format(
                'New newsletter subscription:

Email: %s
Subscribed at: %s

View in admin: https://www.aeri-research.org/admin/dashboard',
                NEW.email,
                NEW.created_at
            );

        ELSE
            email_subject := 'New Form Submission';
            email_content := 'A new form submission was received. Check your admin dashboard for details.';
    END CASE;

    -- Insert email notification record
    INSERT INTO email_notifications (
        table_name,
        record_id,
        email_type,
        recipient_email,
        subject,
        content
    ) VALUES (
        TG_TABLE_NAME,
        NEW.id,
        'form_submission',
        recipient_email,
        email_subject,
        email_content
    );

    -- Here you would normally call a webhook, but for self-hosted setups,
    -- we'll create a simpler solution below

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all form tables
DROP TRIGGER IF EXISTS partner_email_trigger ON partners;
CREATE TRIGGER partner_email_trigger
    AFTER INSERT ON partners
    FOR EACH ROW
    EXECUTE FUNCTION notify_email_webhook();

DROP TRIGGER IF EXISTS researcher_email_trigger ON researchers;
CREATE TRIGGER researcher_email_trigger
    AFTER INSERT ON researchers
    FOR EACH ROW
    EXECUTE FUNCTION notify_email_webhook();

DROP TRIGGER IF EXISTS mentor_email_trigger ON mentors;
CREATE TRIGGER mentor_email_trigger
    AFTER INSERT ON mentors
    FOR EACH ROW
    EXECUTE FUNCTION notify_email_webhook();

DROP TRIGGER IF EXISTS supporter_email_trigger ON supporters;
CREATE TRIGGER supporter_email_trigger
    AFTER INSERT ON supporters
    FOR EACH ROW
    EXECUTE FUNCTION notify_email_webhook();

DROP TRIGGER IF EXISTS newsletter_email_trigger ON newsletter;
CREATE TRIGGER newsletter_email_trigger
    AFTER INSERT ON newsletter
    FOR EACH ROW
    EXECUTE FUNCTION notify_email_webhook();

-- Grant permissions
GRANT ALL ON email_notifications TO anon, authenticated;
