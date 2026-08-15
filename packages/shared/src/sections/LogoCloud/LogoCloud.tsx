import type { ReactNode } from 'react';
import { Section } from '../../components/Section/Section';
import { Stack } from '../../components/Stack/Stack';
import './LogoCloud.css';

export interface LogoCloudProps {
  /** Line above the logos — "Trusted by teams at". */
  caption?: ReactNode;
  /**
   * One node per logo. Pass `<img>` or inline SVG; they are desaturated and
   * dimmed so a row of mismatched brand colors still reads as one band.
   */
  logos: ReactNode[];
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  id?: string;
  className?: string;
}

/** Social proof: the row of customer logos under the hero. */
export function LogoCloud({
  caption,
  logos,
  tone = 'default',
  id,
  className,
}: LogoCloudProps) {
  return (
    <Section id={id} tone={tone} spacing="tight" className={className}>
      <Stack gap="xl" align="center">
        {caption && <p className="ds-logo-cloud__caption">{caption}</p>}
        <div className="ds-logo-cloud__row">
          {logos.map((logo, index) => (
            <div className="ds-logo-cloud__item" key={index}>
              {logo}
            </div>
          ))}
        </div>
      </Stack>
    </Section>
  );
}
