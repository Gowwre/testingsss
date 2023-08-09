import { SearchAndFilterOrdersDto } from './filter-and-search-orders.dto';
import { SortOrdersDto } from './sort-orders.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetOrdersDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  filter: Partial<SearchAndFilterOrdersDto>;
  @ApiProperty()
  sort: Partial<SortOrdersDto>;
}
