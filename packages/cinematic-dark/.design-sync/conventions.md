## How to build with Cinematic Dark

### Wrap everything in `ThemeProvider` — nothing is styled without it

`ThemeProvider` renders the `.ds-root` element that every design token resolves against. Outside it, components emit structurally correct markup with **no colour, no type and no spacing at all**. This is the single most common way to get a broken page.

```jsx
<ThemeProvider theme="dark" fullBleed>
  {/* the whole page goes here */}
</ThemeProvider>
```

This system has **no light mode by design**. `theme="light"` and `theme="dark"` resolve to the same black palette; use `"dark"`.

### Compose pages from sections, not from divs

The page is a vertical stack of full-bleed section components. Each one owns its own vertical rhythm (`--ds-section-gap`, 132px here) and its background banding — never add your own margins between them.

`Nav` · `Hero` · `LogoCloud` · `MediaShowcase` · `FeatureGrid` · `Testimonials` · `Pricing` · `FAQSection` · `CTASection` · `Footer`

Every one takes a `tone` of `default` | `sunken` | `accent` | `inverted` — that is how you get horizontal banding without any section knowing where it sits. `Section` is the generic band if you need one the library does not provide; `Container` centres content at `--ds-container-width`.

Sections take **arrays of data**, not deep children: `features={[{icon, title, description}]}`, `plans={[…]}`, `items={[{question, answer}]}`, `testimonials={[{quote, name, role}]}`.

### Style with tokens — never with literal values

There are no utility classes. Component classes (`ds-button`, `ds-card__title`) are internal; do not write them yourself. For your own layout glue, use the custom properties:

| Family | Names |
| --- | --- |
| Colour | `--ds-color-bg` `--ds-color-surface` `--ds-color-text` `--ds-color-text-muted` `--ds-color-accent` `--ds-color-accent-text` |
| Gradient | `--ds-gradient-accent` (ember→violet, the signature) `--ds-gradient-warm` |
| Space | `--ds-space-xs` … `--ds-space-3xl`, plus `--ds-section-gap` |
| Radius | `--ds-radius-sm/md/lg`, `--ds-radius-full` (buttons are pills) |
| Type | `--ds-font-sans` (Inter) `--ds-font-display` (Archivo, wide) `--ds-font-mono` (JetBrains Mono) |
| Depth | `--ds-shadow-sm/md/lg`, `--ds-shadow-glow` (ember halo) |

Use `Stack` for spacing rather than hand-written flexbox: `<Stack direction="row" gap="lg" align="center">`. `gap` and `padding` take token names (`xs`…`3xl`), never pixels.

The register is **pure black, oversized display type, media as the subject**. Let it breathe: few words, large type, generous space. Do not add light backgrounds, dense chrome, or sidebars.

### Where the truth is

Read `_ds/<folder>/styles.css` and the files it imports for the full token set, and each component's `.prompt.md` and `.d.ts` for its real API. The types are generated from the shipped build, so they are authoritative — prefer them over guessing a prop.

### A page, idiomatically

```jsx
<ThemeProvider theme="dark" fullBleed>
  <Nav sticky bordered={false} brand="Acme"
       links={[{ label: 'Product', href: '#p' }]}
       actions={<Button size="sm">Get started</Button>} />

  <Hero
    height="screen"
    eyebrow="New"
    headline="Everything you can imagine"
    subhead="One sentence that earns the next scroll."
    actions={<><Button size="lg">Start free</Button>
              <Button size="lg" variant="secondary">Watch the reel</Button></>}
    note="No card required" />

  <FeatureGrid tone="sunken" title="What it does" features={FEATURES} />

  <CTASection tone="inverted" headline="Start today"
              actions={<Button size="lg">Get started</Button>} />

  <Footer brand="Acme" copyright="© 2026 Acme" />
</ThemeProvider>
```
