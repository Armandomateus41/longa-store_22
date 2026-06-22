import { storeImages } from "../data/storeImages";

export function PromoBanners() {
  return (
    <section className="promo-banners" aria-label="Promoções">
      <div className="promo-banners__inner">
        <a href="#catalog" className="promo-banners__item">
          <img
            src={storeImages.bannerParcela}
            alt="Condições de parcelamento"
          />
        </a>
        <a href="#catalog" className="promo-banners__item">
          <img
            src={storeImages.discountBanner}
            alt="Descontos de até 40% off"
          />
        </a>
      </div>
    </section>
  );
}
