import type { Meta, StoryObj } from '@storybook/react-vite';
import { Testimonials } from './Testimonials';

const QUOTES = [
  {
    quote:
      'We replaced four half-finished internal libraries with this in a fortnight. The design review backlog went to zero and stayed there.',
    name: 'Ada Okonjo',
    role: 'Head of Design, Vertex',
  },
  {
    quote:
      'The theme contract meant our rebrand was a stylesheet. We shipped it in an afternoon instead of a quarter.',
    name: 'Grace Lindqvist',
    role: 'Principal Engineer, Halcyon',
  },
  {
    quote:
      'Accessibility stopped being a pre-launch scramble because it was already in the components.',
    name: 'Tomas Ferreira',
    role: 'Product Lead, Foundry',
  },
];

const meta = {
  title: 'Sections/Testimonials',
  component: Testimonials,
  args: {
    title: 'What teams say',
    testimonials: QUOTES,
    variant: 'grid',
    tone: 'sunken',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['grid', 'feature'] },
    tone: { control: 'inline-radio', options: ['default', 'sunken', 'accent', 'inverted'] },
  },
} satisfies Meta<typeof Testimonials>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grid: Story = {};

/** One strong pull quote, set in the display face. */
export const Feature: Story = {
  args: { variant: 'feature', testimonials: QUOTES.slice(0, 1), tone: 'default' },
};

export const WithHeader: Story = {
  args: {
    eyebrow: 'Customers',
    title: 'Teams that stopped rebuilding buttons',
    subtitle: 'A component library is only worth it if it removes work. Here is the work removed.',
  },
};
