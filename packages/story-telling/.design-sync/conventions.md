## How to build with Story-Telling

### Treat the page as a scroll narrative

The page type is `story-telling`, not a dashboard, carousel, or multi-step form.
Preserve this order unless the content brief explicitly changes it:

1. Arrival / claim — one memorable promise and one primary action.
2. Tension — name the costly or fragmented problem.
3. The route — show 3–6 accountable steps.
4. Capability chapters — one service or proof point per chapter.
5. Evidence — verified metrics, logos, quote, or case result.
6. Resolution — restate the outcome and ask for one clear next action.

### Wrap everything in `ThemeProvider`

```jsx
<ThemeProvider theme="light" fullBleed>
  {/* Nav, Hero, chapters, proof, CTA, Footer */}
</ThemeProvider>
```

Without the provider there is no `.ds-root`, so the tokens have nowhere to
resolve and the components are structurally correct but unstyled.

### Use the shared vocabulary

Compose with `Nav`, `Hero`, `Section`, `FeatureGrid`, `MediaShowcase`,
`Testimonials`, `CTASection`, and `Footer`. Use `Stack` for spacing and let
sections own their vertical rhythm. Do not recreate these components with raw
divs when the shared API fits.

For layout glue, use the contract tokens: `--ds-color-*`, `--ds-space-*`,
`--ds-radius-*`, `--ds-font-*`, `--ds-section-gap`, and
`--ds-container-width`. Keep one dominant focal point per viewport.

### Content is external to the system

Read `landing-content.md` before writing copy. It is the source of truth for
the brand, audience, claims, metrics, URLs, assets, and chapter content. Never
invent a metric, customer, testimonial, logo, or outcome. If a field is missing,
keep `[TODO]` or ask for the source instead of turning a placeholder into a
claim.

### Visual rules

- Near-black ink, warm paper, white, signal blue, and rare safety orange.
- Oversized condensed display type; short headlines; uppercase labels.
- Thin rules, asymmetric compositions, generous negative space, hard edges.
- Use original imagery or a diagrammatic block when imagery is unavailable.
- Motion may reveal progress, but the complete story must work with reduced motion.
- Keep body text at least 16px on mobile and preserve visible keyboard focus.
