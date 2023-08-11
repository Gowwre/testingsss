import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';
import { UpdateOrderItemDto } from '../dto/update-order-item.dto';
import { OrderItemRepository } from '../repositories/order-item.repository';
import { UpdateOrderItemStatusDto } from '../dto/update-order-item-status.dto';

@Injectable()
export class OrderItemService {
  constructor(private orderItemRepository: OrderItemRepository) {}
  getList(condition: object, page: Number, limit: number, sort: object) {
    return this.orderItemRepository.getList(condition, page, limit, sort);
  }

  async updateStatus(updateStatusDto: Partial<UpdateOrderItemStatusDto>) {
    console.log(updateStatusDto)
    const result = await this.orderItemRepository.updateStatus(updateStatusDto);
    return result;
  }
}
