import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeatureGrid } from './FeatureGrid';

function Glyph({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FEATURES = [
  {
    icon: <Glyph path="M3 10h14M10 3v14" />,
    title: 'Composable by default',
    description:
      'Every section takes plain props and renders plain markup. No layout engine to learn.',
  },
  {
    icon: <Glyph path="M4 15l4-8 4 5 4-3" />,
    title: 'Measured, not guessed',
    description:
      'Ships with the instrumentation wired, so the first question after launch has an answer.',
  },
  {
    icon: <Glyph path="M6 10l3 3 5-6" />,
    title: 'Accessible out of the box',
    description:
      'Focus order, labelling and contrast are part of the components, not a pre-release checklist.',
  },
  {
    icon: <Glyph path="M4 6h12M4 10h12M4 14h8" />,
    title: 'Content-shaped APIs',
    description:
      'Sections take arrays of items, so a page can be generated from a CMS with no mapping layer.',
  },
];

const meta = {
  title: 'Sections/FeatureGrid',
  component: FeatureGrid,
  args: {
    eyebrow: 'Why Northwind',
    title: 'Everything the boring parts need',
    subtitle: 'The pieces every product rebuilds from scratch, already built and consistent.',
    features: FEATURES,
    columns: 3,
    variant: 'plain',
    tone: 'default',
  },
  argTypes: {
    columns: { control: 'inline-radio', options: [2, 3, 4] },
    variant: { control: 'inline-radio', options: ['plain', 'card'] },
    tone: { control: 'inline-radio', options: ['default', 'sunken', 'accent', 'inverted'] },
  },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};

/** `card` gives each feature its own surface — useful on a busy page. */
export const Cards: Story = {
  args: { variant: 'card', tone: 'sunken' },
};

export const TwoColumns: Story = {
  args: { columns: 2, features: FEATURES.slice(0, 2) },
};

export const WithoutHeader: Story = {
  args: { eyebrow: undefined, title: undefined, subtitle: undefined },
};
