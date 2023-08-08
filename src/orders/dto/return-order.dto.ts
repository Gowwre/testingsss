import { GetOrdersDto } from './get-orders.dto';

export class ReturnOrdersDto extends GetOrdersDto {
  totalPages: number;
}
