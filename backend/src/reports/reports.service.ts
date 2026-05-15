import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportsRepo } from './reports.repo';

export interface ReportEntry {
  rank: number;
  playerId: number;
  username: string;
  score: string;
}

@Injectable()
export class ReportsService {
  constructor(private readonly repo: ReportsRepo) {}

  async getTopByDateRange(
    start: string,
    end: string,
    top: number,
  ): Promise<ReportEntry[]> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate > endDate) {
      throw new BadRequestException('start must not be later than end');
    }

    const rows = await this.repo.findTopByDateRange(startDate, endDate, top);
    return rows.map((row, i) => ({ rank: i + 1, ...row }));
  }
}
