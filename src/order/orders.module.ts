import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { OrderService } from './services/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderRepository } from './repositories/order.repository';
import { BaseRepository } from 'src/base/repositories/base.repository';
import { OrderItemModule } from '../order-item/order-item.module';

@Module({
  providers: [OrderService, OrderRepository, BaseRepository],
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([OrderEntity]), OrderItemModule],
})
export class OrdersModule {}
