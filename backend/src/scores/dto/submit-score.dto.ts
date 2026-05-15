import { IsInt, IsNumber, Min } from 'class-validator';

export class SubmitScoreDto {
  @IsInt()
  @Min(1)
  gameId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  score: number;
}
