import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { CheckoutLayout } from "../components/CheckoutLayout";
import { OrderSummary } from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

export function CartPage() {
  const { items, totalItems, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <CheckoutLayout title="Carrinho">
        <div className="empty-state">
          <span className="empty-state__icon" aria-hidden="true">
            <FaShoppingBasket />
          </span>
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos do catálogo para continuar a compra.</p>
          <Link to="/" className="checkout-action">
            Voltar ao catálogo
          </Link>
        </div>
      </CheckoutLayout>
    );
  }

  const itemLabel = totalItems === 1 ? "1 item" : `${totalItems} itens`;

  return (
    <CheckoutLayout title="Carrinho" subtitle={itemLabel}>
      <div className="checkout-grid checkout-grid--cart">
        <section className="checkout-panel cart-panel">
          <header className="cart-panel__header">
            <h2 className="cart-panel__title">Produtos</h2>
            <span className="cart-panel__count">{itemLabel}</span>
          </header>

          <ul className="cart-list">
            {items.map((item) => {
              const lineTotal = item.product.price * item.quantity;

              return (
                <li key={item.product.id} className="cart-item">
                  <div className="cart-item__media">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="cart-item__image"
                    />
                  </div>

                  <div className="cart-item__body">
                    <h3 className="cart-item__title">{item.product.title}</h3>

                    {item.quantity > 1 && (
                      <p className="cart-item__unit">
                        {formatPrice(item.product.price)} cada
                      </p>
                    )}

                    <div className="cart-item__controls">
                      <div className="qty-control">
                        <button
                          type="button"
                          className="qty-control__btn"
                          aria-label="Diminuir quantidade"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <FiMinus aria-hidden="true" />
                        </button>
                        <span className="qty-control__value">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="qty-control__btn"
                          aria-label="Aumentar quantidade"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <FiPlus aria-hidden="true" />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <FiTrash2 aria-hidden="true" />
                        Remover
                      </button>
                    </div>
                  </div>

                  <div className="cart-item__aside">
                    <p className="cart-item__line-total">
                      {formatPrice(lineTotal)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <footer className="cart-panel__footer">
            <Link to="/" className="cart-panel__continue">
              Continuar comprando
            </Link>
          </footer>
        </section>

        <OrderSummary
          showItems={false}
          actionLabel="Continuar para entrega"
          actionTo="/checkout"
        />
      </div>
    </CheckoutLayout>
  );
}
