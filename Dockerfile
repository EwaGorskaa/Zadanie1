# syntax=docker/dockerfile:1.2

FROM node:18-alpine AS base

FROM base AS stage1

LABEL org.opencontainers.image.authors="Ewa Górska s99544@pollub.edu.pl"

WORKDIR /app/frontend

RUN apk add --no-cache git openssh-client && \
mkdir -p ~/.ssh && chmod 700 ~/.ssh && \
ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN --mount=type=ssh git clone git@github.com:EwaGorskaa/Zadanie1.git ./

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

COPY ./frontend ./

RUN npm run build

# syntax=docker/dockerfile:1.2
FROM base AS stage2

WORKDIR /app/backend  

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

COPY ./backend ./

COPY --from=stage1 /app/frontend/build /app/frontend/build

RUN apk add --no-cache curl

EXPOSE 3001

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3001/ || exit 1


CMD ["node", "server.js"]
