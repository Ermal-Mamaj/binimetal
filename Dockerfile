# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1

# Create placeholder images if needed
RUN npm run create-placeholders

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user to run the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from the builder stage
# First, copy the standalone output
COPY --from=builder /app/.next/standalone ./

# Then, copy the public folder to the correct location
COPY --from=builder /app/public ./public

# Copy the static files to the correct location
COPY --from=builder /app/.next/static ./.next/static

# Set the correct permissions
RUN chown -R nextjs:nodejs /app

# Set the user to run the application
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Set environment variables for the app
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Command to run the application
CMD ["node", "server.js"]
