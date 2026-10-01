export type Service = {
  id: string;
  title: string;
  /** Short line used on cards and arches. */
  kicker: string;
  summary: string;
  body: string[];
  idealFor: string;
  includes: string[];
  image: string;
  tint: string;
  href: string;
  cta: string;
};

/* ───────────────────────── Weddings ───────────────────────── */

export const WEDDING_PACKAGES: Service[] = [
  {
    id: "complete-coordination",
    title: "Complete Co-ordination",
    kicker: "Your very own bridal bestie",
    summary: "For the couple with a million ideas and no clue where to start — or no time to plan the wedding of their dreams.",
    body: [
      "We work with the best possible team of professionals to create your one-of-a-kind celebration — one that reflects your individual tastes and personalities as a couple.",
      "Allow us to take the stress out of your wedding by ensuring every detail is managed to your exact specifications, so you can focus on what is really important: your marriage.",
    ],
    idealFor: "Busy couples & big visions",
    includes: ["Concept, design & styling", "Venue & supplier sourcing", "Budget management", "Timeline & guest logistics", "Monthly planning meetings", "Full on-the-day co-ordination"],
    image: "yasmeen-rafiq-09",
    tint: "#F6DCD3",
    href: "/weddings#complete-coordination",
    cta: "We need this",
  },
  {
    id: "partial-planning",
    title: "Partial Planning & Styling",
    kicker: "No stress planning",
    summary: "Begins with a complimentary consultation about your style, your vision and exactly the help you need.",
    body: [
      "Having a professional planner bring your vision to life is an exclusive and luxurious experience. To make sure it is executed perfectly, our On-the-Day Co-ordination is included.",
      "Every proposal is individually customised — we consider size, location and budget to formulate a tailored plan.",
    ],
    idealFor: "Couples who've started planning",
    includes: ["Complimentary consultation", "Styling & décor direction", "Selected supplier sourcing", "Planning check-ins", "On-the-day co-ordination included"],
    image: "julia-sander-04",
    tint: "#D2E5E7",
    href: "/weddings#partial-planning",
    cta: "This is for us",
  },
  {
    id: "on-the-day",
    title: "On-the-Day Co-ordination",
    kicker: "Plan it yourself, we'll run it",
    summary: "For the organised, DIY couple who loves the planning process but wants an experienced co-ordinator to execute it.",
    body: [
      "This package extends well beyond the day itself. About four weeks out we hold a hand-over meeting: you've secured your suppliers and décor, and we take over the management from there.",
      "We finalise your wedding timeline and bridal party schedule, and brief every vendor on your exact requirements — so on the day, you simply get married.",
    ],
    idealFor: "Organised DIY couples",
    includes: ["Hand-over meeting 4 weeks out", "Final timeline & run sheet", "Bridal party schedule", "Supplier briefings & confirmations", "Full day on-site management"],
    image: "stacey-steve-09",
    tint: "#EADBC8",
    href: "/weddings#on-the-day",
    cta: "Yes please",
  },
  {
    id: "destination",
    title: "Destination & Multi-day",
    kicker: "Love has no borders",
    summary: "Say “I do” under Tuscan skies, against an African safari sunset — or turn your Winelands wedding into a long weekend.",
    body: [
      "Work with a planner who speaks your language and knows exactly what it takes to craft the celebration of your dreams, wherever in the world it takes place.",
      "With a decade of international luxury experience, a wealth of suppliers ready to make magic happen and a European passport in hand, jumping on a plane has never been easier.",
    ],
    idealFor: "Adventurers & long weekends",
    includes: ["Destination & venue scouting", "Travel & accommodation logistics", "Welcome dinners & farewell brunches", "International supplier network", "Multi-day run sheets"],
    image: "julia-sander-10",
    tint: "#F3E2B8",
    href: "/weddings#destination",
    cta: "Sign me up",
  },
];

/* ───────────────────────── Events ───────────────────────── */

export const EVENT_SERVICES: Service[] = [
  {
    id: "corporate-events",
    title: "Corporate Events",
    kicker: "Conferences, launches & year-ends",
    summary: "We take your idea and create an experience — from venue sourcing and catering to décor, styling and tech.",
    body: [
      "With so many moving parts, let us take the stress out of your event and manage the details for you. Working only with the best suppliers, we co-ordinate every element and guarantee to make your brand shine.",
      "Whether you need a memorable media launch, a fabulous influencer lunch or a team celebration, our planners and stylists would love to help.",
    ],
    idealFor: "Teams who want concept to completion, seamlessly",
    includes: ["Venue sourcing", "Catering & bar", "Décor & styling", "AV & technical production", "Guest management", "On-site event management"],
    image: "amazon-02",
    tint: "#D2E5E7",
    href: "/events#corporate-events",
    cta: "That's for me",
  },
  {
    id: "brand-activations",
    title: "Brand Activations",
    kicker: "Make my brand shine",
    summary: "Turnkey, creative and strategic activations that build the relationship between people and your brand.",
    body: [
      "We are modern, creative planners and stylists who deliver the highest level of personalisation and professionalism, and we understand the relationship between brand building and brand activation.",
      "We manage the entire activation process — from concept to supplier sourcing to smooth execution on the day.",
    ],
    idealFor: "Brands that want experiences that excite & trend",
    includes: ["Activation concept & design", "Build & fabrication partners", "Staffing & brand ambassadors", "Retail & mall activations", "Seasonal campaigns", "Reporting & recap imagery"],
    image: "woolworths-activation",
    tint: "#F6DCD3",
    href: "/events#brand-activations",
    cta: "Get my brand shining",
  },
  {
    id: "private-parties",
    title: "Private Parties",
    kicker: "Help me celebrate",
    summary: "Your 1st birthday, a milestone 50th, a silver anniversary dinner, a luxury bridal shower — or anything in between.",
    body: [
      "Sometimes you just want to party. Whether it's a fabulous private dinner, a birthday, a bridal or baby shower or an anniversary, rely on our experience and passion for a personalised, memorable celebration.",
      "We make sure a special occasion is not just an event — it's an experience.",
    ],
    idealFor: "Milestones that deserve a moment",
    includes: ["Theme & styling", "Venue & catering", "Balloon & floral installations", "Entertainment", "Hosting & clean-up"],
    image: "erin-21st-09",
    tint: "#F3E2B8",
    href: "/events#private-parties",
    cta: "Let's start dreaming",
  },
];

export const ALL_SERVICES = [...WEDDING_PACKAGES, ...EVENT_SERVICES];

/* ───────────────────────── Process ───────────────────────── */

export const PROCESS = [
  {
    title: "Let's chat",
    kicker: "Complimentary consultation",
    body: "As with every event, we listen, understand and THEN act. Tell us everything — the vision, the vibe, the guest list, the budget.",
    image: "meg-phone",
    accent: "#E45E4C",
  },
  {
    title: "Your proposal",
    kicker: "Tailored, never one-size-fits-all",
    body: "A custom plan and realistic budget built around size, location and your priorities — with tools to keep you on track.",
    image: "team-planning",
    accent: "#E8BB5C",
  },
  {
    title: "Design & story",
    kicker: "Experiences, not just centrepieces",
    body: "We draw on elements of your story to design something you could never have imagined, yet is unmistakably yours.",
    image: "julia-sander-01",
    accent: "#D98C86",
  },
  {
    title: "The nuts & bolts",
    kicker: "Logistics that let you relax",
    body: "Suppliers, contracts, timelines, transport, seating nightmares — we manage every behind-the-scenes detail.",
    image: "stacey-steve-13",
    accent: "#4F8A8B",
  },
  {
    title: "The big day",
    kicker: "From concept to closing time",
    body: "From the moment your first guest arrives to the moment the last one walks out, we're there. You relax; we handle the details.",
    image: "aidan-bianca-13",
    accent: "#D2E5E7",
  },
];

export const WEDDING_PROMISES = [
  {
    title: "Stress-free wedding planning",
    body: "Imagine waking up on your wedding day feeling relaxed and excited. Everything is incredibly organised, friends and family are amped — and today, you're getting married.",
  },
  {
    title: "Frequent + clear communication",
    body: "Video calls, monthly meetings and WhatsApp. With couples based all over the world, we keep a constant dialogue so you feel looked after at every step.",
  },
  {
    title: "A decade of experience",
    body: "Logistical precision married with unmatched detail and guest experience — and an incredible network of suppliers behind every celebration.",
  },
];

export const WEDDING_FAQ = [
  {
    q: "When should we book our planner?",
    a: "As early as you can — ideally 12–18 months out for full planning, so we can secure the venues and suppliers you love. On-the-Day Co-ordination can be booked closer to the date, with our hand-over meeting about four weeks before.",
  },
  {
    q: "Do you only plan weddings in Cape Town?",
    a: "Cape Town and the Winelands are home, but love has no borders. We plan destination and multi-day celebrations across South Africa and internationally.",
  },
  {
    q: "How much does a wedding planner cost?",
    a: "Every proposal is individually customised based on guest count, location and the level of support you need. Book a complimentary consultation and we'll put together a tailored quote.",
  },
  {
    q: "Will we still have creative control?",
    a: "Always. We design every wedding as an expression of you — your character, your quirks, your style and your love story. Our job is to make your vision possible, then make it effortless.",
  },
];

export const EVENT_FAQ = [
  {
    q: "How far in advance should we start planning?",
    a: "Give yourself the gift of time. Allow at least a month before the event to begin sourcing quotes — larger productions can take several months. The more time we have, the more realistic it is to deliver your result within budget.",
  },
  {
    q: "Can you work with our brand guidelines?",
    a: "Absolutely. Every activation and corporate event is designed around your brand, objectives and audience — we're as comfortable with a CI manual as a mood board.",
  },
  {
    q: "Do you work outside Cape Town?",
    a: "Yes — we have delivered activations in both Johannesburg and Cape Town and travel wherever the event needs us.",
  },
];

export const CLIENTS = [
  { name: "Amazon Web Services", logo: "logo-amazon" },
  { name: "Woolworths", logo: "logo-woolworths" },
  { name: "UCOOK", logo: "logo-ucook" },
  { name: "Coronation", logo: "logo-coronation" },
  { name: "Vitol", logo: "logo-vitol" },
];
