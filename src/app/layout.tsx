import "./global.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuItems from "@/components/menu";
import { CookieBanner } from '@/components/CookieBanner';
import { YandexMetrika } from "@/components/YandexMetrika";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://digital-store.online'),
  title: {
    default: 'Digital-Store.online — магазин цифровых товаров, ключей и подписок',
    template: '%s | Digital-Store.online',
  },
  description:
    'Каталог проверенных цифровых товаров: ключи активации игр, подписки на нейросети и зарубежные сервисы, пополнение баланса с мгновенной выдачей.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Digital-Store.online',
  },
  robots: {
    index: true,
    follow: true,
  },
};


const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID);


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>
        <div className="app">
          <div className="container">
            <Header />
            <MenuItems />
            {children}
          </div>
          <CookieBanner />
          <YandexMetrika counterId={YM_ID} />
          <div className="container">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
