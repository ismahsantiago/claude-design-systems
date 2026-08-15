import type { ReactNode } from 'react';
import { Section } from '../../components/Section/Section';
import { Stack } from '../../components/Stack/Stack';
import { Badge } from '../../components/Badge/Badge';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './Pricing.css';

export interface PricingPlan {
  name: ReactNode;
  /** Headline number — "$29" or "Free". Rendered at display weight. */
  price: ReactNode;
  /** Unit under the price — "per user / month". */
  period?: ReactNode;
  description?: ReactNode;
  features: ReactNode[];
  /** The plan's button. Make the featured plan's the only filled one. */
  action?: ReactNode;
  /** Lifts the plan visually and adds the ribbon. Use on at most one plan. */
  featured?: boolean;
  /** Ribbon text on the featured plan. */
  badge?: ReactNode;
}

export interface PricingProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  plans: PricingPlan[];
  /** Line under the table — "Prices exclude VAT". */
  note?: ReactNode;
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  id?: string;
  className?: string;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The plan comparison band. */
export function Pricing({
  eyebrow,
  title,
  subtitle,
  plans,
  note,
  tone = 'default',
  id,
  className,
}: PricingProps) {
  return (
    <Section id={id} tone={tone} className={className}>
      <Stack gap="3xl">
        {(eyebrow || title || subtitle) && (
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        )}
        <div className="ds-pricing" style={{ '--ds-pricing-count': plans.length } as never}>
          {plans.map((plan, index) => (
            <div
              className={`ds-plan${plan.featured ? ' ds-plan--featured' : ''}`}
              key={index}
            >
              <div className="ds-plan__head">
                <span className="ds-plan__name">{plan.name}</span>
                {plan.featured && plan.badge && <Badge tone="accent">{plan.badge}</Badge>}
              </div>
              <div className="ds-plan__price-row">
                <span className="ds-plan__price">{plan.price}</span>
                {plan.period && <span className="ds-plan__period">{plan.period}</span>}
              </div>
              {plan.description && <p className="ds-plan__description">{plan.description}</p>}
              {plan.action && <div className="ds-plan__action">{plan.action}</div>}
              <ul className="ds-plan__features">
                {plan.features.map((feature, featureIndex) => (
                  <li className="ds-plan__feature" key={featureIndex}>
                    <span className="ds-plan__check">
                      <CheckIcon />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {note && <p className="ds-pricing__note">{note}</p>}
      </Stack>
    </Section>
  );
}
