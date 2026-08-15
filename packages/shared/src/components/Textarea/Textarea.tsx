import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import '../../styles/control.css';
import './Textarea.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  fullWidth?: boolean;
  /** Whether the user can drag-resize. Defaults to vertical only. */
  resize?: 'none' | 'vertical';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid = false, fullWidth = true, resize = 'vertical', rows = 4, className, ...rest },
  ref,
) {
  return (
    <textarea
      {...rest}
      ref={ref}
      rows={rows}
      className={cx(
        'ds-control',
        'ds-textarea',
        `ds-textarea--resize-${resize}`,
        fullWidth && 'ds-control--full-width',
        className,
      )}
      aria-invalid={invalid || undefined}
    />
  );
});
