import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Display/Badge',
  component: Badge,
  args: {
    children: 'Active',
    tone: 'neutral',
    variant: 'subtle',
    size: 'md',
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['neutral', 'accent', 'success', 'warning', 'danger'],
    },
    variant: { control: 'inline-radio', options: ['subtle', 'solid', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: (args) => (
    <Stack direction="row" gap="sm" wrap align="center">
      <Badge {...args} tone="neutral">
        Draft
      </Badge>
      <Badge {...args} tone="accent">
        Beta
      </Badge>
      <Badge {...args} tone="success">
        Live
      </Badge>
      <Badge {...args} tone="warning">
        Degraded
      </Badge>
      <Badge {...args} tone="danger">
        Failed
      </Badge>
    </Stack>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <Stack gap="md">
      <Stack direction="row" gap="sm" wrap align="center">
        <Badge {...args} variant="subtle" tone="accent">
          Subtle
        </Badge>
        <Badge {...args} variant="solid" tone="accent">
          Solid
        </Badge>
        <Badge {...args} variant="outline" tone="accent">
          Outline
        </Badge>
      </Stack>
      <Stack direction="row" gap="sm" wrap align="center">
        <Badge {...args} variant="subtle" tone="success">
          Subtle
        </Badge>
        <Badge {...args} variant="solid" tone="success">
          Solid
        </Badge>
        <Badge {...args} variant="outline" tone="success">
          Outline
        </Badge>
      </Stack>
    </Stack>
  ),
};

export const WithDot: Story = {
  render: (args) => (
    <Stack direction="row" gap="sm" align="center">
      <Badge {...args} dot tone="success">
        Operational
      </Badge>
      <Badge {...args} dot tone="warning">
        Degraded
      </Badge>
      <Badge {...args} dot tone="danger">
        Outage
      </Badge>
    </Stack>
  ),
};
