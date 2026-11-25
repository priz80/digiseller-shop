import { fetchDigiseller } from "@/lib/digiseller";

export interface Product {
  id: string;
  name: string;
  price: string;
}

interface ProductsResponse {
  product?: Product[];
}

export async function getProducts(categoryId: string): Promise<Product[]> {
  const data = await fetchDigiseller<ProductsResponse>(
    `/shop/products?category_id=${encodeURIComponent(categoryId)}`,
  );
  return Array.isArray(data.product) ? data.product : [];
}