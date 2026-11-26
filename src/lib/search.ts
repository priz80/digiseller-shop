import { XMLParser } from "fast-xml-parser";

export interface SearchProduct {
  id: string;
  name: string;
  price: string;
  snippets?: {
    name?: string;
    info?: string;
  };
}

export interface SearchResponse {
  retval: number;
  products: SearchProduct[];
}

export async function searchProducts(query: string): Promise<SearchResponse> {
  const sellerId = process.env.DIGISELLER_AGENT_ID;
  const normalizedQuery = query.trim();

  if (!sellerId || !normalizedQuery) {
    return { retval: sellerId ? 0 : -1, products: [] };
  }

  const xmlRequest = `<digiseller.request>
    <seller><id>${sellerId}</id></seller>
    <products><search>${escapeXml(normalizedQuery)}</search><currency>RUB</currency></products>
    <pages><num>1</num><rows>50</rows></pages>
    <lang>ru-RU</lang>
  </digiseller.request>`;

  const response = await fetch("https://shop.digiseller.ru/xml/shop_search.asp", {
    method: "POST",
    headers: { "Content-Type": "application/xml", Accept: "application/xml" },
    body: xmlRequest,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Digiseller search error: ${response.status}`);
  }

  const xml = await response.text();
  const parsed = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
  }).parse(xml) as {
    "digiseller.response"?: {
      retval?: number | string;
      products?: { product?: SearchProduct | SearchProduct[] };
    };
  };

  const result = parsed["digiseller.response"];
  const rawProducts = result?.products?.product;
  const products = rawProducts
    ? Array.isArray(rawProducts)
      ? rawProducts
      : [rawProducts]
    : [];

  return {
    retval: Number(result?.retval ?? -1),
    products,
  };
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
