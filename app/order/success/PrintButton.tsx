"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      id="print-invoice-btn"
      className="btn btn-outline flex-1 text-green border-green/30"
    >
      🖨️ Print Invoice
    </button>
  );
}
