import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    direction: 'column',
    gap: 'md',
  },
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column'] },
    gap: {
      control: 'select',
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    align: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'between', 'around'],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

function Box({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        padding: 'var(--ds-space-md)',
        background: 'var(--ds-color-accent-subtle)',
        color: 'var(--ds-color-accent-text)',
        borderRadius: 'var(--ds-radius-md)',
        fontSize: 'var(--ds-text-sm)',
      }}
    >
      {children}
    </div>
  );
}

export const Column: Story = {
  render: (args) => (
    <Stack {...args}>
      <Box>First</Box>
      <Box>Second</Box>
      <Box>Third</Box>
    </Stack>
  ),
};

export const Row: Story = {
  args: { direction: 'row' },
  render: (args) => (
    <Stack {...args}>
      <Box>First</Box>
      <Box>Second</Box>
      <Box>Third</Box>
    </Stack>
  ),
};

export const GapScale: Story = {
  render: () => (
    <Stack gap="xl">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <Stack key={gap} gap="xs">
          <Text size="xs" tone="muted" mono>
            gap="{gap}"
          </Text>
          <Stack direction="row" gap={gap}>
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
};

export const SpaceBetween: Story = {
  args: { direction: 'row', justify: 'between', align: 'center', fullWidth: true },
  render: (args) => (
    <Card title="Team plan" padding="lg">
      <Stack {...args}>
        <Text tone="muted">3 of 10 seats used</Text>
        <Box>Manage</Box>
      </Stack>
    </Card>
  ),
};
