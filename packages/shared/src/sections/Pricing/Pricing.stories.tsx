import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pricing } from './Pricing';
import { Button } from '../../components/Button/Button';

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'For side projects and evaluation.',
    features: ['Up to 3 projects', 'Community support', '1 GB of storage'],
    action: <Button variant="secondary">Start building</Button>,
  },
  {
    name: 'Team',
    price: '$29',
    period: 'per user / month',
    description: 'For teams shipping to production.',
    features: [
      'Unlimited projects',
      'Priority support',
      '100 GB of storage',
      'SSO and audit logs',
      'Staging environments',
    ],
    action: <Button>Start free trial</Button>,
    featured: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organisations with procurement.',
    features: ['Everything in Team', 'Dedicated support', 'Custom contracts', 'On-premise option'],
    action: <Button variant="secondary">Talk to sales</Button>,
  },
];

const meta = {
  title: 'Sections/Pricing',
  component: Pricing,
  args: {
    eyebrow: 'Pricing',
    title: 'Priced per seat, not per surprise',
    subtitle: 'Every plan includes the full component library. You pay for scale and support.',
    plans: PLANS,
    note: 'Prices exclude VAT. Annual billing saves 20%.',
    tone: 'default',
  },
} satisfies Meta<typeof Pricing>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The featured plan is marked by border and elevation rather than by size, so the
 * row of prices stays on one baseline and stays scannable.
 */
export const ThreePlans: Story = {};

export const TwoPlans: Story = {
  args: { plans: [PLANS[0]!, PLANS[1]!], subtitle: undefined },
};

export const WithoutFeaturedPlan: Story = {
  args: {
    plans: PLANS.map((plan) => ({ ...plan, featured: false, badge: undefined })),
    note: undefined,
  },
};

export const OnSunken: Story = {
  args: { tone: 'sunken' },
};
