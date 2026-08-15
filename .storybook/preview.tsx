import type { Decorator, Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/components/ThemeProvider/ThemeProvider';
import type { ThemePreference } from '../src/components/ThemeProvider/ThemeProvider';
import '../src/styles/tokens.css';
import '../src/styles/base.css';

/**
 * Every story renders inside a ThemeProvider — without one, components have no
 * `.ds-root` to resolve tokens against and would appear unstyled. The toolbar
 * switches the theme so light and dark can be checked from the same story.
 */
const withTheme: Decorator = (Story, context) => {
  // Stories that render their own ThemeProvider opt out with
  // `parameters: { theme: 'off' }` so the providers don't nest.
  if (context.parameters.theme === 'off') return <Story />;

  const theme = (context.globals.theme as ThemePreference) ?? 'light';
  return (
    <ThemeProvider theme={theme} fullBleed>
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Design system theme',
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
