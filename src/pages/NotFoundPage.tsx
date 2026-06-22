import { Link } from "react-router-dom";
import { FiHome, FiSearch } from "react-icons/fi";
import { SiteFooter, StoreMainBar, StoreTopBar } from "../components/StoreShell";

export function NotFoundPage() {
  return (
    <div className="page">
      <header className="store-header">
        <StoreTopBar />
        <StoreMainBar />
      </header>

      <main className="not-found-page">
        <div className="not-found-page__content empty-state">
          <p className="not-found-page__code">404</p>
          <h1>Página não encontrada</h1>
          <p>
            O endereço que você acessou não existe ou foi movido. Volte ao
            catálogo ou use o menu para continuar navegando.
          </p>
          <div className="not-found-page__actions">
            <Link to="/" className="checkout-action">
              <FiHome aria-hidden="true" />
              Ir para o início
            </Link>
            <Link to="/#catalog" className="checkout-action checkout-action--secondary">
              <FiSearch aria-hidden="true" />
              Ver catálogo
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
