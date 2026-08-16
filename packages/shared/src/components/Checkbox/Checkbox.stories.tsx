import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  args: {
    label: 'Email me about product updates',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    label: 'Enable audit logging',
    description: 'Records every write to your workspace. Adds ~2% latency.',
  },
};

export const States: Story = {
  render: (args) => (
    <Stack gap="md">
      <Checkbox {...args} label="Unchecked" />
      <Checkbox {...args} label="Checked" defaultChecked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
      <Checkbox {...args} label="Disabled" disabled />
      <Checkbox {...args} label="Disabled + checked" disabled defaultChecked />
      <Checkbox {...args} label="Invalid" invalid />
    </Stack>
  ),
};

export const Group: Story = {
  render: () => (
    <Stack gap="sm">
      <Checkbox name="scope" value="read" label="Read" defaultChecked />
      <Checkbox name="scope" value="write" label="Write" defaultChecked />
      <Checkbox name="scope" value="admin" label="Admin" />
    </Stack>
  ),
};
