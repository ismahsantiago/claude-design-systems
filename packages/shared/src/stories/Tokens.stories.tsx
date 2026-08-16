import type { Meta, StoryObj } from '@storybook/react-vite';
import { CONTRACT } from '../../contract.mjs';
import { Stack } from '../components/Stack/Stack';
import { Text } from '../components/Text/Text';
import { Heading } from '../components/Heading/Heading';

/**
 * A live reference for the token contract, read FROM the contract — so a token
 * added to `contract.mjs` documents itself here without anyone remembering to
 * update this file, and a token removed cannot linger as a stale swatch.
 *
 * Every value shown is resolved by the browser from the active theme, so this
 * is also the fastest way to see what a system actually decided.
 */
const meta = {
  title: 'Foundations/Tokens',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const groupsFor = (...titles: string[]) =>
  CONTRACT.filter((group) => titles.includes(group.title));

function TokenRow({ children, name }: { children: React.ReactNode; name: string }) {
  return (
    <Stack direction="row" gap="md" align="center">
      <div style={{ flex: 'none' }}>{children}</div>
      <Text size="xs" mono tone="muted" truncate>
        {name}
      </Text>
    </Stack>
  );
}

export const Color: Story = {
  render: () => (
    <Stack gap="2xl">
      {groupsFor('Surface & border', 'Text', 'Accent', 'Status').map((group) => (
        <Stack gap="lg" key={group.title}>
          <Heading level={2}>{group.title}</Heading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: 'var(--ds-space-md)',
            }}
          >
            {group.tokens.map((token) => (
              <TokenRow key={token.name} name={token.name}>
                <span
                  title={token.description}
                  style={{
                    display: 'block',
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--ds-radius-md)',
                    background: `var(${token.name})`,
                    border: '1px solid var(--ds-color-border)',
                  }}
                />
              </TokenRow>
            ))}
          </div>
        </Stack>
      ))}
    </Stack>
  ),
};

export const Gradients: Story = {
  render: () => (
    <Stack gap="lg">
      <Heading level={2}>Gradients</Heading>
      <Text tone="muted">
        Systems that do not use gradients answer with a flat one-colour gradient, so consumers
        never have to branch on whether a system has them.
      </Text>
      <Stack gap="md">
        {groupsFor('Gradients')[0]?.tokens.map((token) => (
          <Stack gap="xs" key={token.name}>
            <Text size="xs" mono tone="muted">
              {token.name}
            </Text>
            <span
              style={{
                display: 'block',
                height: 72,
                borderRadius: 'var(--ds-radius-lg)',
                background: `var(${token.name})`,
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  ),
};

export const Space: Story = {
  render: () => (
    <Stack gap="lg">
      <Heading level={2}>Space</Heading>
      <Stack gap="sm">
        {groupsFor('Space')[0]?.tokens.map((token) => (
          <Stack direction="row" gap="md" align="center" key={token.name}>
            <Text size="xs" mono tone="muted" style={{ width: 150, flex: 'none' }}>
              {token.name}
            </Text>
            <span
              style={{
                height: 14,
                width: `var(${token.name})`,
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

const TYPE_SIZES = [
  '--ds-text-xs',
  '--ds-text-sm',
  '--ds-text-md',
  '--ds-text-lg',
  '--ds-text-xl',
  '--ds-text-2xl',
  '--ds-text-3xl',
  '--ds-text-display',
];

export const Typography: Story = {
  render: () => (
    <Stack gap="2xl">
      <Stack gap="lg">
        <Heading level={2}>Type scale</Heading>
        <Stack gap="md">
          {TYPE_SIZES.map((token) => (
            <Stack direction="row" gap="lg" align="baseline" key={token}>
              <Text size="xs" mono tone="muted" style={{ width: 150, flex: 'none' }}>
                {token}
              </Text>
              <span
                style={{
                  fontSize: `var(${token})`,
                  lineHeight: 'var(--ds-leading-tight)',
                  color: 'var(--ds-color-text)',
                  minWidth: 0,
                  overflow: 'hidden',
                }}
              >
                The quick brown fox
              </span>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack gap="lg">
        <Heading level={2}>Families</Heading>
        <Stack gap="sm">
          <span style={{ fontFamily: 'var(--ds-font-sans)', fontSize: 'var(--ds-text-lg)' }}>
            --ds-font-sans · The quick brown fox
          </span>
          <span
            style={{
              fontFamily: 'var(--ds-font-display)',
              fontVariationSettings: 'var(--ds-font-display-settings)',
              fontSize: 'var(--ds-text-lg)',
            }}
          >
            --ds-font-display · The quick brown fox
          </span>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: 'var(--ds-text-lg)' }}>
            --ds-font-mono · The quick brown fox
          </span>
        </Stack>
      </Stack>
    </Stack>
  ),
};

export const RadiusAndElevation: Story = {
  render: () => (
    <Stack gap="2xl">
      <Stack gap="lg">
        <Heading level={2}>Radius</Heading>
        <Stack direction="row" gap="xl" wrap>
          {groupsFor('Radius')[0]?.tokens.map((token) => (
            <Stack gap="xs" align="center" key={token.name}>
              <span
                style={{
                  width: 72,
                  height: 72,
                  background: 'var(--ds-color-accent-subtle)',
                  border: '1px solid var(--ds-color-accent)',
                  borderRadius: `var(${token.name})`,
                }}
              />
              <Text size="xs" mono tone="muted">
                {token.name.replace('--ds-radius-', '')}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack gap="lg">
        <Heading level={2}>Elevation</Heading>
        <Stack direction="row" gap="2xl" wrap>
          {['--ds-shadow-sm', '--ds-shadow-md', '--ds-shadow-lg', '--ds-shadow-glow'].map(
            (token) => (
              <Stack gap="xs" align="center" key={token}>
                <span
                  style={{
                    width: 104,
                    height: 72,
                    background: 'var(--ds-color-surface)',
                    border: '1px solid var(--ds-color-border)',
                    borderRadius: 'var(--ds-radius-lg)',
                    boxShadow: `var(${token})`,
                  }}
                />
                <Text size="xs" mono tone="muted">
                  {token.replace('--ds-shadow-', '')}
                </Text>
              </Stack>
            ),
          )}
        </Stack>
      </Stack>
    </Stack>
  ),
};
