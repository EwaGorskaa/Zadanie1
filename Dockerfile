FROM node:18-slim AS stage1

LABEL org.opencontainers.image.authors="Ewa Górska s99544@pollub.edu.pl"

WORKDIR /app

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

COPY ./frontend /app/

RUN npm run build

FROM node:18-slim AS stage2

COPY --from=stage1 /app /app

WORKDIR /app

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

COPY ./backend /app/


EXPOSE 3000

CMD ["npm", "start"]
