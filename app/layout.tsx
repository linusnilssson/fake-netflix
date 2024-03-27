import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { LayoutProps } from "./types";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Header />
        <Box component="main">{children}</Box>
        <Footer />
      </body>
    </html>
  );
}
