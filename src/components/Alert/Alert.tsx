import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Alert.css';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  tone?: AlertTone;
  /** Bold first line. */
  title?: ReactNode;
  /** Called when the dismiss button is pressed. Omit for a permanent alert. */
  onDismiss?: () => void;
  /** Override the default tone icon. */
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const ICON_PATHS: Record<AlertTone, string> = {
  info: 'M8 7.5v4M8 5h.01',
  success: 'M5 8.5l2 2 4-4.5',
  warning: 'M8 5v4M8 11h.01',
  danger: 'M6 6l4 4M10 6l-4 4',
};

function ToneIcon({ tone }: { tone: AlertTone }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path
        d={ICON_PATHS[tone]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Inline message about the state of the page or a recent action.
 * `danger` and `warning` announce assertively; the rest are polite.
 */
export function Alert({ tone = 'info', title, onDismiss, icon, className, children }: AlertProps) {
  const assertive = tone === 'danger' || tone === 'warning';

  return (
    <div
      className={cx('ds-alert', `ds-alert--${tone}`, className)}
      role={assertive ? 'alert' : 'status'}
    >
      <span className="ds-alert__icon">{icon ?? <ToneIcon tone={tone} />}</span>
      <div className="ds-alert__content">
        {title && <div className="ds-alert__title">{title}</div>}
        {children != null && <div className="ds-alert__body">{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="ds-alert__dismiss" onClick={onDismiss} aria-label="Dismiss">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
