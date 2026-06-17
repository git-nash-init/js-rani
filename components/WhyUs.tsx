"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PRICE_COMPARISON } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/motion";

const MAX = Math.max(...PRICE_COMPARISON.map((p) => p.price));

export default function WhyUs() {
  const reduce = useReducedMotion();
  return (
    <section id="why-us" className="bg-emerald-marble relative isolate overflow-hidden py-20 text-cream sm:py-28">
      <div className="sparkle pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Why Choose Us"
          title="Same Premium Quality. Smarter Price."
          subtitle="It's not just about quality — it's about value for money. Here's how a 15 kg tin of JS Rani Foods ghee compares to the leading brands."
        />

        <div className="grid items-center gap-12 lg:grid-cols-5">
          {/* Bars */}
          <Reveal className="lg:col-span-3">
            <ul className="space-y-4">
              {PRICE_COMPARISON.map((row, i) => {
                const pct = Math.round((row.price / MAX) * 100);
                return (
                  <li key={row.brand} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                    <span
                      className={`w-full text-sm sm:w-40 shrink-0 ${
                        row.us ? "font-bold text-gold-bright" : "text-cream/75"
                      }`}
                    >
                      {row.brand}
                      {row.us && <span className="align-super text-[0.6em]">®</span>}
                    </span>
                    <div className="relative h-9 w-full sm:flex-1 overflow-hidden rounded-full bg-green-deep/60">
                      <motion.div
                        initial={{ width: reduce ? `${pct}%` : "0%" }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                        className={`flex h-full items-center justify-end rounded-full pr-3 text-xs font-bold ${
                          row.us
                            ? "bg-[linear-gradient(90deg,#b78a2c,#f0d791)] text-green-deep"
                            : "bg-green-soft text-cream/80"
                        }`}
                      >
                        ₹{row.price.toLocaleString("en-IN")}
                      </motion.div>
                      {row.us && (
                        <span className="absolute -top-0.5 right-0 hidden -translate-y-full rounded bg-brand px-2 py-0.5 text-[10px] font-bold uppercase text-cream sm:block">
                          Best Value
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-cream/55">
              Indicative bulk prices per 15 kg tin, for comparison only. Brand names belong to their
              respective owners.
            </p>
          </Reveal>

          {/* Savings callout */}
          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="gold-frame rounded-2xl bg-green-deep/50 p-8 text-center backdrop-blur-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-gold-bright">
                Your Savings
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-cream">
                Save up to
              </p>
              <p className="font-[family-name:var(--font-display)] text-6xl font-bold text-gold-metallic">
                ₹5,000
              </p>
              <p className="mt-1 text-sm text-cream/75">per 15 kg tin vs leading brands</p>
              <div className="my-6 h-px bg-gold/20" />
              <p className="font-[family-name:var(--font-serif)] text-lg italic text-cream/90">
                More profit for your kitchen — with the same premium, certified quality.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
