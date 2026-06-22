const BASE = "/imanges-fora";
const LOGO_BASE = "/imange-logo";

export const storeLogos = {
  icon: `${LOGO_BASE}/5.png`,
  iconDetailed: `${LOGO_BASE}/log1.png`,
  light: `${LOGO_BASE}/log2.png`,
  header: `${LOGO_BASE}/logo-header.png`,
  dark: `${LOGO_BASE}/log3.png`,
  iconDark: `${LOGO_BASE}/log4.png`,
  favicon: `${LOGO_BASE}/5.png`,
} as const;

export const storeImages = {
  bannerParcela: `${BASE}/banner-parcela.png`,
  discountBanner: `${BASE}/Ver-descontos-de-ate-40-off.png`,
  paymentMethods: `${BASE}/formas.webp`,
  siteSecure: `${BASE}/site-seguro-2-e1713900604818.png`,
  slides: [
    `${BASE}/slide_longa-1.png`,
    `${BASE}/slide_longa_2.png`,
    `${BASE}/slides-1.png`,
    `${BASE}/slides-2.png`,
    `${BASE}/slides-3.png`,
  ],
  categories: [
    {
      image: `${BASE}/categorias-1.png`,
      label: "Eletrônicos",
      category: "electronics",
    },
    {
      image: `${BASE}/categorias-2.png`,
      label: "Feminino",
      category: "women's clothing",
    },
    {
      image: `${BASE}/categorias-3.png`,
      label: "Masculino",
      category: "men's clothing",
    },
    {
      image: `${BASE}/categorias-4.png`,
      label: "Joias",
      category: "jewelery",
    },
    {
      image: `${BASE}/categorias-5.png`,
      label: "Ofertas",
      category: "all",
    },
    {
      image: `${BASE}/categorias-6.png`,
      label: "Novidades",
      category: "all",
    },
    {
      image: `${BASE}/categorias-7.png`,
      label: "Destaques",
      category: "all",
    },
  ],
} as const;
