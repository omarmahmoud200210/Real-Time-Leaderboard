import { useEffect, useState } from 'react'
import { getGlobal } from '@/api/leaderboard'
import { useSocket } from '@/contexts/SocketContext'
import type { LeaderboardEntry } from '@/types'

export function useGlobalLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const socket = useSocket()

  useEffect(() => {
    getGlobal()
      .then(setEntries)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('leaderboard:init', setEntries)
    socket.on('leaderboard:update', setEntries)
    return () => {
      socket.off('leaderboard:init', setEntries)
      socket.off('leaderboard:update', setEntries)
    }
  }, [socket])

  return { entries, loading }
}
