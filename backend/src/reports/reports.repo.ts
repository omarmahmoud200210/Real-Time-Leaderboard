import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface RawReportRow {
  playerId: number;
  score: string;
  username: string;
}

@Injectable()
export class ReportsRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findTopByDateRange(
    start: Date,
    end: Date,
    top: number,
  ): Promise<RawReportRow[]> {
    const groups = await this.prisma.score.groupBy({
      by: ['playerId'],
      _max: { score: true },
      where: { submittedAt: { gte: start, lte: end } },
      orderBy: { _max: { score: 'desc' } },
      take: top,
    });

    if (groups.length === 0) return [];

    const playerIds = groups.map((g) => g.playerId);
    const players = await this.prisma.player.findMany({
      where: { id: { in: playerIds } },
      select: { id: true, username: true },
    });
    const usernameMap = new Map(players.map((p) => [p.id, p.username]));

    return groups.map((g) => ({
      playerId: g.playerId,
      score: (g._max.score ?? 0).toString(),
      username: usernameMap.get(g.playerId) ?? 'Unknown',
    }));
  }
}
