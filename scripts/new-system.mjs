/**
 * Scaffolds a new design system.
 *
 *   npm run new-system -- <name> ["Display Title"] ["One-line tagline"]
 *
 * The generated `theme.css` is emitted FROM the contract, grouped and commented
 * with each token's purpose, so a new system is structurally complete on its
 * first build. Editing values is then the only work — which is the point: a
 * system in this repo is a set of answers, not a fork of the components.
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { CONTRACT, REQUIRED_TOKENS } from '../packages/shared/contract.mjs';
import { STARTER_LIGHT, STARTER_DARK } from './starter-theme.mjs';

const PACKAGES_DIR = fileURLToPath(new URL('../packages', import.meta.url));

const [rawName, rawTitle, rawTagline] = process.argv.slice(2);

if (!rawName) {
  console.error('Usage: npm run new-system -- <name> ["Display Title"] ["Tagline"]');
  process.exit(1);
}

const name = rawName.trim().toLowerCase();
if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
  console.error(`"${rawName}" is not a valid package name. Use kebab-case, e.g. editorial-bold.`);
  process.exit(1);
}

const dir = join(PACKAGES_DIR, name);
if (existsSync(dir)) {
  console.error(`packages/${name} already exists.`);
  process.exit(1);
}

// The starter map and the contract must agree, or generated systems are broken
// before anyone edits them.
const unanswered = REQUIRED_TOKENS.filter((token) => !(token in STARTER_LIGHT));
const stray = Object.keys(STARTER_LIGHT).filter((token) => !REQUIRED_TOKENS.includes(token));
if (unanswered.length || stray.length) {
  console.error('scripts/starter-theme.mjs is out of sync with the contract.');
  if (unanswered.length) console.error('  missing answers:', unanswered.join(', '));
  if (stray.length) console.error('  not in contract:', stray.join(', '));
  process.exit(1);
}

const title = rawTitle?.trim() || name.replace(/(^|-)([a-z])/g, (_, sep, ch) => (sep ? ' ' : '') + ch.toUpperCase());
const tagline = rawTagline?.trim() || 'Describe the register this system is going for.';
const globalName = name.replace(/(^|-)([a-z])/g, (_, __, ch) => ch.toUpperCase());

const pad = (token) => token.padEnd(26, ' ');

const lightBody = CONTRACT.map((group) => {
  const lines = group.tokens.map(
    (token) => `  ${pad(token.name + ':')} ${STARTER_LIGHT[token.name]};`,
  );
  return `  /* ---- ${group.title} ---- */\n${lines.join('\n')}`;
}).join('\n\n');

const darkBody = Object.entries(STARTER_DARK)
  .map(([token, value]) => `  ${pad(token + ':')} ${value};`)
  .join('\n');

const themeCss = `/**
 * ${title} — ${tagline}
 *
 * Every token named in \`@ds/shared/contract\` is answered below. That is what
 * makes this a design system rather than a stylesheet: the components consume
 * these names and nothing else, so changing a value here changes the system
 * everywhere, and forgetting one is caught by \`npm run verify\`.
 *
 * Generated from the contract with neutral starter values. Edit them — start
 * with accent, radius, --ds-text-display and --ds-section-gap, which carry
 * most of a system's character.
 */

:root,
[data-ds-theme='light'] {
  color-scheme: light;

${lightBody}
}

/* Only the tokens whose value actually changes in dark. */
[data-ds-theme='dark'] {
  color-scheme: dark;

${darkBody}
}
`;

const packageJson = `${JSON.stringify(
  {
    name: `@ds/${name}`,
    version: '0.1.0',
    private: true,
    description: tagline,
    designSystem: { title, tagline },
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
    },
    scripts: {
      build: 'vite build',
      typecheck: 'tsc --noEmit',
      storybook: 'storybook dev -p 6006',
      'build-storybook': 'storybook build',
    },
    dependencies: { '@ds/shared': '*' },
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

const viteConfig = `import { defineConfig } from 'vite';
import { createLibraryConfig } from '../../scripts/vite-library.mjs';

export default defineConfig(createLibraryConfig(import.meta.url, '${globalName}'));
`;

const indexTs = `/**
 * ${title}.
 *
 * Theme first, then the shared vocabulary: token declarations must land in the
 * stylesheet before the component rules that consume them, and CSS import
 * order follows module import order.
 */
import './theme.css';

export * from '@ds/shared';
`;

const storybookMain = `import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
`;

const storybookPreview = `import type { Decorator, Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@ds/shared';
import type { ThemePreference } from '@ds/shared';
import '../src/theme.css';

/**
 * Every story renders inside a ThemeProvider. Without one there is no
 * \`.ds-root\` element, the contract tokens have nowhere to resolve, and the
 * components come out structurally correct but completely unstyled.
 */
const withTheme: Decorator = (Story, context) => {
  if (context.parameters.theme === 'off') return <Story />;

  const theme = (context.globals.theme as ThemePreference) ?? 'light';
  const bare = context.parameters.layout === 'fullscreen';

  return (
    <ThemeProvider theme={theme} fullBleed>
      {bare ? <Story /> : <div style={{ padding: 24 }}>{<Story />}</div>}
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
};

export default preview;
`;

const landingStory = `import type { Meta, StoryObj } from '@storybook/react-vite';
import { LandingDemo } from '@ds/shared/demo';
import { ThemeProvider } from '@ds/shared';
import './index';

/**
 * The reference landing page. Same copy and same structure in every system —
 * everything that differs between them is the tokens doing their job.
 */
const meta = {
  title: 'Landing page',
  parameters: { layout: 'fullscreen', theme: 'off' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  render: () => (
    <ThemeProvider theme="light" fullBleed>
      <LandingDemo />
    </ThemeProvider>
  ),
};

export const Dark: Story = {
  render: () => (
    <ThemeProvider theme="dark" fullBleed>
      <LandingDemo />
    </ThemeProvider>
  ),
};
`;

mkdirSync(join(dir, 'src'), { recursive: true });
mkdirSync(join(dir, '.storybook'), { recursive: true });

const files = [
  ['package.json', packageJson],
  ['tsconfig.json', tsconfig],
  ['vite.config.ts', viteConfig],
  ['src/theme.css', themeCss],
  ['src/index.ts', indexTs],
  ['src/Landing.stories.tsx', landingStory],
  ['.storybook/main.ts', storybookMain],
  ['.storybook/preview.tsx', storybookPreview],
];

for (const [file, contents] of files) {
  writeFileSync(join(dir, file), contents);
}

console.log(`Created packages/${name} with ${REQUIRED_TOKENS.length} contract tokens answered.\n`);
console.log('Next:');
console.log('  npm install                       # link the new workspace');
console.log(`  edit packages/${name}/src/theme.css`);
console.log(`  npm run build --workspace @ds/${name}`);
console.log(`  npm run verify -- ${name}`);
console.log(`  npm run storybook --workspace @ds/${name}`);
