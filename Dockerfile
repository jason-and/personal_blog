# First stage: Build the site
FROM node:18-alpine AS builder

# Install necessary build tools and dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Set working directory
WORKDIR /app

# Show the environment for debugging
RUN node --version
RUN npm --version

# Copy package files first
COPY package*.json ./

# Install with additional verbosity
RUN npm install --verbose

# Copy the rest of your source code
COPY . .

# Build the site
RUN npm run build

# Second stage: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/_site /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
