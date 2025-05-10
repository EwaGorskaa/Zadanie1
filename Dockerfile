# syntax=docker/dockerfile:1.2

FROM node:18-alpine AS base

# stage1 - klonowanie repo
FROM base AS stage1

# dodanie metadanych o autorze zgodnie z OCI
LABEL org.opencontainers.image.authors="Ewa Górska s99544@pollub.edu.pl"

# ustawienie katalogu roboczego
WORKDIR /app

# instalowanie narzędzi do SSH, GIT oraz tworzenie katalogu .ssh i dodanie klucza SSH
RUN apk add --no-cache git openssh-client && \
mkdir -p ~/.ssh && chmod 700 ~/.ssh && \
ssh-keyscan github.com >> ~/.ssh/known_hosts

# klonowanie repozytorium z GitHub za pomocą SSH
RUN --mount=type=ssh git clone git@github.com:EwaGorskaa/Zadanie1.git ./ && \ 
rm -rf ./.git


# stage2 - budowa frontendu
# syntax=docker/dockerfile:1.2
FROM base AS stage2

# ustawienie katalogu roboczego
WORKDIR /app/frontend

# skopiowanie plików konfiguracyjnych z repo
COPY --from=stage1 /app/frontend/package.json /app/frontend/package-lock.json ./

# instalowanie zależności frontendu
RUN npm install

# skopiowanie kodów źródłowych frontendu
COPY --from=stage1 /app/frontend ./

# budowa frontendu
RUN npm run build


# stage3 - budowa backendu
# syntax=docker/dockerfile:1.2
FROM base AS stage3

# ustawienie katalogu roboczego
WORKDIR /app/backend  

# skopiowanie plików konfiguracyjnych z repo
COPY --from=stage1 /app/backend/package.json /app/backend/package-lock.json ./

# instalowanie zależności backendu
RUN npm install

# skopiowanie kodów źródłowych backendu
COPY --from=stage1 /app/backend ./

# skopiowanie zbudowanego frontendu do katalogu backendu
COPY --from=stage2 /app/frontend/build /app/backend/public

# zainstalowanie curla do healthchecka
RUN apk add --no-cache curl

# wystawienie portu 
EXPOSE 3001

# healthcheck
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3001/ || exit 1

# uruchomienie serwera
CMD ["node", "server.js"]
