import type { OrderStatus } from "../types/order";
import { orderStatusLabels } from "../services/orderStorage";

const statusOrder: OrderStatus[] = [
  "confirmed",
  "preparing",
  "shipped",
  "delivered",
];

export function getOrderTimeline(currentStatus: OrderStatus) {
  const currentIndex = statusOrder.indexOf(currentStatus);

  return statusOrder.map((status, index) => ({
    status,
    label: orderStatusLabels[status],
    isComplete: index <= currentIndex,
    isCurrent: index === currentIndex,
  }));
}
