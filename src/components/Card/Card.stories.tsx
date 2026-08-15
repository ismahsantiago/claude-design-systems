import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';

const meta = {
  title: 'Surfaces/Card',
  component: Card,
  args: {
    title: 'Billing',
    subtitle: 'Manage your plan and payment method',
    padding: 'lg',
    elevation: 'flat',
  },
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    elevation: { control: 'inline-radio', options: ['flat', 'raised'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Card {...args}>
        <Text tone="muted">
          You are on the Team plan, billed annually. The next invoice is issued on 1 October.
        </Text>
      </Card>
    </div>
  ),
};

export const WithActionAndFooter: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Card
        {...args}
        action={<Badge tone="success">Active</Badge>}
        footer={
          <Stack direction="row" gap="sm" justify="end">
            <Button variant="ghost" size="sm">
              Cancel plan
            </Button>
            <Button size="sm">Upgrade</Button>
          </Stack>
        }
      >
        <Text tone="muted">
          You are on the Team plan, billed annually. The next invoice is issued on 1 October.
        </Text>
      </Card>
    </div>
  ),
};

export const Raised: Story = {
  args: { elevation: 'raised' },
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Card {...args}>
        <Text tone="muted">Raised cards float above the page background.</Text>
      </Card>
    </div>
  ),
};

export const BodyOnly: Story = {
  args: { title: undefined, subtitle: undefined },
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Card {...args}>
        <Text>A card with no header is just a padded surface.</Text>
      </Card>
    </div>
  ),
};
