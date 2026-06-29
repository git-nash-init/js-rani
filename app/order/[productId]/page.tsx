"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/lib/content";
import {
  PRODUCT_VARIANTS,
  GST_RATE,
  computeTotal,
  formatINR,
} from "@/lib/pricing";

/* ──────────────────────────────────────────────────────────── */
/*  Types                                                        */
/* ──────────────────────────────────────────────────────────── */
interface FormState {
  name: string;
  phone: string;
  email: string;
  company: string;
  address: string;
  pincode: string;
  state: string;
}

/* ──────────────────────────────────────────────────────────── */
/*  Indian states for dropdown                                   */
/* ──────────────────────────────────────────────────────────── */
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

/* ──────────────────────────────────────────────────────────── */
/*  Page Component                                               */
/* ──────────────────────────────────────────────────────────── */
export default function OrderPage() {
  const params = useParams<{ productId: string }>();
  const productId = params?.productId ?? "";

  const product = PRODUCTS.find((p) => p.id === productId);
  const variants = PRODUCT_VARIANTS[productId] ?? [];

  /* ── State ── */
  const [selectedSize, setSelectedSize] = useState(variants[0]?.size ?? "");
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", email: "", company: "",
    address: "", pincode: "", state: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hiddenFormRef = useRef<HTMLFormElement>(null);

  /* ── 404-style guard ── */
  if (!product || variants.length === 0) {
    return (
      <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-5 text-center">
        <p className="text-6xl mb-6">🫙</p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-green mb-3">
          Product Not Found
        </h1>
        <p className="text-ink-soft mb-8">
          We couldn&apos;t find that product. Please go back and try again.
        </p>
        <Link href="/#products" className="btn btn-gold">
          ← View Our Products
        </Link>
      </main>
    );
  }

  const selectedVariant = variants.find((v) => v.size === selectedSize) ?? variants[0];
  const { base, gst, total } = computeTotal(selectedVariant.price, qty);

  /* ── Form helpers ── */
  function handleField(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  /* ── Submit → PayU ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/payu/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          size: selectedVariant.size,
          qty,
          name: form.name,
          phone: form.phone,
          email: form.email,
          company: form.company,
          address: form.address,
          pincode: form.pincode,
          state: form.state,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to initiate payment");
      }

      const { paymentUrl, formData } = await res.json() as {
        paymentUrl: string;
        formData: Record<string, string>;
      };

      /* Inject hidden form and auto-submit to PayU */
      if (!hiddenFormRef.current) return;
      const form_ = hiddenFormRef.current;
      form_.action = paymentUrl;
      form_.method = "POST";

      // Clear old inputs
      form_.innerHTML = "";
      Object.entries(formData).forEach(([k, v]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = v;
        form_.appendChild(input);
      });

      form_.submit();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  /* ── Render ── */
  return (
    <main className="min-h-screen bg-cream">
      {/* Hidden PayU form */}
      <form ref={hiddenFormRef} style={{ display: "none" }} />

      {/* ── Top nav strip ── */}
      <nav className="sticky top-0 z-50 bg-green-deep/95 backdrop-blur-sm border-b border-gold/20">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-display)] text-lg font-bold text-gold">
            JS Rani Foods®
          </Link>
          <Link href="/#products" className="text-sm text-cream/70 hover:text-gold transition-colors">
            ← Back to Products
          </Link>
        </div>
      </nav>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[3px] text-gold font-semibold mb-2">
            Secure Checkout
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-green">
            Order {product.name}
          </h1>
          <p className="mt-3 text-ink-soft max-w-xl mx-auto text-sm">
            Fill in your details below. You'll be redirected to PayU's secure
            payment page to complete your purchase.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* ─────────────── LEFT — Product config ─────────────── */}
            <div className="space-y-6">
              {/* Product card */}
              <div className="rounded-2xl border border-gold/25 bg-card shadow-[0_18px_44px_-30px_rgba(12,42,31,0.5)] overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={product.image}
                    alt={`JS Rani Foods ${product.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-deep/60 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="rounded-full bg-[linear-gradient(180deg,#f0d791,#b78a2c)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-green-deep shadow-md">
                      {product.accent}
                    </span>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                      {product.name}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-ink-soft leading-relaxed">{product.blurb}</p>
                </div>
              </div>

              {/* Size selector */}
              <div className="rounded-2xl border border-gold/25 bg-card shadow-[0_18px_44px_-30px_rgba(12,42,31,0.5)] p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-green mb-4">
                  Select Pack Size
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {variants.map((v) => (
                    <button
                      key={v.size}
                      type="button"
                      onClick={() => setSelectedSize(v.size)}
                      className={`
                        relative rounded-xl border-2 p-4 text-left transition-all duration-200
                        ${selectedSize === v.size
                          ? "border-gold bg-green-deep/5 shadow-[0_0_0_3px_rgba(201,162,75,0.2)]"
                          : "border-gold/20 bg-white hover:border-gold/50"
                        }
                      `}
                    >
                      {selectedSize === v.size && (
                        <span className="absolute top-3 right-3 h-5 w-5 rounded-full bg-gold flex items-center justify-center">
                          <svg className="h-3 w-3 text-green-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                      <p className="font-semibold text-green text-sm">{v.label}</p>
                      <p className="text-[11px] text-ink-soft mt-0.5">{v.container}</p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-xl font-bold text-green">{formatINR(v.price)}</span>
                        <span className="text-sm line-through text-ink-soft/60">{formatINR(v.mrp)}</span>
                      </div>
                      <p className="text-[10px] text-gold font-semibold mt-0.5">+ 5% GST</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity stepper */}
              <div className="rounded-2xl border border-gold/25 bg-card shadow-[0_18px_44px_-30px_rgba(12,42,31,0.5)] p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-green mb-4">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="h-11 w-11 rounded-full border-2 border-gold/40 flex items-center justify-center text-green font-bold text-xl hover:bg-gold/10 transition-colors disabled:opacity-40"
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-2xl font-bold text-green">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    className="h-11 w-11 rounded-full border-2 border-gold/40 flex items-center justify-center text-green font-bold text-xl hover:bg-gold/10 transition-colors disabled:opacity-40"
                    disabled={qty >= 20}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <span className="text-sm text-ink-soft">max 20 units per order</span>
                </div>
              </div>

              {/* Order summary */}
              <div className="rounded-2xl border border-gold/25 bg-green-deep text-white shadow-[0_18px_44px_-30px_rgba(12,42,31,0.7)] p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-gold mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">
                      {selectedVariant.label} × {qty}
                    </span>
                    <span className="font-semibold">{formatINR(base)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">GST (5%)</span>
                    <span className="font-semibold">{formatINR(gst)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gold/30 pt-3">
                    <span className="text-gold font-bold text-base">Total Payable</span>
                    <span className="text-gold font-bold text-xl">{formatINR(total)}</span>
                  </div>
                </div>
                <p className="mt-4 text-[11px] text-white/50">
                  * GST @{GST_RATE * 100}% is charged on the bulk price. MRP shown is retail price.
                </p>
              </div>
            </div>

            {/* ─────────────── RIGHT — Customer form ─────────────── */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-gold/25 bg-card shadow-[0_18px_44px_-30px_rgba(12,42,31,0.5)] p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-green mb-5">
                  Delivery Details
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="order-name" className="block text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1.5">
                      Full Name <span className="text-brand">*</span>
                    </label>
                    <input
                      id="order-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Rajesh Sharma"
                      value={form.name}
                      onChange={handleField}
                      className="field"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="order-phone" className="block text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1.5">
                      Phone Number <span className="text-brand">*</span>
                    </label>
                    <input
                      id="order-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleField}
                      className="field"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="order-email" className="block text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1.5">
                      Email Address <span className="text-brand">*</span>
                    </label>
                    <input
                      id="order-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@restaurant.com"
                      value={form.email}
                      onChange={handleField}
                      className="field"
                    />
                  </div>

                  {/* Company (optional) */}
                  <div>
                    <label htmlFor="order-company" className="block text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1.5">
                      Company / Kitchen Name <span className="text-ink-soft/50 text-[10px] normal-case font-normal">(optional)</span>
                    </label>
                    <input
                      id="order-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Spice Route Cloud Kitchen"
                      value={form.company}
                      onChange={handleField}
                      className="field"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="order-address" className="block text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1.5">
                      Delivery Address <span className="text-brand">*</span>
                    </label>
                    <textarea
                      id="order-address"
                      name="address"
                      required
                      rows={3}
                      autoComplete="street-address"
                      placeholder="Shop No. 12, Main Market, ..."
                      value={form.address}
                      onChange={handleField}
                      className="field resize-none"
                    />
                  </div>

                  {/* Pincode + State */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="order-pincode" className="block text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1.5">
                        Pincode <span className="text-brand">*</span>
                      </label>
                      <input
                        id="order-pincode"
                        name="pincode"
                        type="text"
                        required
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        autoComplete="postal-code"
                        placeholder="786001"
                        value={form.pincode}
                        onChange={handleField}
                        className="field"
                      />
                    </div>
                    <div>
                      <label htmlFor="order-state" className="block text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1.5">
                        State <span className="text-brand">*</span>
                      </label>
                      <select
                        id="order-state"
                        name="state"
                        required
                        value={form.state}
                        onChange={handleField}
                        className="field"
                      >
                        <option value="">Select state</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="rounded-xl border border-gold/15 bg-card/60 p-4 flex flex-wrap gap-3">
                {["🔒 Secure Payment", "✅ GST Invoice Included", "🚚 7–10 Day Delivery", "📦 FSSAI Certified"].map((badge) => (
                  <span key={badge} className="text-[11px] font-semibold text-ink-soft bg-white rounded-full px-3 py-1 border border-gold/20">
                    {badge}
                  </span>
                ))}
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-xl bg-brand/10 border border-brand/30 p-4 text-sm text-brand font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* CTA Button — sticks on mobile */}
              <div className="sticky bottom-5 z-10 lg:static">
                <button
                  type="submit"
                  id="proceed-to-pay-btn"
                  disabled={loading}
                  className="btn btn-gold w-full text-base py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Redirecting to PayU…
                    </>
                  ) : (
                    <>
                      Proceed to Pay {formatINR(total)}
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="mt-2 text-center text-[11px] text-ink-soft">
                  Powered by PayU · 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
