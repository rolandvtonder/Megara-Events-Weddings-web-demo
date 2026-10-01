import sizes from "@/data/image-sizes.json";

export type ImageSize = { w: number; h: number };
const SIZES = sizes as Record<string, ImageSize>;

/** Every photo lives at /images/<id>.webp — produced by `npm run images`. */
export const imageSrc = (id: string) => `/images/${id}.webp`;

export const imageSize = (id: string): ImageSize => SIZES[id] ?? { w: 1280, h: 1600 };

export const isPortrait = (id: string) => {
  const s = imageSize(id);
  return s.h > s.w;
};
