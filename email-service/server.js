const express = require('express');
const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Email transporter (Gmail configuration)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,    // Your Gmail address
    pass: process.env.EMAIL_PASS     // Your Gmail App Password
  }
});

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Email templates
const createEmailTemplate = (table, data) => {
  switch (table) {
    case 'partners':
      return {
        subject: `🤝 New Partnership Application - ${data.organization_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">New Partnership Application</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Organization:</strong> ${data.organization_name}</p>
              <p><strong>Contact Person:</strong> ${data.contact_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
              <p><strong>Partnership Type:</strong> ${data.partnership_type}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-left: 4px solid #1e40af;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p><a href="https://www.aeri-research.org/admin/dashboard" style="background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Dashboard</a></p>
          </div>
        `
      };
      
    case 'researchers':
      return {
        subject: `🔬 New Researcher Application - ${data.full_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">New Researcher Application</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Institution:</strong> ${data.institution}</p>
              <p><strong>Research Area:</strong> ${data.research_area}</p>
              <p><strong>CV/Resume:</strong> ${data.cv_url ? `<a href="${data.cv_url}">View CV</a>` : 'Not provided'}</p>
              <p><strong>Research Interests:</strong></p>
              <div style="background: white; padding: 15px; border-left: 4px solid #1e40af;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p><a href="https://www.aeri-research.org/admin/dashboard" style="background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Dashboard</a></p>
          </div>
        `
      };
      
    case 'mentors':
      return {
        subject: `👨‍🏫 New Mentor Application - ${data.full_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">New Mentor Application</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Area of Expertise:</strong> ${data.expertise}</p>
              <p><strong>Availability:</strong> ${data.availability}</p>
              <p><strong>LinkedIn:</strong> ${data.linkedin_url ? `<a href="${data.linkedin_url}">View Profile</a>` : 'Not provided'}</p>
              <p><strong>Why they want to mentor:</strong></p>
              <div style="background: white; padding: 15px; border-left: 4px solid #1e40af;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p><a href="https://www.aeri-research.org/admin/dashboard" style="background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Dashboard</a></p>
          </div>
        `
      };
      
    case 'supporters':
      return {
        subject: `💝 New Support Donation - $${data.amount}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">New Support Donation</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Amount:</strong> $${data.amount}</p>
              <p><strong>Recurring:</strong> ${data.is_recurring ? 'Yes' : 'No'}</p>
              ${data.message ? `
                <p><strong>Message:</strong></p>
                <div style="background: white; padding: 15px; border-left: 4px solid #1e40af;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              ` : ''}
            </div>
            <p><a href="https://www.aeri-research.org/admin/dashboard" style="background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Dashboard</a></p>
          </div>
        `
      };
      
    case 'newsletter':
      return {
        subject: `📧 New Newsletter Subscription`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">New Newsletter Subscription</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Subscribed at:</strong> ${new Date(data.created_at).toLocaleString()}</p>
            </div>
            <p><a href="https://www.aeri-research.org/admin/dashboard" style="background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Dashboard</a></p>
          </div>
        `
      };
      
    default:
      return {
        subject: '📝 New Form Submission',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Form Submission</h2>
            <p>A new form submission was received. Check your admin dashboard for details.</p>
            <p><a href="https://www.aeri-research.org/admin/dashboard">View Admin Dashboard</a></p>
          </div>
        `
      };
  }
};

// Function to send email
async function sendNotificationEmail(table, record) {
  try {
    const emailData = createEmailTemplate(table, record);
    
    const mailOptions = {
      from: `AERI Website <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: emailData.subject,
      html: emailData.html
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent for ${table} submission:`, result.messageId);
    return true;
  } catch (error) {
    console.error(`❌ Error sending email for ${table}:`, error);
    return false;
  }
}

// Polling function to check for new submissions
async function pollForNewSubmissions() {
  const tables = ['partners', 'researchers', 'mentors', 'supporters', 'newsletter'];
  
  for (const table of tables) {
    try {
      // Check for records from the last 2 minutes
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .gte('created_at', twoMinutesAgo)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error(`Error querying ${table}:`, error);
        continue;
      }
      
      // Send email for each new record
      for (const record of data || []) {
        await sendNotificationEmail(table, record);
      }
      
    } catch (error) {
      console.error(`Error processing ${table}:`, error);
    }
  }
}

// Test endpoint
app.get('/test-email', async (req, res) => {
  try {
    const testData = {
      full_name: 'Test User',
      email: 'test@example.com',
      institution: 'Test University',
      research_area: 'AI Testing',
      message: 'This is a test email from the AERI notification system.'
    };
    
    const success = await sendNotificationEmail('researchers', testData);
    
    if (success) {
      res.json({ message: 'Test email sent successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to send test email' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'AERI Email Service',
    timestamp: new Date().toISOString()
  });
});

// Start the service
app.listen(PORT, () => {
  console.log(`🚀 AERI Email Service running on port ${PORT}`);
  console.log(`📧 Notification emails will be sent to: ${process.env.NOTIFICATION_EMAIL}`);
  console.log(`🔄 Polling for new submissions every 30 seconds...`);
  
  // Start polling immediately, then every 30 seconds
  pollForNewSubmissions();
  setInterval(pollForNewSubmissions, 30000);
});