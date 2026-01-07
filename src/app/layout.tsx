import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Use Outfit
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stock Portfolio Tracker",
  description: "Track your stock portfolio yields",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        {children}
      </body>
    </html>
  );
}
