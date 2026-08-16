import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    // The component and section catalogue lives in @ds/shared and is written
    // once for every system: shared owns the structure, this package owns the
    // values, so the same stories render as THIS system's design.
    '../../shared/src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
