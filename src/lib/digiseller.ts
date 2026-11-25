const apiBaseUrl = "https://api.digiseller.com/api";

export async function fetchDigiseller<T>(path: string): Promise<T> {
  const sellerId = process.env.DIGISELLER_AGENT_ID;
  if (!sellerId) {
    throw new Error("DIGISELLER_AGENT_ID not set");
  }

  const url = new URL(path.replace(/^\//, ""), `${apiBaseUrl}/`);
  url.searchParams.set("seller_id", sellerId);

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Digiseller API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}