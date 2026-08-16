# Story-Telling — design-sync notes

- This package is the executable form of `docs/proposals/story-telling`.
- The first `/design-sync` run should create and then persist `projectId` in
  `.design-sync/config.json`. Do not fabricate an id in source control.
- Run `/design-sync` from `packages/story-telling`, because this monorepo has
  one Claude Design project per package.
- `dist/index.js` is the compiled entry and `dist/styles.css` contains the
  theme, shared component rules, and Story-Telling overrides in load-bearing
  order.
- `landing-content.md` is input for page generation, not a component and not a
  replacement for the design-system catalogue.
