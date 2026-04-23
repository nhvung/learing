# Stage 1: Install dependencies
# Use the full image to run npm ci reliably
FROM node:20-alpine AS deps
WORKDIR /app
COPY src/package*.json ./
RUN npm ci --only=production

# Stage 2: Runtime
# Reuse the same small image — only copy what we need
FROM node:20-alpine
WORKDIR /app

# Copy installed modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy application source
COPY src/ .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Use node directly (not npm start) — avoids extra npm process
CMD ["node", "index.js"]
