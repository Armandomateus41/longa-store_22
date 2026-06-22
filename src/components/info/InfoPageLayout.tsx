import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/productService";
import { SiteHeader } from "../SiteHeader";
import { SiteFooter } from "../StoreShell";
import { InfoSidebar } from "./InfoSidebar";

type InfoPageLayoutProps = {
  title: string;
  children: ReactNode;
  showSidebar?: boolean;
};

export function InfoPageLayout({
  title,
  children,
  showSidebar = true,
}: InfoPageLayoutProps) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    getCategories()
      .then((data) => {
        if (!cancelled) {
          setCategories(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCategories([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleSelectCategory() {
    navigate("/");
  }

  function handleSearchChange(value: string) {
    setSearch(value);
  }

  return (
    <div className="page">
      <SiteHeader
        search={search}
        onSearchChange={handleSearchChange}
        categories={categories}
        selectedCategory="all"
        onSelectCategory={handleSelectCategory}
      />

      <main className="info-page">
        <div
          className={`info-page__inner${showSidebar ? "" : " info-page__inner--full"}`}
        >
          {showSidebar && <InfoSidebar />}

          <article className="info-content">
            <h1 className="info-content__title">{title}</h1>
            {children}
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
