import { IsOptional } from 'class-validator';

export class SortOrdersDto {
  @IsOptional()
  createdAt: 'asc' | 'desc';

  @IsOptional()
  purchaseCompletedAt: 'asc' | 'desc';
}
