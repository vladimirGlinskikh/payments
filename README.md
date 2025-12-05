<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">Payments Backend</h1>

<p align="center">
  Современный платежный бэкенд на <strong>NestJS 11</strong> • <strong>Prisma 7</strong> • <strong>PostgreSQL</strong> • <strong>Docker</strong>
</p>

<p align="center">
  <a href="https://github.com/vladimirGlinskikh/payments/actions"><img src="https://img.shields.io/github/actions/workflow/status/vladimirGlinskikh/payments/ci.yml?branch=main&label=CI" alt="CI"></a>
  <a href="https://nestjs.com"><img src="https://img.shields.io/badge/NestJS-11.0+-E0234E?logo=nestjs" alt="NestJS"></a>
  <a href="https://prisma.io"><img src="https://img.shields.io/badge/Prisma-7.0+-2D3748?logo=prisma" alt="Prisma"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-22+-339933?logo=node.js" alt="Node.js"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?logo=typescript" alt="TypeScript"></a>
</p>

## Особенности

- NestJS 11 + TypeScript
- Prisma ORM 7 (с `@prisma/adapter-pg`)
- PostgreSQL в Docker (`postgres:16-alpine`)
- Глобальный `ConfigModule` + `.env`
- Готовый Auth модуль (регистрация, логин, JWT + refresh)
- ValidationPipe + DTO валидация
- Глобальный Exception Filter

## Быстрый старт

```bash
# 1. Клонируем
git clone https://github.com/vladimirGlinskikh/payments.git
cd payments

# 2. Запускаем базу
docker compose up -d postgres

# 3. Устанавливаем и запускаем бэкенд
cd backend
npm install

# 4. Создаём .env (если ещё нет)
echo 'DATABASE_URL="postgresql://postgres:123456@localhost:5433/payment"' > .env

# 5. Применяем схему Prisma
npx prisma db push

# 6. Запускаем сервер
npm run start:dev
Сервер будет доступен по адресу: http://localhost:4000
Переменные окружения (backend/.env)
env# Обязательно
DATABASE_URL="postgresql://postgres:123456@localhost:5433/payment"

# Для JWT (обязательно!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=15m
REFRESH_SECRET=your-super-secret-refresh-key
REFRESH_EXPIRES_IN=7d

# Опционально (для CORS и порта)
HTTP_HOST=0.0.0.0
HTTP_PORT=4000
HTTP_CORS=http://localhost:3000
Полезные команды
Bash# Dev-режим с hot-reload
npm run start:dev

# Применить схему без миграций
npx prisma db push

# Создать миграцию
npx prisma migrate dev --name init

# Prisma Studio (GUI для базы)
npx prisma studio

# Генерация клиента Prisma
npx prisma generate

# Структура проекта
payments/               # основной NestJS проект
│   ├── src/
│   │   ├── api/           # контроллеры и DTO
│   │   └── infra/         # Prisma, Config и т.д.
│   └── prisma/            # схема и миграции
├── docker-compose.yml
└── README.md

# Деплой
Готов к деплою на Render, Railway, Fly.io, AWS, VPS и т.д.
Просто задай переменные окружения в хостинге.
