import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type ThemeName = 'light' | 'dark';
export type ThemePreference = ThemeName | 'system';

export interface ThemeProviderProps {
  /** Theme to apply. `system` follows the OS setting and updates live. */
  theme?: ThemePreference;
  /** Paint the page background and stretch to full height. */
  fullBleed?: boolean;
  /** Extra classes on the root element. */
  className?: string;
  children: ReactNode;
}

interface ThemeContextValue {
  /** The preference as given — may be `system`. */
  preference: ThemePreference;
  /** The concrete theme actually applied. Never `system`. */
  theme: ThemeName;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Read the active theme. Throws outside a ThemeProvider, which is deliberate:
 * a component that needs the theme is unstyled without the provider anyway.
 */
export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useTheme must be used inside a <ThemeProvider>');
  }
  return value;
}

function prefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Root wrapper for the design system. Every component must render inside one:
 * it owns the `.ds-root` class that scopes the base layer and stamps
 * `data-ds-theme`, which is where all the color tokens resolve.
 *
 * `system` is resolved to a concrete `light`/`dark` here rather than left to a
 * media query, so the rendered DOM says exactly which theme is in effect.
 */
export function ThemeProvider({
  theme = 'light',
  fullBleed = false,
  className,
  children,
}: ThemeProviderProps) {
  const [systemTheme, setSystemTheme] = useState<ThemeName>(() =>
    prefersDark() ? 'dark' : 'light',
  );

  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };
    setSystemTheme(query.matches ? 'dark' : 'light');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [theme]);

  const resolved: ThemeName = theme === 'system' ? systemTheme : theme;

  const value = useMemo<ThemeContextValue>(
    () => ({ preference: theme, theme: resolved }),
    [theme, resolved],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={cx('ds-root', fullBleed && 'ds-root--full-bleed', className)}
        data-ds-theme={resolved}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
