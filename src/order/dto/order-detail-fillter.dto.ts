import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

/**
 * Muống where gì phải khai báo ở đây
 */
export class QueryDto {
  @IsNumber()
  id: number;
}

export class OrderDetailFilterDto {
  @IsNumber()
  page: number;
  limit: number;

  @ValidateNested({ each: true })
  @Type(() => QueryDto)
  query: QueryDto;
}
