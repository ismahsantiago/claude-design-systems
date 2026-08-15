import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Switch.css';

export interface SwitchProps {
  /** Controlled on/off state. */
  checked?: boolean;
  /** Initial state when uncontrolled. */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
  size?: 'sm' | 'md';
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

/**
 * On/off toggle for settings that apply immediately. For anything submitted
 * with a form, use Checkbox instead.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked,
    onCheckedChange,
    label,
    description,
    size = 'md',
    disabled = false,
    name,
    id,
    className,
  },
  ref,
) {
  return (
    <label
      className={cx(
        'ds-switch',
        `ds-switch--${size}`,
        disabled && 'ds-switch--disabled',
        className,
      )}
    >
      <input
        ref={ref}
        id={id}
        name={name}
        type="checkbox"
        role="switch"
        className="ds-switch__input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(event) => onCheckedChange?.(event.target.checked)}
      />
      <span className="ds-switch__track" aria-hidden="true">
        <span className="ds-switch__thumb" />
      </span>
      {(label || description) && (
        <span className="ds-switch__text">
          {label && <span className="ds-switch__label">{label}</span>}
          {description && <span className="ds-switch__description">{description}</span>}
        </span>
      )}
    </label>
  );
});
