import { fetchDigiseller } from "@/lib/digiseller";

export type SupportedCurrency = "RUB" | "USD" | "EUR" | "UAH";

interface RatesResponse {
  retval: number;
  amounts?: Array<{ rub: number; value: number }>;
}

export async function convertRubPrice(
  rubPrice: number,
  currency: SupportedCurrency,
): Promise<number> {
  if (currency === "RUB") return rubPrice;

  const data = await fetchDigiseller<RatesResponse>(
    `/rates/${currency}?rub=${encodeURIComponent(rubPrice)}`,
  );

  if (data.retval !== 0) return rubPrice;

  return data.amounts?.[0]?.value ?? rubPrice;
}
