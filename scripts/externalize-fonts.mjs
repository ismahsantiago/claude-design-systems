import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';

/**
 * Puts font files back on disk after Vite has inlined them.
 *
 * Vite's library mode inlines every CSS-referenced asset as a `data:` URI and
 * honours neither the numeric nor the callback form of `assetsInlineLimit`
 * while doing it. For a variable font that produces a ~535 kB stylesheet that
 * gzips to ~384 kB, because base64 is already entropy-dense — the fonts stop
 * being cacheable, cannot be fetched in parallel, and block first paint.
 *
 * So rather than fight the inlining, this undoes it. Each font is base64
 * encoded up front and that exact string is swapped back out of the emitted
 * CSS for a relative `./fonts/<name>` URL, with the real file written
 * alongside. Matching on the encoded bytes rather than parsing the data URI
 * makes the mapping back to a filename exact, and a font that was somehow not
 * inlined is simply left alone.
 *
 * This runs in `writeBundle` rather than `generateBundle` on purpose: Vite
 * adds the stylesheet to the bundle from its own `generateBundle`, so a
 * plugin hooking the same stage may not see the CSS asset at all. By
 * `writeBundle` the file is on disk, which is unambiguous.
 *
 * `fonts/` is also the layout `/design-sync` expects to upload.
 *
 * @param {URL} fontsDirUrl directory holding the source fonts.
 * @returns {import('vite').Plugin}
 */
export function externalizeFonts(fontsDirUrl) {
  const fontsDir = fileURLToPath(fontsDirUrl);
  /** @type {{ name: string, base64: string, bytes: Buffer }[]} */
  let fonts = [];
  /** @type {string} */
  let outDir = 'dist';

  return {
    name: 'ds:externalize-fonts',
    apply: 'build',
    enforce: 'post',

    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },

    buildStart() {
      fonts = readdirSync(fontsDir)
        .filter((name) => /\.(woff2?|ttf|otf)$/i.test(name))
        .map((name) => {
          const bytes = readFileSync(join(fontsDir, name));
          return { name, bytes, base64: bytes.toString('base64') };
        });
    },

    writeBundle() {
      const cssPath = join(outDir, 'styles.css');
      let css;
      try {
        css = readFileSync(cssPath, 'utf8');
      } catch {
        return; // No stylesheet in this output format.
      }

      const used = [];
      for (const font of fonts) {
        const replaced = replaceUrlContaining(css, font.base64, `url('./fonts/${font.name}')`);
        if (replaced === css) continue;
        css = replaced;
        used.push(font);
      }

      if (used.length === 0) return;

      mkdirSync(join(outDir, 'fonts'), { recursive: true });
      for (const font of used) {
        writeFileSync(join(outDir, 'fonts', font.name), font.bytes);
      }
      writeFileSync(cssPath, css);
    },
  };
}

/**
 * Replaces every `url(...)` whose contents include `needle`.
 *
 * Deliberately not a regular expression: the needle is a base64 payload tens
 * of thousands of characters long, and V8 rejects a pattern built around one
 * as "Invalid regular expression" — the compiled program exceeds its size
 * limit. Literal search plus a scan out to the enclosing delimiters is both
 * unbounded in input size and exact.
 */
function replaceUrlContaining(css, needle, replacement) {
  let result = '';
  let cursor = 0;

  for (;;) {
    const hit = css.indexOf(needle, cursor);
    if (hit === -1) break;

    const open = css.lastIndexOf('url(', hit);
    const close = css.indexOf(')', hit + needle.length);
    if (open === -1 || close === -1) break;

    result += css.slice(cursor, open) + replacement;
    cursor = close + 1;
  }

  return result + css.slice(cursor);
}
