import { IsOptional } from 'class-validator';

export class SortOrdersDto {
  @IsOptional()
  createdAt: 'ASC' | 'DESC';

  @IsOptional()
  purchaseCompletedAt: 'ASC' | 'DESC';
}
