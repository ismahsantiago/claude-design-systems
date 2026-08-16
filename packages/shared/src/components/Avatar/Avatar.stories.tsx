import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Display/Avatar',
  component: Avatar,
  args: {
    name: 'Ada Lovelace',
    size: 'md',
    shape: 'circle',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** With no `src`, the name is reduced to initials. */
export const Initials: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap="md" align="center">
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </Stack>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <Stack direction="row" gap="md" align="center">
      <Avatar {...args} shape="circle" />
      <Avatar {...args} shape="square" />
    </Stack>
  ),
};

export const Group: Story = {
  render: (args) => (
    <Stack direction="row" gap="sm" align="center">
      <Avatar {...args} name="Ada Lovelace" />
      <Avatar {...args} name="Grace Hopper" />
      <Avatar {...args} name="Alan Turing" />
      <Avatar {...args} name="Katherine Johnson" />
    </Stack>
  ),
};

/** A broken image URL falls back to initials rather than a broken-image icon. */
export const BrokenImageFallback: Story = {
  args: { src: 'https://example.invalid/missing.png' },
};
