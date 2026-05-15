import { apiClient } from './client'
import type { Game, ScoreSubmissionResult } from '@/types'

export async function listGames(): Promise<Game[]> {
  const { data } = await apiClient.get<Game[]>('/games')
  return data
}

export async function submitScore(gameId: number, score: number): Promise<ScoreSubmissionResult> {
  const { data } = await apiClient.post<ScoreSubmissionResult>('/scores', { gameId, score })
  return data
}
