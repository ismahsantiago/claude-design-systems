import type { ReactNode } from 'react';
import { Section } from '../../components/Section/Section';
import { Stack } from '../../components/Stack/Stack';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './FAQ.css';

export interface FAQItem {
  question: ReactNode;
  answer: ReactNode;
}

export interface FAQProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  items: FAQItem[];
  /** Index of the item open on first render. Omit to start fully collapsed. */
  defaultOpen?: number;
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  id?: string;
  className?: string;
}

/**
 * Objection handling near the end of the page.
 *
 * Built on native `<details>`, so it works with no JavaScript, is keyboard
 * operable and is announced correctly — all for free.
 */
export function FAQ({
  eyebrow,
  title,
  subtitle,
  items,
  defaultOpen,
  tone = 'default',
  id,
  className,
}: FAQProps) {
  return (
    <Section id={id} tone={tone} width="prose" className={className}>
      <Stack gap="3xl">
        {(eyebrow || title || subtitle) && (
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        )}
        <div className="ds-faq">
          {items.map((item, index) => (
            <details className="ds-faq__item" key={index} open={index === defaultOpen}>
              <summary className="ds-faq__question">
                <span>{item.question}</span>
                <svg
                  className="ds-faq__chevron"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="ds-faq__answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </Stack>
    </Section>
  );
}
