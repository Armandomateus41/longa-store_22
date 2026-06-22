import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

const FREE_SHIPPING_MIN = 200;

type OrderSummaryProps = {
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
  disabled?: boolean;
  showItems?: boolean;
};

export function OrderSummary({
  actionLabel,
  actionTo,
  onAction,
  disabled = false,
  showItems = true,
}: OrderSummaryProps) {
  const { items, subtotal, shippingFee, total } = useCart();
  const amountToFreeShipping = FREE_SHIPPING_MIN - subtotal;

  return (
    <aside className="order-summary order-summary--sticky">
      <h2 className="order-summary__title">Resumo do pedido</h2>

      {showItems && (
        <ul className="order-summary__items">
          {items.map((item) => (
            <li key={item.product.id} className="order-summary__item">
              <img
                src={item.product.image}
                alt=""
                className="order-summary__thumb"
              />
              <div className="order-summary__item-info">
                <span className="order-summary__item-name">
                  {item.product.title}
                </span>
                <span className="order-summary__item-qty">
                  Qtd: {item.quantity}
                </span>
              </div>
              <span className="order-summary__item-price">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {subtotal > 0 && amountToFreeShipping > 0 && (
        <p className="order-summary__hint">
          Faltam {formatPrice(amountToFreeShipping)} para frete grátis
        </p>
      )}

      {subtotal >= FREE_SHIPPING_MIN && subtotal > 0 && (
        <p className="order-summary__hint order-summary__hint--success">
          Você ganhou frete grátis neste pedido
        </p>
      )}

      <dl className="order-summary__totals">
        <div className="order-summary__row">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="order-summary__row">
          <dt>Frete</dt>
          <dd>{shippingFee === 0 ? "Grátis" : formatPrice(shippingFee)}</dd>
        </div>
        <div className="order-summary__row order-summary__row--total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      {actionLabel &&
        (actionTo ? (
          <Link
            to={actionTo}
            className={`order-summary__action${disabled ? " is-disabled" : ""}`}
            aria-disabled={disabled}
            onClick={(event) => disabled && event.preventDefault()}
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            type="button"
            className="order-summary__action"
            onClick={onAction}
            disabled={disabled}
          >
            {actionLabel}
          </button>
        ))}
    </aside>
  );
}
