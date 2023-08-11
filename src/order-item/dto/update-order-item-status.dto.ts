import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { OrderItemsStatusEnum } from '../entities/order-item.entity';

export class UpdateOrderItemStatusDto {
  @ApiProperty()
  orderItemCode: string;
  @ApiProperty({
  })
  status:number ;
}
