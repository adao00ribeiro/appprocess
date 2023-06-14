FROM node:alpine
WORKDIR /usr/app
COPY package*.json yarn.lock ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN yarn install
RUN npx prisma generate
EXPOSE 3333
CMD ["yarn", "start"]





