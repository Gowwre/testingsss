import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { OrderItemRepository } from '../../order-item/repositories/order-item.repository';

@Injectable()
export class OrderService {
  constructor(
    private ordersRepo: OrderRepository,
    private orderItemsRepo: OrderItemRepository,
  ) {}

  async getTotalRaw() {
    return await this.ordersRepo.getTotalRaw();
  }

  async getList(condition: object, page: Number, limit: number, sort: object) {
    const orders = await this.ordersRepo.getList(condition, page, limit, sort);
    return orders;
  }

  async getFullListCount(condition: object) {
    return this.ordersRepo.getFullListCount(condition);
  }

  getDetail(condition: object) {
    return this.ordersRepo.getDetail(condition);
  }
}
