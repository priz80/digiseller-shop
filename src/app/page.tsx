import Image from "next/image";
import Link from "next/link";
import { getCatalog } from "@/lib/catalog";

interface Category {
  id: number;
  name: string;
}

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
            <Link href="/">
              <h2>{category.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
