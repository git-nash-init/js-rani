import type { Metadata } from "next";
import Link from "next/link";
import TryAgainButton from "./TryAgainButton";

export const metadata: Metadata = {
  title: "Payment Failed | JS Rani Foods®",
  description: "Your payment could not be processed. Please try again or contact us for help.",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{
    txnid?: string;
    error?: string;
  }>;
}

function getFriendlyError(code?: string): string {
  if (!code) return "Your payment could not be processed.";
  if (code === "tampered") return "Payment verification failed (hash mismatch). Please contact us if this persists.";
  if (code === "server_error") return "A server error occurred while processing your payment.";
  if (code === "payment_failed") return "Your payment was declined. Please check your card details and try again.";
  return code.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function OrderFailurePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const txnid = sp.txnid ?? "";
  const error = sp.error ?? "payment_failed";
  const friendlyError = getFriendlyError(error);

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
        <div className="w-full max-w-lg">
          {/* Failure card */}
          <div className="rounded-2xl border border-brand/25 bg-card shadow-[0_24px_60px_-20px_rgba(214,42,52,0.15)] overflow-hidden">
            {/* Header */}
            <div className="bg-brand/5 border-b-4 border-brand px-8 py-10 text-center">
              {/* Alert icon */}
              <div className="mx-auto mb-5 h-20 w-20 rounded-full bg-brand/10 border-4 border-brand/40 flex items-center justify-center">
                <svg className="h-10 w-10 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-green">
                Payment Not Successful
              </h1>
              <p className="mt-2 text-ink-soft text-sm max-w-xs mx-auto">
                {friendlyError}
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-7">
              {/* Transaction ref */}
              {txnid && (
                <div className="rounded-xl bg-cream border border-gold/20 p-4 mb-6 text-sm flex justify-between">
                  <span className="text-ink-soft">Transaction ID</span>
                  <span className="font-mono font-semibold text-green text-xs">{txnid}</span>
                </div>
              )}

              {/* Reassurance */}
              <div className="rounded-xl bg-green/5 border border-green/20 p-4 mb-6 text-sm text-green">
                <p className="font-semibold mb-1">💳 No money was deducted</p>
                <p className="text-ink-soft text-xs">If your account shows a deduction, it will be automatically refunded within 5–7 business days.</p>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <TryAgainButton />
                <a
                  href="https://wa.me/918374667536?text=Hi%2C%20I%20need%20help%20with%20my%20order%20payment."
                  id="whatsapp-help-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full text-green border-green/30"
                >
                  💬 Chat on WhatsApp
                </a>
                <a
                  href="tel:+918374667536"
                  id="call-us-btn"
                  className="btn btn-outline w-full text-green border-green/30"
                >
                  📞 Call Us: +91 83746 67536
                </a>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-ink-soft">
            Or email us at{" "}
            <a href="mailto:marketing@jagadambastore.com" className="text-gold hover:underline">
              marketing@jagadambastore.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
