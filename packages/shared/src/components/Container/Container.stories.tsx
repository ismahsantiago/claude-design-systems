import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Heading } from '../Heading/Heading';

const meta = {
  title: 'Layout/Container',
  component: Container,
  args: { width: 'page' },
  argTypes: {
    width: { control: 'inline-radio', options: ['page', 'prose', 'full'] },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

function Filled({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: 'var(--ds-space-lg)',
        background: 'var(--ds-color-accent-subtle)',
        color: 'var(--ds-color-accent-text)',
        borderRadius: 'var(--ds-radius-md)',
        textAlign: 'center',
        fontSize: 'var(--ds-text-sm)',
      }}
    >
      {label}
    </div>
  );
}

/** `page` is the system's own `--ds-container-width`, with the page gutter. */
export const Page: Story = {
  render: (args) => (
    <Container {...args}>
      <Filled label="width=page — the standard measure for section content" />
    </Container>
  ),
};

/** `prose` is narrower, for anything meant to be read in long lines. */
export const Prose: Story = {
  args: { width: 'prose' },
  render: (args) => (
    <Container {...args}>
      <Stack gap="sm">
        <Heading level={2}>Reading measure</Heading>
        <Text tone="muted">
          Long-form copy set at the page width runs to uncomfortable line lengths. `prose` caps
          it at a measure that stays readable regardless of how wide the system's page is.
        </Text>
      </Stack>
    </Container>
  ),
};

export const Widths: Story = {
  render: () => (
    <Stack gap="md">
      <Container width="full">
        <Filled label="full — edge to edge, gutter only" />
      </Container>
      <Container width="page">
        <Filled label="page — var(--ds-container-width)" />
      </Container>
      <Container width="prose">
        <Filled label="prose — reading measure" />
      </Container>
    </Stack>
  ),
};
