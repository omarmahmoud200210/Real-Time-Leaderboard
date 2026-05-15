import { apiClient } from './client'
import type { ReportEntry } from '@/types'

export async function getTopByDateRange(
  start: string,
  end: string,
  top?: number,
): Promise<ReportEntry[]> {
  const params: Record<string, string | number> = { start, end }
  if (top !== undefined) params.top = top
  const { data } = await apiClient.get<ReportEntry[]>('/reports/top', { params })
  return data
}
