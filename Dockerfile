# Use official Bun image
FROM oven/bun:latest

# Set working directory inside the container
WORKDIR /app

# Copy package files and lockfile first for better caching
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy all remaining files, including code, static assets, etc.
COPY . .

# Build the Next.js app for production
RUN bun run build

# Expose the port your Next.js app will use
EXPOSE 3000

# Start the Next.js production server
CMD ["bun", "run", "start"]
