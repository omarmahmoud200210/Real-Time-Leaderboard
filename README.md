# Real-time Leaderboard

A backend system for a real-time leaderboard service. Users compete in games, submit scores, and see live rankings updated via WebSocket.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** NestJS
- **Database:** PostgreSQL (via Prisma)
- **Cache / Rankings:** Redis (sorted sets)
- **Real-time:** WebSocket
- **Auth:** JWT
- **Frontend:** React

## Features

- User registration and login with JWT authentication
- Score submission with per-user, per-game highest-score tracking
- Live global and per-game leaderboards backed by Redis sorted sets
- Real-time rank updates broadcast to connected clients via WebSocket
- Historical score reports filtered by date range

## Modules

| Module | Responsibility |
|--------|----------------|
| `players` | Registration, login, JWT generation |
| `scores` | Persist scores to PostgreSQL and update Redis |
| `leaderboard` | Read top N and user rank from Redis |
| `reports` | Query historical scores from PostgreSQL |
| `websocket` | Manage WS server and broadcast updates |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables (see .env.example)
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start the server
npm run start:dev
```

## Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/leaderboard
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-here
```

## API

All routes are prefixed with `/api/v1`. Auth is required on all routes except `/players/register` and `/players/login`.
