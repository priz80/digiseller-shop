import "./global.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>
        <div className="container">
          <Header />
          <Menu />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
