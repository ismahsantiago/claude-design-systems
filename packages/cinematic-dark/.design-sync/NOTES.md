# cinematic-dark — design-sync notes

## Repo shape

- **[GENERAL] This is a monorepo of several design systems, one per `packages/*`.**
  The skill assumes one DS per repo and resolves `.design-sync/` from the git
  root; here each system needs its own `projectId`, so **the package directory
  is the effective root**: `.design-sync/`, `.ds-sync/` and `ds-bundle/` all
  live in `packages/<system>/`. Run every converter command from there.
- `--node-modules` must be the **repo root** `../../node_modules`. npm workspaces
  hoist everything, so `packages/cinematic-dark/node_modules` is empty and the
  converter would find no react.
- `--entry dist/index.js`.
- The storybook globs `../../shared/src/**/*.stories.@(ts|tsx)`: the component
  catalogue lives in `@ds/shared` and is written once for all seven systems.

## Fixes applied

- **[GENERAL] `.storybook/preview.tsx` must import `../src/index`, not
  `../src/theme.css`.** Importing only the tokens made the reference storybook
  render the system *without its own `overrides.css`* — no pill buttons, no
  gradient-clipped headlines, no focus glow. That is a **false oracle**: the
  design-sync preview bundles the real `dist/`, so it renders MORE correctly
  than the thing it is graded against, and every affected component would grade
  `mismatch` for a defect that only exists in the reference. Caught on the very
  first solo component (Button). Fixed in all seven packages and in
  `scripts/new-system.mjs`; `new-variant.mjs` copies its base's preview.
- **[GENERAL] Each system package needs `"sideEffects": true`.** With
  `["**/*.css"]`, the bundler treats `src/index.ts` as side-effect-free and
  drops `import '../src/index'` wholesale — including its transitive CSS — so
  the storybook rendered completely unstyled. Fixed in all seven and in both
  generators.
- **[GENERAL] `FAQ` and `CTA` were silently dropped from the roster.**
  `isComponentName` in `.ds-sync/lib/dts.mjs` rejects `/^[A-Z][A-Z0-9_]+$/` as
  enum/constant names, and `package-build.mjs:715` applies it — so two real
  section components vanished with only a count in the log to show for it
  (`excluded 2 …; 28 components`). `cfg.componentSrcMap` does NOT help: that is
  the package-shape discovery path, not the storybook one. Fixed at the source
  by renaming the exports to `FAQSection` / `CTASection`, which one edit in
  `@ds/shared` fixes for all seven systems — the alternative was a
  `cfg.libOverrides` fork of `dts.mjs` copied into every package.
  **Watch for this on any future ALL-CAPS component name.**
- **`cfg.provider` is required here.** The decorator bundle fails with
  `No loader is configured for ".woff2"` — `preview.tsx` imports the theme,
  which `@import`s the self-hosted font CSS. `provider:
  {component:"ThemeProvider", props:{theme:"dark", fullBleed:true}}` skips
  decorator bundling and is the wrap guidance the README needs anyway.
- **`titleMap` keys are normalised without spaces.** `"Landing page"` did not
  match; the converter reports `Landingpage`. Both it (the demo fixture) and
  `Tokens` (a token reference, not a component) map to `null`.
- **12 components need `cardMode: "column"`** (`[GRID_OVERFLOW] … wide`).
  Landing sections are full-bleed by nature; `column` keeps every story at full
  card width instead of cropping it.
- **Header-bearing sections need a taller `viewport`.** `--ds-text-3xl` is
  5.5rem here, so a `SectionHeader` alone fills a 900x700 card and pushes the
  section's actual content out of frame. `1200x1200` for FeatureGrid,
  MediaShowcase, Pricing, Testimonials, FAQSection, CTASection; Hero needs
  `1200x1000` (it is `height="screen"`) with `primaryStory: "Centered"`.

## Grading gotchas

- **[GENERAL] The compare sheet is downscaled, and 1px strokes disappear in it.**
  A missing accent/error border in the sheet is usually the shrink, not the
  render — confirm against `raw/…__ds.png` before grading it a delta. (Cost one
  false alarm on Textarea "States".)
- **Framing is not a mismatch.** The storybook panel shrinks to fit the whole
  story; the preview panel is a fixed card. Tall stories (Section "Tones",
  Stack "Gap Scale", the sections generally) legitimately cut off at the frame
  edge. Judge what is in frame.
- **[GENERAL] An elevated component's shadow shows on the preview panel and not
  on storybook's.** The preview canvas does not fill the capture viewport, so
  the shadow lands on the page ground instead of full-bleed black. Framing, not
  a defect — expect it on Card, Hero, Pricing, Testimonials, Nav.
- **[GENERAL] Tall sections frame off the tail of a long story** (footnotes, the
  last card's body) while storybook shrinks to fit the whole flow. Judge what is
  in frame; no override is warranted.
- **A "Light" story rendering dark is CORRECT** — this system has no light mode.

## Real design bugs found while grading (not sync defects)

- **Pricing: the word `Custom` overflows its plan card**, identically on both
  panels. `--ds-text-3xl` at 5.5rem is too large for a word-length price. Needs
  a design fix in `@ds/shared` (a smaller price size when the value is not
  numeric), not a sync fix.
- **CTASection `Inverted`: the gradient-clipped headline sat on the ember fill**,
  making it nearly illegible. FIXED in `src/overrides.css` — the clip is now
  disabled inside `.ds-section--inverted`, restoring both `color` and
  `-webkit-text-fill-color`.
- **FeatureGrid "Cards": the fourth card's body text clips** at the frame edge
  even at 1200x1200. Accepted as `close`.

## Re-sync risks

- **The storybook glob reaches across packages.** A story added to `@ds/shared`
  changes the roster of **all seven** systems at once, so an unrelated system's
  re-sync can surface new ungraded components. Intended — the catalogue is
  shared — but "nothing changed here" is not the same as "nothing changed".
- **`cfg.provider` pins `theme: "dark"`.** Correct while this system has no
  light mode; revisit if that ever changes.
- **The demo landing page is excluded via `titleMap`.** If `LandingDemo` is ever
  promoted out of `@ds/shared/demo` into the public exports, that becomes wrong.
- **Fonts are self-hosted and reach designs through `styles.css`'s `@import`
  closure** (`fonts/fonts.css` + `_ds_bundle.css`). If the `externalize-fonts`
  plugin in `scripts/vite-library.mjs` regresses to inlining, the closure still
  works but the payload balloons.
- **Sibling-trusted grades.** Most components were graded by image-judging the
  primary story and trusting siblings under the §4 sampling rule. That is the
  documented path, but it means a regression confined to a non-primary story
  would not have been seen this run.
