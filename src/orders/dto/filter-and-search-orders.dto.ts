import { OrderStatus } from '../entities/orders.entity';
import { IsArray, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchAndFilterOrdersDto {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  partnerIds: string[];

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  orderStatus: OrderStatus[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  purchaseCompleteDateRange: Date[];

  @IsOptional()
  @IsArray()
  createOrderDateRange: Date[];
  @IsArray()
  @IsOptional()
  orderCodes: string[];

  @IsArray()
  @IsOptional()
  buyerPhoneNumbers: string[];

  @IsArray()
  @IsEmail()
  buyerEmails: string[];

  @IsOptional()
  purchaseNote: string;
}
