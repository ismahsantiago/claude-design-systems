/**
 * Public entry point.
 *
 * The two stylesheet imports come first on purpose: tokens define the custom
 * properties every component resolves against, and the base layer scopes
 * typography to `.ds-root`. Component CSS is pulled in by each component
 * module below, so the emitted `dist/styles.css` ends up in that same order.
 */
import './styles/tokens.css';
import './styles/base.css';

export { ThemeProvider, useTheme } from './components/ThemeProvider/ThemeProvider';
export type {
  ThemeProviderProps,
  ThemeName,
  ThemePreference,
} from './components/ThemeProvider/ThemeProvider';

export { Stack } from './components/Stack/Stack';
export type { StackProps } from './components/Stack/Stack';

export { Divider } from './components/Divider/Divider';
export type { DividerProps } from './components/Divider/Divider';

export { Text } from './components/Text/Text';
export type { TextProps } from './components/Text/Text';

export { Heading } from './components/Heading/Heading';
export type { HeadingProps } from './components/Heading/Heading';

export { Button } from './components/Button/Button';
export type { ButtonProps, ButtonVariant } from './components/Button/Button';

export { Spinner } from './components/Spinner/Spinner';
export type { SpinnerProps } from './components/Spinner/Spinner';

export { Field } from './components/Field/Field';
export type { FieldProps } from './components/Field/Field';

export { Input } from './components/Input/Input';
export type { InputProps } from './components/Input/Input';

export { Textarea } from './components/Textarea/Textarea';
export type { TextareaProps } from './components/Textarea/Textarea';

export { Select } from './components/Select/Select';
export type { SelectProps } from './components/Select/Select';

export { Checkbox } from './components/Checkbox/Checkbox';
export type { CheckboxProps } from './components/Checkbox/Checkbox';

export { Switch } from './components/Switch/Switch';
export type { SwitchProps } from './components/Switch/Switch';

export { Badge } from './components/Badge/Badge';
export type { BadgeProps } from './components/Badge/Badge';

export { Avatar } from './components/Avatar/Avatar';
export type { AvatarProps } from './components/Avatar/Avatar';

export { Card } from './components/Card/Card';
export type { CardProps } from './components/Card/Card';

export { Alert } from './components/Alert/Alert';
export type { AlertProps, AlertTone } from './components/Alert/Alert';

export { spaceVar } from './types';
export type { Space, ControlSize, Tone } from './types';
