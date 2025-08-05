# AERI Email Service Setup Guide

## 📧 Quick Gmail Setup

### Step 1: Get Your Supabase Service Key
1. Go to your Supabase dashboard: https://supabase.aeri-research.org
2. Go to Settings → API
3. Copy the **service_role** key (not the anon key!)

### Step 2: Configure Gmail
1. **Enable 2FA**: Go to https://myaccount.google.com/security
2. **Create App Password**:
   - Security → App passwords
   - Select "Mail" and "Other"
   - Name it "AERI Website"
   - Copy the 16-character password

### Step 3: Configure Environment
1. **Copy config file**: `cp config.env .env`
2. **Edit .env file** with your actual values:
   ```
   SUPABASE_URL=https://supabase.aeri-research.org
   SUPABASE_SERVICE_KEY=your_actual_service_key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your_16_character_app_password
   NOTIFICATION_EMAIL=natalie@aeri-research.org
   ```

### Step 4: Test the Service
1. **Start service**: `npm start`
2. **Test email**: Open http://localhost:3001/test-email
3. **Check health**: Open http://localhost:3001/health

### Step 5: Deploy to Production
You can run this service:
- **On your server** alongside your website
- **On a separate server** (VPS, DigitalOcean, etc.)
- **As a PM2 process** for auto-restart

## 🔧 Production Deployment

### Option 1: Same Server as Website
```bash
# On your production server
git clone your-repo
cd email-service
npm install
cp config.env .env
# Edit .env with your values
npm start
```

### Option 2: PM2 Process Manager
```bash
npm install -g pm2
pm2 start server.js --name "aeri-email"
pm2 startup
pm2 save
```

## 📩 What Happens Next

- Service polls database every 30 seconds
- When new form submission detected → sends formatted email
- Email includes all form details + admin dashboard link
- Natalie gets notified immediately!

## 🧪 Testing

1. **Submit a test form** on your website
2. **Within 30 seconds** you should receive an email
3. **Check logs** in terminal for confirmation

## 🚨 Troubleshooting

**Gmail Authentication Error**:
- Make sure 2FA is enabled
- Use App Password, not regular password
- Check Gmail allows "less secure apps" (if needed)

**Supabase Connection Error**:
- Use service_role key, not anon key
- Check Supabase URL is correct
- Verify database tables exist
