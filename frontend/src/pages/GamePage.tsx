import { useParams } from 'react-router-dom'
import { LeaderboardTable } from '@/components/LeaderboardTable'
import { ScoreSubmitForm } from '@/components/ScoreSubmitForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useGameLeaderboard } from '@/hooks/useGameLeaderboard'

export function GamePage() {
  const { id } = useParams<{ id: string }>()
  const gameId = parseInt(id ?? '0', 10)
  const { rankings } = useGameLeaderboard(gameId)
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Game #{gameId}</h1>

      {user && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Submit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreSubmitForm gameId={gameId} onSuccess={() => {}} />
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-lg font-medium mb-3">Leaderboard</h2>
        <LeaderboardTable entries={rankings} highlightPlayerId={user?.sub} />
      </div>
    </div>
  )
}
