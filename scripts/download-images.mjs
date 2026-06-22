import fs from "node:fs";
import path from "node:path";

const dir = path.join("public", "products");

fs.mkdirSync(dir, { recursive: true });

const products = await fetch("https://fakestoreapi.com/products").then((response) =>
  response.json()
);

for (const product of products) {
  const imageResponse = await fetch(product.image);

  if (!imageResponse.ok) {
    throw new Error(`Falha ao baixar imagem do produto ${product.id}`);
  }

  const extension = product.image.toLowerCase().includes(".png") ? "png" : "jpg";
  const filePath = path.join(dir, `${product.id}.${extension}`);
  const buffer = Buffer.from(await imageResponse.arrayBuffer());

  fs.writeFileSync(filePath, buffer);
  console.log(`salvo: ${product.id}.${extension}`);
}

console.log(`concluído: ${products.length} imagens em public/products/`);
