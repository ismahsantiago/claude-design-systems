import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Heading } from '../Heading/Heading';

const meta = {
  title: 'Layout/Section',
  component: Section,
  args: { tone: 'default', spacing: 'normal', width: 'page' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'sunken', 'accent', 'inverted'] },
    spacing: { control: 'inline-radio', options: ['none', 'tight', 'normal', 'loose'] },
    width: { control: 'inline-radio', options: ['page', 'prose', 'full'] },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

function Body({ label }: { label: string }) {
  return (
    <Stack gap="xs">
      <Heading level={2}>{label}</Heading>
      <Text tone="muted">
        Sections never set their own margins — stacking them is what produces the page, so the
        rhythm lives in exactly one place.
      </Text>
    </Stack>
  );
}

export const Default: Story = {
  render: (args) => (
    <Section {...args}>
      <Body label="A single band" />
    </Section>
  ),
};

/**
 * The four tones are how a landing page gets its horizontal banding without any
 * section knowing its own position on the page.
 */
export const Tones: Story = {
  render: () => (
    <>
      <Section tone="default">
        <Body label="default" />
      </Section>
      <Section tone="sunken">
        <Body label="sunken" />
      </Section>
      <Section tone="accent">
        <Body label="accent" />
      </Section>
      <Section tone="inverted">
        <Body label="inverted" />
      </Section>
    </>
  ),
};

/** Spacing scales `--ds-section-gap`, the single biggest driver of how dense a system feels. */
export const Spacing: Story = {
  render: () => (
    <>
      <Section spacing="tight" tone="sunken">
        <Body label="tight — half the section gap" />
      </Section>
      <Section spacing="normal">
        <Body label="normal — one section gap" />
      </Section>
      <Section spacing="loose" tone="sunken">
        <Body label="loose — one and a half" />
      </Section>
    </>
  ),
};
