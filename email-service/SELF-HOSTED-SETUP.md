# Self-Hosted Supabase Email Setup

## 🎯 Two Easy Options for Self-Hosted Supabase

### **Option 1: Direct Database Connection (Recommended)**

This is the simplest approach - connect directly to your PostgreSQL database.

#### Step 1: Get Your Database Connection Info
From your **docker-compose.yml** or Supabase config, find:
```yaml
POSTGRES_HOST=localhost (or your server IP)
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres  
POSTGRES_PASSWORD=your-password
```

#### Step 2: Configure Email Service
```bash
cp config.env .env
```

Edit `.env` with your database info:
```env
# Direct Database Connection
DB_HOST=localhost  # or your server IP
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-actual-password
DB_SSL=false

# Gmail settings
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NOTIFICATION_EMAIL=natalie@aeri-research.org
```

#### Step 3: Run the Service
```bash
node server-direct-db.js
```

---

### **Option 2: Generate Service Key with JWT Secret**

If you want to use the Supabase API instead of direct database connection.

#### Step 1: Find Your JWT Secret
In your **docker-compose.yml**, look for:
```yaml
JWT_SECRET=your-super-secret-jwt-token-with-at-least-32-characters-long
```

#### Step 2: Generate Service Key
```bash
# Add your JWT secret to .env first
echo "SUPABASE_JWT_SECRET=your-jwt-secret-here" >> .env

# Generate the service key
node generate-service-key.js
```

#### Step 3: Use the Generated Key
Copy the generated service key to your `.env`:
```env
SUPABASE_URL=https://supabase.aeri-research.org
SUPABASE_SERVICE_KEY=the-generated-key-from-step-2
```

#### Step 4: Run the Service
```bash
node server.js
```

---

## 🧪 Testing

1. **Test database connection:**
   ```
   curl http://localhost:3001/test-db
   ```

2. **Test email sending:**
   ```
   curl http://localhost:3001/test-email
   ```

3. **Submit a real form** on your website and wait 30 seconds

## 🚀 Production Deployment

### On the same server as your Supabase:
```bash
# Clone your repo with the email service
git clone your-repo
cd email-service

# Install dependencies
npm install

# Configure
cp config.env .env
# Edit .env with your settings

# Run with PM2 for auto-restart
npm install -g pm2
pm2 start server-direct-db.js --name "aeri-email"
pm2 startup
pm2 save
```

## 🔍 Finding Your Database Info

### If using Docker Compose:
```bash
# Check your docker-compose.yml
cat docker-compose.yml | grep -A 10 postgres

# Or check running containers
docker ps
docker inspect container-name
```

### If using direct installation:
- **Host**: Usually `localhost` or your server IP
- **Port**: Usually `5432`
- **Database**: Usually `postgres`
- **User**: Usually `postgres`
- **Password**: What you set during installation

## 🚨 Troubleshooting

**Database Connection Failed:**
- Check host/port are correct
- Verify password is correct
- Make sure PostgreSQL is running
- Check firewall allows connections

**Gmail Authentication Error:**
- Enable 2FA on Gmail
- Use App Password (not regular password)
- Check "Less secure apps" setting if needed

**No emails received:**
- Check spam folder
- Verify email address in NOTIFICATION_EMAIL
- Check logs for error messages