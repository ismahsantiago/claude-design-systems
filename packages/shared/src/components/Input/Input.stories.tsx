import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { Field } from '../Field/Field';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Forms/Input',
  component: Input,
  args: {
    placeholder: 'jane@example.com',
    size: 'md',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <Input {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack gap="md" style={{ maxWidth: 320 }}>
      <Input {...args} size="sm" placeholder="Small" />
      <Input {...args} size="md" placeholder="Medium" />
      <Input {...args} size="lg" placeholder="Large" />
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack gap="md" style={{ maxWidth: 320 }}>
      <Input {...args} defaultValue="Filled in" />
      <Input {...args} invalid defaultValue="not-an-email" />
      <Input {...args} disabled defaultValue="Disabled" />
      <Input {...args} readOnly defaultValue="Read only" />
    </Stack>
  ),
};

export const InAField: Story = {
  render: (args) => (
    <Stack gap="lg" style={{ maxWidth: 320 }}>
      <Field label="Work email" hint="We only use this for billing receipts." required>
        <Input {...args} />
      </Field>
      <Field label="Work email" error="Enter a valid email address.">
        <Input {...args} defaultValue="not-an-email" />
      </Field>
    </Stack>
  ),
};
