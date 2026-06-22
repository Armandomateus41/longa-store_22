import { Link, useLocation } from "react-router-dom";
import { formatCategoryLabel } from "../utils/format";

const ALL_CATEGORY = "all";

const INFO_PATHS = ["/contato", "/sobre", "/entregas", "/faq"];

type StoreNavMenuProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export function StoreNavMenu({
  categories,
  selectedCategory,
  onSelectCategory,
}: StoreNavMenuProps) {
  const location = useLocation();
  const isContactActive = INFO_PATHS.includes(location.pathname);
  return (
    <nav className="store-menu" aria-label="Menu principal">
      <ul className="store-menu__list">
        <li>
          <Link
            to="/"
            className={`store-menu__link${selectedCategory === ALL_CATEGORY && !isContactActive ? " is-active" : ""}`}
          >
            Início
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="store-menu__link"
            onClick={() => onSelectCategory(ALL_CATEGORY)}
          >
            Todos os Produtos
          </button>
        </li>
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <li key={category}>
              <button
                type="button"
                className={`store-menu__link${isActive ? " is-active" : ""}`}
                onClick={() => onSelectCategory(category)}
              >
                {formatCategoryLabel(category)}
              </button>
            </li>
          );
        })}
        <li>
          <Link
            to="/contato"
            className={`store-menu__link${isContactActive ? " is-active" : ""}`}
          >
            Contato
          </Link>
        </li>
      </ul>
    </nav>
  );
}
