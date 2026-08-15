import { useId } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { cloneElement, isValidElement } from 'react';
import { cx } from '../../utils/cx';
import './Field.css';

export interface FieldProps {
  /** Visible label text. */
  label: ReactNode;
  /** Helper text below the control. Hidden while an error is showing. */
  hint?: ReactNode;
  /** Error message. Its presence puts the control in the invalid state. */
  error?: ReactNode;
  /** Mark the field required (adds an indicator and the `required` attribute). */
  required?: boolean;
  /** The control. A single element — Input, Textarea, Select, etc. */
  children: ReactElement<Record<string, unknown>>;
  className?: string;
}

/**
 * Label + control + hint/error, wired together.
 *
 * Field generates the id and injects `id`, `aria-describedby`, `invalid` and
 * `required` into its child, so the control itself never has to be told about
 * validation plumbing.
 */
export function Field({ label, hint, error, required, children, className }: FieldProps) {
  const generatedId = useId();
  const childProps = isValidElement(children)
    ? (children.props as Record<string, unknown>)
    : undefined;
  const controlId = (childProps?.id as string | undefined) ?? generatedId;
  const messageId = `${controlId}-message`;
  const message = error ?? hint;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id: controlId,
        invalid: Boolean(error) || undefined,
        required: required || undefined,
        'aria-describedby': message ? messageId : undefined,
      })
    : children;

  return (
    <div className={cx('ds-field', className)}>
      <label className="ds-field__label" htmlFor={controlId}>
        {label}
        {required && (
          <span className="ds-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {control}
      {message && (
        <span
          id={messageId}
          className={cx('ds-field__message', error && 'ds-field__message--error')}
          role={error ? 'alert' : undefined}
        >
          {message}
        </span>
      )}
    </div>
  );
}
