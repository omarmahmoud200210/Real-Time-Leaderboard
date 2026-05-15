import { useState } from 'react'
import { submitScore } from '@/api/scores'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ScoreSubmissionResult } from '@/types'

interface Props {
  gameId: number
  onSuccess: (result: ScoreSubmissionResult) => void
}

export function ScoreSubmitForm({ gameId, onSuccess }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [newPB, setNewPB] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setNewPB(false)
    setSubmitting(true)
    try {
      const result = await submitScore(gameId, parseFloat(value))
      if (result.isNewPersonalBest) setNewPB(true)
      setValue('')
      onSuccess(result)
    } catch {
      setError('Failed to submit score. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {newPB && (
        <div>
          <Badge variant="default">New personal best!</Badge>
        </div>
      )}
      <div className="flex gap-2 items-end">
        <div className="space-y-1 flex-1">
          <Label htmlFor="score">Your score</Label>
          <Input
            id="score"
            type="number"
            step="0.01"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}
