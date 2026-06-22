import { faqItems, storeContact, storeName } from "./storeInfo";

export type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const defaultDescription =
  "Compre eletrônicos, acessórios e ofertas na Longa Store. Catálogo completo, carrinho, checkout seguro, entrega rastreada e atendimento por WhatsApp.";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: storeName,
  url: "{{SITE_URL}}",
  logo: "{{SITE_URL}}/imange-logo/logo-header.png",
  email: storeContact.email,
  telephone: storeContact.phone,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: storeContact.phone,
    contactType: "customer service",
    availableLanguage: "Portuguese",
    areaServed: "BR",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: storeName,
  url: "{{SITE_URL}}",
  inLanguage: "pt-BR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "{{SITE_URL}}/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const defaultSeo: PageSeoConfig = {
  title: `${storeName} — Eletrônicos, ofertas e checkout seguro`,
  description: defaultDescription,
  path: "/",
  ogType: "website",
  jsonLd: [organizationJsonLd, websiteJsonLd],
};

export const routeSeo: Record<string, PageSeoConfig> = {
  "/": defaultSeo,
  "/contato": {
    title: "Atendimento ao Cliente",
    description:
      "Fale com a Longa Store por WhatsApp, e-mail ou telefone. Horário de atendimento e suporte para dúvidas, pedidos e pós-venda.",
    path: "/contato",
    jsonLd: organizationJsonLd,
  },
  "/sobre": {
    title: "Sobre a Longa Store",
    description:
      "Conheça a Longa Store: e-commerce de eletrônicos com foco em qualidade, preços competitivos, entrega confiável e atendimento dedicado.",
    path: "/sobre",
    jsonLd: organizationJsonLd,
  },
  "/entregas": {
    title: "Entregas e Prazos",
    description:
      "Consulte prazos de entrega, rastreamento de pedidos e informações de logística da Longa Store em todo o Brasil.",
    path: "/entregas",
    jsonLd: organizationJsonLd,
  },
  "/faq": {
    title: "Perguntas Frequentes",
    description:
      "Respostas sobre pagamento, prazo de entrega, rastreamento, trocas, devoluções e nota fiscal na Longa Store.",
    path: "/faq",
    jsonLd: [organizationJsonLd, faqJsonLd],
  },
  "/conta": {
    title: "Minha Conta",
    description: "Acesse ou crie sua conta na Longa Store para finalizar compras e gerenciar seus dados.",
    path: "/conta",
    noindex: true,
  },
  "/carrinho": {
    title: "Carrinho de Compras",
    description: "Revise os produtos no seu carrinho antes de continuar para a entrega.",
    path: "/carrinho",
    noindex: true,
  },
  "/checkout": {
    title: "Checkout — Entrega",
    description: "Informe os dados de entrega para concluir seu pedido na Longa Store.",
    path: "/checkout",
    noindex: true,
  },
  "/pagamento": {
    title: "Checkout — Pagamento",
    description: "Escolha a forma de pagamento e finalize seu pedido na Longa Store.",
    path: "/pagamento",
    noindex: true,
  },
  "/pedido-confirmado": {
    title: "Pedido Confirmado",
    description: "Confirmação do seu pedido na Longa Store.",
    path: "/pedido-confirmado",
    noindex: true,
  },
};

export const indexablePaths = ["/", "/contato", "/sobre", "/entregas", "/faq"];

export function resolveSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "https://longa-store-22.vercel.app";
}

export function getSeoForPath(pathname: string): PageSeoConfig {
  const config = routeSeo[pathname] ?? defaultSeo;

  return {
    ...defaultSeo,
    ...config,
    path: config.path ?? pathname,
  };
}

export function buildPageTitle(pageTitle: string): string {
  if (pageTitle.includes(storeName)) {
    return pageTitle;
  }

  return `${pageTitle} | ${storeName}`;
}

export function resolveJsonLd(
  jsonLd: PageSeoConfig["jsonLd"],
  siteUrl: string
): Record<string, unknown>[] {
  if (!jsonLd) {
    return [];
  }

  const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  const serialized = JSON.stringify(items).replaceAll("{{SITE_URL}}", siteUrl);

  return JSON.parse(serialized) as Record<string, unknown>[];
}
