# `@ds/story-telling`

An executable editorial design system for landing pages that guide a visitor
from tension to a visible operational outcome.

```bash
npm run build --workspace @ds/story-telling
npm run verify -- story-telling
npm run validate-content -- packages/story-telling/landing-content.md
```

For Claude Design, run `/design-sync` from this directory after building. The
durable sync configuration is in `.design-sync/`; the first sync will persist
the project id there. For any other agent, start with `DESIGN.md`, then provide
`landing-content.md` as the brand-specific input.

The Storybook landing story is intentionally a fixture with placeholders. It
demonstrates the six-chapter sequence but does not make claims for a real
brand.
