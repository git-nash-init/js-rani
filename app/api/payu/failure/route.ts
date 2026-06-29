import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  try {
    const formData = await request.formData();
    const txnid = (formData.get("txnid") as string) ?? "";
    const errorMsg = (formData.get("error_Message") as string) ?? "payment_failed";
    const status = (formData.get("status") as string) ?? "";

    console.info("[/api/payu/failure] Payment failed", {
      txnid,
      status,
      error: errorMsg,
    });

    const params = new URLSearchParams();
    if (txnid) params.set("txnid", txnid);
    params.set("error", errorMsg);

    return NextResponse.redirect(
      `${baseUrl}/order/failure?${params.toString()}`,
      303
    );
  } catch (err) {
    console.error("[/api/payu/failure]", err);
    return NextResponse.redirect(`${baseUrl}/order/failure?error=server_error`, 303);
  }
}
