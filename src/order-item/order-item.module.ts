import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsEntity } from './entities/order-items.entity';
import { OrderItemsService } from './services/order-items.service';
import { OrdersItemsRepository } from './repositories/orders-items.repository';
import { OrderItemsController } from './order-items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemsEntity])],
  providers: [OrderItemsService, OrdersItemsRepository],
  controllers: [OrderItemsController],
  exports: [OrdersItemsRepository],
})
export class OrderItemModule {}
