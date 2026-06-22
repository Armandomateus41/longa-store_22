import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(rootDir, "public");
const siteUrl = (process.env.VITE_SITE_URL ?? "https://longa-store-22.vercel.app").replace(
  /\/$/,
  ""
);

const indexablePaths = [
  "/",
  "/contato",
  "/sobre",
  "/entregas",
  "/faq",
  "/privacidade",
  "/trocas",
];
const disallowedPaths = [
  "/checkout",
  "/pagamento",
  "/conta",
  "/carrinho",
  "/pedido-confirmado",
  "/pedidos",
  "/rastrear-pedido",
];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexablePaths
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path === "/" ? "" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === "/" ? "daily" : "weekly"}</changefreq>
    <priority>${path === "/" ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /
${disallowedPaths.map((path) => `Disallow: ${path}`).join("\n")}

Sitemap: ${siteUrl}/sitemap.xml
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");

console.log(`SEO files generated for ${siteUrl}`);
