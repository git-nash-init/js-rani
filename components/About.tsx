import Image from "next/image";
import { ABOUT } from "@/lib/content";
import { Reveal } from "./ui/motion";
import { Crown } from "./icons";

export default function About() {
  return (
    <section id="about" className="bg-cream-marble relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="gold-frame overflow-hidden rounded-[1.75rem] shadow-[0_30px_70px_-35px_rgba(12,42,31,0.6)]">
              <Image
                src="/brand/about.png"
                alt="JS Rani Foods — pure cow ghee, HACCP & ISO 22000 certified"
                width={1141}
                height={642}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-4 -top-4 hidden rotate-3 rounded-2xl bg-green px-5 py-4 text-center shadow-xl sm:block">
              <span className="block font-[family-name:var(--font-display)] text-2xl font-bold text-gold-bright">
                Bilona
              </span>
              <span className="text-[11px] uppercase tracking-wide text-cream/80">
                Hand-Churned
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
            <Crown className="h-4 w-4" /> About JS Rani Foods
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-green sm:text-4xl">
            {ABOUT.heading}
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-soft">
            {ABOUT.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <blockquote className="mt-8 border-l-4 border-gold pl-5 font-[family-name:var(--font-serif)] text-xl italic text-green">
            “{ABOUT.pull}”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
