import "server-only";
import nodemailer from "nodemailer";

export interface OrderDetails {
  txnid: string;
  mihpayid?: string;
  productName: string;
  size: string;
  qty: number;
  basePrice: number;
  gstAmount: number;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName?: string;
  address: string;
  pincode: string;
  state: string;
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

const brandGreen = "#15402f";
const brandGold = "#c9a24b";
const brandCream = "#f5edd9";
const brandGreenDeep = "#0c2a1f";

function customerEmailHtml(order: OrderDetails): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmation — JS Rani Foods</title>
</head>
<body style="margin:0;padding:0;background:#f0e8d3;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0e8d3;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(12,42,31,0.18);">
          <!-- Header -->
          <tr>
            <td style="background:${brandGreenDeep};padding:36px 40px;text-align:center;border-bottom:3px solid ${brandGold};">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:${brandGold};text-transform:uppercase;font-weight:700;">JS Rani Foods®</p>
              <h1 style="margin:0;font-size:26px;color:#fff;letter-spacing:0.5px;">Order Confirmed!</h1>
              <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.75);">Thank you for your purchase, ${order.customerName.split(" ")[0]}.</p>
            </td>
          </tr>
          <!-- Order summary -->
          <tr>
            <td style="background:#fff;padding:36px 40px;">
              <p style="margin:0 0 20px;font-size:14px;color:#586a60;">
                Hi <strong style="color:${brandGreen};">${order.customerName}</strong>,<br/>
                Your order has been received and is being processed. Our team will reach out within 24 hours to confirm your delivery schedule.
              </p>

              <!-- Invoice table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6d7a8;border-radius:10px;overflow:hidden;margin-bottom:24px;">
                <tr style="background:${brandGreenDeep};">
                  <th colspan="2" style="padding:12px 18px;text-align:left;font-size:11px;letter-spacing:2px;color:${brandGold};text-transform:uppercase;font-weight:700;">Order Invoice</th>
                </tr>
                <tr style="background:${brandCream};">
                  <td style="padding:12px 18px;font-size:13px;color:#586a60;">Product</td>
                  <td style="padding:12px 18px;font-size:13px;color:${brandGreen};font-weight:600;text-align:right;">${order.productName}</td>
                </tr>
                <tr style="background:#fff;">
                  <td style="padding:12px 18px;font-size:13px;color:#586a60;">Pack Size</td>
                  <td style="padding:12px 18px;font-size:13px;color:${brandGreen};font-weight:600;text-align:right;">${order.size}</td>
                </tr>
                <tr style="background:${brandCream};">
                  <td style="padding:12px 18px;font-size:13px;color:#586a60;">Quantity</td>
                  <td style="padding:12px 18px;font-size:13px;color:${brandGreen};font-weight:600;text-align:right;">${order.qty} unit${order.qty > 1 ? "s" : ""}</td>
                </tr>
                <tr style="background:#fff;">
                  <td style="padding:12px 18px;font-size:13px;color:#586a60;">Base Price</td>
                  <td style="padding:12px 18px;font-size:13px;color:${brandGreen};font-weight:600;text-align:right;">${formatINR(order.basePrice)}</td>
                </tr>
                <tr style="background:${brandCream};">
                  <td style="padding:12px 18px;font-size:13px;color:#586a60;">GST (5%)</td>
                  <td style="padding:12px 18px;font-size:13px;color:${brandGreen};font-weight:600;text-align:right;">${formatINR(order.gstAmount)}</td>
                </tr>
                <tr style="background:${brandGreenDeep};">
                  <td style="padding:14px 18px;font-size:15px;color:#fff;font-weight:700;">Total Paid</td>
                  <td style="padding:14px 18px;font-size:15px;color:${brandGold};font-weight:700;text-align:right;">${formatINR(order.totalAmount)}</td>
                </tr>
              </table>

              <!-- Reference -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#586a60;">Transaction ID:</td>
                  <td style="padding:6px 0;font-size:13px;color:${brandGreen};font-weight:600;text-align:right;">${order.txnid}</td>
                </tr>
                ${order.mihpayid ? `<tr>
                  <td style="padding:6px 0;font-size:13px;color:#586a60;">PayU Reference:</td>
                  <td style="padding:6px 0;font-size:13px;color:${brandGreen};font-weight:600;text-align:right;">${order.mihpayid}</td>
                </tr>` : ""}
              </table>

              <!-- Delivery note -->
              <div style="background:${brandCream};border-left:4px solid ${brandGold};border-radius:6px;padding:14px 18px;margin-bottom:24px;">
                <p style="margin:0;font-size:13px;color:${brandGreen};font-weight:600;">🚚 Estimated Delivery: 7–10 Business Days</p>
                <p style="margin:6px 0 0;font-size:12px;color:#586a60;">Your order will be carefully packed and dispatched by our delivery partner. You will receive a tracking link once shipped.</p>
              </div>

              <!-- Delivery address -->
              <p style="margin:0 0 6px;font-size:12px;letter-spacing:1.5px;color:#586a60;text-transform:uppercase;font-weight:700;">Delivery Address</p>
              <p style="margin:0;font-size:13px;color:${brandGreen};line-height:1.7;">
                ${order.companyName ? `${order.companyName}<br/>` : ""}
                ${order.address}<br/>
                ${order.state} – ${order.pincode}<br/>
                📞 ${order.customerPhone}
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:${brandGreenDeep};padding:24px 40px;text-align:center;border-top:1px solid rgba(201,162,75,0.3);">
              <p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.6);">Questions? Reach us at</p>
              <a href="mailto:marketing@jagadambastore.com" style="color:${brandGold};font-size:13px;font-weight:600;text-decoration:none;">marketing@jagadambastore.com</a>
              <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.4);">M/s Jagdamba Store · Cole Road, Dighalia Gaon · Dibrugarh – 786001, Assam</p>
              <p style="margin:4px 0 0;font-size:11px;color:rgba(255,255,255,0.4);">FSSAI: 10326016000018 · Trademark No. 5854612</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function adminEmailHtml(order: OrderDetails): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New Order — JS Rani Foods</title></head>
<body style="margin:0;padding:0;background:#f0e8d3;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 16px;background:#f0e8d3;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(12,42,31,0.15);">
        <tr>
          <td style="background:${brandGreenDeep};padding:24px 32px;border-bottom:3px solid ${brandGold};">
            <p style="margin:0;font-size:11px;letter-spacing:3px;color:${brandGold};text-transform:uppercase;font-weight:700;">JS Rani Foods — Admin Alert</p>
            <h2 style="margin:8px 0 0;font-size:22px;color:#fff;">🛒 New Order Received</h2>
          </td>
        </tr>
        <tr>
          <td style="background:#fff;padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6d7a8;border-radius:8px;overflow:hidden;">
              <tr style="background:${brandGreenDeep};">
                <th colspan="2" style="padding:10px 16px;text-align:left;font-size:11px;letter-spacing:2px;color:${brandGold};text-transform:uppercase;">Order Details</th>
              </tr>
              <tr style="background:${brandCream};"><td style="padding:10px 16px;font-size:13px;color:#586a60;width:45%;">Product</td><td style="padding:10px 16px;font-size:13px;color:${brandGreen};font-weight:600;">${order.productName} (${order.size})</td></tr>
              <tr><td style="padding:10px 16px;font-size:13px;color:#586a60;">Quantity</td><td style="padding:10px 16px;font-size:13px;color:${brandGreen};font-weight:600;">${order.qty} unit${order.qty > 1 ? "s" : ""}</td></tr>
              <tr style="background:${brandCream};"><td style="padding:10px 16px;font-size:13px;color:#586a60;">Total Amount</td><td style="padding:10px 16px;font-size:14px;color:${brandGold};font-weight:700;">${formatINR(order.totalAmount)}</td></tr>
              <tr><td style="padding:10px 16px;font-size:13px;color:#586a60;">Transaction ID</td><td style="padding:10px 16px;font-size:13px;color:${brandGreen};font-weight:600;">${order.txnid}</td></tr>
              ${order.mihpayid ? `<tr style="background:${brandCream};"><td style="padding:10px 16px;font-size:13px;color:#586a60;">PayU Ref (mihpayid)</td><td style="padding:10px 16px;font-size:13px;color:${brandGreen};font-weight:600;">${order.mihpayid}</td></tr>` : ""}
              <tr style="background:${brandGreenDeep};"><th colspan="2" style="padding:10px 16px;text-align:left;font-size:11px;letter-spacing:2px;color:${brandGold};text-transform:uppercase;">Customer Details</th></tr>
              <tr><td style="padding:10px 16px;font-size:13px;color:#586a60;">Name</td><td style="padding:10px 16px;font-size:13px;color:${brandGreen};font-weight:600;">${order.customerName}</td></tr>
              <tr style="background:${brandCream};"><td style="padding:10px 16px;font-size:13px;color:#586a60;">Email</td><td style="padding:10px 16px;font-size:13px;color:${brandGreen};font-weight:600;">${order.customerEmail}</td></tr>
              <tr><td style="padding:10px 16px;font-size:13px;color:#586a60;">Phone</td><td style="padding:10px 16px;font-size:13px;color:${brandGreen};font-weight:600;">${order.customerPhone}</td></tr>
              ${order.companyName ? `<tr style="background:${brandCream};"><td style="padding:10px 16px;font-size:13px;color:#586a60;">Company / Kitchen</td><td style="padding:10px 16px;font-size:13px;color:${brandGreen};font-weight:600;">${order.companyName}</td></tr>` : ""}
              <tr style="background:${brandCream};"><td style="padding:10px 16px;font-size:13px;color:#586a60;">Address</td><td style="padding:10px 16px;font-size:13px;color:${brandGreen};font-weight:600;">${order.address}, ${order.state} – ${order.pincode}</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:${brandGreenDeep};padding:18px 32px;text-align:center;border-top:1px solid rgba(201,162,75,0.3);">
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">JS Rani Foods order notification · Do not reply to this email</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendCustomerEmail(order: OrderDetails): Promise<void> {
  const transporter = createTransport();
  await transporter.sendMail({
    from: `"JS Rani Foods" <${process.env.SMTP_USER}>`,
    to: order.customerEmail,
    subject: `Order Confirmed — ${order.productName} | JS Rani Foods`,
    html: customerEmailHtml(order),
  });
}

export async function sendAdminEmail(order: OrderDetails): Promise<void> {
  const transporter = createTransport();
  const adminEmail =
    process.env.ADMIN_EMAIL ?? "marketing@jagadambastore.com";
  await transporter.sendMail({
    from: `"JS Rani Foods Orders" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `🛒 New Order: ${order.productName} × ${order.qty} — ${order.customerName}`,
    html: adminEmailHtml(order),
  });
}
