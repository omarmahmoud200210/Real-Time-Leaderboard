import { LeaderboardTable } from '@/components/LeaderboardTable'
import { MyRankCard } from '@/components/MyRankCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/AuthContext'
import { useGlobalLeaderboard } from '@/hooks/useGlobalLeaderboard'

export function LeaderboardPage() {
  const { entries, loading } = useGlobalLeaderboard()
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Global Leaderboard</h1>
      {user && <MyRankCard />}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : (
        <LeaderboardTable entries={entries} highlightPlayerId={user?.sub} />
      )}
    </div>
  )
}
