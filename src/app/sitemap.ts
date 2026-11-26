// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getCatalog } from '@/lib/categories';
import { getProducts } from '@/lib/productlist';

const BASE_URL = 'https://digital-store.online';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCatalog();
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...['about', 'delivery', 'warranty', 'refund', 'terms', 'privacy'].map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];

  for (const category of categories) {
    entries.push({
      url: `${BASE_URL}/categories?categoryId=${category.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });

    const products = await getProducts(String(category.id));

    for (const product of products) {
      const uniqueText = product.info
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (uniqueText.length < 40) continue;

      entries.push({
        url: `${BASE_URL}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
