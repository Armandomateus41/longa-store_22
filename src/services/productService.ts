import type { Product } from "../types/product";

const BASE_URL = "https://fakestoreapi.com";

async function fetchFromApi<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Falha ao buscar ${path}`);
  }

  return response.json() as Promise<T>;
}

function withLocalImages(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    image: `/products/${product.id}.png`,
  }));
}

export async function getProducts(): Promise<Product[]> {
  const products = await fetchFromApi<Product[]>("/products");
  return withLocalImages(products);
}

export function getCategories(): Promise<string[]> {
  return fetchFromApi<string[]>("/products/categories");
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const products = await fetchFromApi<Product[]>(
    `/products/category/${category}`
  );
  return withLocalImages(products);
}
