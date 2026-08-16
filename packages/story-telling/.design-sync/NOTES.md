# Story-Telling — design-sync notes

- This package is the executable form of `docs/proposals/story-telling`.
- `projectId` is now persisted in `.design-sync/config.json`
  (`14eaa21e-caf0-4909-a0ce-86188796daf8`, project "Story-Telling"). Never
  fabricate or hand-edit it — losing it makes the next sync create a duplicate
  project and orphan this one.
- Run `/design-sync` from `packages/story-telling`, because this monorepo has
  one Claude Design project per package.
- `dist/index.js` is the compiled entry and `dist/styles.css` contains the
  theme, shared component rules, and Story-Telling overrides in load-bearing
  order.
- `landing-content.md` is input for page generation, not a component and not a
  replacement for the design-system catalogue. It is deliberately NOT uploaded.

## Repo shape

- **[GENERAL] Monorepo of several design systems, one per `packages/*`.** The
  skill assumes one DS per repo and resolves `.design-sync/` from the git root;
  here each system needs its own `projectId`, so **the package directory is the
  effective root**: `.design-sync/`, `.ds-sync/` and `ds-bundle/` all live in
  `packages/<system>/`. Run every converter command from there.
- `--node-modules` must be the **repo root** `../../node_modules`. npm
  workspaces hoist everything, so `packages/story-telling/node_modules` has no
  `react` and the converter would find none.
- `--entry dist/index.js`.
- The storybook globs `../../shared/src/**/*.stories.@(ts|tsx)`: the component
  catalogue lives in `@ds/shared` and is written once for all eight systems.

## First-sync findings (2026-08-16)

- **Build and validate were clean on the FIRST run** — no `[TAG]` errors, 33
  components, 128/128 stories paired, no `[GRID_OVERFLOW]`. The two `[GENERAL]`
  fixes carried over from the cinematic-dark sync (`.storybook/preview.tsx`
  importing `../src/index` rather than `../src/theme.css`, and
  `"sideEffects": true` in package.json) were already in place here and are why.
  Do not regress either — each one silently unstyles the whole reference
  storybook, which is a **false oracle**, not a visible failure.
- **`StoryLanding` is excluded via `titleMap`, deliberately.** It is a demo
  composition carrying an invented brand ("NORTHBOUND FREIGHT") and sample-data
  figures; its own header says to replace both before anything ships, and
  `AGENTS.md` forbids presenting invented business facts as real. Shipping it
  would let the design agent compose pages containing that fake brand and those
  fake metrics. The shared `Landing page` fixture is excluded for the same
  reason. **If `landing-content.md` is ever filled in with real content, revisit
  this** — it is a content decision, not a technical one.
- **`titleMap` keys are normalised without spaces**: `'Story landing'` is
  reported as `Storylanding`, `'Landing page'` as `Landingpage`.

## Grading gotchas

- **[GENERAL] `[FONT_MISSING] "Arial Narrow"` is a benign fallback, not a miss.**
  It is the third family in `--ds-font-display: 'Archivo', 'Arial Narrow', …`.
  Archivo itself ships self-hosted, with the `font-stretch: 62% 125%` axis that
  gives this system its condensed display type, and reaches designs through
  `styles.css`'s `@import` closure. Accepted as a substitute — do not chase it.
- **[GENERAL] `[ASSETS_BLOCKED] example.invalid` is expected and harmless.**
  `Avatar`'s "Broken Image Fallback" story points at
  `https://example.invalid/missing.png`, an RFC-reserved domain that can never
  resolve — failing to load IS the story. Verified by grep: it is the **only**
  external URL in the entire story corpus, so this DS has **no
  network-dependent stories at all** and the sandbox false-pass risk that
  normally threatens a whole grading wave does not exist here. Never re-run
  `--force` with egress on account of this warning.
- **[GENERAL] Framing is not a mismatch — and it is the single most common false
  alarm on this repo.** The storybook panel shrinks the whole story to fit; the
  preview panel is a fixed-size card, so it renders wider and crops the tail of
  a tall story. Content that "looks missing" in the preview panel is usually
  below the fold (confirmed on Hero "With Media Below", Section "Tones" and
  "Spacing", Stack "Gap Scale", and the trailing rows of CTASection / FAQSection
  / Footer). **Confirm against `raw/…__ds.png` before grading a delta.** Every
  occurrence across 33 components was framing, never a real defect, and none
  warranted an override.
- **[GENERAL] The downscaled sheet is sufficient for fills, but NOT for
  hairlines.** This system uses thin rules heavily. A missing 1px
  border/rule/divider in the sheet is usually the shrink, not the render —
  escalate to the raw PNGs. Card in particular could not be judged from the
  sheet at all; its border and elevation were only visible in `raw/`.
- **[GENERAL] A section with no `viewport` override captures at the default
  900x700 while its storybook shot is full-height — and `[GRID_OVERFLOW]` does
  NOT catch it.** The overflow check is about fidelity (do stories render wider
  than their cells); this is about the preview *card* being a useless crop of a
  tall section. Measured on this run: Pricing sb 900x2367 vs ds 900x700,
  StorySteps 1425 vs 700, MetricStrip 975 vs 700. Verify the overlapping region
  against `raw/…__sb.png` before calling content missing — then **fix the card
  with a `viewport` override**, because the card is what humans browse in the
  component picker. Remedied this run for Pricing / StorySteps / MetricStrip.
- **[GENERAL] An off-register but internally-consistent render is NOT a preview
  bug.** The fidelity question is only ever "do the two panels agree". When they
  agree but the result looks wrong for the register, the cause is upstream (the
  package theme declaring no rules), and the fix belongs in `src/overrides.css`,
  never in `.design-sync/previews/`. A preview workaround would permanently
  shadow the generated preview and hide the real problem forever.
- **This system HAS a real dark mode**, unlike `cinematic-dark` where light and
  dark collapse to one palette. `ThemeProvider`'s Light / Dark / System stories
  each render distinctly and correctly. `cfg.provider` pins `theme: "light"` as
  the default wrap; stories that set their own theme still override it.

## Real design observations (not sync defects)

These all render **identically on both panels**, so the sync is faithful and
they graded `match`. They are recorded because they affect every design the
claude.ai/design agent builds with this system.

- **`Badge` and `Alert` are not themed for this register.** They render in the
  generic `@ds/shared` style — pill-shaped, pastel blue/green/amber/red —
  rather than Story-Telling's hard edges, signal blue and near-black ink.
  `Button` by contrast is fully themed. The cause is that
  `src/overrides.css` declares no rules for these two. **This is the highest-
  value design fix available to this system**: the design agent will otherwise
  build correct-but-off-register badges and alerts into every page.
- **`StoryChapter` "Media Start" renders identically to "Media End"** — which
  suggests the media-placement prop may have no visible effect at the captured
  width. Worth a designer's eye in `@ds/shared`.
- **`CTASection` "Inverted" is CLEAN here.** The gradient-clipped-headline bug
  that had to be fixed in `cinematic-dark`'s `overrides.css` does not reproduce
  in this system — the white headline on the signal-blue band is fully legible.
  Recorded so a future run does not go looking for it.
- **`Pricing`'s non-numeric-price overflow** (the word `Custom` overflowing its
  plan card) was a real bug in `cinematic-dark`, caused by a display type size
  too large for a word-length price. Story-Telling's type scale differs, so it
  may not reproduce — but check it whenever `Pricing` is re-graded.

## conventions.md validation (do this every sync)

`conventions.md` is prepended to the design agent's system prompt via
`readmeHeader`. Every name in it was validated against the built artifacts on
2026-08-16 and all of it verifies: the 10 components it enumerates
(`ThemeProvider`, `Nav`, `Hero`, `Section`, `FeatureGrid`, `MediaShowcase`,
`Testimonials`, `CTASection`, `Footer`, `Stack`) each have a
`components/<group>/<Name>/` directory; all six token families resolve in the
shipped CSS (`--ds-color-*` 230, `--ds-space-*` 99, `--ds-radius-*` 25,
`--ds-font-*` 40, `--ds-section-gap` 4, `--ds-container-width` 2); `.ds-root`
exists; and `ThemeProvider` really does accept `theme` and `fullBleed`.

- **One drift was found and fixed this run.** The file told the agent to *"Read
  `landing-content.md` before writing copy… the source of truth for the brand,
  audience, claims, metrics"*. That file is **not uploaded** (deliberately) and
  is a 164-line template of 77 `[TODO]`s — so the agent was being pointed at a
  source of truth it could not open and which held no content. The paragraph was
  amended (with the author's approval) to keep the never-invent-a-fact rule and
  drop the dangling pointer. **If `landing-content.md` is ever filled in with
  real content, revisit whether it should be bound to the project.**
- The lesson generalises: **a conventions file that names something absent from
  the bound artifacts is worse than no conventions file**, because the agent
  trusts it. Re-run this validation on every sync.

## Re-sync risks

- **The storybook glob reaches across packages.** A story added to `@ds/shared`
  changes the roster of **all eight** systems at once, so an unrelated system's
  re-sync can surface new ungraded components. Intended — the catalogue is
  shared — but "nothing changed here" is not the same as "nothing changed".
- **`cfg.provider` pins `theme: "light"`.** Correct for this system's warm-paper
  register; revisit only if the default register changes.
- **Sibling-trusted grades are rarer here than usual.** Most components were
  image-judged story by story; only `Hero`, `CTASection`, `FAQSection` and
  `Footer` used sibling-trusting for some stories. Those four are where a
  regression confined to a non-primary story would be least likely to be seen.
- **No owned previews exist, deliberately.** Not one component needed a fix, so
  `.design-sync/previews/` is empty. That is the ideal state: every preview
  re-derives from its story on each build. **If a future run is tempted to land
  an owned preview, be sure the cause is genuinely component-specific** — an
  owned file is never machine-deleted and permanently shadows the generated one.
- **Zero config overrides were added by this run.** The `cardMode`/`viewport`
  entries in `config.json` were authored before the first build and were all
  vindicated (no `[GRID_OVERFLOW]`). `LogoCloud`, `MetricStrip`, `Pricing` and
  `StorySteps` carry no overrides and did not need any.
- **`StoryLanding` / `Landing page` exclusions are content decisions** that go
  stale if `landing-content.md` is ever completed. See above.
