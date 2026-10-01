// Converts source photos to web-ready WebP in public/images and records their
// dimensions in src/data/image-sizes.json (used for aspect ratios + lightbox).
// Usage: npm run images -- <source-folder>
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
if (!src || !fs.existsSync(src)) {
  console.error("Pass the folder of source images: npm run images -- <folder>");
  process.exit(1);
}
const out = path.resolve("public/images");
const sizesFile = path.resolve("src/data/image-sizes.json");
fs.mkdirSync(out, { recursive: true });
const sizes = fs.existsSync(sizesFile) ? JSON.parse(fs.readFileSync(sizesFile, "utf8")) : {};

const files = fs.readdirSync(src).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
for (const f of files) {
  const id = path.parse(f).name.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const dest = path.join(out, `${id}.webp`);
  // Logos keep alpha and stay small; photos cap at 1920px on the long edge.
  const isLogo = /logo|ucook|coronation|template|screenshot/.test(id);
  const img = sharp(path.join(src, f)).rotate().resize({ width: isLogo ? 800 : 1920, height: isLogo ? 800 : 1920, fit: "inside", withoutEnlargement: true });
  const info = await img.webp({ quality: isLogo ? 90 : 76, effort: 5 }).toFile(dest);
  sizes[id] = { w: info.width, h: info.height };
  process.stdout.write(".");
}
fs.writeFileSync(sizesFile, JSON.stringify(sizes, null, 2) + "\n");
console.log(`\n${files.length} images → public/images`);
