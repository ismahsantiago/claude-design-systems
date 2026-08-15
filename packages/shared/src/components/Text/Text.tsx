import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Text.css';

export interface TextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /** Semantic color. `muted` is the standard secondary text treatment. */
  tone?: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'danger';
  align?: 'start' | 'center' | 'end';
  /** Render in the monospace family. */
  mono?: boolean;
  /** Clamp to a single line with an ellipsis. */
  truncate?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Body copy. Anything that isn't a heading goes through here. */
export function Text({
  size = 'md',
  weight = 'regular',
  tone = 'default',
  align,
  mono = false,
  truncate = false,
  as: Component = 'p',
  className,
  style,
  children,
}: TextProps) {
  return (
    <Component
      className={cx(
        'ds-text',
        `ds-text--${size}`,
        `ds-text--weight-${weight}`,
        `ds-text--tone-${tone}`,
        align && `ds-text--align-${align}`,
        mono && 'ds-text--mono',
        truncate && 'ds-text--truncate',
        className,
      )}
      style={style}
    >
      {children}
    </Component>
  );
}
