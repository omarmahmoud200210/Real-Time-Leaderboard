import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class GameScoreThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const userId = (req.user as { userId: number }).userId;
    const gameId = req.body?.gameId as number;
    return `${userId}:${gameId}`;
  }
}
