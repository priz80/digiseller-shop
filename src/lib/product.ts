import { cache } from "react";
import { fetchDigiseller } from "@/lib/digiseller";

export interface Product {
  id: string;
  name: string;
  price_rub: string;
  info: string;
  currency?: "RUB";
  price: number;
}

export const getProduct = cache(
  async (productId: string): Promise<Product | undefined> => {
    const data = await fetchDigiseller<{ product: Product }>(
      `/products/${encodeURIComponent(productId)}/data`,
    );
    return data.product;
  },
);