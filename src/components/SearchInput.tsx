import { FiSearch, FiX } from "react-icons/fi";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="search-field">
      <label className="search-field__label" htmlFor="product-search">
        Buscar por produto
      </label>
      <div className="search-field__control">
        <FiSearch className="search-field__icon" aria-hidden="true" />
        <input
          id="product-search"
          type="search"
          value={value}
          placeholder="Pesquisar produtos..."
          onChange={(event) => onChange(event.target.value)}
          className="search-field__input"
        />
        {value && (
          <button
            type="button"
            className="search-field__clear"
            onClick={() => onChange("")}
            aria-label="Limpar busca"
          >
            <FiX aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
