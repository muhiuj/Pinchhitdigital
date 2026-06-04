import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Manrope,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PostHogPageView } from "@/components/PostHogPageView";
import { PostHogProvider } from "@/components/PostHogProvider";
import {
  cateringServiceSchema,
  professionalServiceSchema,
} from "@/lib/schema";
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
        <PostHogProvider>
          <PostHogPageView />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PostHogProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(cateringServiceSchema),
          }}
        />
      </body>
    </html>
  );
}
