import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="header-logo" aria-label="На главную">
        <Image
          src="/img/logo.svg"
          alt="Digital-Store"
          width={320}
          height={73}
          priority
        />
      </Link>

      <form className="header-search" action="/search" role="search">
        <label className="sr-only" htmlFor="site-search">
          Поиск товаров
        </label>
        <input
          id="site-search"
          name="q"
          type="search"
          placeholder="Поиск товаров"
          autoComplete="off"
        />
        <button type="submit" aria-label="Найти">
          Найти
        </button>
      </form>
    </header>
  );
}
