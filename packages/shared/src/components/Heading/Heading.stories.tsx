import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    children: 'Workspace settings',
    level: 2,
  },
  argTypes: {
    level: { control: 'inline-radio', options: [1, 2, 3, 4] },
    size: { control: 'select', options: [undefined, 'sm', 'md', 'lg', 'xl'] },
    tone: { control: 'inline-radio', options: ['default', 'muted'] },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Levels: Story = {
  render: () => (
    <Stack gap="lg">
      <Heading level={1}>Level 1 — page title</Heading>
      <Heading level={2}>Level 2 — section</Heading>
      <Heading level={3}>Level 3 — subsection</Heading>
      <Heading level={4}>Level 4 — minor heading</Heading>
    </Stack>
  ),
};

/** `size` decouples the look from the document outline. */
export const SizeOverride: Story = {
  render: () => (
    <Stack gap="sm">
      <Heading level={3} size="xl">
        An h3 that looks like a page title
      </Heading>
      <Text tone="muted">
        Keep `level` correct for screen readers; reach for `size` when the visual hierarchy differs.
      </Text>
    </Stack>
  ),
};

export const WithBody: Story = {
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 460 }}>
      <Heading level={2}>Members</Heading>
      <Text tone="muted">
        People with access to this workspace. Invites expire after seven days.
      </Text>
    </Stack>
  ),
};
