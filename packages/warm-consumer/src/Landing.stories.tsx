import type { Meta, StoryObj } from '@storybook/react-vite';
import { LandingDemo } from '@ds/shared/demo';
import { ThemeProvider } from '@ds/shared';
import './index';

/**
 * The reference landing page. Same copy and same structure in every system —
 * everything that differs between them is the tokens doing their job.
 */
const meta = {
  title: 'Landing page',
  parameters: { layout: 'fullscreen', theme: 'off' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  render: () => (
    <ThemeProvider theme="light" fullBleed>
      <LandingDemo />
    </ThemeProvider>
  ),
};

export const Dark: Story = {
  render: () => (
    <ThemeProvider theme="dark" fullBleed>
      <LandingDemo />
    </ThemeProvider>
  ),
};
