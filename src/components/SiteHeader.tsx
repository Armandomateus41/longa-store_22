import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { useAuthDisplayName } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { SearchInput } from "./SearchInput";
import { StoreLogo } from "./StoreLogo";
import { StoreNavMenu } from "./StoreNavMenu";

type SiteHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export function SiteHeader({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onSelectCategory,
}: SiteHeaderProps) {
  const { totalItems } = useCart();
  const displayName = useAuthDisplayName();

  return (
    <header className="store-header">
      <div className="store-topbar">
        <div className="store-topbar__inner">
          <p>Frete grátis em compras selecionadas</p>
        </div>
      </div>

      <div className="store-mainbar">
        <div className="store-mainbar__inner">
          <Link to="/" className="store-logo">
            <StoreLogo />
          </Link>

          <div className="store-mainbar__search">
            <SearchInput value={search} onChange={onSearchChange} />
          </div>

          <div className="store-utilities">
            <div className="store-utility">
              <span className="store-utility__label">
                {displayName ? "Logado como" : "Entrar / Cadastrar"}
              </span>
              <Link to="/conta" className="store-utility__action">
                {displayName ?? "Minha Conta"}
              </Link>
            </div>

            <div className="store-utility store-utility--track">
              <FiMapPin className="store-utility__icon" aria-hidden="true" />
              <div className="store-utility__copy">
                <span className="store-utility__label">
                  Onde está meu produto?
                </span>
                <Link to="/rastrear-pedido" className="store-utility__action">
                  Rastrear pedido
                </Link>
              </div>
            </div>

            <Link to="/carrinho" className="store-cart-icon" aria-label="Carrinho">
              <FaShoppingBasket aria-hidden="true" />
              <span className="store-cart-icon__count">{totalItems}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="store-menu-bar">
        <div className="store-menu-bar__inner">
          <StoreNavMenu
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>
      </div>
    </header>
  );
}
