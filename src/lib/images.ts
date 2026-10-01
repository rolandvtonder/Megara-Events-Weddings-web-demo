import sizes from "@/data/image-sizes.json";

export type ImageSize = { w: number; h: number };
const SIZES = sizes as Record<string, ImageSize>;

/** Every photo lives at /images/<id>.webp — produced by `npm run images`. Prefixed with the GitHub Pages base path when set. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const imageSrc = (id: string) => `${BASE_PATH}/images/${id}.webp`;

export const imageSize = (id: string): ImageSize => SIZES[id] ?? { w: 1280, h: 1600 };

export const isPortrait = (id: string) => {
  const s = imageSize(id);
  return s.h > s.w;
};
