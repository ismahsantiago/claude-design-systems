import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';
import { Section } from '../../components/Section/Section';

const meta = {
  title: 'Sections/SectionHeader',
  component: SectionHeader,
  args: {
    eyebrow: 'Why Northwind',
    title: 'Everything the boring parts need',
    subtitle: 'The pieces every product rebuilds from scratch, already built and consistent.',
    align: 'center',
  },
  argTypes: {
    align: { control: 'inline-radio', options: ['center', 'start'] },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Factored out of the content sections so they all announce themselves identically. */
export const Centered: Story = {
  render: (args) => (
    <Section>
      <SectionHeader {...args} />
    </Section>
  ),
};

export const Start: Story = {
  args: { align: 'start' },
  render: (args) => (
    <Section>
      <SectionHeader {...args} />
    </Section>
  ),
};

export const TitleOnly: Story = {
  args: { eyebrow: undefined, subtitle: undefined },
  render: (args) => (
    <Section>
      <SectionHeader {...args} />
    </Section>
  ),
};
