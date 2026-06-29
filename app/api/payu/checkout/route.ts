import { NextRequest, NextResponse } from "next/server";
import { PRODUCT_VARIANTS, GST_RATE } from "@/lib/pricing";
import { PRODUCTS } from "@/lib/content";
import { generatePayuHash, getPayuUrl, type PayuParams } from "@/lib/payu";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, size, qty, name, phone, email, address, pincode, state, company } = body;

    // --- Validate required fields ---
    const missing: string[] = [];
    if (!productId) missing.push("productId");
    if (!size) missing.push("size");
    if (!qty || qty < 1) missing.push("qty");
    if (!name?.trim()) missing.push("name");
    if (!phone?.trim()) missing.push("phone");
    if (!email?.trim()) missing.push("email");
    if (!address?.trim()) missing.push("address");
    if (!pincode?.trim()) missing.push("pincode");
    if (!state?.trim()) missing.push("state");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", fields: missing },
        { status: 400 }
      );
    }

    // --- Look up product ---
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const variants = PRODUCT_VARIANTS[productId];
    if (!variants) {
      return NextResponse.json(
        { error: "Product variants not found" },
        { status: 404 }
      );
    }

    const variant = variants.find((v) => v.size === size);
    if (!variant) {
      return NextResponse.json({ error: "Size not found" }, { status: 400 });
    }

    // --- Compute total with 5% GST ---
    const quantity = Number(qty);
    const base = variant.price * quantity;
    const gst = Math.round(base * GST_RATE);
    const total = base + gst;
    const amountStr = total.toFixed(2);

    // --- Generate transaction ID ---
    const txnid = `JSR${Date.now()}`;

    // --- Build product info string ---
    const productinfo = `${product.name} ${variant.label} x${quantity}`;

    // --- PayU credentials ---
    const key = process.env.PAYU_KEY ?? "";
    const salt = process.env.PAYU_SALT ?? "";

    if (!key || !salt) {
      console.error("PayU credentials not configured");
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 503 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const params: PayuParams = {
      key,
      txnid,
      amount: amountStr,
      productinfo,
      firstname: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      surl: `${baseUrl}/api/payu/success`,
      furl: `${baseUrl}/api/payu/failure`,
      udf1: size,
      udf2: String(quantity),
      udf3: company?.trim() ?? "",
      udf4: `${address.trim()}, ${state.trim()} - ${pincode.trim()}`,
      udf5: productId,
    };

    const hash = generatePayuHash(params, salt);
    const paymentUrl = getPayuUrl();

    const formData: Record<string, string> = {
      key,
      txnid,
      amount: amountStr,
      productinfo,
      firstname: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      surl: params.surl,
      furl: params.furl,
      udf1: params.udf1 ?? "",
      udf2: params.udf2 ?? "",
      udf3: params.udf3 ?? "",
      udf4: params.udf4 ?? "",
      udf5: params.udf5 ?? "",
      hash,
      service_provider: "payu_paisa",
    };

    return NextResponse.json({ paymentUrl, formData });
  } catch (err) {
    console.error("[/api/payu/checkout]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
