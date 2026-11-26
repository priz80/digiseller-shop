import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "О магазине",
  description:
    "О проекте Digital-Store.online и принципах работы витрины цифровых товаров.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage
      title="О проекте Digital-Store.online"
      description="Информационный каталог цифровых товаров, игр, ключей активации, программного обеспечения и подписок на онлайн-сервисы."
    >
      <h2>Как работает наш сервис</h2>
      <ul>
        <li>
          <strong>Только проверенные предложения:</strong> мы отбираем
          предложения от независимых продавцов Digiseller, ориентируясь на
          рейтинг продавца, историю продаж и отзывы покупателей.
        </li>
        <li>
          <strong>Прямая оплата и мгновенная выдача:</strong>{" "}
          Digital-Store.online не принимает платежи и не хранит цифровые ключи.
          При нажатии «Купить» покупатель переходит на защищенный платежный шлюз
          Oplata.info, где проходит оплата и автоматическая выдача товара.
        </li>
        <li>
          <strong>Актуальность цен:</strong> цены и наличие синхронизируются с
          базой продавцов через официальное API.
        </li>
      </ul>
      <p>
        По вопросам работы витрины:{" "}
        <a href="mailto:support@digital-store.online">
          support@digital-store.online
        </a>
        .
      </p>
    </LegalPage>
  );
}
