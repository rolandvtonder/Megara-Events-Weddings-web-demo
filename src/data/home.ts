export const HERO = {
  eyebrow: "Megara Events & Weddings — Cape Town, est. 2016",
  titleTop: "Beautiful events,",
  titleBottom: "memorable",
  titleAccent: "occasions.",
  kicker: "From concept to closing time",
  body: "Whether it's a grand-scale wedding or an intimate dinner party, we curate something inexplicably special — and make it look effortless.",
  side: "You relax, we handle the details",
  captions: [
    "Every love story deserves its own language.",
    "Logistical precision, married with unmatched detail.",
    "From hot mess to mega success.",
  ],
  /** Three stills the pinned hero moves through as you scroll. */
  layers: [
    { id: "julia-sander-10", alt: "A bride and groom walking through a garden of blooms towards the mountains at Johannesdal", position: "50% 55%" },
    { id: "yasmeen-rafiq-09", alt: "A couple touching foreheads beneath a suspended jewel-toned floral installation", position: "50% 35%" },
    { id: "stacey-steve-07", alt: "Newlyweds at golden hour on the edge of a lake beneath the Boschendal mountains", position: "50% 60%" },
  ],
};

export type Pillar = { title: string; sub: string; image: string; href: string; tint: string; alt: string };

/** The six ways to work with Megara, shown as arches on the home page. */
export const PILLARS: Pillar[] = [
  { title: "Full planning", sub: "Your bridal bestie", image: "yasmeen-rafiq-14", href: "/weddings#complete-coordination", tint: "#E45E4C", alt: "Bride and groom embracing under fairy lights" },
  { title: "Partial & styling", sub: "No-stress planning", image: "julia-sander-01", href: "/weddings#partial-planning", tint: "#E8BB5C", alt: "A styled place setting with a terracotta napkin and floral menu" },
  { title: "On the day", sub: "You plan, we run it", image: "stacey-steve-03", href: "/weddings#on-the-day", tint: "#D98C86", alt: "A smiling couple under festoon lights in the Winelands" },
  { title: "Destination", sub: "Love has no borders", image: "yasmeen-rafiq-12", href: "/weddings#destination", tint: "#4F8A8B", alt: "A bride with a cathedral veil walking down garden stairs" },
  { title: "Brand & corporate", sub: "Make your brand shine", image: "amazon-04", href: "/events", tint: "#E45E4C", alt: "A guest seated before a tropical floral wall at a corporate event" },
  { title: "Private parties", sub: "Help me celebrate", image: "erin-21st-06", href: "/events#private-parties", tint: "#E8BB5C", alt: "A birthday girl in pink fringe before a balloon arch" },
];

export type Chapter = { title: string; kind: string; place: string; image: string; alt: string; tint: string; gallery: string };

/** Pinned, full-screen portfolio chapters (and the "watch our story" film). */
export const CHAPTERS: Chapter[] = [
  { title: "Golden Hour", kind: "Stacey + Steve", place: "Boschendal · Winelands wedding", image: "stacey-steve-07", alt: "Newlyweds at sunset beside a lake at Boschendal", tint: "#C47A3A", gallery: "stacey-steve" },
  { title: "Garden Vows", kind: "Julia + Sander", place: "Johannesdal · Intimate elopement", image: "julia-sander-03", alt: "Rows of white chairs in a manicured garden beneath mountains", tint: "#5E7B4A", gallery: "julia-sander" },
  { title: "In Bloom", kind: "Alistair + Sonali", place: "Johannesdal · Multi-day celebration", image: "feature-floral-ceiling", alt: "A dining table beneath a ceiling of hanging florals and chandeliers", tint: "#B8702E", gallery: "alistair-sonali" },
  { title: "Lakeside", kind: "Aidan + Bianca", place: "Au d'Hex · Lakeside wedding", image: "aidan-bianca-05", alt: "Guests seated for a lakeside ceremony under a greenery arch", tint: "#4F8A8B", gallery: "aidan-bianca" },
  { title: "Think Pink", kind: "Erin's 21st", place: "Thirsty Scarecrow · Birthday", image: "erin-21st-09", alt: "Four friends in pink in front of a balloon wall", tint: "#D0457A", gallery: "erin-21st" },
  { title: "Havana Nights", kind: "Amazon Web Services", place: "Cape Town · Year-end function", image: "amazon-02", alt: "A rooftop lounge strung with colourful papel picado bunting", tint: "#C24A3A", gallery: "amazon" },
];

/** Cards in the 3D "Celebrations" ring. */
export const SIGNATURES = ["stacey-steve", "yasmeen-rafiq", "julia-sander", "aidan-bianca", "alistair-sonali", "kg-45th", "erin-21st", "woolworths", "ucook", "amazon"];
