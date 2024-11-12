FROM node:alpine AS base

FROM base as builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune backend --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install


COPY --from=builder /app/out/full/ .
# COPY turbo.json turbo.json
# RUN npx turbo build --filter=backend...

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .


RUN addgroup --system --gid 1001 begroup
RUN adduser --system --uid 1001 beuser

RUN chown -R beuser:begroup /app
USER beuser
EXPOSE 6001

WORKDIR /app/apps/backend
CMD npx prisma db push && npm run start
