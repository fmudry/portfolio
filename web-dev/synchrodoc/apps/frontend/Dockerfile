
FROM node:alpine AS base

FROM base as builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune frontend --docker

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
# RUN npx turbo build --filter=frontend...

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .


RUN addgroup --system --gid 1001 fegroup
RUN adduser --system --uid 1001 feuser

RUN chown -R feuser:fegroup /app
USER feuser
EXPOSE 5173

WORKDIR /app/apps/frontend
# CMD npm run dev
CMD npx vite --host
