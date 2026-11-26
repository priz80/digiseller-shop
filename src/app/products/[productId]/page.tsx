import type { Metadata } from "next";
import Image from "next/image";
import { getProduct } from "@/lib/product";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { ProductPurchaseWidget } from "@/components/ProductPurchaseWidget";
import { convertRubPrice, type SupportedCurrency } from "@/lib/rates";

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    return {
      title: "Товар не найден",
      robots: { index: false, follow: false },
    };
  }

  const descriptionText = product.info
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const formattedPrice = Math.round(Number(product.price)).toLocaleString(
    "ru-RU",
  );
  const title = `${product.name} — купить за ${formattedPrice} ₽ с мгновенной выдачей`;
  const description = descriptionText
    ? `${descriptionText.slice(0, 105)} Купить за ${formattedPrice} ₽ с мгновенной выдачей.`
    : `Купить ${product.name} за ${formattedPrice} ₽ с мгновенной выдачей.`;
  const imageUrl = `https://graph.digiseller.ru/img.ashx?id_d=${product.id}&crop=true`;
  const canonicalUrl = `https://digital-store.online/products/${product.id}`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: canonicalUrl },
    robots:
      descriptionText.length >= 40
        ? { index: true, follow: true }
        : { index: false, follow: false },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: canonicalUrl,
      images: [{ url: imageUrl, width: 800, height: 600, alt: product.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 160),
      images: [imageUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    return (
      <main>
        <h1>Товар не найден</h1>
      </main>
    );
  }

  const description = product.info
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  const imageUrl = `https://graph.digiseller.ru/img.ashx?id_d=${product.id}&crop=true`;

  const basePrice = Number(product.price_rub || product.price);
  const [usdPrice, eurPrice, uahPrice] = await Promise.all([
    convertRubPrice(basePrice, "USD"),
    convertRubPrice(basePrice, "EUR"),
    convertRubPrice(basePrice, "UAH"),
  ]);
  const convertedPrices: Record<SupportedCurrency, number> = {
    RUB: basePrice,
    USD: usdPrice,
    EUR: eurPrice,
    UAH: uahPrice,
  };

  return (
    <>
      <main>
        <div className="product">
          <h1>{product.name}</h1>
          <div className="product-block">
            <Image src={imageUrl} alt={product.name} width={300} height={300} />
            <ProductPurchaseWidget
              productId={product.id}
              productName={product.name}
              convertedPrices={convertedPrices}
              agentId={process.env.DIGISELLER_AGENT_ID}
              failPage={`https://digital-store.online/products/${product.id}`}
            />
          </div>
          <div className="discription-product">
           
            <div dangerouslySetInnerHTML={{ __html: product.info }} />
          </div>
        </div>
        <ProductJsonLd
          name={product.name}
          description={description}
          url={`https://digital-store.online/products/${product.id}`}
          imageUrl={imageUrl}
          price={Number(product.price)}
          currency={product.currency ?? "RUB"}
          inStock={true}
        />
      </main>
    </>
  );
}
