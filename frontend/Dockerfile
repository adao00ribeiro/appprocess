FROM node:alpine
WORKDIR /usr/web
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]
