import type { ReactNode } from 'react';
import { Section } from '../../components/Section/Section';
import { Stack } from '../../components/Stack/Stack';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './FeatureGrid.css';

export interface Feature {
  /** Icon or small illustration. */
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export interface FeatureGridProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  features: Feature[];
  /** Columns on wide screens. Collapses to one on narrow. */
  columns?: 2 | 3 | 4;
  /** `plain` lets features sit on the page; `card` gives each its own surface. */
  variant?: 'plain' | 'card';
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  id?: string;
  className?: string;
}

/** The "what it does" band: a headline and a grid of capabilities. */
export function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  features,
  columns = 3,
  variant = 'plain',
  tone = 'default',
  id,
  className,
}: FeatureGridProps) {
  return (
    <Section id={id} tone={tone} className={className}>
      <Stack gap="3xl">
        {(eyebrow || title || subtitle) && (
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        )}
        <div
          className={`ds-feature-grid ds-feature-grid--${columns} ds-feature-grid--${variant}`}
        >
          {features.map((feature, index) => (
            <div className="ds-feature" key={index}>
              {feature.icon && <div className="ds-feature__icon">{feature.icon}</div>}
              <h3 className="ds-feature__title">{feature.title}</h3>
              <p className="ds-feature__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </Stack>
    </Section>
  );
}
