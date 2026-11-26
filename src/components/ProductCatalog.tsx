"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/productlist";

interface ProductCatalogProps {
  products: Product[];
}

export type ProductSort =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "sales-desc"
  | "date-desc";

function parseReleaseDate(value?: string): number {
  if (!value) return 0;

  const normalized = value
    .trim()
    .replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1");
  const timestamp = Date.parse(normalized);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<ProductSort>("name-asc");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru-RU");
    const filtered = normalizedQuery
      ? products.filter((product) =>
          product.name.toLocaleLowerCase("ru-RU").includes(normalizedQuery),
        )
      : [...products];

    return filtered.sort((left, right) => {
      const leftPrice = Number(left.price_rub || left.price);
      const rightPrice = Number(right.price_rub || right.price);

      switch (sort) {
        case "name-desc":
          return right.name.localeCompare(left.name, "ru", {
            sensitivity: "base",
          });
        case "price-asc":
          return (leftPrice || 0) - (rightPrice || 0);
        case "price-desc":
          return (rightPrice || 0) - (leftPrice || 0);
        case "sales-desc":
          return Number(right.cnt_sell || 0) - Number(left.cnt_sell || 0);
        case "date-desc":
          return (
            parseReleaseDate(right.release_date) -
            parseReleaseDate(left.release_date)
          );
        case "name-asc":
        default:
          return left.name.localeCompare(right.name, "ru", {
            sensitivity: "base",
          });
      }
    });
  }, [products, query, sort]);

  return (
    <>
      <div className="catalog-controls">
        <label className="catalog-search">
          <span>Поиск в категории</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Название товара"
          />
        </label>

        <label className="catalog-sort">
          <span>Сортировка</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as ProductSort)}
          >
            <option value="name-asc">По умолчанию: от А до Я</option>
            <option value="name-desc">От Я до А</option>
            <option value="price-asc">Цена по возрастанию</option>
            <option value="price-desc">Цена по убыванию</option>
            <option value="sales-desc">Количество продаж</option>
            <option value="date-desc">Дата добавления</option>
          </select>
        </label>
      </div>

      {visibleProducts.length === 0 ? (
        <p className="catalog-empty">По вашему запросу товары не найдены</p>
      ) : (
        <div className="catalog-products">
          {visibleProducts.map((product) => (
            <article key={product.id} className="card-product">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={`https://graph.digiseller.ru/img.ashx?id_d=${product.id}&crop=true`}
                  alt={product.name}
                  width={200}
                  height={200}
                />
              </Link>
              <div className="discription-product">
                <Link href={`/products/${product.id}`}>
                  <h2>{product.name}</h2>
                </Link>
                <div dangerouslySetInnerHTML={{ __html: product.info }} />
                <Link
                  className="product-details-link"
                  href={`/products/${product.id}`}
                >
                  Подробнее...
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
