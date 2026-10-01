export type Resource = {
  id: string;
  title: string;
  kicker: string;
  body: string;
  image: string;
  tint: string;
  /** Path to the PDF in /public/downloads once it exists; until then the form emails a request. */
  file?: string;
};

export const RESOURCES: Resource[] = [
  {
    id: "itinerary-worksheet",
    title: "The Ultimate Wedding Itinerary Worksheet",
    kicker: "Free gift for stopping by",
    body: "Exactly how to calculate the timing of your wedding day — from scheduling hair and make-up to transport, photography and everything in between. Our own team uses this foolproof worksheet for every event we do.",
    image: "freebie-checklist",
    tint: "#F6DCD3",
  },
  {
    id: "floral-checklist",
    title: "The Ultimate Floral Checklist",
    kicker: "Free download",
    body: "Every bouquet, buttonhole and centrepiece you need to think about — plus our favourite tricks for reusing arrangements to stretch your floral budget.",
    image: "yasmeen-rafiq-16",
    tint: "#F3E2B8",
  },
  {
    id: "planning-checklist",
    title: "Steal My Wedding Planning Checklist",
    kicker: "Free download",
    body: "Take the stress out of planning your own wedding. Follow these simple, month-by-month steps to keep everything on track.",
    image: "julia-sander-09",
    tint: "#D2E5E7",
  },
];
