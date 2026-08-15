import type { ReactNode } from 'react';
import { Section } from '../../components/Section/Section';
import { Stack } from '../../components/Stack/Stack';
import { Avatar } from '../../components/Avatar/Avatar';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './Testimonials.css';

export interface Testimonial {
  quote: ReactNode;
  /** Person's name. Also drives the avatar initials. */
  name: string;
  /** Role and company — "Head of Design, Acme". */
  role?: ReactNode;
  avatarSrc?: string;
}

export interface TestimonialsProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  testimonials: Testimonial[];
  /** `feature` renders a single large pull quote; `grid` shows them as cards. */
  variant?: 'grid' | 'feature';
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  id?: string;
  className?: string;
}

/** What customers say. `feature` for one strong quote, `grid` for several. */
export function Testimonials({
  eyebrow,
  title,
  subtitle,
  testimonials,
  variant = 'grid',
  tone = 'sunken',
  id,
  className,
}: TestimonialsProps) {
  return (
    <Section id={id} tone={tone} className={className}>
      <Stack gap="3xl">
        {(eyebrow || title || subtitle) && (
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        )}
        <div className={`ds-testimonials ds-testimonials--${variant}`}>
          {testimonials.map((testimonial, index) => (
            <figure className="ds-testimonial" key={index}>
              <blockquote className="ds-testimonial__quote">{testimonial.quote}</blockquote>
              <figcaption className="ds-testimonial__author">
                <Avatar
                  name={testimonial.name}
                  src={testimonial.avatarSrc}
                  size={variant === 'feature' ? 'lg' : 'md'}
                />
                <span className="ds-testimonial__identity">
                  <span className="ds-testimonial__name">{testimonial.name}</span>
                  {testimonial.role && (
                    <span className="ds-testimonial__role">{testimonial.role}</span>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Stack>
    </Section>
  );
}
