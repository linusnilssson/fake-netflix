import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieProvider from "./context/MovieContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MovieProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </MovieProvider>
      </body>
    </html>
  );
}
