import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCheck, FaShoppingCart, FaStar } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { CatalogStatus } from "../components/CatalogStatus";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/StoreShell";
import { useCart } from "../context/CartContext";
import { getCategories, getProductById } from "../services/productService";
import type { Product } from "../types/product";
import { applyPageSeo } from "../utils/pageSeo";
import { resolveSiteUrl } from "../data/seo";
import { formatCategoryLabel, formatPrice } from "../utils/format";

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);
  const isInvalidId = !Number.isFinite(productId) || productId <= 0;
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (isInvalidId) {
      return;
    }

    let cancelled = false;

    /* eslint-disable react-hooks/set-state-in-effect -- reset de loading ao trocar produto */
    setIsLoading(true);
    setErrorMessage("");
    /* eslint-enable react-hooks/set-state-in-effect */

    Promise.all([getProductById(productId), getCategories()])
      .then(([productData, categoriesData]) => {
        if (cancelled) return;
        setProduct(productData);
        setCategories(categoriesData);
      })
      .catch(() => {
        if (cancelled) return;
        setProduct(null);
        setErrorMessage("Produto não encontrado.");
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isInvalidId, productId]);

  useEffect(() => {
    if (!product) {
      return;
    }

    const siteUrl = resolveSiteUrl();
    const path = `/produto/${product.id}`;
    const description =
      product.description.slice(0, 155) ||
      `${product.title} — ${formatCategoryLabel(product.category)} na Longa Store.`;

    applyPageSeo({
      title: product.title,
      description,
      path,
      ogType: "website",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: `${siteUrl}${product.image}`,
        sku: String(product.id),
        brand: {
          "@type": "Brand",
          name: "Longa Store",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "BRL",
          price: product.price,
          availability: "https://schema.org/InStock",
          url: `${siteUrl}${path}`,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating.rate,
          reviewCount: product.rating.count,
        },
      },
    });
  }, [product]);

  function handleAdd() {
    if (!product) return;

    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="page">
      <SiteHeader
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory="all"
        onSelectCategory={() => navigate("/")}
      />

      <main className="product-page">
        <Link to="/#catalog" className="product-page__back">
          <FiArrowLeft aria-hidden="true" />
          Voltar ao catálogo
        </Link>

        {isInvalidId && (
          <CatalogStatus
            message="Produto inválido."
            onRetry={() => navigate("/")}
          />
        )}

        {isLoading && !isInvalidId && (
          <div className="product-page__loading" aria-live="polite">
            Carregando produto...
          </div>
        )}

        {errorMessage && !isLoading && !isInvalidId && (
          <CatalogStatus
            message={errorMessage}
            onRetry={() => window.location.reload()}
          />
        )}

        {product && !isLoading && (
          <article className="product-detail">
            <div className="product-detail__media">
              <img
                src={product.image}
                alt={`${product.title} — ${formatCategoryLabel(product.category)}`}
                className="product-detail__image"
              />
            </div>

            <div className="product-detail__info">
              <span className="product-category">
                {formatCategoryLabel(product.category)}
              </span>
              <h1 className="product-detail__title">{product.title}</h1>

              <div className="product-detail__rating">
                <FaStar aria-hidden="true" />
                <span>
                  {product.rating.rate.toFixed(1)} ({product.rating.count}{" "}
                  avaliações)
                </span>
              </div>

              <p className="product-detail__price">{formatPrice(product.price)}</p>
              <p className="product-detail__description">{product.description}</p>

              <button
                type="button"
                className={`add-button product-detail__add${added ? " is-added" : ""}`}
                onClick={handleAdd}
                disabled={added}
              >
                {added ? (
                  <>
                    <FaCheck aria-hidden="true" />
                    Adicionado ao carrinho
                  </>
                ) : (
                  <>
                    <FaShoppingCart aria-hidden="true" />
                    Adicionar ao carrinho
                  </>
                )}
              </button>
            </div>
          </article>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
