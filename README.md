# Boardly

A simple event-driven Jira clone built with Next.js and NestJS.

## Features
- Create projects and tasks
- Drag & drop task boards
- Real-time updates via WebSockets
- Event-driven backend with Redis

## Tech Stack
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: NestJS + TypeScript
- Database: PostgreSQL (Prisma ORM)
- Event Queue: Redis
- Real-time: WebSockets (Socket.io)

## Setup
```
cd infrastructure
docker compose build
docker compose up
```