"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/content";
import { Menu, Close, ArrowRight } from "./icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 shadow-[0_8px_30px_-12px_rgba(12,42,31,0.35)] backdrop-blur-md"
          : "bg-green-deep/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="group flex items-center gap-3" aria-label="JS Rani Foods home">
          <Logo size={scrolled ? 48 : 54} priority className="transition-all duration-500" />
          <span className="hidden flex-col leading-none sm:flex">
            <span
              className={`font-[family-name:var(--font-display)] text-base font-bold tracking-wide transition-colors duration-500 ${
                scrolled ? "text-green" : "text-cream"
              }`}
            >
              JS RANI FOODS<span className="align-super text-[0.6em] text-gold">®</span>
            </span>
            <span
              className={`font-[family-name:var(--font-serif)] text-[12px] italic transition-colors duration-500 ${
                scrolled ? "text-ink-soft" : "text-gold-bright/90"
              }`}
            >
              Pure Desi Ghee Since Generations
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`group relative text-sm font-medium tracking-wide transition-colors ${
                  scrolled ? "text-ink hover:text-brand" : "text-cream hover:text-gold-bright"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-gold hidden text-sm sm:inline-flex">
            Enquire Now
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`lg:hidden ${scrolled ? "text-green" : "text-cream"}`}
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-emerald-marble lg:hidden"
          >
            <div className="sparkle pointer-events-none absolute inset-0" />
            <div className="relative flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <Logo size={48} />
                <span className="font-[family-name:var(--font-display)] text-base font-bold text-cream">
                  JS RANI FOODS<span className="align-super text-[0.6em] text-gold">®</span>
                </span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-cream"
              >
                <Close className="h-7 w-7" />
              </button>
            </div>
            <ul className="relative mt-6 flex flex-col gap-1 px-6">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-gold/15 py-4 font-[family-name:var(--font-serif)] text-2xl text-cream transition-colors hover:text-gold-bright"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-8 px-6">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn-gold w-full text-base"
              >
                Enquire Now
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
