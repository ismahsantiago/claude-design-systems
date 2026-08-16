/**
 * Renders the story-telling landing page to one self-contained HTML file.
 *
 *   node scripts/render-artifact.mjs [outfile]
 *
 * The markup comes from server-rendering the real page component against the
 * package's own compiled components, and the CSS is the package's own emitted
 * `dist/styles.css` — so this file is the design system's actual output, not a
 * hand-written approximation of it.
 *
 * Fonts are inlined as data URIs here, which is the opposite of what the
 * library build does on purpose: a shareable single file has nowhere to fetch
 * a sibling `fonts/` directory from, and a page hosted under a strict CSP
 * cannot reach an external host either. The cost is a larger file that a
 * browser cannot cache per-face; for a one-page artifact that is the right
 * trade, and for the shipped library it is not.
 */
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';

const PKG = dirname(dirname(fileURLToPath(import.meta.url)));
const out = resolve(process.argv[2] ?? join(PKG, 'dist', 'story-landing.html'));

// CSS is taken from dist/, so the SSR bundle only needs the JS. Resolving
// stylesheet imports to an empty module keeps esbuild from needing a loader
// for every asset type the design system pulls in.
const ignoreCss = {
  name: 'ignore-css',
  setup(b) {
    b.onResolve({ filter: /\.css$/ }, (args) => ({ path: args.path, namespace: 'empty-css' }));
    b.onLoad({ filter: /.*/, namespace: 'empty-css' }, () => ({ contents: '', loader: 'js' }));
  },
};

const bundle = await build({
  stdin: {
    contents: `
      import { renderToStaticMarkup } from 'react-dom/server';
      import { StoryLanding } from ${JSON.stringify(join(PKG, 'src', 'StoryLanding.tsx'))};
      export const html = renderToStaticMarkup(StoryLanding());
    `,
    resolveDir: PKG,
    loader: 'js',
  },
  bundle: true,
  format: 'cjs',
  platform: 'node',
  jsx: 'automatic',
  write: false,
  plugins: [ignoreCss],
  logLevel: 'warning',
});

const require_ = createRequire(import.meta.url);
const module_ = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(
  require_,
  module_,
  module_.exports,
);
const body = module_.exports.html;

let css = readFileSync(join(PKG, 'dist', 'styles.css'), 'utf8');
for (const match of [...css.matchAll(/url\(['"]?\.\/fonts\/([^'")]+)['"]?\)/g)]) {
  const bytes = readFileSync(join(PKG, 'dist', 'fonts', match[1]));
  css = css.replace(match[0], `url(data:font/woff2;base64,${bytes.toString('base64')})`);
}

/*
 * `body` paints its own ground on purpose. This system is deliberately
 * single-theme — warm paper, always — and the ThemeProvider stamps
 * `data-ds-theme` on its own element, so a viewer's dark preference cannot
 * reach it. What a transparent body WOULD do is let the host's ground show
 * through anywhere the page does not cover, which reads as a rendering bug.
 */
const head = `<style>
${css}
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
body { margin: 0; background: var(--ds-color-bg); color: var(--ds-color-text); }
</style>
${body}
`;

// `--fragment` emits what the Artifact publisher expects: page content only,
// no document scaffolding, because it supplies its own.
const html = process.argv.includes('--fragment')
  ? head
  : `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Northbound Freight — a story-telling landing page</title>
</head>
<body>
${head}
</body>
</html>
`;

writeFileSync(out, html);
console.log(`${out}  ${(Buffer.byteLength(html) / 1024).toFixed(0)} kB`);
