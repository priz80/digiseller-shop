import Image from "next/image";
import Link from "next/link";
import { getCatalog, type Category } from "@/lib/categories";

export const instant = false;

export default async function Page() {
  const categories = await getCatalog();

  if (!categories || categories.length === 0) {
    return (
      <main>
        <h1>Категории цифровых товаров</h1>
        <p>Категории временно недоступны</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Каталог цифровых товаров</h1>
      <div className="catalog-categories">
        {categories.map((category: Category) => (
          <div key={category.id} className="card-categories">
            <Link href={`/categories?categoryId=${category.id}`}>
              <Image
                src="/img/ai.png"
                alt={`Категория цифровых товаров: ${category.name}`}
                width={180}
                height={180}
              />
            </Link>
            <Link href={`/categories?categoryId=${category.id}`}>
              <h2>{category.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
