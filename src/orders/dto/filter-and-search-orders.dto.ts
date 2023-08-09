import { OrderStatus } from '../entities/orders.entity';
import { IsArray, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchAndFilterOrdersDto {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @ApiProperty()
  partnerIds: string[];

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @ApiProperty()
  orderStatus: OrderStatus[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  @ApiProperty()
  paymentCompleteDateRange: Date[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  createOrderDateRange: Date[];
  @IsArray()
  @IsOptional()
  @ApiProperty()
  orderCodes: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  buyerPhoneNumbers: string[];

  @IsArray()
  @IsEmail()
  buyerEmails: string[];

  @IsOptional()
  purchaseNote: string;
}
