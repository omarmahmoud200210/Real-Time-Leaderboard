import { apiClient } from './client'
import type { LeaderboardEntry, MyRank } from '@/types'

export async function getGlobal(): Promise<LeaderboardEntry[]> {
  const { data } = await apiClient.get<LeaderboardEntry[]>('/leaderboard/global')
  return data
}

export async function getMyRank(): Promise<MyRank> {
  const { data } = await apiClient.get<MyRank>('/leaderboard/global/me')
  return data
}
