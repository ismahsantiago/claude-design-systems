import type { Meta, StoryObj } from '@storybook/react-vite';
import { FAQ } from './FAQ';

const ITEMS = [
  {
    question: 'Do I need to migrate my existing components?',
    answer:
      'No. The system is scoped to its own root element, so it can sit alongside whatever you already have and take over one screen at a time.',
  },
  {
    question: 'How does theming work?',
    answer:
      'Each system answers a fixed contract of custom properties. Swapping one stylesheet for another re-themes every component, including dark mode.',
  },
  {
    question: 'What happens when I outgrow the defaults?',
    answer:
      'The components are plain React with plain CSS classes. Override a rule, wrap a component, or copy one out — nothing is locked behind a build step.',
  },
  {
    question: 'Is there a free tier?',
    answer:
      'Yes. The Starter plan is free forever for up to three projects, with no card required and no trial clock.',
  },
];

const meta = {
  title: 'Sections/FAQ',
  component: FAQ,
  args: {
    title: 'Questions, answered',
    items: ITEMS,
    defaultOpen: 0,
    tone: 'default',
  },
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Built on native `<details>`, so it works with no JavaScript, is keyboard
 * operable and is announced correctly — all for free.
 */
export const Default: Story = {};

/** Omit `defaultOpen` to start fully collapsed. */
export const AllCollapsed: Story = {
  args: { defaultOpen: undefined },
};

export const WithFullHeader: Story = {
  args: {
    eyebrow: 'FAQ',
    title: 'Before you ask',
    subtitle: 'The four questions every evaluation starts with.',
  },
};
