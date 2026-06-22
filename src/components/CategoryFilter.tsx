import { formatCategoryLabel } from "../utils/format";

const ALL_CATEGORY = "all";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const options = [
    { value: ALL_CATEGORY, label: "Todos" },
    ...categories.map((category) => ({
      value: category,
      label: formatCategoryLabel(category),
    })),
  ];

  return (
    <nav className="category-chips" aria-label="Categorias">
      <ul className="category-chips__list" role="list">
        {options.map(({ value, label }) => {
          const isActive = selectedCategory === value;

          return (
            <li key={value}>
              <button
                type="button"
                aria-pressed={isActive}
                className={`category-chips__btn${isActive ? " is-active" : ""}`}
                onClick={() => onSelectCategory(value)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
