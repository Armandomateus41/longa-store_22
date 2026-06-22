import { useCallback, useEffect, useMemo, useState } from "react";
import { CatalogStatus } from "../components/CatalogStatus";
import { CategoryShowcase } from "../components/CategoryShowcase";
import { HeroSlider } from "../components/HeroSlider";
import { ProductGrid } from "../components/ProductGrid";
import { ProductGridSkeleton } from "../components/ProductGridSkeleton";
import { PromoBanners } from "../components/PromoBanners";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/StoreShell";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from "../services/productService";
import type { Product } from "../types/product";

const ALL_CATEGORY = "all";

export function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadProducts = useCallback(async (category = ALL_CATEGORY) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data =
        category === ALL_CATEGORY
          ? await getProducts()
          : await getProductsByCategory(category);

      setProducts(data);
    } catch {
      setErrorMessage("Não foi possível carregar os produtos.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        if (cancelled) return;

        setProducts(productsData);
        setCategories(categoriesData);
        setErrorMessage("");
      } catch {
        if (cancelled) return;

        setErrorMessage("Não foi possível carregar o catálogo.");
        setProducts([]);
        setCategories([]);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialData();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleSelectCategory(category: string) {
    setSelectedCategory(category);
    setSearch("");
    void loadProducts(category);
  }

  async function reloadCatalog() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
    } catch {
      setErrorMessage("Não foi possível carregar o catálogo.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleRetry() {
    if (selectedCategory === ALL_CATEGORY) {
      void reloadCatalog();
      return;
    }

    void loadProducts(selectedCategory);
  }

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) =>
      product.title.toLowerCase().includes(normalizedSearch)
    );
  }, [products, search]);

  const showCatalog = !isLoading && !errorMessage;

  return (
    <div className="page">
      <SiteHeader
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <HeroSlider />
      <PromoBanners />
      <CategoryShowcase
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <main className="app" id="catalog">
        <div className="catalog-section__head">
          <h2>Catálogo</h2>
          {showCatalog && (
            <span className="catalog-section__count">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "produto" : "produtos"}
            </span>
          )}
        </div>

        {isLoading && <ProductGridSkeleton />}

        {errorMessage && !isLoading && (
          <CatalogStatus message={errorMessage} onRetry={handleRetry} />
        )}

        {showCatalog && (
          <ProductGrid products={filteredProducts} searchTerm={search} />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
