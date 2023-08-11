import { Module } from '@nestjs/common';
import { OrderItemService } from './services/order-item.service';
import { OrderItemController } from './order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsEntity } from './entities/order-item.entity';
import { BaseRepository } from '../base/repositories/base.repository';
import { OrderItemRepository } from './repositories/order-item.repository';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, BaseRepository, OrderItemRepository],
  imports: [TypeOrmModule.forFeature([OrderItemsEntity])],
  exports: [OrderItemRepository],
})
export class OrderItemModule {}
