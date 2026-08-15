import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Container } from '../Container/Container';
import './Section.css';

export interface SectionProps {
  /**
   * Background treatment. `sunken` and `accent` are how a landing page gets
   * its horizontal banding without any section knowing its own position.
   */
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  /** Vertical rhythm. `loose` doubles the section gap for hero-weight blocks. */
  spacing?: 'tight' | 'normal' | 'loose' | 'none';
  /** Content width, passed through to the inner Container. */
  width?: 'page' | 'prose' | 'full';
  /** Anchor target for in-page nav links. */
  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * One horizontal band of a landing page: owns the vertical rhythm and the
 * background, and centers its content.
 *
 * Sections never set their own top or bottom margin — stacking them is what
 * produces the page, so the rhythm has to live in exactly one place.
 */
export function Section({
  tone = 'default',
  spacing = 'normal',
  width = 'page',
  id,
  className,
  style,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cx('ds-section', `ds-section--${tone}`, `ds-section--${spacing}`, className)}
      style={style}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}
