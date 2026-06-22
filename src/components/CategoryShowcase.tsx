import { storeImages } from "../data/storeImages";

type CategoryShowcaseProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export function CategoryShowcase({
  selectedCategory,
  onSelectCategory,
}: CategoryShowcaseProps) {
  return (
    <section className="category-showcase" aria-label="Compre por categoria">
      <div className="category-showcase__inner">
        <h2 className="category-showcase__title">Compre por categoria</h2>

        <ul className="category-showcase__grid">
          {storeImages.categories.map((item) => {
            const isActive = selectedCategory === item.category;

            return (
              <li key={item.image}>
                <button
                  type="button"
                  className={`category-showcase__card${isActive ? " is-active" : ""}`}
                  onClick={() => onSelectCategory(item.category)}
                  aria-pressed={isActive}
                >
                  <img src={item.image} alt={item.label} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
