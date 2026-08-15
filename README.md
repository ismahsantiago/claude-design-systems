# starter-design-system

A small React design system built to be **synced to [claude.ai/design](https://claude.ai/design)** — 17 components on a two-layer token system, with a Storybook, a library build, and per-component type declarations.

```bash
npm install
npm run storybook   # browse the components at localhost:6006
npm run build       # emit dist/
npm run verify      # check the built artifacts render correctly
```

## Using it

Everything renders inside a `ThemeProvider`. Without one there is no `.ds-root` element, the tokens have nowhere to resolve, and components come out unstyled.

```tsx
import { ThemeProvider, Card, Field, Input, Button, Stack } from 'starter-design-system';
import 'starter-design-system/styles.css';

export function App() {
  return (
    <ThemeProvider theme="system" fullBleed>
      <Card title="Invite a teammate">
        <Stack gap="lg">
          <Field label="Email address" required>
            <Input placeholder="jane@example.com" />
          </Field>
          <Button>Send invite</Button>
        </Stack>
      </Card>
    </ThemeProvider>
  );
}
```

## How it is put together

**Tokens come in two layers** (`src/styles/tokens.css`). Primitives (`--ds-gray-500`, `--ds-brand-600`) are the raw palette and are never referenced by components. Semantics (`--ds-color-surface`, `--ds-space-md`, `--ds-radius-lg`) are what components and product code use. Dark mode redefines *only* the semantic layer, which is why one block of overrides re-themes every component.

**Themes are explicit.** `ThemeProvider` resolves `system` to a concrete value via `matchMedia` and stamps `data-ds-theme="light" | "dark"` on the root, so the DOM always states which theme is in effect rather than leaving it to a media query.

**Styling is plain CSS with a `ds-` prefix**, colocated with each component and pulled into a single `dist/styles.css` at build time — tokens first, then the base layer, then component rules. There is no CSS-in-JS and no Tailwind dependency.

**The base layer is scoped to `.ds-root`**, not to `html`/`body`, so dropping this system into an existing app never restyles that app's own markup.

**Spacing is never hand-written.** `Stack` takes `gap`/`padding` from the token scale, and `spaceVar('md')` is exported for the cases where you need the raw `var(--ds-space-md)` string.

## Components

| Group | Components |
| --- | --- |
| Foundations | `ThemeProvider`, `useTheme` |
| Layout | `Stack`, `Divider` |
| Typography | `Heading`, `Text` |
| Actions | `Button` |
| Forms | `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch` |
| Display | `Badge`, `Avatar`, `Card` |
| Feedback | `Alert`, `Spinner` |

`Field` is the one to know: it generates the control id and injects `id`, `aria-describedby`, `invalid` and `required` into its child, so `Input`, `Select` and `Textarea` never have to be told about validation plumbing.

## Layout of the repo

```
src/
  styles/tokens.css      the two token layers, light + dark
  styles/base.css        .ds-root scoping, focus ring, reduced motion
  styles/control.css     shared field-control surface
  components/<Name>/     Component.tsx + Component.css + Component.stories.tsx
  stories/               token reference + a composed example page
  index.ts               public exports
scripts/verify-build.mjs post-build assertions on dist/
```

## Verification

`npm run verify` renders a representative tree from `dist/` and asserts what a typecheck cannot: that components emit the markup and ARIA wiring they promise, that **every class the markup emits has a rule** in the stylesheet, and that **every token the stylesheet references is defined**. A class with no rule is a silently unstyled component; an undefined token is a silently transparent color. Both failure modes are invisible in review and obvious in production.

## Syncing to Claude Design

Once you are happy with the components, run `/design-sync` in this directory. It converts the built `dist/` plus the Storybook into the format claude.ai/design consumes, so the design agent builds screens out of *these* components instead of generic ones. The pieces it looks for are already in place: a single `dist/styles.css`, per-component `.d.ts` files with exported `<Name>Props` interfaces, and a story file per component.
