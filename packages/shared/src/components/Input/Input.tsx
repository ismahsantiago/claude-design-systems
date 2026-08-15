import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { ControlSize } from '../../types';
import '../../styles/control.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: ControlSize;
  /** Render the error state. `Field` sets this for you when it has an error. */
  invalid?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', invalid = false, fullWidth = true, className, type = 'text', ...rest },
  ref,
) {
  return (
    <input
      {...rest}
      ref={ref}
      type={type}
      className={cx(
        'ds-control',
        `ds-control--${size}`,
        fullWidth && 'ds-control--full-width',
        className,
      )}
      aria-invalid={invalid || undefined}
    />
  );
});
