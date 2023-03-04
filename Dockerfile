FROM node:18-alpine AS node

# Копируем файлы, устанавливаем зависимости и запускаем приложение
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./ 
COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn build

# Устанавливаем очистку кэша и автоперезапуск приложения
FROM node AS final

RUN apk --no-cache -U upgrade
RUN apk add --no-cache bash jq

RUN yarn global add pm2