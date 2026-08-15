/**
 * Validates every design system in the repo against the token contract.
 *
 * Run after `npm run build` (or via `npm run check`, which does both).
 * Pass a system name to check just one: `npm run verify -- saas-clean`.
 *
 * What it catches, and why each check earns its place:
 *
 *   1. Contract completeness — a system that forgets a token does not error,
 *      it renders that property as nothing. A missing `--ds-radius-lg` is a
 *      square card nobody notices until it ships.
 *   2. Dangling references — CSS that reads a `var(--ds-*)` no one declares
 *      silently resolves to an empty value. Transparent text, zero padding.
 *   3. Class coverage — a class in the markup with no rule in the stylesheet
 *      is an unstyled component. Invisible in review, obvious in production.
 *   4. Structural assertions — the components still emit the markup and ARIA
 *      wiring they promise.
 *
 * All four are failure modes that typechecking and a green build cannot see.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { REQUIRED_TOKENS, LOCALLY_SCOPED } from '../packages/shared/contract.mjs';
import { buildCoverageTree } from './coverage-tree.mjs';

const PACKAGES_DIR = fileURLToPath(new URL('../packages', import.meta.url));
const SKIP = new Set(['shared']);

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

const requested = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));

const systems = readdirSync(PACKAGES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !SKIP.has(entry.name))
  .map((entry) => entry.name)
  .filter((name) => requested.length === 0 || requested.includes(name));

if (systems.length === 0) {
  console.error(
    requested.length > 0
      ? `No system named ${requested.join(', ')} in packages/.`
      : 'No design systems found in packages/.',
  );
  process.exit(1);
}

/** One system's verdict, in the shape every path prints. */
function reportSystem(system, results, selfHosted) {
  const suffix = selfHosted.length
    ? ` ${DIM}self-hosting ${selfHosted.join(', ')}${RESET}`
    : ` ${DIM}system fonts only${RESET}`;
  console.log(`\n${BOLD}${system}${RESET}${suffix}`);
  for (const { ok, label, detail } of results) {
    console.log(`${ok ? GREEN + 'PASS' : RED + 'FAIL'}${RESET}  ${label}`);
    if (!ok && detail?.length) {
      for (const item of detail.slice(0, 12)) console.log(`      ${DIM}${item}${RESET}`);
      if (detail.length > 12) console.log(`      ${DIM}…and ${detail.length - 12} more${RESET}`);
    }
  }
}

let failedSystems = 0;

for (const system of systems) {
  const dir = join(PACKAGES_DIR, system);
  const dist = join(dir, 'dist');
  const results = [];

  const record = (ok, label, detail) => results.push({ ok, label, detail });

  // ---- naming convention ----
  // A scheme only stays a scheme if something enforces it, and names are what
  // every future reader sees before they see anything else. Checked here
  // rather than in the generators because packages get renamed and
  // hand-edited long after they are created.
  //
  // Deliberately ahead of the dist/ check below: naming does not depend on a
  // build, and a misnamed package is most likely a brand new one that has
  // never been built. Bailing out first would hide the very case this exists
  // for.
  const manifest = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
  const variantOf = manifest.designSystem?.variantOf;
  const nameProblems = [];

  if (manifest.name !== `@ds/${system}`) {
    nameProblems.push(`package.json name is ${manifest.name}, expected @ds/${system}`);
  }

  if (variantOf) {
    // A variant must read as its base plus what changed, so the family is
    // obvious from an alphabetical listing.
    if (!system.startsWith(`${variantOf}-`)) {
      nameProblems.push(`variant of ${variantOf} must be named ${variantOf}-<change>`);
    } else {
      const suffix = system.slice(variantOf.length + 1).split('-');
      if (suffix.length > 2) {
        nameProblems.push(
          `variant suffix "${suffix.join('-')}" names ${suffix.length} changes; ` +
            'keep it to 2 — past that the name stops communicating and it wants to be its own system',
        );
      }
    }
  } else {
    // Base systems are <register>-<quality>: register first, always, and the
    // quality must be one a variant cannot change (canvas, density, weight) —
    // never the accent, or the first recolour makes the name a lie.
    const bare = system.replace(/^ref-/, '');
    if (bare.split('-').length !== 2) {
      nameProblems.push(
        `"${system}" should be <register>-<quality>, e.g. saas-clean (optionally ref-prefixed)`,
      );
    }
  }

  if (system.startsWith('ref-') && !manifest.designSystem?.reference) {
    nameProblems.push('ref- prefix requires designSystem.reference: true in package.json');
  }
  if (manifest.designSystem?.reference && !system.startsWith('ref-')) {
    nameProblems.push('a reference study must be named ref-<register>-<quality>');
  }

  record(nameProblems.length === 0, 'name follows the scheme', nameProblems);

  if (!existsSync(dist)) {
    record(false, 'built — run `npm run build` first', []);
    reportSystem(system, results, []);
    failedSystems += 1;
    continue;
  }

  // ---- artifacts ----
  const required = ['index.js', 'index.cjs', 'index.d.ts', 'styles.css'];
  const missingArtifacts = required.filter((file) => !existsSync(join(dist, file)));
  record(missingArtifacts.length === 0, 'build emits the expected artifacts', missingArtifacts);

  const css = readFileSync(join(dist, 'styles.css'), 'utf8');

  // ---- 1. contract completeness ----
  const declared = new Set(
    [...css.matchAll(/(--ds-[a-z0-9-]+)\s*:/g)].map((match) => match[1]),
  );
  const missingTokens = REQUIRED_TOKENS.filter((token) => !declared.has(token));
  record(
    missingTokens.length === 0,
    `answers all ${REQUIRED_TOKENS.length} contract tokens`,
    missingTokens,
  );

  // ---- 2. dangling references ----
  const referenced = [...new Set([...css.matchAll(/var\((--ds-[a-z0-9-]+)/g)].map((m) => m[1]))];
  const dangling = referenced.filter(
    (token) => !LOCALLY_SCOPED.test(token) && !declared.has(token),
  );
  record(dangling.length === 0, `every referenced token resolves (${referenced.length})`, dangling);

  // ---- 3. font assets ----
  // A stylesheet that names a face it cannot load is the same class of failure
  // as a missing token: no error, just fallback metrics everywhere. And an
  // inlined font means the bundler's asset handling silently regressed.
  const assetRefs = [
    ...new Set([...css.matchAll(/url\(['"]?\.\/([^'")]+)['"]?\)/g)].map((match) => match[1])),
  ];
  const brokenRefs = assetRefs.filter((ref) => !existsSync(join(dist, ref)));
  record(brokenRefs.length === 0, `every asset URL resolves (${assetRefs.length})`, brokenRefs);

  const inlinedFonts = (css.match(/data:font/g) ?? []).length;
  record(
    inlinedFonts === 0,
    'fonts are emitted as files, not inlined',
    inlinedFonts ? [`${inlinedFonts} data: URI(s) in styles.css`] : [],
  );

  // Self-hosted families are reported, not asserted: a system may legitimately
  // rely on system fonts alone, so having none is not a failure.
  const selfHosted = [
    ...new Set(
      [...css.matchAll(/@font-face\s*\{[^}]*?font-family:\s*['"]?([^;'"}]+)/g)].map((match) =>
        match[1].trim(),
      ),
    ),
  ];

  // ---- render for the remaining checks ----
  let html = '';
  let renderError = null;
  try {
    const DS = await import(pathToFileURL(join(dist, 'index.js')).href);
    html = renderToStaticMarkup(buildCoverageTree(DS));
  } catch (error) {
    renderError = error;
  }
  record(renderError === null, 'coverage tree renders', renderError ? [renderError.message] : []);

  if (!renderError) {
    // ---- 3. class coverage ----
    const used = [
      ...new Set(
        [...html.matchAll(/class="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/)),
      ),
    ].filter(Boolean);
    const unstyled = used.filter((name) => !css.includes(`.${name}`));
    record(unstyled.length === 0, `every rendered class has a rule (${used.length})`, unstyled);

    // ---- 4. structural assertions ----
    const structural = [
      ['ThemeProvider stamps the theme', /data-ds-theme="light"/],
      ['Hero renders its headline', /ds-hero__headline/],
      ['Nav renders links', /ds-nav__link/],
      ['Pricing marks the featured plan', /ds-plan--featured/],
      ['FAQ uses native disclosure', /<details/],
      ['Field wires aria-describedby', /aria-describedby="[^"]+-message"/],
      ['invalid controls are marked', /aria-invalid="true"/],
      ['errors announce as alerts', /role="alert"/],
      ['Avatar falls back to initials', />AL</],
      ['Footer renders its columns', /ds-footer__column-title/],
    ];
    const brokenStructure = structural
      .filter(([, pattern]) => !pattern.test(html))
      .map(([label]) => label);
    record(
      brokenStructure.length === 0,
      `markup and ARIA contracts hold (${structural.length})`,
      brokenStructure,
    );
  }

  // ---- report ----
  const failures = results.filter((result) => !result.ok);
  if (failures.length > 0) failedSystems += 1;

  reportSystem(system, results, selfHosted);
}

console.log(
  failedSystems === 0
    ? `\n${GREEN}All ${systems.length} system(s) passed.${RESET}`
    : `\n${RED}${failedSystems} of ${systems.length} system(s) failed.${RESET}`,
);
process.exit(failedSystems === 0 ? 0 : 1);
