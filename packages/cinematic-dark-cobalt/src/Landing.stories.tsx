import type { Meta, StoryObj } from '@storybook/react-vite';
import { LandingDemo } from '@ds/shared/demo';
import { ThemeProvider } from '@ds/shared';
import './index';

/**
 * The reference landing page, rendered with Cinematic Dark Cobalt. Compare it against
 * cinematic-dark — every difference you see is this variant's token overrides.
 */
const meta = {
  title: 'Landing page',
  parameters: { layout: 'fullscreen', theme: 'off' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ThemeProvider theme="dark" fullBleed>
      <LandingDemo />
    </ThemeProvider>
  ),
};
