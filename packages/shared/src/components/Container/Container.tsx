import type { ElementType, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Container.css';

export interface ContainerProps {
  /** Max width. `page` is the system's `--ds-container-width`; `prose` is narrower for reading. */
  width?: 'page' | 'prose' | 'full';
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

/** Centers content and holds the page gutter. Every section wraps its content in one. */
export function Container({
  width = 'page',
  as: Component = 'div',
  className,
  children,
}: ContainerProps) {
  return (
    <Component className={cx('ds-container', `ds-container--${width}`, className)}>
      {children}
    </Component>
  );
}
