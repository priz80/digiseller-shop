import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { searchProducts } from "@/lib/search";

export const instant = false;

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const value = (await searchParams).q;
  const query = Array.isArray(value) ? value[0] : value;

  return {
    title: query ? `Поиск: ${query}` : "Поиск товаров",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const value = (await searchParams).q;
  const query = (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

  if (!query) {
    return (
      <main>
        <h1>Поиск товаров</h1>
        <p className="catalog-empty">Введите название товара</p>
      </main>
    );
  }

  const result = await searchProducts(query);

  return (
    <main>
      <h1>Результаты поиска: {query}</h1>
      {result.retval !== 0 || result.products.length === 0 ? (
        <p className="catalog-empty">По вашему запросу товары не найдены</p>
      ) : (
        <div className="catalog-products">
          {result.products.map((product) => (
            <article key={product.id} className="card-product">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={`https://graph.digiseller.ru/img.ashx?id_d=${product.id}&crop=true`}
                  alt={product.snippets?.name || product.name}
                  width={200}
                  height={200}
                />
              </Link>
              <div className="discription-product">
                <Link href={`/products/${product.id}`}>
                  <h2>{product.snippets?.name || product.name}</h2>
                </Link>
                {product.snippets?.info ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: product.snippets.info }}
                  />
                ) : null}
                <Link
                  className="product-details-link"
                  href={`/products/${product.id}`}
                >
                  Подробнее...
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
