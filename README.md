# JS Rani Foods® — Brand Landing Page

An elegant, animated single-page website for **JS Rani Foods®** (a brand of M/s Jagdamba Store,
Dibrugarh, Assam) — premium Cow Ghee, A2 Cow Ghee & Pure Organic Ghee for HORECA and commercial
kitchens. The design reuses the brand's exact packaging theme: deep emerald green, antique gold and
cream, with the red oval logo as the jewel accent.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion**.

## Features
- Single-scroll layout: Hero · Trust stats · About · Products · Why Us (price comparison) · How It's
  Made · Certifications · Testimonials · Contact.
- Smooth scroll-reveal animations, hover lifts, count-up stats, animated price bars, marquee and a
  testimonial carousel — all respecting `prefers-reduced-motion`.
- Contact form ("Raise a Query") that emails submissions to your inbox via Web3Forms.
- Floating WhatsApp button + back-to-top, sticky nav, SEO metadata and JSON-LD.

## 1. Set up the contact form (required for email delivery)
The form sends enquiries to your Gmail using the free **Web3Forms** service.

1. Visit **https://web3forms.com** and enter **marketing.jagadambastore@gmail.com**.
2. Copy the **access key** they email you.
3. Open `.env.local` and paste it:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key-here
   ```
4. Restart the dev server. Submissions now arrive in that Gmail inbox.

> Until a key is added, the form UI works but submitting shows a friendly error with a "mailto"
> fallback.

## 2. Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## 3. Build / deploy
```bash
npm run build && npm run start   # production build locally
```
Deploy on **Vercel**: push to a Git repo and import it at vercel.com (or run `vercel`). Add the
`NEXT_PUBLIC_WEB3FORMS_KEY` environment variable in the Vercel project settings.

## Editing content
All copy, products, testimonials, prices and contact details live in **`lib/content.ts`** — edit
that one file to update the site. Brand colours and fonts are defined in **`app/globals.css`**
(`@theme` block).

## Things to replace later
- **Testimonials** in `lib/content.ts` are realistic *placeholders* (clearly commented). Swap in
  real customer names, cities and quotes once approved.
- Product imagery in `public/products/` is exported from your Canva dealer catalogue.

## Brand assets
Source PDFs and the exported Canva pages are kept in `brand-assets/` (not part of the build).
The logo (`public/logo.png`) is used in the nav, mobile menu and footer with the ® mark.
