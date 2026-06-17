"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise into view, once. */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Number that counts up the first time it scrolls into view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(val).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export { motion, useReducedMotion };
