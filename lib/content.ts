/* ===========================================================================
   JS RANI FOODS — central content.
   Edit copy, products, testimonials and contact details here in one place.
   =========================================================================== */

export const COMPANY = {
  name: "JS Rani Foods",
  legalName: "M/s Jagdamba Store",
  tagline: "Pure Desi Ghee, Made the Traditional Bilona Way",
  // Contact
  phoneDisplay: "+91 83746 67536",
  phoneTel: "+918374667536",
  whatsapp: "918374667536", // wa.me format
  email: "marketing@jagadambastore.com",
  addressLines: [
    "M/s Jagdamba Store",
    "Cole Road, Dighalia Gaon, Dibrugarh Sadar",
    "Dibrugarh – 786001, Assam, India",
  ],
  // Compliance
  fssaiMarketed: "10326016000018",
  fssaiManufactured: "10723002000163",
  manufacturedBy: "Shakti Enterprise, Surat, Gujarat – 395006",
  trademarkNo: "5854612",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Ghee", href: "#products" },
  { label: "Teas", href: "#teas" },
  { label: "Why Us", href: "#why-us" },
  { label: "How It's Made", href: "#process" },
  { label: "Certifications", href: "#certifications" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  eyebrow: "Premium Ghee for HORECA & Commercial Kitchens",
  title: "Pure Desi Ghee, Made the Traditional Bilona Way",
  subtitle:
    "Crafted from the finest milk of grass-fed indigenous cows — rich aroma, golden texture and authentic taste, in every batch. Trusted by sweet shops, restaurants and cloud kitchens across India.",
  highlights: ["Traditional Bilona Method", "FSSAI · HACCP · ISO 22000", "5 kg & 15 kg Packs", "All-India Delivery"],
};

/* Factual stats only — no invented customer counts. */
export const STATS = [
  { value: 3, suffix: "", label: "Premium Ghee Variants" },
  { value: 5000, prefix: "₹", suffix: "+", label: "Saved per 15 kg tin vs leading brands" },
  { value: 3, suffix: "", label: "Quality Certifications" },
  { value: 100, suffix: "%", label: "Vegetarian · Made in India" },
];

export const ABOUT = {
  heading: "Where Tradition Meets Quality",
  body: [
    "Welcome to JS Rani Foods — a trusted manufacturer and supplier of premium cow ghee, A2 cow ghee and pure organic ghee for HORECA kitchens, sweet makers and commercial buyers across India.",
    "Every batch is crafted using the traditional bilona method, from milk sourced from grass-fed indigenous cows. The result is the rich golden texture, aroma and nutritional value that chefs and mithai makers have trusted for generations.",
    "A proud brand of M/s Jagdamba Store, Dibrugarh, Assam, we pair time-honoured craft with modern food-safety standards — FSSAI certified, HACCP compliant and ISO 22000 accredited.",
  ],
  pull: "Trusted by chefs. Chosen for sweets. Made for authenticity.",
};

export type Product = {
  id: string;
  name: string;
  blurb: string;
  features: string[];
  sizes: string;
  image: string;
  accent: "Bestseller" | "Premium" | "Certified Organic";
};

export const PRODUCTS: Product[] = [
  {
    id: "cow-ghee",
    name: "Cow Ghee",
    blurb:
      "Rich, golden cow ghee made from fresh cream using the traditional bilona method. Ideal for bulk cooking in restaurants, hotels and catering kitchens.",
    features: [
      "Rich aroma & golden texture",
      "High smoke point for deep frying",
      "Traditional slow-cooked process",
      "FSSAI certified",
    ],
    sizes: "5 kg & 15 kg Tin Pack",
    image: "/products/cow-ghee.png",
    accent: "Bestseller",
  },
  {
    id: "a2-cow-ghee",
    name: "A2 Cow Ghee",
    blurb:
      "Premium A2 cow ghee sourced from indigenous Gir & Sahiwal breeds. Hand-churned using the ancient bilona process for maximum nutrition and flavour.",
    features: [
      "Made from A2 milk only",
      "Grass-fed, free-range cows",
      "Rich in Omega-3 & vitamins",
      "FSSAI certified",
    ],
    sizes: "5 kg & 15 kg Tin Pack",
    image: "/products/a2-cow-ghee.png",
    accent: "Premium",
  },
  {
    id: "organic-ghee",
    name: "Pure Organic Ghee",
    blurb:
      "Certified organic ghee made without any chemicals, preservatives or additives. Pure farm-to-table quality for health-conscious commercial kitchens.",
    features: [
      "100% certified organic",
      "No preservatives or additives",
      "Antibiotic-free sourcing",
      "FSSAI · HACCP · ISO 22000",
    ],
    sizes: "5 kg Plastic Container",
    image: "/products/organic-ghee.png",
    accent: "Certified Organic",
  },
];

/* ===========================================================================
   Upcoming range — Premium Teas (Coming Soon).
   Dibrugarh sits in the heart of Assam's tea belt, so a fine tea line is a
   natural extension of the brand. These are teasers, not yet for sale.
   =========================================================================== */
export type Tea = {
  id: string;
  name: string;
  note: string;       // short, evocative tasting note
  dot: string;        // accent colour for the leaf/liquor swatch
};

export const TEAS: Tea[] = [
  {
    id: "green-tea",
    name: "Green Tea",
    note: "Delicate, antioxidant-rich leaves — light, grassy and refreshing.",
    dot: "#6f9b5a",
  },
  {
    id: "black-tea",
    name: "Black Tea",
    note: "Full-bodied Assam black — bright, malty and beautifully brisk.",
    dot: "#5a2f1d",
  },
  {
    id: "premium-ctc-tea",
    name: "Premium CTC Tea",
    note: "Strong, coppery liquor for that perfect kadak cup of chai.",
    dot: "#8a4a23",
  },
  {
    id: "blue-tea",
    name: "Blue Tea",
    note: "Butterfly-pea blossoms — caffeine-free, floral and a striking azure.",
    dot: "#3a5fa8",
  },
];

/* Price comparison for a 15 kg tin (from the dealer catalogue). */
export const PRICE_COMPARISON: { brand: string; price: number; us?: boolean }[] = [
  { brand: "Patanjali (Bulk)", price: 12000 },
  { brand: "Amul (Commercial)", price: 9600 },
  { brand: "Gowardhan", price: 9500 },
  { brand: "Verka", price: 8200 },
  { brand: "Local Suppliers", price: 8000 },
  { brand: "JS Rani Foods", price: 7000, us: true },
];

export const PROCESS_STEPS = [
  {
    title: "Grass-fed Cows",
    desc: "Milk sourced from free-range, grass-fed indigenous Gir & Sahiwal cows.",
  },
  {
    title: "Cultured Curd",
    desc: "The milk is set into curd the slow, traditional way — never rushed.",
  },
  {
    title: "Hand-Churned Bilona",
    desc: "Curd is bilona-churned to draw out fresh, fragrant white butter (makkhan).",
  },
  {
    title: "Slow-Cooked to Gold",
    desc: "Makkhan is simmered low and slow until it turns to rich, golden ghee.",
  },
  {
    title: "Lab-Tested & Sealed",
    desc: "Every batch is quality-checked, then sealed in hygienic tins & containers.",
  },
];

export const CERTIFICATIONS = [
  { code: "FSSAI", name: "FSSAI Licensed", desc: "Food Safety & Standards Authority of India — licensed & compliant." },
  { code: "HACCP", name: "HACCP Compliant", desc: "Hazard Analysis & Critical Control Points — hazards controlled across production." },
  { code: "ISO 22000", name: "ISO 22000 Certified", desc: "International Food Safety Management — consistent safety, raw material to finished product." },
];

export const QUALITY_BADGES = [
  "Lab Tested",
  "Antibiotic Free",
  "No Additives",
  "100% Vegetarian",
  "Made in India",
  "No Preservatives",
];

/* ⚠️ PLACEHOLDER TESTIMONIALS — replace with real customer quotes & names.
   These are believable examples so the section looks complete; they are not
   real customers. Swap names, cities and quotes once you have approvals. */
export const TESTIMONIALS = [
  {
    quote:
      "We switched our halwai counter to JS Rani A2 ghee and customers instantly noticed the aroma in our laddoos and barfi. The consistency batch after batch is what keeps us ordering.",
    name: "Rajesh Agarwal",
    role: "Owner, Shree Mithai Bhandar",
    city: "Guwahati, Assam",
  },
  {
    quote:
      "For a cloud kitchen, food cost is everything. We get the same premium quality as the big brands but save thousands per tin. The 15 kg packs are perfect for our volume.",
    name: "Priya Nair",
    role: "Co-founder, Spice Route Cloud Kitchen",
    city: "Bengaluru, Karnataka",
  },
  {
    quote:
      "Pure, honest ghee with proper FSSAI and ISO papers ready when I asked. Delivery across to Dibrugarh was quick and well packed. Highly recommended for any sweet shop.",
    name: "Mohan Lal Gupta",
    role: "Proprietor, Gupta Sweets & Caterers",
    city: "Dibrugarh, Assam",
  },
  {
    quote:
      "The golden colour and richness of the cow ghee lifted our restaurant's dal and biryani. Our chefs trust it for deep frying because of the high smoke point.",
    name: "Imran Sheikh",
    role: "Head Chef, Tandoor House",
    city: "Kolkata, West Bengal",
  },
];
