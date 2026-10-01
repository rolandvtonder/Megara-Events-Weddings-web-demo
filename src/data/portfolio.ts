export type PortfolioCategory = "wedding" | "celebration" | "brand";

export type Gallery = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  /** One-line description for cards. */
  meta: string;
  intro: string;
  location: string;
  credits: { role: string; name: string }[];
  cover: string;
  /** Landscape image for full-bleed moments (lookbook chapters, page heroes). */
  wide: string;
  images: string[];
  tint: string;
};

const range = (prefix: string, n: number, skip: number[] = []) =>
  Array.from({ length: n }, (_, i) => i + 1)
    .filter((i) => !skip.includes(i))
    .map((i) => `${prefix}-${String(i).padStart(2, "0")}`);

export const CATEGORY_LABEL: Record<PortfolioCategory, string> = {
  wedding: "Weddings",
  celebration: "Celebrations",
  brand: "Brand experiences",
};

export const GALLERIES: Gallery[] = [
  {
    slug: "stacey-steve",
    title: "Stacey + Steve",
    category: "wedding",
    meta: "Boschendal · Winelands wedding",
    intro: "Golden hour in the Winelands: an open-air ceremony beneath the mountains, a candlelit long-table reception and blush florals that caught every last ray of sun.",
    location: "Boschendal, Franschhoek",
    credits: [
      { role: "Venue", name: "Boschendal" },
      { role: "Photographer", name: "Mignon Marais" },
      { role: "Florist", name: "Bouwer" },
    ],
    cover: "stacey-steve-03",
    wide: "stacey-steve-07",
    images: range("stacey-steve", 16),
    tint: "#EADBC8",
  },
  {
    slug: "yasmeen-rafiq",
    title: "Yasmeen + Moghamad Rafiq",
    category: "wedding",
    meta: "Johannesdal · Garden glasshouse",
    intro: "Suspended florals in jewel tones, a glasshouse aglow at dusk and a couple who wanted their day to feel like a garden in full bloom.",
    location: "Johannesdal, Stellenbosch",
    credits: [
      { role: "Venue", name: "Johannesdal" },
      { role: "Photographer", name: "Mischka Durrant" },
      { role: "Florist", name: "Fleur le Cordeur" },
    ],
    cover: "yasmeen-rafiq-01",
    wide: "yasmeen-rafiq-06",
    images: range("yasmeen-rafiq", 16),
    tint: "#F6DCD3",
  },
  {
    slug: "julia-sander",
    title: "Julia + Sander",
    category: "wedding",
    meta: "Johannesdal · Intimate elopement",
    intro: "An intimate Stellenbosch celebration framed by the mountains — terracotta tablescapes, garden blooms and an evening that ended on the dance floor.",
    location: "Johannesdal, Stellenbosch",
    credits: [
      { role: "Venue", name: "Johannesdal" },
      { role: "Photographer", name: "Marli Koen" },
      { role: "Florist", name: "Bouwer" },
    ],
    cover: "julia-sander-05",
    wide: "julia-sander-03",
    images: range("julia-sander", 16),
    tint: "#F3E2B8",
  },
  {
    slug: "aidan-bianca",
    title: "Aidan + Bianca",
    category: "wedding",
    meta: "Au d'Hex · Lakeside wedding",
    intro: "A lakeside deck ceremony under a greenery arch, white-on-white florals and a sunset first dance that stopped the whole party.",
    location: "Au d'Hex, Wellington",
    credits: [
      { role: "Venue", name: "Au d'Hex" },
      { role: "Photographer", name: "Ayeh" },
      { role: "Florist", name: "My Green Love Affair" },
    ],
    cover: "aidan-bianca-12",
    wide: "aidan-bianca-05",
    images: range("aidan-bianca", 16, [2]),
    tint: "#D2E5E7",
  },
  {
    slug: "alistair-sonali",
    title: "Alistair + Sonali",
    category: "wedding",
    meta: "Johannesdal · Multi-day celebration",
    intro: "Three looks, one unforgettable weekend: a riot of colour for the welcome, a soft garden lounge for the day and a floral ceiling for the grand finale.",
    location: "Johannesdal, Stellenbosch",
    credits: [
      { role: "Venue", name: "Johannesdal" },
      { role: "Florist", name: "Fleur le Cordeur" },
      { role: "Hiring", name: "In and Out Events, Palm Hire" },
    ],
    cover: "alistair-sonali-11",
    wide: "feature-floral-ceiling",
    images: [...range("alistair-sonali", 34), "feature-floral-lounge", "feature-floral-table", "feature-floral-mountain"],
    tint: "#F6DCD3",
  },
  {
    slug: "kg-45th",
    title: "KG's 45th Birthday",
    category: "celebration",
    meta: "Asara · Milestone birthday",
    intro: "Neutral luxe for a milestone: pampas and dried florals, a marquee-lit monogram and a dinner party dressed in champagne and gold.",
    location: "Asara Wine Estate, Stellenbosch",
    credits: [
      { role: "Venue", name: "Asara" },
      { role: "Florist", name: "Fleur le Cordeur" },
    ],
    cover: "kg-45th-06",
    wide: "kg-45th-08",
    images: range("kg-45th", 12),
    tint: "#EADBC8",
  },
  {
    slug: "erin-21st",
    title: "Erin's 21st",
    category: "celebration",
    meta: "Thirsty Scarecrow · 21st birthday",
    intro: "Pink, more pink and a little sparkle — a balloon-filled, tassel-trimmed 21st where nothing was too much to ask.",
    location: "Thirsty Scarecrow, Stellenbosch",
    credits: [{ role: "Venue", name: "Thirsty Scarecrow" }],
    cover: "erin-21st-01",
    wide: "erin-21st-09",
    images: [...range("erin-21st", 12), "erin-portrait"],
    tint: "#F6DCD3",
  },
  {
    slug: "woolworths",
    title: "Woolworths",
    category: "brand",
    meta: "Retail brand activations",
    intro: "Seasonal activations for Christmas, Easter, Mother's Day, Father's Day and Valentine's Day — personalisation stations that turned shoppers into gift-givers.",
    location: "Malls across Cape Town",
    credits: [{ role: "Client", name: "Woolworths" }],
    cover: "woolworths-01",
    wide: "woolworths-activation",
    images: ["woolworths-activation", ...range("woolworths", 13)],
    tint: "#F6DCD3",
  },
  {
    slug: "ucook",
    title: "UCOOK",
    category: "brand",
    meta: "Brand activations · JHB & CPT",
    intro: "Pop-up kitchens and tasting counters in Johannesburg and Cape Town that put UCOOK's “good food, good people” front and centre.",
    location: "Johannesburg & Cape Town",
    credits: [{ role: "Client", name: "UCOOK" }],
    cover: "ucook-08",
    wide: "ucook-04",
    images: range("ucook", 15),
    tint: "#EADBC8",
  },
  {
    slug: "amazon",
    title: "Amazon Web Services",
    category: "brand",
    meta: "Corporate events · Year-end & networking",
    intro: "Year-end functions, monthly networking and Women's Day — including a Havana-inspired rooftop with vintage cars, dancers and a live band.",
    location: "Cape Town",
    credits: [{ role: "Client", name: "Amazon Web Services" }],
    cover: "amazon-04",
    wide: "amazon-02",
    images: [...range("amazon", 20), "corporate-sustainathon"],
    tint: "#D2E5E7",
  },
];

export const galleryBySlug = (slug: string) => GALLERIES.find((g) => g.slug === slug);

export const galleryAlt = (g: Gallery, i: number) => `${g.title} — ${g.meta}, photo ${i + 1}`;
