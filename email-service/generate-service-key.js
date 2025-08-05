const jwt = require('jsonwebtoken');

// Your Supabase JWT Secret (from your .env or docker-compose.yml)
const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || 'your-jwt-secret-here';

// Generate a service role token
const payload = {
  role: 'service_role',
  iss: 'supabase',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year expiry
};

const serviceKey = jwt.sign(payload, JWT_SECRET);

console.log('🔑 Your Supabase Service Key:');
console.log(serviceKey);
console.log('\n📋 Add this to your .env file:');
console.log(`SUPABASE_SERVICE_KEY=${serviceKey}`);

// Also generate an anon key for reference
const anonPayload = {
  role: 'anon',
  iss: 'supabase',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
};

const anonKey = jwt.sign(anonPayload, JWT_SECRET);
console.log(`SUPABASE_ANON_KEY=${anonKey}`);
