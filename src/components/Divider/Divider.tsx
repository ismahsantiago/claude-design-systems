import { cx } from '../../utils/cx';
import { spaceVar, type Space } from '../../types';
import './Divider.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Margin along the divider's axis, from the spacing scale. */
  spacing?: Space;
  className?: string;
}

/** Thin rule between sections. Decorative — hidden from assistive tech. */
export function Divider({
  orientation = 'horizontal',
  spacing = 'none',
  className,
}: DividerProps) {
  return (
    <hr
      className={cx('ds-divider', `ds-divider--${orientation}`, className)}
      style={
        orientation === 'horizontal'
          ? { marginBlock: spaceVar(spacing) }
          : { marginInline: spaceVar(spacing) }
      }
      aria-hidden="true"
    />
  );
}
