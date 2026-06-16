import { CERTIFICATIONS, QUALITY_BADGES, COMPANY } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/motion";
import { ShieldCheck, Check } from "./icons";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="bg-emerald-marble relative isolate overflow-hidden py-20 text-cream sm:py-28"
    >
      <div className="sparkle pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Quality Assurance"
          title="Certified, Lab-Tested & Trusted"
          subtitle="Every batch meets the highest food-safety standards — backed by certifications your business can show with confidence."
        />

        {/* Cert cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.code} delay={i * 0.1}>
              <div className="lift gold-frame group h-full rounded-2xl bg-green-deep/50 p-8 text-center backdrop-blur-sm">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[radial-gradient(circle,#f0d791,#a9801f)] text-green-deep shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <ShieldCheck className="h-10 w-10" strokeWidth={1.6} />
                </div>
                <p className="mt-5 font-[family-name:var(--font-display)] text-xl font-bold text-gold-bright">
                  {c.code}
                </p>
                <p className="mt-1 text-sm font-semibold text-cream">{c.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quality badges */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {QUALITY_BADGES.map((b) => (
              <span
                key={b}
                className="flex items-center gap-2 rounded-full border border-gold/35 bg-green-deep/40 px-4 py-2 text-sm font-medium text-cream/90 transition-colors hover:border-gold hover:text-gold-bright"
              >
                <Check className="h-4 w-4 text-gold" />
                {b}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Trademark note */}
        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-cream/55">
            JS Rani Foods® is a registered trademark (Reg. No. {COMPANY.trademarkNo}, Class 30).
            FSSAI Lic. No. {COMPANY.fssaiMarketed}. Certificates available on request — just ask when
            you enquire.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
