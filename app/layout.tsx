import { Box } from "@mui/system";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { LayoutProps } from "./types";


export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Box component="main">{children}</Box>
        <Footer />
      </body>
    </html>
  );
}
