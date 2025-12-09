FROM node:20-alpine AS base

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ git bash

COPY package*.json ./

FROM base AS dev-deps
RUN npm ci

FROM base AS production
RUN npm ci --only=production

FROM base AS development
COPY --from=dev-deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

COPY --from=development --chown=nestjs:nodejs /usr/src/app/dist ./dist
COPY --from=development --chown=nestjs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/package*.json ./

USER nestjs

EXPOSE 3000
CMD ["node", "dist/main"]
