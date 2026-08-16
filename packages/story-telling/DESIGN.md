# Story-Telling design system

`@ds/story-telling` is an executable, agent-readable design system for
editorial landing pages about freight, logistics, infrastructure, operations,
and other journeys from complexity to control.

## Source of truth

- Tokens and compiled components: `src/theme.css`, `src/overrides.css`, and
  `dist/` after `npm run build`.
- Component APIs: the generated declarations in `dist/index.d.ts`.
- Visual and composition rules: this file and `.design-sync/conventions.md`.
- Brand-specific content, claims, URLs, metrics, and assets:
  `landing-content.md`.

The content file wins over the examples in Storybook. The examples are a
visual fixture with placeholders, not claims about a real company.

## Intent and personality

Create a confident, editorial, image-led journey. The voice is clear,
accountable, precise, and human. The page should feel operationally credible,
not like a generic SaaS template.

Avoid glossy startup gradients, glassmorphism, noisy 3D, generic stock-photo
grids, excessive rounded cards, tiny low-contrast copy, unsupported
superlatives, and simultaneous animations competing for attention.

## Visual grammar

- Palette: `#0E1116` ink, `#F4F3EE` paper, white, `#2447FF` signal blue, and
  rare `#F26A21` safety orange.
- Display: condensed, oversized, tight leading, usually uppercase or short
  sentence case. Body: neutral grotesk. Metadata: mono, uppercase, tracked.
- Layout: 12-column desktop grid, 4-column mobile grid, max width 1280px,
  generous section rhythm, thin rules, asymmetric composition, and nearly
  square corners.
- Imagery: documentary material, maps, roads, ports, machinery, hands,
  labels, and coordination. Use original assets only.

Use the CSS contract instead of inventing values: `--ds-color-*`,
`--ds-space-*`, `--ds-radius-*`, `--ds-font-*`, `--ds-section-gap`, and
`--ds-container-width`.

## Page model

The page type is `story-telling`. Preserve this six-chapter sequence:

1. Arrival / claim: full-bleed hero, one promise, one primary CTA.
2. Tension: the fragmented, expensive, or risky problem.
3. The route: 3–6 connected steps with explicit ownership.
4. Capability chapters: one service, product, or proof point per chapter.
5. Evidence: metrics, logos, quote, case result, or operational detail.
6. Resolution: outcome recap and one clear next action.

Map the sequence to the shared components where possible:

| Story moment | Recommended primitives |
| --- | --- |
| Arrival | `Nav`, `Hero` |
| Tension | `Section`, `SectionHeader`, `Text` |
| The route | `FeatureGrid`, `Stack`, `Divider` |
| Capability | `MediaShowcase`, `FeatureGrid`, `Section` |
| Evidence | `Testimonials`, `LogoCloud`, `Card` |
| Resolution | `CTASection`, `Footer` |

One focal point should dominate each viewport. Scroll may reveal or pin content
only when it advances the narrative. The page must remain understandable with
`prefers-reduced-motion: reduce`.

## Agent generation protocol

1. Read this file and `.design-sync/conventions.md`.
2. Read `landing-content.md` and classify every field as verified, supplied,
   or missing. Do not promote missing fields into factual copy.
3. Preserve the six-chapter order and select shared components before writing
   custom markup.
4. Use the system tokens before adding a new value. Use original imagery or a
   diagrammatic treatment when an asset is absent.
5. Generate the complete responsive page, including navigation, footer,
   keyboard focus, contrast, mobile flow, and reduced-motion behavior.
6. Check that every metric has a source/date and every CTA has a real
   destination or is visibly marked `[TODO]`.

## Claude Design

From this package directory, build and sync the compiled system:

```bash
npm run build --workspace @ds/story-telling
cd packages/story-telling
/design-sync
```

The sync configuration and provider wrapper are in `.design-sync/config.json`.
The first sync creates the Claude Design project; later syncs reuse the
persisted `projectId`. Keep one design system per Claude Design project.
