/**
 * The token contract.
 *
 * `shared` owns structure and zero values: not one color, radius or font size
 * is declared there. Every component styles itself purely through the custom
 * properties listed below, and each design system supplies all of them.
 *
 * That is the whole trick of this repo. A system is not a fork of the
 * components — it is a complete set of answers to this list. Which is also why
 * the list includes radius, type scale and font families rather than just
 * color: a system that can only change hue can only ever look recolored, while
 * one that owns the geometry and the typography reads as genuinely different.
 *
 * Adding a token here is a breaking change for every system in the repo —
 * `npm run verify` will fail each one until it answers the new name.
 */

/** @typedef {{ name: string, description: string }} TokenSpec */
/** @typedef {{ title: string, tokens: TokenSpec[] }} TokenGroup */

/** @type {TokenGroup[]} */
export const CONTRACT = [
  {
    title: 'Surface & border',
    tokens: [
      { name: '--ds-color-bg', description: 'Page background, behind every surface.' },
      { name: '--ds-color-surface', description: 'Default raised surface: cards, menus.' },
      { name: '--ds-color-surface-sunken', description: 'Recessed areas: footers, wells.' },
      { name: '--ds-color-surface-hover', description: 'Hover wash on interactive surfaces.' },
      { name: '--ds-color-border', description: 'Default hairline between regions.' },
      { name: '--ds-color-border-strong', description: 'Border on interactive controls.' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { name: '--ds-color-text', description: 'Primary reading color.' },
      { name: '--ds-color-text-muted', description: 'Secondary and supporting text.' },
      { name: '--ds-color-text-on-accent', description: 'Text on top of an accent fill.' },
    ],
  },
  {
    title: 'Accent',
    tokens: [
      { name: '--ds-color-accent', description: 'Primary brand fill.' },
      { name: '--ds-color-accent-hover', description: 'Accent under the cursor.' },
      { name: '--ds-color-accent-active', description: 'Accent while pressed.' },
      { name: '--ds-color-accent-subtle', description: 'Tinted accent background.' },
      { name: '--ds-color-accent-text', description: 'Accent used as text on the page bg.' },
    ],
  },
  {
    title: 'Status',
    tokens: [
      { name: '--ds-color-success', description: 'Success fill.' },
      { name: '--ds-color-success-subtle', description: 'Success background tint.' },
      { name: '--ds-color-success-text', description: 'Success as text.' },
      { name: '--ds-color-warning', description: 'Warning fill.' },
      { name: '--ds-color-warning-subtle', description: 'Warning background tint.' },
      { name: '--ds-color-warning-text', description: 'Warning as text.' },
      { name: '--ds-color-danger', description: 'Danger fill.' },
      { name: '--ds-color-danger-hover', description: 'Danger under the cursor.' },
      { name: '--ds-color-danger-subtle', description: 'Danger background tint.' },
      { name: '--ds-color-danger-text', description: 'Danger as text.' },
      { name: '--ds-color-focus-ring', description: 'Focus outline. Must clear both bg and surface.' },
      { name: '--ds-color-overlay', description: 'Scrim behind modals and drawers.' },
    ],
  },
  {
    title: 'Space',
    tokens: [
      { name: '--ds-space-none', description: 'Zero. Kept named so `gap` is always a token.' },
      { name: '--ds-space-2xs', description: 'Hairline gap inside a control.' },
      { name: '--ds-space-xs', description: 'Label to control.' },
      { name: '--ds-space-sm', description: 'Between related inline items.' },
      { name: '--ds-space-md', description: 'Default gap.' },
      { name: '--ds-space-lg', description: 'Padding inside cards.' },
      { name: '--ds-space-xl', description: 'Between groups.' },
      { name: '--ds-space-2xl', description: 'Between sections of a card.' },
      { name: '--ds-space-3xl', description: 'Between page sections.' },
    ],
  },
  {
    title: 'Section rhythm',
    tokens: [
      { name: '--ds-section-gap', description: 'Vertical padding of a landing section. The single biggest driver of how airy or dense a system feels.' },
      { name: '--ds-container-width', description: 'Max reading width of page content.' },
    ],
  },
  {
    title: 'Radius',
    tokens: [
      { name: '--ds-radius-sm', description: 'Badges, small chips.' },
      { name: '--ds-radius-md', description: 'Buttons and inputs.' },
      { name: '--ds-radius-lg', description: 'Cards and panels.' },
      { name: '--ds-radius-full', description: 'Pills and avatars.' },
    ],
  },
  {
    title: 'Typography',
    tokens: [
      { name: '--ds-font-sans', description: 'UI and body family.' },
      { name: '--ds-font-display', description: 'Headline family. May equal --ds-font-sans.' },
      { name: '--ds-font-mono', description: 'Code and metadata family.' },
      { name: '--ds-text-xs', description: 'Captions.' },
      { name: '--ds-text-sm', description: 'Secondary text.' },
      { name: '--ds-text-md', description: 'Body.' },
      { name: '--ds-text-lg', description: 'Lead paragraph.' },
      { name: '--ds-text-xl', description: 'Section heading.' },
      { name: '--ds-text-2xl', description: 'Page heading.' },
      { name: '--ds-text-3xl', description: 'Hero heading.' },
      { name: '--ds-text-display', description: 'Oversized hero type. The archetype signature.' },
      { name: '--ds-leading-tight', description: 'Headings.' },
      { name: '--ds-leading-normal', description: 'Body.' },
      { name: '--ds-leading-loose', description: 'Long-form reading.' },
      { name: '--ds-tracking-display', description: 'Letter-spacing on display type.' },
      {
        name: '--ds-font-display-settings',
        description:
          "Variable-font axis settings applied wherever --ds-font-display is used, e.g. \"'opsz' 144, 'SOFT' 20\". This is where a system stops using a face at its defaults and tunes it into a voice of its own; `normal` for static faces.",
      },
      { name: '--ds-weight-regular', description: 'Body weight.' },
      { name: '--ds-weight-medium', description: 'Emphasis.' },
      { name: '--ds-weight-semibold', description: 'Headings.' },
      { name: '--ds-weight-bold', description: 'Display.' },
    ],
  },
  {
    title: 'Gradients',
    tokens: [
      {
        name: '--ds-gradient-accent',
        description:
          'The signature gradient, for hero backgrounds, display type and fills. Systems that do not use gradients answer with a flat `linear-gradient` of one color, so consumers never have to branch.',
      },
      {
        name: '--ds-gradient-warm',
        description: 'Secondary gradient, for a second surface that must not repeat the first.',
      },
    ],
  },
  {
    title: 'Elevation & motion',
    tokens: [
      { name: '--ds-shadow-sm', description: 'Resting lift. May be `none` for flat systems.' },
      { name: '--ds-shadow-md', description: 'Raised card.' },
      { name: '--ds-shadow-lg', description: 'Floating panel.' },
      {
        name: '--ds-shadow-glow',
        description:
          'Atmospheric halo around focused or active elements. `none` in systems that express focus with an outline alone.',
      },
      { name: '--ds-duration-fast', description: 'Hover and focus transitions.' },
      { name: '--ds-duration-md', description: 'Entrances.' },
      { name: '--ds-ease', description: 'Shared easing curve.' },
    ],
  },
  {
    title: 'Controls',
    tokens: [
      { name: '--ds-control-height-sm', description: 'Small button and input height.' },
      { name: '--ds-control-height-md', description: 'Default control height.' },
      { name: '--ds-control-height-lg', description: 'Large control height.' },
    ],
  },
];

/** Flat list of every required token name. */
export const REQUIRED_TOKENS = CONTRACT.flatMap((group) =>
  group.tokens.map((token) => token.name),
);

/**
 * Tokens a component sets on itself inline or inside a variant block, so they
 * are defined at the point of use rather than by the theme.
 */
export const LOCALLY_SCOPED =
  /^--ds-(card-padding|badge-|alert-|section-bg|section-fg|pricing-count)/;
