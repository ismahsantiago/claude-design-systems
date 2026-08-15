# claude-design-systems

Base design systems for landing pages, plus the tooling to create, validate and sync new ones.

```bash
npm install
npm run check                                  # typecheck + build + validate everything
npm run storybook --workspace @ds/saas-clean   # look at one
```

## The systems

Each renders the **same landing page with the same copy**, so everything that differs between them is the tokens doing their job.

| Package | Register | Signature |
| --- | --- | --- |
| `@ds/saas-clean` | Modern SaaS | Airy neutrals, one confident blue, soft 12px corners |
| `@ds/editorial-bold` | Agency / magazine | Zero radius, no shadows, Fraunces at opsz 144 up to 7rem |
| `@ds/consumer-warm` | Consumer brand | Warm neutrals, terracotta, 24px curves, wide soft shadows |
| `@ds/technical-dark` | Developer tool | Dark by default, monospace headlines, tight density, cyan accent |
| `@ds/cinematic-dark` | Creator tool / film | Pure black, ember→violet gradients, wide grotesque display to 132px |
| `@ds/cinematic-dark-cobalt` | *variant* | The same system at midnight: cobalt accents, cooled neutrals, everything else inherited |
| `@ds/ref-cinematic-dark` | *reference study* | Built to a brief written after a public creator-tools site. Kept for comparison, not to build on |

## Naming

Names have to survive the list growing, so they follow one scheme and `npm run verify` enforces it.

- **Base systems are `<register>-<quality>`** — register first, always. The quality must be one a variant *cannot* change (canvas, density, weight), never the accent, or the first recolour makes the name a lie.
- **Variants are `<base>-<what-changed>`**, at most two segments. `cinematic-dark-cobalt`. Past two the name stops communicating and the thing wants to be its own system.
- **Reference studies take a `ref-` prefix** and `designSystem.reference: true`. The prefix says "look, do not build on this" before anyone opens a file.

## How it works

**`@ds/shared` owns every component and section and declares no values.** Each system declares every value and no components, by answering the token contract in `packages/shared/contract.mjs` — 72 custom properties covering color, space, radius, type, elevation and section rhythm.

A system is therefore *a set of answers*, not a fork. Five systems cost roughly one system's worth of maintenance, and a new one is a single stylesheet.

When a system needs something the contract genuinely cannot express — a *rule* rather than a *value* — it ships an `overrides.css` loaded after the shared component styles. `@ds/ref-cinematic-dark` is the worked example: pill buttons (one radius token cannot serve both buttons and inputs), gradient-clipped display type, and a focus glow are all rules, and each override says in a comment why it is not a token.

The contract deliberately includes radius, type scale and section rhythm rather than just color: a system that can only change hue can only ever look recolored, while one that owns the geometry and the typography reads as genuinely different.

## The vocabulary

**Sections** compose a landing page and own its vertical rhythm: `Nav`, `Hero`, `LogoCloud`, `MediaShowcase`, `FeatureGrid`, `Testimonials`, `Pricing`, `FAQ`, `CTA`, `Footer`.

**Components** are the parts they are built from: `ThemeProvider`, `Stack`, `Container`, `Section`, `Heading`, `Text`, `Button`, `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Badge`, `Avatar`, `Card`, `Alert`, `Spinner`, `Divider`.

Everything renders inside a `ThemeProvider` — it owns the `.ds-root` element the tokens resolve against. Without one, components render structurally correct and completely unstyled.

## Variants

A variant inherits a base whole and restates only colour, gradients, faces, radius and display scale — `@ds/cinematic-dark-cobalt` is eleven lines on top of `@ds/cinematic-dark`.

```bash
npm run new-variant -- cinematic-dark cinematic-dark-slate "Cinematic Dark Slate" "Grey, gradient from the left."
```

It exists for a loop: generate a page with the base in Claude Design, ask for a recolour, approve it visually, land it here, sync it as its own project.

What a variant may restate is defined by `EXPRESSIVE_TOKENS` in `packages/shared/contract.mjs`. Spacing, control heights and status colours are deliberately absent — moving those makes a different system, not a variant of one. Rules are never restated either, so a family keeps one silhouette.

## Making a new one

```bash
npm run new-system -- ocean-calm "Ocean Calm" "Cool blues, wide spacing, quiet type."
npm install
# edit packages/ocean-calm/src/theme.css
npm run check
```

The generated theme is emitted **from the contract**, so a new system is structurally complete on its first build — every token present, grouped and commented. The work is deciding values.

Four of them carry most of a system's identity, so decide these first: `--ds-radius-*` (software, standard, or friendly), `--ds-text-display` (how much the hero dominates), `--ds-section-gap` (density) and `--ds-color-accent`. Then `--ds-font-display`, `--ds-font-display-settings` and `--ds-shadow-*`.

## Fonts

`Inter`, `Bricolage Grotesque` and `JetBrains Mono` are self-hosted in `packages/shared/fonts/` under the SIL OFL, as variable fonts covering latin and latin-ext. A system `@import`s the families it uses from the top of its `theme.css`; the others rely on system fonts.

Vite's library mode inlines CSS-referenced assets as `data:` URIs and ignores `assetsInlineLimit` while doing it, which turned one stylesheet into 534 kB that barely gzipped. `scripts/externalize-fonts.mjs` undoes that after the write, so fonts stay cacheable and `styles.css` is 35 kB.

The commercial faces named in the `ref-cinematic-dark` brief — PP Editorial New, Söhne Breit — are not redistributable and are not shipped. They stay at the front of `--ds-font-display` so licensed files take over as a pure drop-in. See `packages/shared/fonts/README.md`.

## Validation

`npm run verify` renders each built system and checks what a typecheck and a green build cannot see:

- **Contract completeness** — a forgotten token does not error, it renders as nothing.
- **Dangling references** — CSS reading an undeclared `var(--ds-*)` silently resolves to empty.
- **Class coverage** — every class in the markup has a rule. A class with no rule is an unstyled component.
- **Asset URLs** — every `url()` in the stylesheet resolves to a file that exists, and no font got silently re-inlined.
- **Structural contracts** — components still emit the markup and ARIA wiring they promise.

All five are failure modes that are invisible in review and obvious in production. They are also not a substitute for looking at the Storybook.

## Syncing to Claude Design

`/design-sync`, run from a package directory, uploads that system to [claude.ai/design](https://claude.ai/design) so the design agent builds pages from its real components. One system per project — a project holding two would give the design agent two conflicting answers for every token.

The build is already shaped for it: `@ds/shared` is bundled rather than external so each system ships its own compiled components, all CSS collapses into one `dist/styles.css`, and `vite-plugin-dts` emits one `.d.ts` per component with an exported `<Name>Props`.
