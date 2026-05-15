import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { LeaderboardEntry, LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get('global')
  @Public()
  async getGlobal(): Promise<LeaderboardEntry[]> {
    return this.leaderboardService.getGlobal(10);
  }

  @Get('global/me')
  async getMyRank(
    @CurrentUser() user: { sub: number },
  ): Promise<{ rank: number | null; score: string | null }> {
    return this.leaderboardService.getMyRank(user.sub);
  }
}
