import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySteps } from './StorySteps';

const STEPS = [
  {
    label: 'Intake',
    owner: 'Operator',
    description: 'One person takes the brief, the constraints and the deadline, and owns it from there.',
    outcome: 'A route on paper before anything moves.',
  },
  {
    label: 'Handoff',
    owner: 'Operator + carrier',
    description: 'Every transfer is logged against a name, not a queue. Nothing changes hands silently.',
    outcome: 'No gap where accountability disappears.',
  },
  {
    label: 'Transit',
    owner: 'Network',
    description: 'Position, dwell time and exceptions land in one place while the freight is moving.',
    outcome: 'You know before you are asked.',
  },
  {
    label: 'Arrival',
    owner: 'Operator',
    description: 'Proof of delivery, condition and cost close out against the original brief.',
    outcome: 'One record, start to finish.',
  },
];

const meta = {
  title: 'Sections/StorySteps',
  component: StorySteps,
  args: {
    eyebrow: '03 / The route',
    title: 'Four steps, one owner',
    steps: STEPS,
    layout: 'row',
    tone: 'default',
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['row', 'column'] },
    tone: { control: 'inline-radio', options: ['default', 'sunken', 'accent', 'inverted'] },
  },
} satisfies Meta<typeof StorySteps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The connecting rule is what separates a route from a feature grid: it says
 * these happen in an order and someone owns each handoff.
 */
export const Row: Story = {};

export const Column: Story = {
  args: { layout: 'column' },
};

export const ThreeSteps: Story = {
  args: { steps: STEPS.slice(0, 3) },
};

export const OnSunken: Story = {
  args: { tone: 'sunken' },
};
