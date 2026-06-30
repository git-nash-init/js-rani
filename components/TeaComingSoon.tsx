import { TEAS } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/motion";
import { TeaCup } from "./icons";

export default function TeaComingSoon() {
  return (
    <section
      id="teas"
      className="bg-emerald-marble relative overflow-hidden py-20 sm:py-28"
    >
      {/* gold sparkle wash */}
      <div className="sparkle pointer-events-none absolute inset-0" />
      {/* top & bottom gold hairlines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          dark
          eyebrow="From the Heart of Assam · Coming Soon"
          title="A Premium Tea Range, Brewing"
          subtitle="Rooted in Dibrugarh — the soul of Assam's tea country — we're crafting a curated selection of fine teas to sit beside our pure ghee. A first taste of what's on the horizon."
        />

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {TEAS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1}>
              <article className="lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/25 bg-green-soft/30 p-7 text-center backdrop-blur-sm">
                {/* Coming Soon ribbon */}
                <span className="absolute right-4 top-4 rounded-full border border-gold/40 bg-green-deep/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-bright">
                  Coming Soon
                </span>

                {/* leaf / liquor swatch */}
                <span
                  className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full ring-1 ring-gold/30 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${t.dot}, ${t.dot}99 60%, transparent)`,
                  }}
                >
                  <TeaCup className="h-7 w-7 text-cream" />
                </span>

                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-cream">
                  {t.name}
                </h3>

                <span className="brand-rule my-4">
                  <span className="h-1 w-1 rotate-45 bg-gold" />
                </span>

                <p className="font-[family-name:var(--font-serif)] text-[15px] leading-relaxed text-cream/75">
                  {t.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="font-[family-name:var(--font-serif)] text-lg italic text-cream/80">
            Want first access when our teas launch?
          </p>
          <a href="#contact" className="btn btn-outline mt-4 text-base">
            Notify Me at Launch
          </a>
        </Reveal>
      </div>
    </section>
  );
}
