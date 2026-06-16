import { Reveal } from "./motion";
import { Crown } from "../icons";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <div className="brand-rule mb-5">
        <Crown className="h-5 w-5" />
      </div>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.22em] ${
          dark ? "text-gold-bright/90" : "text-gold-deep"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`gold-underline mt-3 inline-block text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem] ${
          dark ? "text-cream" : "text-green"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-7 font-[family-name:var(--font-serif)] text-lg leading-relaxed ${
            dark ? "text-cream/80" : "text-ink-soft"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
