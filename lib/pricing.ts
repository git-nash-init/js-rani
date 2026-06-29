export type ProductVariant = {
  label: string;
  size: string;
  container: string;
  mrp: number;
  price: number; // bulk price excl. GST
};

export const PRODUCT_VARIANTS: Record<string, ProductVariant[]> = {
  "cow-ghee": [
    { label: "5 kg Tin Pack", size: "5kg", container: "Tin Pack", mrp: 4050, price: 1 },
    { label: "15 kg Tin Pack", size: "15kg", container: "Tin Pack", mrp: 12500, price: 7000 },
  ],
  "a2-cow-ghee": [
    { label: "5 kg Tin Pack", size: "5kg", container: "Tin Pack", mrp: 7000, price: 4500 },
    { label: "15 kg Tin Pack", size: "15kg", container: "Tin Pack", mrp: 19500, price: 14500 },
  ],
  "organic-ghee": [
    // UPDATE THESE PRICES once confirmed
    { label: "5 kg Plastic Container", size: "5kg", container: "Plastic Container", mrp: 4500, price: 3200 },
  ],
};

export const GST_RATE = 0.05;

export function computeTotal(price: number, qty: number) {
  const base = price * qty;
  const gst = Math.round(base * GST_RATE);
  const total = base + gst;
  return { base, gst, total };
}

export function formatAmount(amount: number): string {
  return amount.toFixed(2);
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
