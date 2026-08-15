import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { ControlSize } from '../../types';
import { Spinner } from '../Spinner/Spinner';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ControlSize;
  /** Show a spinner and block interaction. The label stays in place. */
  loading?: boolean;
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  iconStart?: ReactNode;
  /** Icon rendered after the label. */
  iconEnd?: ReactNode;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    iconStart,
    iconEnd,
    disabled,
    className,
    type = 'button',
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={cx(
        'ds-button',
        `ds-button--${variant}`,
        `ds-button--${size}`,
        fullWidth && 'ds-button--full-width',
        loading && 'ds-button--loading',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && (
        <span className="ds-button__spinner">
          <Spinner size="sm" />
        </span>
      )}
      {iconStart && (
        <span className="ds-button__icon" aria-hidden="true">
          {iconStart}
        </span>
      )}
      {children != null && <span className="ds-button__label">{children}</span>}
      {iconEnd && (
        <span className="ds-button__icon" aria-hidden="true">
          {iconEnd}
        </span>
      )}
    </button>
  );
});
