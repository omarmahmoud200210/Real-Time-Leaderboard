import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { AuthService } from '../auth/auth.service';
import { REDIS_CLIENT } from '../redis/redis.provider';

export interface LeaderboardEntry {
  rank: number;
  playerId: number;
  username: string;
  score: string;
}

export interface LeaderboardUpdatePayload {
  gameId: number;
  rankings: LeaderboardEntry[];
}

@Injectable()
export class LeaderboardService {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly authService: AuthService,
  ) {}

  async getGlobal(top: number): Promise<LeaderboardEntry[]> {
    const raw = (await this.redis.call(
      'ZREVRANGE',
      'leaderboard:global',
      '0',
      String(top - 1),
      'WITHSCORES',
    )) as string[];

    return this.hydrateEntries(raw);
  }

  async getMyRank(
    playerId: number,
  ): Promise<{ rank: number | null; score: string | null }> {
    const [rank, score] = (await Promise.all([
      this.redis.call('ZREVRANK', 'leaderboard:global', String(playerId)),
      this.redis.call('ZSCORE', 'leaderboard:global', String(playerId)),
    ])) as [number | null, string | null];

    if (rank === null) return { rank: null, score: null };
    return { rank: rank + 1, score };
  }

  async getGameRankings(gameId: number): Promise<LeaderboardUpdatePayload> {
    const raw = (await this.redis.call(
      'ZREVRANGE',
      `leaderboard:game:${gameId}`,
      '0',
      '-1',
      'WITHSCORES',
    )) as string[];

    const rankings = await this.hydrateEntries(raw);
    return { gameId, rankings };
  }

  private async hydrateEntries(raw: string[]): Promise<LeaderboardEntry[]> {
    if (raw.length === 0) return [];

    const playerIds = raw
      .filter((_, i) => i % 2 === 0)
      .map((id) => parseInt(id, 10));

    const players = await this.authService.getPlayers(playerIds);
    const usernameMap = new Map(players.map((p) => [p.id, p.username]));

    const entries: LeaderboardEntry[] = [];
    for (let i = 0; i < raw.length; i += 2) {
      const pid = parseInt(raw[i], 10);
      entries.push({
        rank: i / 2 + 1,
        playerId: pid,
        username: usernameMap.get(pid) ?? 'Unknown',
        score: raw[i + 1],
      });
    }

    return entries;
  }
}