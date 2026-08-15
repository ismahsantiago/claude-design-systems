import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../types';
import './Badge.css';

export interface BadgeProps {
  tone?: Tone;
  size?: 'sm' | 'md';
  /** Filled pill vs. tinted background with colored text. */
  variant?: 'subtle' | 'solid' | 'outline';
  /** Show a status dot before the label. */
  dot?: boolean;
  className?: string;
  children?: ReactNode;
}

/** Compact status label — counts, states, tags. */
export function Badge({
  tone = 'neutral',
  size = 'md',
  variant = 'subtle',
  dot = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cx(
        'ds-badge',
        `ds-badge--${tone}`,
        `ds-badge--${variant}`,
        `ds-badge--${size}`,
        className,
      )}
    >
      {dot && <span className="ds-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
