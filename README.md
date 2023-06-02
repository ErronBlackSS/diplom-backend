
## Описание

Back-end приложения дипломной работы. Товт М.С

## Установка и запуск

1. Клонируем репозиторий
```bash
$ git clone https://github.com/ErronBlackSS/diplom-backend.git
```
2.  Устанавливаем NPM пакеты
```bash
$ yarn install
```
3. Поднимаем базу данных в docker (Надо чтобы был установлен и запущен Docker Desktop)
```bash
$ docker-compose up -d
```
4.  Загружаем в базу данных миграции
```bash
$ yarn prisma generate
$ yarn run prisma:migrate:dev
$ yarn run prisma:dev:deploy
```
5.  Запустить сервер в режиме разработки
```bash
$ yarn start:dev
```

## Тестирование

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e
```
