export type ShippingData = {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export type PaymentMethod = "credit" | "pix" | "boleto";

export type CreditCardData = {
  holderName: string;
  number: string;
  expiry: string;
  cvv: string;
};
