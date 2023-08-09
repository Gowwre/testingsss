import { OrderItemsEntity } from '../../order-item/entities/order-items.entity';

export function determineFastShipping(orderItems: OrderItemsEntity[]): boolean {
  if (orderItems.some((orderItem) => orderItem.fastShipingFee)) return true;
  return false;
}
