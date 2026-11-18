import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoCloud } from './LogoCloud';

/** Wordmarks stand in for customer logos so the story pulls no network assets. */
function Wordmark({ label }: { label: string }) {
  return <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>{label}</span>;
}

const LOGOS = [
  <Wordmark label="Vertex" />,
  <Wordmark label="Halcyon" />,
  <Wordmark label="Foundry" />,
  <Wordmark label="Meridian" />,
  <Wordmark label="Ostrom" />,
];

const meta = {
  title: 'Sections/LogoCloud',
  component: LogoCloud,
  args: {
    caption: 'Trusted by teams at',
    logos: LOGOS,
    tone: 'default',
  },
} satisfies Meta<typeof LogoCloud>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Logos arrive in their own brand colours, which would fight both each other and
 * the page. Flattening them to the muted text colour is what makes the row read
 * as one quiet band of proof.
 */
export const Default: Story = {};

export const WithoutCaption: Story = {
  args: { caption: undefined },
};

export const OnSunken: Story = {
  args: { tone: 'sunken' },
};
