import { cx } from '../../utils/cx';
import type { ControlSize } from '../../types';
import './Spinner.css';

export interface SpinnerProps {
  size?: ControlSize;
  /**
   * Accessible label. Pass `null` when the spinner sits inside a control that
   * already announces its busy state (Button does this).
   */
  label?: string | null;
  className?: string;
}

export function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  return (
    <span
      className={cx('ds-spinner', `ds-spinner--${size}`, className)}
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : true}
    >
      <span className="ds-spinner__ring" />
      {label && <span className="ds-sr-only">{label}</span>}
    </span>
  );
}
