import { Controller, Get } from '@nestjs/common';
import { OrderItemsService } from './services/order-items.service';

@Controller('order-item')
export class OrderItemsController {
  constructor(private orderItemService: OrderItemsService) {}
  @Get('getList')
  async getAll() {
    const result = await this.orderItemService.getAll();
    return result;
  }
}
