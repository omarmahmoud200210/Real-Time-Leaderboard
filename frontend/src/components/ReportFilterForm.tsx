import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  onSubmit: (start: string, end: string, top: number) => void
}

export function ReportFilterForm({ onSubmit }: Props) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [top, setTop] = useState('10')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (new Date(start) > new Date(end)) {
      setError('Start date must not be after end date.')
      return
    }

    onSubmit(new Date(start).toISOString(), new Date(end).toISOString(), parseInt(top, 10))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label htmlFor="start">Start date</Label>
          <Input
            id="start"
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="end">End date</Label>
          <Input
            id="end"
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="top">Top N</Label>
          <Input
            id="top"
            type="number"
            min="1"
            max="100"
            value={top}
            onChange={(e) => setTop(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit">Get report</Button>
    </form>
  )
}
