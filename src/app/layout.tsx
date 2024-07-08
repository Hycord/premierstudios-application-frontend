import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import { CartProvider } from "@/lib/contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premier Application",
  description: "Hycord's application for frontend freelancer at premier studios",
};

export default function RootLayout({
  children,
  modals
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider

          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <CartProvider>
            {children}
            {modals}
          </CartProvider>
        </ThemeProvider>
      </body>

    </html>
  );
}
