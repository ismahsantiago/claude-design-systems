import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Container } from '../../components/Container/Container';
import './Nav.css';

export interface NavLink {
  label: ReactNode;
  href: string;
}

export interface NavProps {
  /** Wordmark or logo, on the left. */
  brand: ReactNode;
  links?: NavLink[];
  /** Buttons on the right — sign in, get started. */
  actions?: ReactNode;
  /** Stick to the top of the viewport as the page scrolls. */
  sticky?: boolean;
  /** Hairline under the bar. Turn off when the hero supplies its own edge. */
  bordered?: boolean;
  className?: string;
}

/**
 * The top bar.
 *
 * Links collapse below the mobile breakpoint rather than turning into a
 * hamburger menu: a drawer needs state and focus trapping, which belongs in
 * the app rather than in a presentational section.
 */
export function Nav({
  brand,
  links = [],
  actions,
  sticky = false,
  bordered = true,
  className,
}: NavProps) {
  return (
    <header
      className={cx(
        'ds-nav',
        sticky && 'ds-nav--sticky',
        bordered && 'ds-nav--bordered',
        className,
      )}
    >
      <Container>
        <div className="ds-nav__inner">
          <div className="ds-nav__brand">{brand}</div>
          {links.length > 0 && (
            <nav className="ds-nav__links" aria-label="Main">
              {links.map((link, index) => (
                <a className="ds-nav__link" href={link.href} key={index}>
                  {link.label}
                </a>
              ))}
            </nav>
          )}
          {actions && <div className="ds-nav__actions">{actions}</div>}
        </div>
      </Container>
    </header>
  );
}
