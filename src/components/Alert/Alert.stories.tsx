import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  args: {
    tone: 'info',
    title: 'Heads up',
    children: 'Your trial ends in three days.',
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Alert {...args} />
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <Stack gap="md" style={{ maxWidth: 480 }}>
      <Alert {...args} tone="info" title="Heads up">
        Your trial ends in three days.
      </Alert>
      <Alert {...args} tone="success" title="Deployment complete">
        Version 2.4.0 is live in production.
      </Alert>
      <Alert {...args} tone="warning" title="Approaching your quota">
        You have used 92% of this month's API calls.
      </Alert>
      <Alert {...args} tone="danger" title="Payment failed">
        We could not charge the card ending 4242.
      </Alert>
    </Stack>
  ),
};

export const Dismissible: Story = {
  args: { onDismiss: () => {} },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Alert {...args} />
    </div>
  ),
};

export const BodyOnly: Story = {
  args: { title: undefined },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Alert {...args}>Settings saved.</Alert>
    </div>
  ),
};
