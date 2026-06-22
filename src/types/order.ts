import type { CartItem } from "./cart";
import type { PaymentMethod, ShippingData } from "./checkout";

export type OrderStatus =
  | "confirmed"
  | "preparing"
  | "shipped"
  | "delivered";

export type StoredOrder = {
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  trackingCode: string;
  items: CartItem[];
  total: number;
  shipping: ShippingData;
  paymentMethod: PaymentMethod;
};
