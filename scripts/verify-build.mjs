/**
 * Post-build check on the emitted artifacts, not the source.
 *
 * Renders a representative tree from `dist/` and asserts three things a
 * typecheck cannot: components produce the markup and ARIA wiring they promise,
 * every class the markup emits has a rule in `dist/styles.css`, and every token
 * the stylesheet references is defined by it. A class with no rule is a silently
 * unstyled component; an undefined token is a silently transparent color.
 *
 * Run with `npm run verify`.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as DS from '../dist/index.js';

const cssPath = fileURLToPath(new URL('../dist/styles.css', import.meta.url));
const css = readFileSync(cssPath, 'utf8');

const tree = h(
  DS.ThemeProvider,
  { theme: 'dark', fullBleed: true },
  h(
    DS.Card,
    {
      title: 'Invite',
      subtitle: 'Add a teammate',
      action: h(DS.Badge, { tone: 'success' }, 'Live'),
      footer: h(DS.Divider, null),
    },
    h(
      DS.Stack,
      { gap: 'lg' },
      h(DS.Heading, { level: 3 }, 'Details'),
      h(DS.Text, { tone: 'muted' }, 'Body copy'),
      h(DS.Alert, { tone: 'warning', title: 'Heads up' }, 'Two seats left.'),
      h(DS.Field, { label: 'Email', error: 'Invalid address' }, h(DS.Input, { defaultValue: 'x' })),
      h(DS.Field, { label: 'Region' }, h(DS.Select, { placeholder: 'Pick one', defaultValue: '' })),
      h(DS.Field, { label: 'Notes' }, h(DS.Textarea, { rows: 2 })),
      h(DS.Switch, { label: 'Public', defaultChecked: true }),
      h(DS.Checkbox, { label: 'Audit log', indeterminate: true }),
      h(DS.Avatar, { name: 'Ada Lovelace' }),
      h(DS.Spinner, null),
      h(DS.Button, { loading: true }, 'Send'),
    ),
  ),
);

const html = renderToStaticMarkup(tree);

const checks = [
  ['ThemeProvider stamps the resolved theme', /data-ds-theme="dark"/.test(html)],
  ['ThemeProvider owns .ds-root', /class="ds-root ds-root--full-bleed"/.test(html)],
  ['Card renders its header', /ds-card__title/.test(html)],
  ['Button shows a spinner while loading', /ds-button--loading/.test(html) && /ds-spinner/.test(html)],
  ['Field wires aria-describedby', /aria-describedby="[^"]+-message"/.test(html)],
  ['Field marks the control invalid', /aria-invalid="true"/.test(html)],
  ['Field errors announce as alerts', /role="alert"/.test(html)],
  ['Avatar falls back to initials', />AL</.test(html)],
  ['Alert carries its tone class', /ds-alert--warning/.test(html)],
  ['Switch renders a track and thumb', /ds-switch__thumb/.test(html)],
];

const usedClasses = [
  ...new Set([...html.matchAll(/class="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/))),
].filter(Boolean);
const missingClasses = usedClasses.filter((name) => !css.includes(`.${name}`));
checks.push([
  `every rendered class has a rule (${usedClasses.length} checked)`,
  missingClasses.length === 0,
]);

// Tokens set inline by a component (Card's padding) or scoped to a tone block
// are defined at use, so they are excluded from the "must be declared" sweep.
const LOCALLY_SCOPED = /^--ds-(card-padding|badge-|alert-)/;
const referencedTokens = [
  ...new Set([...css.matchAll(/var\((--ds-[a-z0-9-]+)/g)].map((match) => match[1])),
];
const undefinedTokens = referencedTokens.filter(
  (token) => !LOCALLY_SCOPED.test(token) && !new RegExp(`\\${token}\\s*:`).test(css),
);
checks.push([
  `every referenced token is defined (${referencedTokens.length} checked)`,
  undefinedTokens.length === 0,
]);

let failures = 0;
for (const [name, ok] of checks) {
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
}
if (missingClasses.length) console.log('  classes with no rule:', missingClasses.join(', '));
if (undefinedTokens.length) console.log('  undefined tokens:', undefinedTokens.join(', '));

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
