import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryChapter } from './StoryChapter';
import { Button } from '../../components/Button/Button';

/** Stand-in visual painted from the system's own tokens — no network assets. */
function Plate({ ratio = '4 / 3' }: { ratio?: string }) {
  return (
    <div
      style={{
        aspectRatio: ratio,
        width: '100%',
        background: 'var(--ds-gradient-accent)',
      }}
    />
  );
}

const meta = {
  title: 'Sections/StoryChapter',
  component: StoryChapter,
  args: {
    index: '04',
    eyebrow: 'Control',
    title: 'You should not have to ask where it is',
    children: (
      <>
        <p>
          Most delays are not transport failures. They are silence — a handoff nobody logged, a
          delay nobody passed on, an exception that surfaced two days late.
        </p>
        <p>Every movement writes to the same record, and the record is the one you can see.</p>
      </>
    ),
    media: <Plate />,
    mediaSide: 'end',
    sticky: false,
    tone: 'default',
  },
  argTypes: {
    mediaSide: { control: 'inline-radio', options: ['start', 'end'] },
    tone: { control: 'inline-radio', options: ['default', 'sunken', 'accent', 'inverted'] },
  },
} satisfies Meta<typeof StoryChapter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MediaEnd: Story = {};

/** Alternate `mediaSide` between chapters — that alternation is the page's rhythm. */
export const MediaStart: Story = {
  args: { mediaSide: 'start', index: '05' },
};

export const WithAction: Story = {
  args: { action: <Button>See the route</Button> },
};

/**
 * Pinned copy while the visual scrolls past. Automatically disabled on short or
 * narrow viewports, where a sticky column taller than the screen traps the
 * reader.
 */
export const Sticky: Story = {
  args: { sticky: true, media: <Plate ratio="3 / 5" /> },
};

export const OnInverted: Story = {
  args: { tone: 'inverted' },
};
