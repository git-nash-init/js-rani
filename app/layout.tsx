import type { Metadata } from "next";
import Script from "next/script";
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

const SITE_URL = "https://jagadambastore.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JS Rani Foods® | Pure Desi Ghee for HORECA & Commercial Kitchens",
    template: "%s | JS Rani Foods®",
  },
  description:
    "JS Rani Foods® — premium Cow Ghee, A2 Cow Ghee & Pure Organic Ghee made the traditional bilona way. FSSAI, HACCP & ISO 22000 certified. Trusted by sweet shops, restaurants & cloud kitchens across India. Bulk 5 kg & 15 kg packs, all-India delivery.",
  keywords: [
    "JS Rani Foods",
    "Jagadamba Store",
    "cow ghee",
    "A2 cow ghee",
    "organic ghee",
    "bilona ghee",
    "desi ghee",
    "pure ghee",
    "HORECA ghee",
    "bulk ghee supplier India",
    "ghee for sweet shops",
    "ghee for restaurants",
    "ghee for cloud kitchens",
    "commercial ghee supplier",
    "bulk ghee 15 kg tin",
    "bulk ghee 5 kg",
    "Dibrugarh ghee",
    "Assam ghee supplier",
    "FSSAI certified ghee",
    "HACCP ghee",
    "ISO 22000 ghee",
    "A2 milk ghee",
    "Gir cow ghee",
    "Sahiwal cow ghee",
    "ghee manufacturer India",
    "wholesale ghee India",
    "mithai ghee supplier",
    "halwai ghee",
    "traditional ghee",
    "grass-fed cow ghee",
  ],
  authors: [{ name: "JS Rani Foods" }],
  creator: "JS Rani Foods",
  publisher: "JS Rani Foods",
  category: "Food & Beverage",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "JS Rani Foods® | Pure Desi Ghee for Commercial Kitchens",
    description:
      "Premium Cow Ghee, A2 Cow Ghee & Pure Organic Ghee — traditional bilona method, FSSAI · HACCP · ISO 22000 certified. Bulk 5 kg & 15 kg packs, all-India delivery.",
    url: SITE_URL,
    siteName: "JS Rani Foods®",
    images: [
      {
        url: "/js-rani-logo.png",
        width: 1400,
        height: 1400,
        alt: "JS Rani Foods — Pure Desi Ghee",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JS Rani Foods® | Pure Desi Ghee for HORECA & Commercial Kitchens",
    description:
      "Premium Cow Ghee, A2 Cow Ghee & Pure Organic Ghee — traditional bilona method, FSSAI · HACCP · ISO 22000 certified. All-India delivery.",
    images: ["/js-rani-logo.png"],
  },
  icons: {
    icon: "/js-rani-logo.png",
    apple: "/js-rani-logo.png",
    shortcut: "/js-rani-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0XXJRTHZQ6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0XXJRTHZQ6');
          `}
        </Script>
      </body>
    </html>
  );
}
