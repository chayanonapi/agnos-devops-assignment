# ---------- BUILD STAGE ----------
FROM node:20 AS build

WORKDIR /app

# Build-time variable
ARG APP_ENV=production

COPY package*.json ./
RUN npm install

COPY . .

# ---------- RUNTIME STAGE ----------
FROM node:20-alpine

WORKDIR /app

# Runtime environment variables (defaults)
ENV APP_ENV=${APP_ENV}

COPY --from=build /app .

EXPOSE 8080

CMD ["npm", "start"]

