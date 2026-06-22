export function ProductSkeleton() {
  return (
    <div className="product-card product-card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--image" />
      <div className="product-info">
        <div className="skeleton skeleton--badge" />
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--title skeleton--title-short" />
        <div className="skeleton skeleton--price" />
        <div className="skeleton skeleton--button" />
      </div>
    </div>
  );
}
