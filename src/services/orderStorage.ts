import type { CartItem } from "../types/cart";
import type { PaymentMethod, ShippingData } from "../types/checkout";
import type { OrderStatus, StoredOrder } from "../types/order";

const ORDERS_KEY = "longa-store:orders";

function readOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as StoredOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeOrders(orders: StoredOrder[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function createTrackingCode(orderNumber: string) {
  return `BR${orderNumber.replace(/\D/g, "").slice(-10)}LS`;
}

export function resolveOrderStatus(createdAt: string): OrderStatus {
  const ageMs = Date.now() - new Date(createdAt).getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);

  if (ageDays >= 7) return "delivered";
  if (ageDays >= 3) return "shipped";
  if (ageDays >= 1) return "preparing";
  return "confirmed";
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  confirmed: "Pedido confirmado",
  preparing: "Em separação",
  shipped: "Enviado",
  delivered: "Entregue",
};

export function saveOrder(input: {
  orderNumber: string;
  items: CartItem[];
  total: number;
  shipping: ShippingData;
  paymentMethod: PaymentMethod;
}): StoredOrder {
  const createdAt = new Date().toISOString();
  const order: StoredOrder = {
    orderNumber: input.orderNumber,
    createdAt,
    status: "confirmed",
    trackingCode: createTrackingCode(input.orderNumber),
    items: input.items,
    total: input.total,
    shipping: input.shipping,
    paymentMethod: input.paymentMethod,
  };

  const orders = readOrders().filter(
    (item) => item.orderNumber !== order.orderNumber
  );
  writeOrders([order, ...orders]);

  return order;
}

export function getOrders(): StoredOrder[] {
  return readOrders()
    .map((order) => ({
      ...order,
      status: resolveOrderStatus(order.createdAt),
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function getOrderByNumber(orderNumber: string): StoredOrder | null {
  const normalized = orderNumber.trim().toUpperCase();
  const order = readOrders().find(
    (item) => item.orderNumber.toUpperCase() === normalized
  );

  if (!order) {
    return null;
  }

  return {
    ...order,
    status: resolveOrderStatus(order.createdAt),
  };
}
