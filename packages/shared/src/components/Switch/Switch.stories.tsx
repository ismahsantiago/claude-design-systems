import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  args: {
    label: 'Public workspace',
    size: 'md',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultChecked: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Public workspace',
    description: 'Anyone with the link can view. Editing still requires an invite.',
    defaultChecked: true,
  },
};

export const States: Story = {
  render: (args) => (
    <Stack gap="md">
      <Switch {...args} label="Off" />
      <Switch {...args} label="On" defaultChecked />
      <Switch {...args} label="Disabled" disabled />
      <Switch {...args} label="Disabled + on" disabled defaultChecked />
      <Switch {...args} label="Small" size="sm" defaultChecked />
    </Stack>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [on, setOn] = useState(false);
    return (
      <Switch
        {...args}
        label={on ? 'Notifications on' : 'Notifications off'}
        checked={on}
        onCheckedChange={setOn}
      />
    );
  },
};
