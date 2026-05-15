import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  },
})
export class WebsocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly leaderboardService: LeaderboardService) {}

  async handleConnection(client: Socket): Promise<void> {
    const entries = await this.leaderboardService.getGlobal(10);
    client.emit('leaderboard:init', entries);
  }

  @SubscribeMessage('join_game')
  handleJoinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: number },
  ): void {
    client.join(`game:${data.gameId}`);
  }

  @SubscribeMessage('leave_game')
  handleLeaveGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: number },
  ): void {
    client.leave(`game:${data.gameId}`);
  }
}
