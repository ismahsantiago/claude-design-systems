import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from './ThemeProvider';
import { Alert } from '../Alert/Alert';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Field } from '../Field/Field';
import { Input } from '../Input/Input';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';

const meta = {
  title: 'Foundations/ThemeProvider',
  component: ThemeProvider,
  // This story IS the provider, so the global theme decorator is skipped.
  parameters: { theme: 'off' },
  argTypes: {
    theme: { control: 'inline-radio', options: ['light', 'dark', 'system'] },
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function Sample() {
  return (
    <Card title="Invite a teammate" subtitle="They will get access to this workspace">
      <Stack gap="lg">
        <Alert tone="info">Seats renew on 1 October.</Alert>
        <Field label="Email address" required>
          <Input placeholder="jane@example.com" />
        </Field>
        <Stack direction="row" gap="sm" align="center" justify="between">
          <Badge tone="accent" dot>
            2 seats left
          </Badge>
          <Button>Send invite</Button>
        </Stack>
      </Stack>
    </Card>
  );
}

/**
 * Both themes side by side. Nothing below the provider changes — only the
 * value of `data-ds-theme` on the root, which every token resolves against.
 */
export const LightAndDark: Story = {
  args: { theme: 'light', children: null },
  render: () => (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr 1fr' }}>
      <ThemeProvider theme="light" fullBleed>
        <Stack gap="md" padding="lg">
          <Text size="sm" tone="muted" mono>
            theme="light"
          </Text>
          <Sample />
        </Stack>
      </ThemeProvider>
      <ThemeProvider theme="dark" fullBleed>
        <Stack gap="md" padding="lg">
          <Text size="sm" tone="muted" mono>
            theme="dark"
          </Text>
          <Sample />
        </Stack>
      </ThemeProvider>
    </div>
  ),
};

export const Light: Story = {
  args: { theme: 'light', fullBleed: true, children: null },
  render: (args) => (
    <ThemeProvider {...args}>
      <Stack padding="xl">
        <Sample />
      </Stack>
    </ThemeProvider>
  ),
};

export const Dark: Story = {
  args: { theme: 'dark', fullBleed: true, children: null },
  render: (args) => (
    <ThemeProvider {...args}>
      <Stack padding="xl">
        <Sample />
      </Stack>
    </ThemeProvider>
  ),
};

/** `system` resolves to a concrete theme from the OS setting, and follows changes. */
export const System: Story = {
  args: { theme: 'system', fullBleed: true, children: null },
  render: (args) => (
    <ThemeProvider {...args}>
      <Stack padding="xl">
        <Sample />
      </Stack>
    </ThemeProvider>
  ),
};
