import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { OrderItemService } from './services/order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemListFilterDto } from './dto/order-item-list-filter.dto';
import { ApiBody } from '@nestjs/swagger';
import { UpdateOrderItemStatusDto } from './dto/update-order-item-status.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post('/get-list/')
  @ApiBody({ type: OrderItemListFilterDto })
  async getList(
    @Body() OrderItemListFilterDto: Partial<OrderItemListFilterDto>,
  ) {
    let list = await this.orderItemService.getList(
      OrderItemListFilterDto.query,
      OrderItemListFilterDto.page,
      OrderItemListFilterDto.limit,
      OrderItemListFilterDto.sort,
    );
    let orderItems = list.map((item) => {
      return {
        ...item,
        totalFee:
          item.shippingFee +
          item.importFee +
          item.fastShipingFee +
          item.importFee -
          item.discountPrice,
      };
    });
    return {
      metadata: {
        totalRows: list.length,
      },
      results: orderItems,
    };
  }

  @Post('/update-status/')
  @ApiBody({ type: UpdateOrderItemStatusDto })
  @UsePipes(new ValidationPipe())
  async updateStatus(@Body() updateStatusDto: Partial<UpdateOrderItemStatusDto>) {
    console.log(updateStatusDto)
    return this.orderItemService.updateStatus(updateStatusDto);
  }
}
