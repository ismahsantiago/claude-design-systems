import type { Decorator, Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@ds/shared';
import type { ThemePreference } from '@ds/shared';
import '../src/theme.css';

/**
 * Every story renders inside a ThemeProvider. Without one there is no
 * `.ds-root` element, the contract tokens have nowhere to resolve, and the
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
