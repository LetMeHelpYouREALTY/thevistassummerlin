import fs from "fs";
import path from "path";

const importLine =
  "import { VistasRealScoutOfficeListings } from '@/components/VistasRealScoutOfficeListings';\n";

const root = path.join(process.cwd(), "src/app/(routes)/communities");
const files = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => path.join(root, d.name, "page.tsx"));
files.push(path.join(root, "page.tsx"));

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let c = fs.readFileSync(f, "utf8");
  if (!c.includes("VistasRealScoutOfficeListings")) continue;
  if (c.includes("import { VistasRealScoutOfficeListings }")) {
    continue;
  }
  const next = c.replace(
    /(import Footer from ['"]@\/components\/sections\/footer['"];)\r?\n/,
    `$1\n${importLine}`
  );
  if (next === c) {
    console.error("no footer match", f);
    continue;
  }
  fs.writeFileSync(f, next, "utf8");
  console.log("import ok", f);
}
