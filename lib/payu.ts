import "server-only";
import crypto from "crypto";

export interface PayuParams {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

/**
 * Forward hash for PayU checkout initiation.
 * sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt)
 */
export function generatePayuHash(params: PayuParams, salt: string): string {
  const hashString = [
    params.key,
    params.txnid,
    params.amount,
    params.productinfo,
    params.firstname,
    params.email,
    params.udf1 ?? "",
    params.udf2 ?? "",
    params.udf3 ?? "",
    params.udf4 ?? "",
    params.udf5 ?? "",
    "", // reserved
    "", // reserved
    "", // reserved
    "", // reserved
    "", // reserved
    salt,
  ].join("|");

  return crypto.createHash("sha512").update(hashString).digest("hex");
}

export interface PayuResponse {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  status: string;
  hash: string;
  [key: string]: string | undefined;
}

/**
 * Reverse hash for PayU response verification.
 * sha512(salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 */
export function verifyPayuHash(response: PayuResponse, salt: string): boolean {
  const hashString = [
    salt,
    response.status,
    "", // reserved
    "", // reserved
    "", // reserved
    "", // reserved
    "", // reserved
    response.udf5 ?? "",
    response.udf4 ?? "",
    response.udf3 ?? "",
    response.udf2 ?? "",
    response.udf1 ?? "",
    response.email,
    response.firstname,
    response.productinfo,
    response.amount,
    response.txnid,
    response.key,
  ].join("|");

  const computedHash = crypto
    .createHash("sha512")
    .update(hashString)
    .digest("hex");

  return computedHash === response.hash;
}

/** PayU hosted payment page URL based on mode */
export function getPayuUrl(): string {
  const mode = process.env.PAYU_MODE ?? "TEST";
  return mode === "PRODUCTION"
    ? "https://secure.payu.in/_payment"
    : "https://test.payu.in/_payment";
}
