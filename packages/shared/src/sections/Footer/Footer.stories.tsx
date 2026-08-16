import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
];

const meta = {
  title: 'Sections/Footer',
  component: Footer,
  args: {
    brand: 'Northwind',
    description:
      'A component library, a theme contract, and a build that already agree with each other.',
    columns: COLUMNS,
    copyright: '© 2026 Northwind Systems Ltd.',
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { meta: <span>Made with the design system it documents.</span> },
};

/** Just the legal line, for pages that carry their navigation elsewhere. */
export const Minimal: Story = {
  args: { brand: undefined, description: undefined, columns: [] },
};

export const WithoutDescription: Story = {
  args: { description: undefined },
};
