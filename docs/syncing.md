# Syncing a system to Claude Design

[claude.ai/design](https://claude.ai/design) builds working UI from prompts. Out of the box it designs with generic components. Syncing a system from this repo changes that: the design agent starts building landing pages out of **that system's actual components**, so what it produces is on-brand and maps onto code you can ship.

## One system, one project

`/design-sync` syncs **one design system into one Claude Design project**. This repo has four, so it has four projects — you cannot merge them into one, and you should not want to: a project holding two systems would show the design agent two conflicting answers for every token.

Run the skill from the package directory, not the repo root:

```bash
cd packages/saas-clean
/design-sync
```

The skill finds several `.storybook/` directories if run from the root and will ask which one is the design system. Answering is harmless, but starting in the right directory is clearer.

## Why the build is already shaped for it

The sync uploads compiled components, not source. Three things in this repo's build exist specifically to make that work:

- **`@ds/shared` is bundled, not external.** Each system's `dist/` contains its own compiled copy of every component. The sync needs real components on `window.<globalName>` — an import of a workspace package would not resolve on the other side.
- **All CSS collapses into one `dist/styles.css`**, theme first, then components. Rendered designs only receive the transitive `@import` closure of that single file, so anything unreachable from it is invisible to the design agent.
- **`vite-plugin-dts` emits one `.d.ts` per component** with an exported `<Name>Props` interface. That is the API contract the agent codes against, so the prop docs in the source are worth writing well — they are read by the thing doing the designing.

## What to do before syncing

```bash
npm run check                                 # typecheck + build + verify, all systems
npm run storybook --workspace @ds/<name>      # and actually look at it
```

A component that renders wrong in the sync renders wrong in **every design the agent ever builds with it**, and a misleading prop description makes it misuse the API everywhere. The cost of a mistake is multiplied by every future design, which is why `verify` passing is necessary but not sufficient — look at the Storybook first.

## The conventions file

On first sync the skill writes `.design-sync/conventions.md` in the package: a briefing prepended to the design agent's system prompt. For a system in this repo it should say, concretely:

- **Wrap everything in `<ThemeProvider>`.** Without it there is no `.ds-root`, the tokens have nowhere to resolve, and components render structurally correct but completely unstyled. This is the single most important thing the agent needs to know.
- **Compose pages from sections** — `Nav`, `Hero`, `LogoCloud`, `FeatureGrid`, `Testimonials`, `Pricing`, `FAQ`, `CTA`, `Footer` — not from raw divs. Sections own the vertical rhythm and the background banding.
- **Style with tokens.** For any layout glue of its own, the agent should use `var(--ds-space-*)`, `var(--ds-color-*)`, `var(--ds-radius-*)` rather than literal values. Name the actual tokens; an agent follows an enumerated list and invents its own vocabulary when given none.
- **Use `Stack` for spacing**, not hand-written flexbox, so gaps stay on the scale.

That file is human-editable and committed. Re-syncing never rewrites it — keep it true as the system changes.

## Re-syncing

After the first sync each package has `.design-sync/config.json` pinning its project id. Commit it. Later syncs use it to update the same project instead of creating a duplicate, and to skip re-verifying components that have not changed.
