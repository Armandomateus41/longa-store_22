import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type {
  CreditCardData,
  PaymentMethod,
  ShippingData,
} from "../types/checkout";

type CheckoutContextValue = {
  shipping: ShippingData | null;
  setShipping: (data: ShippingData) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  creditCard: CreditCardData;
  setCreditCard: (data: CreditCardData) => void;
  orderNumber: string | null;
  completeOrder: () => string;
  resetCheckout: () => void;
};

const emptyCreditCard: CreditCardData = {
  holderName: "",
  number: "",
  expiry: "",
  cvv: "",
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

function createOrderNumber() {
  return `LS-${Date.now().toString().slice(-8)}`;
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [shipping, setShipping] = useState<ShippingData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  const [creditCard, setCreditCard] = useState<CreditCardData>(emptyCreditCard);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  function completeOrder() {
    const number = createOrderNumber();
    setOrderNumber(number);
    return number;
  }

  function resetCheckout() {
    setShipping(null);
    setPaymentMethod("credit");
    setCreditCard(emptyCreditCard);
    setOrderNumber(null);
  }

  return (
    <CheckoutContext.Provider
      value={{
        shipping,
        setShipping,
        paymentMethod,
        setPaymentMethod,
        creditCard,
        setCreditCard,
        orderNumber,
        completeOrder,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout deve ser usado dentro de CheckoutProvider");
  }

  return context;
}
