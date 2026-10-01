// Builds a static copy of the site into ./out for GitHub Pages
// (served at https://rolandvtonder.github.io/Megara-Events-Weddings-web-demo/).
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO = "Megara-Events-Weddings-web-demo";

execSync("npx next build", {
  stdio: "inherit",
  env: { ...process.env, PAGES_BASE_PATH: `/${REPO}`, NEXT_PUBLIC_SITE_URL: `https://rolandvtonder.github.io/${REPO}` },
});

// Without this, GitHub's Jekyll step would hide the _next/ folder.
fs.writeFileSync("out/.nojekyll", "");

// The export writes route-segment data as nested folders (contact/__next.contact/__PAGE__.txt),
// but the client prefetches dotted names (contact/__next.contact.__PAGE__.txt). Copy each file to
// the dotted name too, so link prefetching works and navigation stays client-side.
let copied = 0;
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    const parts = path.relative("out", full).split(path.sep);
    const i = parts.findIndex((p) => p.startsWith("__next."));
    if (i === -1 || i === parts.length - 1) continue;
    const dotted = path.join("out", ...parts.slice(0, i), parts.slice(i).join("."));
    if (!fs.existsSync(dotted)) {
      fs.copyFileSync(full, dotted);
      copied++;
    }
  }
};
walk("out");
console.log(`\nStatic site ready in ./out (${copied} prefetch files aliased)`);
