import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricStrip } from './MetricStrip';

const meta = {
  title: 'Sections/MetricStrip',
  component: MetricStrip,
  args: {
    eyebrow: '05 / Evidence',
    title: 'What the last quarter actually did',
    metrics: [
      { value: '98.4%', label: 'On-time delivery', footnote: 'Sample data — source required' },
      { value: '1,240', label: 'Shipments coordinated', footnote: 'Sample data — source required' },
      { value: '11', label: 'Countries in the network', footnote: 'Sample data — source required' },
    ],
    tone: 'default',
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'sunken', 'accent', 'inverted'] },
  },
} satisfies Meta<typeof MetricStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The footnote is where provenance goes. A metric with no footnote is a claim
 * nobody can check, which is why the demo data says so out loud.
 */
export const Three: Story = {};

export const Four: Story = {
  args: {
    metrics: [
      { value: '98.4%', label: 'On-time delivery', footnote: 'Sample data — source required' },
      { value: '1,240', label: 'Shipments coordinated', footnote: 'Sample data — source required' },
      { value: '11', label: 'Countries', footnote: 'Sample data — source required' },
      { value: '4.2h', label: 'Median response', footnote: 'Sample data — source required' },
    ],
  },
};

export const WithoutHeader: Story = {
  args: { eyebrow: undefined, title: undefined },
};

export const OnInverted: Story = {
  args: { tone: 'inverted' },
};
