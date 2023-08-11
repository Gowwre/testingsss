import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  OrderListFilterDto,
  OrderRequestConverterPipe,
} from './dto/order-list-fillter.dto';
import { ApiBody } from '@nestjs/swagger';
import { OrderDetailFilterDto } from './dto/order-detail-fillter.dto';
import { OrderService } from './services/orders.service';
import { OrderEntity } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private ordersService: OrderService) {}

  @Post('get-list')
  @ApiBody({ type: OrderListFilterDto })
  @UsePipes(new OrderRequestConverterPipe(), new ValidationPipe())
  async getList(@Body() OrderListFilterDto: Partial<OrderListFilterDto>) {
    console.log(OrderListFilterDto);
    const start = performance.now();
    const orders = await this.ordersService.getList(
      OrderListFilterDto.query,
      OrderListFilterDto.page,
      OrderListFilterDto.limit,
      OrderListFilterDto.sort,
    );
    let totalRows = 100;

    console.log(totalRows);
    const stop = performance.now();
    console.log(stop - start);
    return {
      orders,
      totalRows,
      totalPages: Math.ceil(totalRows / OrderListFilterDto.limit),
    };
  }

  @ApiBody({ type: OrderDetailFilterDto })
  @Post('get-detail')
  async getDetail(@Body() OrderDetailFilterDto: Partial<OrderDetailFilterDto>) {
    return this.ordersService.getDetail(OrderDetailFilterDto.query);
  }
}
