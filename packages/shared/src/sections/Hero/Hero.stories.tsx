import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';
import { Button } from '../../components/Button/Button';

const meta = {
  title: 'Sections/Hero',
  component: Hero,
  args: {
    headline: 'Ship the interface, not the scaffolding',
    subhead:
      'A component library, a theme contract and a build that already agree with each other — so the work left is the product.',
    note: 'Free for 14 days. No card required.',
    layout: 'center',
    height: 'auto',
    tone: 'default',
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['center', 'split'] },
    height: { control: 'inline-radio', options: ['auto', 'screen'] },
    tone: { control: 'inline-radio', options: ['default', 'sunken', 'accent', 'inverted'] },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

const actions = (
  <>
    <Button size="lg">Start free</Button>
    <Button size="lg" variant="secondary">
      Read the docs
    </Button>
  </>
);

/** Placeholder media painted from the system's own gradient — no network assets. */
function Plate({ ratio = '16 / 9' }: { ratio?: string }) {
  return (
    <div style={{ aspectRatio: ratio, width: '100%', background: 'var(--ds-gradient-accent)' }} />
  );
}

export const Centered: Story = {
  args: { actions, eyebrow: 'v2.0 is out' },
};

/** Copy and media side by side. Collapses to one column below 860px. */
export const Split: Story = {
  args: { actions, layout: 'split', media: <Plate /> },
};

export const WithMediaBelow: Story = {
  args: { actions, media: <Plate /> },
};

/**
 * The media-first hero: fills the viewport with a full-bleed background layer
 * behind the copy. The layer takes no pointer events, so the actions stay
 * clickable over a video or gradient.
 */
export const FullScreenWithBackground: Story = {
  args: {
    actions,
    height: 'screen',
    background: (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--ds-gradient-accent)',
          opacity: 0.35,
        }}
      />
    ),
  },
};

export const Minimal: Story = {
  args: { subhead: undefined, note: undefined, actions: <Button size="lg">Get started</Button> },
};
