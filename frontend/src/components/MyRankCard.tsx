import { useQuery } from '@tanstack/react-query'
import { getMyRank } from '@/api/leaderboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MyRankCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['myRank'],
    queryFn: getMyRank,
    retry: false,
  })

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Your Standing</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : data?.rank === null || data?.rank === undefined ? (
          <p className="text-sm text-muted-foreground">You have not scored yet.</p>
        ) : (
          <p className="text-sm">
            Your rank: <strong>#{data.rank}</strong> · Score:{' '}
            <strong>{parseFloat(data.score!).toLocaleString()}</strong>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
