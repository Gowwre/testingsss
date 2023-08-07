import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './services/orders.service';
import { OrderStatus } from './entities/orders.entity';
import { SearchAndFilterOrdersDto } from './dto/filter-and-search-orders.dto';
import { GetOrdersDto } from './dto/get-orders.dto';

@Controller('orders')
export class OrderController {
  constructor(private ordersService: OrderService) {}

  @Get('getList')
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }
  @Get('getDetail')
  async getOrderDetails(@Query('orderCode') orderCode: string) {
    console.debug(await this.ordersService.getDetails(orderCode));
    return this.ordersService.getDetails(orderCode);
  }

  @Post('getFilteredList')
  async filterOrder(@Body() getOrdersDto: Partial<GetOrdersDto>) {
    try {
      const result = await this.ordersService.getOrders(getOrdersDto);
      return result;
    } catch (e) {
      console.log(e.message);
    }
  }
}
