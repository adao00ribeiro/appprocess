FROM node:alpine
WORKDIR /usr/web
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]
