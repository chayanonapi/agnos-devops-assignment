FROM node:20-alpine

ARG APP_ENV

ENV APP_ENV=${APP_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
