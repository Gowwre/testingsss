import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderItemsStatusEnum {
  IN_TRANSACTION = 1,
  PARTIALLY_TRANSACTED = 2,
  AWAITING_CANCELLATION = 3,
  TRANSACTED = 4,
  INTERNATIONAL_TRACKING_AVAILABLE = 5,
  DELIVERED = 6,
  CANCELLED = 7,
}

@Index('partner_id', ['partnerId', 'orderItemCode'], { unique: true })
@Index('order_item_code', ['orderItemCode'], {})
@Index('order_id', ['orderId'], {})
@Index('status_id', ['statusId'], {})
@Entity('order_items')
export class OrderItemsEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('varchar', {
    name: 'order_item_code',
    nullable: true,
    comment: 'Mã item sub gửi qua',
    length: 30,
  })
  orderItemCode: string | null;

  @Column('bigint', {
    name: 'partner_id',
    nullable: true,
    comment: 'Mã đối tác được seller khởi tạo kết nối\nVD: FADO, GIAONHAN',
  })
  partnerId: number;

  @Column('bigint', { name: 'order_id', nullable: true })
  orderId: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 191 })
  name: string | null;

  @Column('text', {
    name: 'url',
    nullable: true,
    comment: 'Url sản phẩm đối tác đẩy qua. Url yêu cầu mua sản phẩm',
  })
  url: string | null;

  @Column('varchar', { name: 'image', nullable: true, length: 191 })
  image: string | null;

  @Column('decimal', {
    name: 'price_after_tax',
    nullable: true,
    comment: 'Giá sản phẩm sau thuế',
    unsigned: true,
    precision: 20,
    scale: 2,
    default: 0.0,
  })
  priceAfterTax: number;

  @Column('decimal', {
    name: 'import_fee',
    nullable: true,
    comment: 'Thông quan',
    unsigned: true,
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  importFee: number;

  @Column('decimal', {
    name: 'shipping_fee',
    nullable: true,
    comment: 'Thông quan',
    unsigned: true,
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  shippingFee: number;

  @Column('decimal', {
    name: 'discount_price',
    nullable: true,
    comment: 'Chiết khấu',
    unsigned: true,
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  discountPrice: number;

  @Column('decimal', {
    name: 'other_charge_fee',
    nullable: true,
    comment: 'Phụ phí',
    unsigned: true,
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  otherChargeFee: number | null;

  @Column('decimal', {
    name: 'fast_shipping_fee',
    nullable: true,
    comment: 'Phí ship nhanh',
    unsigned: true,
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  fastShipingFee: number | null;

  @Column('int', {
    name: 'quantity',
    nullable: true,
    comment: 'Số lượng item mua',
    unsigned: true,
  })
  quantity: number | null;

  @Column('decimal', {
    name: 'weight',
    nullable: true,
    comment: 'Trọng lượng đực tính bằng ký',
    unsigned: true,
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  weight: number | null;

  @Column('text', {
    name: 'attributes',
    nullable: true,
    comment: 'Thuộc tính của sản phẩm. Được lưu lại bằng cấu trúc json',
    default: () => "'[]'",
  })
  attributes: string | null;

  @Column('tinyint', {
    name: 'status_id',
    nullable: true,
    comment:
      '1: Mới\n2: Đang xử lý\n3: Đã xử lý\n4: Đã có tracking quốc tế\n5: Đã huỷ\n6: Đã giao hàng',
    unsigned: true,
    default: 1,
  })
  statusId: number | null;

  @Column('timestamp', {
    name: 'estimate_delivery',
    nullable: true,
    comment: 'Ngày dự kiến giao hàng',
    default: () => "'0000-00-00 00:00:00'",
  })
  estimateDelivery: Date | null;

  @Column('text', {
    name: 'purchases_note',
    nullable: true,
    comment: 'Ghi chú cho item',
    default: () => "'[]'",
  })
  purchasesNote: string | null;

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

  @Column({
    type: 'varchar',
    length: 50,
    name: 'store_product_code',
    nullable: true,
  })
  storeProductCode: string;

  @Column({
    name: 'country_code',
    type: 'varchar',
    length: 10,
  })
  countryCode: string;
}
