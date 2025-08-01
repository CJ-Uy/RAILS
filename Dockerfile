# Stage 1: Build the Nuxt.js application using Debian Bookworm
FROM node:20-bookworm AS builder

# --- INSTALL BUILD DEPENDENCIES USING APT-GET ---
RUN apt-get update && apt-get install -y --no-install-recommends openssl

WORKDIR /app

# 1. Copy only package files first
COPY package.json package-lock.json ./

# 2. Install ALL dependencies for building
RUN npm install

# 3. Copy Prisma schema
COPY prisma ./prisma

# 4. Generate Prisma Client. This now generates the Debian engine by default.
RUN npx prisma generate
RUN npx prisma db push

# 5. Copy the rest of your application code
COPY . .

# 6. Build the application
RUN npm run build


# Stage 2: Create the production image, also using Debian Bookworm
FROM node:20-bookworm AS runner

# Install official dependencies for the browser Puppeteer will download.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils \
    # Also include OpenSSL for Prisma
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./

# Set up a cache directory for Puppeteer's browser download.
ENV PUPPETEER_CACHE_DIR=/app/puppeteer_cache

RUN npm install 

# Copy the built application output from the builder stage
COPY --from=builder /app/.output ./.output

# Copy the prisma schema
COPY --from=builder /app/prisma ./prisma

EXPOSE $PORT

CMD [ "node", ".output/server/index.mjs" ]