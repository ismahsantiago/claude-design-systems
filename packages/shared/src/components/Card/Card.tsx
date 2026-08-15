import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { spaceVar, type Space } from '../../types';
import './Card.css';

export interface CardProps {
  /** Title rendered in the card header. */
  title?: ReactNode;
  /** Muted line under the title. */
  subtitle?: ReactNode;
  /** Header-right slot — typically a Button or Badge. */
  action?: ReactNode;
  /** Bottom section, separated by a rule. */
  footer?: ReactNode;
  /** Inner padding, from the spacing scale. */
  padding?: Space;
  /** `flat` sits on a border only; `raised` adds a shadow. */
  elevation?: 'flat' | 'raised';
  /** Add hover feedback. Use for cards that are themselves clickable. */
  interactive?: boolean;
  className?: string;
  children?: ReactNode;
}

/** Bordered surface that groups related content. */
export function Card({
  title,
  subtitle,
  action,
  footer,
  padding = 'lg',
  elevation = 'flat',
  interactive = false,
  className,
  children,
}: CardProps) {
  const hasHeader = Boolean(title || subtitle || action);

  return (
    <div
      className={cx(
        'ds-card',
        `ds-card--${elevation}`,
        interactive && 'ds-card--interactive',
        className,
      )}
      style={{ '--ds-card-padding': spaceVar(padding) } as CSSProperties}
    >
      {hasHeader && (
        <div className="ds-card__header">
          <div className="ds-card__titles">
            {title && <div className="ds-card__title">{title}</div>}
            {subtitle && <div className="ds-card__subtitle">{subtitle}</div>}
          </div>
          {action && <div className="ds-card__action">{action}</div>}
        </div>
      )}
      {children != null && <div className="ds-card__body">{children}</div>}
      {footer && <div className="ds-card__footer">{footer}</div>}
    </div>
  );
}
