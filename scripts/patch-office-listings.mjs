import fs from "fs";
import path from "path";

const root = path.resolve(".");
const dir = path.join(root, "src/app/(routes)/communities");
const subdirs = fs
  .readdirSync(dir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => path.join(dir, d.name, "page.tsx"));

const importLine =
  "import { VistasRealScoutOfficeListings } from '@/components/VistasRealScoutOfficeListings';\n";

function replaceBlock(full) {
  const ind = (full.match(/^[ \t]*/) || [""])[0];
  return (
    `${ind}<VistasRealScoutOfficeListings\n` +
    `${ind}  sort-order="PRICE_LOW"\n` +
    `${ind}  listing-status="For Sale"\n` +
    `${ind}  property-types=",SFR"\n` +
    `${ind}/>`
  );
}

function addImport(c) {
  if (c.includes("import { VistasRealScoutOfficeListings }")) {
    return c;
  }
  if (c.includes("from '@/components/sections/footer'")) {
    return c.replace(
      /(import Footer from '@\/components\/sections\/footer';)\n/,
      `$1\n${importLine}`
    );
  }
  return c;
}

for (const f of subdirs) {
  if (!fs.existsSync(f)) continue;
  let c = fs.readFileSync(f, "utf8");
  if (!c.includes("realscout-office-listings")) continue;

  const next = c.replace(
    /<[ \t]*realscout-office-listings[\s\S]*?<\/[ \t]*realscout-office-listings[ \t]*>/,
    replaceBlock
  );
  if (next === c) {
    console.error("no replace:", f);
    continue;
  }
  fs.writeFileSync(f, addImport(next), "utf8");
  console.log("ok", f);
}
