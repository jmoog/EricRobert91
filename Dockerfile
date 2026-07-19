# syntax=docker/dockerfile:1.7
# ────────────────────────────────────────────────────────────────────────
# Astro 5 + adaptateur Node (standalone) — Dockerfile multi-stage
# Déployé via Coolify (derrière Cloudflare)
# ────────────────────────────────────────────────────────────────────────

# ── Stage 1 : build ─────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
# Variable de BUILD : clé publique Turnstile, gravée dans le HTML statique.
# Coolify la passe en --build-arg quand elle est cochée « Build Variable ».
ARG PUBLIC_TURNSTILE_SITE_KEY=""
ENV PUBLIC_TURNSTILE_SITE_KEY=$PUBLIC_TURNSTILE_SITE_KEY
RUN npm run build

# ── Stage 2 : runtime ───────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/dist ./dist
RUN addgroup -S astro && adduser -S astro -G astro && chown -R astro:astro /app
USER astro
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
