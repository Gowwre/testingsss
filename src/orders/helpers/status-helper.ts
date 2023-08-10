import {
  OrderItemsEntity,
  OrderItemsStatusEnum,
} from '../../order-item/entities/order-items.entity';
import { OrderStatus } from '../entities/orders.entity';

function getValidItems(items: OrderItemsEntity[]) {
  return items.filter((item) => !item.storeProductCode);
}

function hasStatus(items: OrderItemsEntity[], status: OrderItemsStatusEnum) {

  return getValidItems(items).some((item) => item.statusId === status);
}

function allHaveStatus(
  items: OrderItemsEntity[],
  status: OrderItemsStatusEnum,
) {
  return getValidItems(items).every((item) => item.statusId === status);
}

function hasOnlyStatuses(
  items: OrderItemsEntity[],
  statuses: OrderItemsStatusEnum[],
) {
  return getValidItems(items).every((item) => statuses.includes(item.statusId));
}

//TODO: Look at this later when feedback is available
function isNew(items: OrderItemsEntity[]) {
  return items.every((item) => !item.purchasesNote);
}

export function isProcessing(items: OrderItemsEntity[]) {
  return (
    !isNew(items) &&
    (hasStatus(items, OrderItemsStatusEnum.IN_TRANSACTION) ||
      hasStatus(items, OrderItemsStatusEnum.PARTIALLY_TRANSACTED) ||
      hasStatus(items, OrderItemsStatusEnum.AWAITING_CANCELLATION))
  );
}

export function isProcessed(items: OrderItemsEntity[]) {
  return (
    allHaveStatus(items, OrderItemsStatusEnum.TRANSACTED) ||
    (hasStatus(items, OrderItemsStatusEnum.TRANSACTED) &&
      hasOnlyStatuses(items, [
        OrderItemsStatusEnum.INTERNATIONAL_TRACKING_AVAILABLE,
        OrderItemsStatusEnum.CANCELLED,
        OrderItemsStatusEnum.DELIVERED,
      ]))
  );
}

export function isInternationalTrackingAvailable(items: OrderItemsEntity[]) {
  return (
    allHaveStatus(
      items,
      OrderItemsStatusEnum.INTERNATIONAL_TRACKING_AVAILABLE,
    ) ||
    (hasStatus(items, OrderItemsStatusEnum.INTERNATIONAL_TRACKING_AVAILABLE) &&
      hasOnlyStatuses(items, [
        OrderItemsStatusEnum.CANCELLED,
        OrderItemsStatusEnum.DELIVERED,
      ]))
  );
}

export function isDelivered(items: OrderItemsEntity[]) {
  return (
    hasStatus(items, OrderItemsStatusEnum.DELIVERED) &&
    hasOnlyStatuses(items, [
      OrderItemsStatusEnum.DELIVERED,
      OrderItemsStatusEnum.CANCELLED,
    ])
  );
}

export function isCancelled(items: OrderItemsEntity[]) {
  return allHaveStatus(items, OrderItemsStatusEnum.CANCELLED);
}

export function determineOrderStatus(items: OrderItemsEntity[]): OrderStatus {
  if (isProcessing(items)) {
    return 'PROCESSING';
  } else if (isProcessed(items)) {
    return 'PROCESSED';
  } else if (isInternationalTrackingAvailable(items)) {
    return 'INTERNATIONAL_TRACKING_AVAILABLE';
  } else if (isDelivered(items)) {
    return 'DELIVERED';
  } else if (isCancelled(items)) {
    return 'CANCELLED';
  } else {
    return 'NEW';
  }
}
