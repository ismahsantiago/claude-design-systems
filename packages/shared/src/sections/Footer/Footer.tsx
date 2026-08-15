import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Container } from '../../components/Container/Container';
import type { NavLink } from '../Nav/Nav';
import './Footer.css';

export interface FooterColumn {
  title: ReactNode;
  links: NavLink[];
}

export interface FooterProps {
  /** Wordmark, top-left. */
  brand?: ReactNode;
  /** One or two lines under the brand. */
  description?: ReactNode;
  columns?: FooterColumn[];
  /** Copyright line, bottom-left. */
  copyright?: ReactNode;
  /** Social icons or legal links, bottom-right. */
  meta?: ReactNode;
  className?: string;
}

/** The closing band: navigation, legal, and whatever proof belongs at the end. */
export function Footer({
  brand,
  description,
  columns = [],
  copyright,
  meta,
  className,
}: FooterProps) {
  const hasTop = Boolean(brand || description || columns.length);

  return (
    <footer className={cx('ds-footer', className)}>
      <Container>
        {hasTop && (
          <div className="ds-footer__top">
            {(brand || description) && (
              <div className="ds-footer__identity">
                {brand && <div className="ds-footer__brand">{brand}</div>}
                {description && <p className="ds-footer__description">{description}</p>}
              </div>
            )}
            {columns.length > 0 && (
              <div className="ds-footer__columns">
                {columns.map((column, index) => (
                  <nav className="ds-footer__column" key={index}>
                    <h3 className="ds-footer__column-title">{column.title}</h3>
                    {column.links.map((link, linkIndex) => (
                      <a className="ds-footer__link" href={link.href} key={linkIndex}>
                        {link.label}
                      </a>
                    ))}
                  </nav>
                ))}
              </div>
            )}
          </div>
        )}
        {(copyright || meta) && (
          <div className="ds-footer__bottom">
            {copyright && <p className="ds-footer__copyright">{copyright}</p>}
            {meta && <div className="ds-footer__meta">{meta}</div>}
          </div>
        )}
      </Container>
    </footer>
  );
}
