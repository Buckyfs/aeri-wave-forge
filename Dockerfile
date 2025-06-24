# ---------- Stage 1: Build the app ----------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build


# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine AS production

# Copy custom Nginx config if available (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Create health check endpoint
RUN echo "healthy" > /usr/share/nginx/html/health

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
