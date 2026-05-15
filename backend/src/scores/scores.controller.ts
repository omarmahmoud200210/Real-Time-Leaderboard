import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { SubmitScoreDto } from './dto/submit-score.dto';
import { ScoresRepo } from './scores.repo';
import { ScoresService } from './scores.service';
import { GameScoreThrottlerGuard } from './throttler/game-score-throttler.guard';

@Controller('scores')
export class ScoresController {
  constructor(
    private readonly scoresService: ScoresService,
    private readonly scoresRepo: ScoresRepo,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(GameScoreThrottlerGuard)
  async submitScore(
    @CurrentUser() user: { sub: number },
    @Body() dto: SubmitScoreDto,
  ) {
    return await this.scoresService.submitScore(user.sub, dto);
  }
}

@Controller('games')
export class GamesController {
  constructor(private readonly scoresRepo: ScoresRepo) {}

  @Get()
  @Public()
  async listGames() {
    return this.scoresRepo.findAllGames();
  }
}