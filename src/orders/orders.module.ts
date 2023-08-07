import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { OrderService } from './services/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { OrderRepository } from './repositories/orders.repository';
import { OrderItemModule } from '../order-item/order-item.module';

@Module({
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([OrdersEntity]), OrderItemModule],
})
export class OrdersModule {}
