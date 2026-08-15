/**
 * One landing page, identical in every system.
 *
 * This is the repo's comparison instrument. Because the copy, the structure and
 * the section order never change, anything that looks different between two
 * systems is caused purely by their tokens — which makes the archetypes
 * genuinely comparable instead of four unrelated demos.
 *
 * It is deliberately not exported from the package index: it is a fixture, not
 * part of the component vocabulary, and it must never end up in a system's
 * shipped bundle.
 */
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Stack } from '../components/Stack/Stack';
import { Nav } from '../sections/Nav/Nav';
import { Hero } from '../sections/Hero/Hero';
import { LogoCloud } from '../sections/LogoCloud/LogoCloud';
import { FeatureGrid } from '../sections/FeatureGrid/FeatureGrid';
import { MediaShowcase } from '../sections/MediaShowcase/MediaShowcase';
import { Testimonials } from '../sections/Testimonials/Testimonials';
import { Pricing } from '../sections/Pricing/Pricing';
import { FAQ } from '../sections/FAQ/FAQ';
import { CTA } from '../sections/CTA/CTA';
import { Footer } from '../sections/Footer/Footer';

function Glyph({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Wordmarks stand in for customer logos so the demo pulls no network assets. */
function Wordmark({ label }: { label: string }) {
  return <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>{label}</span>;
}

/**
 * Stand-in media. Painted from the system's own gradient tokens rather than
 * loaded from anywhere, so the demo pulls no network assets and each system's
 * gradients get shown at size.
 */
function Plate({ gradient }: { gradient: 'accent' | 'warm' }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `var(--ds-gradient-${gradient})`,
      }}
    />
  );
}

const SHOWCASE = [
  { media: <Plate gradient="accent" />, title: 'Onboarding flow', meta: '12 screens · 2026-04' },
  { media: <Plate gradient="warm" />, title: 'Billing redesign', meta: '8 screens · 2026-05' },
  { media: <Plate gradient="accent" />, title: 'Mobile companion', meta: '21 screens · 2026-06' },
];

const FEATURES = [
  {
    icon: <Glyph path="M3 10h14M10 3v14" />,
    title: 'Composable by default',
    description:
      'Every section takes plain props and renders plain markup. No layout engine to learn and nothing to fight when the design changes.',
  },
  {
    icon: <Glyph path="M4 15l4-8 4 5 4-3" />,
    title: 'Measured, not guessed',
    description:
      'Ships with the instrumentation already wired, so the first question after launch has an answer rather than a dashboard to build.',
  },
  {
    icon: <Glyph path="M6 10l3 3 5-6" />,
    title: 'Accessible out of the box',
    description:
      'Focus order, labelling and contrast are part of the components, not a checklist someone runs the week before release.',
  },
  {
    icon: <Glyph path="M10 3v14M3 10h14" />,
    title: 'Themed with tokens',
    description:
      'One set of custom properties drives color, spacing and type. Rebranding is a stylesheet, not a refactor.',
  },
  {
    icon: <Glyph path="M4 6h12M4 10h12M4 14h8" />,
    title: 'Content-shaped APIs',
    description:
      'Sections take arrays of items rather than deep children, so a page can be generated from a CMS without a mapping layer.',
  },
  {
    icon: <Glyph path="M10 4a6 6 0 100 12 6 6 0 000-12z" />,
    title: 'Dark mode included',
    description:
      'Both themes are defined by the same contract, so a component cannot look right in one and broken in the other.',
  },
];

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'For side projects and evaluation.',
    features: ['Up to 3 projects', 'Community support', '1 GB of storage'],
    action: <Button variant="secondary">Start building</Button>,
  },
  {
    name: 'Team',
    price: '$29',
    period: 'per user / month',
    description: 'For teams shipping to production.',
    features: [
      'Unlimited projects',
      'Priority support',
      '100 GB of storage',
      'SSO and audit logs',
      'Staging environments',
    ],
    action: <Button>Start free trial</Button>,
    featured: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organisations with procurement.',
    features: ['Everything in Team', 'Dedicated support', 'Custom contracts', 'On-premise option'],
    action: <Button variant="secondary">Talk to sales</Button>,
  },
];

const FAQS = [
  {
    question: 'Do I need to migrate my existing components?',
    answer:
      'No. The system is scoped to its own root element, so it can sit alongside whatever you already have and take over one screen at a time.',
  },
  {
    question: 'How does theming work?',
    answer:
      'Each system answers a fixed contract of custom properties. Swapping one stylesheet for another re-themes every component, including dark mode.',
  },
  {
    question: 'What happens when I outgrow the defaults?',
    answer:
      'The components are plain React with plain CSS classes. Override a rule, wrap a component, or copy one out — nothing is locked away behind a build step.',
  },
  {
    question: 'Is there a free tier?',
    answer:
      'Yes. The Starter plan is free forever for up to three projects, with no card required and no trial clock.',
  },
];

export function LandingDemo() {
  return (
    <>
      <Nav
        sticky
        brand="Northwind"
        links={[
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Docs', href: '#' },
        ]}
        actions={
          <>
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button size="sm">Get started</Button>
          </>
        }
      />

      <Hero
        eyebrow="v2.0 is out"
        headline="Ship the interface, not the scaffolding"
        subhead="Northwind gives your team a component library, a theme contract and a build that already agree with each other — so the work left is the product."
        actions={
          <>
            <Button size="lg">Start free</Button>
            <Button size="lg" variant="secondary">
              Read the docs
            </Button>
          </>
        }
        note="Free for 14 days. No card required."
      />

      <LogoCloud
        caption="Trusted by teams at"
        logos={[
          <Wordmark label="Vertex" />,
          <Wordmark label="Halcyon" />,
          <Wordmark label="Foundry" />,
          <Wordmark label="Meridian" />,
          <Wordmark label="Ostrom" />,
        ]}
      />

      <MediaShowcase
        title="Built with Northwind"
        subtitle="Every screen below is the same component library under a different theme."
        items={SHOWCASE}
      />

      <FeatureGrid
        id="features"
        eyebrow="Why Northwind"
        title="Everything the boring parts need"
        subtitle="The pieces every product rebuilds from scratch, already built and already consistent."
        features={FEATURES}
        tone="sunken"
      />

      <Testimonials
        title="What teams say"
        tone="default"
        variant="feature"
        testimonials={[
          {
            quote:
              'We replaced four half-finished internal libraries with this in a fortnight. The design review backlog went to zero and stayed there.',
            name: 'Ada Okonjo',
            role: 'Head of Design, Vertex',
          },
        ]}
      />

      <Pricing
        id="pricing"
        eyebrow="Pricing"
        title="Priced per seat, not per surprise"
        subtitle="Every plan includes the full component library. You pay for scale and support."
        plans={PLANS}
        note="Prices exclude VAT. Annual billing saves 20%."
        tone="sunken"
      />

      <FAQ id="faq" title="Questions, answered" items={FAQS} defaultOpen={0} />

      <CTA
        headline="Start with the boring parts done"
        subhead="Create an account and have a themed, accessible page running in under ten minutes."
        actions={
          <Stack direction="row" gap="sm" wrap align="center">
            <Input placeholder="you@company.com" fullWidth={false} aria-label="Work email" />
            <Button>Get started</Button>
          </Stack>
        }
        note="Free for 14 days. No card required."
      />

      <Footer
        brand="Northwind"
        description="A component library, a theme contract, and a build that already agree with each other."
        columns={[
          {
            title: 'Product',
            links: [
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Changelog', href: '#' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About', href: '#' },
              { label: 'Careers', href: '#' },
              { label: 'Contact', href: '#' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { label: 'Docs', href: '#' },
              { label: 'Status', href: '#' },
              { label: 'Privacy', href: '#' },
            ],
          },
        ]}
        copyright="© 2026 Northwind Systems Ltd."
        meta={<span>Made with the design system it documents.</span>}
      />
    </>
  );
}
