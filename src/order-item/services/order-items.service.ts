import { Injectable } from '@nestjs/common';
import { OrdersItemsRepository } from '../repositories/orders-items.repository';
import { OrderRepository } from '../../orders/repositories/orders.repository';

@Injectable()
export class OrderItemsService {
  constructor(private orderItemsRepository: OrdersItemsRepository) {}

  getAll() {
    return this.orderItemsRepository.getAll();
  }

  getOrderItemsFromOrderCode(orderCode: string) {}
}
