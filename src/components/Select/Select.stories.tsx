import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import { Field } from '../Field/Field';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Forms/Select',
  component: Select,
  args: {
    placeholder: 'Choose a region',
    defaultValue: '',
    size: 'md',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const regions = (
  <>
    <option value="us-east">US East</option>
    <option value="us-west">US West</option>
    <option value="eu-central">EU Central</option>
    <option value="ap-south">AP South</option>
  </>
);

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <Select {...args}>{regions}</Select>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack gap="md" style={{ maxWidth: 320 }}>
      <Select {...args} size="sm">
        {regions}
      </Select>
      <Select {...args} size="md">
        {regions}
      </Select>
      <Select {...args} size="lg">
        {regions}
      </Select>
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack gap="md" style={{ maxWidth: 320 }}>
      <Select {...args} defaultValue="eu-central">
        {regions}
      </Select>
      <Select {...args} invalid>
        {regions}
      </Select>
      <Select {...args} disabled defaultValue="us-east">
        {regions}
      </Select>
    </Stack>
  ),
};

export const InAField: Story = {
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <Field label="Deployment region" hint="Data never leaves the selected region." required>
        <Select {...args}>{regions}</Select>
      </Field>
    </div>
  ),
};
