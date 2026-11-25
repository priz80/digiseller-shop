import "./global.scss";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
