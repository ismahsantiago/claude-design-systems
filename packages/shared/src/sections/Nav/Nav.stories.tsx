import type { Meta, StoryObj } from '@storybook/react-vite';
import { Nav } from './Nav';
import { Button } from '../../components/Button/Button';

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#' },
];

const meta = {
  title: 'Sections/Nav',
  component: Nav,
  args: {
    brand: 'Northwind',
    links: LINKS,
    sticky: false,
    bordered: true,
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

const actions = (
  <>
    <Button variant="ghost" size="sm">
      Sign in
    </Button>
    <Button size="sm">Get started</Button>
  </>
);

export const Default: Story = {
  args: { actions },
};

/** Brand and links only — for pages whose single action lives in the hero. */
export const WithoutActions: Story = {};

/**
 * Sticky blurs over whatever scrolls beneath it. Turning the border off is what
 * lets a full-bleed hero run edge to edge behind the bar.
 */
export const StickyOverContent: Story = {
  args: { actions, sticky: true, bordered: false },
  render: (args) => (
    <div style={{ height: 320, overflow: 'auto' }}>
      <Nav {...args} />
      <div
        style={{
          height: 600,
          background: 'var(--ds-gradient-accent)',
          padding: 'var(--ds-space-2xl)',
          color: 'var(--ds-color-text-on-accent)',
        }}
      >
        Scroll — the bar stays and blurs what passes under it.
      </div>
    </div>
  ),
};
