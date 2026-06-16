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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "JS Rani Foods",
  alternateName: "JS Rani Foods (M/s Jagdamba Store)",
  description:
    "Premium cow ghee, A2 cow ghee and pure organic ghee made the traditional bilona way for HORECA and commercial kitchens across India.",
  telephone: COMPANY.phoneTel,
  email: COMPANY.email,
  servesCuisine: "Dairy / Ghee",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cole Road, Dighalia Gaon, Dibrugarh Sadar",
    addressLocality: "Dibrugarh",
    addressRegion: "Assam",
    postalCode: "786001",
    addressCountry: "IN",
  },
  makesOffer: PRODUCTS.map((p) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Product", name: p.name, description: p.blurb },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
