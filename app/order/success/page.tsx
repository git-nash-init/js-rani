import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Order Confirmed | JS Rani Foods®",
  description: "Your JS Rani Foods order has been confirmed. We'll deliver within 7–10 business days.",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{
    txnid?: string;
    amount?: string;
    name?: string;
    product?: string;
    size?: string;
    qty?: string;
    mihpayid?: string;
  }>;
}

export default async function OrderSuccessPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const txnid = sp.txnid ?? "";
  const amount = sp.amount ?? "0";
  const name = sp.name ?? "";
  const product = sp.product ?? "";
  const size = sp.size ?? "";
  const qty = sp.qty ?? "1";
  const mihpayid = sp.mihpayid ?? "";

  const totalNum = parseFloat(amount);
  const gstAmount = Math.round(totalNum - totalNum / 1.05);
  const baseAmount = totalNum - gstAmount;

  function formatINR(n: number) {
    return `₹${n.toLocaleString("en-IN")}`;
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col">
      {/* Nav */}
      <nav className="bg-green-deep border-b border-gold/20">
        <div className="mx-auto max-w-5xl px-5 h-16 flex items-center">
          <Link href="/" className="font-[family-name:var(--font-display)] text-lg font-bold text-gold">
            JS Rani Foods®
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-2xl">
          {/* ── Success card ── */}
          <div className="rounded-2xl border border-gold/25 bg-card shadow-[0_24px_60px_-20px_rgba(12,42,31,0.35)] overflow-hidden">
            {/* Header */}
            <div className="bg-green-deep px-8 py-10 text-center border-b-4 border-gold">
              {/* Animated checkmark */}
              <div className="mx-auto mb-5 h-20 w-20 rounded-full bg-emerald-600/20 border-4 border-emerald-400 flex items-center justify-center" style={{ animation: "scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards" }}>
                <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                Order Confirmed!
              </h1>
              {name && (
                <p className="mt-2 text-white/70 text-base">
                  Thank you, <strong className="text-gold">{name}</strong>. Your ghee is on its way!
                </p>
              )}
            </div>

            {/* Invoice table */}
            <div className="px-8 py-7">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-green mb-4">
                Order Invoice
              </h2>

              <table className="w-full text-sm mb-6">
                <tbody>
                  <tr className="border-b border-gold/15">
                    <td className="py-3 text-ink-soft">Product</td>
                    <td className="py-3 font-semibold text-green text-right">{product || "—"}</td>
                  </tr>
                  <tr className="border-b border-gold/15">
                    <td className="py-3 text-ink-soft">Pack Size</td>
                    <td className="py-3 font-semibold text-green text-right">{size || "—"}</td>
                  </tr>
                  <tr className="border-b border-gold/15">
                    <td className="py-3 text-ink-soft">Quantity</td>
                    <td className="py-3 font-semibold text-green text-right">{qty} unit{Number(qty) > 1 ? "s" : ""}</td>
                  </tr>
                  <tr className="border-b border-gold/15">
                    <td className="py-3 text-ink-soft">Base Price</td>
                    <td className="py-3 font-semibold text-green text-right">{formatINR(baseAmount)}</td>
                  </tr>
                  <tr className="border-b border-gold/15">
                    <td className="py-3 text-ink-soft">GST (5%)</td>
                    <td className="py-3 font-semibold text-green text-right">{formatINR(gstAmount)}</td>
                  </tr>
                  <tr className="bg-green-deep/5 rounded-lg">
                    <td className="py-4 px-3 font-bold text-green text-base rounded-l-lg">Total Paid</td>
                    <td className="py-4 px-3 font-bold text-gold text-xl text-right rounded-r-lg">{formatINR(totalNum)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Reference numbers */}
              {(txnid || mihpayid) && (
                <div className="rounded-xl bg-cream border border-gold/20 p-4 mb-6 text-sm space-y-2">
                  {txnid && (
                    <div className="flex justify-between">
                      <span className="text-ink-soft">Transaction ID</span>
                      <span className="font-mono font-semibold text-green text-xs">{txnid}</span>
                    </div>
                  )}
                  {mihpayid && (
                    <div className="flex justify-between">
                      <span className="text-ink-soft">PayU Reference</span>
                      <span className="font-mono font-semibold text-green text-xs">{mihpayid}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Delivery info */}
              <div className="rounded-xl bg-green/5 border border-green/20 p-4 mb-6 flex gap-3">
                <span className="text-2xl">🚚</span>
                <div>
                  <p className="font-semibold text-green text-sm">Estimated Delivery: 7–10 Business Days</p>
                  <p className="text-ink-soft text-xs mt-1">Your order will be dispatched by our delivery partner. A tracking link will be sent to your email once shipped.</p>
                </div>
              </div>

              {/* Email sent note */}
              <div className="rounded-xl bg-gold/10 border border-gold/20 p-4 mb-6 text-sm text-green">
                📧 A confirmation email has been sent to your inbox with the full invoice.
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <PrintButton />
                <Link href="/" id="back-to-home-btn" className="btn btn-gold flex-1">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Help note */}
          <p className="mt-6 text-center text-sm text-ink-soft">
            Questions?{" "}
            <a href="mailto:marketing@jagadambastore.com" className="text-gold hover:underline">
              marketing@jagadambastore.com
            </a>{" "}
            or{" "}
            <a href="https://wa.me/918374667536" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </main>
  );
}
