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
      return {
        info: {
          total: result.length,
          page: getOrdersDto.page,
          limit: getOrdersDto.limit,
          totalPages: Math.ceil(result.length / getOrdersDto.limit),
          query: {
            search: {
              orderCodes: getOrdersDto.filter.orderCodes,
              buyerPhoneNumbers: getOrdersDto.filter.buyerPhoneNumbers,
              buyerEmails: getOrdersDto.filter.buyerEmails,
              purchaseNote: getOrdersDto.filter.purchaseNote,
            },
            filter: {
              orderStatuses: getOrdersDto.filter.orderStatus,
              createOrderDateRanges: getOrdersDto.filter.createOrderDateRange,
              purchaseCompleteDateRanges:
                getOrdersDto.filter.purchaseCompleteDateRange,
              partnerIds: getOrdersDto.filter.partnerIds,
            },
          },
          sort: getOrdersDto.sort,
        },
        data: result,
      };
    } catch (e) {
      console.log(e.message);
    }
  }
}
