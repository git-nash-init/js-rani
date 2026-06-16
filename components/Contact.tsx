"use client";

import { useState, type FormEvent } from "react";
import { COMPANY } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/motion";
import { Phone, Mail, MapPin, WhatsApp, Check, ArrowRight } from "./icons";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — silently succeed for bots.
    if (data.botcheck) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New website enquiry from ${data.name || "a visitor"} — JS Rani Foods`,
          from_name: "JS Rani Foods Website",
          name: data.name,
          mobile: data.mobile,
          email: data.email || "Not provided",
          message: data.message,
          replyto: data.email || undefined,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or reach us directly.");
    }
  }

  return (
    <section
      id="contact"
      className="bg-emerald-marble relative isolate overflow-hidden py-20 text-cream sm:py-28"
    >
      <div className="sparkle pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Get in Touch"
          title="Raise a Query — We'll Reply Fast"
          subtitle="For orders, bulk pricing or any question, drop us a message. Our team gets back quickly with quotes and certificates."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact details */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
              <ContactItem
                icon={<Phone className="h-5 w-5" />}
                label="Call / WhatsApp"
                value={COMPANY.phoneDisplay}
                href={`tel:${COMPANY.phoneTel}`}
              />
              <ContactItem
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={COMPANY.email}
                href={`mailto:${COMPANY.email}`}
              />
              <ContactItem
                icon={<MapPin className="h-5 w-5" />}
                label="Visit / Write to Us"
                value={COMPANY.addressLines.join(", ")}
              />
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  "Hello JS Rani Foods, I'd like to enquire about your ghee."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-auto bg-[#25D366] text-white hover:brightness-105"
              >
                <WhatsApp className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.12} className="lg:col-span-3">
            <div className="gold-frame rounded-2xl bg-card p-7 text-ink shadow-2xl sm:p-9">
              {status === "success" ? (
                <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-green text-cream">
                    <Check className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold text-green">
                    Thank You!
                  </h3>
                  <p className="mt-2 max-w-sm text-ink-soft">
                    Your enquiry has reached us. Our team will get back to you shortly — usually
                    within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="btn btn-gold mt-6 text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                  {/* honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <Field label="Your Name" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="e.g. Rajesh Agarwal"
                      className="field"
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Mobile Number" htmlFor="mobile">
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        required
                        inputMode="tel"
                        pattern="[0-9+\-\s]{7,15}"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        className="field"
                      />
                    </Field>
                    <Field label="Email (optional)" htmlFor="email">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="field"
                      />
                    </Field>
                  </div>

                  <Field label="Your Message" htmlFor="message">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us what you need — product, quantity, city for delivery…"
                      className="field resize-none"
                    />
                  </Field>

                  {status === "error" && (
                    <p className="rounded-lg bg-brand/10 px-4 py-3 text-sm text-brand-dark">
                      {errorMsg}{" "}
                      <a className="font-semibold underline" href={`mailto:${COMPANY.email}`}>
                        Email us directly
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn btn-gold w-full text-base disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? "Sending…" : "Send Enquiry"}
                    {status !== "submitting" && <ArrowRight className="h-5 w-5" />}
                  </button>
                  <p className="text-center text-xs text-ink-soft">
                    By submitting, you agree to be contacted about your enquiry. We never share your
                    details.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="gold-frame flex items-start gap-4 rounded-xl bg-green-deep/40 p-5 backdrop-blur-sm transition-colors hover:bg-green-deep/60">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-bright">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-bright/80">{label}</p>
        <p className="mt-1 leading-relaxed text-cream/90">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-semibold text-green">{label}</span>
      {children}
    </label>
  );
}
