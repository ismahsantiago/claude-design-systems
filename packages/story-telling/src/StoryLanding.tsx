/**
 * A `story-telling` landing page: one scroll, seven chapters.
 *
 * Chapter order is Arrival → Tension → Route → Control → Capability → Proof →
 * Resolution, and each band has exactly one focal point. The page is composed
 * entirely from `@ds/story-telling`, so its type, colour, rhythm and rules come
 * from the system rather than from anything written here.
 *
 * CONTENT STATUS — read before reusing this file.
 * `landing-content.md` in this package is the source of truth for a real
 * landing page and is still entirely `[TODO]`. So the brand below, "NORTHBOUND
 * FREIGHT", is invented, and every figure in the proof chapter carries a
 * footnote saying it is sample data. `AGENTS.md` forbids fabricating business
 * facts; marking them is how this page stays a design demonstration rather
 * than a claim. Replace both before anything ships.
 */
import {
  Button,
  CTASection,
  Footer,
  Hero,
  MetricStrip,
  Nav,
  Section,
  Stack,
  StoryChapter,
  StorySteps,
  Testimonials,
  Text,
  ThemeProvider,
} from '@ds/shared';
import { BrokenSchedule, ContainerStack, Manifest, RouteField } from './art';
import './index';

const NAV_LINKS = [
  { label: 'The route', href: '#route' },
  { label: 'Control', href: '#control' },
  { label: 'Network', href: '#capability' },
  { label: 'Evidence', href: '#proof' },
];

const STEPS = [
  {
    label: 'Intake',
    owner: 'Operator',
    description:
      'One person takes the brief, the constraints and the deadline. They keep it until it is delivered.',
    outcome: 'A route agreed before anything moves.',
  },
  {
    label: 'Handoff',
    owner: 'Operator + carrier',
    description:
      'Every transfer is signed against a name rather than a queue. Nothing changes hands quietly.',
    outcome: 'No gap where accountability disappears.',
  },
  {
    label: 'Transit',
    owner: 'Network',
    description:
      'Position, dwell and exceptions write to one record while the freight is still moving.',
    outcome: 'You hear it from us first.',
  },
  {
    label: 'Arrival',
    owner: 'Operator',
    description:
      'Condition, timing and cost close out against the brief that started it.',
    outcome: 'One record, origin to outcome.',
  },
];

/** Sample figures. Every one is marked — see the note at the top of this file. */
const METRICS = [
  { value: '98.4%', label: 'Arrived inside the agreed window', footnote: 'Sample data — source required' },
  { value: '1 of 1', label: 'Operators per shipment, start to finish', footnote: 'Sample data — source required' },
  { value: '4.2h', label: 'Median time to answer an exception', footnote: 'Sample data — source required' },
  { value: '11', label: 'Countries in the current network', footnote: 'Sample data — source required' },
];

export function StoryLanding() {
  return (
    <ThemeProvider theme="light" fullBleed>
      <Nav
        sticky
        brand="NORTHBOUND"
        links={NAV_LINKS}
        actions={<Button size="sm">Plan a shipment</Button>}
      />

      {/* 01 — ARRIVAL */}
      <Hero
        id="arrival"
        height="screen"
        eyebrow="01 / Arrival"
        headline={<>One operator.<br />Every handoff.</>}
        subhead="Freight moves through a lot of hands. We make sure exactly one of them is answerable to you, from the first pickup to the signature at the door."
        actions={
          <>
            <Button size="lg">Plan a shipment</Button>
            <Button size="lg" variant="secondary">
              See the route
            </Button>
          </>
        }
        note="No account needed to get a route and a price."
        background={<RouteField />}
      />

      {/* 02 — TENSION */}
      <StoryChapter
        id="tension"
        index="02"
        eyebrow="Tension"
        title="Most delays are not transport failures"
        mediaSide="start"
        tone="sunken"
        media={<BrokenSchedule />}
      >
        <p>
          They are silence. A handoff nobody logged. A hold nobody passed on. An exception that
          surfaced two days after it mattered, in an inbox, from someone who had already stopped
          being responsible for it.
        </p>
        <p>
          By the time a shipment is genuinely late, the information was late first — usually by a
          margin that would have been enough to fix it.
        </p>
      </StoryChapter>

      {/* 03 — ROUTE */}
      <StorySteps
        id="route"
        eyebrow="03 / The route"
        title="Four steps. The same name on all of them."
        subtitle="This is the whole operating model. There is no fifth step where it becomes somebody else's problem."
        steps={STEPS}
      />

      {/* 04 — CONTROL */}
      <StoryChapter
        id="control"
        index="04"
        eyebrow="Control"
        title="You should not have to ask where it is"
        sticky
        media={<Manifest />}
        action={<Button variant="secondary">See a live manifest</Button>}
      >
        <p>
          Every movement writes to one manifest, and the manifest is the one you can see. Signed
          legs, pending legs, and the name of whoever owns the next one.
        </p>
        <p>
          When something slips, the exception reaches you before it reaches your customer. That
          ordering is the entire product.
        </p>
      </StoryChapter>

      {/* 05 — CAPABILITY */}
      <StoryChapter
        id="capability"
        index="05"
        eyebrow="Capability"
        title="A network you can point at"
        mediaSide="start"
        tone="sunken"
        media={<ContainerStack />}
      >
        <p>
          Road, sea and bonded storage across eleven countries, run as one route rather than three
          contracts stitched together at your end.
        </p>
        <p>
          Where we do not own the leg, we own the handoff into it — which is the part that
          historically goes wrong.
        </p>
      </StoryChapter>

      {/* 06 — PROOF */}
      <MetricStrip
        id="proof"
        eyebrow="06 / Evidence"
        title="What the operation actually did"
        subtitle="Figures below are sample data for this demonstration. Replace them with verified numbers and their sources before publishing."
        metrics={METRICS}
      />

      <Testimonials
        variant="feature"
        tone="default"
        testimonials={[
          {
            quote:
              'We stopped keeping our own spreadsheet of where things were. That is the clearest way I can describe the difference.',
            name: 'Placeholder attribution',
            role: 'Sample quote — source required',
          },
        ]}
      />

      {/* 07 — RESOLUTION */}
      <CTASection
        id="resolution"
        tone="inverted"
        align="split"
        headline={<>From origin<br />to outcome.</>}
        subhead="Send us a lane and a deadline. We will come back with a route, a price and the name of the operator who will own it."
        actions={<Button size="lg">Plan a shipment</Button>}
        note="Typically answered the same working day."
      />

      <Section tone="default" spacing="tight">
        <Stack gap="sm">
          <Text size="xs" mono tone="muted">
            DEMONSTRATION PAGE
          </Text>
          <Text size="sm" tone="muted">
            NORTHBOUND FREIGHT is an invented brand used to show the STORY-TELLING design system.
            Every figure and quotation on this page is placeholder content, marked as such, and is
            not a claim about any real operation.
          </Text>
        </Stack>
      </Section>

      <Footer
        brand="NORTHBOUND"
        description="One operator. Every handoff. From origin to outcome."
        columns={[
          {
            title: 'Operations',
            links: [
              { label: 'The route', href: '#route' },
              { label: 'Control', href: '#control' },
              { label: 'Network', href: '#capability' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'Evidence', href: '#proof' },
              { label: 'Contact', href: '#resolution' },
            ],
          },
        ]}
        copyright="© 2026 Northbound Freight — demonstration content"
        meta={<span>Built with the STORY-TELLING design system.</span>}
      />
    </ThemeProvider>
  );
}
