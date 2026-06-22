import { Link, useLocation } from "react-router-dom";

const steps = [
  { label: "Carrinho", path: "/carrinho" },
  { label: "Entrega", path: "/checkout" },
  { label: "Pagamento", path: "/pagamento" },
];

export function CheckoutSteps() {
  const location = useLocation();
  const currentIndex = steps.findIndex((step) =>
    location.pathname.startsWith(step.path)
  );

  return (
    <nav className="checkout-steps" aria-label="Etapas do pedido">
      <ol className="checkout-steps__list">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isDone = index < currentIndex;

          return (
            <li
              key={step.path}
              className={`checkout-steps__item${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}`}
            >
              <Link to={step.path} className="checkout-steps__link">
                <span className="checkout-steps__number">{index + 1}</span>
                <span className="checkout-steps__label">{step.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
