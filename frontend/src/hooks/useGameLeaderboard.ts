import { useEffect, useState } from 'react'
import { useSocket } from '@/contexts/SocketContext'
import type { LeaderboardEntry, LeaderboardUpdatePayload } from '@/types'

export function useGameLeaderboard(gameId: number) {
  const [rankings, setRankings] = useState<LeaderboardEntry[]>([])
  const socket = useSocket()

  useEffect(() => {
    if (!socket) return
    socket.emit('join_game', { gameId })

    const handler = (payload: LeaderboardUpdatePayload) => {
      if (payload.gameId === gameId) {
        setRankings(payload.rankings)
      }
    }

    socket.on('leaderboard_update', handler)

    return () => {
      socket.emit('leave_game', { gameId })
      socket.off('leaderboard_update', handler)
    }
  }, [socket, gameId])

  return { rankings }
}
