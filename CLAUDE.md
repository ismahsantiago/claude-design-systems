# claude-design-systems

A monorepo of base design systems for landing pages, plus the tooling to create, validate and sync new ones.

## The one idea

`@ds/shared` owns every component and section and **declares no values**. Each system in `packages/*` declares **every value and no components**, by answering the token contract in `packages/shared/contract.mjs`.

So: a system is a set of answers, not a fork. Before writing CSS anywhere, work out whether the thing you want is a *value* (goes in a theme) or a *structure* (goes in shared).

## Layout

```
packages/shared/          components, sections, and the contract. No colors.
packages/<system>/        src/theme.css — the answers. That is nearly the whole package.
scripts/new-system.mjs    generates a system FROM the contract
scripts/verify.mjs        the validator
scripts/coverage-tree.mjs the tree verify renders; add new sections here
docs/                     creating-a-system.md, syncing.md
```

## Commands

```bash
npm run check                            # typecheck + build + verify, everything
npm run verify -- <system>               # validate one
npm run new-system -- <name> "Title" "Tagline"
npm run storybook --workspace @ds/<name>
```

Always run `npm run check` before committing. `verify` needs a fresh `dist/`, so build first (or use `check`, which does).

## Rules that matter

**Never reference a primitive from a shared component.** `var(--gray-600)` in `packages/shared` breaks the contract — that color does not exist in other systems. Use a contract token, or add one deliberately (see `docs/creating-a-system.md`).

**Every class the markup emits needs a rule.** `verify` enforces this. A class with no rule is a silently unstyled component, which is invisible in review and obvious in production. The same check catches `var(--ds-*)` references nobody declares.

**When adding a section to `@ds/shared`, add it to `scripts/coverage-tree.mjs` too.** The validator only checks what it renders; a section missing from the coverage tree ships unverified.

**Adding a contract token is a breaking change.** It must be added to `contract.mjs`, answered in `scripts/starter-theme.mjs`, and answered in every existing theme. The generator refuses to run if the contract and the starter map disagree.

**The demo landing page is a fixture, not a component.** It lives in `packages/shared/src/demo/`, is exported only via `@ds/shared/demo`, and must never end up in a shipped bundle. Its copy and structure are identical everywhere on purpose: that is what makes the systems comparable.

## Verification is not looking

`verify` proves a system is structurally sound and internally consistent. It cannot tell you the design is any good. Open the Storybook before calling anything done, and say plainly when you have not been able to.
