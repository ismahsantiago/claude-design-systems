import type { Meta, StoryObj } from '@storybook/react-vite';
import { CTA } from './CTA';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Stack } from '../../components/Stack/Stack';

const meta = {
  title: 'Sections/CTA',
  component: CTA,
  args: {
    headline: 'Start with the boring parts done',
    subhead: 'Create an account and have a themed, accessible page running in under ten minutes.',
    note: 'Free for 14 days. No card required.',
    tone: 'inverted',
    align: 'center',
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'sunken', 'accent', 'inverted'] },
    align: { control: 'inline-radio', options: ['center', 'split'] },
  },
} satisfies Meta<typeof CTA>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Defaults to `inverted`: the closing band should not look like the others. */
export const Inverted: Story = {
  args: { actions: <Button size="lg">Get started</Button> },
};

export const Split: Story = {
  args: { align: 'split', actions: <Button size="lg">Get started</Button> },
};

/** An inline email capture in place of a button. */
export const EmailCapture: Story = {
  args: {
    tone: 'accent',
    actions: (
      <Stack direction="row" gap="sm" wrap align="center">
        <Input placeholder="you@company.com" fullWidth={false} aria-label="Work email" />
        <Button>Get started</Button>
      </Stack>
    ),
  },
};

export const Quiet: Story = {
  args: {
    tone: 'sunken',
    subhead: undefined,
    note: undefined,
    actions: <Button variant="secondary">Talk to sales</Button>,
  },
};
