import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { LeaderboardEntry } from '@/types'

interface Props {
  entries: LeaderboardEntry[]
  highlightPlayerId?: number
}

export function LeaderboardTable({ entries, highlightPlayerId }: Props) {
  if (entries.length === 0) {
    return <p className="text-muted-foreground">No entries yet.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => {
          const isHighlighted = entry.playerId === highlightPlayerId
          return (
            <TableRow key={entry.playerId} className={isHighlighted ? 'bg-muted/50' : ''}>
              <TableCell>
                {isHighlighted ? (
                  <Badge variant="default">{entry.rank}</Badge>
                ) : (
                  entry.rank
                )}
              </TableCell>
              <TableCell className={isHighlighted ? 'font-bold' : ''}>
                {entry.username}
              </TableCell>
              <TableCell className="text-right">{parseFloat(entry.score).toLocaleString()}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
