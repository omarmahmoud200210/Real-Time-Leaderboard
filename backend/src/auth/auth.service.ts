import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Player } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthRepo } from './auth.repo';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface AuthResult {
  accessToken: string;
  user: { sub: number; username: string };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: AuthRepo,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<Omit<Player, 'password'>> {
    const hash = await bcrypt.hash(dto.password, 10);

    try {
      const player = await this.repo.createPlayer(dto, hash);
      const { password: _password, ...result } = player;
      return result;
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code: string }).code === 'P2002'
      ) {
        throw new ConflictException('Username or email already exists');
      }
      throw error;
    }
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const player = await this.repo.findByEmail(dto.email);
    const isValid =
      player !== null && (await bcrypt.compare(dto.password, player.password));

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      sub: player.id,
      username: player.username,
    });

    return { accessToken, user: { sub: player.id, username: player.username } };
  }

  async registerAndLogin(dto: RegisterDto): Promise<AuthResult> {
    await this.register(dto);
    return this.login({ email: dto.email, password: dto.password });
  }

  async getPlayers(ids: number[]): Promise<Pick<Player, 'id' | 'username'>[]> {
    return this.repo.findPlayersByIds(ids);
  }
}
