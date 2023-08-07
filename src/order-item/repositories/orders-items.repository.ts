import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemsEntity } from '../entities/order-items.entity';
import { Repository } from 'typeorm';
import { OrdersEntity } from '../../orders/entities/orders.entity';

@Injectable()
export class OrdersItemsRepository {
  constructor(
    @InjectRepository(OrderItemsEntity)
    private orderItemsRepo: Repository<OrderItemsEntity>,
  ) {}

  getAll() {
    return this.orderItemsRepo.find();
  }

  getOrderItemsFromOrder(id: string) {
    return this.orderItemsRepo.find({
      where: {
        orderId: id,
      },
    });
  }
}
