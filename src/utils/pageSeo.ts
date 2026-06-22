import {
  buildPageTitle,
  resolveJsonLd,
  resolveSiteUrl,
  type PageSeoConfig,
} from "../data/seo";

const JSON_LD_ID = "page-json-ld";

function upsertMeta(
  key: string,
  content: string,
  attribute: "name" | "property" = "name"
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`
  );

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertJsonLd(items: Record<string, unknown>[]) {
  let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.id = JSON_LD_ID;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(items.length === 1 ? items[0] : items);
}

export function applyPageSeo(config: PageSeoConfig) {
  const siteUrl = resolveSiteUrl();
  const canonicalUrl = `${siteUrl}${config.path === "/" ? "" : config.path}`;
  const title = buildPageTitle(config.title);
  const ogImage = `${siteUrl}/imange-logo/logo-header.png`;
  const robots = config.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";

  document.title = title;

  upsertMeta("description", config.description);
  upsertMeta("robots", robots);
  upsertMeta("author", "Armando Capita");
  upsertMeta("og:locale", "pt_BR", "property");
  upsertMeta("og:site_name", "Longa Store", "property");
  upsertMeta("og:title", title, "property");
  upsertMeta("og:description", config.description, "property");
  upsertMeta("og:type", config.ogType ?? "website", "property");
  upsertMeta("og:url", canonicalUrl, "property");
  upsertMeta("og:image", ogImage, "property");
  upsertMeta("og:image:alt", "Longa Store — e-commerce de eletrônicos", "property");
  upsertMeta("twitter:card", "summary_large_image");
  upsertMeta("twitter:title", title);
  upsertMeta("twitter:description", config.description);
  upsertMeta("twitter:image", ogImage);

  upsertLink("canonical", canonicalUrl);

  const jsonLd = resolveJsonLd(config.jsonLd, siteUrl);
  if (jsonLd.length > 0) {
    upsertJsonLd(jsonLd);
  } else {
    document.getElementById(JSON_LD_ID)?.remove();
  }
}
