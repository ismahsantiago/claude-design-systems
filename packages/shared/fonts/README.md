# Fonts

Self-hosted web fonts, shared by any system that wants them.

Fonts live here rather than in a system package because they are **assets, not values** — two systems naming Inter should not ship two copies of it. The token that picks a family (`--ds-font-sans`) still belongs to the system; the bytes belong here.

## What is here

| Family | Files | Licence |
| --- | --- | --- |
| Inter | `inter-*.woff2` | SIL OFL 1.1 — `inter-LICENSE.txt` |
| Bricolage Grotesque | `bricolage-grotesque-*.woff2` | SIL OFL 1.1 — `bricolage-grotesque-LICENSE.txt` |
| JetBrains Mono | `jetbrains-mono-*.woff2` | SIL OFL 1.1 — `jetbrains-mono-LICENSE.txt` |

All three are variable fonts, so one file covers the whole weight range and every weight in the token scale is free to use. Latin and latin-ext subsets only.

Regenerate with `node scripts/fetch-fonts.mjs`. Do not hand-edit the `.css` files.

## Using them

`@import` the families a system needs from the **top** of its `theme.css` — `@import` is only legal before other rules, and the bundler preserves that order into `dist/styles.css`:

```css
@import '@ds/shared/fonts/inter.css';
@import '@ds/shared/fonts/jetbrains-mono.css';
```

Then name the family in the relevant token. Importing a family without naming it in a token loads bytes nobody renders; `npm run verify` reports which families each system self-hosts so that is easy to spot.

## Commercial faces

Two faces named in the `cinematic-dark` brief are **not** here and cannot be:

- **PP Editorial New** — Pangram Pangram, commercial licence
- **Söhne Breit** — Klim Type Foundry, commercial licence

Neither is redistributable, so this repo ships **Bricolage Grotesque** as the display stand-in. It is a variable grotesque with real character at 140px, where Inter goes generic.

Both commercial names are still listed *ahead* of it in `--ds-font-display`:

```css
--ds-font-display: 'PP Editorial New', 'Söhne Breit', 'Bricolage Grotesque', 'Inter', …;
```

So once you have licensed the real thing, it takes over with no change to any token. To add it:

1. Put the licensed `.woff2` files in this directory. **Do not commit them** unless your licence permits redistribution — check before you do, and add them to `.gitignore` if it does not.
2. Write a `pp-editorial-new.css` next to them, following the shape of the generated files: one `@font-face` per weight or one variable face, `font-display: swap`, and relative `url('./…')` paths.
3. `@import` it from `packages/cinematic-dark/src/theme.css`, above the existing imports.
4. `npm run check` — the validator confirms every `url()` resolves to a file that actually exists in `dist/`.

Nothing else changes. That is the point of keeping the commercial names at the front of the stack from the start.

## Why self-hosted rather than a CDN link

A system's stylesheet has to be self-contained. `/design-sync` uploads the transitive `@import` closure of one CSS file and renders it under a strict CSP: an external font request is dropped outright, and the design agent silently gets fallback metrics for every page it builds. Self-hosting also removes a third-party request from every consumer's critical path.
