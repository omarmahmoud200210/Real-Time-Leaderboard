import { Injectable } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthRepo {
  constructor(private readonly prisma: PrismaService) {}

  async createPlayer(dto: RegisterDto, hash: string): Promise<Player> {
    return await this.prisma.player.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hash,
      },
    });
  }

  async findByEmail(email: string): Promise<Player | null> {
    return await this.prisma.player.findUnique({ where: { email } });
  }

  async findPlayersByIds(
    ids: number[],
  ): Promise<Pick<Player, 'id' | 'username'>[]> {
    return this.prisma.player.findMany({
      where: { id: { in: ids } },
      select: { id: true, username: true },
    });
  }
}
