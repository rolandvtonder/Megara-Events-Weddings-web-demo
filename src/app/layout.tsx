import { imageSrc } from "@/lib/images";
import type { Metadata, Viewport } from "next";
import { Alex_Brush, Bodoni_Moda, Cormorant_Garamond, Jost } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { BRAND } from "@/data/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { StoreHydrator } from "@/components/providers/StoreHydrator";
import { BoardDrawer } from "@/components/layout/BoardDrawer";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Intro } from "@/components/layout/Intro";
import { Lightbox } from "@/components/layout/Lightbox";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { StoryModal } from "@/components/layout/StoryModal";
import { Toasts } from "@/components/layout/Toasts";

// next/font downloads these at build time and self-hosts them — no runtime Google Fonts request.
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-bodoni", display: "swap" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const alexBrush = Alex_Brush({ subsets: ["latin"], weight: "400", variable: "--font-alex-brush", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${BRAND.fullName} — ${BRAND.tagline}`, template: `%s — ${BRAND.fullName}` },
  description: BRAND.description,
  applicationName: BRAND.fullName,
  keywords: ["wedding planner Cape Town", "luxury wedding planner", "Winelands wedding", "destination wedding planner South Africa", "event planner Cape Town", "brand activations", "corporate events Cape Town"],
  openGraph: { type: "website", siteName: BRAND.fullName, title: `${BRAND.fullName} — ${BRAND.tagline}`, description: BRAND.description, images: [imageSrc("yasmeen-rafiq-09")] },
  twitter: { card: "summary_large_image", title: `${BRAND.fullName} — ${BRAND.tagline}`, description: BRAND.description },
};

export const viewport: Viewport = {
  themeColor: "#FBF7F5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-ZA" className={`${cormorant.variable} ${bodoni.variable} ${jost.variable} ${alexBrush.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="micro fixed left-4 top-4 z-[300] -translate-y-24 rounded-full bg-ink px-4 py-3 text-paper transition-transform focus:translate-y-0">
          Skip to content
        </a>
        <StoreHydrator />
        <SmoothScroll>
          <Intro />
          <Header />
          <MobileMenu />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <BoardDrawer />
          <SearchOverlay />
          <StoryModal />
          <Lightbox />
          <Toasts />
          <Cursor />
        </SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
