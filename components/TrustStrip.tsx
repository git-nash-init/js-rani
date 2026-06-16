import { STATS } from "@/lib/content";
import { CountUp, Reveal } from "./ui/motion";

const AUDIENCE = [
  "Sweet Shops",
  "Restaurants",
  "Cloud Kitchens",
  "Caterers",
  "Hotels",
  "HORECA Distributors",
  "Halwais & Mithai Makers",
];

export default function TrustStrip() {
  return (
    <section className="relative -mt-px border-y border-gold/25 bg-[linear-gradient(180deg,#f7efda,#efe3c6)]">
      {/* Stats */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-12 sm:px-6 lg:grid-cols-4 lg:py-14">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-gold-metallic sm:text-5xl">
              <CountUp to={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
            </div>
            <p className="mx-auto mt-2 max-w-[12rem] text-sm font-medium text-ink-soft">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Audience marquee */}
      <div className="overflow-hidden border-t border-gold/20 bg-green py-3.5">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-10 pr-10">
          {[...AUDIENCE, ...AUDIENCE].map((a, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap text-sm font-medium uppercase tracking-[0.18em] text-cream/85"
            >
              {a}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
