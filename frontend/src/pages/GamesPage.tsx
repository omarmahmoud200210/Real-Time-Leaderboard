import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { listGames } from '@/api/scores'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function GamesPage() {
  const { data: games, isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: listGames,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (!games || games.length === 0) {
    return <p className="text-muted-foreground">No games available.</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map((game) => (
          <Link key={game.id} to={`/games/${game.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{game.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View leaderboard &amp; submit score →</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
