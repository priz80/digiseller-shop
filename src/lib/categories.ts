import { fetchDigiseller } from "@/lib/digiseller";

export interface Category {
  id: number;
  name: string;
}

interface CategoriesResponse {
  category?: Category[];
}

export async function getCatalog(): Promise<Category[]> {
  const data = await fetchDigiseller<CategoriesResponse>("/categories");
  return Array.isArray(data.category) ? data.category : [];
}