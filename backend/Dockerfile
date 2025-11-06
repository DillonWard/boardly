FROM node:20-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

FROM base AS dev-deps
RUN npm ci && npm cache clean --force

FROM base AS production
RUN npm ci --only=production && npm cache clean --force

FROM base AS development
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

COPY --from=development --chown=nestjs:nodejs /usr/src/app/dist ./dist
COPY --from=development --chown=nestjs:nodejs /usr/src/app/node_modules ./node_modules

USER nestjs
EXPOSE 3000
CMD ["node", "dist/main"]