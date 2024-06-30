import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  // Transformar string a number
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Min(0)
  // Transformar string a number
  @Type(() => Number)
  offset?: number;
}
