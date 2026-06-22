import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CheckoutLayout } from "../components/CheckoutLayout";
import { OrderSummary } from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import { useCheckout } from "../context/CheckoutContext";
import { saveOrder } from "../services/orderStorage";
import type { PaymentMethod } from "../types/checkout";
import { storeImages } from "../data/storeImages";
import { formatPrice } from "../utils/format";

const paymentOptions: { value: PaymentMethod; label: string; hint: string }[] =
  [
    {
      value: "credit",
      label: "Cartão de crédito",
      hint: "Parcelamento em até 3x sem juros",
    },
    { value: "pix", label: "Pix", hint: "Aprovação imediata" },
    { value: "boleto", label: "Boleto", hint: "Vencimento em 2 dias úteis" },
  ];

export function PaymentPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const {
    shipping,
    paymentMethod,
    setPaymentMethod,
    creditCard,
    setCreditCard,
    completeOrder,
  } = useCheckout();
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return <Navigate to="/carrinho" replace />;
  }

  if (!shipping) {
    return <Navigate to="/checkout" replace />;
  }

  const orderShipping = shipping;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (paymentMethod === "credit") {
      const { holderName, number, expiry, cvv } = creditCard;

      if (!holderName.trim() || !number.trim() || !expiry.trim() || !cvv.trim()) {
        setError("Preencha todos os dados do cartão.");
        return;
      }

      if (number.replace(/\s/g, "").length < 13) {
        setError("Número do cartão inválido.");
        return;
      }
    }

    setIsProcessing(true);

    window.setTimeout(() => {
      const orderNumber = completeOrder();
      saveOrder({
        orderNumber,
        items: [...items],
        total,
        shipping: orderShipping,
        paymentMethod,
      });
      clearCart();
      navigate("/pedido-confirmado");
    }, 900);
  }

  return (
    <CheckoutLayout title="Pagamento">
      <div className="checkout-grid">
        <form className="checkout-panel checkout-form" onSubmit={handleSubmit}>
          <fieldset className="payment-methods">
            <legend>Forma de pagamento</legend>
            <img
              src={storeImages.paymentMethods}
              alt="Bandeiras aceitas"
              className="payment-methods__brands"
            />
            {paymentOptions.map((option) => (
              <label
                key={option.value}
                className={`payment-method${paymentMethod === option.value ? " is-active" : ""}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.value}
                  checked={paymentMethod === option.value}
                  onChange={() => setPaymentMethod(option.value)}
                />
                <span className="payment-method__content">
                  <strong>{option.label}</strong>
                  <small>{option.hint}</small>
                </span>
              </label>
            ))}
          </fieldset>

          {paymentMethod === "credit" && (
            <div className="checkout-form__grid">
              <label className="checkout-field checkout-field--full">
                Nome no cartão
                <input
                  value={creditCard.holderName}
                  onChange={(event) =>
                    setCreditCard({
                      ...creditCard,
                      holderName: event.target.value,
                    })
                  }
                />
              </label>

              <label className="checkout-field checkout-field--full">
                Número do cartão
                <input
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  value={creditCard.number}
                  onChange={(event) =>
                    setCreditCard({ ...creditCard, number: event.target.value })
                  }
                />
              </label>

              <label className="checkout-field">
                Validade
                <input
                  placeholder="MM/AA"
                  value={creditCard.expiry}
                  onChange={(event) =>
                    setCreditCard({ ...creditCard, expiry: event.target.value })
                  }
                />
              </label>

              <label className="checkout-field">
                CVV
                <input
                  inputMode="numeric"
                  maxLength={4}
                  value={creditCard.cvv}
                  onChange={(event) =>
                    setCreditCard({ ...creditCard, cvv: event.target.value })
                  }
                />
              </label>
            </div>
          )}

          {paymentMethod === "pix" && (
            <div className="payment-info">
              <p>
                Ao confirmar, você receberá um QR Code Pix no valor de{" "}
                <strong>{formatPrice(total)}</strong>.
              </p>
            </div>
          )}

          {paymentMethod === "boleto" && (
            <div className="payment-info">
              <p>
                O boleto será gerado após a confirmação no valor de{" "}
                <strong>{formatPrice(total)}</strong>.
              </p>
            </div>
          )}

          {error && <p className="checkout-form__error">{error}</p>}

          <button
            type="submit"
            className="checkout-action"
            disabled={isProcessing}
          >
            {isProcessing ? "Processando..." : "Finalizar pedido"}
          </button>
        </form>

        <OrderSummary />
      </div>
    </CheckoutLayout>
  );
}
