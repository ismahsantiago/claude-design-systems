/**
 * Downloads the self-hosted open-source fonts into `packages/shared/fonts/`.
 *
 *   node scripts/fetch-fonts.mjs
 *
 * Why self-host rather than link a CDN: a system's stylesheet has to be
 * self-contained. `/design-sync` uploads the transitive `@import` closure of
 * one CSS file and renders it behind a strict CSP — an external font request
 * is simply dropped, and the design agent silently gets fallback metrics for
 * every page it builds. Self-hosting also removes a third-party request from
 * every consumer's critical path.
 *
 * Only OFL-licensed families are fetched here. Commercial faces (PP Editorial
 * New, Söhne Breit) cannot be redistributed and are documented as a drop-in
 * instead — see packages/shared/fonts/README.md.
 *
 * Latin and latin-ext subsets only. The Cyrillic, Greek and Vietnamese subsets
 * Google also serves roughly triple the payload for coverage no system in this
 * repo has a use for; add them here if that changes.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const FONTS_DIR = fileURLToPath(new URL('../packages/shared/fonts', import.meta.url));

// Google's API serves woff2 only to browser-like clients; an unrecognised
// user agent gets legacy ttf.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const WANTED_SUBSETS = new Set(['latin', 'latin-ext']);

/** @type {{ family: string, slug: string, url: string, license: string }[]} */
const FAMILIES = [
  {
    family: 'Inter',
    slug: 'inter',
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
    license: 'https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt',
  },
  {
    // editorial-bold's display face. Chosen for its axes as much as its shape:
    // SOFT and WONK let the system dial in a voice of its own rather than
    // shipping the face at its defaults like everyone else does.
    family: 'Fraunces',
    slug: 'fraunces',
    url: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,100..900,0..100,0..1&display=swap',
    license: 'https://raw.githubusercontent.com/undercasetype/Fraunces/master/OFL.txt',
  },
  {
    // editorial-bold's body face. A grotesque with a width axis, so the system
    // can set its own proportions instead of reaching for another weight.
    family: 'Archivo',
    slug: 'archivo',
    url: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap',
    license: 'https://raw.githubusercontent.com/Omnibus-Type/Archivo/master/OFL.txt',
  },
  {
    // consumer-warm. Humanist, generous apertures, friendly without being cute.
    family: 'Figtree',
    slug: 'figtree',
    url: 'https://fonts.googleapis.com/css2?family=Figtree:wght@300..900&display=swap',
    license: 'https://raw.githubusercontent.com/erikdkennedy/figtree/master/OFL.txt',
  },
  {
    // Stand-in for the commercial display faces named in the ref-cinematic-dark
    // brief (PP Editorial New, Söhne Breit). A variable grotesque with real
    // character at 140px, where Inter goes generic. The commercial names stay
    // ahead of it in the font stack, so dropping in licensed files wins
    // automatically without touching the theme.
    family: 'Bricolage Grotesque',
    slug: 'bricolage-grotesque',
    url: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap',
    license:
      'https://raw.githubusercontent.com/ateliertriay/bricolage/main/OFL.txt',
  },
  {
    family: 'JetBrains Mono',
    slug: 'jetbrains-mono',
    url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap',
    license: 'https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/OFL.txt',
  },
];

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.text();
}

/** Split the served stylesheet into `{ subset, block }` pairs. */
function parseBlocks(css) {
  const blocks = [];
  const pattern = /\/\*\s*([a-z-]+)\s*\*\/\s*(@font-face\s*\{[^}]+\})/g;
  let match;
  while ((match = pattern.exec(css)) !== null) {
    blocks.push({ subset: match[1], block: match[2] });
  }
  return blocks;
}

mkdirSync(FONTS_DIR, { recursive: true });

for (const { family, slug, url, license } of FAMILIES) {
  console.log(`\n${family}`);
  const remoteCss = await fetchText(url);
  const blocks = parseBlocks(remoteCss).filter(({ subset }) => WANTED_SUBSETS.has(subset));

  if (blocks.length === 0) {
    throw new Error(`No latin subsets found for ${family}. Google may have changed its format.`);
  }

  const rewritten = [];

  for (const { subset, block } of blocks) {
    const remoteUrl = block.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
    if (!remoteUrl) throw new Error(`No woff2 URL in the ${subset} block for ${family}`);

    const fileName = `${slug}-${subset}.woff2`;
    const response = await fetch(remoteUrl, { headers: { 'User-Agent': UA } });
    if (!response.ok) throw new Error(`${response.status} downloading ${remoteUrl}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    writeFileSync(join(FONTS_DIR, fileName), bytes);
    console.log(`  ${fileName}  ${(bytes.length / 1024).toFixed(1)} kB`);

    rewritten.push(
      block
        .replace(/url\(https:\/\/[^)]+\.woff2\)/, `url('./${fileName}')`)
        .replace(/^@font-face\s*\{/, '@font-face {')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join('\n  ')
        .replace(/\n {2}\}$/, '\n}'),
    );
  }

  const licenseText = await fetchText(license);
  writeFileSync(join(FONTS_DIR, `${slug}-LICENSE.txt`), licenseText);

  const header = `/**
 * ${family} — self-hosted, latin and latin-ext subsets.
 *
 * Generated by scripts/fetch-fonts.mjs. Do not edit by hand; re-run the script.
 * Licence: ${slug}-LICENSE.txt (SIL Open Font License 1.1).
 *
 * A variable font: one file covers the whole weight range, so every weight in
 * the token scale costs nothing extra to use.
 */

`;

  writeFileSync(join(FONTS_DIR, `${slug}.css`), header + rewritten.join('\n\n') + '\n');
  console.log(`  ${slug}.css`);
}

console.log('\nDone. Import the families a system uses from its theme.css.');
