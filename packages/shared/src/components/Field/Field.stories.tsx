import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from './Field';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Textarea } from '../Textarea/Textarea';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Forms/Field',
  component: Field,
  args: {
    label: 'Workspace name',
    hint: 'Shown to everyone you invite.',
    // `children` is required on Field; the stories below replace it via `render`.
    children: <Input placeholder="Acme Inc." />,
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHint: Story = {
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <Field {...args}>
        <Input placeholder="Acme Inc." />
      </Field>
    </div>
  ),
};

export const Required: Story = {
  args: { required: true },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <Field {...args}>
        <Input placeholder="Acme Inc." />
      </Field>
    </div>
  ),
};

/** An `error` replaces the hint and flips the control into its invalid state. */
export const WithError: Story = {
  args: { error: 'That name is already taken.' },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <Field {...args}>
        <Input defaultValue="Acme Inc." />
      </Field>
    </div>
  ),
};

export const AcrossControls: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 380 }}>
      <Field label="Workspace name" required>
        <Input placeholder="Acme Inc." />
      </Field>
      <Field label="Region" hint="Data never leaves the selected region.">
        <Select placeholder="Choose a region" defaultValue="">
          <option value="us-east">US East</option>
          <option value="eu-central">EU Central</option>
        </Select>
      </Field>
      <Field label="Description" error="Keep this under 200 characters.">
        <Textarea rows={3} defaultValue="A very long description…" />
      </Field>
    </Stack>
  ),
};
