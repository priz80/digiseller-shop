import Link from "next/link";
import { getCatalog, type Category } from "@/lib/categories";

export const instant = false;

export default async function MenuItems() {
  const categories = await getCatalog();

  if (!categories || categories.length === 0) {
    return (
      <main>
        <h1>Категории не найдены</h1>
      </main>
    );
  }
  return (
    <nav className="nav-menu">
      <ul>
        {categories.map((category: Category) => (
          <li key={category.id}>
            <Link href={`/categories?categoryId=${category.id}`}>
              <h3>{category.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
