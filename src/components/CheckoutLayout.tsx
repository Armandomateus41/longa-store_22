import type { ReactNode } from "react";
import { CheckoutSteps } from "./CheckoutSteps";
import { SiteFooter, StoreMainBar, StoreTopBar } from "./StoreShell";

type CheckoutLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function CheckoutLayout({
  title,
  subtitle,
  children,
}: CheckoutLayoutProps) {
  return (
    <div className="page">
      <header className="store-header">
        <StoreTopBar />
        <StoreMainBar />
        <CheckoutSteps />
      </header>

      <main className="checkout-page">
        <div className="checkout-page__inner">
          <div className="checkout-page__head">
            <h1 className="checkout-page__title">{title}</h1>
            {subtitle && (
              <p className="checkout-page__subtitle">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
