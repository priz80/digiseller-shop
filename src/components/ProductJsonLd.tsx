// src/components/ProductJsonLd.tsx
import React from "react";

interface ProductJsonLdProps {
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
  price: number;
  currency?: string; // 'RUB' | 'USD'
  inStock: boolean;
  sellerName?: string;
  ratingValue?: number; // Например, 4.9
  reviewCount?: number; // Например, 124
  faq?: { question: string; answer: string }[];
}

export function ProductJsonLd({
  name,
  description,
  url,
  imageUrl,
  price,
  currency = "RUB",
  inStock,
  sellerName,
  ratingValue,
  reviewCount,
  faq,
}: ProductJsonLdProps) {
  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    ...(imageUrl ? { image: [imageUrl] } : {}),
    brand: {
      "@type": "Brand",
      name: "Digital-Store.online",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: currency,
      price: price.toFixed(2),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      ...(sellerName
        ? {
            seller: {
              "@type": "Organization",
              name: sellerName,
            },
          }
        : {}),
    },
  };

  // Добавляем рейтинг, только если у товара есть реальные отзывы
  if (ratingValue && reviewCount && reviewCount > 0) {
    productSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toFixed(1),
      reviewCount,
      bestRating: "5",
      worstRating: "1",
    };
  }

  // Если на странице есть блок «Частые вопросы», добавляем разметку FAQPage
  const faqSchema =
    faq && faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
