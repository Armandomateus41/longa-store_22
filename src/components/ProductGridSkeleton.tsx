import { ProductSkeleton } from "./ProductSkeleton";

const SKELETON_COUNT = 8;

export function ProductGridSkeleton() {
  return (
    <section
      className="product-grid"
      aria-label="Carregando produtos"
      aria-busy="true"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </section>
  );
}
