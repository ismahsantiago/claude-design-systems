/**
 * Checks the portable landing-content.md contract without interpreting
 * business data. Placeholders are valid by default; --strict rejects them.
 */
import { readFileSync, existsSync } from 'node:fs';

const [file = 'packages/story-telling/landing-content.md', ...flags] = process.argv.slice(2);
const strict = flags.includes('--strict');

if (!existsSync(file)) {
  console.error(`Content brief not found: ${file}`);
  process.exit(1);
}

const source = readFileSync(file, 'utf8');
const requiredHeadings = [
  '## Content status',
  '## Navigation and hero',
  '## 01 — Arrival / claim',
  '## 02 — Tension',
  '## 03 — The route',
  '## 04 — Capability chapters',
  '## 05 — Evidence',
  '## 06 — Resolution',
  '## Footer',
  '## Assets and implementation notes',
];
const missing = requiredHeadings.filter((heading) => !source.includes(heading));
const unresolved = (source.match(/\[(?:TODO|SOURCE REQUIRED)[^\]]*\]/g) ?? []).length;

if (missing.length) {
  console.error('Missing required content sections:');
  for (const heading of missing) console.error(`  - ${heading}`);
  process.exit(1);
}

console.log(`PASS  content brief shape (${requiredHeadings.length} sections)`);
console.log(`INFO  unresolved fields: ${unresolved}`);
if (strict && unresolved > 0) {
  console.error('FAIL  --strict requires every TODO and SOURCE REQUIRED field to be resolved');
  process.exit(1);
}
console.log(strict ? 'PASS  content brief is publication-ready' : 'PASS  content brief is structurally valid');
