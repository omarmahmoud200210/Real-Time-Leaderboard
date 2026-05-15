export interface LeaderboardEntry {
  rank: number
  playerId: number
  username: string
  score: string
}

export interface ReportEntry {
  rank: number
  playerId: number
  username: string
  score: string
}

export interface LeaderboardUpdatePayload {
  gameId: number
  rankings: LeaderboardEntry[]
}

export interface ScoreSubmissionResult {
  id: number
  playerId: number
  gameId: number
  score: string
  submittedAt: string
  isNewPersonalBest: boolean
}

export interface Game {
  id: number
  name: string
}

export interface MyRank {
  rank: number | null
  score: string | null
}

export interface AuthUser {
  sub: number
  username: string
}
