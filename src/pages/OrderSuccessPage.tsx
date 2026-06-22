import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { SiteFooter, StoreMainBar, StoreTopBar } from "../components/StoreShell";
import { useCheckout } from "../context/CheckoutContext";

export function OrderSuccessPage() {
  const { orderNumber, shipping, resetCheckout } = useCheckout();

  if (!orderNumber) {
    return (
      <div className="page">
        <header className="store-header">
          <StoreTopBar />
          <StoreMainBar />
        </header>
        <main className="checkout-page">
          <div className="empty-state">
            <h2>Nenhum pedido encontrado</h2>
            <p>Volte ao catálogo para iniciar uma nova compra.</p>
            <Link to="/" className="checkout-action">
              Ir para o catálogo
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page">
      <header className="store-header">
        <StoreTopBar />
        <StoreMainBar />
      </header>

      <main className="checkout-page">
        <div className="order-success">
          <FaCheckCircle className="order-success__icon" aria-hidden="true" />
          <h1>Pedido confirmado</h1>
          <p className="order-success__number">
            Número do pedido: <strong>{orderNumber}</strong>
          </p>
          {shipping && (
            <p className="order-success__message">
              Enviamos a confirmação para <strong>{shipping.email}</strong>.
              A entrega será feita em {shipping.street}, {shipping.number} —{" "}
              {shipping.city}/{shipping.state}.
            </p>
          )}
          <p className="order-success__note">
            Este é um fluxo demonstrativo. Nenhuma cobrança real foi realizada.
          </p>
          <Link
            to="/"
            className="checkout-action"
            onClick={() => resetCheckout()}
          >
            Voltar ao catálogo
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
