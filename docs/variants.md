# Variants

A **variant** inherits a base system whole and restates only its expressive surface — colour, gradients, faces, radius, display scale. `@ds/nocturne-cobalt` is the worked example: eleven lines of intent on top of `@ds/nocturne`.

This exists for a specific loop:

1. Generate a page with the base system in Claude Design.
2. Ask the design agent for a recolour or a reface — *"the same, in cold blue"*, *"grey with the gradient running from the left"*.
3. Approve it visually.
4. Land it here as a variant, and sync it as its own Claude Design project.

Each approved iteration becomes a real, buildable system in the list, rather than a screenshot nobody can ship.

## Making one

```bash
npm run new-variant -- <base> <name> ["Display Title"] ["Tagline"]
npm run new-variant -- nocturne nocturne-cobalt "Nocturne Cobalt" "Cold blue on black."
npm install
```

The generated `theme.css` `@import`s the base and lists the 25 expressive tokens with **the base's current values**, so the variant renders identically to its base before you touch it, and every edit shows up as a real difference.

Then the actual work: **delete every line you are not changing.**

That instruction is the whole discipline. A variant that repeats its base is not merely noisy — it stops tracking the base. Restate `--ds-section-gap` at the same value it already has, and the day someone retunes the rhythm in `nocturne`, every variant that copied it silently keeps the old number.

## What is inherited, and what is not

The expressive surface is defined in `EXPRESSIVE_TOKENS` in `packages/shared/contract.mjs`. It was picked by asking which tokens change how a page *feels* without changing how it is *built*:

| Restatable in a variant | Always inherited |
| --- | --- |
| accent ramp, focus ring | space scale |
| gradients, glow | control heights |
| bg, surface, border, text | status colours |
| font families and axis settings | leading, weights |
| tracking and display size | container width |
| radius, section gap | every rule in the base's `overrides.css` |

Spacing and control heights are absent on purpose. Moving those makes a different *system*, not a variant of one — and it puts the variant on a path where it drifts out of sync for no gain. If you find yourself wanting them, run `new-system` instead.

Rules are never restated. A variant gets the base's pill buttons, its gradient-clipped headlines and its focus glow unchanged. That is what keeps a family looking like a family: `nocturne` and `nocturne-cobalt` produce pages with an identical silhouette, differing only in temperature.

## How the cascade works

```
variant/src/theme.css   @import base theme, then restate tokens
        ↓
@ds/shared              component rules that read those tokens
        ↓
base/src/overrides.css  the base's rule exceptions, last so they still win
```

`src/index.ts` in the generated variant encodes exactly this order, and it is load-bearing. CSS output order follows module import order.

One consequence worth knowing, because it is what makes variants cheap: the base's `overrides.css` reads tokens rather than literals. `.ds-hero__headline` clips `var(--ds-gradient-accent)` onto the text, so a variant that restates that one token gets a completely different headline treatment for free, with no CSS of its own.

## Validating and syncing

```bash
npm run build --workspace @ds/<name>
npm run verify -- <name>
npm run storybook --workspace @ds/<name>
```

`verify` treats a variant like any other system — contract completeness still passes because the `@import`ed base answers everything the variant does not. Then sync it from its own directory; see `docs/syncing.md`. One system per Claude Design project, variants included.

## When a variant should be promoted

If a variant accumulates rule overrides of its own, or starts wanting spacing changes, it has outgrown the mechanism. Promote it: run `new-system`, copy the resolved values in, and let it stand on its own. Variants are for recolouring and refacing. Anything more is a system.
