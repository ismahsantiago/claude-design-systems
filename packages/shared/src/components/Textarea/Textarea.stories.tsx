import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';
import { Field } from '../Field/Field';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  args: {
    placeholder: 'Tell us what happened…',
    rows: 4,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Textarea {...args} />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack gap="md" style={{ maxWidth: 420 }}>
      <Textarea {...args} defaultValue="The export finished but the CSV was empty." />
      <Textarea {...args} invalid defaultValue="Too short" />
      <Textarea {...args} disabled defaultValue="Disabled" />
    </Stack>
  ),
};

export const InAField: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Field label="What went wrong?" hint="Include steps to reproduce if you can." required>
        <Textarea {...args} />
      </Field>
    </div>
  ),
};
