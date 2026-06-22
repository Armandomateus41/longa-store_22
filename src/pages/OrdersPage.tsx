import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { InfoPageLayout } from "../components/info/InfoPageLayout";
import { getOrders, orderStatusLabels } from "../services/orderStorage";
import { formatPrice } from "../utils/format";

export function OrdersPage() {
  const orders = getOrders();

  return (
    <InfoPageLayout title="Meus pedidos">
      <p className="info-content__intro">
        Histórico de pedidos realizados neste navegador. Para acompanhar a
        entrega, use o rastreamento com o número do pedido.
      </p>

      {orders.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon" aria-hidden="true">
            <FiPackage />
          </span>
          <h2>Nenhum pedido ainda</h2>
          <p>Finalize uma compra para ver seus pedidos aqui.</p>
          <Link to="/#catalog" className="checkout-action">
            Ver catálogo
          </Link>
        </div>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.orderNumber} className="orders-list__item">
              <div className="orders-list__head">
                <div>
                  <strong>{order.orderNumber}</strong>
                  <p className="orders-list__date">
                    {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <span className="orders-list__status">
                  {orderStatusLabels[order.status]}
                </span>
              </div>

              <p className="orders-list__items">
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "itens"} —{" "}
                {formatPrice(order.total)}
              </p>

              <Link
                to={`/rastrear-pedido?pedido=${encodeURIComponent(order.orderNumber)}`}
                className="orders-list__link"
              >
                Rastrear entrega
              </Link>
            </li>
          ))}
        </ul>
      )}
    </InfoPageLayout>
  );
}
