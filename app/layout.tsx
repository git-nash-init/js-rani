import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://jsranifoods.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JS Rani Foods® | Pure Desi Ghee for HORECA & Commercial Kitchens",
    template: "%s | JS Rani Foods®",
  },
  description:
    "JS Rani Foods® — premium Cow Ghee, A2 Cow Ghee & Pure Organic Ghee made the traditional bilona way. FSSAI, HACCP & ISO 22000 certified. Trusted by sweet shops, restaurants & cloud kitchens across India. Available in 5 kg & 15 kg packs with all-India delivery.",
  keywords: [
    "JS Rani Foods", "cow ghee", "A2 cow ghee", "organic ghee", "bilona ghee",
    "HORECA ghee", "bulk ghee supplier India", "desi ghee", "ghee for sweet shops",
    "Dibrugarh ghee", "FSSAI ghee", "15 kg ghee tin",
  ],
  authors: [{ name: "JS Rani Foods" }],
  openGraph: {
    title: "JS Rani Foods® | Pure Desi Ghee for Commercial Kitchens",
    description:
      "Premium Cow Ghee, A2 Cow Ghee & Pure Organic Ghee — traditional bilona method, FSSAI · HACCP · ISO 22000 certified. Same premium quality, smarter price.",
    url: SITE_URL,
    siteName: "JS Rani Foods®",
    images: [{ url: "/js-rani-logo.png", width: 1400, height: 1400, alt: "JS Rani Foods logo" }],
    locale: "en_IN",
    type: "website",
  },
  icons: { icon: "/js-rani-logo.png", apple: "/js-rani-logo.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
