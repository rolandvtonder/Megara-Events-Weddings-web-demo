export const BRAND = {
  name: "Megara",
  fullName: "Megara Events & Weddings",
  tagline: "Beautiful events & memorable occasions",
  promise: "From hot mess to mega success.",
  description:
    "Megara Events & Weddings is a Cape Town planning and design studio creating bespoke luxury weddings, destination celebrations, brand activations and private parties — from concept to closing time.",
  city: "Cape Town",
  founded: 2016,
  year: new Date().getFullYear(),
};

export const CONTACT = {
  enquiries: "enquiries@megara.co.za",
  meg: "meg@megara.co.za",
  phone: "083 995 4589",
  phoneHref: "tel:+27839954589",
  hours: "Monday – Friday, 9am – 4pm",
  location: "Cape Town, South Africa · Available worldwide",
};

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/megaraevents/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/megaraevents", icon: "facebook" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/megara-events-management/", icon: "linkedin" },
] as const;

/** `short` is what the rotating ticker shows on narrow screens. */
export const ANNOUNCEMENTS = [
  { text: "Weddings · Events · Brand experiences", short: "Weddings · Events · Brands" },
  { text: "Free: The Ultimate Wedding Itinerary Worksheet", short: "Free itinerary worksheet", pill: true, href: "/resources" },
  { text: "Cape Town · Winelands · Destination", short: "Cape Town & destination" },
];

export type NavItem = { label: string; href: string; mega?: boolean };

export const NAV: NavItem[] = [
  { label: "Weddings", href: "/weddings" },
  { label: "Events", href: "/events" },
  { label: "Portfolio", href: "/portfolio", mega: true },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Journal", href: "/blog" },
];

export const MARQUEE = [
  "Luxury weddings",
  "Destination celebrations",
  "Brand activations",
  "Private parties",
  "Corporate events",
  "Stress free — promise",
];

export const TRUST = [
  { icon: "sparkles", title: "Since 2016", sub: "Hundreds of celebrations" },
  { icon: "map", title: "Cape Town & beyond", sub: "Winelands to Tuscany" },
  { icon: "coffee", title: "Complimentary consult", sub: "Obligation free" },
] as const;

export const FOOTER_LINKS = [
  {
    title: "Celebrate",
    links: [
      { label: "Weddings", href: "/weddings" },
      { label: "Destination weddings", href: "/weddings#packages" },
      { label: "Corporate events", href: "/events" },
      { label: "Brand activations", href: "/events#brand-activations" },
      { label: "Private parties", href: "/events#private-parties" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Meet Meg", href: "/about" },
      { label: "Love notes", href: "/reviews" },
      { label: "Journal", href: "/blog" },
      { label: "Free resources", href: "/resources" },
    ],
  },
  {
    title: "Say hello",
    links: [
      { label: "Book a consultation", href: "/contact" },
      { label: CONTACT.enquiries, href: `mailto:${CONTACT.enquiries}` },
      { label: CONTACT.phone, href: CONTACT.phoneHref },
    ],
  },
];

export const SEARCH_SUGGESTIONS = ["Winelands wedding", "Brand activation", "Birthday", "Destination", "Flowers", "Checklist"];
