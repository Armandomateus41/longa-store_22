import { FiPackage } from "react-icons/fi";
import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  searchTerm: string;
};

export function ProductGrid({ products, searchTerm }: ProductGridProps) {
  if (products.length === 0) {
    const trimmedSearch = searchTerm.trim();
    const title = trimmedSearch ? "Nenhum resultado" : "Catálogo vazio";
    const message = trimmedSearch
      ? `Não encontramos produtos para "${trimmedSearch}". Tente outro termo ou mude a categoria.`
      : "Não há produtos nesta categoria no momento. Selecione outra opção acima.";

    return (
      <div className="empty-state">
        <span className="empty-state__icon" aria-hidden="true">
          <FiPackage />
        </span>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <section className="product-grid" aria-label="Lista de produtos">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
