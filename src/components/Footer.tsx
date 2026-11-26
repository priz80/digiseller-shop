import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <nav className="footer-nav" aria-label="Информация о магазине">
        <Link href="/about">О магазине</Link>
        <Link href="/delivery">Доставка и оплата</Link>
        <Link href="/warranty">Гарантия</Link>
        <Link href="/refund">Условия возврата</Link>
        <Link href="/terms">Пользовательское соглашение</Link>
        <Link href="/privacy">Политика конфиденциальности</Link>
      </nav>
      <p>© 2026 Digital-Store.online. Все права защищены.</p>
      <p>
        Поддержка:{" "}
        <a href="mailto:support@digital-store.online">
          support@digital-store.online
        </a>
      </p>
    </footer>
  );
}
