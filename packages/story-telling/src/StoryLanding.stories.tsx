import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryLanding } from './StoryLanding';

/**
 * The `story-telling` page type end to end: Arrival, Tension, Route, Control,
 * Capability, Proof, Resolution.
 *
 * The brand and every figure are placeholder content, marked as such on the
 * page itself — `landing-content.md` is still entirely `[TODO]`, and AGENTS.md
 * forbids presenting invented business facts as real.
 */
const meta = {
  title: 'Story landing',
  parameters: { layout: 'fullscreen', theme: 'off' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SevenChapters: Story = {
  render: () => <StoryLanding />,
};
