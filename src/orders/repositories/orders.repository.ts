import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity, OrderStatus } from '../entities/orders.entity';
import { Brackets, Repository } from 'typeorm';
import { SearchAndFilterOrdersDto } from '../dto/filter-and-search-orders.dto';
import {
  OrderItemsEntity,
  OrderItemsStatusEnum,
} from '../../order-item/entities/order-items.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrdersEntity) private orderRepo: Repository<OrdersEntity>,
  ) {}

  getAllOrders() {
    return this.orderRepo.find();
  }

  getOne(id: string) {
    return this.orderRepo.findOne({
      where: {
        id,
      },
    });
  }

  getByCode(orderCode: string) {
    return this.orderRepo.findOne({
      where: {
        orderCode: orderCode,
      },
    });
  }

  async getOrders(filterOptions: Partial<SearchAndFilterOrdersDto>) {
    try {
      let queryBuilder = this.orderRepo.createQueryBuilder('orders');

      const {
        orderCodes,
        buyerPhoneNumbers,
        buyerEmails,
        purchaseNote,
        partnerFilterOptions,
        orderStatusFilterOptions,
          createOrderDateRange,
      } = filterOptions;

      if (orderCodes && orderCodes.length > 0) {
        queryBuilder = queryBuilder.andWhere(
          'orders.orderCode IN (:...orderCodes)',
          {
            orderCodes,
          },
        );
      }

      if (buyerPhoneNumbers && buyerPhoneNumbers.length > 0) {
        queryBuilder = queryBuilder.andWhere(
          'orders.buyerPhone IN (:...buyerPhoneNumbers)',
          {
            buyerPhoneNumbers,
          },
        );
      }

      if (buyerEmails && buyerEmails.length > 0) {
        queryBuilder = queryBuilder.andWhere(
          'orders.buyerEmail IN (:...buyerEmails)',
          {
            buyerEmails,
          },
        );
      }

      if (purchaseNote && purchaseNote !== '') {
        queryBuilder = queryBuilder.andWhere(
          'orders.purchaseNote = :purchaseNote',
          {
            purchaseNote,
          },
        );
      }

      if (partnerFilterOptions && partnerFilterOptions.length > 0) {
        queryBuilder = queryBuilder.andWhere(
          'orders.partnerId IN (:...partnerFilterOptions)',
          {
            partnerFilterOptions,
          },
        );
      }

      if(createOrderDateRange && createOrderDateRange.length > 0){
        queryBuilder = queryBuilder.andWhere(
          'orders.createdAt BETWEEN :createOrderDateRange[0] AND :createOrderDateRange[1]',
          {
            createOrderDateRange
          },
        );

      }

      // if (orderStatusFilterOptions && orderStatusFilterOptions.length > 0) {
      //   //do something
      // }

      return await queryBuilder.getMany();
    } catch (e) {
      console.log(e.message);
    }
  }

  //Todo: Complete this
  filterByStatus(options: OrderStatus[]) {
    let query = this.orderRepo
      .createQueryBuilder('orders')
      .innerJoin(
        OrderItemsEntity,
        'orderItems',
        'orders.id = orderItems.orderId',
      );
    if (options.includes('PROCESSING')) {
      query = query.where(new Brackets((qb) => {}));
    }
    if (options.includes('PROCESSED')) {
      query = query.orWhere(new Brackets((qb) => {}));
    }

    if (options.includes('INTERNATIONAL_TRACKING_AVAILABLE')) {
      query = query.orWhere(new Brackets((qb) => {}));
    }

    if (options.includes('DELIVERED')) {
      query = query.orWhere(new Brackets((qb) => {}));
    }

    if (options.includes('CANCELLED')) {
      query = query.orWhere(new Brackets((qb) => {}));
    }

    return query.getRawMany();
  }
}
