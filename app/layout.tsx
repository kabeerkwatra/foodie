import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import {Providers} from "./providers"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foodie",
  description: "A food ordering service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
      <div>
        <Header/>
      </div>
        {children}
        </Providers>
        </body>
    </html>
  );
}
