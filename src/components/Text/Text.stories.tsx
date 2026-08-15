import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: 'Every design decision in this system resolves to a token.',
    size: 'md',
    weight: 'regular',
    tone: 'default',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    weight: { control: 'inline-radio', options: ['regular', 'medium', 'semibold', 'bold'] },
    tone: {
      control: 'select',
      options: ['default', 'muted', 'accent', 'success', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Stack gap="sm">
      <Text {...args} size="lg">
        Large — intros and lead paragraphs
      </Text>
      <Text {...args} size="md">
        Medium — the default body size
      </Text>
      <Text {...args} size="sm">
        Small — secondary detail
      </Text>
      <Text {...args} size="xs">
        Extra small — captions and metadata
      </Text>
    </Stack>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <Stack gap="sm">
      <Text {...args} tone="default">
        Default — primary reading color
      </Text>
      <Text {...args} tone="muted">
        Muted — supporting text
      </Text>
      <Text {...args} tone="accent">
        Accent — links and emphasis
      </Text>
      <Text {...args} tone="success">
        Success — confirmation
      </Text>
      <Text {...args} tone="warning">
        Warning — needs attention
      </Text>
      <Text {...args} tone="danger">
        Danger — errors
      </Text>
    </Stack>
  ),
};

export const Weights: Story = {
  render: (args) => (
    <Stack gap="sm">
      <Text {...args} weight="regular">
        Regular
      </Text>
      <Text {...args} weight="medium">
        Medium
      </Text>
      <Text {...args} weight="semibold">
        Semibold
      </Text>
      <Text {...args} weight="bold">
        Bold
      </Text>
    </Stack>
  ),
};

export const Monospace: Story = {
  args: { mono: true, size: 'sm', children: 'GET /v1/workspaces/8f2c/members' },
};

export const Truncated: Story = {
  args: { truncate: true },
  render: (args) => (
    <div style={{ maxWidth: 260 }}>
      <Text {...args}>
        A single line that runs past the width of its container and gets an ellipsis.
      </Text>
    </div>
  ),
};
