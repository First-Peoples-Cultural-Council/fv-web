FROM node:22-alpine AS builder
RUN apk update && apk upgrade --no-cache
RUN mkdir /src
WORKDIR /src
COPY . .
RUN npm ci
RUN npm run build:production

FROM caddy:2-alpine
RUN apk update && apk upgrade --no-cache
EXPOSE 8080
COPY --from=builder /src/Caddyfile /etc/caddy
COPY --from=builder /src/dist/ /srv/
