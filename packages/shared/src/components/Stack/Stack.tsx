import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { spaceVar, type Space } from '../../types';
import './Stack.css';

export interface StackProps {
  /** Layout axis. */
  direction?: 'row' | 'column';
  /** Gap between children, from the spacing scale. */
  gap?: Space;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  /** Padding on all sides, from the spacing scale. */
  padding?: Space;
  /** Stretch to the full width of the parent. */
  fullWidth?: boolean;
  /** Element to render. Use `as="ul"`, `as="section"` etc. for semantics. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const ALIGN: Record<NonNullable<StackProps['align']>, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const JUSTIFY: Record<NonNullable<StackProps['justify']>, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
};

/**
 * The layout primitive. Reach for this instead of hand-written flexbox so
 * spacing stays on the token scale.
 */
export function Stack({
  direction = 'column',
  gap = 'md',
  align,
  justify,
  wrap = false,
  padding,
  fullWidth = false,
  as: Component = 'div',
  className,
  style,
  children,
}: StackProps) {
  return (
    <Component
      className={cx('ds-stack', fullWidth && 'ds-stack--full-width', className)}
      style={{
        flexDirection: direction,
        gap: spaceVar(gap),
        alignItems: align ? ALIGN[align] : undefined,
        justifyContent: justify ? JUSTIFY[justify] : undefined,
        flexWrap: wrap ? 'wrap' : undefined,
        padding: padding ? spaceVar(padding) : undefined,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
