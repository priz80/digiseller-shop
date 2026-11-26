import { cache } from "react";
import { fetchDigiseller } from "@/lib/digiseller";

export interface Product {
  id: string;
  name: string;
  price: string;
  price_rub: string;
  info: string;
  cnt_sell?: number | string;
  release_date?: string;
}

interface ProductsResponse {
  product?: Product[];
}

export const getProducts = cache(
  async (categoryId: string): Promise<Product[]> => {
    const data = await fetchDigiseller<ProductsResponse>(
      `/shop/products?category_id=${encodeURIComponent(categoryId)}`,
    );
    return Array.isArray(data.product) ? data.product : [];
  },
);