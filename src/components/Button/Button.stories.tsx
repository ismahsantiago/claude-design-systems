import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Actions/Button',
  component: Button,
  args: {
    children: 'Save changes',
    variant: 'primary',
    size: 'md',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" gap="md" align="center" wrap>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="danger">
        Delete
      </Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap="md" align="center">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Stack direction="row" gap="md" align="center">
      <Button {...args} iconStart={<PlusIcon />}>
        New project
      </Button>
      <Button {...args} variant="secondary" iconEnd={<ArrowIcon />}>
        Continue
      </Button>
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack direction="row" gap="md" align="center">
      <Button {...args}>Default</Button>
      <Button {...args} loading>
        Saving
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
    </Stack>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <Button {...args} />
    </div>
  ),
};

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14">
      <path
        d="M8 3.5v9M3.5 8h9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14">
      <path
        d="M3.5 8h9M9 4.5L12.5 8 9 11.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
