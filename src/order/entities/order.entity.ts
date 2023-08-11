import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatusEnum {
  NEW = 1,
  PROCESSING = 2,
  PROCESSED = 3,
  INTERNATIONAL_TRACKING_AVAILABLE = 4,
  CANCELLED = 5,
  DELIVERED = 6,
}

export type OrderStatus = keyof typeof OrderStatusEnum;
@Index('partner_id', ['partnerId', 'orderCode'], { unique: true })
@Index('order_code', ['orderCode'], {})
@Index('user_id', ['userId'], {})
@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string | null;

  @Column('bigint', {
    name: 'partner_id',
    nullable: true,
    comment: 'Mã đối tác được seller khởi tạo kết nối\nVD: FADO, GIAONHAN',
  })
  partnerId: string | null;

  @Column('bigint', {
    name: 'area_id',
    nullable: true,
    comment: 'Khu vực ',
    unsigned: true,
    default: () => "'0'",
  })
  areaId: string | null;

  @Column('varchar', {
    name: 'area_name',
    nullable: true,
    comment: 'Đối tác sẽ đẩy tên khu vực qua không thì null',
    length: 50,
  })
  areaName: string | null;

  @Column('varchar', {
    name: 'order_code',
    comment: 'Mã đơn sub gửi qua',
    length: 30,
  })
  orderCode: string;

  @Column('varchar', { name: 'list_country_code', nullable: true, length: 200 })
  listCountryCode: string | null;

  @Column('varchar', { name: 'buyer_fullname', length: 50 })
  buyerFullname: string;

  @Column('varchar', { name: 'buyer_phone', length: 30 })
  buyerPhone: string;

  @Column('varchar', { name: 'buyer_email', nullable: true, length: 50 })
  buyerEmail: string | null;

  @Column('bigint', { name: 'buyer_city_id', nullable: true })
  buyerCityId: string | null;

  @Column('bigint', { name: 'buyer_district_id', nullable: true })
  buyerDistrictId: string | null;

  @Column('bigint', { name: 'buyer_ward_id', nullable: true })
  buyerWardId: string | null;

  @Column('text', { name: 'buyer_address', nullable: true })
  buyerAddress: string | null;

  @Column('varchar', { name: 'receiver_fullname', length: 50 })
  receiverFullname: string;

  @Column('varchar', { name: 'receiver_phone', length: 30 })
  receiverPhone: string;

  @Column('varchar', { name: 'receiver_email', nullable: true, length: 50 })
  receiverEmail: string | null;

  @Column('bigint', { name: 'receiver_city_id', nullable: true })
  receiverCityId: string | null;

  @Column('bigint', { name: 'receiver_district_id', nullable: true })
  receiverDistrictId: string | null;

  @Column('bigint', { name: 'receiver_ward_id', nullable: true })
  receiverWardId: string | null;

  @Column('text', { name: 'receiver_address', nullable: true })
  receiverAddress: string | null;

  @Column('tinyint', {
    name: 'receiver_foreigner',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  receiverForeigner: number | null;

  @Column('text', {
    name: 'purchases_note',
    nullable: true,
    comment: 'Bộ phận mua hàng note mọi vấn đề trong đơn hàng',
  })
  purchasesNote: string | null;

  @Column('decimal', {
    name: 'total_price_after_tax',
    nullable: true,
    comment: 'Tổng giá trị trong đơn ',
    unsigned: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  totalPriceAfterTax: string | null;

  @Column('tinyint', {
    name: 'is_vat',
    nullable: true,
    comment: 'Đơn vat hay không',
    unsigned: true,
    default: () => "'0'",
  })
  isVat: number | null;

  @Column('decimal', {
    name: 'vat_fee',
    nullable: true,
    comment: 'Phí vat',
    unsigned: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  vatFee: string | null;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => "'0000-00-00 00:00:00'",
  })
  createdAt: Date | null;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
    default: () => "'0000-00-00 00:00:00'",
  })
  updatedAt: Date | null;

  @Column('timestamp', {
    name: 'payment_completed_at',
    nullable: true,
    default: () => "'0000-00-00 00:00:00'",
  })
  paymentCompletedAt: Date | null;

  @Column({ name: 'order_status', type: 'varchar', length: 50 })
  orderStatus: OrderStatus;

  @Column({ name: 'is_fast_shipping', type: 'tinyint', default: false })
  isFastShipping: boolean;
}
