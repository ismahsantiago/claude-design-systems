/**
 * Cinematic Dark Cobalt.
 *
 * Import order is load-bearing: this theme pulls in cinematic-dark's tokens and then
 * restates its own, `@ds/shared` brings the component rules that consume
 * them, and cinematic-dark's overrides land last so its rule exceptions still win.
 */
import './theme.css';

export * from '@ds/shared';

import '@ds/cinematic-dark/overrides.css';
