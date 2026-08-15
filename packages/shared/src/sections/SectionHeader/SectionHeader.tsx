import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './SectionHeader.css';

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'start';
  className?: string;
}

/**
 * The eyebrow/title/subtitle stack every content band opens with. Factored out
 * so all the sections announce themselves at identical size and rhythm.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cx('ds-section-header', `ds-section-header--${align}`, className)}>
      {eyebrow && <p className="ds-section-header__eyebrow">{eyebrow}</p>}
      {title && <h2 className="ds-section-header__title">{title}</h2>}
      {subtitle && <p className="ds-section-header__subtitle">{subtitle}</p>}
    </div>
  );
}
