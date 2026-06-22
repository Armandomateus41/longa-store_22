import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { SitePreFooter } from "./SitePreFooter";
import { SiteTrustBar } from "./SiteTrustBar";
import { StoreLogo } from "./StoreLogo";

export function StoreMainBar() {
  const { totalItems } = useCart();

  return (
      <div className="store-mainbar">
        <div className="store-mainbar__inner store-mainbar__inner--compact">
          <Link to="/" className="store-logo">
            <StoreLogo />
          </Link>

          <div className="store-mainbar__slot" />

          <Link to="/carrinho" className="store-cart-icon" aria-label="Carrinho">
            <FaShoppingBasket aria-hidden="true" />
            <span className="store-cart-icon__count">{totalItems}</span>
          </Link>
        </div>
      </div>
  );
}

export function StoreTopBar() {
  return (
    <div className="store-topbar">
      <div className="store-topbar__inner">
        <p>Frete grátis em compras selecionadas</p>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <SiteTrustBar />
      <SitePreFooter />

      <div className="site-footer__bottom">
        <p className="site-footer__copyright">
          © 2026 Todos os direitos reservados. Feito por Armando Capita
        </p>
      </div>
    </footer>
  );
}
