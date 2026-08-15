import { forwardRef } from 'react';
import type { ReactNode, SelectHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { ControlSize } from '../../types';
import '../../styles/control.css';
import './Select.css';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: ControlSize;
  invalid?: boolean;
  fullWidth?: boolean;
  /** Non-selectable first option, shown when the value is empty. */
  placeholder?: string;
  /** `<option>` elements. */
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = 'md', invalid = false, fullWidth = true, placeholder, className, children, ...rest },
  ref,
) {
  return (
    <span className={cx('ds-select', fullWidth && 'ds-select--full-width')}>
      <select
        {...rest}
        ref={ref}
        className={cx(
          'ds-control',
          'ds-select__input',
          `ds-control--${size}`,
          fullWidth && 'ds-control--full-width',
          className,
        )}
        aria-invalid={invalid || undefined}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <svg
        className="ds-select__chevron"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path
          d="M4 6l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
});
