import type { ElementType, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Heading.css';

export interface HeadingProps {
  /** Document level. Drives the rendered tag unless `as` overrides it. */
  level?: 1 | 2 | 3 | 4;
  /** Visual size, when it should differ from the semantic level. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'default' | 'muted';
  truncate?: boolean;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

const SIZE_FOR_LEVEL = { 1: 'xl', 2: 'lg', 3: 'md', 4: 'sm' } as const;

/** Section titles. Keep `level` honest for accessibility; use `size` for looks. */
export function Heading({
  level = 2,
  size,
  tone = 'default',
  truncate = false,
  as,
  className,
  children,
}: HeadingProps) {
  const Component: ElementType = as ?? (`h${level}` as ElementType);
  const visualSize = size ?? SIZE_FOR_LEVEL[level];

  return (
    <Component
      className={cx(
        'ds-heading',
        `ds-heading--${visualSize}`,
        `ds-heading--tone-${tone}`,
        truncate && 'ds-heading--truncate',
        className,
      )}
    >
      {children}
    </Component>
  );
}
