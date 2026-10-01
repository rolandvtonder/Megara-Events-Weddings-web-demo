import type { MetadataRoute } from "next";
import { GALLERIES } from "@/data/portfolio";
import { POSTS } from "@/data/posts";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/weddings", "/events", "/portfolio", "/about", "/reviews", "/blog", "/resources", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...GALLERIES.map((g) => ({ url: `${base}/portfolio/${g.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...POSTS.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
