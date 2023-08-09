import { IsOptional } from 'class-validator';

export class SortOrdersDto {
  @IsOptional()
  createdAt: 'ASC' | 'DESC';

  @IsOptional()
  paymentCompletedAt: 'ASC' | 'DESC';
}
