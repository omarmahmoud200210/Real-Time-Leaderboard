import { useState } from 'react'
import { getTopByDateRange } from '@/api/reports'
import { LeaderboardTable } from '@/components/LeaderboardTable'
import { ReportFilterForm } from '@/components/ReportFilterForm'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import type { ReportEntry } from '@/types'

export function ReportsPage() {
  const [entries, setEntries] = useState<ReportEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSubmit(start: string, end: string, top: number) {
    setError(null)
    setLoading(true)
    setSearched(true)
    try {
      const data = await getTopByDateRange(start, end, top)
      setEntries(data)
    } catch {
      setError('Failed to load report. Please try again.')
      setEntries([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Historical Reports</h1>
      <ReportFilterForm onSubmit={handleSubmit} />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : searched ? (
        entries.length === 0 ? (
          <p className="text-muted-foreground">No results found for the selected date range.</p>
        ) : (
          <LeaderboardTable entries={entries} />
        )
      ) : null}
    </div>
  )
}
