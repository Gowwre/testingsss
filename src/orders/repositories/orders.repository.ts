import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity, OrderStatus } from '../entities/orders.entity';
import {
  Between,
  Brackets,
  FindOptions,
  In,
  ObjectLiteral,
  OrderByCondition,
  Repository,
} from 'typeorm';
import { SearchAndFilterOrdersDto } from '../dto/filter-and-search-orders.dto';
import {
  OrderItemsEntity,
  OrderItemsStatusEnum,
} from '../../order-item/entities/order-items.entity';
import { GetOrdersDto } from '../dto/get-orders.dto';
import { PartnersEntity } from '../../partners/entities/partner.entity';
import { Injectable } from '@nestjs/common';

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
        partnerIds,
        orderStatus,
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

      if (partnerIds && partnerIds.length > 0) {
        queryBuilder = queryBuilder.andWhere(
          'orders.partnerId IN (:...partnerFilterOptions)',
          {
            partnerIds: partnerIds,
          },
        );
      }

      if (createOrderDateRange && createOrderDateRange.length > 0) {
        queryBuilder = queryBuilder.andWhere(
          'orders.createdAt BETWEEN :createOrderDateRange[0] AND :createOrderDateRange[1]',
          {
            createOrderDateRange,
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

  async betterGetOrders(getOrdersDto: Partial<GetOrdersDto>) {
    try {
      const condition = this.getCondition(getOrdersDto);
      const orderBy = this.getOrderBy(getOrdersDto);
      let offset = (getOrdersDto.page - 1) * getOrdersDto.limit;

      let query = this.orderRepo
        .createQueryBuilder('orders')
        .leftJoinAndSelect(
          PartnersEntity,
          'partner',
          'orders.partnerId = partner.id',
        ).leftJoinAndSelect(OrderItemsEntity, 'orderItems', 'orderItems.orderId = orders.id');

      let conditionIsNotEmpty = Object.keys(condition).length > 0;
      if (conditionIsNotEmpty) {
        query = query.where(condition);
      }

      const result = await query
        .orderBy(orderBy)
        .offset(offset)
        .limit(getOrdersDto.limit)
        .getRawMany();

      return result;
    } catch (e) {
      console.log(e.message);
    }
  }

  private getCondition(getOrdersDto: Partial<GetOrdersDto>) {
    let condition: ObjectLiteral = {};

    if (
      getOrdersDto.filter.orderCodes &&
      getOrdersDto.filter.orderCodes.length > 0
    ) {
      condition.orderCode = In(getOrdersDto.filter.orderCodes);
    }

    if (
      getOrdersDto.filter.buyerPhoneNumbers &&
      getOrdersDto.filter.buyerPhoneNumbers.length > 0
    ) {
      condition.buyerPhone = In(getOrdersDto.filter.buyerPhoneNumbers);
    }

    if (
      getOrdersDto.filter.buyerEmails &&
      getOrdersDto.filter.buyerEmails.length > 0
    ) {
      condition.buyerEmail = In(getOrdersDto.filter.buyerEmails);
    }

    if (
      getOrdersDto.filter.purchaseNote &&
      getOrdersDto.filter.purchaseNote !== ''
    ) {
      condition.purchaseNote = getOrdersDto.filter.purchaseNote;
    }

    console.log(getOrdersDto);
    if (
      getOrdersDto.filter.partnerIds &&
      getOrdersDto.filter.partnerIds.length > 0
    ) {
      condition.partnerId = In(getOrdersDto.filter.partnerIds);
    }

    if (
      getOrdersDto.filter.createOrderDateRange &&
      getOrdersDto.filter.createOrderDateRange.length > 0
    ) {
      let startDate = getOrdersDto.filter.createOrderDateRange[0];
      let endDate = getOrdersDto.filter.createOrderDateRange[1];
      let temp: Date;
      if (!endDate) endDate = startDate;
      if (endDate < startDate) {
        temp = startDate;
        startDate = endDate;
        endDate = temp;
      }

      condition.createdAt = Between(startDate, endDate);
    }

    return condition;
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

  private getOrderBy(getOrdersDto: Partial<GetOrdersDto>) {
    let orderBy: OrderByCondition = {};

    if (getOrdersDto.sort.createdAt) {
      orderBy['orders.created_at'] = getOrdersDto.sort.createdAt;
    } else if (getOrdersDto.sort.purchaseCompletedAt) {
      orderBy.purchaseCompletedAt = getOrdersDto.sort.purchaseCompletedAt;
    } else {
      orderBy.createdAt = 'DESC';
    }

    return orderBy;
  }
}
