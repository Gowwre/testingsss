import { OrderEntity } from '../entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/repositories/base.repository';
import { async } from 'rxjs';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(
    private dataSource: DataSource,
    private baseRepository: BaseRepository,
  ) {
    super(OrderEntity, dataSource.createEntityManager());
  }

  totalRaw = 0;
  async getTotalRaw() {
    return this.totalRaw;
  }

  async getList(
    condition?: object,
    page?: Number,
    limit?: Number,
    sort?: any,
  ): Promise<OrderEntity[]> {
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

  async getFullListCount(condition?: object): Promise<number> {
    let queryBuilder = this.createQueryBuilder();
    queryBuilder = this.baseRepository.buildWhere(queryBuilder, condition);
    return await queryBuilder.getCount();
  }

  async getDetail(condition?: object): Promise<OrderEntity> {
    let queryBuilder = this.createQueryBuilder();
    queryBuilder = this.baseRepository.buildWhere(queryBuilder, condition);
    return await queryBuilder.getOne();
  }
}
