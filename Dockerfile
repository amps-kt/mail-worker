# Builder: 
FROM --platform=$BUILDPLATFORM node:22-alpine AS builder
WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN corepack enable pnpm
RUN pnpm i --frozen-lockfile

COPY eslint.config.mjs .
COPY next.config.js .
COPY postcss.config.cjs .
COPY tsconfig.json .

COPY src src

RUN pnpm run build

#  Runner:
FROM node:22-alpine AS runner
WORKDIR /app

RUN corepack enable pnpm
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 mailworker

COPY --from=builder /app/node_modules/ ./node_modules
COPY --from=builder /app/build .
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml  .

USER mailworker
CMD ["pnpm", "run", "start"]