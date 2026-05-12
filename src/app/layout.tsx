import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Manrope,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Restaurant Catering Websites | Pinch Hit Digital — Dallas–Fort Worth",
  description:
    "Pinch Hit Digital helps Dallas–Fort Worth restaurants recover missed catering leads and automate follow-up. Get a free audit of your catering setup today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${manrope.variable} ${instrumentSerif.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
