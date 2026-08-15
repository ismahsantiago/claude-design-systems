# Creating a design system

A design system in this repo is **a set of answers to the token contract**, not a fork of the components. `@ds/shared` owns every component and section and declares no values; your package declares every value and no components. That split is what makes four systems cost roughly one system's worth of maintenance.

## 1. Scaffold

```bash
npm run new-system -- <name> "Display Title" "One-line tagline"
npm install          # links the new workspace
```

`<name>` is kebab-case and becomes the package `@ds/<name>`.

You get a package that already builds and already passes validation, because `src/theme.css` is generated **from the contract** — every required token is present, grouped, and commented with what it is for. Nothing is missing on day one; the work is deciding values.

## 2. Give it a character

Open `src/theme.css`. The starter values are deliberately bland. Four tokens carry most of a system's identity — change these first, then look:

| Token | What it decides |
| --- | --- |
| `--ds-radius-*` | Whether the system reads as software (`0`), standard (`8px`), or friendly (`24px`). |
| `--ds-text-display` | How much the hero dominates. The single most visible difference between the four systems in this repo. |
| `--ds-section-gap` | Density. `72px` feels technical, `128px` feels editorial. |
| `--ds-color-accent` | The one saturated color. Everything else should stay close to neutral. |

Then the second tier: `--ds-font-display` (a different family from `--ds-font-sans` changes everything), `--ds-shadow-*` (set all three to `none` for a flat system), and `--ds-leading-*`.

Two rules worth keeping:

- **Never reference a primitive from a component.** If you add local primitives (`--brand-500`), they are private to your theme file. Shared components only ever read contract tokens — that is why swapping the stylesheet re-themes everything.
- **Only put tokens in the dark block whose value actually changes.** A dark block that repeats light values hides the real decisions.

## 3. Validate

```bash
npm run build --workspace @ds/<name>
npm run verify -- <name>
```

`verify` renders your built package and checks four things a typecheck and a green build cannot see:

1. **Contract completeness** — a forgotten token does not error, it renders as nothing. A missing `--ds-radius-lg` is a square card nobody notices until it ships.
2. **Dangling references** — CSS reading a `var(--ds-*)` nobody declares silently resolves to empty. Transparent text, zero padding.
3. **Class coverage** — every class the markup emits has a rule in the stylesheet. A class with no rule is an unstyled component: invisible in review, obvious in production.
4. **Structural contracts** — the components still emit the markup and ARIA wiring they promise.

`npm run check` runs typecheck, build and verify across every system. Run it before committing.

## 4. Look at it

```bash
npm run storybook --workspace @ds/<name>
```

Every system ships the same reference landing page with the same copy, so the only thing that differs between two systems is their tokens. Compare yours against the others before deciding it is done — that is what the identical demo is for.

**Validation is not a substitute for looking.** `verify` proves the system is structurally sound and internally consistent. It cannot tell you the accent is ugly, the contrast is tiring, or the hero is too big. Open the Storybook.

## 5. Adding to the contract

Adding a token to `packages/shared/contract.mjs` is a breaking change for every system in the repo — `verify` will fail each one until it answers the new name. That friction is intentional. When you do add one:

1. Add it to the relevant group in `contract.mjs`, with a description that says what it decides.
2. Add a neutral answer to `scripts/starter-theme.mjs` — the generator refuses to run if the starter map and the contract disagree.
3. Answer it in every existing `packages/*/src/theme.css`.
4. `npm run check`.

Prefer solving a problem with existing tokens before adding one. The contract is large enough to express real differences and small enough that a person can hold it in their head; both properties are worth protecting.

## When to change `@ds/shared` instead

Change the shared package when a **structural** need is unmet — a section type nobody has, a prop that no token can express. Do not change it to make one system look different; that is what tokens are for. If exactly one system needs a rule, put an override stylesheet in that package and import it after the theme.
