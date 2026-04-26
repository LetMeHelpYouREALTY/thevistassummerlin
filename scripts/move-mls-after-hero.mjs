import fs from "fs";
import path from "path";

const blockRe =
  /\r?\n(\s*)\{\/\*\s*RealScout Office Listings\s*\*\/\s*\}[\s\S]*?\r?\n\1<\/section>/;
const mainRe = /<main[^>]*className="flex-grow"[^>]*>/;

const dir = path.join("src", "app", "(routes)", "communities");
const subdirs = fs
  .readdirSync(dir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => path.join(dir, d.name, "page.tsx"))
  .filter((f) => f !== path.join(dir, "page", "page.tsx"));

for (const f of subdirs) {
  if (!fs.existsSync(f)) continue;
  if (f.includes("portofino")) continue;
  let c = fs.readFileSync(f, "utf8");
  if (!c.includes("RealScout Office Listings")) continue;

  const mBlock = c.match(blockRe);
  if (!mBlock) {
    console.error("no block", f);
    continue;
  }
  const block = mBlock[0];
  let c2 = c.replace(blockRe, "\n");

  const mm = c2.match(mainRe);
  if (!mm) {
    console.error("no main", f);
    continue;
  }
  const start = mm.index + mm[0].length;
  const rest = c2.slice(start);
  const endIdx = rest.indexOf("</section>");
  if (endIdx === -1) {
    console.error("no first section", f);
    continue;
  }
  const pos = start + endIdx + "</section>".length;
  c2 = c2.slice(0, pos) + block + c2.slice(pos);
  fs.writeFileSync(f, c2, "utf8");
  console.log("moved", f);
}
