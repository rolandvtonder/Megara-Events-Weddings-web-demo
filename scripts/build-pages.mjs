// Builds a static copy of the site into ./out for GitHub Pages
// (served at https://rolandvtonder.github.io/Megara-Events-Weddings-web-demo/).
import { execSync } from "node:child_process";
import fs from "node:fs";

const REPO = "Megara-Events-Weddings-web-demo";

execSync("npx next build", {
  stdio: "inherit",
  env: { ...process.env, PAGES_BASE_PATH: `/${REPO}`, NEXT_PUBLIC_SITE_URL: `https://rolandvtonder.github.io/${REPO}` },
});
// Without this, GitHub's Jekyll step would hide the _next/ folder.
fs.writeFileSync("out/.nojekyll", "");
console.log("\nStatic site ready in ./out");
