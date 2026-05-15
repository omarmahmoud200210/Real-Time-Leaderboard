import { Module } from '@nestjs/common';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { WebSocketModule } from '../websocket/websocket.module';
import { GamesController, ScoresController } from './scores.controller';
import { ScoresRepo } from './scores.repo';
import { ScoresService } from './scores.service';
import { GameScoreThrottlerGuard } from './throttler/game-score-throttler.guard';

@Module({
  imports: [WebSocketModule, LeaderboardModule],
  controllers: [ScoresController, GamesController],
  providers: [ScoresService, ScoresRepo, GameScoreThrottlerGuard],
})
export class ScoresModule {}
