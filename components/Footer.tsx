import Logo from "./Logo";
import { COMPANY, NAV_LINKS, PRODUCTS } from "@/lib/content";
import { Phone, Mail, MapPin, WhatsApp } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-green-deep text-cream/75">
      <div className="sparkle pointer-events-none absolute" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Logo size={58} />
              <span className="font-[family-name:var(--font-display)] text-lg font-bold text-cream">
                JS RANI FOODS<span className="align-super text-[0.6em] text-gold">®</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm font-[family-name:var(--font-serif)] text-[17px] leading-relaxed text-cream/70">
              Premium cow ghee, A2 cow ghee and pure organic ghee — crafted the traditional bilona
              way for HORECA kitchens, sweet makers and commercial buyers across India.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["FSSAI", "HACCP", "ISO 22000"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-gold/30 px-3 py-1 text-xs font-medium tracking-wide text-gold-bright"
                >
                  {c} Certified
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.18em] text-gold">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-gold-bright">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h3 className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.18em] text-gold">
              Our Ghee
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <a href="#products" className="transition-colors hover:text-gold-bright">
                    {p.name}
                  </a>
                  <span className="block text-xs text-cream/45">{p.sizes}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.18em] text-gold">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-gold" />
                <span className="leading-relaxed">{COMPANY.addressLines.join(", ")}</span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phoneTel}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold-bright"
                >
                  <Phone className="h-5 w-5 shrink-0 text-gold" />
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 break-all transition-colors hover:text-gold-bright"
                >
                  <Mail className="h-5 w-5 shrink-0 text-gold" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-gold-bright"
                >
                  <WhatsApp className="h-5 w-5 shrink-0 text-gold" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance line */}
        <div className="mt-12 border-t border-gold/15 pt-8 text-xs leading-relaxed text-cream/50">
          <p>
            Marketed by JS Rani Foods, {COMPANY.legalName} — FSSAI Lic. No. {COMPANY.fssaiMarketed}.
            Trademark Reg. No. {COMPANY.trademarkNo} (Class 30).
          </p>
          <div className="mt-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p>© {year} JS Rani Foods®. All rights reserved.</p>
            <p className="font-[family-name:var(--font-serif)] italic text-gold/70">
              Pure. Premium. Trusted by commercial kitchens across India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
