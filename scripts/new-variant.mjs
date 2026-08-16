/**
 * Scaffolds a variant of an existing system.
 *
 *   npm run new-variant -- <base> <name> ["Display Title"] ["Tagline"]
 *   npm run new-variant -- cinematic-dark cinematic-dark-cobalt "Cinematic Dark Cobalt" "Cold blue…"
 *
 * A variant inherits its base entirely and restates only the expressive
 * surface — accent, gradients, faces, radius, display scale. That is the
 * difference from `new-system.mjs`, which emits all 73 tokens: a variant that
 * restated everything would be a fork, and would stop inheriting fixes the
 * moment the base changed.
 *
 * The generated stylesheet starts as a copy of the base's own values, so the
 * variant renders identically until it is edited and every edit is visible as
 * a difference. Delete the lines you are not changing — an override that
 * repeats its base is noise that hides the real decisions.
 *
 * This exists for a specific workflow: generate a page with the base in Claude
 * Design, ask for a recolour or a reface, approve it visually, then land it
 * here as a variant and sync it as its own project.
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { EXPRESSIVE_TOKENS, CONTRACT } from '../packages/shared/contract.mjs';

const PACKAGES_DIR = fileURLToPath(new URL('../packages', import.meta.url));

const [base, rawName, rawTitle, rawTagline] = process.argv.slice(2);

if (!base || !rawName) {
  console.error('Usage: npm run new-variant -- <base> <name> ["Display Title"] ["Tagline"]');
  process.exit(1);
}

const baseDir = join(PACKAGES_DIR, base);
if (!existsSync(join(baseDir, 'src', 'theme.css'))) {
  console.error(`No system named "${base}" in packages/.`);
  process.exit(1);
}

const name = rawName.trim().toLowerCase();
if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
  console.error(`"${rawName}" is not a valid package name. Use kebab-case.`);
  process.exit(1);
}

const dir = join(PACKAGES_DIR, name);
if (existsSync(dir)) {
  console.error(`packages/${name} already exists.`);
  process.exit(1);
}

const title =
  rawTitle?.trim() ||
  name.replace(/(^|-)([a-z])/g, (_, sep, ch) => (sep ? ' ' : '') + ch.toUpperCase());
const tagline = rawTagline?.trim() || `A variant of ${base}.`;
const globalName = name.replace(/(^|-)([a-z])/g, (_, __, ch) => ch.toUpperCase());

const baseHasOverrides = existsSync(join(baseDir, 'src', 'overrides.css'));

// Read the base's current answers so the variant starts from real values
// rather than from placeholders nobody can evaluate.
const baseCss = readFileSync(join(baseDir, 'src', 'theme.css'), 'utf8');
/** @type {Record<string, string>} */
const baseValues = {};
for (const [, token, value] of baseCss.matchAll(/(--ds-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
  // First declaration wins: the light/base block precedes any dark overrides.
  if (!(token in baseValues)) baseValues[token] = value.trim().replace(/\s+/g, ' ');
}

const describe = new Map();
for (const group of CONTRACT) {
  for (const token of group.tokens) describe.set(token.name, { group: group.title, ...token });
}

const grouped = new Map();
for (const token of EXPRESSIVE_TOKENS) {
  const meta = describe.get(token);
  const groupTitle = meta?.group ?? 'Other';
  if (!grouped.has(groupTitle)) grouped.set(groupTitle, []);
  grouped.get(groupTitle).push(token);
}

const pad = (token) => `${token}:`.padEnd(30, ' ');
const body = [...grouped]
  .map(
    ([groupTitle, tokens]) =>
      `  /* ---- ${groupTitle} ---- */\n` +
      tokens
        .map((token) => `  ${pad(token)} ${baseValues[token] ?? 'inherit'};`)
        .join('\n'),
  )
  .join('\n\n');

const themeCss = `/**
 * ${title} — ${tagline}
 *
 * A VARIANT of \`${base}\`. It imports that system whole and restates only the
 * expressive surface below: colour, gradients, faces, radius, display scale.
 * Everything else — spacing, control heights, status colours, and every rule
 * in the base's overrides — is inherited, so a fix to \`${base}\` reaches here
 * without being copied.
 *
 * The values below start as ${base}'s own. **Delete every line you are not
 * changing.** A variant that repeats its base is noise, and worse, it stops
 * tracking the base the moment that value is updated there.
 */

@import '@ds/${base}/theme.css';

:root,
[data-ds-theme='light'],
[data-ds-theme='dark'] {
${body}
}
`;

const packageJson = `${JSON.stringify(
  {
    name: `@ds/${name}`,
    version: '0.1.0',
    private: true,
    description: tagline,
    designSystem: { title, tagline, variantOf: base },
    type: 'module',
    sideEffects: ['**/*.css'],
    main: './dist/index.cjs',
    module: './dist/index.js',
    types: './dist/index.d.ts',
    exports: {
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.js',
        require: './dist/index.cjs',
      },
      './styles.css': './dist/styles.css',
      './theme.css': './src/theme.css',
    },
    scripts: {
      build: 'vite build',
      typecheck: 'tsc --noEmit',
      storybook: 'storybook dev -p 6006',
      'build-storybook': 'storybook build',
    },
    dependencies: { '@ds/shared': '*', [`@ds/${base}`]: '*' },
    peerDependencies: { react: '>=18', 'react-dom': '>=18' },
  },
  null,
  2,
)}\n`;

const tsconfig = `${JSON.stringify(
  {
    extends: '../../tsconfig.base.json',
    compilerOptions: { outDir: 'dist' },
    include: ['src', '.storybook', 'vite.config.ts', '../../types/**/*.d.ts'],
    exclude: ['node_modules', 'dist', 'storybook-static'],
  },
  null,
  2,
)}\n`;

const indexTs = `/**
 * ${title}.
 *
 * Import order is load-bearing: this theme pulls in ${base}'s tokens and then
 * restates its own, \`@ds/shared\` brings the component rules that consume
 * them, and ${base}'s overrides land last so its rule exceptions still win.
 */
import './theme.css';

export * from '@ds/shared';
${baseHasOverrides ? `\nimport '@ds/${base}/overrides.css';\n` : ''}`;

const storybookMain = `import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    // The catalogue lives in @ds/shared and is written once for every system.
    '../../shared/src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
`;

const storybookPreview = readFileSync(
  join(baseDir, '.storybook', 'preview.tsx'),
  'utf8',
).replace(/from '\.\.\/src\/theme\.css'/, "from '../src/theme.css'");

const landingStory = `import type { Meta, StoryObj } from '@storybook/react-vite';
import { LandingDemo } from '@ds/shared/demo';
import { ThemeProvider } from '@ds/shared';
import './index';

/**
 * The reference landing page, rendered with ${title}. Compare it against
 * ${base} — every difference you see is this variant's token overrides.
 */
const meta = {
  title: 'Landing page',
  parameters: { layout: 'fullscreen', theme: 'off' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ThemeProvider theme="dark" fullBleed>
      <LandingDemo />
    </ThemeProvider>
  ),
};
`;

mkdirSync(join(dir, 'src'), { recursive: true });
mkdirSync(join(dir, '.storybook'), { recursive: true });

for (const [file, contents] of [
  ['package.json', packageJson],
  ['tsconfig.json', tsconfig],
  [
    'vite.config.ts',
    `import { defineConfig } from 'vite';\nimport { createLibraryConfig } from '../../scripts/vite-library.mjs';\n\nexport default defineConfig(createLibraryConfig(import.meta.url, '${globalName}'));\n`,
  ],
  ['src/theme.css', themeCss],
  ['src/index.ts', indexTs],
  ['src/Landing.stories.tsx', landingStory],
  ['.storybook/main.ts', storybookMain],
  ['.storybook/preview.tsx', storybookPreview],
]) {
  writeFileSync(join(dir, file), contents);
}

console.log(
  `Created packages/${name}, a variant of ${base} with ${EXPRESSIVE_TOKENS.length} expressive tokens to edit.\n`,
);
console.log('Next:');
console.log('  npm install');
console.log(`  edit packages/${name}/src/theme.css — delete what you are not changing`);
console.log(`  npm run build --workspace @ds/${name} && npm run verify -- ${name}`);
console.log(`  npm run storybook --workspace @ds/${name}`);
