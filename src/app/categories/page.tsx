import type { Metadata } from "next";
import { getCatalog } from "@/lib/categories";
import { getProducts } from "@/lib/productlist";
import { ProductCatalog } from "@/components/ProductCatalog";

export const instant = false;

interface CategoriesPageProps {
  searchParams: Promise<{ categoryId?: string | string[] }>;
}

function getCategoryId(searchParams: { categoryId?: string | string[] }) {
  const value = searchParams.categoryId;
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  searchParams,
}: CategoriesPageProps): Promise<Metadata> {
  const categoryId = getCategoryId(await searchParams);

  if (!categoryId) {
    return {
      title: "Выберите категорию",
      robots: { index: false, follow: true },
    };
  }

  const category = (await getCatalog()).find(
    (item) => String(item.id) === categoryId,
  );

  if (!category) {
    return {
      title: "Категория не найдена",
      robots: { index: false, follow: false },
    };
  }

  const products = await getProducts(categoryId);
  const prices = products
    .map((product) => Number(product.price_rub || product.price))
    .filter((price) => Number.isFinite(price) && price > 0);
  const availableCount = products.length;
  const minPrice = prices.length > 0 ? Math.min(...prices) : null;
  const priceSuffix = minPrice
    ? ` — цены от ${Math.round(minPrice).toLocaleString("ru-RU")} ₽`
    : "";
  const title = `${category.name}${priceSuffix}`;
  const description =
    availableCount > 0
      ? `${category.name}: ${availableCount} проверенных предложений${priceSuffix}. Мгновенная доставка и подробные инструкции по активации.`
      : `${category.name}: актуальный каталог цифровых товаров с мгновенной выдачей и подробными инструкциями.`;
  const canonicalUrl = `https://digital-store.online/categories?categoryId=${category.id}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function Page({ searchParams }: CategoriesPageProps) {
  const categoryId = getCategoryId(await searchParams);

  if (!categoryId) {
    return (
      <main>
        <h1>Укажите категорию</h1>
      </main>
    );
  }

  const [category, products] = await Promise.all([
    getCatalog().then((items) =>
      items.find((item) => String(item.id) === categoryId),
    ),
    getProducts(categoryId),
  ]);

  if (!category) {
    return (
      <main>
        <h1>Категория не найдена</h1>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main>
        <h1>{category.name}</h1>
        <p>В категории нет товаров</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{category.name}</h1>
      <ProductCatalog products={products} />
    </main>
  );
}
