import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

// Using only Montserrat for now (user-requested). TODO: Re-add BC Liguria later.

export const metadata: Metadata = {
  title: "ACM Rookies Blog",
  description: "Comunidad de estudiantes apasionados por la tecnología y la innovación",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased bg-background text-foreground`}> 
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
