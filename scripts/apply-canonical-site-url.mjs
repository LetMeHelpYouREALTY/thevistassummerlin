/**
 * Replaces hardcoded `https://www.thevistassummerlin.com...` in src/*.ts(x)
 * with template literals using getSiteUrl(), and inserts the import.
 *
 * Inserts the import after the last top-of-file `import` block (handles
 * multiline `import { ... } from 'pkg'`), not after the first `import` line
 * (avoids splitting lucide-react and similar blocks).
 *
 * Skips: lib/site-url.ts, files that already import getSiteUrl, files with
 * no matching literal.
 *
 * Run: node scripts/apply-canonical-site-url.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(fileURLToPath(new URL("..", import.meta.url)), "src");
const D = "https://www.thevistassummerlin.com";
const IMPORT = "import { getSiteUrl } from '@/lib/site-url';\n";
const done = new Set(
  [path.join(root, "lib", "site-url.ts")].map((f) => path.normalize(f))
);

function walk(d, a = []) {
  for (const n of fs.readdirSync(d, { withFileTypes: true })) {
    if (n.name.startsWith(".")) continue;
    const p = path.join(d, n.name);
    if (n.isDirectory()) walk(p, a);
    else if (/\.(tsx|ts)$/.test(p)) a.push(p);
  }
  return a;
}

/** Line index (0-based) to insert a new import so it stays after all top imports. */
function endOfTopImportBlock(lines) {
  let i = 0;
  if (lines[0]?.includes?.("use client")) {
    i = 1;
  }
  const n = lines.length;
  while (i < n) {
    while (i < n && lines[i].trim() === "") {
      i++;
    }
    if (i >= n) break;
    const t = lines[i].trim();
    if (!t.startsWith("import")) {
      break;
    }
    /* One-line import, including `import './side'` (no ` from ` keyword). */
    if (/;\s*$/.test(lines[i])) {
      i++;
      continue;
    }
    /* Multiline `import { ... } from 'pkg';` */
    let j = i + 1;
    while (j < n) {
      if (lines[j].includes(" from ") && /;\s*$/.test(lines[j])) {
        i = j + 1;
        break;
      }
      j++;
    }
    if (j >= n) {
      i = n;
      break;
    }
  }
  return i;
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

for (const file of walk(root)) {
  if (done.has(path.normalize(file))) continue;
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes(D) || s.includes(IMPORT.trim()) || s.includes("getSiteUrl"))
    continue;

  const t = s
    .replace(
      new RegExp(`'${esc(D)}([^']*)'`, "g"),
      (_, pathAfter) => `\`\${getSiteUrl()}${pathAfter}\``
    )
    .replace(
      new RegExp(`"${esc(D)}([^"]*)"`, "g"),
      (_, pathAfter) => `\`\${getSiteUrl()}${pathAfter}\``
    );

  if (t === s) continue;

  const lines = t.split("\n");
  const at = endOfTopImportBlock(lines);
  lines.splice(at, 0, IMPORT.trim());
  s = lines.join("\n");
  fs.writeFileSync(file, s, "utf8");
  console.log(path.relative(path.join(root, ".."), file));
}
