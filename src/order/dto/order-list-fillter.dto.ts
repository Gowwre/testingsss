import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class OrderRequestConverterPipe implements PipeTransform {
  transform(body: any, metadata: ArgumentMetadata): OrderListFilterDto {
    try {
      const result = new OrderListFilterDto();
      result.page = body.page;
      result.limit = body.limit;
      result.query = this.transformQuery(body.query);
      console.log(body.query);

      const sort = new SortDto();
      /**
       * Định nghĩa lại nhận val data từ body
       */
      if (body.sort?.created_at === 'ASC' || body.sort?.created_at === 'DESC') {
        sort.created_at = body.sort.created_at;
      } else if (
        body.sort?.payment_completed_at === 'ASC' ||
        body.sort?.payment_completed_at === 'DESC'
      ) {
        sort.payment_completed_at = body.sort.payment_completed_at;
      } else {
        sort.payment_completed_at = 'ASC';
      }

      result.sort = sort;
      return result;
    } catch (e) {
      console.log(e.message);
    }
  }

  transformQuery(query: any) {
    return {
      orderCode: query.orderCode ? query.orderCode : {},
      buyerEmail: query.buyerEmail ? query.buyerEmail : {},
      buyerPhone: query.buyerPhone ? query.buyerPhone : {},
      purchasesNote: query.purchasesNote ? query.purchasesNote : {},
      partnerId: query.partnerId ? query.partnerId : {},
      createdAt: query.createdAt ? query.createdAt : {},
      paymentCompletedAt: query.paymentCompletedAt
        ? query.paymentCompletedAt
        : {},
      orderStatus: query.orderStatus ? query.orderStatus : {},
      listCountryCode: query.listCountryCode ? query.listCountryCode : {},
    };
  }
}

/**
 * Muống where gì phải khai báo ở đây
 */
export class QueryDto {
  @ApiProperty({
    description:
      'Order Code, either matches loosely, or matches multiple values separated by a comma',
    default: {},
    required: false,
  })
  orderCode: { like: string } | { in: string[] } | {} = {};

  @ApiProperty({
    description: 'Buyer Emails',
    default: {},
    required: false,
  })
  buyerEmail: { like: string } | { in: string[] } | {} = {};

  @ApiProperty({
    description: 'Buyer Phone Numbers',
    required: false,
    default: {},
  })
  buyerPhone: { like: string } | { in: string[] } | {} = {};

  @ApiProperty({
    description: 'Purchase Note',
    required: false,
    default: {},
  })
  purchasesNote: { like: string } | {} = {};

  @ApiProperty({
    description: 'Partner Ids',
    required: false,
    default: {},
  })
  partnerId: { in: number[] } | {} = {};

  @ApiProperty({
    description: 'Order Codes',
    required: false,
    default: {},
  })
  createdAt: { between: Date[] } | {} = {};

  @ApiProperty({
    description: 'Order Codes',
    required: false,
    default: {},
  })
  paymentCompletedAt: { between: Date[] } | {} = {};

  @ApiProperty({
    description: 'Countries',
    required: false,
    default: {},
  })
  listCountryCode: { like: string[] } | {} = {};

  @ApiProperty({
    description: 'Order Status',
    required: false,
    default: {},
  })
  orderStatus: { in: OrderStatus[] } | {} = {};
}

/**
 * Sử dụng key giống với key của table
 */
export class SortDto {
  @IsOptional()
  @ApiProperty({
    description: 'Created At',
    default: 'ASC',
    required: false,
  })
  created_at: 'ASC' | 'DESC';
  @IsOptional()
  @ApiProperty({
    description: 'Payment Completed At',
    default: 'ASC',
    required: false,
  })
  payment_completed_at: 'ASC' | 'DESC';
}

export class OrderListFilterDto {
  @ApiProperty({
    description: 'Page',
    default: 1,
  })
  @IsNumber()
  page: number = 1;

  @ApiProperty({
    description: 'Limit per page',
    default: 10,
  })
  @IsNumber()
  limit: number = 10;

  @ApiProperty({
    description: 'query data',
  })
  @ValidateNested({ each: true })
  @Type(() => QueryDto)
  query: QueryDto;

  @ApiProperty({
    description: 'sort data',
  })
  @ValidateNested({ each: true })
  @Type(() => SortDto)
  sort: SortDto;
}
