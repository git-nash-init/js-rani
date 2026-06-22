import AnnouncementBar from "@/components/AnnouncementBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import Products from "@/components/Products";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { COMPANY, PRODUCTS } from "@/lib/content";

const SITE_URL = "https://jagadambastore.com";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "JS Rani Foods",
    alternateName: "Jagadamba Store",
    legalName: "M/s Jagdamba Store",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/js-rani-logo.png`,
      width: 1400,
      height: 1400,
    },
    description:
      "Premium cow ghee, A2 cow ghee and pure organic ghee made the traditional bilona way for HORECA and commercial kitchens across India.",
    telephone: COMPANY.phoneTel,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cole Road, Dighalia Gaon, Dibrugarh Sadar",
      addressLocality: "Dibrugarh",
      addressRegion: "Assam",
      postalCode: "786001",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "FSSAI Licensed", credentialCategory: "Food Safety" },
      { "@type": "EducationalOccupationalCredential", name: "HACCP Compliant", credentialCategory: "Food Safety" },
      { "@type": "EducationalOccupationalCredential", name: "ISO 22000 Certified", credentialCategory: "Food Safety Management" },
    ],
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "JS Rani Foods",
    description: "Premium Desi Ghee Supplier for HORECA & Commercial Kitchens",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JS Rani Foods Premium Ghee Products",
    itemListElement: PRODUCTS.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.blurb,
        brand: { "@type": "Brand", name: "JS Rani Foods" },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@id": `${SITE_URL}/#organization` },
        },
        image: `${SITE_URL}${p.image}`,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What sizes do JS Rani Foods ghee products come in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JS Rani Foods ghee is available in 5 kg and 15 kg tin packs, ideal for HORECA, sweet shops, restaurants and commercial kitchens.",
        },
      },
      {
        "@type": "Question",
        name: "Is JS Rani Foods ghee FSSAI certified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, JS Rani Foods ghee is FSSAI licensed, HACCP compliant, and ISO 22000 certified, ensuring top food safety standards.",
        },
      },
      {
        "@type": "Question",
        name: "Does JS Rani Foods offer all-India delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, JS Rani Foods delivers bulk ghee orders across all of India. Contact us at +91 83746 67536 for pricing and delivery details.",
        },
      },
      {
        "@type": "Question",
        name: "What is bilona ghee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bilona ghee is made using the traditional hand-churning method — curd from grass-fed cows is churned to extract white butter (makkhan), which is then slow-cooked into golden ghee. This process preserves natural nutrients, aroma, and flavour.",
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AnnouncementBar />
      <Nav />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <About />
        <Products />
        <WhyUs />
        <Process />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
