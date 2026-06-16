"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HERO } from "@/lib/content";
import { ArrowRight, Crown, Check } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

// Deterministic particle positions (avoid SSR/CSR hydration mismatch)
const PARTICLES = [
  { left: "8%", top: "22%", s: 6, d: 0 },
  { left: "18%", top: "70%", s: 4, d: 1.2 },
  { left: "30%", top: "12%", s: 5, d: 2.1 },
  { left: "44%", top: "82%", s: 3, d: 0.6 },
  { left: "62%", top: "18%", s: 5, d: 1.7 },
  { left: "73%", top: "64%", s: 7, d: 0.3 },
  { left: "86%", top: "30%", s: 4, d: 2.4 },
  { left: "92%", top: "76%", s: 5, d: 1.0 },
  { left: "54%", top: "40%", s: 3, d: 3.0 },
  { left: "12%", top: "46%", s: 4, d: 2.7 },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section
      id="home"
      className="bg-emerald-marble relative isolate overflow-hidden text-cream"
    >
      {/* texture + sparkle */}
      <div className="sparkle pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_40%,rgba(8,30,22,0.6))]" />

      {/* gold filigree corners */}
      <CornerFlourish className="absolute left-0 top-0 h-28 w-28 text-gold/40 sm:h-40 sm:w-40" />
      <CornerFlourish className="absolute right-0 top-0 h-28 w-28 -scale-x-100 text-gold/40 sm:h-40 sm:w-40" />

      {/* floating gold particles */}
      {!reduce &&
        PARTICLES.map((p, i) => (
          <span
            key={i}
            className="animate-[float_7s_ease-in-out_infinite] pointer-events-none absolute rounded-full bg-gold-bright/70 blur-[0.5px]"
            style={{
              left: p.left,
              top: p.top,
              width: p.s,
              height: p.s,
              animationDelay: `${p.d}s`,
              boxShadow: "0 0 10px 2px rgba(236,208,137,0.5)",
            }}
          />
        ))}

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-20">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.p
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-green-deep/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-bright"
          >
            <Crown className="h-4 w-4" />
            {HERO.eyebrow}
          </motion.p>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            <span className="text-gold-metallic">Pure Desi Ghee,</span>
            <br />
            <span className="text-cream">Made the Traditional</span>{" "}
            <span className="text-cream">Bilona Way</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.28)}
            className="mt-6 max-w-xl font-[family-name:var(--font-serif)] text-lg leading-relaxed text-cream/85 sm:text-xl"
          >
            {HERO.subtitle}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn btn-gold text-base">
              Enquire Now
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#products" className="btn btn-outline text-base">
              Explore Our Ghee
            </a>
          </motion.div>

          <motion.ul {...fadeUp(0.52)} className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {HERO.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-cream/80">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gold/20 text-gold-bright">
                  <Check className="h-3 w-3" />
                </span>
                {h}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Product medallion */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="relative mx-auto w-full max-w-md lg:col-span-5"
        >
          <div className="animate-[float_7s_ease-in-out_infinite]">
            <div className="gold-frame relative overflow-hidden rounded-[2rem] bg-green-deep shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
              <Image
                src="/products/cow-ghee.png"
                alt="JS Rani Foods premium cow ghee tin"
                width={840}
                height={1250}
                priority
                className="h-auto w-full"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-green-deep/40 to-transparent" />
            </div>

            {/* floating gold seal */}
            <div className="absolute -bottom-6 -left-5 grid h-28 w-28 place-items-center rounded-full bg-[radial-gradient(circle,#f0d791,#b78a2c)] text-center shadow-2xl ring-4 ring-cream/20 sm:-left-8">
              <div className="leading-tight text-green-deep">
                <span className="block font-[family-name:var(--font-display)] text-xl font-bold">100%</span>
                <span className="block text-[10px] font-semibold uppercase tracking-wide">Natural Ghee</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* bottom fade into next (cream) section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-cream/0" />
    </section>
  );
}

function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" aria-hidden>
      <path
        d="M4 4h60M4 4v60M14 14c40 0 92 8 120 36M14 14c0 40 8 92 36 120M4 30c30 4 56 18 76 42M30 4c4 30 18 56 42 76"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="3.4" fill="currentColor" />
    </svg>
  );
}
