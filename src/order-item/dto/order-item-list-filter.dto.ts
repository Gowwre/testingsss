import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../order/entities/order.entity';
import { IsOptional, ValidateNested } from 'class-validator';
export class QueryItemDto {
  @ApiProperty({
    default: {},
  })
  orderItemCode: { like: string } | { in: string[] } | {} = {};
}
export class SortItemDto {}
export class OrderItemListFilterDto {
  @ApiProperty({
    default: 1,
  })
  page: number = 1;
  @ApiProperty({
    default: 20,
  })
  limit: number = 20;
  @ApiProperty({})
  @ValidateNested({ each: true })
  query: QueryItemDto;
  @ApiProperty()
  @ValidateNested({ each: true })
  sort: SortItemDto;
}
