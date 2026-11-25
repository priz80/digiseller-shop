import { getProducts } from "@/lib/productlist";

export const instant = false;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string | string[] }>;
}) {
  const value = (await searchParams).categoryId;
  const categoryId = Array.isArray(value) ? value[0] : value;

  if (!categoryId) {
    return (
      <main>
        <h1>Укажите категорию</h1>
      </main>
    );
  }

  const products = await getProducts(categoryId);

  if (products.length === 0) {
    return (
      <main>
        <h1>В категории нет товаров</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="catalog-categories">
        {products.map((product) => (
          <div key={product.id} className="card-categories">
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
