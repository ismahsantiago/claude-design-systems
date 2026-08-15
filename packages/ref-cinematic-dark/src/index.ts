/**
 * Cinematic Dark (reference study).
 *
 * Import order is load-bearing and is the reverse of specificity intuition:
 * the theme declares the tokens, `@ds/shared` brings the component rules that
 * consume them, and `overrides.css` lands last so this system's exceptions win
 * without `!important`. CSS output order follows module import order.
 */
import './theme.css';

export * from '@ds/shared';

import './overrides.css';
