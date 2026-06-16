import { PROCESS_STEPS } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/motion";

export default function Process() {
  return (
    <section id="process" className="bg-cream-marble relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="How It's Made"
          title="The Traditional Bilona Journey"
          subtitle="No shortcuts, no compromises — the time-honoured method that gives our ghee its golden colour, rich aroma and authentic taste."
        />

        <div className="relative">
          {/* connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent lg:block" />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <li className="group relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border border-gold/40 bg-card shadow-md transition-transform duration-500 group-hover:-translate-y-1">
                    <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-gold-metallic">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-bold text-green">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
