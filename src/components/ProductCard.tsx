import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";
import { formatCategoryLabel, formatPrice } from "../utils/format";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="product-card">
      <Link to={`/produto/${product.id}`} className="product-card__link">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={`${product.title} — ${formatCategoryLabel(product.category)}`}
            className="product-image"
            loading="lazy"
          />
        </div>

        <div className="product-info">
          <span className="product-category">
            {formatCategoryLabel(product.category)}
          </span>
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
      </Link>

      <div className="product-card__actions">
        <button
          className={`add-button${added ? " is-added" : ""}`}
          type="button"
          onClick={handleAdd}
          disabled={added}
        >
          {added ? (
            <>
              <FaCheck aria-hidden="true" />
              Adicionado
            </>
          ) : (
            <>
              <FaShoppingCart aria-hidden="true" />
              Adicionar
            </>
          )}
        </button>
      </div>
    </article>
  );
}
