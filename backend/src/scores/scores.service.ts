import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { REDIS_CLIENT } from '../redis/redis.provider';
import { WebSocketService } from '../websocket/websocket.service';
import { SubmitScoreDto } from './dto/submit-score.dto';
import { ScoresRepo } from './scores.repo';

export interface ScoreSubmissionResult {
  id: number;
  playerId: number;
  gameId: number;
  score: string;
  submittedAt: Date;
  isNewPersonalBest: boolean;
}

@Injectable()
export class ScoresService {
  constructor(
    private readonly repo: ScoresRepo,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly wsService: WebSocketService,
    private readonly leaderboardService: LeaderboardService,
  ) {}

  async submitScore(
    playerId: number,
    dto: SubmitScoreDto,
  ): Promise<ScoreSubmissionResult> {
    const game = await this.repo.findGame(dto.gameId);
    if (!game) {
      throw new NotFoundException(`Game ${dto.gameId} not found`);
    }

    const score = await this.repo.createScore({
      playerId,
      gameId: dto.gameId,
      score: dto.score,
    });

    const [gameChanged, globalChanged] = (await Promise.all([
      this.redis.call(
        'ZADD',
        `leaderboard:game:${dto.gameId}`,
        'GT',
        'CH',
        String(dto.score),
        String(playerId),
      ),
      this.redis.call(
        'ZADD',
        'leaderboard:global',
        'GT',
        'CH',
        String(dto.score),
        String(playerId),
      ),
    ])) as [number, number];

    const isNewPersonalBest = gameChanged > 0 || globalChanged > 0;

    if (gameChanged > 0) {
      const payload = await this.leaderboardService.getGameRankings(dto.gameId);
      this.wsService.broadcast(dto.gameId, payload);
    }

    if (globalChanged > 0) {
      const entries = await this.leaderboardService.getGlobal(10);
      this.wsService.broadcastGlobal(entries);
    }

    return {
      id: score.id,
      playerId: score.playerId,
      gameId: score.gameId,
      score: score.score.toString(),
      submittedAt: score.submittedAt,
      isNewPersonalBest,
    };
  }
}