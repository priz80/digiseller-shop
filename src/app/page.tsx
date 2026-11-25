import Image from "next/image";
import Link from "next/link";
import { getCatalog, type Category } from "@/lib/categories";

export const instant = false;

export default async function Page() {
  const categories = await getCatalog();

  if (!categories || categories.length === 0) {
    return (
      <main>
        <h1>Категории не найдены</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="catalog-categories">
        {categories.map((category: Category) => (
          <div key={category.id} className="card-categories">
            <Image
              src="/img/ChatGPT-Logo.jpg"
              alt="Logo"
              width={180}
              height={180}
            />
            <Link href={`/categories?categoryId=${category.id}`}>
              <h2>{category.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
