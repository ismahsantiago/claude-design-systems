import type { ReactNode } from 'react';
import { Section } from '../../components/Section/Section';
import { Stack } from '../../components/Stack/Stack';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './MetricStrip.css';

export interface Metric {
  /** The number itself. Set at display size — keep it short. */
  value: ReactNode;
  /** What the number counts. One short line. */
  label: ReactNode;
  /**
   * Provenance line under the label. Use it for the source, the date the
   * figure was verified, or — when the value is not yet real — to say so.
   * A metric with no provenance is a claim nobody can check.
   */
  footnote?: ReactNode;
}

export interface MetricStripProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Two to four. More than four and none of them lands. */
  metrics: Metric[];
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  id?: string;
  className?: string;
}

/**
 * The evidence band: a row of large numbers separated by hairlines.
 *
 * Deliberately capped in visual density — the point of a metric strip is that
 * a reader takes all of it in at a glance, which stops being true past four.
 * Stacks to one column with rules on narrow viewports.
 */
export function MetricStrip({
  eyebrow,
  title,
  subtitle,
  metrics,
  tone = 'default',
  id,
  className,
}: MetricStripProps) {
  return (
    <Section id={id} tone={tone} className={className}>
      <Stack gap="3xl">
        {(eyebrow || title || subtitle) && (
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} align="start" />
        )}
        <dl
          className="ds-metric-strip"
          style={{ '--ds-metric-columns': metrics.length } as never}
        >
          {metrics.map((metric, index) => (
            <div className="ds-metric" key={index}>
              <dd className="ds-metric__value">{metric.value}</dd>
              <dt className="ds-metric__label">{metric.label}</dt>
              {metric.footnote && <p className="ds-metric__footnote">{metric.footnote}</p>}
            </div>
          ))}
        </dl>
      </Stack>
    </Section>
  );
}
