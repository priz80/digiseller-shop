interface Category {
  id: number;
  name: string;
}

export async function getCatalog(): Promise<Category[]> {
  const seller_id = process.env.DIGISELLER_AGENT_ID;
  if (!seller_id) {
    throw new Error("DIGISELLER_AGENT_ID not set");
  }

  const response = await fetch(
  `https://api.digiseller.com/api/categories?seller_id=${seller_id}`,
  {
    headers: {
      "Accept": "application/json",
    },
    cache: "no-store",
  },
);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const xml = await response.text();

  const categoryRegex = /<category[^>]*>([\s\S]*?)<\/category>/g;
  const idRegex = /<id>([^<]+)<\/id>/;
  const nameRegex = /<name>([^<]+)<\/name>/;

  const categories: Category[] = [];
  let match;

  while ((match = categoryRegex.exec(xml)) !== null) {
    const block = match[1];
    categories.push({
      id: Number(idRegex.exec(block)?.[1] ?? 0),
      name: nameRegex.exec(block)?.[1] ?? "",
    });
  }

  return categories;
}