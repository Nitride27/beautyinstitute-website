import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";

const serif = Playfair_Display({
  variable: "--font-gascogne-fallback",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const sans = Inter({
  variable: "--font-basis-fallback",
  subsets: ["latin"],
  weight: ["400"],
});

const mono = JetBrains_Mono({
  variable: "--font-basis-mono-fallback",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Éclat Beauty Institute",
  description: "Learn the craft. Build your career. Become the best version of yourself.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} ${mono.variable} bg-cream-linen font-basis-grotesque-pro text-ink-black antialiased`}
      >
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
