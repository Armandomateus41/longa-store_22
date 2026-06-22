import { storeLogos } from "../data/storeImages";

type StoreLogoProps = {
  variant?: "header" | "compact" | "footer";
};

export function StoreLogo({ variant = "header" }: StoreLogoProps) {
  if (variant === "footer") {
    return (
      <img
        src={storeLogos.dark}
        alt="Longa Store"
        className="site-footer__logo"
      />
    );
  }

  if (variant === "compact") {
    return (
      <img
        src={storeLogos.header}
        alt="Longa Store"
        className="store-logo__image store-logo__image--header"
      />
    );
  }

  return (
    <img
      src={storeLogos.header}
      alt="Longa Store"
      className="store-logo__image store-logo__image--header"
    />
  );
}
