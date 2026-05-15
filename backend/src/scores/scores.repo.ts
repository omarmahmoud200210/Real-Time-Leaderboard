import { Injectable } from '@nestjs/common';
import { Game, Player, Score } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScoresRepo {
  constructor(private readonly prisma: PrismaService) {}

  async createScore(data: {
    playerId: number;
    gameId: number;
    score: number;
  }): Promise<Score> {
    return await this.prisma.score.create({
      data: {
        playerId: data.playerId,
        gameId: data.gameId,
        score: data.score,
      },
    });
  }

  async findGame(gameId: number): Promise<Game | null> {
    return await this.prisma.game.findUnique({ where: { id: gameId } });
  }

  async findAllGames(): Promise<Pick<Game, 'id' | 'name'>[]> {
    return await this.prisma.game.findMany({
      select: { id: true, name: true },
      orderBy: { id: 'asc' },
    });
  }

  async findPlayersByIds(
    playerIds: number[],
  ): Promise<Pick<Player, 'id' | 'username'>[]> {
    return await this.prisma.player.findMany({
      where: { id: { in: playerIds } },
      select: { id: true, username: true },
    });
  }
}
