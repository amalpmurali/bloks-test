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

# Expose the port your Bun app uses
EXPOSE 3000

# Start the Bun app (adjust entry point if needed)
CMD ["bun", "run", "index.js"]
