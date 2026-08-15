import { forwardRef, useEffect, useRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text beside the box. */
  label?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** Mixed state — visually a dash, and `aria-checked="mixed"`. */
  indeterminate?: boolean;
  invalid?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate = false, invalid = false, className, disabled, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement>(null);

  // `indeterminate` has no HTML attribute — it must be set on the DOM node.
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cx('ds-checkbox', disabled && 'ds-checkbox--disabled', className)}>
      <input
        {...rest}
        type="checkbox"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className="ds-checkbox__input"
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
      />
      {(label || description) && (
        <span className="ds-checkbox__text">
          {label && <span className="ds-checkbox__label">{label}</span>}
          {description && <span className="ds-checkbox__description">{description}</span>}
        </span>
      )}
    </label>
  );
});
