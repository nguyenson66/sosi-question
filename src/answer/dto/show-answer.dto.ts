import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ShowAnswerDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  order: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  by: string;
}
