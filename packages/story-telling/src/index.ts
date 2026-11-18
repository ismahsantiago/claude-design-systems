/**
 * Story-Telling.
 *
 * Theme first, then the shared vocabulary: token declarations must land in the
 * stylesheet before the component rules that consume them, and CSS import
 * order follows module import order.
 */
import './theme.css';

export * from '@ds/shared';

// The shared components provide the vocabulary; these rules provide the
// story-telling register's editorial silhouette and chapter pacing.
import './overrides.css';

// Scroll narrative for the `story-telling` page type. Additive only: without
// it — or without scroll-driven animation support — the page is still whole.
import './story-scroll.css';
