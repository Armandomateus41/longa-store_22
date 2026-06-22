import type { UserProfile } from "../types/user";
import type { ShippingData } from "../types/checkout";

export function userToShippingData(user: UserProfile): ShippingData {
  return {
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    zipCode: user.zipCode,
    street: user.street,
    number: user.number,
    complement: user.complement,
    neighborhood: user.neighborhood,
    city: user.city,
    state: user.state,
  };
}

export function shippingToProfileUpdate(
  shipping: ShippingData
): Pick<
  UserProfile,
  | "fullName"
  | "phone"
  | "zipCode"
  | "street"
  | "number"
  | "complement"
  | "neighborhood"
  | "city"
  | "state"
> {
  return {
    fullName: shipping.fullName,
    phone: shipping.phone,
    zipCode: shipping.zipCode,
    street: shipping.street,
    number: shipping.number,
    complement: shipping.complement,
    neighborhood: shipping.neighborhood,
    city: shipping.city,
    state: shipping.state,
  };
}
