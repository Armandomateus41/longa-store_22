import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { InfoPageLayout } from "../components/info/InfoPageLayout";
import { getOrderByNumber } from "../services/orderStorage";
import type { StoredOrder } from "../types/order";
import { formatPrice } from "../utils/format";
import { getOrderTimeline } from "../utils/orderStatusSteps";

function OrderTrackingResult({ order }: { order: StoredOrder }) {
  const timeline = getOrderTimeline(order.status);

  return (
    <div className="order-tracking">
      <div className="order-tracking__header">
        <p>
          Pedido <strong>{order.orderNumber}</strong>
        </p>
        <p className="order-tracking__meta">
          Código de rastreio: <strong>{order.trackingCode}</strong>
        </p>
      </div>

      <ol className="order-tracking__timeline">
        {timeline.map((step) => (
          <li
            key={step.status}
            className={`order-tracking__step${step.isComplete ? " is-complete" : ""}${step.isCurrent ? " is-current" : ""}`}
          >
            <span className="order-tracking__dot" aria-hidden="true" />
            <span>{step.label}</span>
          </li>
        ))}
      </ol>

      <div className="order-tracking__summary">
        <p>
          Entrega para {order.shipping.fullName} — {order.shipping.city}/
          {order.shipping.state}
        </p>
        <p>Total: {formatPrice(order.total)}</p>
      </div>

      <Link to="/pedidos" className="checkout-action checkout-action--secondary">
        Ver todos os pedidos
      </Link>
    </div>
  );
}

export function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const prefilled = searchParams.get("pedido") ?? "";
  const [orderNumber, setOrderNumber] = useState(prefilled);
  const [searchedNumber, setSearchedNumber] = useState(prefilled.trim());
  const result = searchedNumber ? getOrderByNumber(searchedNumber) : null;
  const error =
    searchedNumber && !result
      ? "Nenhum pedido encontrado com esse número."
      : "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchedNumber(orderNumber.trim());
  }

  return (
    <InfoPageLayout title="Rastrear pedido">
      <p className="info-content__intro">
        Informe o número do pedido recebido por e-mail após a confirmação da
        compra. Pedidos feitos neste navegador ficam salvos localmente.
      </p>

      <form className="track-order-form" onSubmit={handleSubmit}>
        <label className="checkout-field checkout-field--full">
          Número do pedido
          <input
            value={orderNumber}
            onChange={(event) => setOrderNumber(event.target.value)}
            placeholder="Ex.: LS-12345678"
            required
          />
        </label>

        {error && <p className="checkout-form__error">{error}</p>}

        <button type="submit" className="checkout-action">
          <FiSearch aria-hidden="true" />
          Consultar pedido
        </button>
      </form>

      {result && <OrderTrackingResult order={result} />}
    </InfoPageLayout>
  );
}
