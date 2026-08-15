import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../components/Stack/Stack';
import { Text } from '../components/Text/Text';
import { Heading } from '../components/Heading/Heading';
import { Divider } from '../components/Divider/Divider';

/**
 * A live reference for the semantic token layer. Everything here reads the
 * real custom properties, so it always reflects the current theme.
 */
const meta = {
  title: 'Foundations/Tokens',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const COLOR_TOKENS = [
  'bg',
  'surface',
  'surface-sunken',
  'surface-hover',
  'border',
  'border-strong',
  'text',
  'text-muted',
  'accent',
  'accent-hover',
  'accent-subtle',
  'success',
  'success-subtle',
  'warning',
  'warning-subtle',
  'danger',
  'danger-subtle',
];

const SPACE_TOKENS = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const RADIUS_TOKENS = ['sm', 'md', 'lg', 'full'];
const TEXT_TOKENS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const SHADOW_TOKENS = ['sm', 'md', 'lg'];

export const Color: Story = {
  render: () => (
    <Stack gap="lg">
      <Heading level={2}>Color</Heading>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: 'var(--ds-space-md)',
        }}
      >
        {COLOR_TOKENS.map((token) => (
          <Stack key={token} direction="row" gap="sm" align="center">
            <span
              style={{
                width: 36,
                height: 36,
                flex: 'none',
                borderRadius: 'var(--ds-radius-md)',
                background: `var(--ds-color-${token})`,
                border: '1px solid var(--ds-color-border)',
              }}
            />
            <Text size="xs" mono tone="muted" truncate>
              --ds-color-{token}
            </Text>
          </Stack>
        ))}
      </div>
    </Stack>
  ),
};

export const Space: Story = {
  render: () => (
    <Stack gap="lg">
      <Heading level={2}>Space</Heading>
      <Stack gap="sm">
        {SPACE_TOKENS.map((token) => (
          <Stack key={token} direction="row" gap="md" align="center">
            <Text size="xs" mono tone="muted" style={{ width: 120, flex: 'none' }}>
              --ds-space-{token}
            </Text>
            <span
              style={{
                height: 14,
                width: `var(--ds-space-${token})`,
                background: 'var(--ds-color-accent)',
                borderRadius: 'var(--ds-radius-sm)',
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  ),
};

export const Typography: Story = {
  render: () => (
    <Stack gap="lg">
      <Heading level={2}>Type scale</Heading>
      <Stack gap="md">
        {TEXT_TOKENS.map((token) => (
          <Stack key={token} direction="row" gap="lg" align="baseline">
            <Text size="xs" mono tone="muted" style={{ width: 110, flex: 'none' }}>
              --ds-text-{token}
            </Text>
            <span style={{ fontSize: `var(--ds-text-${token})`, color: 'var(--ds-color-text)' }}>
              The quick brown fox
            </span>
          </Stack>
        ))}
      </Stack>
      <Divider spacing="sm" />
      <Heading level={2}>Families</Heading>
      <Stack gap="sm">
        <span style={{ fontFamily: 'var(--ds-font-sans)' }}>--ds-font-sans</span>
        <span style={{ fontFamily: 'var(--ds-font-mono)' }}>--ds-font-mono</span>
      </Stack>
    </Stack>
  ),
};

export const RadiusAndElevation: Story = {
  render: () => (
    <Stack gap="xl">
      <Stack gap="lg">
        <Heading level={2}>Radius</Heading>
        <Stack direction="row" gap="lg" wrap>
          {RADIUS_TOKENS.map((token) => (
            <Stack key={token} gap="xs" align="center">
              <span
                style={{
                  width: 64,
                  height: 64,
                  background: 'var(--ds-color-accent-subtle)',
                  border: '1px solid var(--ds-color-accent)',
                  borderRadius: `var(--ds-radius-${token})`,
                }}
              />
              <Text size="xs" mono tone="muted">
                {token}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack gap="lg">
        <Heading level={2}>Elevation</Heading>
        <Stack direction="row" gap="xl" wrap>
          {SHADOW_TOKENS.map((token) => (
            <Stack key={token} gap="xs" align="center">
              <span
                style={{
                  width: 96,
                  height: 64,
                  background: 'var(--ds-color-surface)',
                  borderRadius: 'var(--ds-radius-lg)',
                  boxShadow: `var(--ds-shadow-${token})`,
                }}
              />
              <Text size="xs" mono tone="muted">
                {token}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  ),
};
