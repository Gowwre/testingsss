import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/orders.repository';
import { OrdersItemsRepository } from '../../order-item/repositories/orders-items.repository';
import { determineOrderStatus } from '../helpers/status-helper';
import { OrderStatus } from '../entities/orders.entity';
import { SearchAndFilterOrdersDto } from '../dto/filter-and-search-orders.dto';
import { GetOrdersDto } from '../dto/get-orders.dto';
import {determineFastShipping} from "../helpers/fast-shippping-helper";

@Injectable()
export class OrderService {
  constructor(
    private ordersRepo: OrderRepository,
    private orderItemsRepo: OrdersItemsRepository,
  ) {}

  async getAllOrders() {
    const allOrders = await this.ordersRepo.getAllOrders();

    for (let order of allOrders) {
      const orderItems = await this.orderItemsRepo.getOrderItemsFromOrder(
        order.id,
      );

      order.orderStatus = determineOrderStatus(orderItems);
    }

    return allOrders;
  }

  async getDetails(orderCode: string) {
    const order = await this.ordersRepo.getByCode(orderCode);
    const orderItems = await this.orderItemsRepo.getOrderItemsFromOrder(
      order.id,
    );
    order.orderStatus = determineOrderStatus(orderItems);
    order.orderItems = orderItems;
    return order;
  }

  getTotalCount() {
    return this.ordersRepo.getCount();
  }

  async getOrders(getOrdersDto: Partial<GetOrdersDto>) {
    try {
      console.log(getOrdersDto);
      const orders = await this.ordersRepo.betterGetOrders(getOrdersDto);
      for (const order of orders) {
        let orderItems = await this.orderItemsRepo.getOrderItemsFromOrder(
          order['orders_id'],
        );
        order.orderStatus = determineOrderStatus(orderItems);
        order.isFastShipping = determineFastShipping(orderItems);
      }
      let start = (getOrdersDto.page - 1) * getOrdersDto.limit;
      let end = getOrdersDto.limit * getOrdersDto.page;

      if (
        getOrdersDto.filter.orderStatus &&
        getOrdersDto.filter.orderStatus.length > 0
      ) {
        //This thing is slow as hell, only use temporarily until better solution is found
        return orders
          .filter((order) => {
            return getOrdersDto.filter.orderStatus.includes(order.orderStatus);
          })
          .slice(start, end);
      }

      return orders;
    } catch (e) {
      console.log(e.message);
    }
  }
}
