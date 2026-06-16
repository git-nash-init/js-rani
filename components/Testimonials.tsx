"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Quote, Star, ChevronLeft, ChevronRight } from "./icons";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();
  const len = TESTIMONIALS.length;

  const paginate = useCallback(
    (d: number) => setState(([i]) => [(i + d + len) % len, d]),
    [len]
  );

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => paginate(1), 6500);
    return () => clearInterval(t);
  }, [paginate, reduce]);

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Loved by Kitchens"
          title="What Our Customers Say"
          subtitle="From bustling sweet shops to busy cloud kitchens — here's why they keep coming back."
        />

        <div className="relative">
          <div className="relative min-h-[20rem] sm:min-h-[17rem]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={reduce ? false : { opacity: 0, x: dir >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir >= 0 ? -60 : 60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="gold-frame absolute inset-0 flex flex-col rounded-2xl bg-card p-8 shadow-[0_18px_44px_-30px_rgba(12,42,31,0.5)] sm:p-10"
              >
                <Quote className="h-10 w-10 text-gold/60" />
                <blockquote className="mt-4 flex-1 font-[family-name:var(--font-serif)] text-xl leading-relaxed text-ink sm:text-2xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green font-[family-name:var(--font-display)] font-bold text-gold-bright">
                    {initials(t.name)}
                  </span>
                  <div>
                    <div className="flex gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5" />
                      ))}
                    </div>
                    <p className="mt-1 font-semibold text-green">{t.name}</p>
                    <p className="text-sm text-ink-soft">
                      {t.role} · {t.city}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => paginate(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-green transition-colors hover:bg-green hover:text-cream"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-7 bg-gold" : "w-2.5 bg-gold/30 hover:bg-gold/60"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => paginate(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-green transition-colors hover:bg-green hover:text-cream"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
