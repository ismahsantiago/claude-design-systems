import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Section } from '../../components/Section/Section';
import { Stack } from '../../components/Stack/Stack';
import { Badge } from '../../components/Badge/Badge';
import './Hero.css';

export interface HeroProps {
  /** Small label above the headline — "New", "v2.0 is out". */
  eyebrow?: ReactNode;
  /** The headline. Renders at `--ds-text-display`, the archetype's signature size. */
  headline: ReactNode;
  /** One or two sentences under the headline. */
  subhead?: ReactNode;
  /** Buttons. Put the primary action first. */
  actions?: ReactNode;
  /** Line under the actions — "No card required", social proof. */
  note?: ReactNode;
  /** Screenshot, illustration or video, shown beside or below the copy. */
  media?: ReactNode;
  /** `center` stacks and centers; `split` puts copy and media side by side. */
  layout?: 'center' | 'split';
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  id?: string;
  className?: string;
}

/** The first band of the page: what this is, and the one thing to do about it. */
export function Hero({
  eyebrow,
  headline,
  subhead,
  actions,
  note,
  media,
  layout = 'center',
  tone = 'default',
  id,
  className,
}: HeroProps) {
  const copy = (
    <Stack gap="lg" align={layout === 'center' ? 'center' : 'start'} className="ds-hero__copy">
      {eyebrow && <Badge tone="accent">{eyebrow}</Badge>}
      <h1 className="ds-hero__headline">{headline}</h1>
      {subhead && <p className="ds-hero__subhead">{subhead}</p>}
      {actions && (
        <Stack
          direction="row"
          gap="md"
          wrap
          justify={layout === 'center' ? 'center' : 'start'}
          className="ds-hero__actions"
        >
          {actions}
        </Stack>
      )}
      {note && <p className="ds-hero__note">{note}</p>}
    </Stack>
  );

  return (
    <Section
      id={id}
      tone={tone}
      spacing="loose"
      className={cx('ds-hero', `ds-hero--${layout}`, className)}
    >
      {layout === 'split' ? (
        <div className="ds-hero__split">
          {copy}
          {media && <div className="ds-hero__media">{media}</div>}
        </div>
      ) : (
        <Stack gap="2xl" align="center">
          {copy}
          {media && <div className="ds-hero__media">{media}</div>}
        </Stack>
      )}
    </Section>
  );
}
