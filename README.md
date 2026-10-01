# Megara Events & Weddings — website

Next.js 16 · React 19 · Tailwind CSS v4 · GSAP + Lenis · Zustand

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (run before `npm run typecheck`)
npm start          # serve the production build
```

## Pages

| Route | What's there |
| --- | --- |
| `/` | Silk preloader, pinned scroll hero, services arches, 3D portfolio ring, Meet Meg, package picker, brand experiences, process, portfolio chapters, love notes, free worksheet |
| `/weddings` | The four wedding packages, why Megara, recent weddings, FAQ |
| `/events` | Corporate events, brand activations, private parties, client logos, FAQ |
| `/portfolio` | Filterable portfolio (weddings / celebrations / brand) |
| `/portfolio/[slug]` | One page per celebration with credits and a full-screen photo viewer |
| `/about` | Meg's story, beliefs, "This or that", the team |
| `/reviews` | Every testimonial |
| `/blog`, `/blog/[slug]` | The journal |
| `/resources` | Free downloads (email capture) |
| `/contact` | Enquiry form (includes the visitor's saved "enquiry board") |

## Editing content

All words live in `src/data/`:

- `site.ts` — contact details, navigation, announcement bar, footer links
- `services.ts` — wedding packages, event services, process steps, FAQs, client logos
- `portfolio.ts` — galleries (title, venue, credits, cover, photo list)
- `testimonials.ts`, `posts.ts`, `about.ts`, `resources.ts`, `home.ts`

## Adding photos

1. Put the original photos in a folder (any size, JPG/PNG/WebP).
2. Run `npm run images -- "path/to/folder"`. Each file becomes `public/images/<name>.webp`
   (max 1920px) and its size is recorded in `src/data/image-sizes.json`.
3. Reference the new name (without `.webp`) in the data files, e.g. add it to a gallery's `images` list.

## Forms (enquiries + free downloads)

Out of the box, forms open the visitor's email app pre-filled to `enquiries@megara.co.za`.
To receive submissions directly instead, create a free form endpoint (e.g. Formspree) and set:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

in `.env.local` (or your host's environment variables), then rebuild. See `.env.example`.

The free downloads currently send a *request*. Once the PDFs exist, drop them into
`public/downloads/` and they can be linked directly.

## Deploying

Vercel is the simplest: import the folder, set `NEXT_PUBLIC_SITE_URL=https://megara.co.za`
(and optionally the form endpoint), deploy, then point the domain's DNS at Vercel.
