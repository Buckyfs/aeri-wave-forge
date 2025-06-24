# Multi-stage build for production
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create health check endpoint
RUN echo "healthy" > /usr/share/nginx/html/health

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


# Use Node.js base image instead of nginx
FROM node:20-alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Build the project
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev", "--", "--port", "3000"]
