import { Injectable } from '@nestjs/common';
import {
  LeaderboardEntry,
  LeaderboardUpdatePayload,
} from '../leaderboard/leaderboard.service';
import { WebsocketGateway } from './websocket.gateway';

export type { LeaderboardEntry, LeaderboardUpdatePayload } from '../leaderboard/leaderboard.service';

@Injectable()
export class WebSocketService {
  constructor(private readonly gateway: WebsocketGateway) {}

  broadcast(gameId: number, payload: LeaderboardUpdatePayload): void {
    if (!this.gateway.server) return;
    this.gateway.server
      .to(`game:${gameId}`)
      .emit('leaderboard_update', payload);
  }

  broadcastGlobal(entries: LeaderboardEntry[]): void {
    if (!this.gateway.server) return;
    this.gateway.server.emit('leaderboard:update', entries);
  }
}
