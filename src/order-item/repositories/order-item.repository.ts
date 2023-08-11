import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderItemsEntity } from '../entities/order-item.entity';
import { BaseRepository } from '../../base/repositories/base.repository';
import { OrderEntity } from '../../order/entities/order.entity';
import { UpdateOrderItemStatusDto } from '../dto/update-order-item-status.dto';

@Injectable()
export class OrderItemRepository extends Repository<OrderItemsEntity> {
  constructor(
    private dataSource: DataSource,
    private baseRepository: BaseRepository,
  ) {
    super(OrderItemsEntity, dataSource.createEntityManager());
  }

  totalRaw = 0;

  async getList(
    condition?: object,
    page?: Number,
    limit?: Number,
    sort?: any,
  ): Promise<OrderItemsEntity[]> {
    const offset = (Number(page) - 1) * Number(limit);
    let queryBuilder = this.createQueryBuilder()
      .limit(Number(limit))
      .offset(offset)
      .orderBy(sort);
    queryBuilder = this.baseRepository.buildWhere(queryBuilder, condition);

    let results = await queryBuilder.getMany();
    this.totalRaw = (
      await this.dataSource.query('SELECT FOUND_ROWS() as total')
    )[0].total;
    return results;
  }

  async updateStatus(updateStatusDto: Partial<UpdateOrderItemStatusDto>) {
    try {
      console.log(updateStatusDto)
      const result = await this.update({orderItemCode: updateStatusDto.orderItemCode}, {statusId: updateStatusDto.status},
      );
      return result;
    } catch (e) {
      console.log(e.message)
    }
  }
}
