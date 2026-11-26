"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { SupportedCurrency } from "@/lib/rates";

interface ProductPurchaseWidgetProps {
  productId: string;
  productName: string;
  convertedPrices: Record<SupportedCurrency, number>;
  agentId?: string;
  failPage: string;
}

const currencyLabels: Record<SupportedCurrency, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
  UAH: "₴",
};

export function ProductPurchaseWidget({
  productId,
  productName,
  convertedPrices,
  agentId,
  failPage,
}: ProductPurchaseWidgetProps) {
  const [currency, setCurrency] = useState<SupportedCurrency>("RUB");
  const price = convertedPrices[currency];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const counterId = Number(process.env.NEXT_PUBLIC_YM_ID);
    if (counterId && typeof window.ym === "function") {
      window.ym(counterId, "reachGoal", "click_buy", {
        product_id: productId,
        product_name: productName,
        price,
        currency,
      });
    }

    event.currentTarget.submit();
  };

  return (
    <div className="purchase-widget">
      <div className="product-price" aria-live="polite">
        {price.toLocaleString("ru-RU", {
          minimumFractionDigits: currency === "RUB" ? 0 : 2,
          maximumFractionDigits: currency === "RUB" ? 0 : 2,
        })}{" "}
        {currencyLabels[currency]}
      </div>

      <label className="currency-select-label">
        Валюта
        <select
          className="currency-select"
          value={currency}
          onChange={(event) =>
            setCurrency(event.target.value as SupportedCurrency)
          }
        >
          <option value="RUB">RUB</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
      </label>

      <form
        className="purchase-box"
        action="https://oplata.info/asp2/pay.asp"
        method="post"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="id_d" value={productId} />
        <input type="hidden" name="cart_uid" value="" />
        <input type="hidden" name="typecurr" value={currency} />
        <input type="hidden" name="lang" value="ru-RU" />
        <input type="hidden" name="failpage" value={failPage} />
        {agentId ? <input type="hidden" name="agent" value={agentId} /> : null}
        <input type="hidden" name="promocode" value="" />
        <input type="hidden" name="unit_cnt" value="1" />
        <input type="hidden" name="id_po" value="" />
        <button type="submit" className="buy-button">
          Купить за{" "}
          {price.toLocaleString("ru-RU", {
            minimumFractionDigits: currency === "RUB" ? 0 : 2,
            maximumFractionDigits: currency === "RUB" ? 0 : 2,
          })}{" "}
          {currencyLabels[currency]}
        </button>
      </form>
    </div>
  );
}
