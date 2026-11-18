import type { ReactNode } from 'react';
import { Section } from '../../components/Section/Section';
import { Stack } from '../../components/Stack/Stack';
import './CTASection.css';

export interface CTASectionProps {
  headline: ReactNode;
  subhead?: ReactNode;
  /** Buttons, or an inline email-capture form. */
  actions?: ReactNode;
  /** Reassurance under the actions — "Free for 14 days. No card." */
  note?: ReactNode;
  /** Defaults to `inverted`: the closing band should not look like the others. */
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  align?: 'center' | 'split';
  id?: string;
  className?: string;
}

/** The closing ask, just above the footer. */
export function CTASection({
  headline,
  subhead,
  actions,
  note,
  tone = 'inverted',
  align = 'center',
  id,
  className,
}: CTASectionProps) {
  const copy = (
    <Stack gap="sm" align={align === 'center' ? 'center' : 'start'}>
      <h2 className="ds-cta__headline">{headline}</h2>
      {subhead && <p className="ds-cta__subhead">{subhead}</p>}
    </Stack>
  );

  const cluster = (actions || note) && (
    <Stack gap="sm" align={align === 'center' ? 'center' : 'start'}>
      {actions && (
        <Stack direction="row" gap="md" wrap justify={align === 'center' ? 'center' : 'start'}>
          {actions}
        </Stack>
      )}
      {note && <p className="ds-cta__note">{note}</p>}
    </Stack>
  );

  return (
    <Section id={id} tone={tone} className={`ds-cta ds-cta--${align} ${className ?? ''}`}>
      {align === 'split' ? (
        <div className="ds-cta__split">
          {copy}
          {cluster}
        </div>
      ) : (
        <Stack gap="xl" align="center">
          {copy}
          {cluster}
        </Stack>
      )}
    </Section>
  );
}
