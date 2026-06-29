import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/motion";
import { Check, ArrowRight } from "./icons";

export default function Products() {
  return (
    <section id="products" className="relative bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Our Range"
          title="Pure Ghee for Every Kitchen"
          subtitle="Three premium variants, each crafted from the finest milk of grass-fed indigenous cows — available in convenient HORECA pack sizes."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <article className="lift group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/25 bg-card shadow-[0_18px_44px_-30px_rgba(12,42,31,0.5)]">
                {/* Image */}
                <div className="bg-green-deep relative aspect-video overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`JS Rani Foods ${p.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-deep/35 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[linear-gradient(180deg,#f0d791,#b78a2c)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-green-deep shadow-md">
                    {p.accent}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-green">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{p.blurb}</p>

                  <ul className="mt-5 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/10 text-green">
                          <Check className="h-3 w-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-gold/15 pt-5">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-ink-soft">Available in</p>
                      <p className="font-semibold text-green">{p.sizes}</p>
                    </div>
                    <Link
                      href={`/order/${p.id}`}
                      aria-label={`Order ${p.name}`}
                      className="grid h-11 w-11 place-items-center rounded-full bg-green text-cream transition-all duration-300 group-hover:bg-brand group-hover:shadow-lg"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="font-[family-name:var(--font-serif)] text-lg italic text-ink-soft">
            Need a custom quote for bulk or HORECA supply?
          </p>
          <a href="#contact" className="btn btn-gold mt-4 text-base">
            Request Bulk Pricing
            <ArrowRight className="h-5 w-5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
