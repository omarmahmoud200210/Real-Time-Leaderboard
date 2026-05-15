import { Module } from '@nestjs/common';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { WebsocketGateway } from './websocket.gateway';
import { WebSocketService } from './websocket.service';

@Module({
  imports: [LeaderboardModule],
  providers: [WebsocketGateway, WebSocketService],
  exports: [WebSocketService],
})
export class WebSocketModule {}
