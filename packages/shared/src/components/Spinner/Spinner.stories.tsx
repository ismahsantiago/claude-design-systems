import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  args: { size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap="lg" align="center">
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </Stack>
  ),
};

/** The spinner inherits `currentColor`, so it takes on its container's tone. */
export const InheritsColor: Story = {
  render: (args) => (
    <Stack direction="row" gap="lg" align="center">
      <span style={{ color: 'var(--ds-color-accent)' }}>
        <Spinner {...args} />
      </span>
      <span style={{ color: 'var(--ds-color-danger)' }}>
        <Spinner {...args} />
      </span>
      <span style={{ color: 'var(--ds-color-text-muted)' }}>
        <Spinner {...args} />
      </span>
    </Stack>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <Stack direction="row" gap="sm" align="center">
      <Spinner {...args} size="sm" label={null} />
      <Text tone="muted" size="sm">
        Loading members…
      </Text>
    </Stack>
  ),
};
