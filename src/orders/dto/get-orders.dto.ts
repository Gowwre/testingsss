import { SearchAndFilterOrdersDto } from './filter-and-search-orders.dto';
import { SortOrdersDto } from './sort-orders.dto';

export class GetOrdersDto {
  page: number;
  limit: number;
  filter: Partial<SearchAndFilterOrdersDto>;
  sort: Partial<SortOrdersDto>;
}
