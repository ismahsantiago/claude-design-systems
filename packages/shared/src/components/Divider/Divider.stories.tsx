import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';

const meta = {
  title: 'Layout/Divider',
  component: Divider,
  args: {
    orientation: 'horizontal',
    spacing: 'md',
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    spacing: {
      control: 'select',
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Text>Above the rule</Text>
      <Divider {...args} />
      <Text>Below the rule</Text>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical', spacing: 'sm' },
  render: (args) => (
    <Stack direction="row" gap="none" align="center">
      <Text size="sm" tone="muted">
        Draft
      </Text>
      <Divider {...args} />
      <Text size="sm" tone="muted">
        Edited 2h ago
      </Text>
      <Divider {...args} />
      <Text size="sm" tone="muted">
        3 comments
      </Text>
    </Stack>
  ),
};
