# To use this Dockerfile, you have to set `output: 'standalone'` in your next.config.mjs file.
# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# ---- Base Node ----
FROM node:24.4.0-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ---- Dependencies ----
FROM base AS deps
# Copy package.json and lock files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# ---- Builder ----
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the app
COPY . .

# Build the app
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm run build

# ---- Production ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user to run the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/next.config.mjs ./next.config.mjs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN apk add --no-cache netcat-openbsd && \
    pnpm install --prod --frozen-lockfile

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
