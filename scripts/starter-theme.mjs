/**
 * The neutral answers a new system starts from.
 *
 * Deliberately plain: legible, accessible, and characterless. A new system is
 * meant to be edited from here, and a bland starting point makes it obvious
 * which tokens have been given an opinion and which are still defaults.
 *
 * `new-system.mjs` asserts this map covers the contract exactly, so adding a
 * token to the contract without answering it here fails loudly at generation
 * time rather than quietly in the generated system.
 */

/** @type {Record<string, string>} */
export const STARTER_LIGHT = {
  '--ds-color-bg': '#ffffff',
  '--ds-color-surface': '#ffffff',
  '--ds-color-surface-sunken': '#f6f7f9',
  '--ds-color-surface-hover': '#eef0f3',
  '--ds-color-border': '#e2e5ea',
  '--ds-color-border-strong': '#c8cdd6',

  '--ds-color-text': '#16191f',
  '--ds-color-text-muted': '#6b7280',
  '--ds-color-text-on-accent': '#ffffff',

  '--ds-color-accent': '#3f5bd9',
  '--ds-color-accent-hover': '#3149b3',
  '--ds-color-accent-active': '#25388c',
  '--ds-color-accent-subtle': '#eef2fe',
  '--ds-color-accent-text': '#2b3fa0',

  '--ds-color-success': '#17864c',
  '--ds-color-success-subtle': '#d9f2e3',
  '--ds-color-success-text': '#0e6338',
  '--ds-color-warning': '#a9700a',
  '--ds-color-warning-subtle': '#fdeecd',
  '--ds-color-warning-text': '#85560a',
  '--ds-color-danger': '#c3382f',
  '--ds-color-danger-hover': '#9a2822',
  '--ds-color-danger-subtle': '#fbdedd',
  '--ds-color-danger-text': '#9a2822',
  '--ds-color-focus-ring': '#6f8bf0',
  '--ds-color-overlay': 'rgb(9 11 15 / 0.45)',

  '--ds-space-none': '0',
  '--ds-space-2xs': '2px',
  '--ds-space-xs': '4px',
  '--ds-space-sm': '8px',
  '--ds-space-md': '12px',
  '--ds-space-lg': '16px',
  '--ds-space-xl': '24px',
  '--ds-space-2xl': '32px',
  '--ds-space-3xl': '48px',

  '--ds-section-gap': '88px',
  '--ds-container-width': '1120px',

  '--ds-radius-sm': '4px',
  '--ds-radius-md': '8px',
  '--ds-radius-lg': '12px',
  '--ds-radius-full': '999px',

  '--ds-font-sans': "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  '--ds-font-display': 'var(--ds-font-sans)',
  '--ds-font-mono': 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',

  '--ds-text-xs': '0.75rem',
  '--ds-text-sm': '0.8125rem',
  '--ds-text-md': '0.9375rem',
  '--ds-text-lg': '1.0625rem',
  '--ds-text-xl': '1.25rem',
  '--ds-text-2xl': '1.75rem',
  '--ds-text-3xl': '2.25rem',
  '--ds-text-display': 'clamp(2.5rem, 5vw, 3.5rem)',

  '--ds-leading-tight': '1.15',
  '--ds-leading-normal': '1.5',
  '--ds-leading-loose': '1.65',
  '--ds-tracking-display': '-0.02em',
  '--ds-font-display-settings': 'normal',

  '--ds-weight-regular': '400',
  '--ds-weight-medium': '500',
  '--ds-weight-semibold': '600',
  '--ds-weight-bold': '700',

  // A flat one-color gradient is the honest neutral answer: consumers can use
  // the token unconditionally, and the system reads as gradient-free.
  '--ds-gradient-accent': 'linear-gradient(135deg, #3f5bd9 0%, #3f5bd9 100%)',
  '--ds-gradient-warm': 'linear-gradient(135deg, #c2603a 0%, #c2603a 100%)',

  '--ds-shadow-sm': '0 1px 2px rgb(9 11 15 / 0.06)',
  '--ds-shadow-md': '0 4px 12px rgb(9 11 15 / 0.08)',
  '--ds-shadow-lg': '0 12px 32px rgb(9 11 15 / 0.12)',
  '--ds-shadow-glow': 'none',
  '--ds-duration-fast': '120ms',
  '--ds-duration-md': '200ms',
  '--ds-ease': 'cubic-bezier(0.2, 0, 0.2, 1)',

  '--ds-control-height-sm': '30px',
  '--ds-control-height-md': '38px',
  '--ds-control-height-lg': '46px',
};

/**
 * Dark overrides. Only tokens whose value actually changes appear here —
 * a dark block that repeats the light value is noise that hides the real
 * decisions.
 */
export const STARTER_DARK = {
  '--ds-color-bg': '#0c0e12',
  '--ds-color-surface': '#15181e',
  '--ds-color-surface-sunken': '#0c0e12',
  '--ds-color-surface-hover': '#1e222a',
  '--ds-color-border': '#252a33',
  '--ds-color-border-strong': '#39414e',

  '--ds-color-text': '#eceef2',
  '--ds-color-text-muted': '#98a1b0',

  '--ds-color-accent': '#6f8bf0',
  '--ds-color-accent-hover': '#8aa1f4',
  '--ds-color-accent-active': '#b3c2f8',
  '--ds-color-accent-subtle': '#1a2350',
  '--ds-color-accent-text': '#b3c2f8',

  '--ds-color-success-subtle': '#0a2e1d',
  '--ds-color-success-text': '#7fd8a4',
  '--ds-color-warning-subtle': '#3a2708',
  '--ds-color-warning-text': '#f0c168',
  '--ds-color-danger': '#e5675c',
  '--ds-color-danger-hover': '#f08a80',
  '--ds-color-danger-subtle': '#421310',
  '--ds-color-danger-text': '#f0a19a',
  '--ds-color-overlay': 'rgb(0 0 0 / 0.6)',

  '--ds-shadow-sm': '0 1px 2px rgb(0 0 0 / 0.4)',
  '--ds-shadow-md': '0 4px 12px rgb(0 0 0 / 0.45)',
  '--ds-shadow-lg': '0 12px 32px rgb(0 0 0 / 0.55)',
};
