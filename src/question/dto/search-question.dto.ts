import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchQuestionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  s: string;

  @IsOptional()
  @IsNotEmpty()
  category: string[];

  @IsOptional()
  @IsNotEmpty()
  order: string;

  @IsOptional()
  @IsNotEmpty()
  by: string;

  @IsOptional()
  @IsNumberString()
  skip: string;

  @IsOptional()
  @IsNumberString()
  limit: string;
}
