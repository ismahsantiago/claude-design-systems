import type { ReactNode } from 'react';
import { Section } from '../../components/Section/Section';
import { Stack } from '../../components/Stack/Stack';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './StorySteps.css';

export interface StoryStep {
  /** Short name for the step — two or three words. */
  label: ReactNode;
  /** Who does it. Rendered as monospace metadata. */
  owner?: ReactNode;
  description: ReactNode;
  /** What the reader gets when this step is done. */
  outcome?: ReactNode;
}

export interface StoryStepsProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Three to six. Fewer reads as a list; more stops reading as a route. */
  steps: StoryStep[];
  /** `row` runs left to right on wide screens; `column` always stacks. */
  layout?: 'row' | 'column';
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  id?: string;
  className?: string;
}

/**
 * The route: numbered steps threaded onto a single line.
 *
 * The connecting line is what separates this from a feature grid — it says the
 * steps happen in an order and someone owns each handoff. It is drawn with a
 * border on the step rather than an overlay, so it survives reflow and never
 * needs measuring.
 */
export function StorySteps({
  eyebrow,
  title,
  subtitle,
  steps,
  layout = 'row',
  tone = 'default',
  id,
  className,
}: StoryStepsProps) {
  return (
    <Section id={id} tone={tone} className={className}>
      <Stack gap="3xl">
        {(eyebrow || title || subtitle) && (
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} align="start" />
        )}
        <ol className={`ds-story-steps ds-story-steps--${layout}`}>
          {steps.map((step, index) => (
            <li className="ds-story-step" key={index}>
              <span className="ds-story-step__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="ds-story-step__label">{step.label}</h3>
              {step.owner && <p className="ds-story-step__owner">{step.owner}</p>}
              <p className="ds-story-step__description">{step.description}</p>
              {step.outcome && <p className="ds-story-step__outcome">{step.outcome}</p>}
            </li>
          ))}
        </ol>
      </Stack>
    </Section>
  );
}
