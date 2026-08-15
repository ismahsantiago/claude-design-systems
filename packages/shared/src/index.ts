/**
 * `@ds/shared` — structure, no values.
 *
 * Note what is NOT imported here: any token file. This package styles itself
 * entirely through the custom properties named in `contract.mjs`, and a design
 * system becomes a design system by supplying them. Importing `@ds/shared`
 * without a theme gets you correct, completely unstyled markup — which is the
 * intended failure mode, because it is loud rather than subtly wrong.
 */
import './styles/base.css';
import './styles/control.css';

/* ---------- Foundations ---------- */
export { ThemeProvider, useTheme } from './components/ThemeProvider/ThemeProvider';
export type {
  ThemeProviderProps,
  ThemeName,
  ThemePreference,
} from './components/ThemeProvider/ThemeProvider';

/* ---------- Layout ---------- */
export { Stack } from './components/Stack/Stack';
export type { StackProps } from './components/Stack/Stack';
export { Container } from './components/Container/Container';
export type { ContainerProps } from './components/Container/Container';
export { Section } from './components/Section/Section';
export type { SectionProps } from './components/Section/Section';
export { Divider } from './components/Divider/Divider';
export type { DividerProps } from './components/Divider/Divider';

/* ---------- Typography ---------- */
export { Text } from './components/Text/Text';
export type { TextProps } from './components/Text/Text';
export { Heading } from './components/Heading/Heading';
export type { HeadingProps } from './components/Heading/Heading';

/* ---------- Controls ---------- */
export { Button } from './components/Button/Button';
export type { ButtonProps, ButtonVariant } from './components/Button/Button';
export { Field } from './components/Field/Field';
export type { FieldProps } from './components/Field/Field';
export { Input } from './components/Input/Input';
export type { InputProps } from './components/Input/Input';
export { Textarea } from './components/Textarea/Textarea';
export type { TextareaProps } from './components/Textarea/Textarea';
export { Select } from './components/Select/Select';
export type { SelectProps } from './components/Select/Select';
export { Checkbox } from './components/Checkbox/Checkbox';
export type { CheckboxProps } from './components/Checkbox/Checkbox';
export { Switch } from './components/Switch/Switch';
export type { SwitchProps } from './components/Switch/Switch';

/* ---------- Display & feedback ---------- */
export { Badge } from './components/Badge/Badge';
export type { BadgeProps } from './components/Badge/Badge';
export { Avatar } from './components/Avatar/Avatar';
export type { AvatarProps } from './components/Avatar/Avatar';
export { Card } from './components/Card/Card';
export type { CardProps } from './components/Card/Card';
export { Alert } from './components/Alert/Alert';
export type { AlertProps, AlertTone } from './components/Alert/Alert';
export { Spinner } from './components/Spinner/Spinner';
export type { SpinnerProps } from './components/Spinner/Spinner';

/* ---------- Landing sections ---------- */
export { Nav } from './sections/Nav/Nav';
export type { NavProps, NavLink } from './sections/Nav/Nav';
export { Hero } from './sections/Hero/Hero';
export type { HeroProps } from './sections/Hero/Hero';
export { LogoCloud } from './sections/LogoCloud/LogoCloud';
export type { LogoCloudProps } from './sections/LogoCloud/LogoCloud';
export { SectionHeader } from './sections/SectionHeader/SectionHeader';
export type { SectionHeaderProps } from './sections/SectionHeader/SectionHeader';
export { FeatureGrid } from './sections/FeatureGrid/FeatureGrid';
export type { FeatureGridProps, Feature } from './sections/FeatureGrid/FeatureGrid';
export { MediaShowcase } from './sections/MediaShowcase/MediaShowcase';
export type { MediaShowcaseProps, MediaItem } from './sections/MediaShowcase/MediaShowcase';
export { Testimonials } from './sections/Testimonials/Testimonials';
export type { TestimonialsProps, Testimonial } from './sections/Testimonials/Testimonials';
export { Pricing } from './sections/Pricing/Pricing';
export type { PricingProps, PricingPlan } from './sections/Pricing/Pricing';
export { FAQ } from './sections/FAQ/FAQ';
export type { FAQProps, FAQItem } from './sections/FAQ/FAQ';
export { CTA } from './sections/CTA/CTA';
export type { CTAProps } from './sections/CTA/CTA';
export { Footer } from './sections/Footer/Footer';
export type { FooterProps, FooterColumn } from './sections/Footer/Footer';

/* ---------- Utilities ---------- */
export { cx } from './utils/cx';
export type { ClassValue } from './utils/cx';
export { spaceVar } from './types';
export type { Space, ControlSize, Tone } from './types';
