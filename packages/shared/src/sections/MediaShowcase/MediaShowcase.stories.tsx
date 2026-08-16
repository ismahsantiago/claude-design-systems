import type { Meta, StoryObj } from '@storybook/react-vite';
import { MediaShowcase } from './MediaShowcase';

/** Stand-in media painted from the system's own tokens — no network assets. */
function Plate({ gradient }: { gradient: 'accent' | 'warm' }) {
  return (
    <div style={{ width: '100%', height: '100%', background: `var(--ds-gradient-${gradient})` }} />
  );
}

const ITEMS = [
  { media: <Plate gradient="accent" />, title: 'Onboarding flow', meta: '12 screens · 2026-04' },
  { media: <Plate gradient="warm" />, title: 'Billing redesign', meta: '8 screens · 2026-05' },
  { media: <Plate gradient="accent" />, title: 'Mobile companion', meta: '21 screens · 2026-06' },
];

const meta = {
  title: 'Sections/MediaShowcase',
  component: MediaShowcase,
  args: {
    title: 'Built with Northwind',
    subtitle: 'Every screen below is the same component library under a different theme.',
    items: ITEMS,
    columns: 3,
    ratio: 'video',
    tone: 'default',
  },
  argTypes: {
    columns: { control: 'inline-radio', options: [2, 3, 4] },
    ratio: { control: 'inline-radio', options: ['video', 'square', 'portrait'] },
  },
} satisfies Meta<typeof MediaShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Portrait: Story = {
  args: { ratio: 'portrait', columns: 4, items: [...ITEMS, ITEMS[0]!] },
};

export const Square: Story = {
  args: { ratio: 'square', columns: 2, items: ITEMS.slice(0, 2) },
};

/**
 * Tiles can be links, and hover playback is opt-in per item via `videoSrc`.
 * Playback starts muted and is skipped entirely under reduced motion.
 */
export const LinkedTiles: Story = {
  args: {
    items: ITEMS.map((item) => ({ ...item, href: '#' })),
    title: 'Case studies',
    subtitle: undefined,
  },
};
