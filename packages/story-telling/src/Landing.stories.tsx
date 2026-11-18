import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  CTASection,
  FeatureGrid,
  Footer,
  Hero,
  LogoCloud,
  MediaShowcase,
  Nav,
  Section,
  Stack,
  Testimonials,
  ThemeProvider,
} from '@ds/shared';
import './index';

function RoutePlate({ label, tone = 'accent' }: { label: string; tone?: 'accent' | 'warm' }) {
  return (
    <div
      style={{
        display: 'grid',
        minHeight: 320,
        placeItems: 'center',
        background: `var(--ds-gradient-${tone})`,
        color: 'var(--ds-color-text-on-accent)',
        fontFamily: 'var(--ds-font-mono)',
        fontSize: 12,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
  );
}

/** A visual fixture for the proposal: arrival, tension, route, proof, resolve. */
function StoryTellingLanding() {
  return (
    <>
      <Nav
        sticky
        brand="Northline"
        links={[{ label: 'The route', href: '#route' }, { label: 'Proof', href: '#proof' }]}
        actions={<Button size="sm">Plan a shipment</Button>}
      />

      <Hero
        height="screen"
        eyebrow="01 / Arrival"
        headline={<>Make every handoff visible.</>}
        subhead="Northline coordinates the hard miles between origin and outcome, so your team can move with a clear view of the route."
        actions={<Button size="lg">See the route <span aria-hidden="true">↗</span></Button>}
        note="One operating view. Fewer surprises."
        background={<RoutePlate label="Origin / 00:00" tone="warm" />}
      />

      <Section tone="default" spacing="loose">
        <Stack gap="xl">
          <span className="ds-eyebrow">02 / Tension</span>
          <h2 className="ds-hero__headline">The route gets expensive when nobody owns the handoff.</h2>
          <p style={{ maxWidth: '34rem' }}>
            Fragmented updates, unclear exceptions, and work that disappears between systems make
            a simple move feel impossible to manage.
          </p>
        </Stack>
      </Section>

      <FeatureGrid
        id="route"
        tone="accent"
        eyebrow="03 / The route"
        title="One route. Three accountable moments."
        subtitle="Use the sequence as a narrative spine. Replace every label and outcome with the verified data in landing-content.md."
        features={[
          { title: 'Origin', description: 'Confirm the load, the owner, and the first next action.' },
          { title: 'Handoff', description: 'Keep the exception visible before it becomes a delay.' },
          { title: 'Outcome', description: 'Close the loop with proof the receiver can use.' },
        ]}
      />

      <MediaShowcase
        eyebrow="04 / Capability"
        title="The operating picture, chapter by chapter."
        items={[
          { media: <RoutePlate label="01 / Coordinate" />, title: 'Coordinate', meta: 'Every owner in view' },
          { media: <RoutePlate label="02 / Recover" tone="warm" />, title: 'Recover', meta: 'Exceptions with a next move' },
          { media: <RoutePlate label="03 / Prove" />, title: 'Prove', meta: 'A record of the outcome' },
        ]}
        ratio="portrait"
      />

      <Testimonials
        id="proof"
        tone="sunken"
        variant="feature"
        title="05 / Evidence"
        testimonials={[{
          quote: 'Replace this sentence with a verified customer outcome from landing-content.md.',
          name: 'Customer name',
          role: 'Role, organisation',
        }]}
      />

      <LogoCloud
        caption="Proof points belong here when they are verified"
        logos={[<span key="one">Metric / source</span>, <span key="two">Logo / permission</span>, <span key="three">Result / date</span>]}
      />

      <CTASection
        tone="inverted"
        align="split"
        headline="06 / Move with a clearer route."
        subhead="Replace this invitation with the real offer, audience, and destination URL from the content brief."
        actions={<Button size="lg">Talk to an operator <span aria-hidden="true">↗</span></Button>}
      />

      <Footer
        brand="Northline"
        description="A story-telling landing fixture for the Story-Telling design system."
        columns={[{ title: 'Explore', links: [{ label: 'The route', href: '#route' }, { label: 'Proof', href: '#proof' }] }]}
        copyright="© 2026 Northline"
      />
    </>
  );
}

const meta = {
  title: 'Landing page',
  parameters: { layout: 'fullscreen', theme: 'off' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  render: () => (
    <ThemeProvider theme="light" fullBleed>
      <StoryTellingLanding />
    </ThemeProvider>
  ),
};

export const Dark: Story = {
  render: () => (
    <ThemeProvider theme="dark" fullBleed>
      <StoryTellingLanding />
    </ThemeProvider>
  ),
};
