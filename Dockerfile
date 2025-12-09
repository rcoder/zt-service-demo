FROM node:lts-alpine AS builder

COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

FROM node:lts-alpine AS service

RUN ["mkdir", "/app"]

COPY --from=builder /app/dist/server.js /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/src/public /app/public

EXPOSE 8000 3000

WORKDIR /app
CMD ["node", "server.js"]
