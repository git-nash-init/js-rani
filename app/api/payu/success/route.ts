import { NextRequest, NextResponse } from "next/server";
import { verifyPayuHash, type PayuResponse } from "@/lib/payu";
import { sendCustomerEmail, sendAdminEmail, type OrderDetails } from "@/lib/mailer";
import { PRODUCT_VARIANTS } from "@/lib/pricing";
import { PRODUCTS } from "@/lib/content";

export async function POST(request: NextRequest) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  try {
    const formData = await request.formData();

    const response: PayuResponse = {
      key: formData.get("key") as string ?? "",
      txnid: formData.get("txnid") as string ?? "",
      amount: formData.get("amount") as string ?? "",
      productinfo: formData.get("productinfo") as string ?? "",
      firstname: formData.get("firstname") as string ?? "",
      email: formData.get("email") as string ?? "",
      phone: formData.get("phone") as string ?? "",
      status: formData.get("status") as string ?? "",
      hash: formData.get("hash") as string ?? "",
      mihpayid: formData.get("mihpayid") as string ?? "",
      udf1: formData.get("udf1") as string ?? "",
      udf2: formData.get("udf2") as string ?? "",
      udf3: formData.get("udf3") as string ?? "",
      udf4: formData.get("udf4") as string ?? "",
      udf5: formData.get("udf5") as string ?? "",
      error_Message: formData.get("error_Message") as string ?? "",
    };

    console.info("[/api/payu/success] Received PayU callback", {
      txnid: response.txnid,
      status: response.status,
      amount: response.amount,
      email: response.email,
    });

    const salt = process.env.PAYU_SALT ?? "";

    // --- Verify hash ---
    if (!verifyPayuHash(response, salt)) {
      console.warn("[/api/payu/success] Hash mismatch — possible tampering", {
        txnid: response.txnid,
      });
      return NextResponse.redirect(
        `${baseUrl}/order/failure?txnid=${encodeURIComponent(response.txnid)}&error=tampered`,
        303
      );
    }

    // --- Check payment status ---
    if (response.status !== "success") {
      console.warn("[/api/payu/success] Payment not successful", {
        txnid: response.txnid,
        status: response.status,
        error: response.error_Message,
      });
      return NextResponse.redirect(
        `${baseUrl}/order/failure?txnid=${encodeURIComponent(response.txnid)}&error=${encodeURIComponent(response.error_Message ?? "payment_failed")}`,
        303
      );
    }

    // --- Reconstruct order details ---
    const productId = response.udf5 ?? "";
    const size = response.udf1 ?? "";
    const qty = Number(response.udf2 ?? 1);
    const companyName = response.udf3 ?? "";
    const deliveryAddress = response.udf4 ?? "";

    const product = PRODUCTS.find((p) => p.id === productId);
    const variants = PRODUCT_VARIANTS[productId] ?? [];
    const variant = variants.find((v) => v.size === size);

    const unitPrice = variant?.price ?? 0;
    const base = unitPrice * qty;
    const gst = Math.round(base * 0.05);
    const total = Number(response.amount);

    const order: OrderDetails = {
      txnid: response.txnid,
      mihpayid: response.mihpayid,
      productName: product?.name ?? response.productinfo,
      size: variant?.label ?? size,
      qty,
      basePrice: base,
      gstAmount: gst,
      totalAmount: total,
      customerName: response.firstname,
      customerEmail: response.email,
      customerPhone: response.phone ?? "",
      companyName: companyName || undefined,
      address: deliveryAddress,
      pincode: "",
      state: "",
    };

    // ── Send emails ────────────────────────────────────────────────────────────
    // IMPORTANT: We MUST await before returning the redirect response.
    // On Vercel, serverless functions are terminated the instant a Response is
    // sent. An un-awaited (fire-and-forget) Promise gets killed mid-flight
    // before the SMTP handshake completes — which is why no emails arrived.
    // ──────────────────────────────────────────────────────────────────────────
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error(
        "[/api/payu/success] ❌ SMTP_USER or SMTP_PASS not set in Vercel environment variables — emails cannot be sent."
      );
    } else {
      try {
        console.info("[/api/payu/success] Sending confirmation emails...", {
          to_customer: order.customerEmail,
          to_admin: process.env.ADMIN_EMAIL ?? "marketing@jagadambastore.com",
          smtp_host: process.env.SMTP_HOST,
          smtp_user: process.env.SMTP_USER,
        });

        // Await both emails fully before redirecting
        await Promise.all([
          sendCustomerEmail(order),
          sendAdminEmail(order),
        ]);

        console.info(
          `[/api/payu/success] ✅ Emails sent successfully for txnid: ${response.txnid}`
        );
      } catch (emailErr) {
        // Full error printed to Vercel logs — check Vercel dashboard → Functions tab
        console.error("[/api/payu/success] ❌ EMAIL SEND FAILED:", {
          message: emailErr instanceof Error ? emailErr.message : String(emailErr),
          stack: emailErr instanceof Error ? emailErr.stack : undefined,
          smtp_host: process.env.SMTP_HOST,
          smtp_user: process.env.SMTP_USER,
          txnid: response.txnid,
          customer_email: order.customerEmail,
        });
        // Payment was successful — don't redirect to failure just because email failed
      }
    }

    // --- Redirect to success page ---
    const params = new URLSearchParams({
      txnid: response.txnid,
      amount: response.amount,
      name: response.firstname,
      product: product?.name ?? "",
      size: variant?.label ?? size,
      qty: String(qty),
      mihpayid: response.mihpayid ?? "",
    });

    return NextResponse.redirect(
      `${baseUrl}/order/success?${params.toString()}`,
      303
    );
  } catch (err) {
    console.error("[/api/payu/success] Unhandled error:", err);
    return NextResponse.redirect(
      `${baseUrl}/order/failure?error=server_error`,
      303
    );
  }
}
