/** Shared scale types. Every value maps 1:1 onto a token in `tokens.css`. */

/** Spacing scale — resolves to `var(--ds-space-*)`. */
export type Space = 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/** Control sizing shared by Button, Input, Select and friends. */
export type ControlSize = 'sm' | 'md' | 'lg';

/** Semantic status colors. */
export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

/** Resolve a spacing token name to its CSS custom property reference. */
export function spaceVar(space: Space): string {
  return `var(--ds-space-${space})`;
}
