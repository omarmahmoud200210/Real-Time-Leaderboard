# Real-time Leaderboard System

## Project overview
A backend system for a real-time leaderboard service. Users compete in games,
submit scores, and see live rankings updated via WebSocket.

## Tech stack
- Runtime: Node.js
- Framework: NestJS
- Primary DB: PostgreSQL
- Cache / leaderboard store: Redis (sorted sets)
- Real-time: WebSocket (ws library)
- Auth: JWT (jsonwebtoken)
- ORM/query builder: Prisma
- Frontend: React, websocket client

## Module responsibilities
- players: user auth only (register, login, JWT generation)
- scores: accepts score from client, writes to PostgreSQL, updates Redis sorted set, triggers broadcast
- leaderboard: reads from Redis, returns top N and user rank, no direct DB calls
- reports: queries PostgreSQL scores table filtered by date range
- websocket: owns the WS server and all connected clients, exposes broadcast()

## Key conventions
- All routes are prefixed with /api/v1
- Auth middleware validates JWT on all routes except /players/register and /players/login
- Redis key pattern: leaderboard:global and leaderboard:game:<gameId>
- Score strategy: keep highest score per user per game (not cumulative)
- Broadcast happens inside scores.service.js after Redis is updated
- Reports always query PostgreSQL, never Redis

## Database
- PostgreSQL for users, scores history
- Redis sorted sets for live rankings (not persistent source of truth)

## Environment variables
DATABASE_URL=
REDI